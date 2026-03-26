import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler
from lime.lime_tabular import LimeTabularExplainer
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Global states
model = None
scaler = StandardScaler()
explainer = None

def init_ml_models():
    global model, scaler, explainer
    
    model_path = BASE_DIR / "models" / "xgb_model.pkl"
    data_path = BASE_DIR / "data" / "ai_resume_screening.csv"
    
    # Load XGBoost
    with open(model_path, "rb") as f:
        model = pickle.load(f)
        
    # Load Scaler & Explainer
    try:
        df = pd.read_csv(data_path)
        numerical_cols = ['years_experience', 'skills_match_score', 'resume_length']
        scaler.fit(df[numerical_cols])
        print("StandardScaler fitted successfully from ai_resume_screening.csv.")
        
        # Build explainer
        df_encoded = df.copy()
        edu_map = {'High School': 0, 'Bachelors': 1, 'Masters': 2, 'PhD': 3}
        df_encoded['education_level'] = df_encoded['education_level'].map(edu_map).fillna(0)
        df_encoded[numerical_cols] = scaler.transform(df_encoded[numerical_cols])
        
        X_train = df_encoded[['years_experience', 'skills_match_score', 'education_level', 'resume_length']]
        
        explainer = LimeTabularExplainer(
            training_data=X_train.values,
            feature_names=X_train.columns.tolist(),
            class_names=['Not Shortlisted', 'Shortlisted'],
            mode='classification'
        )
        print("LIME Explainer initialized successfully.")
    except Exception as e:
        print(f"Warning: Could not fit scaler or explainer from dataset: {e}")
        scaler.mean_ = np.array([7.50656667, 73.68265333, 572.5847])
        scaler.scale_ = np.array([4.62402677, 16.76562974, 178.70693913])
        scaler.var_ = scaler.scale_ ** 2

def get_xgb_model():
    return model

def get_scaler():
    return scaler

def get_explainer():
    return explainer
