from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn

from core.ml_model import init_ml_models
from api.routes import router as ml_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_ml_models()
    yield

app = FastAPI(
    title="Fare Hire ML Service", 
    description="Modular ML Backend for scoring resumes using Rule-based + XGBoost + LIME",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ml_router, prefix="/api/ml", tags=["ML Scoring"])

@app.get("/")
def health_check():
    return {"status": "ok", "message": "ML Service is running modularly!"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
