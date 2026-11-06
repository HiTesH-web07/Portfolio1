import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import HeroStory from '@/components/story/HeroStory';
import JourneyStory from '@/components/story/JourneyStory';

export const metadata: Metadata = { title: 'Design preview', robots: { index: false, follow: false } };

export default function Preview() {
  return (<><Nav /><main id="main"><HeroStory /><JourneyStory /></main></>);
}
