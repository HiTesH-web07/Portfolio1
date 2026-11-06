import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import { ChatProvider } from '@/components/chat/ChatContext';
import ChatPanel from '@/components/chat/ChatPanel';
import HeroStory from '@/components/story/HeroStory';
import JourneyCompact from '@/components/v3/JourneyCompact';
import ExperienceCompact from '@/components/v3/ExperienceCompact';
import SelectedWork from '@/components/v3/SelectedWork';
import BeyondBuild from '@/components/v3/BeyondBuild';
import AskHitesh from '@/components/AskHitesh';
import Contact from '@/components/Contact';
import { v3nav } from '@/data/content';

export const metadata: Metadata = { title: 'Preview: concise portfolio', robots: { index: false, follow: false } };

// Preview of the consolidated 7-section site. Not linked from the live page.
export default function Preview() {
  return (
    <ChatProvider>
      <Nav items={v3nav} />
      <main id="main">
        <HeroStory compact />
        <JourneyCompact />
        <ExperienceCompact />
        <SelectedWork />
        <BeyondBuild />
        <AskHitesh num="05" />
        <Contact num="06" />
      </main>
      <ChatPanel />
    </ChatProvider>
  );
}
