'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MessageCircle, MapPin, LayoutTemplate, Server, Database, Workflow, Sparkles } from 'lucide-react';
import Avatar from '../avatar/Avatar';
import { gsap, SplitWords, useGsap } from '../ui/motion';
import { useChat } from '../chat/ChatContext';
import { heroV4, profile } from '@/data/content';

const ICONS = [LayoutTemplate, Server, Database, Workflow, Sparkles];

// Option B: a wide statement, then the system I build as one strip with the avatar.
export default function HeroB() {
  const root = useRef<HTMLElement>(null);
  const [hover, setHover] = useState<number>(0);
  const { openPanel } = useChat();

  useGsap(root, () => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('[data-id]', { y: 14, opacity: 0, duration: 0.7 })
      .from('h1 [data-word]', { yPercent: 110, duration: 1, stagger: 0.04 }, '-=0.4')
      .from('[data-fade]', { y: 16, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.7')
      .from('[data-strip]', { y: 40, opacity: 0, duration: 1 }, 0.5)
      .from('[data-step]', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.9);
  });

  return (
    <section id="top" ref={root} className="relative overflow-x-clip pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10"><div className="absolute -left-40 -top-32 h-[30rem] w-[30rem] rounded-full bg-clay/30 blur-3xl" /><div className="absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full bg-sage/70 blur-3xl" /></div>
      <div className="wrap">
        <div data-id className="flex flex-wrap items-center gap-3">
          <span className="text-lg font-semibold tracking-tight">{profile.name}</span>
          <span className="rounded-full bg-[#2D3A2E] px-3 py-1 text-sm font-medium text-[#F1EBDD]">{heroV4.role}</span>
          <span className="flex items-center gap-1.5 text-sm text-muted"><MapPin size={14} />{profile.location}</span>
        </div>
        <h1 className="mt-6 max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.045em] sm:text-6xl xl:text-[4.25rem]">
          <span className="sr-only">{profile.name}, {heroV4.role}. </span>
          <SplitWords text="I build products" /> <SplitWords text="and the systems behind them." className="text-[#2D3A2E]/75 dark:text-[#D9E4DC]/80" />
        </h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
          <p data-fade className="max-w-2xl text-lg leading-relaxed text-muted lg:col-span-7">{heroV4.description}</p>
          <div data-fade className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#work" className="btn-primary">See my work <ArrowRight size={17} /></motion.a>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={openPanel} aria-haspopup="dialog" className="btn-ghost"><MessageCircle size={17} />Ask Hitesh</motion.button>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={profile.resume} download className="btn-ghost"><Download size={17} />Resume</motion.a>
          </div>
        </div>

        <div data-strip className="mt-12 grid overflow-hidden rounded-[2rem] bg-[#24231F] text-[#F1EBDD] md:grid-cols-[13rem_1fr]">
          <div className="relative hidden h-full min-h-[15rem] md:block">
            <div className="absolute inset-x-5 bottom-0 top-6 overflow-hidden rounded-t-[999px] bg-[#D9E4DC]"><Avatar pose="laptop" expression="smile" float={false} className="absolute inset-x-0 bottom-0 w-[112%] max-w-none -translate-x-[5%]" title="Illustration of Hitesh at his laptop" /></div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#D9E4DC]">What I build, end to end</p>
              <dl className="flex flex-wrap gap-x-6 gap-y-1">{heroV4.proof.map((x) => <div key={x.l}><dt className="sr-only">{x.l}</dt><dd><span className="font-display text-xl font-semibold">{x.n}</span> <span className="text-xs text-[#D9E4DC]">{x.l}</span></dd></div>)}</dl>
            </div>
            <div className="relative mt-5">
              <div aria-hidden className="absolute left-0 right-0 top-[1.4rem] hidden h-px bg-white/15 md:block"><span className="pipe-dot absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-[#E8C6B8] shadow-[0_0_12px_#E8C6B8]" /></div>
              <ol className="relative grid gap-3 md:grid-cols-5">
                {heroV4.system.map((n, i) => { const I = ICONS[i]; return (
                  <li key={n.k} data-step>
                    <button onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} onClick={() => setHover(i)} aria-pressed={hover === i}
                      className={`group flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-colors md:flex-col md:items-start md:border-0 md:bg-transparent md:p-0 ${hover === i ? 'border-white/30 bg-white/[0.06]' : 'border-white/10'}`}>
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-colors duration-300 ${hover === i ? 'bg-[#E8C6B8] text-[#24231F]' : 'bg-white/10 text-[#F1EBDD]'}`}><I size={18} /></span>
                      <span><span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-[#D9E4DC] md:mt-3">{n.k}</span><span className="block text-sm font-medium">{n.v}</span></span>
                    </button>
                  </li>
                ); })}
              </ol>
            </div>
            <motion.p key={hover} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-5 text-sm text-[#D9E4DC]" aria-live="polite">
              <span className="font-medium text-[#F1EBDD]">{heroV4.system[hover].k}:</span> used in {heroV4.system[hover].where}.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
