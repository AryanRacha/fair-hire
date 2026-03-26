import express from "express";
import type { Router } from "express";
import { createForm, getForms, getFormById, updateForm, deleteForm } from "../controllers/form.js";
import { protect } from "../middlewares/auth.js";

const router: Router = express.Router();

router.post("/", protect, createForm);
router.get("/", protect, getForms);
router.get("/:formId", getFormById);
router.put("/:formId", protect, updateForm);
router.delete("/:formId", protect, deleteForm);
export default router;
