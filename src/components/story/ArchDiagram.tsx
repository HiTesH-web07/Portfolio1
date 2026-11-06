'use client';
import { motion } from 'framer-motion';
import type { Arch } from '@/data/content';

// A small, factual architecture map: layers top to bottom, connected services on the side.
export default function ArchDiagram({ arch, side, dark = false }: { arch: Arch; side?: { label: string; items: string[] }; dark?: boolean }) {
  const card = dark ? 'bg-[#2F2E29] border-white/10 text-[#F1EBDD]' : 'bg-white border-[#E2D9C6] text-[#24231F]';
  const sub = dark ? 'text-[#D9E4DC]' : 'text-[#5C584E]';
  return (
    <figure aria-label="Architecture overview" className="grid gap-3 sm:grid-cols-[1fr_auto]">
      <div>
        {arch.map((l, i) => (
          <div key={l.layer}>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-2xl border p-3.5 ${card}`}>
              <p className={`text-[11px] font-medium uppercase tracking-[0.14em] ${sub}`}>{l.layer}</p>
              <p className="mt-1 text-sm">{l.items.join(' · ')}</p>
            </motion.div>
            {i < arch.length - 1 && <svg aria-hidden width="16" height="18" className="ml-6"><line x1="8" y1="0" x2="8" y2="18" stroke={dark ? '#D9E4DC' : '#9C9483'} strokeWidth="2" strokeDasharray="3 3" className="flow-dash" /></svg>}
          </div>
        ))}
      </div>
      {side && (
        <div className={`rounded-2xl border border-dashed p-3.5 sm:w-48 ${dark ? 'border-white/20 text-[#F1EBDD]' : 'border-[#CFC6B2] text-[#24231F]'}`}>
          <p className={`text-[11px] font-medium uppercase tracking-[0.14em] ${sub}`}>{side.label}</p>
          <ul className="mt-2 grid gap-1.5 text-sm">{side.items.map((s) => <li key={s} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#B4462F] dark:bg-[#E8C6B8]" />{s}</li>)}</ul>
        </div>
      )}
    </figure>
  );
}
