'use server'

import { db } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// --- ACTION 1: RESUME PERSISTENCE ---
export async function uploadAndStoreResume(userId: string, base64Resume: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Use 1.5 Flash for stability

    const prompt = `Extract all professional skills and a summary of experience from this resume. 
                    Return JSON: { "skills": ["skill1", "skill2"], "summary": "string" }`;
    
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64Resume, mimeType: "application/pdf" } }
    ]);

    const aiData = JSON.parse(result.response.text().replace(/```json|```/g, ''));

    await db.user.upsert({
      where: { id: userId },
      update: {
        resumeText: aiData.summary,
        skills: aiData.skills,
      },
      create: {
        id: userId,
        email: "raj.forge@example.com",
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

// --- ACTION 2: UNLISTED JOB DISCOVERY (THE MISSING PIECE) ---
export async function discoverUnlistedJob(pdfBase64: string) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      Analyze this government recruitment notification PDF. Extract the details into a structured format.
      Return JSON:
      {
        "role": "string",
        "organization": "string",
        "salary": "string",
        "location": "string",
        "deadline": "string",
        "skills": ["string"]
      }
    `;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: pdfBase64, mimeType: "application/pdf" } }
    ]);

    const jobData = JSON.parse(result.response.text());

    // Forge the unlisted job into the National Grid (Neon Postgres)
    return await db.job.create({
      data: {
        role: jobData.role,
        organization: jobData.organization,
        salary: jobData.salary,
        location: jobData.location,
        deadline: jobData.deadline,
        skills: jobData.skills,
        status: "Active"
      }
    });
  } catch (error) {
    console.error("Discovery Engine Error:", error);
    throw new Error("Failed to parse and forge the job notification.");
  }
}