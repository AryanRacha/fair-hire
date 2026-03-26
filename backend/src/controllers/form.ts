import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/auth.js";
import Form from "../models/Form.js";

export const createForm = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { title, skills, year_of_experience, education } = req.body;

        if (!title) {
            res.status(400).json({ message: "Please provide title" });
            return;
        }

        const form = await Form.create({
            title,
            requirements: {
                skills: skills || [],
                experience: year_of_experience || 0,
                education: education || []
            },
            createdBy: req.user!.id,
        });

        res.status(201).json(form);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getForms = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const forms = await Form.find({ createdBy: req.user!.id }).sort({ createdAt: -1 });
        res.json(forms);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getFormById = async (req: Request, res: Response): Promise<void> => {
    try {
        const form = await Form.findById(req.params.formId).populate("createdBy", "companyName");
        if (!form) {
            res.status(404).json({ message: "Form not found" });
            return;
        }
        res.json(form);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const updateForm = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const formId = req.params.formId as string;
        const { title, skills, year_of_experience, education } = req.body;
        const form = await Form.findOne({ _id: formId, createdBy: req.user!.id });
        
        if (!form) {
            res.status(404).json({ message: "Form not found or unauthorized" });
            return;
        }

        form.title = title || form.title;
        if (skills || year_of_experience !== undefined || education) {
             form.requirements = {
                 skills: skills || form.requirements.skills,
                 experience: year_of_experience !== undefined ? year_of_experience : form.requirements.experience,
                 education: education || form.requirements.education
             };
        }
        await form.save();
        res.json(form);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const deleteForm = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const formId = req.params.formId as string;
        const form = await Form.findOneAndDelete({ _id: formId, createdBy: req.user!.id });
        if (!form) {
            res.status(404).json({ message: "Form not found or unauthorized" });
            return;
        }
        res.json({ message: "Form deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
