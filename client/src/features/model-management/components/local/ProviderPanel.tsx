/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useCallback } from 'react';
import { Separator } from '@/shared/components/ui/separator';
import { useToast } from '@/shared/hooks/use-toast';
import ConfigurationPanel from './ConfigurationPanel';
import ServerStatusCard from './ServerStatusCard';
import ModelList from './ModelList';
import { useProviderConnection } from '../../hooks';
import type { ProviderType, ProviderConfig } from '@/shared/types/model-management';
import { cn } from '../../utils';

interface ProviderPanelProps {
  readonly providerId: ProviderType;
  readonly initialConfig: ProviderConfig;
  readonly onTestModel?: (modelId: string) => void;
  readonly onLoadModel?: (modelId: string) => void;
  readonly onUnloadModel?: (modelId: string) => void;
  readonly onViewModelDetails?: (modelId: string) => void;
  readonly className?: string;
}

function ProviderPanel({
  providerId,
  initialConfig,
  onTestModel,
  onLoadModel,
  onUnloadModel,
  onViewModelDetails,
  className
}: ProviderPanelProps) {
  const { toast } = useToast();
  const [currentConfig, setCurrentConfig] = React.useState<ProviderConfig>(initialConfig);

  const {
    serverStatus,
    connectionStatus,
    isLoading,
    refresh,
    retryConnection,
    testConnection
  } = useProviderConnection({
    providerId,
    config: currentConfig,
    onError: useCallback((error: string) => {
      toast({
        title: 'Connection Error',
        description: error,
        variant: 'destructive',
      });
    }, [toast]),
    onSuccess: useCallback(() => {
      toast({
        title: 'Connection Restored',
        description: `Successfully reconnected to ${providerId === 'lmstudio' ? 'LM Studio' : 'Ollama'}.`,
      });
    }, [providerId, toast])
  });

  const handleConfigChange = useCallback((newConfig: ProviderConfig) => {
    setCurrentConfig(newConfig);
  }, []);

  const handleTestConnection = useCallback(async (): Promise<boolean> => {
    try {
      const result = await testConnection();
      if (result) {
        toast({
          title: 'Connection Successful',
          description: `Successfully connected to ${providerId === 'lmstudio' ? 'LM Studio' : 'Ollama'}.`,
        });
      }
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Connection test failed';
      toast({
        title: 'Connection Failed',
        description: message,
        variant: 'destructive',
      });
      return false;
    }
  }, [testConnection, providerId, toast]);

  const handleRefresh = useCallback(async () => {
    try {
      await refresh();
    } catch (error) {
      toast({
        title: 'Refresh Failed',
        description: error instanceof Error ? error.message : 'Failed to refresh server status',
        variant: 'destructive',
      });
    }
  }, [refresh, toast]);

  const handleRetry = useCallback(async () => {
    try {
      await retryConnection();
    } catch (error) {
      toast({
        title: 'Retry Failed',
        description: error instanceof Error ? error.message : 'Failed to retry connection',
        variant: 'destructive',
      });
    }
  }, [retryConnection, toast]);

  const handleModelAction = useCallback((action: string, modelId: string) => {
    const providerName = providerId === 'lmstudio' ? 'LM Studio' : 'Ollama';
    
    toast({
      title: `${action} Model`,
      description: `${action} model ${modelId} on ${providerName}`,
    });
  }, [providerId, toast]);

  const handleTestModel = useCallback((modelId: string) => {
    handleModelAction('Testing', modelId);
    if (onTestModel) {
      onTestModel(modelId);
    }
  }, [handleModelAction, onTestModel]);

  const handleLoadModel = useCallback((modelId: string) => {
    handleModelAction('Loading', modelId);
    if (onLoadModel) {
      onLoadModel(modelId);
    }
  }, [handleModelAction, onLoadModel]);

  const handleUnloadModel = useCallback((modelId: string) => {
    handleModelAction('Unloading', modelId);
    if (onUnloadModel) {
      onUnloadModel(modelId);
    }
  }, [handleModelAction, onUnloadModel]);

  const handleViewModelDetails = useCallback((modelId: string) => {
    if (onViewModelDetails) {
      onViewModelDetails(modelId);
    }
  }, [onViewModelDetails]);

  const providerName = providerId === 'lmstudio' ? 'LM Studio' : 'Ollama';

  return (
    <div className={cn('space-y-6', className)}>
      {/* Configuration Panel */}
      <ConfigurationPanel
        providerId={providerId}
        onConfigChange={handleConfigChange}
        onTestConnection={handleTestConnection}
      />

      <Separator className="my-6" />

      {/* Server Status */}
      <ServerStatusCard
        title={`${providerName} Server Status`}
        provider={providerId}
        serverStatus={serverStatus}
        connectionStatus={connectionStatus}
        healthCheckEnabled={currentConfig.healthCheckEnabled}
        onRefresh={handleRefresh}
        onRetry={handleRetry}
        isLoading={isLoading}
      />

      <Separator className="my-6" />

      {/* Models List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Available Models</h3>
          {serverStatus.models.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {serverStatus.models.length} model{serverStatus.models.length !== 1 ? 's' : ''} found
            </div>
          )}
        </div>

        <ModelList
          models={serverStatus.models}
          onTestModel={handleTestModel}
          onLoadModel={handleLoadModel}
          onUnloadModel={handleUnloadModel}
          onViewModelDetails={handleViewModelDetails}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default React.memo(ProviderPanel);
