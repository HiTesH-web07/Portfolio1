'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Search, CheckCircle2 } from 'lucide-react';
import Avatar from './avatar/Avatar';
import { ScrollTrigger, SectionHead, revealSection, useGsap } from './ui/motion';
import { stories, type Pose } from '@/data/content';

const STAGES = [
  { key: 'problem', label: 'Problem', icon: AlertTriangle, pose: 'puzzled' as Pose, tone: 'text-[#B4462F] dark:text-[#F0A08C]', dot: 'bg-[#C2553D]' },
  { key: 'investigation', label: 'Investigation', icon: Search, pose: 'think' as Pose, tone: 'text-[#8A6A1F] dark:text-[#E3C77A]', dot: 'bg-[#D3A84A]' },
  { key: 'solution', label: 'Solution', icon: CheckCircle2, pose: 'celebrate' as Pose, tone: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-600' },
] as const;

export default function Stories() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const trig = useRef<ScrollTrigger | null>(null);
  const [story, setStory] = useState(0);
  const [stage, setStage] = useState(0);

  useGsap(root, ({ isDesktop }) => {
    revealSection(root.current);
    if (!isDesktop) return;
    trig.current = ScrollTrigger.create({
      trigger: pin.current, start: 'top top', end: '+=1500', pin: true, anticipatePin: 1,
      onUpdate: (s) => setStage(Math.min(2, Math.floor(s.progress * 3))),
    });
    return () => { trig.current = null; };
  });

  const goStage = (i: number) => {
    const t = trig.current;
    if (t) window.scrollTo({ top: t.start + ((i + 0.5) / 3) * (t.end - t.start), behavior: 'smooth' });
    else setStage(i);
  };

  const s = stories[story];
  const st = STAGES[stage];
  const step = s.steps[st.key];

  return (
    <section id="stories" ref={root} aria-labelledby="stories-title" className="bg-sage/60 py-20 sm:py-24">
      <div className="wrap">
        <SectionHead id="stories-title" eyebrow="04 · Engineering stories" title="Things don't always work on the" accent="first try." intro="Real problems from across the stack: a slow interface, a database that must never double-write, and an automation that will not authenticate. The process is the same every time." />
      </div>

      <div ref={pin} className="lg:flex lg:min-h-screen lg:items-center">
        <div className="wrap py-10">
          <div role="tablist" aria-label="Choose a story" className="flex flex-wrap gap-2">
            {stories.map((x, i) => (
              <button key={x.id} role="tab" aria-selected={story === i} onClick={() => setStory(i)}
                className={`min-h-[44px] rounded-full border px-4 text-sm font-medium transition-colors ${story === i ? 'border-ink bg-ink text-bg' : 'border-ink/15 bg-paper/70 hover:border-ink/40'}`}>
                {x.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-8 rounded-[2.5rem] border border-line bg-paper p-5 shadow-soft sm:p-8 lg:grid-cols-12 lg:p-10">
            <div className="relative lg:col-span-4">
              <div className="relative mx-auto max-w-[18rem] overflow-hidden rounded-[2rem] bg-bg">
                <Avatar pose={st.pose} className="w-full" title={`Illustration of Hitesh at the ${st.label.toLowerCase()} stage`} />
              </div>
              <p className="mt-4 text-center text-sm text-muted">{s.where}</p>
            </div>

            <div className="lg:col-span-8">
              <ol className="grid grid-cols-3 gap-2" aria-label="Stages">
                {STAGES.map((x, i) => (
                  <li key={x.key}>
                    <button onClick={() => goStage(i)} aria-current={stage === i ? 'step' : undefined}
                      className={`group w-full rounded-2xl border p-3 text-left transition-colors ${stage === i ? 'border-ink/30 bg-bg' : 'border-transparent hover:bg-bg/60'}`}>
                      <span className="block h-1 overflow-hidden rounded-full bg-line"><span className={`block h-full origin-left rounded-full ${x.dot} transition-transform duration-700 ${i <= stage ? 'scale-x-100' : 'scale-x-0'}`} /></span>
                      <span className={`mt-3 flex items-center gap-1.5 text-sm font-medium ${stage === i ? x.tone : 'text-muted'}`}><x.icon size={15} />{x.label}</span>
                    </button>
                  </li>
                ))}
              </ol>

              <div className="relative mt-8 min-h-[22rem] sm:min-h-[19rem]" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div key={`${s.id}-${st.key}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                    <p className="eyebrow"><span className={st.tone}>{String(stage + 1).padStart(2, '0')} · {st.label}</span></p>
                    <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{step.title}</h3>
                    <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-muted">{step.body}</p>
                    <div className="mt-6 overflow-hidden rounded-2xl bg-[#24231F] font-mono text-[13px] text-[#E8E2D2] sm:text-sm">
                      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5"><span className="h-2.5 w-2.5 rounded-full bg-[#C2553D]" /><span className="h-2.5 w-2.5 rounded-full bg-[#D3A84A]" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-600" /><span className="ml-2 text-xs text-white/50">{st.key}.log</span></div>
                      <div className="p-4">
                        {step.code.map((line, i) => (
                          <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.18 }} className="leading-7">
                            <span className="mr-3 select-none text-white/50">{i + 1}</span>
                            <span className={i === step.code.length - 1 ? (stage === 0 ? 'text-[#F0A08C]' : stage === 2 ? 'text-emerald-400' : 'text-[#E3C77A]') : ''}>{line}</span>
                          </motion.p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-6 flex gap-2 lg:hidden">
                <button disabled={stage === 0} onClick={() => setStage(stage - 1)} className="btn-ghost !min-h-[44px] disabled:opacity-40">Back</button>
                <button disabled={stage === 2} onClick={() => setStage(stage + 1)} className="btn-primary !min-h-[44px] disabled:opacity-40">Next step</button>
              </div>
              <p className="mt-4 hidden text-sm text-muted lg:block">Scroll to move through the stages, or pick one above.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
