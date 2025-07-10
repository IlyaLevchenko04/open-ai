import { openaiProvider } from '@/services/OpenAi';
import { geminiProvider } from '@/services/Gemini';

const providers = [
  { name: 'OpenAI', fn: openaiProvider },
  { name: 'Gemini', fn: geminiProvider },
];

export async function runWithFallback(input: string): Promise<string> {
  const tasks = providers.map(({ name, fn }) =>
    fn(input)
      .then(result => {
        console.log(`[AI Fallback] Provider '${name}' SUCCESS`);
        return result;
      })
      .catch(error => {
        console.log(`[AI Fallback] Provider '${name}' ERROR:`, error);
        throw error;
      })
  );
  try {
    const result = await Promise.any(tasks);
    console.log(
      `[AI Fallback] Returning result from first successful provider`
    );
    return result;
  } catch (err) {
    console.log('[AI Fallback] All providers failed.', err);
    throw new Error('All providers failed.');
  }
}
