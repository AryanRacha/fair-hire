import axios from "axios";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

export const screenResume = async (resumeUrl: string, requirements: string[]) => {
    try {
        const response = await axios.post(`${ML_SERVICE_URL}/api/ml/screen`, {
            resumeUrl,
            requirements,
        });

        // The FastAPI service should return { score, text, rank, etc. }
        // For now, assume it returns { score: number, text: string }
        return response.data;
    } catch (error) {
        console.error("ML Service Error: ", error);
        // Fallback default values if the ML service is down or fails
        return { score: 0, text: "Failed to extract text from resume" };
    }
};
