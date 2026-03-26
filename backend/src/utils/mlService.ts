import axios from "axios";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://127.0.0.1:8000";

export const screenCandidate = async (resumeUrl: string, requirements: any) => {
    try {
        const response = await axios.post(`${ML_SERVICE_URL}/api/ml/score`, {
            resume_url: resumeUrl,
            requirements: requirements,
        });

        return response.data;
    } catch (error: any) {
        console.error("ML Service Error: ", error?.response?.data || error.message);
        throw new Error("Failed to screen candidate using ML Service");
    }
};
