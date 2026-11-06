import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import { ChatProvider } from '@/components/chat/ChatContext';
import ChatPanel from '@/components/chat/ChatPanel';
import ExperienceStory from '@/components/story/ExperienceStory';
import ProjectsStory from '@/components/story/ProjectsStory';

export const metadata: Metadata = { title: 'Design preview: Experience and Projects', robots: { index: false, follow: false } };

// Preview only: the proposed Experience and Projects sections. Not linked from the site.
export default function Preview() {
  return (<ChatProvider><Nav /><main id="main" className="pt-16"><ExperienceStory /><ProjectsStory /></main><ChatPanel /></ChatProvider>);
}
