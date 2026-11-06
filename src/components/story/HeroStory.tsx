'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Download, MessageCircle, Sparkles, Workflow, Layers } from 'lucide-react';
import Avatar from '../avatar/Avatar';
import { gsap, SplitWords, useGsap } from '../ui/motion';
import { heroStory, profile } from '@/data/content';

const INTEREST_ICONS = [Layers, Workflow, Sparkles];
const LEAD_COLOR = ['text-[#2D3A2E] dark:text-[#D9E4DC]', 'text-[#B4462F] dark:text-[#E8C6B8]', 'text-[#2D3A2E] dark:text-[#D9E4DC]'];

export default function HeroStory() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = stage.current?.getBoundingClientRect(); if (!r) return;
        const dx = (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2), dy = (e.clientY - (r.top + r.height * 0.35)) / (innerHeight / 2);
        setLook({ x: Math.max(-1, Math.min(1, dx)) * 4, y: Math.max(-1, Math.min(1, dy)) * 3 });
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
      .from('[data-card]', { y: 30, opacity: 0, rotate: -4, duration: 0.9 }, 0.7)
      .from('[data-chip]', { scale: 0.6, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'back.out(2)' }, 0.8);
    gsap.to('[data-stage]', { yPercent: -6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('[data-card]', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
  });

  return (
    <section id="top" ref={root} className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="drift absolute -right-48 -top-48 h-[38rem] w-[38rem] rounded-full bg-sage/80 blur-3xl" style={{ ['--t' as string]: '16s' }} />
        <div className="drift absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-clay/40 blur-3xl" style={{ ['--t' as string]: '20s' }} />
      </div>

      <div className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div data-hi className="flex items-baseline gap-3">
            <span className="font-serif text-2xl italic text-muted">{heroStory.kicker}</span>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{profile.name}<span className="text-[#B4462F]">.</span></h1>
          </div>
          <p className="mt-6 font-display text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl xl:text-[4.6rem]" aria-label={heroStory.motto.map((m) => `${m.lead} ${m.rest}`).join(' ')}>
            {heroStory.motto.map((m, i) => (
              <span key={m.lead} data-line className="block" aria-hidden>
                <SplitWords text={m.lead} className={`font-serif font-normal italic tracking-normal ${LEAD_COLOR[i]}`} />{' '}
                <SplitWords text={m.rest} />
              </span>
            ))}
          </p>
          <p data-fade className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{heroStory.intro}</p>
          <ul data-fade className="mt-6 flex flex-wrap gap-2" aria-label="Engineering interests">
            {heroStory.interests.map((t, i) => { const I = INTEREST_ICONS[i]; return (
              <li key={t} className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/80 px-3.5 py-2 text-sm"><I size={15} className="text-[#B4462F] dark:text-[#E8C6B8]" />{t}</li>
            ); })}
          </ul>
          <div data-fade className="mt-9 flex flex-wrap gap-3">
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#work" className="btn-primary">Read the case studies <ArrowRight size={17} /></motion.a>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#ask" className="btn-ghost"><MessageCircle size={17} />Ask Hitesh</motion.a>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={profile.resume} download className="btn-ghost"><Download size={17} />Resume</motion.a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[30rem] lg:col-span-5">
          <div ref={stage} data-stage className="relative">
            <div className="relative aspect-[9/10] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] border border-line bg-[#D9E4DC] shadow-lift dark:bg-[#B7C6BA]">
              <div aria-hidden className="absolute left-1/2 top-[11%] h-[60%] w-[60%] -translate-x-1/2 rounded-full bg-[#F1EBDD]/70" />
              <Avatar pose="laptop" expression="smile" look={look} className="absolute inset-x-0 bottom-0 mx-auto w-[96%]" title="Illustration of Hitesh smiling behind his laptop" />
            </div>
            {['React', 'Node.js', 'Automations'].map((c, i) => (
              <span key={c} data-chip aria-hidden className={`drift absolute rounded-2xl border border-line bg-paper px-3.5 py-2 font-display text-sm font-medium shadow-soft ${['-left-6 top-[18%]', '-right-4 top-[8%]', '-right-6 top-[46%]'][i]}`} style={{ ['--t' as string]: `${6 + i * 1.5}s` }}>{c}</span>
            ))}
            <a data-card href={heroStory.now.href} target="_blank" rel="noreferrer" className="group absolute -bottom-10 -left-4 w-60 rounded-3xl border border-line bg-paper p-3 shadow-lift transition-transform duration-500 hover:-rotate-1 sm:-left-12">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bg"><Image src={heroStory.now.image} alt="Screenshot of Cairn" fill sizes="240px" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" /></div>
              <div className="flex items-start justify-between gap-2 px-1 pb-1 pt-3">
                <span><span className="eyebrow !text-[10px]">{heroStory.now.label}</span><span className="block font-display font-semibold">{heroStory.now.name}</span><span className="block text-xs text-muted">{heroStory.now.note}</span></span>
                <ArrowUpRight size={16} className="mt-1 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>

      <dl data-fade className="wrap mt-24 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
        {heroStory.facts.map((f) => (
          <div key={f.k}><dt className="eyebrow">{f.k}</dt><dd className="mt-2 font-display text-lg">{f.v}</dd></div>
        ))}
      </dl>
    </section>
  );
}
