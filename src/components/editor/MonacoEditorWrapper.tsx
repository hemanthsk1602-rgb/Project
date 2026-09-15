'use client';

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { OnMount } from '@monaco-editor/react';
import { CodeLanguage } from '@/lib/types';
import { Loader2 } from 'lucide-react';

const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#080C14] text-zinc-500 font-mono text-xs gap-3">
      <Loader2 className="w-5 h-5 animate-spin text-brand-500" />
      <span>Loading CodeArena Editor...</span>
    </div>
  ),
});

interface MonacoEditorWrapperProps {
  value: string;
  language: CodeLanguage;
  onChange: (val: string) => void;
  onFormat: () => void;
  onRun: () => void;
}

export function MonacoEditorWrapper({
  value,
  language,
  onChange,
  onFormat,
  onRun,
}: MonacoEditorWrapperProps) {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const [cursorPos, setCursorPos] = React.useState({ ln: 1, col: 1 });

  const monacoLangMap: Record<CodeLanguage, string> = {
    cpp: 'cpp',
    python: 'python',
    java: 'java',
    javascript: 'javascript',
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Define CodeArena Dark Theme
    monaco.editor.defineTheme('codearena-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'c678dd', fontStyle: 'bold' },
        { token: 'string', foreground: '98c379' },
        { token: 'number', foreground: 'd19a66' },
        { token: 'type', foreground: 'e5c07b' },
        { token: 'delimiter', foreground: 'abb2bf' },
        { token: 'identifier', foreground: 'e06c75' },
        { token: 'function', foreground: '61afef' },
      ],
      colors: {
        'editor.background': '#080C14',
        'editor.foreground': '#D4D4D8',
        'editor.lineHighlightBackground': '#0F1626',
        'editorCursor.foreground': '#818CF8',
        'editorLineNumber.foreground': '#3F3F46',
        'editorLineNumber.activeForeground': '#A1A1AA',
        'editorIndentGuide.background': '#18181B',
        'editorIndentGuide.activeBackground': '#27272A',
        'editor.selectionBackground': '#272F4D',
        'editorBracketMatch.background': '#1E293B',
        'editorBracketMatch.border': '#6366F1',
      },
    });

    monaco.editor.setTheme('codearena-dark');

    // Register Keyboard Shortcut: Shift + Alt + F (Format Code)
    editor.addCommand(
      monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
      () => {
        onFormat();
      }
    );

    // Register Keyboard Shortcut: Ctrl + Enter (Run Code)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun();
    });

    // Track cursor position
    editor.onDidChangeCursorPosition((e) => {
      setCursorPos({
        ln: e.position.lineNumber,
        col: e.position.column,
      });
    });
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#080C14] overflow-hidden">
      {/* Editor Main Canvas */}
      <div className="flex-1 w-full min-h-0">
        <Editor
          height="100%"
          language={monacoLangMap[language]}
          value={value}
          onChange={(v) => onChange(v || '')}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: 13.5,
            lineHeight: 22,
            fontLigatures: true,
            tabSize: language === 'javascript' ? 2 : 4,
            minimap: { enabled: true, scale: 0.75, renderCharacters: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            bracketPairColorization: { enabled: true },
            padding: { top: 12, bottom: 12 },
            renderLineHighlight: 'line',
            wordWrap: 'on',
            folding: true,
          }}
        />
      </div>

      {/* Editor Status Bar */}
      <div className="h-6 bg-[#06090F] border-t border-white/[0.06] px-3 flex items-center justify-between text-[11px] text-zinc-500 font-mono shrink-0 select-none">
        <div className="flex items-center gap-4">
          <span className="text-zinc-400">
            Ln {cursorPos.ln}, Col {cursorPos.col}
          </span>
          <span>Spaces: {language === 'javascript' ? 2 : 4}</span>
          <span>UTF-8</span>
          <span className="capitalize">{language}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-zinc-600">
            Press <kbd className="text-[10px] px-1 rounded bg-zinc-800 text-zinc-400">⇧⌥F</kbd> to format
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Editor Ready" />
        </div>
      </div>
    </div>
  );
}
