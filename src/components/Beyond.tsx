'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionHead, revealSection, useGsap, gsap } from './ui/motion';
import { beyond } from '@/data/content';

// Small hand-made illustrations, one per interest
const ART: Record<string, React.ReactNode> = {
  badminton: (
    <svg viewBox="0 0 120 120" aria-hidden className="h-full w-full"><g transform="rotate(-25 60 60)"><path d="M48 20 L72 20 L66 66 L54 66 Z" fill="#F1EBDD" stroke="#24231F" strokeWidth="3" /><path d="M54 30h12M53 42h14M55 54h10" stroke="#24231F" strokeWidth="2" /><ellipse cx="60" cy="74" rx="12" ry="10" fill="#2D3A2E" /></g><path d="M18 98 q30 -30 70 -16" stroke="#24231F" strokeWidth="2" strokeDasharray="4 6" fill="none" /></svg>
  ),
  reading: (
    <svg viewBox="0 0 120 120" aria-hidden className="h-full w-full"><rect x="22" y="76" width="76" height="14" rx="3" fill="#2D3A2E" /><rect x="28" y="60" width="66" height="14" rx="3" fill="#E8C6B8" stroke="#24231F" strokeWidth="2" /><rect x="20" y="44" width="72" height="14" rx="3" fill="#F1EBDD" stroke="#24231F" strokeWidth="2" /><path d="M70 44 v-20 l8 6 l8 -6 v20" fill="#C2553D" /></svg>
  ),
  side: (
    <svg viewBox="0 0 120 120" aria-hidden className="h-full w-full"><circle cx="60" cy="48" r="24" fill="#F1EBDD" stroke="#24231F" strokeWidth="3" /><rect x="50" y="72" width="20" height="14" rx="3" fill="#2D3A2E" /><path d="M52 48 l6 6 l12 -12" stroke="#2D3A2E" strokeWidth="4" fill="none" strokeLinecap="round" /><path d="M60 12v-6M92 48h6M22 48h-6M84 24l5-5M36 24l-5-5" stroke="#24231F" strokeWidth="3" strokeLinecap="round" /></svg>
  ),
  ai: (
    <svg viewBox="0 0 120 120" aria-hidden className="h-full w-full"><path d="M30 40 L60 60 L90 36 M60 60 L44 92 M60 60 L86 86" stroke="#24231F" strokeWidth="2.5" /><circle cx="30" cy="40" r="10" fill="#E8C6B8" stroke="#24231F" strokeWidth="2.5" /><circle cx="90" cy="36" r="10" fill="#D9E4DC" stroke="#24231F" strokeWidth="2.5" /><circle cx="44" cy="92" r="9" fill="#F1EBDD" stroke="#24231F" strokeWidth="2.5" /><circle cx="86" cy="86" r="9" fill="#E8C6B8" stroke="#24231F" strokeWidth="2.5" /><circle cx="60" cy="60" r="14" fill="#2D3A2E" /><path d="M60 52 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z" fill="#F1EBDD" /></svg>
  ),
  learn: (
    <svg viewBox="0 0 120 120" aria-hidden className="h-full w-full"><rect x="22" y="26" width="76" height="62" rx="8" fill="#F1EBDD" stroke="#24231F" strokeWidth="3" /><path d="M34 44h40M34 56h52M34 68h30" stroke="#24231F" strokeWidth="3" strokeLinecap="round" /><circle cx="88" cy="86" r="16" fill="#2D3A2E" /><path d="M82 86 l4 4 l8 -8" stroke="#F1EBDD" strokeWidth="3" fill="none" strokeLinecap="round" /></svg>
  ),
};

const LAYOUT = [
  { cls: 'lg:col-span-5 lg:row-span-2 bg-[#2D3A2E] text-[#F1EBDD]', rot: -2, big: true },
  { cls: 'lg:col-span-4 bg-[#E8C6B8] text-[#24231F]', rot: 1.5 },
  { cls: 'lg:col-span-3 bg-paper', rot: -1 },
  { cls: 'lg:col-span-3 bg-[#D9E4DC] text-[#24231F]', rot: 2 },
  { cls: 'lg:col-span-4 bg-paper', rot: -1.5 },
];

export default function Beyond() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, () => {
    revealSection(root.current);
    gsap.from('[data-tile]', { y: 60, rotate: (i) => (i % 2 ? 6 : -6), opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: '[data-collage]', start: 'top 80%', once: true } });
  });
  return (
    <section id="beyond" ref={root} aria-labelledby="beyond-title" className="py-20 sm:py-24">
      <div className="wrap">
        <SectionHead id="beyond-title" eyebrow="07 · Beyond the code" title="A little more" accent="about me." />
        <ul data-collage className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">
          {beyond.map((b, i) => {
            const L = LAYOUT[i];
            return (
              <motion.li key={b.id} data-tile style={{ rotate: L.rot }} whileHover={{ rotate: 0, y: -6 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className={`relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-line p-7 shadow-soft ${L.cls}`}>
                <div className={L.big ? 'h-44 w-44 rounded-full bg-[#F1EBDD] p-6 sm:h-56 sm:w-56' : 'h-24 w-24'}>{ART[b.id]}</div>
                <div className="mt-6">
                  <h3 className={`${L.big ? 'text-4xl' : 'text-2xl'} font-semibold`}>{b.title}</h3>
                  <p className={`mt-2 leading-relaxed ${L.big ? 'text-lg text-[#D9E4DC]' : 'opacity-80'}`}>{b.body}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
