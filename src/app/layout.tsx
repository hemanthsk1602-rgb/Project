import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { FitnessProvider } from '@/lib/context/FitnessContext';
import { Toaster } from 'sonner';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0B0F19',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'NEXUS — AI Student Operating System',
  description:
    'Your life. Your learning. Your future. Connected. A unified AI-powered platform for students integrating Study, Fitness, Finance, Productivity, SkillForge, and Campus Transit.',
  keywords: [
    'NEXUS',
    'AI Student OS',
    'Student Operating System',
    'Academic Planner',
    'Student Fitness',
    'Student Budget',
    'SkillForge',
    'Campus Transit',
  ],
  authors: [{ name: 'NEXUS Team' }],
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-nexus-light-bg dark:bg-nexus-dark-bg text-nexus-light-text dark:text-nexus-dark-text font-sans antialiased selection:bg-violet-600 selection:text-white transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>
            <FitnessProvider>
              {children}
              <Toaster richColors position="top-right" />
            </FitnessProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
