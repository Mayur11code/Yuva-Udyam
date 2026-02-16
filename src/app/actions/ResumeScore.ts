'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeResume(base64Resume: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an expert ATS (Applicant Tracking System) analyst. 
      Analyze this resume and provide:
      1. A match score (0-100) based on standard government job requirements.
      2. Two specific strengths.
      3. Two specific areas for improvement.

      Return ONLY a JSON object:
      {
        "score": number,
        "strengths": ["string", "string"],
        "improvements": ["string", "string"]
      }
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Resume,
          mimeType: "application/pdf",
        },
      },
    ]);

    const response = await result.response;
    const text = response.text().replace(/```json|```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return null;
  }
}