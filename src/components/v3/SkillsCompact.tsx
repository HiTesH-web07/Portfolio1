'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Code2, LayoutTemplate, Server, Plug, Database, Bug, Sparkles } from 'lucide-react';
import { gsap, SectionHead, revealSection, useGsap } from '../ui/motion';
import { skills, certifications } from '@/data/content';

const ICONS = { code: Code2, layout: LayoutTemplate, server: Server, plug: Plug, database: Database, bug: Bug, sparkles: Sparkles } as const;
const ISSUER: Record<string, string> = { 'IBM DevOps Foundation': 'IBM', 'IBM Agentic AI': 'IBM', 'IBM Generative AI': 'IBM', 'Cisco CCNA': 'Cisco' };

export default function SkillsCompact() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, () => {
    revealSection(root.current);
    gsap.from('[data-row]', { x: -24, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: '[data-rows]', start: 'top 80%', once: true } });
    gsap.from('[data-cert]', { y: 30, rotate: (i) => (i % 2 ? 3 : -3), opacity: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '[data-certs]', start: 'top 82%', once: true } });
  });
  return (
    <section id="skills" ref={root} aria-labelledby="skills-title" className="py-20 sm:py-24">
      <div className="wrap">
        <SectionHead id="skills-title" eyebrow="05 · Skills" title="Skills and" accent="certifications." />
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <dl data-rows className="divide-y divide-line rounded-[2rem] border border-line bg-paper px-6 sm:px-8 lg:col-span-8">
            {skills.map((g) => { const I = ICONS[g.icon]; return (
              <div key={g.group} data-row className="grid gap-3 py-4 sm:grid-cols-[13rem_1fr] sm:items-center">
                <dt className="flex items-center gap-2.5 font-medium"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#D9E4DC] text-[#2D3A2E]"><I size={16} /></span>{g.group}</dt>
                <dd className="flex flex-wrap gap-1.5">{g.items.map((s) => <motion.span key={s} whileHover={{ y: -2 }} className="cursor-default rounded-full border border-line bg-bg px-2.5 py-1 text-sm transition-colors hover:border-ink/40">{s}</motion.span>)}</dd>
              </div>
            ); })}
          </dl>
          <div className="lg:col-span-4">
            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted"><Award size={14} />Certifications</p>
            <ul data-certs className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {certifications.map((c) => (
                <motion.li key={c.name} data-cert whileHover={{ y: -4, rotate: -0.5 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="relative overflow-hidden rounded-2xl border border-line bg-paper p-5 shadow-soft">
                  <span aria-hidden className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#E8C6B8]/50" />
                  <Award size={22} className="relative text-[#B4462F] dark:text-[#E8C6B8]" />
                  <p className="relative mt-3 font-semibold leading-snug">{c.name}</p>
                  <p className="relative mt-1 flex justify-between text-sm text-muted"><span>{ISSUER[c.name]}</span><span className="font-mono">{c.year}</span></p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
