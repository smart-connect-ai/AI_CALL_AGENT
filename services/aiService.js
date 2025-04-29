import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

let conversationHistory = [];

export async function askQuestion(prompt) {
  conversationHistory.push({ role: "user", content: prompt });

  const formattedHistory = conversationHistory.map(entry => ({
    role: entry.role,
    data: { text: entry.content } // Ensure the 'data' field is properly initialized
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash-001',
    contents: formattedHistory,
  });

  conversationHistory.push({ role: "model", content: response.text });

  return response.text;
}

export function resetConversation() {
  conversationHistory = [];
}
