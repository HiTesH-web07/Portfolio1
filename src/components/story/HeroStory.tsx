'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MessageCircle, Sparkles, Workflow, Layers } from 'lucide-react';
import Avatar from '../avatar/Avatar';
import { gsap, SplitWords, useGsap } from '../ui/motion';
import { heroStory, profile } from '@/data/content';
import { useChat } from '../chat/ChatContext';

const INTEREST_ICONS = [Layers, Workflow, Sparkles];
const LEAD_COLOR = ['text-[#2D3A2E] dark:text-[#D9E4DC]', 'text-[#B4462F] dark:text-[#E8C6B8]', 'text-[#2D3A2E] dark:text-[#D9E4DC]'];

export default function HeroStory() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const { openPanel } = useChat();

  useEffect(() => {
    if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = stage.current?.getBoundingClientRect(); if (!r) return;
        const dx = (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2), dy = (e.clientY - (r.top + r.height * 0.35)) / (innerHeight / 2);
        setLook({ x: Math.round(Math.max(-1, Math.min(1, dx)) * 25) / 10, y: Math.round(Math.max(-1, Math.min(1, dy)) * 18) / 10 });
      });
    };
    addEventListener('pointermove', onMove, { passive: true });
    return () => { removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, []);

  useGsap(root, () => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('[data-hi]', { y: 16, opacity: 0, duration: 0.7 })
      .from('[data-line] [data-word]', { yPercent: 110, duration: 1, stagger: 0.05 }, '-=0.4')
      .from('[data-fade]', { y: 18, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.6')
      .from('[data-stage]', { y: 40, opacity: 0, duration: 1.1 }, 0.1)
      .from('[data-chip]', { scale: 0.6, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'back.out(2)' }, 0.8);
    gsap.to('[data-stage]', { yPercent: -6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
  });

  return (
    <section id="top" ref={root} className="relative overflow-x-clip pb-4 pt-28 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="drift absolute -right-48 -top-48 h-[38rem] w-[38rem] rounded-full bg-sage/80 blur-3xl" style={{ ['--t' as string]: '16s' }} />
        <div className="drift absolute -left-40 bottom-[20%] h-[22rem] w-[22rem] rounded-full bg-clay/30 blur-3xl" style={{ ['--t' as string]: '20s' }} />
      </div>

      <div className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div data-hi className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B4462F] opacity-40 motion-reduce:animate-none" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#B4462F]" /></span>
            <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{profile.name}<span className="font-normal text-muted"> · </span><span className="font-medium">{heroStory.role}</span></h1>
          </div>
          <p className="mt-7 font-serif text-[3.1rem] font-normal leading-[0.98] tracking-[-0.015em] sm:text-7xl xl:text-[5.6rem]" aria-label={heroStory.motto.map((m) => `${m.lead} ${m.rest}`).join(' ')}>
            {heroStory.motto.map((m, i) => (
              <span key={m.lead} data-line className="block" aria-hidden>
                <SplitWords text={m.lead} className={`italic ${LEAD_COLOR[i]}`} />{' '}
                <SplitWords text={m.rest} />
              </span>
            ))}
          </p>
          <p data-fade className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{heroStory.intro}</p>
          <div data-fade className="mt-8 flex flex-wrap gap-3">
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#work" className="btn-primary">Read the case studies <ArrowRight size={17} /></motion.a>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={openPanel} aria-haspopup="dialog" className="btn-ghost"><MessageCircle size={17} />Ask Hitesh</motion.button>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={profile.resume} download className="btn-ghost"><Download size={17} />Resume</motion.a>
          </div>
          <ul data-fade className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted" aria-label="Engineering interests">
            {heroStory.interests.map((t, i) => { const I = INTEREST_ICONS[i]; return (
              <li key={t} className="inline-flex items-center gap-2"><I size={15} className="text-[#B4462F] dark:text-[#E8C6B8]" />{t}</li>
            ); })}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[30rem] lg:col-span-5">
          <div ref={stage} data-stage className="relative">
            <div className="relative aspect-[9/10] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] border border-line bg-[#D9E4DC] shadow-lift dark:bg-[#B7C6BA]">
              <div aria-hidden className="absolute left-1/2 top-[11%] h-[60%] w-[60%] -translate-x-1/2 rounded-full bg-[#F1EBDD]/70" />
              <Avatar pose="laptop" expression="smile" look={look} className="absolute inset-x-0 bottom-0 mx-auto w-[96%]" title="Illustration of Hitesh smiling behind his laptop" />
            </div>
            {['React', 'Node.js', 'Automations'].map((c, i) => (
              <span key={c} data-chip aria-hidden className={`drift absolute rounded-2xl border border-line bg-paper px-3.5 py-2 font-display text-sm font-medium shadow-soft ${['-left-6 top-[20%]', '-right-4 top-[8%]', '-left-4 bottom-[14%]'][i]}`} style={{ ['--t' as string]: `${6 + i * 1.5}s` }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      <dl data-fade className="wrap mt-14 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
        {heroStory.facts.map((f) => (
          <div key={f.k}><dt className="eyebrow">{f.k}</dt><dd className="mt-2 font-display text-lg">{f.v}</dd></div>
        ))}
      </dl>
      <a href="#journey" data-fade className="group mx-auto mt-10 flex w-max flex-col items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
        <span className="font-serif text-lg italic">Read my story</span>
        <span aria-hidden className="relative block h-12 w-px overflow-hidden bg-line"><span className="thread-dot absolute left-0 top-0 h-6 w-px bg-ink" /></span>
      </a>
    </section>
  );
}
