'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Search, CheckCircle2, ArrowUpRight, Check, FlaskConical, Puzzle, Lightbulb, Bug, Sparkles } from 'lucide-react';
import Avatar from '../avatar/Avatar';
import { Artifact } from '../story/JourneyNext';
import { gsap, SectionHead, revealSection, useGsap } from '../ui/motion';
import { stories, exploring, fundamentals, caseStudies, projects, type TechItem } from '@/data/content';

const ease = [0.22, 1, 0.36, 1] as const;
const STAGES = [
  { key: 'problem', label: 'Problem', icon: AlertTriangle, cls: 'text-[#B4462F] dark:text-[#F0A08C]' },
  { key: 'investigation', label: 'Investigation', icon: Search, cls: 'text-[#735614] dark:text-[#E3C77A]' },
  { key: 'solution', label: 'Solution', icon: CheckCircle2, cls: 'text-emerald-700 dark:text-emerald-400' },
] as const;
const openCase = (id: string) => window.dispatchEvent(new CustomEvent('open-case', { detail: id }));

function Tile({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div data-tile className={`rounded-[2rem] p-6 sm:p-8 ${className}`}>{children}</div>;
}
function TileHead({ icon: I, kicker, title, light, tone }: { icon: typeof Bug; kicker: string; title: string; light?: boolean; tone?: string }) {
  return (
    <div>
      <p className={`flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] ${tone ?? (light ? 'text-[#D9E4DC]' : 'text-muted')}`}><I size={14} />{kicker}</p>
      <h3 className="mt-2 text-2xl font-semibold leading-tight">{title}</h3>
    </div>
  );
}

function Debugging() {
  const [i, setI] = useState(0);
  const s = stories[i];
  return (
    <Tile className="border border-line bg-paper lg:col-span-7">
      <TileHead icon={Bug} kicker="How I debug" title="Problem, investigation, solution. Every time." />
      <div role="tablist" aria-label="Choose a story" className="mt-5 flex flex-wrap gap-2">
        {stories.map((x, k) => (
          <button key={x.id} role="tab" aria-selected={i === k} onClick={() => setI(k)} className={`min-h-[40px] rounded-full border px-3.5 text-sm transition-colors ${i === k ? 'border-ink bg-ink text-bg' : 'border-line hover:border-ink/40'}`}>{x.label}</button>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">{s.where}</p>
      <AnimatePresence mode="wait">
        <motion.ol key={s.id} className="mt-3 grid gap-3 sm:grid-cols-3" initial="h" animate="s" exit="h" variants={{ s: { transition: { staggerChildren: 0.08 } } }}>
          {STAGES.map((st) => { const step = s.steps[st.key]; return (
            <motion.li key={st.key} variants={{ h: { opacity: 0, y: 12 }, s: { opacity: 1, y: 0 } }} transition={{ duration: 0.4, ease }} className="rounded-2xl border border-line bg-bg p-4">
              <p className={`flex items-center gap-1.5 text-xs font-medium ${st.cls}`}><st.icon size={13} />{st.label}</p>
              <p className="mt-2 font-medium leading-snug">{step.title}</p>
              <p className="mt-2 font-mono text-[11px] leading-5 text-muted">{step.code[step.code.length - 1]}</p>
            </motion.li>
          ); })}
        </motion.ol>
      </AnimatePresence>
    </Tile>
  );
}

function ProblemSolving() {
  return (
    <Tile className="relative overflow-hidden bg-[#D9E4DC] text-[#24231F] lg:col-span-5">
      <TileHead tone="text-[#45524A]" icon={Puzzle} kicker="Problem solving" title="DSA taught me to think before I type." />
      <p className="relative z-10 mt-3 max-w-[18rem] leading-relaxed text-[#45524A]">Competitive programming in C and C++. Breaking a problem into smaller ones is still how I start every feature.</p>
      <ul className="relative z-10 mt-4 flex max-w-[18rem] flex-wrap gap-1.5">{fundamentals.slice(0, 8).map((f) => <li key={f} className="rounded-full bg-white/60 px-2.5 py-0.5 text-xs">{f}</li>)}</ul>
      <div className="absolute -bottom-2 -right-4 w-44 sm:w-52"><Avatar pose="think" float={false} title="Illustration of Hitesh thinking" /></div>
    </Tile>
  );
}

function Initiative() {
  const ids = ['cairn', 'meeting-to-action', 'sensai'];
  return (
    <Tile className="bg-[#E8C6B8] text-[#24231F] lg:col-span-4">
      <TileHead tone="text-[#5C4A42]" icon={Lightbulb} kicker="Initiative" title="When I notice a gap, I build for it." />
      <ul className="mt-5 grid gap-2.5">
        {ids.map((id) => { const p = projects.find((x) => x.id === id)!; const g = caseStudies[id]?.gap.split('. ')[0].replace(/\.$/, ''); return (
          <li key={id}>
            <button onClick={() => openCase(id)} className="group w-full rounded-2xl bg-white/50 p-3.5 text-left transition-colors hover:bg-white/80">
              <span className="block text-xs text-[#5C4A42]">{g}</span>
              <span className="mt-1 flex items-center justify-between font-medium">→ {p.name}<ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </button>
          </li>
        ); })}
      </ul>
    </Tile>
  );
}

function Exploring() {
  const all = exploring.flatMap((g) => g.items);
  const [sel, setSel] = useState<TechItem | null>(null);
  const group = (status: TechItem['status']) => all.filter((t) => t.status === status);
  const Chip = ({ t }: { t: TechItem }) => (
    <button onClick={() => setSel(sel?.name === t.name ? null : t)} aria-pressed={sel?.name === t.name}
      className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 text-sm transition-colors ${t.status === 'used' ? (sel?.name === t.name ? 'bg-[#F1EBDD] text-[#24231F]' : 'bg-white/10 hover:bg-white/20') : (sel?.name === t.name ? 'bg-[#E8C6B8] text-[#24231F]' : 'border border-dashed border-[#E8C6B8]/70 text-[#E8C6B8] hover:bg-white/5')}`}>
      {t.status === 'used' ? <Check size={13} /> : <FlaskConical size={13} />}{t.name}
    </button>
  );
  return (
    <Tile className="relative overflow-hidden bg-[#24231F] text-[#F1EBDD] lg:col-span-8">
      <TileHead light icon={Sparkles} kicker="Exploring next" title="Building with AI today, learning agents next." />
      <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="space-y-5">
          <div><p className="text-xs font-medium uppercase tracking-[0.14em] text-[#D9E4DC]">Used in my projects and work</p><div className="mt-2 flex flex-wrap gap-2">{group('used').map((t) => <Chip key={t.name} t={t} />)}</div></div>
          <div><p className="text-xs font-medium uppercase tracking-[0.14em] text-[#E8C6B8]">Currently exploring</p><div className="mt-2 flex flex-wrap gap-2">{group('exploring').map((t) => <Chip key={t.name} t={t} />)}</div></div>
          <div className="min-h-[3.5rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              {sel ? (
                <motion.p key={sel.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-[#D9E4DC]">
                  <span className="font-medium text-[#F1EBDD]">{sel.name}:</span> {sel.where}
                  {sel.link && <button onClick={() => openCase(sel.link!)} className="ml-2 inline-flex items-center gap-1 underline underline-offset-4">case study <ArrowUpRight size={12} /></button>}
                </motion.p>
              ) : <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-[#D9E4DC]/70">Tap a technology to see where I used it.</motion.p>}
            </AnimatePresence>
          </div>
        </div>
        <div className="hidden h-[13.5rem] w-[15.5rem] sm:block"><div className="w-[19rem] origin-top-left scale-[.8]"><Artifact kind="ai" /></div></div>
      </div>
    </Tile>
  );
}

export default function BeyondBuild() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, () => {
    revealSection(root.current);
    gsap.from('[data-tile]', { y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '[data-bento]', start: 'top 80%', once: true } });
  });
  return (
    <section id="beyond" ref={root} aria-labelledby="beyond-title" className="py-20 sm:py-24">
      <div className="wrap">
        <SectionHead id="beyond-title" eyebrow="04 · Beyond the build" title="How I" accent="think and work." />
        <div data-bento className="mt-12 grid gap-5 lg:grid-cols-12">
          <Debugging />
          <ProblemSolving />
          <Initiative />
          <Exploring />
          <div data-tile className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-line px-6 py-4 text-sm text-muted lg:col-span-12">
            <span className="font-medium text-ink">Off the keyboard</span>
            <span>Badminton · Non-fiction reading · Side projects · Learning new tech</span>
          </div>
        </div>
      </div>
    </section>
  );
}
