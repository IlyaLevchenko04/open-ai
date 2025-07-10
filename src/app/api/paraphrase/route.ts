import { runWithFallback } from '@/utils/ai/aiManager';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { input } = await req.json();

  if (!input) {
    return NextResponse.json({ error: 'Missing input' }, { status: 400 });
  }

  try {
    const result = await runWithFallback(input);
    return NextResponse.json({ result });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'All providers failed' },
      { status: 500 }
    );
  }
}
