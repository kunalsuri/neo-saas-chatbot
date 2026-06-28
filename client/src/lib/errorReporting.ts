/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { Sentry } from './sentry';

/**
 * Report an error to Sentry with additional context
 */
export function reportError(error: Error, context?: Record<string, any>) {
  if (import.meta.env.VITE_ENVIRONMENT === 'development') {
    console.error('Error reported:', error, context);
  }

  Sentry.withScope((scope) => {
    if (context) {
      scope.setContext('additional_info', context);
    }
    Sentry.captureException(error);
  });
}

/**
 * Report a custom event for business logic monitoring
 */
export function reportEvent(
  message: string,
  level: 'info' | 'warning' | 'error' = 'info',
  context?: Record<string, any>
) {
  if (import.meta.env.VITE_ENVIRONMENT === 'development') {
    console.warn(`Event reported [${level}]:`, message, context);
  }

  Sentry.withScope((scope) => {
    scope.setLevel(level);
    if (context) {
      scope.setContext('event_context', context);
    }
    Sentry.captureMessage(message, level);
  });
}

/**
 * Set user context for error reporting
 */
export function setUserContext(user: {
  id: string;
  username: string;
  email: string;
  plan?: string;
}) {
  Sentry.setUser({
    id: user.id,
    username: user.username,
    email: user.email,
    plan: user.plan,
  });
}

/**
 * Clear user context (on logout)
 */
export function clearUserContext() {
  Sentry.setUser(null);
}

/**
 * Add breadcrumb for user actions
 */
export function addBreadcrumb(
  message: string,
  category: string = 'user_action',
  data?: Record<string, any>
) {
  Sentry.addBreadcrumb({
    message,
    category,
    level: 'info',
    data: data || {},
    timestamp: Date.now() / 1000,
  });
}

/**
 * Performance monitoring helper
 */
export function measurePerformance<T>(
  name: string,
  fn: () => T | Promise<T>
): T | Promise<T> {
  const startTime = performance.now();
  
  try {
    const result = fn();
    
    if (result instanceof Promise) {
      return result.finally(() => {
        const duration = performance.now() - startTime;
        reportEvent(`Performance: ${name}`, 'info', {
          duration: Math.round(duration),
          unit: 'ms',
        });
      });
    } else {
      const duration = performance.now() - startTime;
      reportEvent(`Performance: ${name}`, 'info', {
        duration: Math.round(duration),
        unit: 'ms',
      });
      return result;
    }
  } catch (error) {
    const duration = performance.now() - startTime;
    reportError(error as Error, {
      operation: name,
      duration: Math.round(duration),
    });
    throw error;
  }
}