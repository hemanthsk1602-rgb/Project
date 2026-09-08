import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FitnessProvider } from '@/lib/context/FitnessContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Hemanth | AI & ML Student & Full-Stack Developer',
  description:
    'Portfolio of Hemanth — an AI & ML student and full-stack developer building modern web applications and AI-powered solutions.',
  keywords: [
    'Hemanth',
    'AI & Machine Learning',
    'Full-Stack Developer',
    'Next.js',
    'TypeScript',
    'Portfolio',
    'FitPlus',
    'Python',
    'React',
  ],
  authors: [{ name: 'Hemanth' }],
  creator: 'Hemanth',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hemanth.dev',
    title: 'Hemanth | AI & ML Student & Full-Stack Developer',
    description:
      'Portfolio of Hemanth — an AI & ML student and full-stack developer building modern web applications and AI-powered solutions.',
    siteName: 'Hemanth Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hemanth | AI & ML Student & Full-Stack Developer',
    description:
      'Portfolio of Hemanth — an AI & ML student and full-stack developer building modern web applications and AI-powered solutions.',
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-[#0F172A] font-sans antialiased selection:bg-blue-600 selection:text-white">
        <FitnessProvider>{children}</FitnessProvider>
      </body>
    </html>
  );
}


