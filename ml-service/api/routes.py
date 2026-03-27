from fastapi import APIRouter, HTTPException
import pandas as pd
from schemas.scoring import ScoreRequest, ScoreResponse
from utils.extraction import download_and_extract, get_education_level
from core.ml_model import get_xgb_model, get_scaler, get_explainer
from services.ai_component import compute_fit, resume_quality, extract_years_of_experience

router = APIRouter()

@router.post("/score", response_model=ScoreResponse)
def score_resume(request: ScoreRequest):
    req_dict = request.requirements
    resume_url = request.resume_url
    
    if not resume_url:
        raise HTTPException(status_code=400, detail="Must provide a resume_url")
        
    text_to_analyze = download_and_extract(resume_url)
    if not text_to_analyze:
        raise HTTPException(status_code=400, detail="Could not extract text from the provided resume")

    # 3. Rule-based filtering
    rule_score, breakdown = compute_fit(req_dict, text_to_analyze)
    quality = resume_quality(text_to_analyze)
    
    years_exp = extract_years_of_experience(text_to_analyze) or 0.0
    skills_score = breakdown.get("skills", 0)
    edu_level = get_education_level(text_to_analyze)
    resume_length = len(text_to_analyze.split())
    
    # Scale numerical features
    scaler = get_scaler()
    num_features = pd.DataFrame(
        [[years_exp, skills_score, resume_length]], 
        columns=['years_experience', 'skills_match_score', 'resume_length']
    )
    scaled_nums = scaler.transform(num_features)[0]
    
    # Features order: ['years_experience', 'skills_match_score', 'education_level', 'resume_length']
    features = pd.DataFrame([[
        scaled_nums[0], 
        scaled_nums[1], 
        edu_level, 
        scaled_nums[2]
    ]], columns=['years_experience', 'skills_match_score', 'education_level', 'resume_length'])
    
    # 4. XGBoost Predict
    model = get_xgb_model()
    xgb_pred = model.predict_proba(features)[0][1]
    final_rank = round(float(xgb_pred * 100), 2)
    
    # 5. Generate LIME explanation
    explainer = get_explainer()
    lime_data = []
    if explainer is not None:
        try:
            exp = explainer.explain_instance(
                data_row=features.iloc[0].values,
                predict_fn=model.predict_proba
            )
            lime_data = exp.as_list()
        except Exception as e:
            print("LIME explanation failed:", e)

    return {
        "fit_score": rule_score,
        "xgboost_rank": final_rank,
        "lime_data": lime_data,
        "fit_breakdown": breakdown,
        "resume_quality": quality
    }
