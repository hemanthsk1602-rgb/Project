import { AIProvider, AIMessage, AICompletionOptions, AIProviderResponse } from '@/ai/providers/types';
import { DevelopmentMockLLMProvider } from '@/ai/providers/DevelopmentMockLLMProvider';

class AIService {
  private provider: AIProvider;

  constructor() {
    // Check if real provider is configured
    const providerType = process.env.AI_PROVIDER;
    const apiKey = process.env.AI_API_KEY;

    if (providerType && providerType !== 'demo' && apiKey) {
      // In future phase: initialize OpenAIProvider or GeminiProvider
      this.provider = new DevelopmentMockLLMProvider();
    } else {
      this.provider = new DevelopmentMockLLMProvider();
    }
  }

  getProviderName(): string {
    return this.provider.name;
  }

  isLive(): boolean {
    return this.provider.isConfigured;
  }

  async sendChatMessage(messages: AIMessage[], options?: AICompletionOptions): Promise<AIProviderResponse> {
    return this.provider.generateChat(messages, options);
  }
}

export const aiService = new AIService();

