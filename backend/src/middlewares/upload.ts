import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "resumes",
            resource_type: "raw", // Uploads as a generic file instead of an 'image' to bypass PDF delivery restrictions
            public_id: `${Date.now()}-${file.originalname}`,
        };
    },
});

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
