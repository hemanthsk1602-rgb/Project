'use client';

import React from 'react';
import { 
  Folder, 
  FileCode, 
  FileText, 
  FileJson, 
  ChevronRight, 
  ChevronDown,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { CodeLanguage, Problem } from '@/lib/types';

interface FileExplorerProps {
  problem: Problem;
  language: CodeLanguage;
  activeFile: string;
  onSelectFile: (file: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function FileExplorer({
  problem,
  language,
  activeFile,
  onSelectFile,
  isOpen,
  onToggle,
}: FileExplorerProps) {
  const fileExtMap: Record<CodeLanguage, string> = {
    cpp: 'cpp',
    python: 'py',
    java: 'java',
    javascript: 'js',
  };

  const files = [
    { name: `solution.${fileExtMap[language]}`, type: 'code', icon: FileCode },
    { name: 'testcases.json', type: 'json', icon: FileJson },
    { name: 'scratchpad.md', type: 'notes', icon: FileText },
  ];

  if (!isOpen) {
    return (
      <div className="w-10 bg-[#060910] border-r border-white/[0.08] flex flex-col items-center py-3 gap-4 shrink-0 select-none">
        <button
          onClick={onToggle}
          className="p-2 rounded text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Open Explorer (Ctrl+B)"
        >
          <Folder className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-52 bg-[#070B13] border-r border-white/[0.08] flex flex-col shrink-0 select-none text-xs font-mono">
      {/* Explorer Header */}
      <div className="h-9 px-3 border-b border-white/[0.06] flex items-center justify-between text-zinc-400">
        <span className="font-semibold text-[11px] uppercase tracking-wider text-zinc-400 font-sans">
          Explorer
        </span>
        <button onClick={onToggle} className="text-zinc-500 hover:text-zinc-300">
          ×
        </button>
      </div>

      {/* Workspace Tree */}
      <div className="p-2 space-y-1">
        <div className="flex items-center gap-1.5 px-2 py-1 text-zinc-400 font-semibold text-[11px]">
          <ChevronDown className="w-3.5 h-3.5" />
          <Folder className="w-3.5 h-3.5 text-brand-400" />
          <span className="truncate">{problem.slug}</span>
        </div>

        <div className="pl-4 space-y-0.5">
          {files.map((file) => {
            const isSelected = activeFile === file.name;
            return (
              <button
                key={file.name}
                onClick={() => onSelectFile(file.name)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded transition-colors text-left ${
                  isSelected
                    ? 'bg-white/[0.08] text-white font-medium'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                }`}
              >
                <file.icon
                  className={`w-3.5 h-3.5 shrink-0 ${
                    file.type === 'code'
                      ? 'text-brand-400'
                      : file.type === 'json'
                      ? 'text-amber-400'
                      : 'text-zinc-400'
                  }`}
                />
                <span className="truncate">{file.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

