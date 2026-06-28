/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { useState, useCallback } from 'react';

export interface ButtonStateOptions {
  initialDisabled?: boolean;
  initialLoading?: boolean;
}

export interface AsyncButtonOptions extends ButtonStateOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  resetDelay?: number;
}

// Hook for managing button state
export function useButtonState(options: ButtonStateOptions = {}) {
  const [isLoading, setIsLoading] = useState(options.initialLoading ?? false);
  const [isDisabled, setIsDisabled] = useState(options.initialDisabled ?? false);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
    setIsDisabled(loading);
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsDisabled(options.initialDisabled ?? false);
  }, [options.initialDisabled]);

  return {
    isLoading,
    isDisabled,
    setLoading,
    setDisabled: setIsDisabled,
    reset
  };
}

// Hook for async button operations
export function useAsyncButton(
  asyncOperation: () => Promise<void>,
  options: AsyncButtonOptions = {}
) {
  const buttonState = useButtonState(options);

  const execute = useCallback(async () => {
    try {
      buttonState.setLoading(true);
      await asyncOperation();
      options.onSuccess?.();
    } catch (error) {
      console.error('Async button operation failed:', error);
      options.onError?.(error instanceof Error ? error : new Error('Operation failed'));
    } finally {
      if (options.resetDelay) {
        setTimeout(() => {
          buttonState.reset();
        }, options.resetDelay);
      } else {
        buttonState.reset();
      }
    }
  }, [asyncOperation, buttonState, options]);

  return {
    ...buttonState,
    execute
  };
}