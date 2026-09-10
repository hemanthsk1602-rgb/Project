'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/shell/Sidebar';
import { Header } from '@/components/shell/Header';
import { MobileNav } from '@/components/shell/MobileNav';
import { CommandPalette } from '@/components/shell/CommandPalette';
import { DemoBanner } from '@/components/shell/DemoBanner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-nexus-light-bg dark:bg-nexus-dark-bg text-nexus-light-text dark:text-nexus-dark-text selection:bg-violet-600 selection:text-white transition-colors duration-200">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Development / Demo Mode Alert Banner */}
        <DemoBanner />

        {/* Sticky Header */}
        <Header onOpenCommand={() => setIsCommandOpen(true)} />

        {/* Viewport Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-nexus-grid">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>

        {/* Mobile Navigation */}
        <MobileNav />

        {/* Global Command Palette (⌘K) */}
        <CommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
        />
      </div>
    </div>
  );
}
