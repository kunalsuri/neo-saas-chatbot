/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import * as Sentry from '@sentry/react';

export function initializeSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (!dsn) {
    console.warn('⚠️  Sentry DSN not configured - error monitoring disabled');
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.VITE_ENVIRONMENT || 'development',
    integrations: [
      // Browser tracing integration
      Sentry.browserTracingIntegration(),
      // Replay integration for session recordings
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Performance monitoring
    tracesSampleRate: import.meta.env.VITE_ENVIRONMENT === 'production' ? 0.1 : 1.0,
    // Session replay
    replaysSessionSampleRate: import.meta.env.VITE_ENVIRONMENT === 'production' ? 0.1 : 1.0,
    replaysOnErrorSampleRate: 1.0,
    // Release tracking
    release: import.meta.env.VITE_APP_VERSION || '1.0.0',
    // Additional options
    beforeSend(event) {
      // Filter out development errors in production
      if (import.meta.env.VITE_ENVIRONMENT === 'development') {
        return event;
      }
      
      // Filter out known non-critical errors
      if (event.exception?.values?.[0]?.value?.includes('ResizeObserver loop limit exceeded')) {
        return null;
      }
      
      return event;
    },
    // Set initial scope
    initialScope: {
      tags: {
        component: 'client',
      },
    },
  });

  if (import.meta.env.VITE_ENVIRONMENT === 'development') {
    console.warn('✅ Sentry error monitoring initialized (client)');
  }
}

// Export Sentry for manual error reporting
export { Sentry };

// React Error Boundary component
export const SentryErrorBoundary = Sentry.ErrorBoundary;