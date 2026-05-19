'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";
import test from "node:test";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function testGeminiKey() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
console.log("Testing Gemini API Key...", process.env.GEMINI_API_KEY ? "Key found" : "No key found");
    const result = await model.generateContent("Say hello in one sentence.");
    const text = result.response.text();

    console.log("Gemini Response:", text);
    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "API Key not working";
  }
}

testGeminiKey().then(response => {
  console.log("Test Result:", response);
}).catch(error => {
  console.error("Test Error:", error);
});