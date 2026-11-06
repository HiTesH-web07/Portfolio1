import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import { ChatProvider } from '@/components/chat/ChatContext';
import ChatPanel from '@/components/chat/ChatPanel';
import HeroB from '@/components/v3/HeroB';
import JourneyCompact from '@/components/v3/JourneyCompact';
import { v3nav } from '@/data/content';

export const metadata: Metadata = { title: 'Preview: hero option B', robots: { index: false, follow: false } };

export default function Preview() {
  return (<ChatProvider><Nav items={v3nav} /><main id="main"><HeroB /><JourneyCompact /></main><ChatPanel /></ChatProvider>);
}
