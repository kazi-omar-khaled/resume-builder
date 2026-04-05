import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

import dotenv from "dotenv";

import connectDB from "./src/config/db.js";
import userRouter from "./src/routes/userRoutes.js";
import resumeRouter from "./src/routes/resumeRoutes.js";
import aiRouter from "./src/routes/aiRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

// Ensure upload folder exists and serve uploaded images
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

app.get("/", (req, res) => res.send("server is live..."));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

