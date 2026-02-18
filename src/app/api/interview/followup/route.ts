import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const { jobId, answer, previousQuestion } = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are a strict Indian IAS interviewer.

Previous Question:
${previousQuestion}

Candidate Answer:
${answer}

If answer is weak → cross-question sharply.
If strong → escalate difficulty.
Ask ONE follow-up question only.
Keep under 2 sentences.
Speak in Hinglish.
`;

  const result = await model.generateContent(prompt);
  return NextResponse.json({ nextQuestion: result.response.text() });
}
