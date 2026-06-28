/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { ApiResponse } from '@shared/types/api';

// External Integration Types - Ollama
export interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
  details?: {
    parent_model?: string;
    format?: string;
    family?: string;
    families?: string[];
    parameter_size?: string;
    quantization_level?: string;
  };
}

export interface OllamaModelsResponse {
  models: OllamaModel[];
}

export interface OllamaGenerateRequest {
  model: string;
  prompt: string;
  system?: string;
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    num_predict?: number;
    top_k?: number;
    repeat_penalty?: number;
    seed?: number;
  };
}

export interface OllamaGenerateResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

export interface OllamaHealthCheck {
  connected: boolean;
  isOnline: boolean;
  models?: string[];
  error?: string;
  latency?: number;
}

export interface OllamaTestResult {
  connected: boolean;
  response?: string;
  model?: string;
  latency?: number;
  error?: string;
}

export interface OllamaChatRequest {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    num_predict?: number;
  };
}

export interface OllamaChatResponse {
  message: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  };
  done: boolean;
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

// Ollama Error Response
export interface OllamaErrorResponse {
  error: string;
}

// External Integration Types - LM Studio
export interface LMStudioModel {
  id: string;
  object: string;
  created: number;
  owned_by: string;
}

export interface LMStudioModelsResponse {
  data: LMStudioModel[];
  object: string;
}

export interface LMStudioHealthCheck {
  isOnline: boolean;
  connected: boolean;
  models: string[];
  error?: string;
  timestamp: string;
}

export interface LMStudioChatRequest {
  model: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  max_tokens?: number;
  temperature?: number;
}

export interface LMStudioChatResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export type LMStudioTestResponse = ApiResponse<{ response: string }>;

export interface LMStudioError extends Error {
  response?: {
    data: unknown;
  };
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  type: 'local' | 'external';
  status: 'available' | 'downloading' | 'error' | 'offline';
  size?: string;
  contextLength?: number;
  description?: string;
  capabilities?: string[];
  metadata?: Record<string, unknown>;
}

export interface ModelProvider {
  id: string;
  name: string;
  type: 'local' | 'external';
  status: 'online' | 'offline' | 'error';
  host?: string;
  port?: number;
  apiKey?: string;
  models: AIModel[];
  healthCheck?: {
    lastChecked: string;
    responseTime: number;
    error?: string;
  };
}



export interface ModelDownloadProgress {
  modelId: string;
  progress: number;
  status: 'downloading' | 'completed' | 'error';
  error?: string;
}

export interface ModelTestRequest {
  providerId: string;
  modelId: string;
  prompt: string;
  options?: {
    temperature?: number;
    maxTokens?: number;
  };
}

export interface ModelTestResponse {
  response: string;
  metadata: {
    model: string;
    provider: string;
    tokens: number;
    processingTime: number;
    timestamp: string;
  };
}

export interface ModelManagementState {
  providers: ModelProvider[];
  models: AIModel[];
  selectedProvider: string | null;
  selectedModel: string | null;
  isLoading: boolean;
  isRefreshing: boolean;
  downloadProgress: Record<string, ModelDownloadProgress>;
  error: string | null;
}

// External AI Provider Types
export type ExternalProvider = 'google' | 'anthropic' | 'mistral' | 'openai';

export interface ExternalAIConfig {
  provider: ExternalProvider;
  apiKey: string;
  model: string;
  baseUrl?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface ExternalAIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ExternalAIResponse {
  content: string;
  model: string;
  provider: ExternalProvider;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface ExternalAIModel {
  id: string;
  name: string;
  description?: string;
  contextLength?: number;
  pricing?: {
    input: number;
    output: number;
  };
}

export interface ExternalAIHealthCheck {
  provider: ExternalProvider;
  connected: boolean;
  models: ExternalAIModel[];
  status: 'healthy' | 'error' | 'offline';
  message?: string;
  error?: string;
  latency?: number;
}

// Provider-specific configurations
export interface GoogleAIConfig extends ExternalAIConfig {
  provider: 'google';
  projectId?: string;
  location?: string;
}

export interface AnthropicConfig extends ExternalAIConfig {
  provider: 'anthropic';
  version?: string;
}

export interface MistralConfig extends ExternalAIConfig {
  provider: 'mistral';
}

export interface OpenAIConfig extends ExternalAIConfig {
  provider: 'openai';
  organization?: string;
}

export type ExternalProviderConfig = GoogleAIConfig | AnthropicConfig | MistralConfig | OpenAIConfig;

export interface ExternalAIModelStatusProps {
  currentProvider: ExternalProvider;
  currentModel: string;
  healthStatus: Record<ExternalProvider, ExternalAIHealthCheck>;
  onProviderChange: (provider: ExternalProvider) => void;
  onModelChange: (model: string) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
  compact?: boolean;
}

export interface ModelInfo {
  readonly id: string;
  readonly name: string;
  readonly size?: string;
  readonly modified?: string;
  readonly digest?: string;
  readonly type?: string;
  readonly quantization?: string;
  readonly maxContext?: number | null;
  readonly publisher?: string;
}

export interface ModelStatus {
  readonly status: 'active' | 'inactive' | 'loading' | 'error';
  readonly state?: 'loaded' | 'not-loaded';
  readonly lastUsed?: Date;
  readonly memoryUsage?: number;
}

export interface LocalModel extends ModelInfo {
  readonly status: ModelStatus;
}

export interface ServerHealth {
  readonly isOnline: boolean;
  readonly latency?: number;
  readonly lastChecked: Date;
  readonly error?: string;
  readonly version?: string;
}

export interface ServerStatus {
  readonly connected: boolean;
  readonly health: ServerHealth | null;
  readonly models: readonly LocalModel[];
  readonly error?: string;
}

export interface ProviderConfig {
  readonly baseUrl: string;
  readonly timeout: number;
  readonly healthCheckEnabled: boolean;
  readonly model?: string;
  readonly temperature?: number;
  readonly topP?: number;
  readonly maxTokens?: number;
}

export interface ConnectionStatus {
  readonly isConnecting: boolean;
  readonly retryCount: number;
  readonly lastRetry?: Date;
  readonly maxRetries: number;
}

export interface LocalModelProvider {
  readonly id: 'ollama' | 'lmstudio';
  readonly name: string;
  readonly config: ProviderConfig;
  readonly status: ServerStatus;
  readonly connection: ConnectionStatus;
}

// Event types for better state management
export interface ModelProviderEvents {
  readonly 'config-updated': ProviderConfig;
  readonly 'connection-status-changed': ServerStatus;
  readonly 'model-status-changed': { modelId: string; status: ModelStatus };
  readonly 'health-check-completed': ServerHealth;
  readonly 'error-occurred': { error: string; context: string };
}

// Utility types
export type ProviderType = LocalModelProvider['id'];
export type ModelStatusType = ModelStatus['status'];
export type ConnectionState = 'connected' | 'disconnected' | 'connecting' | 'error';
