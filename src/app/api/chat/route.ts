import { NextResponse } from 'next/server';
import { askGemini, AiError, type ChatMsg } from '@/lib/ai/gemini';
import { limit } from '@/lib/ai/rate-limit';
import { buildKnowledge, SYSTEM_PROMPT } from '@/data/knowledge-base';
import { projects } from '@/data/content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SYSTEM = SYSTEM_PROMPT + buildKnowledge();
const MAX_MSG = 600;
const MAX_TURNS = 10;
const ALIASES: Record<string, RegExp> = {
  cairn: /\bcairn\b/i,
  'meeting-to-action': /meeting[- ]to[- ]action/i,
  sensai: /\bsensai\b/i,
  kulies: /\bkulies\b/i,
  employees: /employee management/i,
  pokedex: /pokedex|product listing page/i,
};
const PROJECT_NAMES = projects.filter((p) => ALIASES[p.id]).map((p) => ({ id: p.id, re: ALIASES[p.id] }));

function clean(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/^#+\s*/gm, '').replace(/^\s*[*-]\s+/gm, '• ').replace(/\+?91[\s-]?\d{10}|\b\d{10}\b/g, '[private]').trim();
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'anon';
  const mine = limit(`ip:${ip}`, 15, 10 * 60_000);
  const all = limit('global', 300, 60 * 60_000);
  if (!mine.ok || !all.ok) {
    return NextResponse.json({ error: 'You have asked a lot of questions in a short time. Please wait a few minutes, or email Hitesh directly.' }, { status: 429, headers: { 'Retry-After': String(mine.retryAfter || all.retryAfter) } });
  }
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return NextResponse.json({ error: 'Ask me a question first.' }, { status: 400 });
  const messages: ChatMsg[] = raw.slice(-MAX_TURNS).map((m) => {
    const r = (m as { role?: string }).role === 'assistant' ? 'assistant' : 'user';
    const c = String((m as { content?: unknown }).content ?? '').slice(0, MAX_MSG);
    return { role: r as ChatMsg['role'], content: c };
  }).filter((m) => m.content.trim());
  if (!messages.length || messages[messages.length - 1].role !== 'user') return NextResponse.json({ error: 'Ask me a question first.' }, { status: 400 });
  while (messages.length && messages[0].role === 'assistant') messages.shift();

  try {
    const reply = clean(await askGemini(SYSTEM, messages));
    const asked = messages[messages.length - 1].content;
    const ids = PROJECT_NAMES.filter((p) => p.re.test(reply) || p.re.test(asked)).map((p) => p.id).slice(0, 2);
    return NextResponse.json({ reply, projects: ids });
  } catch (e) {
    const err = e instanceof AiError ? e : new AiError('The assistant could not answer right now.', 502);
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
}

export function GET() {
  return NextResponse.json({ ok: true, configured: Boolean(process.env.GEMINI_API_KEY) });
}
