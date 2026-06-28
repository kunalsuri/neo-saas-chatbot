/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

// @vitest-environment node

import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';

// Mock the environment config to simulate a production environment
vi.mock('../../server/shared/config/environment', async (importOriginal) => {
  const original = await importOriginal<any>();
  return {
    ...original,
    config: {
      ...original.config,
      isProduction: true,
      nodeEnv: 'production',
      security: {
        ...original.config.security,
        isSecure: true,
        hasStrongSessionSecret: true,
      },
    },
  };
});

import { createTestApp } from '../helpers/testApp';

describe('Server Health and Middlewares', () => {
  const app = createTestApp();

  describe('GET /health', () => {
    it('should return a healthy status with server details', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('environment');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('features');
      expect(response.body).toHaveProperty('services');
      expect(response.body.environment).toBe('production');
    });
  });

  describe('Security Headers Middleware', () => {
    it('should apply production security headers to responses', async () => {
      const response = await request(app).get('/health');
      
      expect(response.headers).toHaveProperty('x-environment');
      expect(response.headers['x-environment']).toBe('production');

      expect(response.headers).toHaveProperty('x-content-type-options');
      expect(response.headers['x-content-type-options']).toBe('nosniff');

      expect(response.headers).toHaveProperty('x-frame-options');
      expect(response.headers['x-frame-options']).toBe('DENY');
    });
  });

  describe('404 Not Found Handler', () => {
    it('should return JSON error response for unmatched api endpoints on POST requests', async () => {
      const response = await request(app)
        .post('/api/invalid-endpoint-path')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        error: 'Route POST /api/invalid-endpoint-path not found',
        timestamp: expect.any(String),
        code: 'NOT_FOUND',
        severity: 'low',
        category: 'not_found',
        retryable: false,
        requestId: expect.any(String),
        path: '/api/invalid-endpoint-path',
      });
    });
  });
});
