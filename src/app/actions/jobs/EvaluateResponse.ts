'use server'

import { db } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function evaluateInterview(userId: string, jobId: string, transcript: string, question: string) {
  try {
    const job = await db.job.findUnique({ where: { id: jobId } });
    if (!job) throw new Error("Job context lost.");

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      You are an expert technical interviewer.
      Job Role: ${job.role}
      Interview Question: ${question}
      Candidate Answer: ${transcript}

      Evaluate the answer based on technical accuracy, clarity, and relevance to ${job.role}.
      
      Return ONLY valid JSON:
      {
        "score": number (0-100),
        "feedback": "string (2 sentences max)",
        "strengths": ["string"],
        "weaknesses": ["string"]
      }
    `;

    const result = await model.generateContent(prompt);
    const evaluation = JSON.parse(result.response.text());

    // 1. Find or create the Application record
    const application = await db.application.upsert({
      where: { 
        id: `${userId}-${jobId}` 
      },
      update: { status: "Applied" },
      create: { userId, jobId, status: "Applied" }
    });

    // 2. Save the Interview Result
    await db.interview.create({
      data: {
        applicationId: application.id,
        score: evaluation.score,
        feedback: evaluation.feedback,
        transcript: transcript
      }
    });

    return { success: true, evaluation };
  } catch (error) {
    console.error("Evaluation Error:", error);
    return { success: false };
  }
}