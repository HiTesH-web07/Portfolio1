'use client';
import { useRef } from 'react';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import Avatar from './avatar/Avatar';
import { gsap, SectionHead, revealSection, useGsap } from './ui/motion';
import { experience, type Stat } from '@/data/content';

const fmt = (n: number) => n.toLocaleString('en-US');

function Counter({ s, light }: { s: Stat; light?: boolean }) {
  return (
    <div className="reveal">
      <p className={`font-display text-4xl font-semibold tracking-tight sm:text-5xl ${light ? 'text-[#F1EBDD]' : ''}`}>
        <span data-count={s.value}>{fmt(s.value)}</span>{s.suffix}
      </p>
      <p className={`mt-2 text-sm leading-snug ${light ? 'text-[#D9E4DC]' : 'text-muted'}`}>{s.label}</p>
    </div>
  );
}

function KuliesTablet() {
  // An illustration of the flows worked on (listing, cart, wishlist, live price). Not a screenshot.
  const items = [
    { n: 'Linen shirt', p: 1299, h: 'bg-clay' },
    { n: 'Canvas tote', p: 649, h: 'bg-sage' },
    { n: 'Desk lamp', p: 2150, h: 'bg-[#E9DFC8]' },
    { n: 'Notebook set', p: 399, h: 'bg-sage' },
  ];
  return (
    <figure className="reveal">
      <div className="rounded-[2rem] bg-[#24231F] p-3 shadow-lift">
        <div className="overflow-hidden rounded-[1.4rem] bg-[#FBF8F1] text-[#24231F]">
          <div className="flex items-center justify-between border-b border-[#E6DFCF] px-4 py-3">
            <span className="font-display text-lg font-semibold">Kulies</span>
            <span className="flex items-center gap-3 text-[#5C584E]"><Heart size={16} /><span className="relative"><ShoppingBag size={16} /><span data-cart className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-[#2D3A2E] text-[10px] text-white">2</span></span></span>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4">
            {items.map((it, i) => (
              <div key={it.n} data-product className="rounded-xl border border-[#E6DFCF] bg-white p-2">
                <div className={`relative aspect-[4/3] rounded-lg ${it.h}`}>{i === 1 && <Heart size={14} className="absolute right-2 top-2 fill-[#C2553D] text-[#C2553D]" />}</div>
                <p className="mt-2 text-xs font-medium">{it.n}</p>
                <p className="text-xs text-[#5C584E]">₹<span data-price={it.p}>{fmt(it.p)}</span></p>
              </div>
            ))}
          </div>
          <div className="mx-4 mb-4 flex items-center justify-between rounded-xl bg-[#2D3A2E] px-3 py-2 text-xs text-[#F1EBDD]">
            <span className="flex items-center gap-1.5"><Check size={14} />Prices update in real time</span><span>Cart · 2</span>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">Illustration of the Kulies flows I worked on, not a product screenshot.</figcaption>
    </figure>
  );
}

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, () => {
    revealSection(root.current);
    gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count);
      const o = { v: 0 };
      el.textContent = '0';
      gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: () => { el.textContent = fmt(Math.round(o.v)); } });
    });
    gsap.from('[data-product]', { y: 24, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '[data-product]', start: 'top 85%', once: true } });
    gsap.fromTo('[data-cart]', { scale: 0.4 }, { scale: 1, ease: 'back.out(3)', duration: 0.5, scrollTrigger: { trigger: '[data-product]', start: 'top 70%', once: true } });
  });
  const [via, td] = experience;

  return (
    <section id="experience" ref={root} aria-labelledby="exp-title" className="py-20 sm:py-24">
      <div className="wrap">
        <SectionHead id="exp-title" eyebrow="02 · Experience" title="Where I've been" accent="building." />

        {/* viaSocket */}
        <article className="reveal relative mt-14 overflow-hidden rounded-[2.5rem] bg-[#2D3A2E] p-6 text-[#F1EBDD] shadow-lift sm:p-10 lg:p-14">
          <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#3E5040]" />
          <div className="relative grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-display text-5xl font-semibold tracking-tight sm:text-7xl">{via.product}</p>
              <h3 className="mt-4 text-xl font-medium sm:text-2xl">{via.role} · <span className="text-[#D9E4DC]">{via.company}</span></h3>
              <p className="mt-1 text-sm text-[#D9E4DC]">{via.when} · {via.where}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#E8E2D2]">{via.summary}</p>
            </div>
            <div className="hidden lg:col-span-4 lg:block">
              <div className="mx-auto w-64 overflow-hidden rounded-[2rem] bg-[#D9E4DC] px-2 pt-4"><Avatar pose="think" title="Illustration of Hitesh working through an integration" /></div>
            </div>
          </div>
          <div className="relative mt-10 grid gap-8 border-t border-[#F1EBDD]/15 pt-8 sm:grid-cols-3">
            {via.stats.map((s) => <Counter key={s.label} s={s} light />)}
          </div>
          <ul className="relative mt-10 grid gap-x-10 gap-y-4 md:grid-cols-2">
            {via.points.map((p) => (
              <li key={p} className="reveal flex gap-3 text-[15px] leading-relaxed text-[#E8E2D2]"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8C6B8]" />{p}</li>
            ))}
          </ul>
          <ul className="relative mt-8 flex flex-wrap gap-2" aria-label="Stack">
            {via.stack.map((t) => <li key={t} className="rounded-full border border-[#F1EBDD]/20 px-3 py-1 text-sm">{t}</li>)}
          </ul>
        </article>

        {/* Think Debug + Kulies */}
        <article className="reveal relative mt-8 overflow-hidden rounded-[2.5rem] border border-line bg-paper p-6 shadow-soft sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">Think<span className="text-[#C2553D]">.</span>Debug</p>
              <h3 className="mt-4 text-xl font-medium sm:text-2xl">{td.role} · <span className="text-muted">{td.product}</span></h3>
              <p className="mt-1 text-sm text-muted">{td.when} · {td.where}</p>
              <p className="mt-6 text-lg leading-relaxed text-muted">{td.summary}</p>
              <div className="mt-8 grid grid-cols-2 gap-8 border-t border-line pt-8">
                {td.stats.map((s) => <Counter key={s.label} s={s} />)}
              </div>
            </div>
            <div className="mx-auto w-full max-w-md lg:col-span-5"><KuliesTablet /></div>
          </div>
          <ul className="mt-10 grid gap-x-10 gap-y-3 md:grid-cols-2">
            {td.points.map((p) => (
              <li key={p} className="reveal flex gap-3 text-[15px] leading-relaxed text-muted"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2D3A2E] dark:bg-[#D9E4DC]" />{p}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
