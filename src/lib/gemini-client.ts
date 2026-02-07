import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI client
const apiKey = process.env.GEMINI_API_KEY || "";
if (!apiKey && typeof window === "undefined") {
    console.warn("⚠️ GEMINI_API_KEY not found in environment variables");
}

const ai = new GoogleGenAI({ apiKey });

// Configuration for consistent AI generation (SAFE FOR JSON)
const generationConfig = {
    temperature: 0.3,        // lower creativity → valid JSON
    topP: 0.9,
    topK: 20,
    maxOutputTokens: 8192,   // increased to prevent truncation
};

/* -------------------------------------------------------
   Utility helpers
------------------------------------------------------- */

// Remove markdown wrappers if Gemini adds them
function stripMarkdown(text: string): string {
    let clean = text.trim();
    if (clean.startsWith("```json")) {
        clean = clean.replace(/^```json\s*/, "").replace(/```\s*$/, "");
    } else if (clean.startsWith("```")) {
        clean = clean.replace(/^```\s*/, "").replace(/```\s*$/, "");
    }
    return clean;
}

// Safe JSON parsing with small repair attempts
function safeJsonParse<T>(text: string): T {
    try {
        return JSON.parse(text);
    } catch {
        const repaired = text
            .replace(/,\s*}/g, "}")
            .replace(/,\s*]/g, "]");
        return JSON.parse(repaired);
    }
}

// Safely extract text from Gemini SDK response
function extractText(response: any): string {
    const candidate = response?.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Empty or invalid Gemini response");
    return text;
}

/* -------------------------------------------------------
   Structured JSON Call
------------------------------------------------------- */

export async function callGeminiStructured<T>(
    prompt: string,
    schema?: string
): Promise<T> {

    const fullPrompt = `
You are a STRICT JSON API.

RULES (MANDATORY):
- Output MUST be valid JSON
- Use double quotes only
- Escape all newlines as \\n
- Do NOT include markdown
- Do NOT include explanations outside JSON
- If unsure, shorten strings instead of adding commentary

Return EXACTLY this structure:

{
  "result": <JSON_OBJECT_MATCHING_SCHEMA>
}

${schema ? `Schema:\n${schema}` : ""}

USER PROMPT:
${prompt}
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: generationConfig,
            contents: [{ parts: [{ text: fullPrompt }] }],
        });

        const rawText = extractText(response);
        const cleanText = stripMarkdown(rawText);
        console.log("🔎 GEMINI RAW OUTPUT:\n", cleanText);
        const parsed = safeJsonParse<{ result: T }>(cleanText);
        return parsed.result;

    } catch (error) {
        console.error("❌ Error calling Gemini AI (structured):", error);
        throw new Error(`Failed to get structured response from AI`);
    }
}

/* -------------------------------------------------------
   Regular Text Call
------------------------------------------------------- */

export async function callGemini(prompt: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: generationConfig,
            contents: [{ parts: [{ text: prompt }] }],
        });

        return extractText(response);

    } catch (error) {
        console.error("❌ Error calling Gemini AI:", error);
        throw new Error(`Failed to get response from AI`);
    }
}

/* -------------------------------------------------------
   Batch Gemini Calls (Optimized)
------------------------------------------------------- */

export async function batchGeminiCalls<T>(
    prompts: { id: string; prompt: string; schema?: string }[]
): Promise<Map<string, T>> {

    const results = new Map<string, T>();

    const combinedPrompt = `
You are an AI reasoning engine.

For each analysis below, return a JSON object.
Respond with ONE JSON object where each key matches the analysis ID.

RULES:
- Valid JSON only
- No markdown
- No text outside JSON

${prompts.map((p, idx) => `
ANALYSIS ${idx + 1}
ID: ${p.id}
PROMPT:
${p.prompt}
${p.schema ? `SCHEMA:\n${p.schema}` : ""}
`).join("\n")}

Return format:
{
${prompts.map(p => `"${p.id}": {}`).join(",\n")}
}
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: generationConfig,
            contents: [{ parts: [{ text: combinedPrompt }] }],
        });

        const rawText = extractText(response);
        const cleanText = stripMarkdown(rawText);

        const parsed = safeJsonParse<Record<string, T>>(cleanText);

        for (const p of prompts) {
            if (parsed[p.id]) {
                results.set(p.id, parsed[p.id]);
            }
        }

        return results;

    } catch (error) {
        console.error("❌ Error in batch Gemini calls:", error);
        throw new Error(`Failed to batch process AI requests`);
    }
}
