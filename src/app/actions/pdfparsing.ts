'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/db";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function parseJobPDF(
  base64Data: string,
  retryCount = 0
): Promise<{ data: any } | null> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert AI Recruiter.
Analyze this government job notification PDF and extract the following details.

Return strictly valid JSON:
{
  "job_role": "String",
  "organization": "String",
  "salary": "String",
  "vacancy_count": "String",
  "location": "String",
  "skills_required": ["Array of strings"],
  "deadline": "String",
  "interview_questions": [
    "Question 1",
    "Question 2",
    "Question 3"
  ]
}

Return ONLY raw JSON. No markdown.
`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: base64Data,
              },
            },
          ],
        },
      ],
    });

    const text = result.response.text();

    const cleanText = text
      .replace(/```json|```/g, "")
      .trim();

    console.log("AI Raw Response:", cleanText);

    let parsedData: any;

    try {
      parsedData = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return null;
    }

    // // ✅ Save to DB
    // const savedJob = await db.job.create({
    //   data: {
    //     role: parsedData.job_role,
    //     organization: parsedData.organization,
    //     salary: parsedData.salary,
    //     location: parsedData.location || "Remote",
    //     deadline: parsedData.deadline,
    //     skills: parsedData.skills_required,
        
    //   },
    // });

    return {
      data: parsedData,
    };

  } catch (error: any) {
    console.error("Gemini Error:", error);

    if (error?.status === 429 && retryCount < 3) {
      const waitTime = Math.pow(2, retryCount) * 2000;
      console.log(`Rate limited. Retrying in ${waitTime / 1000}s...`);
      await delay(waitTime);
      return parseJobPDF(base64Data, retryCount + 1);
    }

    return null;
  }
}
