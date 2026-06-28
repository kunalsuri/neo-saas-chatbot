/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

// Shared types for local model management APIs
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

export interface LMStudioHealthCheck {
  isOnline: boolean;
  connected: boolean;
  models: string[];
  error?: string;
  timestamp: string;
}