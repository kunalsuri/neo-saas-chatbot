/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Button } from '@/shared/components/ui/button';
import { 
  Server, 
  InfoIcon, 
  ExternalLink,
  Zap,
  Settings
} from 'lucide-react';
import { useAuthContext } from '@/features/auth';
import { useToast } from '@/shared/hooks/use-toast';
import { ProviderPanel } from './local';
import type { ProviderConfig } from '@/shared/types/model-management';

// Default configurations for each provider
const DEFAULT_CONFIGS: Record<'ollama' | 'lmstudio', ProviderConfig> = {
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

interface SetupInstructionsProps {
  readonly className?: string;
}

function SetupInstructions({ className }: SetupInstructionsProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <InfoIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Setup Instructions</h3>
            
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="space-y-1">
                <p className="font-medium text-foreground">Ollama:</p>
                <p>
                  Make sure Ollama is running with{' '}
                  <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                    ollama serve
                  </code>
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-xs"
                  onClick={() => window.open('https://ollama.ai', '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Visit Ollama.ai
                </Button>
              </div>
              
              <div className="space-y-1">
                <p className="font-medium text-foreground">LM Studio:</p>
                <p>Start the local server in LM Studio (default port 1234)</p>
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-xs"
                  onClick={() => window.open('https://lmstudio.ai', '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Visit LMStudio.ai
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LocalModelManagement() {
  const { checkAuth } = useAuthContext();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'ollama' | 'lmstudio'>('ollama');

  // Authentication check on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Model action handlers
  const handleTestModel = useCallback((providerId: string, modelId: string) => {
    toast({
      title: 'Model Test',
      description: `Testing model ${modelId} on ${providerId}...`,
    });
    
    // Implementation placeholder - integrate with actual API calls
  }, [toast]);

  const handleLoadModel = useCallback((providerId: string, modelId: string) => {
    toast({
      title: 'Loading Model',
      description: `Loading model ${modelId} on ${providerId}...`,
    });
    
    // Implementation placeholder - integrate with actual API calls
  }, [toast]);

  const handleUnloadModel = useCallback((providerId: string, modelId: string) => {
    toast({
      title: 'Unloading Model',
      description: `Unloading model ${modelId} from ${providerId}...`,
    });
    
    // Implementation placeholder - integrate with actual API calls
  }, [toast]);

  const handleViewModelDetails = useCallback((providerId: string, modelId: string) => {
    toast({
      title: 'Model Details',
      description: `Viewing details for model ${modelId} on ${providerId}`,
    });
    
    // Implementation placeholder - could open a modal or navigate to details page
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Local LLM Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage and monitor your local language models across Ollama and LM Studio
              </p>
            </div>
          </div>
          
          {/* Quick Stats / Status Indicators could go here in the future */}
        </div>

        {/* Main Content */}
        <div className="grid gap-8">
          {/* Provider Tabs */}
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as 'ollama' | 'lmstudio')}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="ollama" className="flex items-center gap-2">
                <Server className="w-4 h-4" />
                Ollama
              </TabsTrigger>
              <TabsTrigger value="lmstudio" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                LM Studio
              </TabsTrigger>
            </TabsList>

            {/* Ollama Panel */}
            <TabsContent value="ollama" className="space-y-6">
              <ProviderPanel
                providerId="ollama"
                initialConfig={DEFAULT_CONFIGS.ollama}
                onTestModel={(modelId: string) => handleTestModel('ollama', modelId)}
                onLoadModel={(modelId: string) => handleLoadModel('ollama', modelId)}
                onUnloadModel={(modelId: string) => handleUnloadModel('ollama', modelId)}
                onViewModelDetails={(modelId: string) => handleViewModelDetails('ollama', modelId)}
              />
            </TabsContent>

            {/* LM Studio Panel */}
            <TabsContent value="lmstudio" className="space-y-6">
              <ProviderPanel
                providerId="lmstudio"
                initialConfig={DEFAULT_CONFIGS.lmstudio}
                onTestModel={(modelId: string) => handleTestModel('lmstudio', modelId)}
                onLoadModel={(modelId: string) => handleLoadModel('lmstudio', modelId)}
                onUnloadModel={(modelId: string) => handleUnloadModel('lmstudio', modelId)}
                onViewModelDetails={(modelId: string) => handleViewModelDetails('lmstudio', modelId)}
              />
            </TabsContent>
          </Tabs>

          {/* Setup Instructions */}
          <SetupInstructions />

          {/* Future Enhancement: Global Actions/Settings Panel */}
          {/* This could include things like global model preferences, logging settings, etc. */}
        </div>
      </div>
    </div>
  );
}

export default LocalModelManagement;
