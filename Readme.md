# Fair Hire

This project is part of my Ethics in AI coursework. It is a complete platform where recruiters can create jobs, generate resume upload links, and intelligently screen resumes using unbiased Machine Learning models.

## Project Working

- Recruiters can create jobs and generate a resume upload link which they can share with candidates.
- Candidates can upload their resumes which are securely stored in Cloudinary.
- The ML Service extracts the text from the resumes, performs rule-based filtering and scoring, and then uses XGBoost to rank the resumes.
- Recruiters can view LIME explainability metrics to understand exactly why a candidate was ranked highly.

## Tech Stack

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js / Express.js
- **ML Service:** Python / FastAPI
- **Database:** MongoDB
- **AI/ML:** XGBoost + LIME + PyMuPDF

## Environment Variables

Create a `.env` file in the `backend` directory with the following keys:

```ini
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fair-hire
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ML_SERVICE_URL=http://127.0.0.1:8000
```

## How to Run Locally

You will need three separate terminal windows to run the full stack:

### 1. Frontend (React)
```bash
cd frontend
pnpm install
pnpm run dev
```

### 2. Backend (Node.js)
Requires a `.env` file with MongoDB and Cloudinary credentials.
```bash
cd backend
pnpm install
pnpm run dev
```

### 3. ML Service (Python / FastAPI)
Requires Python 3.10+.
```bash
cd ml-service
python -m venv .venv
# On Windows: .venv\Scripts\activate
# On Mac/Linux: source .venv/bin/activate
pip install -r requirements.txt
python main.py
```

## API Endpoints

### Main Application Endpoints (Node.js)
- `POST /api/auth/register` - Register a new recruiter
- `POST /api/auth/login` - Login to dashboard
- `POST /api/form` - Create a new job form
- `GET /api/form` - Get all job forms
- `GET /api/form/:id` - Get a job form by ID
- `PUT /api/form/:id` - Update a job form
- `DELETE /api/form/:id` - Delete a job form
- `POST /api/form/:id/candidate` - Submit a candidate application
- `GET /api/form/:id/candidate` - Get all candidates for a job

### ML Service Endpoints (FastAPI)
- `POST /score` - Ingests candidates, extracts PDF, runs rule-based & XGBoost ranking routines, and returns LIME neural drivers.