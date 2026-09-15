'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProblemBySlug, DEMO_PROBLEMS } from '@/data/demo/problems';
import { CodeLanguage, ExecutionResult, Submission, TestCase } from '@/lib/types';
import { IDENavbar } from '@/components/navigation/IDENavbar';
import { MonacoEditorWrapper } from '@/components/editor/MonacoEditorWrapper';
import { ProblemStatement } from '@/components/editor/ProblemStatement';
import { TestCasesPanel } from '@/components/editor/TestCasesPanel';
import { FileExplorer } from '@/components/editor/FileExplorer';
import { AIReviewDrawer } from '@/components/editor/AIReviewDrawer';
import { formatCode } from '@/lib/code-execution/formatter';
import { CodeExecutionService } from '@/lib/code-execution/service';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { 
  FileCode, 
  Sidebar, 
  Terminal, 
  Sparkles,
  Layers,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export default function PracticeIDEPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || 'two-sum';
  const problem = getProblemBySlug(slug) || DEMO_PROBLEMS[0];

  // Language & Code State
  const [language, setLanguage] = useState<CodeLanguage>('cpp');
  const [codeMap, setCodeMap] = useState<Record<CodeLanguage, string>>(problem.starterCode);
  const currentCode = codeMap[language] || problem.starterCode[language];

  // IDE Layout State
  const [activeFile, setActiveFile] = useState<string>(`solution.cpp`);
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(false);
  const [isStatementOpen, setIsStatementOpen] = useState<boolean>(true);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Execution & Submissions
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Update starter code when problem or language switches
  useEffect(() => {
    setCodeMap(problem.starterCode);
    const fileExt = language === 'cpp' ? 'cpp' : language === 'python' ? 'py' : language === 'java' ? 'java' : 'js';
    setActiveFile(`solution.${fileExt}`);
  }, [problem, language]);

  const handleLanguageChange = (newLang: CodeLanguage) => {
    setLanguage(newLang);
    const fileExt = newLang === 'cpp' ? 'cpp' : newLang === 'python' ? 'py' : newLang === 'java' ? 'java' : 'js';
    setActiveFile(`solution.${fileExt}`);
  };

  const handleCodeChange = (newCode: string) => {
    setCodeMap((prev) => ({
      ...prev,
      [language]: newCode,
    }));
  };

  // Prettier-style formatting action (Shift + Alt + F)
  const handleFormatCode = () => {
    const { formatted, changed } = formatCode(currentCode, language);
    if (changed) {
      handleCodeChange(formatted);
      toast.success('✓ Code formatted', {
        description: `Indentation and braces standardized for ${language.toUpperCase()}`,
        duration: 2000,
      });
    } else {
      toast.info('Code is already formatted', { duration: 1500 });
    }
  };

  // Reset starter code
  const handleResetCode = () => {
    if (confirm('Reset code to initial problem template?')) {
      handleCodeChange(problem.starterCode[language]);
      toast.info('Template reset');
    }
  };

  // Run visible test cases (Ctrl + Enter)
  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      const result = await CodeExecutionService.runCode({
        code: currentCode,
        language,
        problem,
      });
      setExecutionResult(result);

      if (result.status === 'Accepted') {
        toast.success(`✓ Tests Passed (${result.totalPassed}/${result.totalCases})`, {
          description: `Runtime: ${result.executionTimeMs}ms • Memory: ${result.memoryMb}MB`,
        });
      } else {
        toast.error(`Verdict: ${result.status}`, {
          description: `${result.totalPassed}/${result.totalCases} test cases passed`,
        });
      }
    } catch {
      toast.error('Execution encountered an unexpected error');
    } finally {
      setIsRunning(false);
    }
  };

  // Run custom user input
  const handleRunCustom = async (customInput: string) => {
    setIsRunning(true);
    try {
      const customTc: TestCase = {
        id: 'tc-custom',
        input: customInput,
        expectedOutput: 'Custom evaluation',
      };
      const result = await CodeExecutionService.runCode({
        code: currentCode,
        language,
        problem,
        customTestCases: [customTc],
      });
      setExecutionResult(result);
    } catch {
      toast.error('Failed to run custom input');
    } finally {
      setIsRunning(false);
    }
  };

  // Submit solution against all test cases
  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    try {
      const result = await CodeExecutionService.submitCode({
        code: currentCode,
        language,
        problem,
      });
      setExecutionResult(result);

      // Record submission
      const newSub: Submission = {
        id: `sub-${Date.now()}`,
        problemId: problem.id,
        problemTitle: problem.title,
        language,
        code: currentCode,
        status: result.status,
        runtimeMs: result.executionTimeMs,
        memoryMb: result.memoryMb,
        submittedAt: 'Just now',
      };
      setSubmissions((prev) => [newSub, ...prev]);

      if (result.status === 'Accepted') {
        // Trigger celebration confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        toast.success('🎉 Solution Accepted!', {
          description: `All ${result.totalCases} test cases verified. Runtime: ${result.executionTimeMs}ms.`,
          duration: 4000,
        });
      } else {
        toast.error(`Submission Result: ${result.status}`, {
          description: `Passed ${result.totalPassed} of ${result.totalCases} cases.`,
        });
      }
    } catch {
      toast.error('Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard shortcut listeners (Shift+Alt+F, Ctrl+Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift + Alt + F
      if (e.shiftKey && e.altKey && (e.key === 'F' || e.key === 'f')) {
        e.preventDefault();
        handleFormatCode();
      }
      // Ctrl + Enter
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) {
          handleSubmitCode();
        } else {
          handleRunCode();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCode, language]);

  return (
    <div className={`h-screen w-screen flex flex-col bg-[#070A12] text-zinc-100 overflow-hidden font-sans ${
      isFullscreen ? 'fixed inset-0 z-50' : ''
    }`}>
      {/* Specialized Top IDE Toolbar */}
      <IDENavbar
        problem={problem}
        language={language}
        onLanguageChange={handleLanguageChange}
        onFormatCode={handleFormatCode}
        onRunCode={handleRunCode}
        onSubmitCode={handleSubmitCode}
        onResetCode={handleResetCode}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
        onToggleAiDrawer={() => setIsAiDrawerOpen(!isAiDrawerOpen)}
        isAiDrawerOpen={isAiDrawerOpen}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
      />

      {/* Main IDE Workspace */}
      <div className="flex-1 flex min-h-0 relative overflow-hidden">
        {/* Far Left Activity Bar */}
        <div className="w-12 bg-[#05080E] border-r border-white/[0.08] flex flex-col items-center py-2.5 gap-3 shrink-0 select-none z-10">
          <button
            onClick={() => setIsStatementOpen(!isStatementOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isStatementOpen
                ? 'bg-white/10 text-white'
                : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
            }`}
            title="Problem Statement Pane"
          >
            <Sidebar className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsExplorerOpen(!isExplorerOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isExplorerOpen
                ? 'bg-white/10 text-white'
                : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
            }`}
            title="Challenge File Explorer"
          >
            <Layers className="w-4 h-4" />
          </button>

          <div className="h-px w-6 bg-white/[0.08] my-1" />

          <button
            onClick={() => setIsAiDrawerOpen(!isAiDrawerOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isAiDrawerOpen
                ? 'bg-brand-500/20 text-brand-300'
                : 'text-zinc-500 hover:text-brand-400 hover:bg-white/5'
            }`}
            title="CodeArena AI Assistant"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

        {/* Collapsible File Explorer Pane */}
        <FileExplorer
          problem={problem}
          language={language}
          activeFile={activeFile}
          onSelectFile={setActiveFile}
          isOpen={isExplorerOpen}
          onToggle={() => setIsExplorerOpen(false)}
        />

        {/* Problem Statement & Hints Pane (Resizable / Collapsible) */}
        {isStatementOpen && (
          <div className="w-full sm:w-[420px] lg:w-[460px] h-full shrink-0 flex flex-col min-w-0 z-10 shadow-lg">
            <ProblemStatement problem={problem} submissions={submissions} />
          </div>
        )}

        {/* Center Coding Canvas + Bottom Test Cases Panel */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Editor File Tab Bar */}
          <div className="h-9 bg-[#070B13] border-b border-white/[0.08] px-3 flex items-center justify-between select-none shrink-0">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#080C14] border-t-2 border-brand-500 text-white text-xs font-mono rounded-t">
                <FileCode className="w-3.5 h-3.5 text-brand-400" />
                <span>{activeFile}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
              <span className="hidden sm:inline">Shift + Alt + F to format</span>
            </div>
          </div>

          {/* Monaco Editor Component */}
          <div className="flex-1 min-h-0 relative">
            <MonacoEditorWrapper
              value={currentCode}
              language={language}
              onChange={handleCodeChange}
              onFormat={handleFormatCode}
              onRun={handleRunCode}
            />
          </div>

          {/* Bottom Test Cases Panel */}
          <TestCasesPanel
            problem={problem}
            executionResult={executionResult}
            isRunning={isRunning}
            onRunCustom={handleRunCustom}
          />
        </div>

        {/* Right Slide-over AI Intelligence Drawer */}
        <AIReviewDrawer
          isOpen={isAiDrawerOpen}
          onClose={() => setIsAiDrawerOpen(false)}
          code={currentCode}
          language={language}
          problem={problem}
          onApplyCode={(optCode) => {
            handleCodeChange(optCode);
            toast.success('Optimized code applied to editor');
          }}
        />
      </div>
    </div>
  );
}
