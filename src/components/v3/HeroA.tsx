'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MessageCircle, MapPin, LayoutTemplate, Server, Database, Workflow, Sparkles } from 'lucide-react';
import Avatar from '../avatar/Avatar';
import { gsap, SplitWords, useGsap } from '../ui/motion';
import { useChat } from '../chat/ChatContext';
import { heroV4, profile } from '@/data/content';

const ICONS = [LayoutTemplate, Server, Database, Workflow, Sparkles];
const Y = [10, 29, 48, 67, 86]; // node centres, % of the stage height

// Option A: the avatar sits at the centre of the system it builds.
export default function HeroA() {
  const root = useRef<HTMLElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const { openPanel } = useChat();

  useGsap(root, () => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('[data-id]', { y: 14, opacity: 0, duration: 0.7 })
      .from('h1 [data-word]', { yPercent: 110, duration: 1, stagger: 0.04 }, '-=0.4')
      .from('[data-fade]', { y: 16, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.7')
      .from('[data-arch]', { y: 30, opacity: 0, duration: 1 }, 0.1)
      .from('[data-link]', { strokeDashoffset: 60, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.6)
      .from('[data-node]', { x: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.7);
  });

  return (
    <section id="top" ref={root} className="relative overflow-x-clip pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-sage/70 blur-3xl" />
      </div>
      <div className="wrap grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div data-id className="flex flex-wrap items-center gap-3">
            <span className="text-lg font-semibold tracking-tight">{profile.name}</span>
            <span className="rounded-full bg-[#2D3A2E] px-3 py-1 text-sm font-medium text-[#F1EBDD]">{heroV4.role}</span>
            <span className="flex items-center gap-1.5 text-sm text-muted"><MapPin size={14} />{profile.location}</span>
          </div>
          <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-[3.4rem] xl:text-[3.9rem]">
            <span className="sr-only">{profile.name}, {heroV4.role}. </span>
            <SplitWords text="I build products" /> <SplitWords text="and the systems behind them." className="text-[#2D3A2E]/75 dark:text-[#D9E4DC]/80" />
          </h1>
          <p data-fade className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{heroV4.description}</p>
          <div data-fade className="mt-8 flex flex-wrap gap-3">
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#work" className="btn-primary">See my work <ArrowRight size={17} /></motion.a>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={openPanel} aria-haspopup="dialog" className="btn-ghost"><MessageCircle size={17} />Ask Hitesh</motion.button>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={profile.resume} download className="btn-ghost"><Download size={17} />Resume</motion.a>
          </div>
          <dl data-fade className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
            {heroV4.proof.map((x) => <div key={x.l}><dt className="sr-only">{x.l}</dt><dd><span className="font-display text-2xl font-semibold tracking-tight">{x.n}</span> <span className="text-sm text-muted">{x.l}</span></dd></div>)}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto aspect-[10/9] w-full max-w-[34rem]">
            {/* connections from the laptop to each layer */}
            <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              {heroV4.system.map((_, i) => (
                <path key={i} id={`ha-l${i}`} data-link d={`M 49 70 C 57 70, 56 ${Y[i]}, 66 ${Y[i]}`} fill="none" vectorEffect="non-scaling-stroke"
                  stroke={hover === i ? '#B4462F' : 'rgb(var(--ink) / .28)'} strokeWidth={hover === i ? 2 : 1.4} strokeDasharray="5 6" className="flow-dash transition-[stroke] duration-300" />
              ))}
            </svg>
            <div data-arch className="absolute bottom-0 left-0 h-[86%] w-[50%] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-line bg-[#D9E4DC] shadow-lift dark:bg-[#B7C6BA]">
              <div aria-hidden className="absolute left-1/2 top-[12%] h-[52%] w-[70%] -translate-x-1/2 rounded-full bg-[#F1EBDD]/70" />
              <Avatar pose="laptop" expression="smile" float={false} className="absolute inset-x-0 bottom-0 mx-auto w-[104%] max-w-none -translate-x-[2%]" title="Illustration of Hitesh at his laptop" />
            </div>
            {heroV4.system.map((n, i) => { const I = ICONS[i]; return (
              <div key={n.k} data-node onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)} tabIndex={0}
                className={`absolute right-0 w-[33%] -translate-y-1/2 cursor-default rounded-2xl border bg-paper px-3 py-2 shadow-soft outline-none transition-[border-color,transform] duration-300 ${hover === i ? 'border-[#B4462F]/60 -translate-x-1' : 'border-line'}`} style={{ top: `${Y[i]}%` }}>
                <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted"><I size={12} className="text-[#B4462F] dark:text-[#E8C6B8]" />{n.k}</span>
                <span className="block text-sm font-medium">{n.v}</span>
                <span className={`block overflow-hidden text-[11px] leading-snug text-muted transition-[max-height,opacity] duration-300 ${hover === i ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}>{n.where}</span>
              </div>
            ); })}
          </div>
        </div>
      </div>
    </section>
  );
}
