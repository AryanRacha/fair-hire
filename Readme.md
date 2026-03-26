# Fare Hire

This project is part of my Ethics in AI coursework. It is a complete platform where recruiters can create jobs, generate resume upload link and screen resumes.

## Project Working

- Recuriters can create jobs and generate a resume upload link which they can share with the candidates.
- Candidates can upload their resumes which be stored in an object store.
- The ML Service will extract the text from the resumes, perform rule-based filtering and scoring, and then use XGBoost to rank the resumes.

## Tech Stack

- Frontend: React
- Backend: Express.js (API) + FastAPI (ML Service)
- Database: MongoDB
- Object Store: Cloudinary
- AI: Rule-based + XGBoost

## API Endpoints

1. Main Application Endpoints

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user
- POST /api/auth/logout - Logout a user
- POST /api/form - Create a new job form
- GET /api/form - Get all job forms
- GET /api/form/:id - Get a job form by ID
- POST /api/form/:id/candidate - Upload the form
- GET /api/form/:id/candidate - Get all candidates for a job form
- GET /api/form/:id/candidate/:candidateId - Get a candidate by ID

2. ML Service Endpoints

- POST /api/ml/screen - Screen a resume
- POST /api/ml/rank - Rank all resume ranks
- GET /api/ml/rank/:id - Get a rank by ID