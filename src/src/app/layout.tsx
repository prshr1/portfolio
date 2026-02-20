import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jorge Casas — Astrophysicist & Engineer',
  description: 'Portfolio showcasing research in astrophysics, exoplanets, trajectory optimization, and engineering projects.',
  keywords: ['astrophysics', 'engineering', 'portfolio', 'research', 'exoplanets'],
  authors: [{ name: 'Jorge Casas' }],
  openGraph: {
    title: 'Jorge Casas — Astrophysicist & Engineer',
    description: 'Portfolio of computational astrophysics and engineering projects',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
