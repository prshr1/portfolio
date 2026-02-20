import { getFeaturedProjectCards } from '@/lib/projects';
import HomeClient from './HomeClient';

export default async function Home() {
  const featuredProjects = await getFeaturedProjectCards(3);
  return <HomeClient featuredProjects={featuredProjects} />;
}
