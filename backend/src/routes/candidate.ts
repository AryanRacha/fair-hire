import express from "express";
import type { Router } from "express";
import { submitCandidate, getCandidatesByForm, getCandidateById } from "../controllers/candidate.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router: Router = express.Router({ mergeParams: true });

router.post("/", upload.single("resume"), submitCandidate);
router.get("/", protect, getCandidatesByForm);
router.get("/:candidateId", protect, getCandidateById);

export default router;
