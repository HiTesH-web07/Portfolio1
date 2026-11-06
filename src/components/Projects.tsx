'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Github, X, Clock } from 'lucide-react';
import { SectionHead, revealSection, useGsap, gsap } from './ui/motion';
import { projects, type Project } from '@/data/content';

const TONE: Record<Project['tone'], string> = {
  forest: 'bg-[#2D3A2E] text-[#F1EBDD]',
  sage: 'bg-[#D9E4DC] text-[#24231F]',
  clay: 'bg-[#E8C6B8] text-[#24231F]',
  paper: 'bg-[#FBF8F1] text-[#24231F]',
  ink: 'bg-[#24231F] text-[#F1EBDD]',
};

export function openCase(id: string) {
  window.dispatchEvent(new CustomEvent('open-case', { detail: id }));
}

function Screen({ p, priority = false, sizes }: { p: Project; priority?: boolean; sizes: string }) {
  if (p.image) {
    return <Image src={p.image} alt={`Screenshot of ${p.name}`} fill sizes={sizes} priority={priority} className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />;
  }
  // No real screenshot yet: a typographic cover, labelled honestly
  return (
    <div className={`absolute inset-0 flex flex-col justify-between p-5 ${TONE[p.tone]}`}>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-70">{p.kicker}</span>
      <span className="font-display text-3xl font-semibold leading-none tracking-tight transition-transform duration-700 group-hover:-translate-y-1 sm:text-4xl">{p.name}</span>
      <span className="flex items-center gap-1.5 text-xs opacity-70"><Clock size={12} />Screenshot to be added</span>
    </div>
  );
}

function Tablet({ p, priority, sizes }: { p: Project; priority?: boolean; sizes: string }) {
  return (
    <div className="rounded-[1.75rem] bg-[#24231F] p-2.5 shadow-lift sm:rounded-[2.25rem] sm:p-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-[#FBF8F1] sm:rounded-[1.6rem]">
        <Screen p={p} priority={priority} sizes={sizes} />
      </div>
    </div>
  );
}

function Links({ p, size = 'md' }: { p: Project; size?: 'md' | 'sm' }) {
  const cls = size === 'sm' ? '!min-h-[40px] !px-4 text-sm' : '';
  return (
    <div className="flex flex-wrap items-center gap-2">
      {p.live ? (
        <a href={p.live} target="_blank" rel="noreferrer" className={`btn-primary ${cls}`}>Live demo<ArrowUpRight size={16} /><span className="sr-only">(opens in a new tab)</span></a>
      ) : <span className="text-sm text-muted">Live link to be added</span>}
      {p.code ? (
        <a href={p.code} target="_blank" rel="noreferrer" className={`btn-ghost ${cls}`}><Github size={16} />Code<span className="sr-only">(opens in a new tab)</span></a>
      ) : <span className="text-sm text-muted">{p.live ? '· GitHub link to be added' : 'GitHub link to be added'}</span>}
    </div>
  );
}

