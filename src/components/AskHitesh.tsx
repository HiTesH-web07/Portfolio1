'use client';
import { useRef } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import ChatBox from './chat/ChatBox';
import Avatar from './avatar/Avatar';
import { SectionHead, revealSection, useGsap } from './ui/motion';
import { profile } from '@/data/content';

export default function AskHitesh() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, () => revealSection(root.current));

  return (
    <section id="ask" ref={root} aria-labelledby="ask-title" className="relative overflow-hidden bg-[#2D3A2E] py-24 text-[#F1EBDD] sm:py-32">
      <div aria-hidden className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#3E5040] blur-2xl" />
      <div className="wrap relative grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <SectionHead id="ask-title" light eyebrow="05 · Ask Hitesh" title="Curious about my work?" accent="Just ask." intro="Meet Ask Hitesh, your AI-powered guide to my experience, projects and technical journey." />
          <ul className="reveal mt-8 grid gap-3 text-[15px] text-[#D9E4DC]">
            <li className="flex gap-3"><Sparkles size={18} className="mt-0.5 shrink-0 text-[#E8C6B8]" />An AI assistant, not me in person. It answers from my resume and the projects on this page.</li>
            <li className="flex gap-3"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#E8C6B8]" />It will not invent experience or numbers. If it does not know, it says so.</li>
          </ul>
          <div className="reveal mt-10 hidden w-60 overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-[#D9E4DC] pt-6 lg:block"><Avatar pose="wave" title="Illustration of Hitesh waving hello" /></div>
        </div>

        <div className="reveal min-w-0 lg:col-span-7">
          <ChatBox className="h-[38rem] max-h-[80vh] rounded-[2rem] shadow-lift" />
          <p className="mt-3 text-center text-xs text-[#D9E4DC]">AI answers can be imperfect. For anything important, email {profile.email}.</p>
        </div>
      </div>
    </section>
  );
}
