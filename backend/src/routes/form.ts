import express from "express";
import type { Router } from "express";
import { createForm, getForms, getFormById } from "../controllers/form.js";
import { protect } from "../middlewares/auth.js";

const router: Router = express.Router();

router.post("/", protect, createForm);
router.get("/", protect, getForms);
router.get("/:id", getFormById);

export default router;
