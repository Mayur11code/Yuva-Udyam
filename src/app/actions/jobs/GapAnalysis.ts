'use server' // CRITICAL: This directive tells Next.js this code only runs on the server

import { db } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateCareerRoadmap(userId: string, jobId: string) {
  try {
    // 1. Fetch data from Neon Postgres (Server-only operation)
    const user = await db.user.findUnique({ where: { id: userId } });
    const job = await db.job.findUnique({ where: { id: jobId } });

    if (!user || !job) {
      console.error("User or Job not found in database.");
      return null;
    }

    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      User Skills: ${user.skills.length > 0 ? user.skills.join(", ") : "None listed"}
      Job Requirements: ${job.skills.join(", ")} (Role: ${job.role})

      Identify the gaps and create a 3-step roadmap to cover them.
      Return JSON:
      {
        "missingSkills": ["skill1"],
        "roadmap": [
          { "step": "Phase 1", "task": "Learn X", "resource": "Free course link or suggestion" }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("Server Action Error:", error);
    throw new Error("Failed to generate roadmap on server.");
  }
}