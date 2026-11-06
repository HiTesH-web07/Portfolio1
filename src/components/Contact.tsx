'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Check, Download, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import Avatar from './avatar/Avatar';
import { ScrollTrigger, SplitWords, revealSection, useGsap } from './ui/motion';
import { profile } from '@/data/content';
import type { Pose } from '@/data/content';

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [pose, setPose] = useState<Pose>('laptop');
  const [copied, setCopied] = useState(false);

  useGsap(root, () => {
    revealSection(root.current);
    // the closing moment: the laptop closes as the visitor reaches the end
    ScrollTrigger.create({ trigger: '[data-closer]', start: 'top 60%', onEnter: () => setPose('closing'), onLeaveBack: () => setPose('laptop') });
  });

  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };

  const links = [
    { href: `mailto:${profile.email}`, label: 'Email', sub: profile.email, icon: Mail },
    { href: profile.linkedin, label: 'LinkedIn', sub: 'in/hiteshahuja07', icon: Linkedin, ext: true },
    { href: profile.github, label: 'GitHub', sub: 'HiTesHweb07', icon: Github, ext: true },
    { href: profile.resume, label: 'Resume', sub: 'PDF download', icon: Download, dl: true },
  ];

  return (
    <section id="contact" ref={root} aria-labelledby="contact-title" className="relative overflow-hidden bg-[#24231F] pb-10 pt-20 text-[#F1EBDD] sm:pt-24">
      <div aria-hidden className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#2D3A2E] blur-2xl" />
      <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow !text-[#D9E4DC]">08 · Let&apos;s connect</p>
          <h2 id="contact-title" data-split className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.02] sm:text-7xl">
            <SplitWords text="The journey is still being built." />{' '}
            <SplitWords text="Let's build something together." className="serif text-[#E8C6B8]" />
          </h2>
          <p className="reveal mt-6 max-w-xl text-lg text-[#D9E4DC]">Based in {profile.location}. Have a product to build or a role to talk about? Email is the fastest way to reach me.</p>
          <div className="reveal mt-8 flex flex-wrap items-center gap-3">
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={`mailto:${profile.email}`} className="btn bg-[#F1EBDD] text-[#24231F] hover:bg-white"><Mail size={17} />{profile.email}</motion.a>
            <button onClick={copy} className="btn border border-[#F1EBDD]/25 hover:bg-white/5" aria-live="polite">{copied ? <><Check size={17} />Copied</> : <><Copy size={17} />Copy email</>}</button>
          </div>
        </div>
        <div data-closer className="mx-auto w-full max-w-sm lg:col-span-5">
          <div className="rounded-t-[999px] rounded-b-[2.5rem] bg-[#D9E4DC] px-4 pt-10">
            <Avatar pose={pose} className="w-full" title="Illustration of Hitesh closing his laptop, smiling" />
          </div>
        </div>
      </div>

      <ul className="wrap relative mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((l) => (
          <li key={l.label} className="reveal">
            <motion.a whileHover={{ y: -4 }} href={l.href} {...(l.ext ? { target: '_blank', rel: 'noreferrer' } : {})} {...(l.dl ? { download: true } : {})}
              className="group flex items-center justify-between gap-3 rounded-3xl border border-[#F1EBDD]/15 p-5 transition-colors hover:bg-white/5">
              <span className="flex items-center gap-3"><l.icon size={20} /><span><span className="block font-display text-lg">{l.label}</span><span className="block text-sm text-[#D9E4DC]">{l.sub}</span></span></span>
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              {l.ext && <span className="sr-only">(opens in a new tab)</span>}
            </motion.a>
          </li>
        ))}
      </ul>

      <footer className="wrap relative mt-20 flex flex-col items-start justify-between gap-4 border-t border-[#F1EBDD]/15 pt-6 text-sm text-[#D9E4DC] sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} {profile.name} · <span className="serif text-base">{profile.motto}</span></p>
        <a href="#top" className="inline-flex min-h-[44px] items-center gap-1.5 hover:text-white">Back to top <ArrowUp size={15} /></a>
      </footer>
    </section>
  );
}
