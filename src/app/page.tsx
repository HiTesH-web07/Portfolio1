// Concise 7-section portfolio. Earlier versions: git tags v1-before-story and v2-story-journey.
import Nav from '@/components/Nav';
import { ChatProvider } from '@/components/chat/ChatContext';
import ChatPanel from '@/components/chat/ChatPanel';
import HeroA from '@/components/v3/HeroA';
import JourneyFinal from '@/components/v3/JourneyFinal';
import ExperienceCompact from '@/components/v3/ExperienceCompact';
import WorkBands from '@/components/v3/WorkBands';
import BeyondBuild from '@/components/v3/BeyondBuild';
import SkillsCompact from '@/components/v3/SkillsCompact';
import AskHitesh from '@/components/AskHitesh';
import Contact from '@/components/Contact';
import { v3nav } from '@/data/content';

export default function Page() {
  return (
    <ChatProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">Skip to content</a>
      <Nav items={v3nav} />
      <main id="main">
        <HeroA />
        <JourneyFinal />
        <ExperienceCompact />
        <WorkBands />
        <BeyondBuild />
        <SkillsCompact />
        <AskHitesh num="06" />
        <Contact num="07" />
      </main>
      <ChatPanel />
    </ChatProvider>
  );
}
