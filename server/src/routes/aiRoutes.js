import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { resumePdfUpload } from "../config/multerMemory.js";
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from "../controllers/aiController.js";

const aiRouter = express.Router();

const uploadResumePdf = (req, res, next) => {
  resumePdfUpload.single("resume")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || "File upload failed" });
    }
    next();
  });
};

aiRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);
aiRouter.post("/enhance-job-desc", protect, enhanceJobDescription);
aiRouter.post("/upload-resume", protect, uploadResumePdf, uploadResume);

export default aiRouter; 