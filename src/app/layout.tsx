import type { Metadata } from 'next';
import './globals.css';
import { FitnessProvider } from '@/lib/context/FitnessContext';

export const metadata: Metadata = {
  title: 'FitPlus - AI-Powered Personal Fitness Companion',
  description:
    'FitPlus crafts bespoke workout routines for Gym, Calisthenics, and Hybrid athletes. Track workouts, nutrition, recovery, and elevate your performance with AI guidance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#080C14] text-slate-100 antialiased selection:bg-[#D5FF3E] selection:text-black">
        <FitnessProvider>{children}</FitnessProvider>
      </body>
    </html>
  );
}
