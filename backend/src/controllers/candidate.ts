import type { Request, Response } from "express";
import Candidate from "../models/Candidate.js";
import Form from "../models/Form.js";
import { screenResume } from "../utils/mlService.js";

export const submitCandidate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: formId } = req.params;
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

        // Optionally, call ML Service to screen
        const mlResult = await screenResume(resumeUrl, form.requirements);

        const candidate = await Candidate.create({
            formId: String(formId),
            name,
            email,
            resumeUrl,
            resumeText: mlResult.text,
            mlScore: mlResult.score,
        });

        res.status(201).json(candidate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const getCandidatesByForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: formId } = req.params;
        const candidates = await Candidate.find({ formId: String(formId) }).sort({ mlScore: -1, createdAt: -1 });
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
