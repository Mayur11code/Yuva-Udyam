'use server'
import { db } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function uploadAndStoreResume(userId: string, base64Resume: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 1. Extract raw text and skills using Gemini
    const prompt = `Extract all professional skills and a summary of experience from this resume. 
                    Return JSON: { "skills": ["skill1", "skill2"], "summary": "string" }`;
    
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64Resume, mimeType: "application/pdf" } }
    ]);

    const aiData = JSON.parse(result.response.text().replace(/```json|```/g, ''));

    // 2. Save to Neon Postgres
    // 2. Save or Update in Neon Postgres
await db.user.upsert({
  where: { id: userId },
  update: {
    resumeText: aiData.summary,
    skills: aiData.skills,
    // Add other fields you want to update
  },
  create: {
    id: userId,
    email: "raj.forge@example.com", // Placeholder since it's required in your schema
    name: "Raj Singh",
    role: "USER",
    resumeText: aiData.summary,
    skills: aiData.skills,
  },
});
    return { success: true, skills: aiData.skills };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}