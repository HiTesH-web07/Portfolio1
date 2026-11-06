'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Code2, LayoutTemplate, Server, Plug, Database, Bug, Sparkles, Award, GraduationCap } from 'lucide-react';
import { SectionHead, revealSection, useGsap } from './ui/motion';
import { skills, fundamentals, certifications, education } from '@/data/content';

const ICONS = { code: Code2, layout: LayoutTemplate, server: Server, plug: Plug, database: Database, bug: Bug, sparkles: Sparkles } as const;

export default function Skills() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, () => revealSection(root.current));
  return (
    <section id="skills" ref={root} aria-labelledby="skills-title" className="py-20 sm:py-24">
      <div className="wrap">
        <SectionHead id="skills-title" eyebrow="06 · Skills" title="My technical" accent="toolbox." intro="What I reach for, grouped the way I use it. No made-up percentages: the projects above are the proof." />

        <dl className="mt-14 border-t border-line">
          {skills.map((g) => {
            const Icon = ICONS[g.icon];
            return (
              <div key={g.group} className="reveal grid gap-4 border-b border-line py-6 md:grid-cols-12 md:items-center">
                <dt className="flex items-center gap-3 md:col-span-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-sage text-[#2D3A2E]"><Icon size={19} /></span>
                  <span className="font-display text-xl font-medium">{g.group}</span>
                </dt>
                <dd className="flex flex-wrap gap-2 md:col-span-8">
                  {g.items.map((s) => (
                    <motion.span key={s} whileHover={{ y: -3, rotate: -1.5 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }} className="cursor-default rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] transition-colors hover:border-ink/40 hover:bg-clay/40">{s}</motion.span>
                  ))}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <div className="reveal card p-7">
            <h3 className="flex items-center gap-2 text-lg font-semibold"><Code2 size={18} />CS fundamentals</h3>
            <p className="mt-2 text-sm text-muted">Competitive programming and DSA practice in C and C++.</p>
            <ul className="mt-4 flex flex-wrap gap-2">{fundamentals.map((f) => <li key={f} className="chip !text-xs">{f}</li>)}</ul>
          </div>
          <div className="reveal card p-7">
            <h3 className="flex items-center gap-2 text-lg font-semibold"><Award size={18} />Certifications</h3>
            <ul className="mt-4 grid gap-3">{certifications.map((c) => <li key={c.name} className="flex justify-between gap-3 border-b border-line pb-3 last:border-0"><span>{c.name}</span><span className="font-mono text-sm text-muted">{c.year}</span></li>)}</ul>
          </div>
          <div className="reveal card p-7">
            <h3 className="flex items-center gap-2 text-lg font-semibold"><GraduationCap size={18} />Education</h3>
            <ul className="mt-4 grid gap-4">{education.map((e) => <li key={e.school}><p className="font-medium">{e.degree}</p><p className="text-sm text-muted">{e.school} · {e.when}</p><p className="text-sm text-muted">{e.note}</p></li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
