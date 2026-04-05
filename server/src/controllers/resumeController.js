import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import imagekit from "../config/imageKit.js";
import Resume from "../models/resume.js";

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({
      userId,
      title,
      candidateId: new mongoose.Types.ObjectId(),
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });
    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getPublicResumeByid = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy;
    if (typeof resumeData === "string") {
      resumeDataCopy = JSON.parse(resumeData);
    } else {
      resumeDataCopy = structuredClone(resumeData);
    }

    const removeBackgroundEnabled =
      removeBackground === "yes" || removeBackground === true;

    if (image) {
      const canUploadToImageKit = Boolean(
        imagekit?.files?.upload &&
          process.env.IMAGEKIT_PUBLIC_KEY &&
          process.env.IMAGEKIT_URL_ENDPOINT
      );

      if (canUploadToImageKit) {
        const response = await imagekit.files.upload({
          file: fs.createReadStream(image.path),
          fileName: image.originalname || "resume.png",
          folder: "user-resumes",
          transformation: {
            pre:
              "w-300,h-300,fo-face,z-0.75" +
              (removeBackgroundEnabled ? ",e-bgremove" : ""),
          },
        });

        resumeDataCopy.personal_info = resumeDataCopy.personal_info || {};
        resumeDataCopy.personal_info.image = response.url;
      } else {
        const fileName = path.basename(image.path);
        resumeDataCopy.personal_info = resumeDataCopy.personal_info || {};
        resumeDataCopy.personal_info.image = `/uploads/${fileName}`;
      }
    }

    const resume = await Resume.findByIdAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

