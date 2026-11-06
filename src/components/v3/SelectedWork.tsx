'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Lightbulb, User, Clock } from 'lucide-react';
import { CaseStudy } from '../Projects';
import { gsap, SectionHead, revealSection, useGsap } from '../ui/motion';
import { projects, caseStudies, featuredWork, type Project } from '@/data/content';

function Shot({ p, url, big }: { p: Project; url?: string; big?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-black/10 bg-white shadow-lift">
      <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#F4F1EA] px-3.5 py-2">
        <span className="h-2 w-2 rounded-full bg-[#E5A090]" /><span className="h-2 w-2 rounded-full bg-[#E3C77A]" /><span className="h-2 w-2 rounded-full bg-[#9DB2A1]" />
        {url && <span className="ml-2 flex-1 truncate rounded-full bg-white px-3 py-0.5 text-center font-mono text-[10px] text-[#5C584E]">{url}</span>}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {p.image
          ? <Image src={p.image} alt={`Screenshot of ${p.name}`} fill sizes={big ? '(min-width: 1024px) 680px, 100vw' : '(min-width: 1024px) 560px, 100vw'} className="object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
          : <div className="absolute inset-0 flex flex-col justify-between bg-[#D9E4DC] p-6 text-[#24231F]"><span className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-70">{p.kicker}</span><span className="font-display text-4xl font-semibold tracking-tight">{p.name}</span><span className="flex items-center gap-1.5 text-xs opacity-70"><Clock size={12} />Screenshot to be added</span></div>}
      </div>
    </div>
  );
}

function Meta({ p, onCase }: { p: Project; onCase: () => void }) {
  const cs = caseStudies[p.id]; const f = featuredWork.find((x) => x.id === p.id)!;
  const Icon = cs?.label === 'Personal project' ? User : Lightbulb;
  return (
    <div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8C6B8] px-2.5 py-1 text-xs font-medium text-[#24231F]"><Icon size={12} />{cs?.label}</span>
      <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">{p.name}</h3>
      {cs && <p className="mt-3 font-serif text-xl italic leading-snug text-muted">“{cs.gap.split('. ')[0].replace(/\.$/, '')}.”</p>}
      <p className="mt-3 leading-relaxed text-muted">{f.pitch}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">{p.stack.slice(0, 5).map((s) => <li key={s} className="chip !text-xs">{s}</li>)}</ul>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={onCase} className="btn-primary">Case study <ArrowRight size={16} /></motion.button>
        {p.live ? <motion.a whileHover={{ y: -2 }} href={p.live} target="_blank" rel="noreferrer" className="btn-ghost">Live <ArrowUpRight size={16} /><span className="sr-only">(opens in a new tab)</span></motion.a>
          : <span className="text-sm text-muted">Live link to be added</span>}
      </div>
    </div>
  );
}

export default function SelectedWork() {
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
    gsap.from('[data-work]', { y: 50, opacity: 0, duration: 1, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '[data-work]', start: 'top 80%', once: true } });
    if (isDesktop) gsap.fromTo('[data-feature-shot]', { y: 30, rotate: -1 }, { y: -20, rotate: 0, ease: 'none', scrollTrigger: { trigger: '[data-feature-shot]', start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  const [first, ...others] = featuredWork.map((f) => projects.find((p) => p.id === f.id)!);
  return (
    <section id="work" ref={root} aria-labelledby="work-title" className="py-20 sm:py-24">
      <div className="wrap">
        <SectionHead id="work-title" eyebrow="03 · Selected work" title="I noticed a gap," accent="so I built." />
        <article data-work className="group mt-12 grid items-center gap-10 rounded-[2rem] bg-[#F6F1E6] p-5 dark:bg-paper sm:p-8 lg:grid-cols-12 lg:p-10 [&>*]:min-w-0">
          <button onClick={() => show(first.id)} className="block text-left lg:col-span-7" aria-label={`Open the ${first.name} case study`}><div data-feature-shot><Shot p={first} url={featuredWork[0].url} big /></div></button>
          <div className="lg:col-span-5"><Meta p={first} onCase={() => show(first.id)} /></div>
        </article>
        <div className="mt-6 grid gap-6 md:grid-cols-2 [&>*]:min-w-0">
          {others.map((p) => (
            <article key={p.id} data-work className="group flex flex-col rounded-[2rem] border border-line bg-paper p-5 sm:p-7">
              <button onClick={() => show(p.id)} className="block text-left" aria-label={`Open the ${p.name} case study`}><Shot p={p} url={featuredWork.find((f) => f.id === p.id)?.url} /></button>
              <div className="mt-6"><Meta p={p} onCase={() => show(p.id)} /></div>
            </article>
          ))}
        </div>
      </div>
      <AnimatePresence>{open && <CaseStudy key={open.id} p={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
