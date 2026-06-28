/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { Router } from 'express';
import { Sentry } from '../../../shared/config/sentry';
import { captureBusinessEvent, capturePerformanceMetric } from '../../../shared/middleware/sentry';
import { requireAuth } from '../../../shared/middleware/auth';
import { asyncHandler } from '../../../shared/middleware/errorHandler';

const router = Router();

// Test endpoint to verify Sentry error capture
router.post('/test-error', requireAuth, asyncHandler(async (req, res) => {
  const { errorType = 'generic' } = req.body;
  
  switch (errorType) {
    case 'validation':
      throw new Error('Test validation error for Sentry monitoring');
    
    case 'database': {
      const dbError = new Error('Test database connection error');
      dbError.name = 'DatabaseError';
      throw dbError;
    }
    
    case 'api': {
      const apiError = new Error('Test external API error');
      apiError.name = 'ExternalAPIError';
      throw apiError;
    }
    
    default:
      throw new Error('Test generic error for Sentry monitoring');
  }
}));

// Test endpoint to verify Sentry event capture
router.post('/test-event', requireAuth, asyncHandler(async (req, res) => {
  const user = req.session?.user;
  
  if (user) {
    captureBusinessEvent('Sentry test event triggered', {
      testType: 'manual_test',
      userId: user.id,
      timestamp: new Date().toISOString(),
      userAgent: req.get('user-agent'),
    }, user);
  }
  
  res.json({
    success: true,
    message: 'Test event sent to Sentry',
    timestamp: new Date().toISOString()
  });
}));

// Test endpoint to verify performance monitoring
router.post('/test-performance', requireAuth, asyncHandler(async (req, res) => {
  const startTime = Date.now();
  
  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
  
  const duration = Date.now() - startTime;
  
  capturePerformanceMetric('test_operation', duration, 'ms', {
    operation_type: 'manual_test',
    user_id: req.session?.user?.id || 'unknown',
  });
  
  res.json({
    success: true,
    message: 'Performance metric sent to Sentry',
    duration,
    timestamp: new Date().toISOString()
  });
}));

// Test endpoint to verify Sentry message capture
router.post('/test-message', requireAuth, asyncHandler(async (req, res) => {
  const { level = 'info', message = 'Test message from Sentry monitoring' } = req.body;
  
  Sentry.withScope((scope) => {
    scope.setTag('test_type', 'manual_message');
    scope.setLevel(level as any);
    
    if (req.session?.user) {
      scope.setUser({
        id: req.session.user.id,
        username: req.session.user.username,
        email: req.session.user.email,
      });
    }
    
    scope.setContext('test_context', {
      endpoint: '/test-message',
      timestamp: new Date().toISOString(),
      userAgent: req.get('user-agent'),
    });
    
    Sentry.captureMessage(message, level as any);
  });
  
  res.json({
    success: true,
    message: 'Test message sent to Sentry',
    level,
    timestamp: new Date().toISOString()
  });
}));

export default router;