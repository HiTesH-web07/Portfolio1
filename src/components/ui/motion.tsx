'use client';
import { useLayoutEffect, useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

/** Run GSAP code scoped to a ref, only when the visitor allows motion; everything is reverted on unmount. */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: (ctx: { isDesktop: boolean }) => void | (() => void), deps: unknown[] = []) {
  useIso(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, desktop: '(min-width: 1024px)' }, (c) => {
        const { motion, desktop } = c.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        return setup({ isDesktop: desktop });
      });
    }, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Words wrapped for a mask reveal. Text stays real text for screen readers and search. */
export function SplitWords({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="split-word">
          <span data-word>{w}</span>
          {i < text.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

/** Reveal helper: words rise out of their mask, then .reveal children fade up. */
export function revealSection(root: HTMLElement | null) {
  if (!root) return;
  root.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    gsap.from(el.querySelectorAll('[data-word]'), {
      yPercent: 110, duration: 0.9, ease: 'expo.out', stagger: 0.04,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
  ScrollTrigger.batch(root.querySelectorAll('.reveal'), {
    start: 'top 88%', once: true,
    onEnter: (els) => gsap.fromTo(els, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });
  gsap.set(root.querySelectorAll('.reveal'), { opacity: 0 });
}

export function SectionHead({ eyebrow, title, accent, intro, light = false, id }: { eyebrow: string; title: string; accent?: string; intro?: string; light?: boolean; id?: string }) {
  return (
    <header className="max-w-3xl">
      <p className={`eyebrow ${light ? '!text-[#D9E4DC]' : ''}`}>{eyebrow}</p>
      <h2 id={id} data-split className={`h-section mt-4 ${light ? 'text-[#F1EBDD]' : ''}`}>
        <SplitWords text={title} />
        {accent && (<>{' '}<SplitWords text={accent} className="serif text-[1.08em]" /></>)}
      </h2>
      {intro && <p className={`reveal mt-5 max-w-2xl text-lg leading-relaxed ${light ? 'text-[#D9E4DC]' : 'text-muted'}`}>{intro}</p>}
    </header>
  );
}
