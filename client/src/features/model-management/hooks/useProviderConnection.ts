/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { ProviderConfig, ServerStatus, ConnectionStatus } from '@/shared/types/model-management';

interface UseProviderConnectionProps {
  readonly providerId: 'ollama' | 'lmstudio';
  readonly config: ProviderConfig;
  readonly onError?: (error: string) => void;
  readonly onSuccess?: () => void;
}

interface UseProviderConnectionReturn {
  readonly serverStatus: ServerStatus;
  readonly connectionStatus: ConnectionStatus;
  readonly isLoading: boolean;
  readonly refresh: () => Promise<void>;
  readonly retryConnection: () => Promise<void>;
  readonly testConnection: () => Promise<boolean>;
}

const DEFAULT_SERVER_STATUS: ServerStatus = {
  connected: false,
  health: null,
  models: [],
} as const;

const DEFAULT_CONNECTION_STATUS: ConnectionStatus = {
  isConnecting: false,
  retryCount: 0,
  maxRetries: 3,
} as const;

/**
 * Custom hook for managing provider connections with modern React patterns
 */
export function useProviderConnection({
  providerId,
  config,
  onError,
  onSuccess
}: UseProviderConnectionProps): UseProviderConnectionReturn {
  const queryClient = useQueryClient();
  
  const [serverStatus, setServerStatus] = useState<ServerStatus>(DEFAULT_SERVER_STATUS);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(DEFAULT_CONNECTION_STATUS);

  // Query key factory for better cache management
  const createQueryKey = useCallback((endpoint: string) => [
    'provider-connection',
    providerId,
    endpoint,
    config.baseUrl
  ] as const, [providerId, config.baseUrl]);

  // Health check query using the backend API
  const healthQuery = useQuery({
    queryKey: createQueryKey('health'),
    queryFn: async () => {
      if (!config.healthCheckEnabled) {
        throw new Error('Health checks disabled');
      }

      try {
        const startTime = Date.now();
        
        // Use the appropriate API based on provider
        let response: { connected?: boolean; isOnline?: boolean; version?: string };
        if (providerId === 'ollama') {
          const { ollamaApi } = await import('@/shared/api/ollama-api');
          response = await ollamaApi.checkHealth(true);
        } else {
          const { lmStudioApi } = await import('@/shared/api/lmstudio-api');
          response = await lmStudioApi.checkHealth(true);
        }

        const latency = Date.now() - startTime;

        return {
          isOnline: response.connected || response.isOnline || true,
          latency,
          lastChecked: new Date(),
          ...(response.version && { version: response.version }),
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Connection failed: ${error.message}`);
        }
        
        throw new Error('Unknown connection error');
      }
    },
    enabled: config.healthCheckEnabled,
    refetchInterval: 15000,
    refetchOnWindowFocus: true,
    retry: (failureCount, error) => {
      if (failureCount >= connectionStatus.maxRetries) return false;
      if (error instanceof Error && error.message.includes('timeout')) return true;
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 5000,
    meta: {
      errorMessage: `Failed to connect to ${providerId} server`
    }
  });

  // Models query using the backend API
  const modelsQuery = useQuery({
    queryKey: createQueryKey('models'),
    queryFn: async () => {
      try {
        // Use the appropriate API based on provider
        let response: { models: string[] };
        if (providerId === 'ollama') {
          const { ollamaApi } = await import('@/shared/api/ollama-api');
          response = await ollamaApi.getModels(true);
        } else {
          const { lmStudioApi } = await import('@/shared/api/lmstudio-api');
          response = await lmStudioApi.getModels(true);
        }

        return response.models || [];
      } catch (error) {
        console.error(`Failed to fetch ${providerId} models:`, error);
        throw error;
      }
    },
    enabled: !!healthQuery.data?.isOnline && config.healthCheckEnabled,
    staleTime: 30000, // Models don't change frequently
    refetchOnWindowFocus: false,
    retry: 2,
  });

  // Update server status when queries change
  useEffect(() => {
    const health = healthQuery.data;
    const models = modelsQuery.data || [];
    const error = healthQuery.error || modelsQuery.error;

    setServerStatus({
      connected: !healthQuery.isError && !modelsQuery.isError,
      health: health || null,
      models: models.map((modelName: string) => ({
        id: modelName,
        name: modelName,
        status: {
          status: 'inactive' as const,
        }
      })),
      ...(error instanceof Error && { error: error.message }),
    });
  }, [
    healthQuery.data, 
    healthQuery.error, 
    healthQuery.isError,
    modelsQuery.data, 
    modelsQuery.error,
    modelsQuery.isError
  ]);

  // Update connection status
  useEffect(() => {
    setConnectionStatus(prev => ({
      isConnecting: healthQuery.isFetching || modelsQuery.isFetching,
      retryCount: healthQuery.failureCount || 0,
      maxRetries: prev.maxRetries,
      ...(healthQuery.failureCount > 0 && { lastRetry: new Date() }),
    }));
  }, [healthQuery.isFetching, healthQuery.failureCount, modelsQuery.isFetching]);

  // Handle success/error callbacks
  useEffect(() => {
    if (healthQuery.isSuccess && onSuccess) {
      onSuccess();
    }
  }, [healthQuery.isSuccess, onSuccess]);

  useEffect(() => {
    if (healthQuery.error && onError) {
      onError(healthQuery.error instanceof Error ? healthQuery.error.message : 'Connection failed');
    }
  }, [healthQuery.error, onError]);

  // Refresh function with optimistic updates
  const refresh = useCallback(async () => {
    setConnectionStatus(prev => ({ ...prev, isConnecting: true }));
    
    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: createQueryKey('health') }),
        queryClient.invalidateQueries({ queryKey: createQueryKey('models') })
      ]);
      
      await Promise.all([
        healthQuery.refetch(),
        modelsQuery.refetch()
      ]);
    } finally {
      setConnectionStatus(prev => ({ ...prev, isConnecting: false }));
    }
  }, [queryClient, createQueryKey, healthQuery, modelsQuery]);

  // Retry connection with exponential backoff
  const retryConnection = useCallback(async () => {
    if (connectionStatus.retryCount >= connectionStatus.maxRetries) {
      if (onError) {
        onError('Maximum retry attempts reached');
      }
      return;
    }

    setConnectionStatus(prev => ({
      ...prev,
      isConnecting: true,
      retryCount: prev.retryCount + 1,
      lastRetry: new Date(),
    }));

    // Clear previous errors
    queryClient.removeQueries({ queryKey: createQueryKey('health') });
    
    try {
      await healthQuery.refetch();
    } catch (error) {
      console.error(`Retry ${connectionStatus.retryCount + 1} failed:`, error);
    }
  }, [connectionStatus.retryCount, connectionStatus.maxRetries, onError, queryClient, createQueryKey, healthQuery]);

  // Test connection without affecting main queries
  const testConnection = useCallback(async (): Promise<boolean> => {
    try {
      // Use the appropriate API based on provider
      if (providerId === 'ollama') {
        const { ollamaApi } = await import('@/shared/api/ollama-api');
        await ollamaApi.checkHealth(false);
      } else {
        const { lmStudioApi } = await import('@/shared/api/lmstudio-api');
        await lmStudioApi.checkHealth(false);
      }
      return true;
    } catch {
      return false;
    }
  }, [providerId]);

  return {
    serverStatus,
    connectionStatus,
    isLoading: healthQuery.isLoading || modelsQuery.isLoading,
    refresh,
    retryConnection,
    testConnection,
  };
}
