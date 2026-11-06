const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

export type ChatMsg = { role: 'user' | 'assistant'; content: string };

export class AiError extends Error { constructor(message: string, public status: number) { super(message); } }

export async function askGemini(system: string, messages: ChatMsg[]): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new AiError('The assistant is not configured yet.', 503);
  const body = {
    systemInstruction: { parts: [{ text: system }] },
    contents: messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
    generationConfig: { temperature: 0.4, maxOutputTokens: 400, thinkingConfig: { thinkingBudget: 0 } },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  };
  for (let attempt = 0; attempt < 2; attempt++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key }, body: JSON.stringify(body), signal: ctrl.signal,
      });
      if (r.status >= 500 && attempt === 0) { await new Promise((res) => setTimeout(res, 800)); continue; }
      if (!r.ok) {
        console.error('gemini error', r.status, (await r.text()).slice(0, 300));
        throw new AiError(r.status === 429 ? 'The assistant is busy right now. Please try again in a minute.' : 'The assistant could not answer right now.', r.status === 429 ? 429 : 502);
      }
      const j = await r.json();
      const text: string = j?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? '').join('') ?? '';
      if (!text.trim()) throw new AiError('I could not find a good answer to that. Try asking about my projects or experience.', 422);
      return text;
    } catch (e) {
      if (e instanceof AiError) throw e;
      if (attempt === 0) continue;
      throw new AiError('The assistant took too long to answer. Please try again.', 504);
    } finally { clearTimeout(timer); }
  }
  throw new AiError('The assistant could not answer right now.', 502);
}
