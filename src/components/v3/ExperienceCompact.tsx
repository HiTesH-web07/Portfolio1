'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, ChevronDown, Users } from 'lucide-react';
import { gsap, SectionHead, revealSection, useGsap } from '../ui/motion';
import { COMPANIES, LAYER } from '../story/ExperienceStory';
import { experience } from '@/data/content';

const fmt = (n: number) => n.toLocaleString('en-US');

function CompanyCard({ co, points, dark }: { co: (typeof COMPANIES)[number]; points: string[]; dark: boolean }) {
  const [open, setOpen] = useState(false);
  const base = dark ? 'bg-[#2D3A2E] text-[#F1EBDD]' : 'bg-paper text-ink border border-line';
  const sub = dark ? 'text-[#D9E4DC]' : 'text-muted';
  const tile = dark ? 'bg-white/[0.06] border-white/10' : 'bg-bg border-line';
  return (
    <article data-co className={`flex flex-col rounded-[2rem] p-6 shadow-soft sm:p-8 ${base}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{co.mark}</h3>
          <p className="mt-3 font-medium">{co.role}</p>
          <p className={`text-sm ${sub}`}>{co.company} · {co.when}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${dark ? 'bg-[#F1EBDD] text-[#24231F]' : 'bg-[#2D3A2E] text-[#F1EBDD]'}`}><Briefcase size={12} />Employment</span>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-3">
        {co.items.map((it) => { const L = LAYER[it.layer]; return (
          <li key={it.text} className={`rounded-2xl border p-4 ${tile}`}>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${L.cls}`}><L.icon size={11} />{it.layer}</span>
            <p className="mt-3 font-display text-3xl font-semibold tracking-tight">{it.value !== undefined ? (<><span data-count={it.value}>{fmt(it.value)}</span>{it.suffix}</>) : <span className="text-2xl">{it.big}</span>}</p>
            <p className={`mt-1 text-sm leading-snug ${sub}`}>{it.short}</p>
          </li>
        ); })}
      </ul>
      <p className={`mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm ${sub}`}>{co.context.map((c) => <span key={c} className="inline-flex items-center gap-1.5"><Users size={13} />{c}</span>)}</p>
      <button onClick={() => setOpen(!open)} aria-expanded={open} className={`mt-5 inline-flex min-h-[44px] items-center gap-2 self-start rounded-full border px-4 text-sm font-medium transition-colors ${dark ? 'border-white/25 hover:bg-white/5' : 'border-ink/20 hover:bg-ink/5'}`}>
        {open ? 'Hide details' : 'Show details'}<ChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <div className="grid gap-2.5 pt-5">{points.map((p) => <li key={p} className={`flex gap-3 text-[15px] leading-relaxed ${sub}`}><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8C6B8]" />{p}</li>)}</div>
          </motion.ul>
        )}
      </AnimatePresence>
    </article>
  );
}

export default function ExperienceCompact() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, () => {
    revealSection(root.current);
    gsap.from('[data-co]', { y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } });
    gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count); const o = { v: 0 }; el.textContent = '0';
      gsap.to(o, { v: end, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: () => { el.textContent = fmt(Math.round(o.v)); } });
    });
  });
  return (
    <section id="experience" ref={root} aria-labelledby="exp-title" className="py-20 sm:py-24">
      <div className="wrap">
        <SectionHead id="exp-title" eyebrow="02 · Experience" title="Where I've been" accent="building." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {COMPANIES.map((co, i) => <CompanyCard key={co.id} co={co} points={experience[i].points} dark={i === 0} />)}
        </div>
      </div>
    </section>
  );
}
