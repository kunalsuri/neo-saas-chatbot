/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useToast } from '@/shared/hooks/use-toast';
import { reportError, reportEvent, addBreadcrumb, measurePerformance } from '@/lib/errorReporting';

export function SentryTestPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState('generic');
  const [messageLevel, setMessageLevel] = useState('info');
  const [customMessage, setCustomMessage] = useState('Test message from client');
  const { toast } = useToast();

  // Only show in development
  if (import.meta.env.VITE_ENVIRONMENT !== 'development') {
    return null;
  }

  const testClientError = () => {
    try {
      addBreadcrumb('User triggered client error test', 'test');
      
      switch (errorType) {
        case 'validation':
          throw new Error('Test validation error from client');
        case 'network':
          throw new Error('Test network error from client');
        case 'permission':
          throw new Error('Test permission error from client');
        default:
          throw new Error('Test generic error from client');
      }
    } catch (error) {
      reportError(error as Error, {
        testType: 'client_error_test',
        errorType,
        timestamp: new Date().toISOString(),
      });
      
      toast({
        title: 'Error Test Sent',
        description: 'Check your Sentry dashboard for the error report.',
      });
    }
  };

  const testServerError = async () => {
    setIsLoading(true);
    try {
      addBreadcrumb('User triggered server error test', 'test');
      
      const response = await fetch('/api/sentry/test-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ errorType }),
      });

      if (!response.ok) {
        toast({
          title: 'Server Error Test Sent',
          description: 'Check your Sentry dashboard for the error report.',
        });
      }
    } catch (error) {
      reportError(error as Error, {
        testType: 'server_error_test',
        errorType,
      });
      
      toast({
        title: 'Server Error Test Sent',
        description: 'Check your Sentry dashboard for the error report.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testEvent = async () => {
    setIsLoading(true);
    try {
      addBreadcrumb('User triggered event test', 'test');
      
      const response = await fetch('/api/sentry/test-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        toast({
          title: 'Event Test Sent',
          description: 'Check your Sentry dashboard for the event.',
        });
      }
    } catch (error) {
      reportError(error as Error, {
        testType: 'event_test',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testPerformance = async () => {
    setIsLoading(true);
    try {
      addBreadcrumb('User triggered performance test', 'test');
      
      await measurePerformance('sentry_performance_test', async () => {
        const response = await fetch('/api/sentry/test-performance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        return response.json();
      });

      toast({
        title: 'Performance Test Sent',
        description: 'Check your Sentry dashboard for performance metrics.',
      });
    } catch (error) {
      reportError(error as Error, {
        testType: 'performance_test',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testMessage = () => {
    addBreadcrumb('User triggered message test', 'test');
    
    reportEvent(customMessage, messageLevel as any, {
      testType: 'client_message_test',
      timestamp: new Date().toISOString(),
    });

    toast({
      title: 'Message Test Sent',
      description: 'Check your Sentry dashboard for the message.',
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🐛 Sentry Error Monitoring Test Panel
        </CardTitle>
        <CardDescription>
          Test Sentry integration in development environment. These tests will send data to your Sentry project.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Error Type Selection */}
        <div className="space-y-2">
          <Label htmlFor="error-type">Error Type</Label>
          <Select value={errorType} onValueChange={setErrorType}>
            <SelectTrigger>
              <SelectValue placeholder="Select error type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="generic">Generic Error</SelectItem>
              <SelectItem value="validation">Validation Error</SelectItem>
              <SelectItem value="database">Database Error</SelectItem>
              <SelectItem value="api">API Error</SelectItem>
              <SelectItem value="network">Network Error</SelectItem>
              <SelectItem value="permission">Permission Error</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Error Test Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={testClientError}
            variant="destructive"
            disabled={isLoading}
          >
            Test Client Error
          </Button>
          <Button
            onClick={testServerError}
            variant="destructive"
            disabled={isLoading}
          >
            Test Server Error
          </Button>
        </div>

        {/* Event and Performance Tests */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={testEvent}
            variant="secondary"
            disabled={isLoading}
          >
            Test Event Capture
          </Button>
          <Button
            onClick={testPerformance}
            variant="secondary"
            disabled={isLoading}
          >
            Test Performance
          </Button>
        </div>

        {/* Custom Message Test */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="message-level">Message Level</Label>
              <Select value={messageLevel} onValueChange={setMessageLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-message">Custom Message</Label>
              <Input
                id="custom-message"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Enter test message"
              />
            </div>
          </div>
          <Button
            onClick={testMessage}
            variant="outline"
            disabled={isLoading || !customMessage.trim()}
            className="w-full"
          >
            Send Custom Message
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Instructions:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Configure SENTRY_DSN and VITE_SENTRY_DSN in your .env file</li>
            <li>Click any test button to send data to Sentry</li>
            <li>Check your Sentry dashboard to verify the data was received</li>
            <li>This panel only appears in development mode</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}