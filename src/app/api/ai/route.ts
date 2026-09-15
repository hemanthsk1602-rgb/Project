import { NextRequest, NextResponse } from 'next/server';
import { analyzeCodeLocally } from '@/lib/ai/review-engine';
import { generateTutorResponse } from '@/lib/ai/tutor-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, code, language, problem, prompt, context, history } = body;

    // Optional: If real Gemini or OpenAI API key is set in environment, we could proxy to LLM
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey && action === 'review' && code) {
      // Future pluggable LLM route
    }

    if (action === 'review') {
      const reviewResult = analyzeCodeLocally(code || '', language || 'cpp', problem);
      return NextResponse.json({ success: true, result: reviewResult, isRealAiConnected: false });
    }

    if (action === 'tutor') {
      const tutorResult = generateTutorResponse(
        prompt || 'explain',
        context || { topic: 'Arrays & Two Pointers' },
        history || []
      );
      return NextResponse.json({ success: true, result: tutorResult, isRealAiConnected: false });
    }

    return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

