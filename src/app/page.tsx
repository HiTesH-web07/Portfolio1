import Nav from '@/components/Nav';
import { ChatProvider } from '@/components/chat/ChatContext';
import ChatPanel from '@/components/chat/ChatPanel';
// Previous versions kept in components/Hero.tsx and components/Journey.tsx (git tag v1-before-story)
import Hero from '@/components/story/HeroStory';
import Journey from '@/components/story/JourneyStory';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Stories from '@/components/Stories';
import AskHitesh from '@/components/AskHitesh';
import Skills from '@/components/Skills';
import Beyond from '@/components/Beyond';
import Contact from '@/components/Contact';

export default function Page() {
  return (
    <ChatProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Journey />
        <Experience />
        <Projects />
        <Stories />
        <AskHitesh />
        <Skills />
        <Beyond />
        <Contact />
      </main>
      <ChatPanel />
    </ChatProvider>
  );
}
