'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, RotateCcw, Sparkles, ShieldCheck, ArrowUpRight } from 'lucide-react';
import Avatar from './avatar/Avatar';
import { SectionHead, revealSection, useGsap } from './ui/motion';
import { openCase } from './Projects';
import { askSuggestions, projects, profile } from '@/data/content';

type Msg = { id: number; role: 'user' | 'assistant'; content: string; projects?: string[]; error?: boolean };

const WELCOME: Msg = {
  id: 0, role: 'assistant',
  content: `Hi! I'm an AI assistant that answers from ${profile.firstName}'s resume and projects. Ask me about his experience, the things he has built or how he works. If I don't know something, I'll say so.`,
};

function Face({ size = 40 }: { size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center overflow-hidden rounded-full bg-sage" style={{ width: size, height: size }}>
      <Avatar pose="wave" expression="smile" crop float={false} className="h-full w-full" title="Ask Hitesh assistant" />
    </span>
  );
}

export default function AskHitesh() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const nextId = useRef(1);

  useGsap(root, () => revealSection(root.current));
  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' }); }, [msgs, busy]);

  async function send(q: string) {
    const question = q.trim().slice(0, 600);
    if (!question || busy) return;
    const user: Msg = { id: nextId.current++, role: 'user', content: question };
    const history = [...msgs.filter((m) => m.id !== 0 && !m.error), user];
    setMsgs((m) => [...m, user]);
    setText('');
    setBusy(true);
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.reply) throw new Error(j.error || 'The assistant could not answer right now.');
      setMsgs((m) => [...m, { id: nextId.current++, role: 'assistant', content: j.reply, projects: j.projects }]);
    } catch (e) {
      setMsgs((m) => [...m, { id: nextId.current++, role: 'assistant', content: `${(e as Error).message} You can always email ${profile.email}.`, error: true }]);
    } finally {
      setBusy(false);
      input.current?.focus({ preventScroll: true });
    }
  }

  const onSubmit = (e: FormEvent) => { e.preventDefault(); send(text); };
  const asked = new Set(msgs.filter((m) => m.role === 'user').map((m) => m.content));
  const chips = askSuggestions.filter((s) => !asked.has(s)).slice(0, msgs.length > 1 ? 3 : 6);

  return (
    <section id="ask" ref={root} aria-labelledby="ask-title" className="relative overflow-hidden bg-[#2D3A2E] py-24 text-[#F1EBDD] sm:py-32">
      <div aria-hidden className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#3E5040] blur-2xl" />
      <div className="wrap relative grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <SectionHead id="ask-title" light eyebrow="05 · Ask Hitesh" title="Curious about my work?" accent="Just ask." intro="Meet Ask Hitesh, your AI-powered guide to my experience, projects and technical journey." />
          <ul className="reveal mt-8 grid gap-3 text-[15px] text-[#D9E4DC]">
            <li className="flex gap-3"><Sparkles size={18} className="mt-0.5 shrink-0 text-[#E8C6B8]" />An AI assistant, not me in person. It answers from my resume and the projects on this page.</li>
            <li className="flex gap-3"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#E8C6B8]" />It will not invent experience or numbers. If it does not know, it says so.</li>
          </ul>
          <div className="reveal mt-10 hidden w-60 overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-[#D9E4DC] pt-6 lg:block"><Avatar pose="wave" title="Illustration of Hitesh waving hello" /></div>
        </div>

        <div className="reveal min-w-0 lg:col-span-7">
          <div className="flex h-[38rem] max-h-[80vh] flex-col overflow-hidden rounded-[2rem] bg-bg text-ink shadow-lift">
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
              <div className="flex items-center gap-3">
                <Face />
                <div>
                  <p className="font-display font-semibold">Ask Hitesh</p>
                  <p className="flex items-center gap-1.5 text-xs text-muted"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />AI assistant · grounded in my resume</p>
                </div>
              </div>
              {msgs.length > 1 && (
                <button onClick={() => setMsgs([WELCOME])} className="grid h-11 w-11 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink" aria-label="Start a new conversation"><RotateCcw size={17} /></button>
              )}
            </div>

            <div ref={list} className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5" aria-live="polite" aria-relevant="additions">
              <AnimatePresence initial={false}>
                {msgs.map((m) => (
                  <motion.div key={m.id} layout initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : ''}`}>
                    {m.role === 'assistant' && <Face size={30} />}
                    <div className={`max-w-[85%] ${m.role === 'user' ? 'order-1' : ''}`}>
                      <div className={`whitespace-pre-line rounded-3xl px-4 py-3 text-[15px] leading-relaxed ${m.role === 'user' ? 'rounded-br-lg bg-[#2D3A2E] text-[#F1EBDD]' : m.error ? 'rounded-tl-lg border border-[#C2553D]/40 bg-[#C2553D]/10' : 'rounded-tl-lg border border-line bg-paper'}`}>
                        <span className="sr-only">{m.role === 'user' ? 'You: ' : 'Assistant: '}</span>{m.content}
                      </div>
                      {m.projects && m.projects.length > 0 && (
                        <div className="mt-2 grid gap-2 sm:grid-cols-2">
                          {m.projects.map((id) => {
                            const p = projects.find((x) => x.id === id);
                            if (!p) return null;
                            return (
                              <button key={id} onClick={() => openCase(id)} className="group flex items-center justify-between gap-2 rounded-2xl border border-line bg-paper p-3 text-left transition-colors hover:border-ink/40">
                                <span><span className="block text-sm font-semibold">{p.name}</span><span className="block text-xs text-muted">Open case study</span></span>
                                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {busy && (
                  <motion.div key="typing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2.5">
                    <Face size={30} />
                    <div className="typing rounded-3xl rounded-tl-lg border border-line bg-paper px-4 py-3.5 text-muted" aria-label="Assistant is typing">
                      <span>●</span> <span>●</span> <span>●</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {chips.length > 0 && (
              <div className="flex gap-2 overflow-x-auto px-4 pb-3 sm:flex-wrap sm:px-5" aria-label="Suggested questions">
                {chips.map((s, i) => (
                  <motion.button key={s} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                    onClick={() => send(s)} disabled={busy}
                    className="min-h-[40px] shrink-0 rounded-full border border-line bg-paper px-3.5 text-sm transition-colors hover:border-ink/40 disabled:opacity-50">
                    {s}
                  </motion.button>
                ))}
              </div>
            )}

            <form onSubmit={onSubmit} className="flex items-end gap-2 border-t border-line p-3 sm:p-4">
              <label htmlFor="ask-input" className="sr-only">Ask a question about Hitesh</label>
              <textarea id="ask-input" ref={input} value={text} onChange={(e) => setText(e.target.value)} maxLength={600} rows={1}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(text); } }}
                placeholder="Ask about my experience, projects or skills…"
                className="max-h-32 min-h-[44px] flex-1 resize-none rounded-2xl border border-line bg-paper px-4 py-2.5 text-[16px] outline-none placeholder:text-muted focus:border-ink/50" />
              <motion.button whileTap={{ scale: 0.92 }} type="submit" disabled={busy || !text.trim()} aria-label="Send question"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-onaccent transition-opacity disabled:opacity-40">
                <ArrowUp size={19} />
              </motion.button>
            </form>
          </div>
          <p className="mt-3 text-center text-xs text-[#D9E4DC]">AI answers can be imperfect. For anything important, email {profile.email}.</p>
        </div>
      </div>
    </section>
  );
}
