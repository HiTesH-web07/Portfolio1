'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Github, Lightbulb, Briefcase, User, Clock, ChevronDown } from 'lucide-react';
import ArchDiagram from '../story/ArchDiagram';
import { CaseStudy } from '../Projects';
import { gsap, SectionHead, SplitWords, revealSection, useGsap } from '../ui/motion';
import { projects, caseStudies, featuredWork, type Project } from '@/data/content';

const LABEL_ICON = { 'Independent project': Lightbulb, 'Personal project': User, 'Work project': Briefcase } as const;

function Label({ id, dark = false }: { id: string; dark?: boolean }) {
  const l = caseStudies[id]?.label; if (!l) return null; const I = LABEL_ICON[l];
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${dark ? 'bg-[#E8C6B8] text-[#24231F]' : l === 'Work project' ? 'bg-[#2D3A2E] text-[#F1EBDD]' : 'bg-[#E8C6B8] text-[#24231F]'}`}><I size={13} />{l}</span>;
}

function Browser({ p, url, priority }: { p: Project; url: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-black/10 bg-white shadow-lift">
      <div className="flex items-center gap-2 border-b border-black/5 bg-[#F4F1EA] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5A090]" /><span className="h-2.5 w-2.5 rounded-full bg-[#E3C77A]" /><span className="h-2.5 w-2.5 rounded-full bg-[#9DB2A1]" />
        {url && <span className="ml-3 flex-1 truncate rounded-full bg-white px-3 py-1 text-center font-mono text-[11px] text-[#5C584E]">{url}</span>}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {p.image ? <Image src={p.image} alt={`Screenshot of ${p.name}`} fill sizes="(min-width: 1024px) 680px, 100vw" priority={priority} className="object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]" />
          : <div className="absolute inset-0 flex flex-col justify-between bg-[#2D3A2E] p-8 text-[#F1EBDD]"><span className="font-mono text-xs uppercase tracking-[0.16em] opacity-70">{p.kicker}</span><span className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">{p.name}</span><span className="flex items-center gap-1.5 text-xs opacity-70"><Clock size={12} />Screenshot to be added</span></div>}
      </div>
    </div>
  );
}

function Links({ p, onCase, dark }: { p: Project; onCase: () => void; dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={onCase} className={dark ? 'btn bg-[#F1EBDD] text-[#24231F] hover:bg-white' : 'btn bg-[#2D3A2E] text-[#F1EBDD] hover:bg-[#24231F]'}>Full case study <ArrowRight size={16} /></motion.button>
      {p.live && <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={p.live} target="_blank" rel="noreferrer" className={dark ? 'btn border border-white/25 text-[#F1EBDD] hover:bg-white/5' : 'btn border border-[#24231F]/25 text-[#24231F] hover:bg-[#24231F]/5'}>Live demo <ArrowUpRight size={16} /><span className="sr-only">(opens in a new tab)</span></motion.a>}
      {p.code ? <motion.a whileHover={{ y: -2 }} href={p.code} target="_blank" rel="noreferrer" className={dark ? 'btn border border-white/25 text-[#F1EBDD] hover:bg-white/5' : 'btn border border-[#24231F]/25 text-[#24231F] hover:bg-[#24231F]/5'}><Github size={16} />Code<span className="sr-only">(opens in a new tab)</span></motion.a>
        : <span className={`text-sm ${dark ? 'text-[#D9E4DC]' : 'text-[#5C584E]'}`}>GitHub link to be added</span>}
    </div>
  );
}

const BANDS = [
  { tone: 'bg-[#24231F] text-[#F1EBDD]', dark: true, url: 'proof-of-impact.embarko.app' },
  { tone: 'bg-[#D9E4DC] text-[#24231F]', dark: false, url: 'meeting-to-action-closer.embarko.app' },
  { tone: 'bg-[#F6F1E6] text-[#24231F]', dark: false, url: '' },
];

function Decisions({ p, dark }: { p: Project; dark: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} aria-expanded={open} className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${dark ? 'border-white/25 hover:bg-white/5' : 'border-[#24231F]/20 hover:bg-[#24231F]/5'}`}>
        {open ? 'Hide engineering decisions' : 'Show engineering decisions'}<ChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ol initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <div className="grid gap-x-8 gap-y-3 pt-5 sm:grid-cols-2">
              {p.highlights.map((h, k) => <li key={h} className="flex gap-3 leading-relaxed"><span className="font-mono text-sm opacity-60">{String(k + 1).padStart(2, '0')}</span><span className="opacity-90">{h}</span></li>)}
            </div>
          </motion.ol>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WorkBands() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const show = useCallback((id: string) => { const p = projects.find((x) => x.id === id); if (p) { setOpen(p); history.replaceState(null, '', `#case-${id}`); } }, []);
  const close = useCallback(() => { setOpen(null); history.replaceState(null, '', '#work'); }, []);

  useEffect(() => {
    const h = location.hash.match(/^#case-(.+)$/);
    if (h) { document.getElementById('work')?.scrollIntoView(); show(h[1]); }
    const onOpen = (e: Event) => show((e as CustomEvent<string>).detail);
    window.addEventListener('open-case', onOpen);
    return () => window.removeEventListener('open-case', onOpen);
  }, [show]);

  useGsap(root, ({ isDesktop }) => {
    revealSection(root.current);
    gsap.utils.toArray<HTMLElement>('[data-band]').forEach((band) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: band, start: 'top 70%', once: true } });
      tl.from(band.querySelectorAll('[data-gap]'), { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' })
        .from(band.querySelectorAll('h3 [data-word]'), { yPercent: 110, duration: 1, stagger: 0.06, ease: 'expo.out' }, '-=0.5')
        .from(band.querySelectorAll('[data-in]'), { y: 24, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, '-=0.6');
      if (isDesktop) gsap.fromTo(band.querySelector('[data-shot]'), { scale: 0.92, y: 40 }, { scale: 1, y: -20, ease: 'none', scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });

  const featured = featuredWork.map((f) => projects.find((p) => p.id === f.id)!);

  return (
    <section id="work" ref={root} aria-labelledby="work-title" className="pt-20 sm:pt-24">
      <div className="wrap">
        <SectionHead id="work-title" eyebrow="03 · Selected work" title="I noticed a gap," accent="so I built." intro="Three products I designed, built and shipped. Open any of them for the full case study." />
      </div>

      <div className="mt-16">
        {featured.map((p, i) => {
          const cs = caseStudies[p.id]; const b = BANDS[i];
          return (
            <article key={p.id} data-band className={`${b.tone} py-16 sm:py-20`}>
              <div className="wrap">
                <div className="flex flex-wrap items-center gap-3"><Label id={p.id} dark={b.dark} /><span className="font-mono text-sm opacity-70">{String(i + 1).padStart(2, '0')}{p.year && ` · ${p.year}`}</span></div>
                <div data-gap className="mt-6 max-w-3xl">
                  <p className="eyebrow" style={{ color: 'inherit', opacity: 0.7 }}>The gap I noticed</p>
                  <p className="mt-3 font-serif text-2xl italic leading-snug sm:text-3xl">“{cs.gap.split('. ')[0].replace(/\.$/, '')}.”</p>
                </div>
                <h3 className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-7xl"><span className="mr-4 align-middle font-serif text-3xl font-normal italic opacity-70 sm:text-4xl">So I built</span><SplitWords text={p.name} /></h3>

                <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start [&>*]:min-w-0">
                  <button onClick={() => show(p.id)} className="group block text-left lg:col-span-7" aria-label={`Open the ${p.name} case study`}>
                    <div data-shot><Browser p={p} url={b.url} priority={i === 0} /></div>
                  </button>
                  <div className="lg:col-span-5">
                    <p data-in className="eyebrow" style={{ color: 'inherit', opacity: 0.7 }}>What it does</p>
                    <p data-in className="mt-3 text-lg leading-relaxed opacity-90">{featuredWork.find((f) => f.id === p.id)?.pitch}</p>
                    <p data-in className="eyebrow mt-8 hidden sm:block" style={{ color: 'inherit', opacity: 0.7 }}>How it is built</p>
                    <div data-in className="mt-3 hidden sm:block"><ArchDiagram arch={cs.arch} side={cs.side} dark={b.dark} /></div>
                  </div>
                </div>

                <div data-in className="mt-10 flex flex-wrap items-center justify-between gap-6">
                  <ul className="flex flex-wrap gap-2">{p.stack.map((x) => <li key={x} className={`rounded-full border px-3 py-1 text-sm ${b.dark ? 'border-white/20' : 'border-[#24231F]/20'}`}>{x}</li>)}</ul>
                  <Links p={p} onCase={() => show(p.id)} dark={b.dark} />
                </div>
                <div data-in className="mt-6"><Decisions p={p} dark={b.dark} /></div>
              </div>
            </article>
          );
        })}
      </div>

      <AnimatePresence>{open && <CaseStudy key={open.id} p={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
