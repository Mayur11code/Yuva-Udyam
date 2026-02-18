'use server'

import { db } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function evaluateInterview(
  userId: string,
  jobId: string,
  transcript: string,
  question: string
) {
  try {
    // 1️⃣ Get Job Context
    const job = await db.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new Error("Job context lost.");
    }

    // 2️⃣ Create Model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // safer + stable
    });

    const prompt = `
You are an expert technical interviewer.

Job Role: ${job.role}
Interview Question: ${question}
Candidate Answer: ${transcript}

Evaluate the answer based on:
- Technical accuracy
- Clarity
- Relevance to ${job.role}

Return ONLY valid JSON (no markdown, no explanation):

{
  "score": number (0-100),
  "feedback": "string (max 2 sentences)",
  "strengths": ["string"],
  "weaknesses": ["string"]
}
`;

    // 3️⃣ Generate Content
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    });

    const rawText = result.response.text();

    let evaluation;

    try {
      evaluation = JSON.parse(rawText);
    } catch (err) {
      console.error("Invalid JSON from Gemini:", rawText);
      throw new Error("AI returned invalid JSON.");
    }

    // 4️⃣ Validate AI response
    if (
      typeof evaluation.score !== "number" ||
      typeof evaluation.feedback !== "string"
    ) {
      throw new Error("AI response missing required fields.");
    }

    // Clamp score to 0–100
    evaluation.score = Math.max(0, Math.min(100, evaluation.score));

    // 5️⃣ Upsert Application
    const application = await db.application.upsert({
      where: {
        userId_jobId: {
          userId,
          jobId,
        },
      },
      update: {
        status: "Applied",
      },
      create: {
        userId,
        jobId,
        status: "Applied",
      },
    });

    // 6️⃣ Save Interview Result
    await db.interview.upsert({
      where: { applicationId: application.id },
      update: {
        score: evaluation.score,
        feedback: evaluation.feedback,
        transcript,
      },
      create: {
        applicationId: application.id,
        score: evaluation.score,
        feedback: evaluation.feedback,
        transcript,
      },
    });

    return {
      success: true,
      evaluation,
    };
  } catch (error) {
    console.error("Evaluation Error:", error);
    return { success: false, error: "Evaluation failed." };
  }
}
