/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import { Slider } from '@/shared/components/ui/slider';
import { Badge } from '@/shared/components/ui/badge';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  TestTube, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import type { ProviderConfig, ProviderType } from '@/shared/types/model-management';
import { useProviderConfig } from '../../hooks';
import { cn } from '../../utils';

interface ConfigurationPanelProps {
  readonly providerId: ProviderType;
  readonly onConfigChange?: (config: ProviderConfig) => void;
  readonly onTestConnection?: () => Promise<boolean>;
  readonly className?: string;
}

function ConfigurationPanel({
  providerId,
  onConfigChange,
  onTestConnection,
  className
}: ConfigurationPanelProps) {
  const {
    config,
    updateConfig,
    resetConfig,
    isValid,
    validationErrors,
    isDirty,
    saveConfig
  } = useProviderConfig({ 
    providerId,
    ...(onConfigChange && { onConfigChange })
  });

  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  async function handleTestConnection() {
    if (!onTestConnection || isTestingConnection) return;

    setIsTestingConnection(true);
    setTestResult(null);

    try {
      const success = await onTestConnection();
      const providerDisplayName = providerId === 'lmstudio' ? 'LM Studio' : 'Ollama';
      setTestResult({
        success,
        message: success 
          ? `Successfully connected to ${providerDisplayName}`
          : 'Connection failed. Please check your configuration.'
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Connection test failed'
      });
    } finally {
      setIsTestingConnection(false);
    }
  }

  async function handleSave() {
    await saveConfig();
  }

  function handleReset() {
    resetConfig();
    setTestResult(null);
  }

  const providerName = providerId === 'lmstudio' ? 'LM Studio' : 'Ollama';
  const defaultPort = providerId === 'lmstudio' ? '1234' : '11434';

  return (
    <Card className={cn('transition-all duration-200', className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            <span>{providerName} Configuration</span>
            {isDirty && (
              <Badge variant="secondary" className="text-xs">
                Unsaved changes
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {isDirty && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReset}
                  className="text-xs"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!isValid}
                >
                  <Save className="w-3 h-3 mr-1" />
                  Save
                </Button>
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1">
                {validationErrors.map((error: string) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Connection Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Connection Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="baseUrl">Base URL</Label>
              <Input
                id="baseUrl"
                type="url"
                value={config.baseUrl}
                onChange={(e) => updateConfig({ baseUrl: e.target.value })}
                placeholder={`http://localhost:${defaultPort}`}
                className={!isValid && config.baseUrl ? 'border-destructive' : ''}
              />
              <p className="text-xs text-muted-foreground">
                Default: http://localhost:{defaultPort}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeout">Timeout (ms)</Label>
              <Input
                id="timeout"
                type="number"
                min="1000"
                max="60000"
                step="1000"
                value={config.timeout}
                onChange={(e) => updateConfig({ timeout: parseInt(e.target.value) || 15000 })}
              />
              <p className="text-xs text-muted-foreground">
                Connection timeout in milliseconds
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="healthCheck">Health Checks</Label>
              <p className="text-xs text-muted-foreground">
                Enable automatic connection monitoring
              </p>
            </div>
            <Switch
              id="healthCheck"
              checked={config.healthCheckEnabled}
              onCheckedChange={(checked) => updateConfig({ healthCheckEnabled: checked })}
            />
          </div>
        </div>

        {/* Model Settings */}
        {config.model !== undefined && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Model Settings</h3>
            
            <div className="space-y-2">
              <Label htmlFor="model">Default Model</Label>
              <Input
                id="model"
                value={config.model}
                onChange={(e) => updateConfig({ model: e.target.value })}
                placeholder="Enter model name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Temperature: {config.temperature}</Label>
                <Slider
                  value={[config.temperature || 0.7]}
                  onValueChange={([value]) => updateConfig({ temperature: value || 0.7 })}
                  min={0}
                  max={2}
                  step={0.1}
                  className="py-2"
                />
                <p className="text-xs text-muted-foreground">
                  Controls randomness (0 = deterministic, 2 = very random)
                </p>
              </div>

              <div className="space-y-2">
                <Label>Top P: {config.topP}</Label>
                <Slider
                  value={[config.topP || 0.9]}
                  onValueChange={([value]) => updateConfig({ topP: value || 0.9 })}
                  min={0}
                  max={1}
                  step={0.05}
                  className="py-2"
                />
                <p className="text-xs text-muted-foreground">
                  Controls diversity of responses
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxTokens">Max Tokens</Label>
              <Input
                id="maxTokens"
                type="number"
                min="1"
                max="4096"
                value={config.maxTokens}
                onChange={(e) => updateConfig({ maxTokens: parseInt(e.target.value) || 200 })}
              />
              <p className="text-xs text-muted-foreground">
                Maximum number of tokens to generate
              </p>
            </div>
          </div>
        )}

        {/* Connection Test */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Connection Test</h3>
              <p className="text-xs text-muted-foreground">
                Test the connection to {providerName}
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={handleTestConnection}
              disabled={!isValid || isTestingConnection || !onTestConnection}
              className="flex items-center gap-2"
            >
              {isTestingConnection ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <TestTube className="w-4 h-4" />
              )}
              {isTestingConnection ? 'Testing...' : 'Test Connection'}
            </Button>
          </div>

          {testResult && (
            <Alert 
              variant={testResult.success ? 'default' : 'destructive'} 
              className="mt-3"
            >
              {testResult.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertDescription>{testResult.message}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default React.memo(ConfigurationPanel);
