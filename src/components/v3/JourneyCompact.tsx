'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Lightbulb } from 'lucide-react';
import Avatar from '../avatar/Avatar';
import { gsap, SectionHead, revealSection, useGsap } from '../ui/motion';
import { milestones } from '@/data/content';

const TONE = {
  cream: { bg: '#F6F1E6', ink: '#24231F' },
  sage: { bg: '#D9E4DC', ink: '#24231F' },
  forest: { bg: '#2D3A2E', ink: '#F1EBDD' },
  clay: { bg: '#E8C6B8', ink: '#24231F' },
} as const;
const KIND = { Education: GraduationCap, Employment: Briefcase, Independent: Lightbulb } as const;

export default function JourneyCompact() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, ({ isDesktop }) => {
    revealSection(root.current);
    if (isDesktop) gsap.fromTo('[data-line]', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', ease: 'none', scrollTrigger: { trigger: '[data-cards]', start: 'top 80%', end: 'top 35%', scrub: 0.5 } });
    gsap.from('[data-card]', { y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '[data-cards]', start: 'top 78%', once: true } });
  });

  return (
    <section id="journey" ref={root} aria-labelledby="journey-title" className="py-20 sm:py-24">
      <div className="wrap">
        <SectionHead id="journey-title" eyebrow="01 · My journey" title="How I got" accent="here." intro="Four steps, from learning C in college to building my own products." />
      </div>
      <div className="relative mt-12">
        <div aria-hidden className="wrap pointer-events-none absolute inset-x-0 top-[5.5rem] hidden lg:block"><div className="h-px bg-line"><div data-line className="h-px bg-ink" /></div></div>
        <ol data-cards className="wrap flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
          {milestones.map((m) => {
            const t = TONE[m.tone]; const K = KIND[m.kind];
            return (
              <motion.li key={m.id} data-card whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                className="flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] border border-line bg-paper shadow-soft sm:w-[46%] lg:w-auto">
                <div className="relative h-44 overflow-hidden" style={{ background: t.bg, color: t.ink }}>
                  <span className="absolute left-5 top-4 font-serif text-5xl italic leading-none">{m.numeral}</span>
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/10 px-2.5 py-1 text-[11px] font-medium" style={{ color: t.ink }}><K size={12} />{m.kind}</span>
                  <div className="absolute -bottom-2 right-3 w-36"><Avatar pose={m.pose} float={false} title={`Illustration of Hitesh: ${m.title}`} /></div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-xs text-muted">{m.when}</p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug">{m.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{m.text}</p>
                  <p className="mt-3 text-[15px] leading-snug"><span className="mr-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#B4462F] dark:text-[#E8C6B8]">Learned</span>{m.learned}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">{m.tags.map((x) => <li key={x} className="rounded-full border border-line px-2.5 py-0.5 text-xs">{x}</li>)}</ul>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
