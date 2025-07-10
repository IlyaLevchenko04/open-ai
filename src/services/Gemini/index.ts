import { GoogleGenerativeAI } from '@google/generative-ai';

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const geminiProvider = async (input: string): Promise<string> => {
  const model = gemini.getGenerativeModel({ model: 'gemini-2.5-pro' });
  const result = await model.generateContent(input);
  return result.response.text();
};
