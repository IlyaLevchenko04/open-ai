export async function paraphraseText(input: string): Promise<string> {
  const res = await fetch('/api/paraphrase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
  });

  const data = await res.json();
  return data.result;
}
