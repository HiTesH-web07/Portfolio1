'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, GraduationCap, Briefcase, Lightbulb, Sparkles, Check, FlaskConical } from 'lucide-react';
import Avatar from '../avatar/Avatar';
import { gsap, SectionHead, SplitWords, revealSection, useGsap } from '../ui/motion';
import { steps as chapters, exploring, type Step as Chapter } from '@/data/content';

const TONE: Record<Chapter['tone'], { bg: string; ink: string; sub: string; tint: string }> = {
  cream: { bg: '#F6F1E6', ink: '#24231F', sub: '#5C584E', tint: '#F6F1E6' },
  sage: { bg: '#D9E4DC', ink: '#24231F', sub: '#45524A', tint: '#D9E4DC' },
  forest: { bg: '#2D3A2E', ink: '#F1EBDD', sub: '#D9E4DC', tint: '#9DB2A1' },
  clay: { bg: '#E8C6B8', ink: '#24231F', sub: '#5C4A42', tint: '#E8C6B8' },
  ink: { bg: '#24231F', ink: '#F1EBDD', sub: '#D9E4DC', tint: '#BDB6A6' },
};

const KIND = {
  Education: { icon: GraduationCap, cls: 'bg-[#D9E4DC] text-[#24231F]' },
  Employment: { icon: Briefcase, cls: 'bg-[#2D3A2E] text-[#F1EBDD]' },
  Independent: { icon: Lightbulb, cls: 'bg-[#E8C6B8] text-[#24231F]' },
  Exploring: { icon: Sparkles, cls: 'bg-[#24231F] text-[#F1EBDD] ring-1 ring-[#F1EBDD]/20' },
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

function KindBadge({ kind }: { kind: Chapter['kind'] }) {
  const K = KIND[kind];
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${K.cls}`}><K.icon size={13} />{kind}</span>;
}

export function Artifact({ kind }: { kind: Chapter['artifact'] }) {
  if (kind === 'notebook') return (
    <div className="relative w-[17.5rem] rotate-2 rounded-2xl border border-[#E2D9C6] bg-[#FFFDF8] p-4 font-mono text-[11.5px] leading-6 text-[#24231F] shadow-lift" style={{ backgroundImage: 'repeating-linear-gradient(transparent 0 23px, #EDE5D3 23px 24px)' }}>
      <p className="text-[#8A6A1F]">{'// shortest path, take 3'}</p>
      <p>{'while (!pq.empty()) {'}</p>
      <p className="pl-3">{'auto [d, u] = pq.top(); pq.pop();'}</p>
      <p className="pl-3">{'if (d > dist[u]) continue;'}</p>
      <p className="pl-3">{'for (auto [v, w] : adj[u])'}</p>
      <p className="pl-6">{'relax(u, v, w);'}</p>
      <p>{'}'}</p>
      <span className="absolute -right-7 -top-5 rotate-6 rounded-md bg-[#E8C6B8] px-3 py-2 font-sans text-xs font-medium shadow-soft">break it down first</span>
      <span className="absolute -bottom-5 -left-6 -rotate-6 rounded-md bg-[#D9E4DC] px-3 py-2 font-sans text-xs font-medium shadow-soft">1 a.m. · finally clean ✓</span>
    </div>
  );
  if (kind === 'kulies') return (
    <div className="w-60 -rotate-2 rounded-[1.6rem] bg-[#24231F] p-2.5 shadow-lift">
      <div className="rounded-[1.1rem] bg-[#FBF8F1] p-3 text-[#24231F]">
        <div className="flex items-center justify-between"><span className="font-display font-semibold">Kulies</span><span className="rounded-full bg-[#2D3A2E] px-2 py-0.5 text-[10px] text-white">Cart · 2</span></div>
        <div className="mt-3 grid grid-cols-2 gap-2">{['#E8C6B8', '#D9E4DC', '#E9DFC8', '#D9E4DC'].map((c, i) => <div key={i} className="rounded-lg border border-[#E6DFCF] bg-white p-1.5"><div className="aspect-[4/3] rounded-md" style={{ background: c }} /><div className="mt-1.5 h-1.5 w-3/4 rounded bg-[#E6DFCF]" /></div>)}</div>
        <div className="mt-2 flex items-center justify-between rounded-lg bg-[#F1EBDD] px-2 py-1.5 text-[10px]"><span>Pull request · approved</span><span className="text-emerald-700">✓ merged</span></div>
      </div>
      <p className="mt-2 text-center text-[10px] text-white/60">Illustration of the flows I worked on</p>
    </div>
  );
  if (kind === 'workflow') return (
    <div className="w-64">
      {[['Trigger', 'Something happens in app A'], ['Step', 'Map and transform the data'], ['Action', 'Update app B, notify the team']].map(([k, v], i) => (
        <div key={k}>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.15, duration: 0.5, ease }} className="flex items-center gap-3 rounded-2xl bg-[#F1EBDD] p-3 text-[#24231F] shadow-lift">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#2D3A2E] font-mono text-xs text-[#F1EBDD]">{i + 1}</span>
            <span><span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-[#5C584E]">{k}</span><span className="block text-sm">{v}</span></span>
          </motion.div>
          {i < 2 && <svg aria-hidden width="16" height="26" className="ml-6"><line x1="8" y1="0" x2="8" y2="26" stroke="#D9E4DC" strokeWidth="2" strokeDasharray="4 4" className="flow-dash" /></svg>}
        </div>
      ))}
      <p className="pt-2 text-center text-[10px] text-[#D9E4DC]/80">How an automation flows (illustration)</p>
    </div>
  );
  if (kind === 'ai') {
    const nodes = [
      { id: 'in', x: 30, y: 40, label: 'Trigger' },
      { id: 'llm', x: 150, y: 110, label: 'LLM', core: true },
      { id: 'tools', x: 270, y: 40, label: 'Tools / APIs' },
      { id: 'asana', x: 270, y: 180, label: 'Tasks' },
      { id: 'slack', x: 30, y: 180, label: 'Notify' },
    ];
    const edges = [['in', 'llm'], ['llm', 'tools'], ['tools', 'llm'], ['llm', 'asana'], ['llm', 'slack']];
    const at = (id: string) => nodes.find((n) => n.id === id)!;
    return (
      <div className="relative w-[19rem]">
        <svg viewBox="0 0 300 220" className="w-full" aria-hidden>
          {edges.map(([a, b], i) => { const A = at(a), B = at(b); const bend = i === 2 ? 26 : 0; return (
            <path key={i} d={`M${A.x} ${A.y} Q ${(A.x + B.x) / 2 + bend} ${(A.y + B.y) / 2 - bend} ${B.x} ${B.y}`} stroke="#E8C6B8" strokeOpacity={0.7} strokeWidth={2} strokeDasharray="5 6" fill="none" className="flow-dash" style={{ animationDuration: `${1.2 + i * 0.2}s` }} />
          ); })}
          {nodes.map((n) => (
            <g key={n.id} className={n.core ? 'ai-pulse' : undefined} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
              <circle cx={n.x} cy={n.y} r={n.core ? 30 : 20} fill={n.core ? '#E8C6B8' : '#F1EBDD'} />
              {n.core && <circle cx={n.x} cy={n.y} r={40} fill="none" stroke="#E8C6B8" strokeOpacity={0.35} />}
              <text x={n.x} y={n.y + (n.core ? 5 : 36)} textAnchor="middle" fontSize={n.core ? 14 : 11} fontWeight={600} fill={n.core ? '#24231F' : '#F1EBDD'} style={{ fontFamily: 'var(--font-geist)' }}>{n.label}</text>
            </g>
          ))}
        </svg>
        {['Gemini', 'Agents', 'Webhooks', 'Claude Code'].map((t, i) => (
          <span key={t} className="drift absolute rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-[#F1EBDD] backdrop-blur" style={{ ['--t' as string]: `${6 + i}s`, ...[{ left: '-8%', top: '-14%' }, { right: '-6%', top: '-16%' }, { left: '-10%', bottom: '-6%' }, { right: '-8%', bottom: '-8%' }][i] }}>{t}</span>
        ))}
        <p className="mt-2 text-center text-[10px] text-[#D9E4DC]/80">How an AI workflow connects (illustration)</p>
      </div>
    );
  }
  return (
    <div className="relative h-52 w-72">
      <motion.div initial={{ rotate: 0, x: 30 }} animate={{ rotate: -4, x: 0 }} transition={{ duration: 0.7, ease }} className="absolute left-0 top-8 w-56 overflow-hidden rounded-2xl border-4 border-[#24231F] bg-[#24231F] shadow-lift"><div className="relative aspect-[16/10]"><Image src="/projects/mtac.webp" alt="Screenshot of Meeting-to-Action Closer" fill sizes="224px" className="object-cover object-top" /></div></motion.div>
      <motion.div initial={{ rotate: 0, x: -30 }} animate={{ rotate: 3, x: 0 }} transition={{ duration: 0.7, ease }} className="absolute right-0 top-0 w-56 overflow-hidden rounded-2xl border-4 border-[#24231F] bg-[#24231F] shadow-lift"><div className="relative aspect-[16/10]"><Image src="/projects/cairn.webp" alt="Screenshot of Cairn" fill sizes="224px" className="object-cover object-top" /></div></motion.div>
      <span className="absolute -bottom-2 left-6 rounded-full bg-[#24231F] px-3 py-1.5 text-xs text-[#F1EBDD] shadow-soft">gap noticed → product shipped</span>
    </div>
  );
}

function Stage({ c, index, total }: { c: Chapter; index: number; total: number }) {
  const t = TONE[c.tone];
  return (
    <div className="relative h-full overflow-hidden rounded-[2.5rem] p-7 transition-[background-color,color] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]" style={{ background: t.bg, color: t.ink }}>
      <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 transition-transform duration-[1200ms]" style={{ transform: `translate(${index * -14}px, ${index * 22}px)` }} />
      <div className="relative flex items-start justify-between gap-4">
        <div className="relative h-16 w-24 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.span key={c.numeral} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.6, ease }} className="absolute left-0 top-0 font-serif text-7xl italic leading-none">{c.numeral}</motion.span>
          </AnimatePresence>
        </div>
        <div className="text-right">
          <span className="block text-xs font-medium uppercase tracking-[0.14em]" style={{ color: t.sub }}>Chapter {index + 1} of {total}</span>
          <span className="mt-2 inline-block"><KindBadge kind={c.kind} /></span>
        </div>
      </div>
      <div className={`absolute bottom-0 left-2 ${c.artifact === 'ai' ? 'w-[44%]' : 'w-[58%]'}`}><Avatar pose={c.pose} expression={c.expression} title={`Illustration of Hitesh: ${c.title}`} /></div>
      <div data-stage-art className={`absolute right-6 -translate-y-1/2 max-lg:right-3 max-lg:origin-right max-lg:scale-[.62] ${c.artifact === 'ai' ? 'top-[44%]' : 'top-[52%]'}`}>
        <AnimatePresence mode="wait">
          <motion.div key={c.artifact} initial={{ opacity: 0, y: 28, rotate: -3, scale: 0.96 }} animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} exit={{ opacity: 0, y: -18, scale: 0.98 }} transition={{ duration: 0.6, ease }}>
            <Artifact kind={c.artifact} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-6 right-7 flex gap-1.5" aria-hidden>
        {Array.from({ length: total }).map((_, i) => <span key={i} className="h-1.5 rounded-full transition-all duration-700" style={{ width: i === index ? 28 : 10, background: t.ink, opacity: i === index ? 0.9 : 0.25 }} />)}
      </div>
    </div>
  );
}

function ExploringMap() {
  const [filter, setFilter] = useState<'all' | 'used' | 'exploring'>('all');
  const open = (id?: string) => id && window.dispatchEvent(new CustomEvent('open-case', { detail: id }));
  return (
    <div className="mt-12 rounded-[2rem] bg-[#24231F] p-5 text-[#F1EBDD] sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#D9E4DC]">Chapter V in detail</p>
          <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">What I build with, and what I am exploring</h3>
        </div>
        <div role="group" aria-label="Filter" className="flex rounded-full bg-white/10 p-1 text-sm">
          {([['all', 'All'], ['used', 'Used in projects'], ['exploring', 'Exploring']] as const).map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} aria-pressed={filter === k} className={`relative min-h-[40px] rounded-full px-4 transition-colors ${filter === k ? 'text-[#24231F]' : 'text-[#F1EBDD]/80 hover:text-[#F1EBDD]'}`}>
              {filter === k && <motion.span layoutId="xfilter" className="absolute inset-0 -z-0 rounded-full bg-[#F1EBDD]" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span className="relative">{l}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {exploring.map((g) => (
          <div key={g.group}>
            <p className="font-medium text-[#E8C6B8]">{g.group}</p>
            <ul className="mt-3 grid gap-2 max-sm:grid-cols-2">
              <AnimatePresence initial={false}>
                {g.items.filter((t) => filter === 'all' || t.status === filter).map((t) => (
                  <motion.li key={t.name} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3, ease }}>
                    <button onClick={() => open(t.link)} disabled={!t.link} className="group h-full w-full rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left sm:p-3.5 transition-colors enabled:hover:border-white/30 enabled:hover:bg-white/[0.08]">
                      <span className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-medium">{t.name}</span>
                        <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${t.status === 'used' ? 'bg-[#D9E4DC] text-[#24231F]' : 'border border-dashed border-[#E8C6B8] text-[#E8C6B8]'}`}>{t.status === 'used' ? <><Check size={11} />Used</> : <><FlaskConical size={11} />Exploring</>}</span>
                      </span>
                      <span className="mt-1 hidden text-sm text-[#D9E4DC] sm:block">{t.where}{t.link && <ArrowUpRight size={13} className="ml-1 inline transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}</span>
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function JourneyNext() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-chapter]') ?? []);
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement)); }), { rootMargin: '-40% 0px -45% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useGsap(root, ({ isDesktop }) => {
    revealSection(root.current);
    gsap.fromTo('[data-thread-fill]', { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: '[data-chapters]', start: 'top 55%', end: 'bottom 55%', scrub: 0.6 } });
    gsap.utils.toArray<HTMLElement>('[data-chapter]').forEach((el) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 72%', once: true } });
      tl.from(el.querySelectorAll('[data-meta]'), { y: 14, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from(el.querySelectorAll('h3 [data-word]'), { yPercent: 110, duration: 0.9, stagger: 0.05, ease: 'expo.out' }, '-=0.35')
        .from(el.querySelectorAll('[data-reveal]'), { y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.6');
      const bridge = el.querySelector('[data-bridge]');
      if (bridge) gsap.from(bridge, { y: 20, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: bridge, start: 'top 85%', once: true } });
    });
    if (isDesktop) gsap.to('[data-stage-art]', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '[data-chapters]', start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  const cur = chapters[active];
  return (
    <section id="journey" ref={root} aria-labelledby="journey-title" className="relative pb-12 pt-8 sm:pb-16 sm:pt-10">
      {/* the whole chapter area takes on a soft tint of the current chapter */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22] transition-colors duration-[1200ms] dark:opacity-[0.08]" style={{ background: `linear-gradient(180deg, transparent 0%, ${TONE[cur.tone].tint} 18%, ${TONE[cur.tone].tint} 82%, transparent 100%)` }} />
      <div className="wrap">
        <SectionHead id="journey-title" eyebrow="01 · The story so far" title="How I got here," accent="in five steps." intro="From learning C and DSA in college to building AI-powered products. What I did at each step, what I learned, and what it led to." />
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[12vh] h-[76vh]"><Stage c={cur} index={active} total={chapters.length} /></div>
          </div>

          <ol data-chapters className="relative lg:col-span-6 lg:pl-12">
            <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-line lg:left-[23px]" />
            <span aria-hidden data-thread-fill className="absolute bottom-0 left-[11px] top-0 w-px bg-ink lg:left-[23px]" />
            {chapters.map((c, i) => (
              <li key={c.id} data-chapter className={`relative pb-6 pl-10 transition-opacity duration-700 lg:pl-0 ${i === active ? 'lg:opacity-100' : 'lg:opacity-40'}`}>
                <span aria-hidden className={`absolute left-0 top-12 grid h-6 w-6 place-items-center rounded-full border-2 transition-colors duration-500 lg:-left-[36px] lg:top-[calc(50%-12px)] ${i <= active ? 'border-ink bg-ink' : 'border-line bg-bg'}`}><span className={`h-1.5 w-1.5 rounded-full ${i <= active ? 'bg-bg' : 'bg-line'}`} /></span>
                <div className={`flex flex-col justify-center py-6 lg:py-8 ${i === chapters.length - 1 ? 'lg:min-h-[44vh] lg:pb-0' : 'lg:min-h-[50vh]'}`}>
                  <div className="mb-5 h-60 sm:h-80 lg:hidden"><Stage c={c} index={i} total={chapters.length} /></div>
                  <div data-meta className="flex flex-wrap items-center gap-3"><KindBadge kind={c.kind} /><span className="font-mono text-sm text-muted">{c.when}</span></div>
                  <h3 className="mt-4 text-3xl font-semibold leading-[1.08] sm:text-4xl"><span className="mr-3 font-serif font-normal italic text-[#B4462F] dark:text-[#E8C6B8]">{c.numeral}.</span><SplitWords text={c.title} /></h3>
                  <p data-reveal className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">{c.did}</p>
                  <p data-reveal className="mt-4 max-w-xl text-[17px] leading-relaxed"><span className="mr-2 text-xs font-medium uppercase tracking-[0.14em] text-[#B4462F] dark:text-[#E8C6B8]">What I learned</span>{c.learned}</p>
                  <ul data-reveal className="mt-5 flex flex-wrap gap-2" aria-label="Evidence">{c.evidence.map((t) => <li key={t} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/80 px-3 py-1 text-sm"><Check size={13} className="text-emerald-700 dark:text-emerald-400" />{t}</li>)}</ul>
                  {c.kind === 'Independent' && (
                    <div data-reveal className="mt-6 flex flex-wrap gap-3">
                      <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#work" className="btn-primary">See the case studies <ArrowRight size={16} /></motion.a>
                    </div>
                  )}
                </div>
                {c.next && (
                  <p data-bridge className="flex items-center gap-3 pb-4 font-serif text-xl italic text-muted">
                    <ArrowDown size={18} className="shrink-0 text-[#B4462F] dark:text-[#E8C6B8]" />{c.next}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
        <ExploringMap />
      </div>
    </section>
  );
}
