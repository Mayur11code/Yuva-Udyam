'use server'

import { db } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function startAIInterview(userId: string, jobId: string) {
  // 1. INPUT VALIDATION: Ensure IDs aren't undefined or empty
  if (!userId || !jobId) {
    console.error("Missing IDs:", { userId, jobId });
    throw new Error("Invalid User or Job ID provided.");
  }

  try {
    const user = await db.user.findUnique({ where: { id: userId } });
    const job = await db.job.findUnique({ where: { id: jobId } });

    if (!user || !job) throw new Error("Data sync error: Record not found.");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an elite technical recruiter for ${job.organization}. 
      Candidate: ${user.name}
      Candidate Skills: ${user.skills.join(", ")}
      Job Role: ${job.role}
      Required Skills: ${job.skills.join(", ")}

      Task: Based on the candidate's skills, identify one major "Gap" or "Weakness" relative to this job. 
      Ask ONE deep, technical, and challenging behavioral or situational question to test their competence in that specific gap.

      Return ONLY the question text.Don't Ask TOO long or TOO short questions. Make it engaging and relevant to the job role.
      Grill the candidate on real-world scenarios that test their problem-solving, adaptability, and depth of knowledge in the identified gap area.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    console.error("Interview Engine Error:", error.message);
    throw new Error(error.message || "Failed to start interview.");
  }
}