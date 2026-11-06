import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import { ChatProvider } from '@/components/chat/ChatContext';
import ChatPanel from '@/components/chat/ChatPanel';
import HeroA from '@/components/v3/HeroA';
import JourneyCompact from '@/components/v3/JourneyCompact';
import { v3nav } from '@/data/content';

export const metadata: Metadata = { title: 'Preview: hero option A', robots: { index: false, follow: false } };

export default function Preview() {
  return (<ChatProvider><Nav items={v3nav} /><main id="main"><HeroA /><JourneyCompact /></main><ChatPanel /></ChatProvider>);
}
