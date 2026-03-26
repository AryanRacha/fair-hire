import type { Request, Response } from "express";
import Candidate from "../models/Candidate.js";
import Form from "../models/Form.js";
import { screenCandidate } from "../utils/mlService.js";
import cloudinary from "../utils/cloudinary.js";

export const submitCandidate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { formId } = req.params;
        const { name, email } = req.body;

        if (!name || !email) {
            res.status(400).json({ message: "Name and email are required" });
            return;
        }

        if (!req.file) {
            res.status(400).json({ message: "Resume file is required" });
            return;
        }

        const form = await Form.findById(formId);
        if (!form) {
            res.status(404).json({ message: "Form not found" });
            return;
        }

        // multer-storage-cloudinary attaches the secure URL as req.file.path
        const resumeUrl = req.file.path;

        try {
            // 1. Call ML Service API through utility helper
            const mlResult = await screenCandidate(resumeUrl, form.requirements);

            // 2. Create candidate ONLY if ML service succeeds
            const candidate = await Candidate.create({
                formId: String(formId),
                name,
                email,
                resumeUrl,
                matchScore: mlResult.xgboost_rank,
                fitScore: mlResult.fit_score,
                fitBreakdown: mlResult.fit_breakdown,
                resumeQuality: mlResult.resume_quality,
                limeData: mlResult.lime_data,
            });

            // Increment the candidate count on the parent form
            await Form.findByIdAndUpdate(formId, { $inc: { candidatesCount: 1 } });

            res.status(201).json(candidate);
        } catch (mlErr: any) {
            console.error("ML Service failed. Candidate application aborted.", mlErr.message || mlErr);
            
            if (req.file && req.file.filename) {
                try {
                    await cloudinary.uploader.destroy(req.file.filename);
                    console.log(`Deleted orphan Cloudinary file: ${req.file.filename}`);
                } catch (cloudinaryErr) {
                    console.error("Failed to clean up Cloudinary file:", cloudinaryErr);
                }
            }

            res.status(502).json({ 
                message: "Application could not be processed due to scoring engine failure.",
                error: mlErr.message || "Unknown ML error" 
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const getCandidatesByForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const { formId } = req.params;
        const candidates = await Candidate.find({ formId: String(formId) }).sort({ matchScore: -1, createdAt: -1 });
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getCandidateById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { candidateId } = req.params;
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            res.status(404).json({ message: "Candidate not found" });
            return;
        }
        res.json(candidate);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
