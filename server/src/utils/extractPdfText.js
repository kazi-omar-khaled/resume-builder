import { extractText } from "unpdf";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

function normalizeText(raw) {
  return String(raw ?? "")
    .replace(/\u0000/g, " ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[ \t\f\v]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Extract plain text from a PDF buffer. Uses modern PDF.js (unpdf) first,
 * then pdf-parse for PDFs the older engine still handles better.
 */
export async function extractTextFromPdfBuffer(buffer) {
  if (!buffer?.length) return "";

  const u8 = Buffer.isBuffer(buffer) ? new Uint8Array(buffer) : new Uint8Array(buffer);

  let best = "";

  try {
    const { text } = await extractText(u8, { mergePages: true });
    const t = normalizeText(text);
    if (t.length > best.length) best = t;
  } catch {
    // try fallback below
  }

  try {
    const parsed = await pdfParse(Buffer.from(u8));
    const t = normalizeText(parsed.text);
    if (t.length > best.length) best = t;
  } catch {
    // ignore
  }

  return best;
}
