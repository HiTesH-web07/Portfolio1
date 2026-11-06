'use client';
import { useEffect, useRef, useState } from 'react';
import Avatar from './avatar/Avatar';
import { gsap, SectionHead, revealSection, useGsap } from './ui/motion';
import { journey } from '@/data/content';

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGsap(root, ({ isDesktop }) => {
    revealSection(root.current);
    gsap.fromTo('[data-progress]', { scaleY: 0 }, {
      scaleY: 1, ease: 'none', transformOrigin: 'top',
      scrollTrigger: { trigger: '[data-chapters]', start: 'top 60%', end: 'bottom 60%', scrub: true },
    });
    if (isDesktop) {
      gsap.utils.toArray<HTMLElement>('[data-chapter]').forEach((el) => {
        gsap.fromTo(el, { opacity: 0.35 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 50%', scrub: true } });
      });
    }
  });

  // which chapter is in the middle of the screen (works with or without motion)
  useEffect(() => {
    const els = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-chapter]') ?? []);
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement)); }), { rootMargin: '-45% 0px -50% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const cur = journey[active];
  return (
    <section id="journey" ref={root} aria-labelledby="journey-title" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHead id="journey-title" eyebrow="01 · My journey" title="The journey" accent="so far..." intro="From the first day of college to a full-stack role at a SaaS company: late nights, first pull requests, and products built end to end." />

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          {/* sticky avatar stage, desktop */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-paper p-6 shadow-soft">
                <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sage" />
                <div aria-hidden className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-clay/50" />
                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-sm text-muted">{String(active + 1).padStart(2, '0')} / {String(journey.length).padStart(2, '0')}</span>
                  <span className="chip">{cur.when}</span>
                </div>
                <Avatar pose={cur.pose} className="relative mx-auto mt-2 w-[85%]" title={`Illustration of Hitesh: ${cur.title}`} />
                <p className="relative mt-2 text-center font-display text-lg font-medium" aria-live="polite">{cur.title}</p>
              </div>
            </div>
          </div>

          <ol data-chapters className="relative lg:col-span-7">
            <span aria-hidden className="absolute bottom-4 left-[15px] top-4 w-px bg-line" />
            <span aria-hidden data-progress className="absolute bottom-4 left-[15px] top-4 w-px bg-ink" />
            {journey.map((c, i) => (
              <li key={c.id} data-chapter className="relative pb-14 pl-12 last:pb-0 lg:min-h-[42vh]">
                <span aria-hidden className={`absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border font-mono text-xs transition-colors duration-500 ${i <= active ? 'border-ink bg-ink text-bg' : 'border-ink/30 bg-bg text-ink'}`}>{i + 1}</span>
                <p className="eyebrow">{c.when}</p>
                <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">{c.title}</h3>
                <div className="mt-4 flex items-start gap-5">
                  <Avatar pose={c.pose} float={false} className="w-24 shrink-0 rounded-3xl bg-sage lg:hidden" title={`Illustration of Hitesh: ${c.title}`} />
                  <p className="max-w-xl text-[17px] leading-relaxed text-muted">{c.body}</p>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Highlights">
                  {c.tags.map((t) => <li key={t} className="chip">{t}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
