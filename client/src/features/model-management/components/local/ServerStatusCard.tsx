/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { 
  Server, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Clock,
  Zap,
  Loader2
} from 'lucide-react';
import type { ServerStatus, ConnectionStatus, ProviderType } from '@/shared/types/model-management';
import { 
  cn, 
  getConnectionState, 
  getConnectionStatusVariant, 
  getLatencyColor,
  formatDate 
} from '../../utils';

interface ServerStatusCardProps {
  readonly title: string;
  readonly provider: ProviderType;
  readonly serverStatus: ServerStatus;
  readonly connectionStatus: ConnectionStatus;
  readonly healthCheckEnabled: boolean;
  readonly onRefresh: () => void;
  readonly onRetry?: () => void;
  readonly isLoading?: boolean;
  readonly className?: string;
}

function ServerStatusCard({
  title,
  provider,
  serverStatus,
  connectionStatus,
  healthCheckEnabled,
  onRefresh,
  onRetry,
  isLoading = false,
  className
}: ServerStatusCardProps) {
  const connectionState = getConnectionState(
    serverStatus.connected,
    serverStatus.health?.isOnline,
    connectionStatus.isConnecting,
    serverStatus.error
  );

  const shouldShowRetry = connectionStatus.retryCount > 0 && 
                         connectionStatus.retryCount < connectionStatus.maxRetries &&
                         onRetry;

  function handleRefresh() {
    if (!isLoading && !connectionStatus.isConnecting) {
      onRefresh();
    }
  }

  function handleRetry() {
    if (onRetry && !connectionStatus.isConnecting) {
      onRetry();
    }
  }

  return (
    <Card className={cn('transition-all duration-200', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <Server className="w-5 h-5 text-muted-foreground" />
            <span>{title}</span>
            {healthCheckEnabled && (
              <Badge 
                variant={getConnectionStatusVariant(connectionState)}
                className="flex items-center gap-1"
              >
                {connectionState === 'connected' && <CheckCircle className="w-3 h-3" />}
                {connectionState === 'disconnected' && <XCircle className="w-3 h-3" />}
                {connectionState === 'connecting' && <Loader2 className="w-3 h-3 animate-spin" />}
                {connectionState === 'error' && <AlertTriangle className="w-3 h-3" />}
                {(() => {
                  switch (connectionState) {
                    case 'connecting': return 'Connecting';
                    case 'connected': return 'Online';
                    case 'error': return 'Error';
                    default: return 'Offline';
                  }
                })()}
              </Badge>
            )}
          </CardTitle>
          
          <div className="flex items-center gap-2">
            {shouldShowRetry && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleRetry}
                disabled={connectionStatus.isConnecting}
                className="text-xs"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Retry ({connectionStatus.retryCount}/{connectionStatus.maxRetries})
              </Button>
            )}
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading || connectionStatus.isConnecting}
              className="flex items-center gap-2"
            >
              <RefreshCw className={cn(
                "w-4 h-4",
                (isLoading || connectionStatus.isConnecting) && "animate-spin"
              )} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Health Check Disabled Warning */}
        {!healthCheckEnabled && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Health checks are disabled for {provider === 'lmstudio' ? 'LM Studio' : 'Ollama'}. 
              Enable in configuration to see real-time connection status.
            </AlertDescription>
          </Alert>
        )}

        {/* Connection Error */}
        {healthCheckEnabled && serverStatus.error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{serverStatus.error}</AlertDescription>
          </Alert>
        )}

        {/* Server Health Info */}
        {healthCheckEnabled && serverStatus.health && !serverStatus.error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Zap className={cn("w-4 h-4", getLatencyColor(serverStatus.health.latency))} />
              <span className="text-sm">
                Latency: {serverStatus.health.latency ? `${serverStatus.health.latency}ms` : 'N/A'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                Last checked: {formatDate(serverStatus.health.lastChecked, { relative: true })}
              </span>
            </div>
            
            {serverStatus.health.version && (
              <div className="sm:col-span-2">
                <span className="text-sm text-muted-foreground">
                  Version: {serverStatus.health.version}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Connection Status (when connecting) */}
        {connectionStatus.isConnecting && (
          <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span className="text-sm text-primary">
              Connecting to {provider === 'lmstudio' ? 'LM Studio' : 'Ollama'} server...
            </span>
          </div>
        )}

        {/* Retry Information */}
        {connectionStatus.lastRetry && connectionStatus.retryCount > 0 && (
          <div className="text-xs text-muted-foreground">
            Last retry: {formatDate(connectionStatus.lastRetry, { relative: true })} 
            ({connectionStatus.retryCount} attempt{connectionStatus.retryCount !== 1 ? 's' : ''})
          </div>
        )}

        {/* Models Count */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Available Models:</span>
          <Badge variant="outline" className="text-xs">
            {serverStatus.models.length} model{serverStatus.models.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default React.memo(ServerStatusCard);
