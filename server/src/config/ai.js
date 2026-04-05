import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";

// IMPORTANT: In ESM, dependencies can evaluate before `server.js` runs.
// Load env here so `process.env` is available when we construct the client.
dotenv.config({ path: path.join(process.cwd(), ".env") });

const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
const baseURL = process.env.OPENAI_BASE_URL;

let ai = null;

if (!apiKey) {
  console.warn(
    "[AI] Missing API key. Set `OPENAI_API_KEY` or `GEMINI_API_KEY` in server/.env. AI endpoints will return 500."
  );
} else if (!baseURL) {
  console.warn(
    "[AI] Missing OPENAI_BASE_URL. AI endpoints may fail until configured."
  );
} else {
  ai = new OpenAI({ apiKey, baseURL });
}

export default ai;

