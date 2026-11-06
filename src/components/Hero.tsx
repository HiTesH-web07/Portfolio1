'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react';
import Avatar from './avatar/Avatar';
import { gsap, SplitWords, useGsap } from './ui/motion';
import { profile } from '@/data/content';

const FLOATERS = [
  { label: '{ }', cls: 'left-[2%] top-[14%]', t: '6s', mono: true },
  { label: 'OAuth 2.0', cls: 'right-[-2%] top-[10%]', t: '7.5s' },
  { label: 'Next.js', cls: 'left-[-6%] top-[52%]', t: '8s' },
  { label: '200 OK', cls: 'right-[-4%] top-[46%]', t: '6.5s', mono: true, good: true },
  { label: 'Webhooks', cls: 'left-[8%] bottom-[8%]', t: '9s' },
  { label: 'Node.js', cls: 'right-[6%] bottom-[14%]', t: '7s' },
];

const STRIP = ['Next.js', 'Node.js', 'React', 'TypeScript', 'OAuth 2.0', 'Webhooks', 'REST APIs', 'PostgreSQL', 'Prisma', 'Gemini API', 'Redux Toolkit', 'Tailwind CSS'];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });

  // Curious eyes: they follow the pointer (desktop only, and only when motion is allowed)
  useEffect(() => {
    if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = stage.current?.getBoundingClientRect();
        if (!r) return;
        const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
        const dy = (e.clientY - (r.top + r.height * 0.38)) / (window.innerHeight / 2);
        setLook({ x: Math.max(-1, Math.min(1, dx)) * 4, y: Math.max(-1, Math.min(1, dy)) * 3.5 });
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, []);

  useGsap(root, () => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('[data-hero-eyebrow]', { y: 14, opacity: 0, duration: 0.7 })
      .from('[data-hero-title] [data-word]', { yPercent: 110, duration: 1, stagger: 0.06 }, '-=0.45')
      .from('[data-hero-tag] [data-word]', { yPercent: 110, duration: 0.9, stagger: 0.035 }, '-=0.75')
      .from('[data-hero-fade]', { y: 18, opacity: 0, duration: 0.8, stagger: 0.07 }, '-=0.6')
      .from('[data-hero-stage]', { y: 40, opacity: 0, scale: 0.96, duration: 1.1 }, 0.15)
      .from('[data-floater]', { scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'back.out(2)' }, 0.6);
    // gentle parallax as the hero scrolls away
    gsap.to('[data-hero-stage]', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('[data-blob]', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
  });

  return (
    <section id="top" ref={root} className="relative overflow-hidden pb-10 pt-28 sm:pt-32">
      {/* decorative background, transform-only motion */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div data-blob className="drift absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-sage/80 blur-3xl" style={{ ['--t' as string]: '14s', ['--dx' as string]: '-30px', ['--dy' as string]: '20px' }} />
        <div data-blob className="drift absolute -left-40 top-1/2 h-[26rem] w-[26rem] rounded-full bg-clay/50 blur-3xl" style={{ ['--t' as string]: '18s', ['--dx' as string]: '40px', ['--dy' as string]: '-20px' }} />
      </div>

      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p data-hero-eyebrow className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/70 py-1.5 pl-2 pr-3.5 text-sm">
            <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" /></span>
            {profile.availability}
          </p>
          <h1 data-hero-title className="mt-6 font-display text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-7xl xl:text-[5.4rem]">
            <SplitWords text={profile.hero.hello} />
          </h1>
          <p data-hero-tag className="mt-4 font-serif text-[2rem] italic leading-[1.1] text-forest dark:text-sage sm:text-5xl" style={{ color: 'rgb(var(--accent))' }}>
            <SplitWords text={profile.hero.tagline.join(' ')} />
          </p>
          <p data-hero-fade className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{profile.hero.support}</p>
          <div data-hero-fade className="mt-8 flex flex-wrap gap-3">
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#work" className="btn-primary">Explore my work <ArrowDown size={17} /></motion.a>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={profile.resume} download className="btn-ghost"><Download size={17} />Download resume</motion.a>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#contact" className="btn-ghost">Let&apos;s connect <ArrowUpRight size={17} /></motion.a>
          </div>
          <dl data-hero-fade className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
            <div className="flex items-center gap-2"><dt className="sr-only">Location</dt><MapPin size={16} /><dd>{profile.location}</dd></div>
            <div className="flex items-center gap-2"><dt className="sr-only">Current role</dt><dd><span className="text-ink">{profile.title.split(' at ')[0]}</span> at viaSocket</dd></div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[30rem] lg:col-span-5">
          <div ref={stage} data-hero-stage className="relative">
            <div className="relative aspect-[9/10] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] border border-line bg-[#D9E4DC] shadow-lift dark:bg-[#B7C6BA]">
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest/15 to-transparent" />
              <div aria-hidden className="absolute left-1/2 top-[12%] h-[62%] w-[62%] -translate-x-1/2 rounded-full bg-[#F1EBDD]/60" />
              <Avatar pose="laptop" expression="smile" look={look} className="absolute inset-x-0 bottom-0 mx-auto w-[96%]" title="Illustration of Hitesh smiling behind his laptop" />
            </div>
            {FLOATERS.map((f) => (
              <span key={f.label} data-floater aria-hidden className={`drift absolute ${f.cls} rounded-2xl border border-line bg-paper px-3.5 py-2 text-sm font-medium shadow-soft ${f.mono ? 'font-mono' : 'font-display'} ${f.good ? 'text-emerald-700 dark:text-emerald-400' : ''}`} style={{ ['--t' as string]: f.t }}>
                {f.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* tech strip */}
      <div data-hero-fade className="relative mt-16 overflow-hidden border-y border-line py-4" aria-label="Technologies I use">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-10 motion-reduce:animate-none">
          {[...STRIP, ...STRIP].map((s, i) => (
            <span key={i} aria-hidden={i >= STRIP.length} className="flex items-center gap-10 font-display text-lg text-muted">{s}<span className="text-[#B4462F] dark:text-[#E8C6B8]">✦</span></span>
          ))}
        </div>
      </div>
    </section>
  );
}
