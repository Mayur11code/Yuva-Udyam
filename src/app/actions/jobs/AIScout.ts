'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";
import { scrapeGovtPortal } from "./Scraper"; // Your existing automation

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function aiJobScout() {
  try {
    // 1. Initialize Gemini with Search Capabilities
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    // 2. The Search Prompt
    // We target PSU and Research organizations often overlooked
    const prompt = `
      Search for current active government job notifications in India (February 2026).
      Focus on organizations like: ISRO, DRDO, BARC, CSIR, and various PSUs.
      
      Return a JSON list of official direct PDF URLs or 'What's New' page links:
      {
        "discoveries": [
          { "organization": "string", "url": "string", "description": "string" }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const data = JSON.parse(result.response.text());

    // 3. Chain to Scraper
    // We can now take these discovered URLs and pass them to your existing 
    // scraping and Gemini-parsing pipeline.
    for (const discovery of data.discoveries) {
       console.log(`AI Scout found: ${discovery.organization} at ${discovery.url}`);
       // Trigger your existing scraper logic on these new links
       // await scrapeCustomPortal(discovery.url); 
    }

    return { success: true, count: data.discoveries.length, data: data.discoveries };
  } catch (error) {
    console.error("AI Scout Error:", error);
    return { success: false };
  }
}