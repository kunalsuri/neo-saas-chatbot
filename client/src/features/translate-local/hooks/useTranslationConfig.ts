/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { useState, useCallback, useEffect } from 'react';
import { useOllamaConfig } from '@/features/settings/hooks/useOllamaConfig';
import { useLMStudioConfig } from '@/features/settings/hooks/useLMStudioConfig';
import { TranslationConfig, AIProvider, TranslationMode, ServerHealth } from '../types';
import { DEFAULT_CONFIG } from '../lib/constants';

const CONFIG_STORAGE_KEY = 'translate-local-config';

export function useTranslationConfig() {
  // AI Provider configs
  const { config: ollamaConfig, connectionStatus: ollamaStatus, availableModels: ollamaModels, isConnected: ollamaConnected } = useOllamaConfig();
  const { 
    availableModels: lmStudioModels, 
    isConnected: lmStudioConnected,
    connectionStatus: lmStudioStatus 
  } = useLMStudioConfig();

  // Load config from localStorage
  const loadConfig = useCallback((): TranslationConfig => {
    try {
      const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_CONFIG, model: ollamaConfig.model || '', ...parsed };
      }
    } catch (error) {
      console.error('Failed to load translation config:', error);
    }
    return { ...DEFAULT_CONFIG, model: ollamaConfig.model || '' };
  }, [ollamaConfig.model]);

  // Local state
  const [config, setConfig] = useState<TranslationConfig>(loadConfig);
  const [isHealthChecking, setIsHealthChecking] = useState(false);



  // Update individual config properties
  const updateConfig = useCallback((updates: Partial<TranslationConfig>) => {
    setConfig(prevConfig => {
      const newConfig = { ...prevConfig, ...updates };
      try {
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
      } catch (error) {
        console.error('Failed to save translation config:', error);
      }
      return newConfig;
    });
  }, []);

  // Provider-specific getters
  const getCurrentServerHealth = useCallback((): ServerHealth => {
    if (config.provider === 'ollama') {
      return {
        isOnline: ollamaConnected,
        models: ollamaModels || [],
        ...(ollamaStatus.error && { error: ollamaStatus.error }),
        lastChecked: new Date().toISOString(),
      };
    } else {
      return {
        isOnline: lmStudioConnected,
        models: lmStudioModels || [],
        ...(lmStudioStatus.error && { error: lmStudioStatus.error }),
        lastChecked: new Date().toISOString(),
      };
    }
  }, [config.provider, ollamaConnected, ollamaModels, ollamaStatus, lmStudioConnected, lmStudioModels, lmStudioStatus]);

  const getAvailableModels = useCallback((): readonly string[] => {
    return config.provider === 'ollama' 
      ? (ollamaModels || []) 
      : (lmStudioModels || []);
  }, [config.provider, ollamaModels, lmStudioModels]);

  // Handlers
  const setProvider = useCallback((provider: AIProvider) => {
    const availableModels = provider === 'ollama' ? ollamaModels : lmStudioModels;
    const newModel = availableModels && availableModels.length > 0 
      ? availableModels[0] 
      : config.model;
    
    if (newModel) {
      updateConfig({ provider, model: newModel });
    } else {
      updateConfig({ provider });
    }
  }, [ollamaModels, lmStudioModels, config.model, updateConfig]);

  const setModel = useCallback((model: string) => {
    const availableModels = config.provider === 'ollama' ? (ollamaModels || []) : (lmStudioModels || []);
    
    // Validate model is available before setting
    if (availableModels.includes(model)) {
      console.warn(`Setting model to: ${model} for provider: ${config.provider}`);
      updateConfig({ model });
    } else {
      console.error(`Attempted to set unavailable model: ${model} for provider: ${config.provider}. Available models:`, availableModels);
    }
  }, [config.provider, ollamaModels, lmStudioModels, updateConfig]);

  const setSourceLang = useCallback((sourceLang: string) => {
    updateConfig({ sourceLang });
  }, [updateConfig]);

  const setTargetLang = useCallback((targetLang: string) => {
    updateConfig({ targetLang });
  }, [updateConfig]);

  const swapLanguages = useCallback(() => {
    updateConfig({
      sourceLang: config.targetLang,
      targetLang: config.sourceLang,
    });
  }, [config.sourceLang, config.targetLang, updateConfig]);

  const setMode = useCallback((mode: TranslationMode) => {
    updateConfig({ mode });
  }, [updateConfig]);

  const toggleMode = useCallback(() => {
    const newMode = config.mode === 'formal' ? 'casual' : 'formal';
    updateConfig({ mode: newMode });
  }, [config.mode, updateConfig]);

  const setAutoDetect = useCallback((autoDetect: boolean) => {
    updateConfig({ autoDetect });
  }, [updateConfig]);

  const toggleAutoDetect = useCallback(() => {
    updateConfig({ autoDetect: !config.autoDetect });
  }, [config.autoDetect, updateConfig]);

  // Health check
  const checkServerHealth = useCallback(async () => {
    setIsHealthChecking(true);
    try {
      // Trigger health checks (these are handled by the original hooks)
      // The actual health checking is done by the original hooks
      // We just set the loading state here
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Health check failed:', error);
    } finally {
      setIsHealthChecking(false);
    }
  }, []);

  // Auto-select model when provider changes or when no valid model is selected
  useEffect(() => {
    const availableModels = config.provider === 'ollama' ? (ollamaModels || []) : (lmStudioModels || []);
    
    // Only auto-select if current model is invalid or not in available models
    if (availableModels.length > 0 && (!config.model || !availableModels.includes(config.model))) {
      const firstModel = availableModels[0];
      if (firstModel && firstModel !== config.model) {
        // Using console.warn as it's allowed for important state changes
        console.warn(`Auto-selecting model: ${firstModel} for provider: ${config.provider}`);
        updateConfig({ model: firstModel });
      }
    }
  }, [config.provider, config.model, ollamaModels, lmStudioModels, updateConfig]);

  // Sync with Ollama config changes (but don't override user selections)
  useEffect(() => {
    if (config.provider === 'ollama' && ollamaConfig.model && ollamaConfig.model !== config.model) {
      const availableModels = ollamaModels || [];
      // Only sync if the new model is available and we don't have a valid current model
      if (availableModels.includes(ollamaConfig.model) && (!config.model || !availableModels.includes(config.model))) {
        console.warn(`Syncing with Ollama config model: ${ollamaConfig.model}`);
        updateConfig({ model: ollamaConfig.model });
      }
    }
  }, [config.provider, config.model, ollamaConfig.model, ollamaModels, updateConfig]);

  return {
    // Current config
    config,
    
    // Server health
    serverHealth: getCurrentServerHealth(),
    availableModels: getAvailableModels(),
    isHealthChecking,
    
    // Actions
    setProvider,
    setModel,
    setSourceLang,
    setTargetLang,
    swapLanguages,
    setMode,
    toggleMode,
    setAutoDetect,
    toggleAutoDetect,
    checkServerHealth,
    updateConfig,
    
    // Computed values
    isServerOnline: getCurrentServerHealth().isOnline,
    hasAvailableModels: getAvailableModels().length > 0,
    isCasual: config.mode === 'casual',
  };
}