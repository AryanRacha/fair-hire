from pydantic import BaseModel
from typing import List, Dict, Any

class ScoreRequest(BaseModel):
    resume_url: str
    requirements: Dict[str, Any]

class ScoreResponse(BaseModel):
    fit_score: float
    xgboost_rank: float
    lime_data: List[Any]
    fit_breakdown: Dict[str, Any]
    resume_quality: Dict[str, Any]
