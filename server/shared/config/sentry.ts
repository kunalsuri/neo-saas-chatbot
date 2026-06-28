/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import * as Sentry from '@sentry/node';
import { config } from './environment';

export function initializeSentry() {
  if (!config.sentry?.dsn) {
    console.warn('⚠️  Sentry DSN not configured - error monitoring disabled');
    return;
  }

  Sentry.init({
    dsn: config.sentry.dsn,
    environment: config.nodeEnv,
    integrations: [
      // Add HTTP integration for Express
      Sentry.httpIntegration(),
      // Add Express integration
      Sentry.expressIntegration(),
    ],
    // Performance monitoring
    tracesSampleRate: config.nodeEnv === 'production' ? 0.1 : 1.0,
    // Release tracking
    release: process.env.npm_package_version || '1.0.0',
    // Additional options
    beforeSend(event) {
      // Filter out sensitive data
      if (event.request?.headers) {
        delete event.request.headers.authorization;
        delete event.request.headers.cookie;
      }
      return event;
    },
    // Set user context
    initialScope: {
      tags: {
        component: 'server',
      },
    },
  });

  console.log('✅ Sentry error monitoring initialized');
}

export { Sentry };