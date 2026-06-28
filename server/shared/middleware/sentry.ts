/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { Request, Response, NextFunction } from 'express';
import { Sentry } from '../config/sentry';
import { config } from '../config/environment';

/**
 * Middleware to add user context to Sentry
 */
export function sentryUserContext(req: Request, res: Response, next: NextFunction) {
  if (!config.sentry.isConfigured) {
    return next();
  }

  // Add user context if available
  if (req.session?.user) {
    Sentry.setUser({
      id: req.session.user.id,
      username: req.session.user.username,
      email: req.session.user.email,
    });
  }

  // Add request context
  Sentry.setTag('route', req.route?.path || req.path);
  Sentry.setTag('method', req.method);
  
  // Add custom context
  Sentry.setContext('request', {
    url: req.url,
    method: req.method,
    headers: {
      'user-agent': req.get('user-agent'),
      'content-type': req.get('content-type'),
    },
    query: req.query,
  });

  next();
}

/**
 * Middleware to capture API errors with additional context
 */
export function sentryApiErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if (!config.sentry.isConfigured) {
    return next(error);
  }

  // Add additional context for API errors
  Sentry.withScope((scope) => {
    scope.setTag('error_type', 'api_error');
    scope.setLevel('error');
    
    // Add request details
    scope.setContext('api_request', {
      endpoint: req.path,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
    });

    // Add user context if available
    if (req.session?.user) {
      scope.setUser({
        id: req.session.user.id,
        username: req.session.user.username,
        email: req.session.user.email,
      });
    }

    Sentry.captureException(error);
  });

  next(error);
}

/**
 * Capture custom events for business logic monitoring
 */
export function captureBusinessEvent(
  event: string,
  data: Record<string, any>,
  user?: { id: string; username: string; email: string }
) {
  if (!config.sentry.isConfigured) {
    return;
  }

  Sentry.withScope((scope) => {
    scope.setTag('event_type', 'business_event');
    scope.setLevel('info');
    
    if (user) {
      scope.setUser(user);
    }
    
    scope.setContext('business_data', data);
    
    Sentry.captureMessage(event, 'info');
  });
}

/**
 * Capture performance metrics
 */
export function capturePerformanceMetric(
  metric: string,
  value: number,
  unit: string = 'ms',
  tags: Record<string, string> = {}
) {
  if (!config.sentry.isConfigured) {
    return;
  }

  Sentry.withScope((scope) => {
    scope.setTag('metric_type', 'performance');
    Object.entries(tags).forEach(([key, value]) => {
      scope.setTag(key, value);
    });
    
    scope.setContext('performance_metric', {
      name: metric,
      value,
      unit,
    });
    
    Sentry.captureMessage(`Performance: ${metric} = ${value}${unit}`, 'info');
  });
}