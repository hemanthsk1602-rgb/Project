// ==============================================================================
// NEXUS — AI PROVIDER ABSTRACTION
// Interface for pluggable LLM integrations (OpenAI, Gemini, Anthropic, Mock)
// ==============================================================================

export interface AIMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  name?: string;
}

export interface AICompletionOptions {
  temperature?: number;
  maxTokens?: number;
  tools?: any[];
  contextData?: Record<string, any>;
}

export interface AIProviderResponse {
  content: string;
  toolCalls?: Array<{
    id: string;
    name: string;
    arguments: Record<string, any>;
  }>;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  isDemoResponse: boolean;
  providerName: string;
}

export interface AIProvider {
  name: string;
  isConfigured: boolean;
  generateChat(messages: AIMessage[], options?: AICompletionOptions): Promise<AIProviderResponse>;
  generateEmbedding?(text: string): Promise<number[]>;
}

