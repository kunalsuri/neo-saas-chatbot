/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/shared/hooks/use-toast';
import type { ProviderConfig, ProviderType } from '@/shared/types/model-management';
import { validateProviderConfig } from '../utils';

interface UseProviderConfigProps {
  readonly providerId: ProviderType;
  readonly onConfigChange?: (config: ProviderConfig) => void;
}

interface UseProviderConfigReturn {
  readonly config: ProviderConfig;
  readonly updateConfig: (updates: Partial<ProviderConfig>) => void;
  readonly resetConfig: () => void;
  readonly isValid: boolean;
  readonly validationErrors: readonly string[];
  readonly isDirty: boolean;
  readonly saveConfig: () => Promise<boolean>;
}

// Default configurations for each provider
const DEFAULT_CONFIGS: Record<ProviderType, ProviderConfig> = {
  ollama: {
    baseUrl: 'http://localhost:11434',
    timeout: 15000,
    healthCheckEnabled: true,
    model: 'llama3.2:latest',
    temperature: 0.7,
    topP: 0.9,
    maxTokens: 200,
  },
  lmstudio: {
    baseUrl: 'http://localhost:1234',
    timeout: 15000,
    healthCheckEnabled: true,
    model: '',
    temperature: 0.7,
    topP: 0.9,
    maxTokens: 200,
  },
} as const;

/**
 * Custom hook for managing provider configuration with validation and persistence
 */
export function useProviderConfig({
  providerId,
  onConfigChange
}: UseProviderConfigProps): UseProviderConfigReturn {
  const { toast } = useToast();
  const storageKey = `${providerId}-config`;
  
  // Load initial config from localStorage or use defaults
  const [config, setConfig] = useState<ProviderConfig>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsedConfig = JSON.parse(stored);
        return { ...DEFAULT_CONFIGS[providerId], ...parsedConfig };
      }
    } catch (error) {
      console.warn(`Failed to load ${providerId} config from localStorage:`, error);
    }
    return DEFAULT_CONFIGS[providerId];
  });

  const [originalConfig, setOriginalConfig] = useState<ProviderConfig>(config);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Validate configuration whenever it changes
  useEffect(() => {
    const validation = validateProviderConfig(config, providerId);
    setValidationErrors(validation.errors);
  }, [config, providerId]);

  // Check if config is dirty (different from original)
  const isDirty = JSON.stringify(config) !== JSON.stringify(originalConfig);
  const isValid = validationErrors.length === 0;

  // Update configuration with validation
  const updateConfig = useCallback((updates: Partial<ProviderConfig>) => {
    setConfig(prev => {
      const newConfig = { ...prev, ...updates };
      
      // Validate the new configuration
      const validation = validateProviderConfig(newConfig, providerId);
      
      if (validation.errors.length > 0 && updates.baseUrl) {
        // If there are validation errors for critical fields, show toast
        toast({
          title: 'Configuration Warning',
          description: validation.errors[0],
          variant: 'destructive',
        });
      }
      
      return newConfig;
    });
  }, [providerId, toast]);

  // Reset configuration to defaults
  const resetConfig = useCallback(() => {
    const defaultConfig = DEFAULT_CONFIGS[providerId];
    setConfig(defaultConfig);
    setOriginalConfig(defaultConfig);
    
    toast({
      title: 'Configuration Reset',
      description: `${providerId} configuration has been reset to defaults.`,
    });
  }, [providerId, toast]);

  // Save configuration to localStorage
  const saveConfig = useCallback(async (): Promise<boolean> => {
    if (!isValid) {
      toast({
        title: 'Invalid Configuration',
        description: 'Please fix the configuration errors before saving.',
        variant: 'destructive',
      });
      return false;
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify(config));
      setOriginalConfig(config);
      
      if (onConfigChange) {
        onConfigChange(config);
      }
      
      toast({
        title: 'Configuration Saved',
        description: `${providerId} configuration has been saved successfully.`,
      });
      
      return true;
    } catch (error) {
      console.error(`Failed to save ${providerId} config:`, error);
      
      toast({
        title: 'Save Failed',
        description: 'Failed to save configuration. Please try again.',
        variant: 'destructive',
      });
      
      return false;
    }
  }, [config, isValid, storageKey, providerId, onConfigChange, toast]);

  // Auto-save valid configurations after a delay
  useEffect(() => {
    if (!isDirty || !isValid) return;

    const timeoutId = setTimeout(() => {
      saveConfig();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [config, isDirty, isValid, saveConfig]);

  // Notify parent component of config changes
  useEffect(() => {
    if (onConfigChange && isValid) {
      onConfigChange(config);
    }
  }, [config, isValid, onConfigChange]);

  return {
    config,
    updateConfig,
    resetConfig,
    isValid,
    validationErrors,
    isDirty,
    saveConfig,
  };
}
