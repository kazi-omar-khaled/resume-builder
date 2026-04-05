import multer from "multer";

/** In-memory uploads for PDF parsing (no disk write). */
export const resumePdfUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const name = (file.originalname || "").toLowerCase();
    const ok =
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/x-pdf" ||
      name.endsWith(".pdf");
    if (ok) cb(null, true);
    else cb(new Error("Only PDF files are supported for upload"));
  },
});
