'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, LayoutTemplate, Server, Workflow, ShieldCheck, Gauge, Users } from 'lucide-react';
import Avatar from '../avatar/Avatar';
import { gsap, SectionHead, revealSection, useGsap } from '../ui/motion';
import type { Pose } from '@/data/content';

type Contribution = { value?: number; suffix?: string; big?: string; text: string; layer: 'Interface' | 'Backend' | 'Automation' | 'Quality' | 'Performance' };
type Company = { id: string; mark: React.ReactNode; company: string; role: string; when: string; where: string; pose: Pose; context: string[]; items: Contribution[]; stack: string[] };

// Every figure below comes from the master resume.
const COMPANIES: Company[] = [
  {
    id: 'viasocket', company: 'Walkover Web Solution', role: 'Integration Solution Engineer', when: 'May 2026 – Present', where: 'Indore, India (Remote)', pose: 'think',
    mark: <>via<span className="text-[#B4462F] dark:text-[#E8C6B8]">Socket</span></>,
    context: ['Platform scale: 100,000+ users', '2,200+ connected SaaS apps'],
    items: [
      { big: 'Full stack', text: 'Ship product features across the React and Next.js frontend and the Node.js backend.', layer: 'Interface' },
      { value: 100, suffix: '+', text: 'Reusable integration modules I designed, built, tested and maintain, with OAuth 2.0, API keys, webhooks, pagination and data mapping.', layer: 'Backend' },
      { big: 'Automations', text: 'Multi-step workflows that connect apps so people stop doing repetitive work.', layer: 'Automation' },
      { big: '4xx / 5xx', text: 'Root-caused API errors and pagination mismatches by testing against live endpoints.', layer: 'Quality' },
    ],
    stack: ['Next.js', 'React', 'Node.js', 'OAuth 2.0', 'Webhooks', 'Postman'],
  },
  {
    id: 'thinkdebug', company: 'Think Debug', role: 'Frontend Developer Intern · Kulies', when: 'Feb 2025 – Apr 2025', where: 'Indore, India', pose: 'laptop',
    mark: <>Think<span className="text-[#B4462F] dark:text-[#E8C6B8]">.</span>Debug</>,
    context: ['Six-engineer Agile team', 'Weekly sprints, code reviews'],
    items: [
      { value: 15, suffix: '+', text: 'Reusable, responsive React components with Tailwind CSS.', layer: 'Interface' },
      { value: 20, suffix: '+', text: 'REST APIs integrated with Axios, with loading and error states and Redux Toolkit state.', layer: 'Backend' },
      { value: 18, suffix: '%', text: 'Faster frontend after refactoring components and cutting re-renders.', layer: 'Performance' },
      { value: 30, suffix: '+', text: 'Defects debugged and resolved with browser DevTools alongside backend engineers.', layer: 'Quality' },
    ],
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Axios'],
  },
];

const LAYER = {
  Interface: { icon: LayoutTemplate, cls: 'bg-[#D9E4DC] text-[#24231F]' },
  Backend: { icon: Server, cls: 'bg-[#2D3A2E] text-[#F1EBDD]' },
  Automation: { icon: Workflow, cls: 'bg-[#E8C6B8] text-[#24231F]' },
  Quality: { icon: ShieldCheck, cls: 'bg-[#F1EBDD] text-[#24231F] border border-[#D6CDBA]' },
  Performance: { icon: Gauge, cls: 'bg-[#E9DFC8] text-[#24231F]' },
} as const;

const fmt = (n: number) => n.toLocaleString('en-US');

export default function ExperienceStory() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, () => {
    revealSection(root.current);
    gsap.utils.toArray<HTMLElement>('[data-company]').forEach((co) => {
      gsap.from(co.querySelectorAll('[data-contrib]'), { y: 40, opacity: 0, rotate: (i) => (i % 2 ? 1.5 : -1.5), duration: 0.9, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: co, start: 'top 70%', once: true } });
      gsap.from(co.querySelector('[data-mark]'), { yPercent: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: co, start: 'top 75%', once: true } });
    });
    gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count); const o = { v: 0 }; el.textContent = '0';
      gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true }, onUpdate: () => { el.textContent = fmt(Math.round(o.v)); } });
    });
  });

  return (
    <section id="experience" ref={root} aria-labelledby="exp-title" className="bg-paper py-24 sm:py-32">
      <div className="wrap">
        <SectionHead id="exp-title" eyebrow="02 · Experience" title="Where I've been" accent="building." intro="The measurable side of the story: what I shipped at each company, sorted by the layer of the stack it touched." />

        <div className="mt-16 grid gap-24">
          {COMPANIES.map((co) => (
            <article key={co.id} data-company className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2D3A2E] px-2.5 py-1 text-xs font-medium text-[#F1EBDD]"><Briefcase size={13} />Employment</span>
                  <h3 data-mark className="mt-5 font-display text-5xl font-semibold tracking-tight sm:text-6xl">{co.mark}</h3>
                  <p className="mt-4 text-lg font-medium">{co.role}</p>
                  <p className="text-muted">{co.company}</p>
                  <p className="mt-1 font-mono text-sm text-muted">{co.when} · {co.where}</p>
                  <ul className="mt-5 grid gap-2 text-sm text-muted">{co.context.map((c) => <li key={c} className="flex items-center gap-2"><Users size={14} />{c}</li>)}</ul>
                  <div className="mt-6 hidden w-44 overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] bg-[#D9E4DC] pt-4 lg:block"><Avatar pose={co.pose} title={`Illustration of Hitesh at ${co.company}`} /></div>
                </div>
              </div>
              <div className="lg:col-span-8">
                <p className="eyebrow">Measurable contributions</p>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {co.items.map((it) => {
                    const L = LAYER[it.layer];
                    return (
                      <motion.li key={it.text} data-contrib whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                        className="group flex flex-col justify-between rounded-[1.75rem] border border-line bg-bg p-6 transition-colors hover:border-ink/30">
                        <div>
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${L.cls}`}><L.icon size={13} />{it.layer}</span>
                          <p className="mt-5 font-display text-5xl font-semibold tracking-tight">
                            {it.value !== undefined ? (<><span data-count={it.value}>{fmt(it.value)}</span>{it.suffix}</>) : <span className="text-4xl">{it.big}</span>}
                          </p>
                          <p className="mt-3 leading-relaxed text-muted">{it.text}</p>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">{co.stack.map((s) => <li key={s} className="chip">{s}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
