import { Metadata } from 'next';
import WritingPageClient from './client';
import { getWritings } from '@/lib/writing';

export const metadata: Metadata = {
  title: 'Writing — Jorge Casas',
  description: 'Research papers, technical reports, and essays on astrophysics, propulsion, and engineering.',
};

export default async function WritingPage() {
  const writings = await getWritings();
  return <WritingPageClient writings={writings} />;
}
