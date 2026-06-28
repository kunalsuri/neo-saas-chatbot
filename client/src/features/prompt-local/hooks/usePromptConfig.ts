/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { useState, useCallback, useEffect } from 'react';
import { useOllamaConfig } from '@/features/settings/hooks/useOllamaConfig';
import { useLMStudioConfig } from '@/features/settings/hooks/useLMStudioConfig';
import { useToast } from '@/shared/hooks/use-toast';
import { 
  UsePromptConfigReturn, 
  PromptConfig, 
  ServerHealth, 
  AIProvider, 
  PromptMode, 
  OutputFormat 
} from '../types';
import { 
  saveToLocalStorage, 
  loadFromLocalStorage, 
  getErrorMessage 
} from '../lib/utils';
import { DEFAULT_CONFIG, STORAGE_KEYS } from '../lib/constants';

export function usePromptConfig(): UsePromptConfigReturn {
  const { toast } = useToast();
  
  // External configs
  const ollamaConfig = useOllamaConfig();
  const lmStudioConfig = useLMStudioConfig();
  
  // Load config from localStorage or use defaults
  const [config, setConfig] = useState<PromptConfig>(() => {
    const savedConfig = loadFromLocalStorage(STORAGE_KEYS.config, DEFAULT_CONFIG);
    return { ...DEFAULT_CONFIG, ...savedConfig };
  });
  
  const [serverHealth, setServerHealth] = useState<ServerHealth>({
    isOnline: false,
    lastChecked: new Date().toISOString(),
  });
  
  const [isHealthChecking, setIsHealthChecking] = useState(false);

  // Get current provider's config and models
  const getCurrentProviderInfo = useCallback(() => {
    if (config.provider === 'ollama') {
      return {
        isConnected: ollamaConfig.isConnected,
        availableModels: ollamaConfig.availableModels || [],
        connectionStatus: ollamaConfig.connectionStatus,
      };
    } else {
      return {
        isConnected: lmStudioConfig.isConnected,
        availableModels: lmStudioConfig.availableModels || [],
        connectionStatus: lmStudioConfig.connectionStatus,
      };
    }
  }, [config.provider, ollamaConfig, lmStudioConfig]);

  const { isConnected, availableModels, connectionStatus } = getCurrentProviderInfo();

  // Save config to localStorage
  const saveConfig = useCallback((newConfig: PromptConfig) => {
    setConfig(newConfig);
    saveToLocalStorage(STORAGE_KEYS.config, newConfig);
  }, []);

  // Provider management
  const setProvider = useCallback((provider: AIProvider) => {
    const newConfig = { ...config, provider };
    
    // Auto-select first available model for new provider
    const providerInfo = provider === 'ollama' ? ollamaConfig : lmStudioConfig;
    if (providerInfo.availableModels && providerInfo.availableModels.length > 0) {
      const firstModel = providerInfo.availableModels[0];
      if (firstModel) {
        newConfig.model = firstModel;
      }
    }
    
    saveConfig(newConfig);
    
    toast({
      title: 'Provider Changed',
      description: `Switched to ${provider === 'ollama' ? 'Ollama' : 'LM Studio'}`,
    });
  }, [config, ollamaConfig, lmStudioConfig, saveConfig, toast]);

  const setModel = useCallback((model: string) => {
    const newConfig = { ...config, model };
    saveConfig(newConfig);
    saveToLocalStorage(STORAGE_KEYS.lastUsedModel, model);
  }, [config, saveConfig]);

  const setMode = useCallback((mode: PromptMode) => {
    const newConfig = { ...config, mode };
    saveConfig(newConfig);
  }, [config, saveConfig]);

  const setOutputFormat = useCallback((outputFormat: OutputFormat) => {
    const newConfig = { ...config, outputFormat };
    saveConfig(newConfig);
  }, [config, saveConfig]);

  const toggleAutoSave = useCallback(() => {
    const newConfig = { ...config, autoSave: !config.autoSave };
    saveConfig(newConfig);
    
    toast({
      title: config.autoSave ? 'Auto-save Disabled' : 'Auto-save Enabled',
      description: config.autoSave 
        ? 'Prompts will not be automatically saved to history'
        : 'Prompts will be automatically saved to history',
    });
  }, [config, saveConfig, toast]);

  const togglePreserveContext = useCallback(() => {
    const newConfig = { ...config, preserveContext: !config.preserveContext };
    saveConfig(newConfig);
    
    toast({
      title: config.preserveContext ? 'Context Preservation Disabled' : 'Context Preservation Enabled',
      description: config.preserveContext 
        ? 'Previous prompt context will not be preserved'
        : 'Previous prompt context will be preserved across improvements',
    });
  }, [config, saveConfig, toast]);

  // Health check
  const checkServerHealth = useCallback(async () => {
    setIsHealthChecking(true);
    
    const startTime = Date.now();
    
    try {
      // Simple health check by trying to get models
      const providerInfo = getCurrentProviderInfo();
      
      if (providerInfo.isConnected && providerInfo.availableModels.length > 0) {
        const responseTime = Date.now() - startTime;
        setServerHealth({
          isOnline: true,
          responseTime,
          lastChecked: new Date().toISOString(),
        });
      } else {
        setServerHealth({
          isOnline: false,
          lastChecked: new Date().toISOString(),
          error: 'No models available or service not connected',
        });
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      setServerHealth({
        isOnline: false,
        responseTime,
        lastChecked: new Date().toISOString(),
        error: getErrorMessage(error),
      });
    } finally {
      setIsHealthChecking(false);
    }
  }, [getCurrentProviderInfo]);

  // Auto-update model when switching providers
  useEffect(() => {
    // If current model is not available in current provider, switch to first available
    if (availableModels.length > 0 && !availableModels.includes(config.model)) {
      const newModel = availableModels[0];
      if (newModel) {
        setModel(newModel);
      }
    }
  }, [config.provider, availableModels, config.model, setModel]);

  // Update server health when connection status changes
  useEffect(() => {
    const health: ServerHealth = {
      isOnline: isConnected,
      lastChecked: new Date().toISOString(),
    };
    
    if (!isConnected) {
      health.error = typeof connectionStatus === 'string' ? connectionStatus : 'Service not connected';
    }
    
    setServerHealth(health);
  }, [isConnected, connectionStatus]);

  // Periodic health checks
  useEffect(() => {
    const interval = setInterval(checkServerHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [checkServerHealth]);

  // Initial health check
  useEffect(() => {
    checkServerHealth();
  }, [checkServerHealth]);

  return {
    config,
    serverHealth,
    availableModels,
    isHealthChecking,
    setProvider,
    setModel,
    setMode,
    setOutputFormat,
    toggleAutoSave,
    togglePreserveContext,
    checkServerHealth,
    isServerOnline: serverHealth.isOnline,
    hasAvailableModels: availableModels.length > 0,
  };
}

// Hook with additional utilities
export function usePromptConfigWithUtils() {
  const baseHook = usePromptConfig();
  
  const getProviderDisplayName = useCallback((provider: AIProvider): string => {
    return provider === 'ollama' ? 'Ollama' : 'LM Studio';
  }, []);
  
  const getModeDisplayName = useCallback((mode: PromptMode): string => {
    const names = {
      enhancement: 'Enhancement',
      optimization: 'Optimization', 
      structure: 'Structure',
      clarity: 'Clarity',
    };
    return names[mode];
  }, []);
  
  const getFormatDisplayName = useCallback((format: OutputFormat): string => {
    const names = {
      text: 'Plain Text',
      markdown: 'Markdown',
      structured: 'Structured',
    };
    return names[format];
  }, []);
  
  const isReadyForImprovement = useCallback((): boolean => {
    return baseHook.isServerOnline && baseHook.hasAvailableModels && !!baseHook.config.model;
  }, [baseHook.isServerOnline, baseHook.hasAvailableModels, baseHook.config.model]);

  const getStatusMessage = useCallback((): string => {
    if (!baseHook.isServerOnline) {
      return `${getProviderDisplayName(baseHook.config.provider)} is offline`;
    }
    if (!baseHook.hasAvailableModels) {
      return 'No models available';
    }
    if (!baseHook.config.model) {
      return 'No model selected';
    }
    return `Ready with ${baseHook.config.model}`;
  }, [baseHook, getProviderDisplayName]);

  return {
    ...baseHook,
    getProviderDisplayName,
    getModeDisplayName,
    getFormatDisplayName,
    isReadyForImprovement,
    getStatusMessage,
  };
}