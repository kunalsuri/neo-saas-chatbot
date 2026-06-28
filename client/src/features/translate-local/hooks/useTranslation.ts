/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { useEffect, useCallback, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/shared/hooks/use-toast';
import { translationService } from '../lib/api';
import { TranslationRequest, AIProvider } from '../types';
import { ERROR_MESSAGES } from '../lib/constants';

interface UseTranslationOptions {
  provider?: AIProvider;
  onSuccess?: (translation: string) => void;
  onError?: (error: Error) => void;
}

export function useTranslation(options: UseTranslationOptions = {}) {
  const { provider = 'ollama', onSuccess, onError } = options;
  const { toast } = useToast();
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutation = useMutation({
    mutationFn: async (request: TranslationRequest) => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      return translationService.translate(request, provider, abortControllerRef.current.signal);
    },
    onSuccess: (data) => {
      onSuccess?.(data.translation);
      toast({
        title: "Translation Complete",
        description: "Text has been successfully translated",
      });
    },
    onError: (error: Error) => {
      if (error.name !== 'AbortError') {
        onError?.(error);
        toast({
          title: "Translation Failed",
          description: error.message || ERROR_MESSAGES.translationFailed,
          variant: "destructive",
        });
      }
    },
  });

  const translate = useCallback((request: TranslationRequest) => {
    mutation.mutate(request);
  }, [mutation]);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    mutation.reset();
  }, [mutation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    translate,
    cancel,
    isTranslating: mutation.isPending,
    translation: mutation.data?.translation,
    tokens: mutation.data?.tokens,
    confidence: mutation.data?.confidence,
    detectedLanguage: mutation.data?.detectedLanguage,
    error: mutation.error,
  };
}