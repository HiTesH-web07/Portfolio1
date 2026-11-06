'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import Avatar from '../avatar/Avatar';
import { gsap, SectionHead, revealSection, useGsap } from '../ui/motion';
import { chapters, type Chapter } from '@/data/content';

const TONE: Record<Chapter['tone'], { bg: string; ink: string; sub: string }> = {
  cream: { bg: '#F6F1E6', ink: '#24231F', sub: '#5C584E' },
  sage: { bg: '#D9E4DC', ink: '#24231F', sub: '#45524A' },
  forest: { bg: '#2D3A2E', ink: '#F1EBDD', sub: '#D9E4DC' },
  clay: { bg: '#E8C6B8', ink: '#24231F', sub: '#5C4A42' },
};

function Artifact({ kind }: { kind: Chapter['artifact'] }) {
  if (kind === 'notebook') return (
    <div className="relative w-56 rotate-2 rounded-2xl border border-[#E2D9C6] bg-[#FFFDF8] p-4 font-mono text-[12px] leading-6 text-[#24231F] shadow-lift" style={{ backgroundImage: 'repeating-linear-gradient(transparent 0 23px, #EDE5D3 23px 24px)' }}>
      <p className="text-[#8A6A1F]">#include &lt;stdio.h&gt;</p><p>int main() {'{'}</p><p className="pl-4">printf(<span className="text-[#B4462F]">&quot;Hello, World&quot;</span>);</p><p className="pl-4">return 0;</p><p>{'}'}</p>
      <span className="absolute -right-6 -top-5 rotate-6 rounded-md bg-[#E8C6B8] px-3 py-2 font-sans text-xs font-medium shadow-soft">DSA: graphs, DP</span>
    </div>
  );
  if (kind === 'kulies') return (
    <div className="w-60 -rotate-2 rounded-[1.6rem] bg-[#24231F] p-2.5 shadow-lift">
      <div className="rounded-[1.1rem] bg-[#FBF8F1] p-3 text-[#24231F]">
        <div className="flex items-center justify-between"><span className="font-display font-semibold">Kulies</span><span className="rounded-full bg-[#2D3A2E] px-2 py-0.5 text-[10px] text-white">Cart · 2</span></div>
        <div className="mt-3 grid grid-cols-2 gap-2">{['#E8C6B8', '#D9E4DC', '#E9DFC8', '#D9E4DC'].map((c, i) => <div key={i} className="rounded-lg border border-[#E6DFCF] bg-white p-1.5"><div className="aspect-[4/3] rounded-md" style={{ background: c }} /><div className="mt-1.5 h-1.5 w-3/4 rounded bg-[#E6DFCF]" /></div>)}</div>
      </div>
      <p className="mt-2 text-center text-[10px] text-white/60">Illustration of the flows I worked on</p>
    </div>
  );
  if (kind === 'workflow') return (
    <div className="w-64 space-y-0">
      {[['Trigger', 'Something happens in app A'], ['Step', 'Map and transform the data'], ['Action', 'Update app B, notify the team']].map(([k, v], i) => (
        <div key={k}>
          <div className="flex items-center gap-3 rounded-2xl bg-[#F1EBDD] p-3 text-[#24231F] shadow-lift">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#2D3A2E] font-mono text-xs text-[#F1EBDD]">{i + 1}</span>
            <span><span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-[#5C584E]">{k}</span><span className="block text-sm">{v}</span></span>
          </div>
          {i < 2 && <svg aria-hidden width="16" height="26" className="ml-6"><line x1="8" y1="0" x2="8" y2="26" stroke="#D9E4DC" strokeWidth="2" strokeDasharray="4 4" className="flow-dash" /></svg>}
        </div>
      ))}
      <p className="pt-2 text-center text-[10px] text-[#D9E4DC]/80">How an automation flows (illustration)</p>
    </div>
  );
  return (
    <div className="relative h-52 w-72">
      <div className="absolute left-0 top-6 w-56 -rotate-3 overflow-hidden rounded-2xl border-4 border-[#24231F] bg-[#24231F] shadow-lift"><div className="relative aspect-[16/10]"><Image src="/projects/mtac.webp" alt="Screenshot of Meeting-to-Action Closer" fill sizes="224px" className="object-cover object-top" /></div></div>
      <div className="absolute right-0 top-0 w-56 rotate-3 overflow-hidden rounded-2xl border-4 border-[#24231F] bg-[#24231F] shadow-lift"><div className="relative aspect-[16/10]"><Image src="/projects/cairn.webp" alt="Screenshot of Cairn" fill sizes="224px" className="object-cover object-top" /></div></div>
    </div>
  );
}

function Stage({ c, active, total }: { c: Chapter; active: number; total: number }) {
  const t = TONE[c.tone];
  return (
    <div className="relative h-full overflow-hidden rounded-[2.5rem] p-7 transition-colors duration-700" style={{ background: t.bg, color: t.ink }}>
      <div className="flex items-start justify-between">
        <AnimatePresence mode="wait"><motion.span key={c.numeral} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="font-serif text-7xl italic leading-none">{c.numeral}</motion.span></AnimatePresence>
        <span className="mt-2 text-right text-xs font-medium uppercase tracking-[0.14em]" style={{ color: t.sub }}>Chapter {active + 1} of {total}</span>
      </div>
      <div className="absolute bottom-0 left-2 w-[58%]"><Avatar pose={c.pose} title={`Illustration of Hitesh: ${c.title}`} /></div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 max-lg:right-3 max-lg:origin-right max-lg:scale-[.66]">
        <AnimatePresence mode="wait">
          <motion.div key={c.artifact} initial={{ opacity: 0, y: 24, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            <Artifact kind={c.artifact} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-6 right-7 flex gap-1.5" aria-hidden>
        {Array.from({ length: total }).map((_, i) => <span key={i} className="h-1.5 rounded-full transition-all duration-500" style={{ width: i === active ? 28 : 10, background: t.ink, opacity: i === active ? 0.9 : 0.25 }} />)}
      </div>
    </div>
  );
}

export default function JourneyStory() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-chapter]') ?? []);
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement)); }), { rootMargin: '-45% 0px -50% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useGsap(root, () => {
    revealSection(root.current);
    gsap.utils.toArray<HTMLElement>('[data-chapter]').forEach((el) => {
      gsap.from(el.querySelectorAll('[data-reveal]'), { y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 70%', once: true } });
    });
  });

  return (
    <section id="journey" ref={root} aria-labelledby="journey-title" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHead id="journey-title" eyebrow="01 · The story so far" title="Four chapters," accent="one habit: building." intro="From a curious CSE student to a full-stack developer shipping products of his own. Scroll through the chapters." />
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[12vh] h-[76vh]"><Stage c={chapters[active]} active={active} total={chapters.length} /></div>
          </div>
          <ol className="lg:col-span-6">
            {chapters.map((c, i) => (
              <li key={c.id} data-chapter className={`flex flex-col justify-center py-10 transition-opacity duration-500 lg:min-h-[80vh] lg:pl-6 ${i === active ? 'lg:opacity-100' : 'lg:opacity-35'}`}>
                <div className="mb-6 h-80 lg:hidden"><Stage c={c} active={i} total={chapters.length} /></div>
                <p data-reveal className="font-mono text-sm text-muted">{c.when}</p>
                <h3 data-reveal className="mt-3 text-4xl font-semibold sm:text-5xl"><span className="mr-3 font-serif font-normal italic text-[#B4462F] dark:text-[#E8C6B8]">{c.numeral}.</span>{c.title}</h3>
                {c.body.map((b, k) => <p key={k} data-reveal className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{b}</p>)}
                <ul data-reveal className="mt-6 flex flex-wrap gap-2">{c.tags.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