function CaseStudy({ p, onClose }: { p: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); prev?.focus(); };
  }, [onClose]);
  const block = (t: string, b: string) => (
    <div><h4 className="eyebrow">{t}</h4><p className="mt-2 text-[17px] leading-relaxed">{b}</p></div>
  );
  return (
    <motion.div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#24231F]/50 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-labelledby="case-title" onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-bg shadow-lift sm:rounded-[2.5rem]"
        initial={{ y: 60, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <button ref={closeRef} onClick={onClose} aria-label="Close case study" className="sticky left-full top-4 z-10 mr-4 mt-4 grid h-11 w-11 place-items-center rounded-full bg-paper shadow-soft"><X size={20} /></button>
        <div className="-mt-11 p-5 sm:p-10">
          <p className="eyebrow">{p.kicker}{p.year && ` · ${p.year}`}{p.status && ` · ${p.status}`}</p>
          <h3 id="case-title" className="mt-3 text-4xl font-semibold sm:text-5xl">{p.name}</h3>
          <p className="mt-4 max-w-2xl text-lg text-muted">{p.short}</p>
          <div className="mt-6"><Links p={p} /></div>
          <div className="mt-8"><Tablet p={p} sizes="(min-width: 900px) 800px, 100vw" /></div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {block('The problem', p.problem)}
            {block('The solution', p.solution)}
            {block('My contribution', p.contribution)}
            <div>
              <h4 className="eyebrow">Technologies</h4>
              <ul className="mt-3 flex flex-wrap gap-2">{p.stack.map((s) => <li key={s} className="chip">{s}</li>)}</ul>
            </div>
          </div>
          <div className="mt-10 rounded-3xl border border-line bg-paper p-6">
            <h4 className="eyebrow">Technical highlights</h4>
            <ul className="mt-4 grid gap-3">
              {p.highlights.map((h) => <li key={h} className="flex gap-3 leading-relaxed"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />{h}</li>)}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const show = useCallback((id: string) => {
    const p = projects.find((x) => x.id === id);
    if (p) { setOpen(p); history.replaceState(null, '', `#case-${id}`); }
  }, []);
  const close = useCallback(() => { setOpen(null); history.replaceState(null, '', '#work'); }, []);

  useEffect(() => {
    const h = location.hash.match(/^#case-(.+)$/);
    if (h) { document.getElementById('work')?.scrollIntoView(); show(h[1]); }
    const onOpen = (e: Event) => show((e as CustomEvent<string>).detail);
    window.addEventListener('open-case', onOpen);
    return () => window.removeEventListener('open-case', onOpen);
  }, [show]);

  useGsap(root, () => {
    revealSection(root.current);
    gsap.utils.toArray<HTMLElement>('[data-feature]').forEach((el) => {
      gsap.fromTo(el.querySelector('[data-tablet]'), { y: 60, rotate: -1.5 }, { y: -20, rotate: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });

  const featured = projects.slice(0, 2);
  const rest = projects.slice(2);

  return (
    <section id="work" ref={root} aria-labelledby="work-title" className="py-24 sm:py-32">
      <div className="wrap">
        <SectionHead id="work-title" eyebrow="03 · Featured projects" title="Things I've brought" accent="to life." intro="Products I designed, built and shipped end to end: frontend, backend, database, tests and AI. Open any project for the full case study." />

        <div className="mt-16 grid gap-20 sm:gap-28">
          {featured.map((p, i) => (
            <article key={p.id} data-feature className="group grid items-center gap-10 lg:grid-cols-12">
              <button onClick={() => show(p.id)} className={`relative block text-left lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`} aria-label={`Open the ${p.name} case study`}>
                <div aria-hidden className={`absolute -inset-4 -z-10 rounded-[3rem] ${i % 2 ? 'bg-clay/50' : 'bg-sage'} rotate-[-2deg] transition-transform duration-700 group-hover:rotate-0 sm:-inset-6`} />
                <div data-tablet><Tablet p={p} priority={i === 0} sizes="(min-width: 1024px) 700px, 100vw" /></div>
                <span aria-hidden className="drift absolute -right-2 -top-5 rounded-full bg-ink px-4 py-2 font-display text-sm text-bg shadow-soft sm:-right-5">{p.kicker}</span>
              </button>
              <div className={`reveal lg:col-span-5 ${i % 2 ? 'lg:order-1' : ''}`}>
                <p className="font-mono text-sm text-muted">{String(i + 1).padStart(2, '0')} · {p.year}</p>
                <h3 className="mt-3 text-4xl font-semibold sm:text-5xl">{p.name}</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">{p.short}</p>
                <ul className="mt-5 flex flex-wrap gap-2">{p.stack.slice(0, 5).map((s) => <li key={s} className="chip">{s}</li>)}</ul>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => show(p.id)} className="btn-ghost">Read the case study</motion.button>
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="btn-primary">Live demo<ArrowUpRight size={16} /><span className="sr-only">(opens in a new tab)</span></a>}
                </div>
              </div>
            </article>
          ))}
        </div>

        <h3 className="reveal mt-28 font-display text-2xl font-semibold">More work</h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {rest.map((p) => (
            <motion.article key={p.id} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }} className="reveal group card flex flex-col overflow-hidden p-3">
              <button onClick={() => show(p.id)} className="block text-left" aria-label={`Open the ${p.name} case study`}>
                <Tablet p={p} sizes="(min-width: 640px) 50vw, 100vw" />
              </button>
              <div className="flex flex-1 flex-col p-4 pt-6">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-2xl font-semibold">{p.name}</h4>
                  {p.status && <span className="rounded-full bg-[#E8C6B8] px-2.5 py-1 text-xs font-medium text-[#24231F]">{p.status}</span>}
                </div>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{p.short}</p>
                <ul className="mt-4 flex flex-wrap gap-2">{p.stack.slice(0, 4).map((s) => <li key={s} className="chip !text-xs">{s}</li>)}</ul>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button onClick={() => show(p.id)} className="btn-ghost !min-h-[40px] !px-4 text-sm">Case study</button>
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex min-h-[40px] items-center gap-1 text-sm font-medium underline-offset-4 hover:underline">Live<ArrowUpRight size={14} /><span className="sr-only">(opens in a new tab)</span></a>}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <AnimatePresence>{open && <CaseStudy key={open.id} p={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
