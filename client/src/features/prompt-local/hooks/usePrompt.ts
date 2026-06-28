/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from '@/shared/hooks/use-toast';
import { apiClient } from '../lib/api';
import { UsePromptReturn, PromptRequest, AIProvider, PromptHistoryItem } from '../types';
import { getErrorMessage } from '../lib/utils';

interface UsePromptOptions {
  provider: AIProvider;
  onSuccess?: (improved: string) => void;
  onError?: (error: string) => void;
}

export function usePrompt(options: UsePromptOptions): UsePromptReturn {
  const { onSuccess, onError } = options;
  const { toast } = useToast();
  
  // State
  const [isImproving, setIsImproving] = useState(false);
  const [improved, setImproved] = useState<string | null>(null);
  const [tokens, setTokens] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const abortControllerRef = useRef<AbortController | null>(null);

  const improve = useCallback(async (request: Omit<PromptRequest, 'userId'>) => {
    if (isImproving) return;
    
    // Validate input
    if (!request.original.trim()) {
      const errorMsg = 'Please enter a prompt to improve';
      setError(errorMsg);
      onError?.(errorMsg);
      toast({
        title: 'Input Required',
        description: errorMsg,
        variant: 'destructive',
      });
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    
    setIsImproving(true);
    setError(null);
    setImproved(null);
    setTokens(null);
    setConfidence(null);

    try {
      const response = await apiClient.improvePrompt(request);
      
      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      setImproved(response.improved);
      setTokens(response.tokens);
      setConfidence(response.confidence || null);
      
      onSuccess?.(response.improved);
      
      toast({
        title: 'Prompt Improved',
        description: `Generated ${response.tokens} tokens with ${
          response.confidence ? `${Math.round(response.confidence * 100)}% confidence` : 'good quality'
        }`,
      });
      
    } catch (error) {
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }
      
      const errorMsg = getErrorMessage(error);
      setError(errorMsg);
      onError?.(errorMsg);
      
      toast({
        title: 'Improvement Failed',
        description: errorMsg,
        variant: 'destructive',
      });
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setIsImproving(false);
      }
    }
  }, [isImproving, onSuccess, onError, toast]);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsImproving(false);
    
    toast({
      title: 'Improvement Cancelled',
      description: 'The prompt improvement has been cancelled',
    });
  }, [toast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    improve,
    cancel,
    isImproving,
    improved,
    tokens,
    confidence,
    error,
  };
}

// Extended hook with additional features
export function usePromptWithAutoSave(options: UsePromptOptions & {
  autoSave?: boolean;
  onAutoSave?: (item: Record<string, unknown>) => Promise<void>;
}) {
  const promptHook = usePrompt(options);
  const { autoSave = false, onAutoSave } = options;

  const improveWithAutoSave = useCallback(async (request: Omit<PromptRequest, 'userId'>) => {
    await promptHook.improve(request);
    
    // Auto-save if enabled and improvement was successful
    if (autoSave && promptHook.improved && onAutoSave) {
      try {
        await onAutoSave({
          original: request.original,
          improved: promptHook.improved,
          model: request.model,
          provider: request.provider,
          mode: request.mode,
          outputFormat: request.outputFormat,
          tokens: promptHook.tokens || 0,
          confidence: promptHook.confidence,
          userId: 'local-user',
        });
      } catch (error) {
        console.warn('Auto-save failed:', error);
      }
    }
  }, [promptHook, autoSave, onAutoSave]);

  return {
    ...promptHook,
    improve: improveWithAutoSave,
  };
}