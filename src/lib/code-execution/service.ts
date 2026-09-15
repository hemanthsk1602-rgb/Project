import { CodeLanguage, ExecutionResult, Problem, TestCase } from '@/lib/types';
import { runDemoEvaluation } from './demo-runner';

export interface CodeExecutionPayload {
  code: string;
  language: CodeLanguage;
  problem: Problem;
  customTestCases?: TestCase[];
}

export class CodeExecutionService {
  /**
   * Runs the code against visible and custom test cases.
   */
  static async runCode(payload: CodeExecutionPayload): Promise<ExecutionResult> {
    const casesToRun = payload.customTestCases && payload.customTestCases.length > 0
      ? payload.customTestCases
      : payload.problem.testCases.filter((tc) => !tc.isHidden);

    // If a real backend judge endpoint is configured in env, we would call it here
    const remoteJudgeUrl = process.env.NEXT_PUBLIC_JUDGE_API_URL;
    if (remoteJudgeUrl) {
      try {
        const res = await fetch(`${remoteJudgeUrl}/run`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: payload.code,
            language: payload.language,
            testCases: casesToRun,
          }),
        });
        if (res.ok) {
          return await res.json();
        }
      } catch {
        // Fallback to demo judge if remote is unreachable
      }
    }

    return await runDemoEvaluation(payload.code, payload.language, payload.problem, casesToRun, false);
  }

  /**
   * Submits the code for full problem evaluation against all visible and hidden test cases.
   */
  static async submitCode(payload: CodeExecutionPayload): Promise<ExecutionResult> {
    const allCases = payload.problem.testCases;

    const remoteJudgeUrl = process.env.NEXT_PUBLIC_JUDGE_API_URL;
    if (remoteJudgeUrl) {
      try {
        const res = await fetch(`${remoteJudgeUrl}/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: payload.code,
            language: payload.language,
            problemId: payload.problem.id,
          }),
        });
        if (res.ok) {
          return await res.json();
        }
      } catch {
        // Fallback to demo judge
      }
    }

    return await runDemoEvaluation(payload.code, payload.language, payload.problem, allCases, true);
  }
}

