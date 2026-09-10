'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/portfolio/Navbar';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Skills } from '@/components/portfolio/Skills';
import { Projects } from '@/components/portfolio/Projects';
import { Journey } from '@/components/portfolio/Journey';
import { Education } from '@/components/portfolio/Education';
import { CurrentlyExploring } from '@/components/portfolio/CurrentlyExploring';
import { GithubSection } from '@/components/portfolio/GithubSection';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';
import { CommandMenu } from '@/components/portfolio/CommandMenu';
import { BackToTop } from '@/components/portfolio/BackToTop';
import { ResumeModal } from '@/components/portfolio/ResumeModal';

export default function PortfolioPage() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleOpenCommand = () => setIsCommandOpen(true);
    window.addEventListener('open-command-palette', handleOpenCommand);
    return () => window.removeEventListener('open-command-palette', handleOpenCommand);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0F172A] selection:bg-blue-600 selection:text-white flex flex-col font-sans">
      <Navbar
        onOpenCommand={() => setIsCommandOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <main className="flex-1 w-full overflow-x-hidden">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Education />
        <CurrentlyExploring />
        <GithubSection />
        <Contact />
      </main>

      <Footer />

      <CommandMenu isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <BackToTop />
    </div>
  );
}

