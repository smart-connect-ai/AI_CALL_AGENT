import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

let conversationHistory = [];

export async function askQuestion(prompt) {
  conversationHistory.push({ role: "user", content: prompt });

  const formattedHistory = conversationHistory.map(entry => ({
    role: entry.role,
    parts: entry.content
      ? [
          {
            data: { text: entry.content } // Ensure 'data.text' is properly initialized
          }
        ]
      : [] // Handle cases where 'content' is missing
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: formattedHistory,
  });

  conversationHistory.push({ role: "model", content: response.text });

  return response.text;
}

export function resetConversation() {
  conversationHistory = [];
}
