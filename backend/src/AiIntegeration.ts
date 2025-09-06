import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.DEEPSEEK_AI_API_KEY,
});

export async function generateRoadMap(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3.1:free",
      messages: [
        { role: "user", content: prompt }
      ],
    });

    const rawContent = completion.choices[0]?.message.content;
    if (!rawContent) throw new Error("AI did not return any content.");

    // console.log("Raw AI Response:", rawContent);

   
    let cleanContent = rawContent
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .replace(/^json\s*/i, "")             
      .replace(/^Cleaned Content:\s*/i, "") 
      .trim();

    // console.log("Cleaned Content:", cleanContent);

    const result = JSON.parse(cleanContent);
    return result;

  } catch (error) {
    console.error("Failed to generate or parse roadmap:", error);
    throw error;
  }
}

