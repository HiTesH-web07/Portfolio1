'use client';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, RotateCcw, ArrowUpRight, X } from 'lucide-react';
import Avatar from '../avatar/Avatar';
import { useChat } from './ChatContext';
import { askSuggestions, projects } from '@/data/content';

export function Face({ size = 40 }: { size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center overflow-hidden rounded-full bg-[#D9E4DC]" style={{ width: size, height: size }}>
      <Avatar pose="wave" expression="smile" crop float={false} className="h-full w-full" title="Ask Hitesh assistant" />
    </span>
  );
}

export default function ChatBox({ className = '', onClose, autoFocus = false, onOpenCase }: { className?: string; onClose?: () => void; autoFocus?: boolean; onOpenCase?: (id: string) => void }) {
  const { msgs, busy, send, reset } = useChat();
  const [text, setText] = useState('');
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const inputId = useId();

  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' }); }, [msgs, busy]);
  useEffect(() => { if (autoFocus) setTimeout(() => input.current?.focus({ preventScroll: true }), 350); }, [autoFocus]);

  const go = async (q: string) => { if (busy || !q.trim()) return; setText(''); await send(q); input.current?.focus({ preventScroll: true }); };
  const onSubmit = (e: FormEvent) => { e.preventDefault(); go(text); };
  const asked = new Set(msgs.filter((m) => m.role === 'user').map((m) => m.content));
  const chips = askSuggestions.filter((s) => !asked.has(s)).slice(0, msgs.length > 1 ? 3 : 6);
  const openCase = (id: string) => (onOpenCase ? onOpenCase(id) : window.dispatchEvent(new CustomEvent('open-case', { detail: id })));

  return (
    <div className={`flex flex-col overflow-hidden bg-bg text-ink ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <Face />
          <div>
            <p className="font-display font-semibold">Ask Hitesh</p>
            <p className="flex items-center gap-1.5 text-xs text-muted"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />AI assistant · grounded in my resume</p>
          </div>
        </div>
        <div className="flex items-center">
          {msgs.length > 1 && <button onClick={reset} className="grid h-11 w-11 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink" aria-label="Start a new conversation"><RotateCcw size={17} /></button>}
          {onClose && <button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink" aria-label="Close chat"><X size={19} /></button>}
        </div>
      </div>

      <div ref={list} className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5 sm:px-5" aria-live="polite" aria-relevant="additions">
        <AnimatePresence initial={false}>
          {msgs.map((m) => (
            <motion.div key={m.id} layout initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'assistant' && <Face size={30} />}
              <div className="max-w-[85%]">
                <div className={`whitespace-pre-line rounded-3xl px-4 py-3 text-[15px] leading-relaxed ${m.role === 'user' ? 'rounded-br-lg bg-[#2D3A2E] text-[#F1EBDD]' : m.error ? 'rounded-tl-lg border border-[#C2553D]/40 bg-[#C2553D]/10' : 'rounded-tl-lg border border-line bg-paper'}`}>
                  <span className="sr-only">{m.role === 'user' ? 'You: ' : 'Assistant: '}</span>{m.content}
                </div>
                {m.projects && m.projects.length > 0 && (
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {m.projects.map((id) => { const p = projects.find((x) => x.id === id); if (!p) return null; return (
                      <button key={id} onClick={() => openCase(id)} className="group flex items-center justify-between gap-2 rounded-2xl border border-line bg-paper p-3 text-left transition-colors hover:border-ink/40">
                        <span><span className="block text-sm font-semibold">{p.name}</span><span className="block text-xs text-muted">Open case study</span></span>
                        <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </button>
                    ); })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {busy && (
            <motion.div key="typing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2.5">
              <Face size={30} />
              <div className="typing rounded-3xl rounded-tl-lg border border-line bg-paper px-4 py-3.5 text-muted" aria-label="Assistant is typing"><span>●</span> <span>●</span> <span>●</span></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {chips.length > 0 && (
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 sm:flex-wrap sm:px-5" aria-label="Suggested questions">
          {chips.map((s, i) => (
            <motion.button key={s} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => go(s)} disabled={busy}
              className="min-h-[40px] shrink-0 rounded-full border border-line bg-paper px-3.5 text-sm transition-colors hover:border-ink/40 disabled:opacity-50">{s}</motion.button>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex items-end gap-2 border-t border-line p-3 sm:p-4">
        <label htmlFor={inputId} className="sr-only">Ask a question about Hitesh</label>
        <textarea id={inputId} ref={input} value={text} onChange={(e) => setText(e.target.value)} maxLength={600} rows={1}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); go(text); } }}
          placeholder="Ask about my experience, projects or skills…"
          className="max-h-32 min-h-[44px] flex-1 resize-none rounded-2xl border border-line bg-paper px-4 py-2.5 text-[16px] outline-none placeholder:text-muted focus:border-ink/50" />
        <motion.button whileTap={{ scale: 0.92 }} type="submit" disabled={busy || !text.trim()} aria-label="Send question" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-onaccent transition-opacity disabled:opacity-40"><ArrowUp size={19} /></motion.button>
      </form>
    </div>
  );
}
