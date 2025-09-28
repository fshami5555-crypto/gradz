import { GoogleGenAI } from "@google/genai";

// Fix: Per Gemini API guidelines, initialize with process.env.API_KEY directly.
// It's assumed to be available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

export const getAIResponse = async (history: { user: string; bot: string; }[], newPrompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
    return "AI service is not configured. Please set the API_KEY environment variable.";
  }

  try {
    // Fix: Construct a structured chat history for the model. This is more robust than a single string.
    const chatHistory = history.flatMap(turn => ([
        { role: 'user' as const, parts: [{ text: turn.user }] },
        { role: 'model' as const, parts: [{ text: turn.bot }] },
    ]));

    const response = await ai.models.generateContent({
      model,
      contents: [...chatHistory, { role: 'user', parts: [{ text: newPrompt }] }],
      config: {
        systemInstruction: "You are Gradz AI, a friendly and knowledgeable study buddy for university students. Explain concepts clearly, provide helpful examples, and encourage learning. Keep your responses concise and relevant to academia. Respond in the same language as the user's prompt (English or Arabic). أنت Gradz AI، المساعد الدراسي الذكي والودود لطلاب الجامعات. اشرح المفاهيم بوضوح، قدم أمثلة مفيدة، وشجع على التعلم. اجعل إجاباتك موجزة وذات صلة بالمواضيع الأكاديمية. أجب بنفس لغة سؤال المستخدم (الإنجليزية أو العربية).",
        temperature: 0.7,
        topP: 0.95,
      }
    });
    
    // Per Gemini API guidelines, `response.text` is the correct way to get the text output.
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error. Please try again later.";
  }
};