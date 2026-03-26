import type { Request, Response } from "express";
import Form from "../models/Form.js";
import type { AuthRequest } from "../middlewares/auth.js";

export const createForm = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { title, description, requirements } = req.body;

        if (!title || !description) {
            res.status(400).json({ message: "Please provide title and description" });
            return;
        }

        const form = await Form.create({
            title,
            description,
            requirements: requirements || [],
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
        const form = await Form.findById(req.params.id);
        if (!form) {
            res.status(404).json({ message: "Form not found" });
            return;
        }
        res.json(form);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
