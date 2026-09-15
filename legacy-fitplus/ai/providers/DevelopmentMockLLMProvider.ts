import { AIProvider, AIMessage, AICompletionOptions, AIProviderResponse } from './types';

export class DevelopmentMockLLMProvider implements AIProvider {
  name = 'Development Mock AI Provider';
  isConfigured = false;

  async generateChat(messages: AIMessage[], options?: AICompletionOptions): Promise<AIProviderResponse> {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content.toLowerCase() || '';

    let content = '';

    if (lastUserMessage.includes('schedule') || lastUserMessage.includes('exam') || lastUserMessage.includes('today')) {
      content = 
        `[DEMO MODE: Live AI provider not configured. Connect OpenAI or Gemini in .env to enable real-time inference.]\n\n` +
        `**NEXUS Cross-Module Analysis:**\n\n` +
        `I've analyzed your schedule across modules:\n` +
        `• **Study:** You have a Data Structures & Algorithms exam approaching in 4 days.\n` +
        `• **Productivity:** You have 3 high-priority tasks (DBMS Assignment 3, Tree Traversal practice, and weekly laundry).\n` +
        `• **Fitness:** Push Day (Chest & Triceps) is scheduled for 6:00 PM. I've adjusted the planned duration to 35 minutes to preserve evening revision time.\n` +
        `• **Finance:** You have ₹800 remaining in your monthly budget with 8 days to go (safe daily spend: ~₹100/day).\n\n` +
        `**Recommendation:** Complete your 45-minute DBMS revision before 5:30 PM, do your shortened 35-minute workout, and prepare a home-cooked dinner to protect your remaining budget.`;
    } else if (lastUserMessage.includes('workout') || lastUserMessage.includes('gym') || lastUserMessage.includes('fitness')) {
      content = 
        `[DEMO MODE: Live AI provider not configured]\n\n` +
        `Based on your goal (*Muscle Gain*) and current exam stress, I suggest:\n\n` +
        `**High-Efficiency Push Routine (35 mins):**\n` +
        `1. Barbell Bench Press: 3 sets × 6-8 reps (heavy compound)\n` +
        `2. Incline Dumbbell Press: 3 sets × 8-10 reps\n` +
        `3. Standing Cable Flyes: 2 sets × 12 reps\n` +
        `4. Overhead Triceps Extension: 3 sets × 10-12 reps\n\n` +
        `*Note: Keep rest intervals strictly under 90 seconds to stay on schedule.*`;
    } else if (lastUserMessage.includes('budget') || lastUserMessage.includes('money') || lastUserMessage.includes('finance')) {
      content = 
        `[DEMO MODE: Live AI provider not configured]\n\n` +
        `**Financial Health Check:**\n` +
        `• **Remaining Balance:** ₹800\n` +
        `• **Monthly Budget:** ₹12,000\n` +
        `• **Burn Rate:** ₹373/day average (Higher than target ₹300/day due to weekend food delivery).\n` +
        `• **Action:** Limit discretionary eating out this week; campus mess card is pre-paid.`;
    } else {
      content = 
        `[DEMO MODE: Live AI provider not configured. Add AI_API_KEY in .env.local to activate real model generation.]\n\n` +
        `Hello Alex! I am your NEXUS Assistant. I can help coordinate your studies, workout schedule, finances, technical skill roadmaps, and campus travel. How can I assist your day?`;
    }

    return {
      content,
      isDemoResponse: true,
      providerName: this.name,
      usage: {
        promptTokens: 120,
        completionTokens: 240,
        totalTokens: 360,
      },
    };
  }

  async generateEmbedding(text: string): Promise<number[]> {
    // 1536-dimensional mock embedding
    return new Array(1536).fill(0).map(() => (Math.random() - 0.5) * 0.01);
  }
}

