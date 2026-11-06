'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Github, Lightbulb, Briefcase, User, Clock } from 'lucide-react';
import ArchDiagram from './ArchDiagram';
import { CaseStudy } from '../Projects';
import { gsap, SectionHead, SplitWords, revealSection, useGsap } from '../ui/motion';
import { projects, caseStudies, type Project } from '@/data/content';

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
        <span className="ml-3 flex-1 truncate rounded-full bg-white px-3 py-1 text-center font-mono text-[11px] text-[#5C584E]">{url}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {p.image ? <Image src={p.image} alt={`Screenshot of ${p.name}`} fill sizes="(min-width: 1024px) 680px, 100vw" priority={priority} className="object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]" />
          : <div className="absolute inset-0 grid place-items-center bg-[#F6F1E6] text-[#5C584E]"><span className="flex items-center gap-2 text-sm"><Clock size={14} />Screenshot to be added</span></div>}
      </div>
    </div>
  );
}

function Links({ p, onCase, dark }: { p: Project; onCase: () => void; dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={onCase} className={dark ? 'btn bg-[#F1EBDD] text-[#24231F] hover:bg-white' : 'btn-primary'}>Full case study <ArrowRight size={16} /></motion.button>
      {p.live && <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={p.live} target="_blank" rel="noreferrer" className={dark ? 'btn border border-white/25 text-[#F1EBDD] hover:bg-white/5' : 'btn-ghost'}>Live demo <ArrowUpRight size={16} /><span className="sr-only">(opens in a new tab)</span></motion.a>}
      {p.code ? <motion.a whileHover={{ y: -2 }} href={p.code} target="_blank" rel="noreferrer" className={dark ? 'btn border border-white/25 text-[#F1EBDD] hover:bg-white/5' : 'btn-ghost'}><Github size={16} />Code<span className="sr-only">(opens in a new tab)</span></motion.a>
        : <span className={`text-sm ${dark ? 'text-[#D9E4DC]' : 'text-muted'}`}>GitHub link to be added</span>}
    </div>
  );
}

const BANDS = [
  { tone: 'bg-[#24231F] text-[#F1EBDD]', dark: true, url: 'proof-of-impact.embarko.app' },
  { tone: 'bg-[#D9E4DC] text-[#24231F]', dark: false, url: 'meeting-to-action-closer.embarko.app' },
];

export default function ProjectsStory() {
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

  const featured = projects.slice(0, 2);
  const rest = projects.slice(2);

  return (
    <section id="work" ref={root} aria-labelledby="work-title" className="pt-20 sm:pt-24">
      <div className="wrap">
        <SectionHead id="work-title" eyebrow="03 · Projects" title="I noticed a gap," accent="so I built." intro="Case studies of products I designed, built and shipped. Independent, personal and work projects are labelled, so it is always clear what was mine to build." />
      </div>

      <div className="mt-16">
        {featured.map((p, i) => {
          const cs = caseStudies[p.id]; const b = BANDS[i];
          return (
            <article key={p.id} data-band className={`${b.tone} py-20 sm:py-28`}>
              <div className="wrap">
                <div className="flex flex-wrap items-center gap-3"><Label id={p.id} dark={b.dark} /><span className="font-mono text-sm opacity-70">{String(i + 1).padStart(2, '0')} · {p.year}</span></div>
                <div data-gap className="mt-8 max-w-3xl">
                  <p className="eyebrow" style={{ color: 'inherit', opacity: 0.7 }}>The gap I noticed</p>
                  <p className="mt-3 font-serif text-3xl italic leading-snug sm:text-4xl">“{cs.gap}”</p>
                </div>
                <h3 className="mt-10 font-display text-5xl font-semibold tracking-tight sm:text-7xl"><span className="mr-4 align-middle font-serif text-3xl font-normal italic opacity-70 sm:text-4xl">So I built</span><SplitWords text={p.name} /></h3>

                <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-start">
                  <button onClick={() => show(p.id)} className="group block text-left lg:col-span-7" aria-label={`Open the ${p.name} case study`}>
                    <div data-shot><Browser p={p} url={b.url} priority={i === 0} /></div>
                  </button>
                  <div className="lg:col-span-5">
                    <p data-in className="eyebrow" style={{ color: 'inherit', opacity: 0.7 }}>What it does</p>
                    <p data-in className="mt-3 text-lg leading-relaxed opacity-90">{p.solution}</p>
                    <p data-in className="eyebrow mt-8" style={{ color: 'inherit', opacity: 0.7 }}>How it is built</p>
                    <div data-in className="mt-3"><ArchDiagram arch={cs.arch} side={cs.side} dark={b.dark} /></div>
                  </div>
                </div>

                <div className="mt-14 grid gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <p data-in className="eyebrow" style={{ color: 'inherit', opacity: 0.7 }}>Engineering decisions</p>
                    <ol className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                      {p.highlights.map((h, k) => (
                        <li key={h} data-in className="flex gap-3 leading-relaxed"><span className="font-mono text-sm opacity-60">{String(k + 1).padStart(2, '0')}</span><span className="opacity-90">{h}</span></li>
                      ))}
                    </ol>
                  </div>
                  <div className="lg:col-span-4">
                    <p data-in className="eyebrow" style={{ color: 'inherit', opacity: 0.7 }}>Stack</p>
                    <ul data-in className="mt-4 flex flex-wrap gap-2">{p.stack.map((s) => <li key={s} className={`rounded-full border px-3 py-1 text-sm ${b.dark ? 'border-white/20' : 'border-[#24231F]/20'}`}>{s}</li>)}</ul>
                    <div data-in className="mt-8"><Links p={p} onCase={() => show(p.id)} dark={b.dark} /></div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="wrap py-24 sm:py-28">
        <h3 className="reveal font-display text-3xl font-semibold">More work</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {rest.map((p) => (
            <motion.article key={p.id} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }} className="reveal card flex flex-col p-7">
              <div className="flex flex-wrap items-center justify-between gap-2"><Label id={p.id} />{p.status && <span className="rounded-full border border-line px-2.5 py-1 text-xs">{p.status}</span>}</div>
              <h4 className="mt-6 text-3xl font-semibold">{p.name}</h4>
              {caseStudies[p.id] && <p className="mt-3 font-serif text-xl italic leading-snug text-muted">“{caseStudies[p.id].gap}”</p>}
              <p className="mt-4 flex-1 leading-relaxed text-muted">{p.short}</p>
              <ul className="mt-5 flex flex-wrap gap-2">{p.stack.slice(0, 5).map((s) => <li key={s} className="chip !text-xs">{s}</li>)}</ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button onClick={() => show(p.id)} className="btn-ghost !min-h-[40px] !px-4 text-sm">Case study</button>
                {p.live ? <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex min-h-[40px] items-center gap-1 text-sm font-medium underline-offset-4 hover:underline">Live<ArrowUpRight size={14} /><span className="sr-only">(opens in a new tab)</span></a>
                  : <span className="text-sm text-muted">Live link to be added</span>}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <AnimatePresence>{open && <CaseStudy key={open.id} p={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
