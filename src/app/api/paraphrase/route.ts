import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { input } = await req.json();

  if (!input) {
    return NextResponse.json({ error: 'No input provided' }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful text paraphrasing assistant.',
        },
        { role: 'user', content: `Paraphrase the following:\n\n${input}` },
      ],
      temperature: 0.7,
    });

    const result = response.choices[0].message.content;
    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
