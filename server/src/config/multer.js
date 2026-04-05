import multer from "multer";
import path from "path";

const uploadDir = "uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "");
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `resume-${unique}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;

