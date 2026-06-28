/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { describe, it, expect } from 'vitest';
import {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  ExternalServiceError,
  DatabaseError,
  isAppError,
  isOperationalError,
  isExternalServiceError,
  getErrorSeverity,
  getErrorCategory,
  isRetryableError,
  createValidationError,
  createNotFoundError,
  createAuthError,
  createExternalServiceError,
  createStandardError,
} from '../../server/shared/utils/errors';

describe('Error Handling Utilities', () => {
  describe('Custom Error Classes', () => {
    it('should correctly initialize AppError', () => {
      const error = new AppError('Operational failure', 400, 'ERR_CODE', { field: 'username' });
      expect(error.message).toBe('Operational failure');
      expect(error.statusCode).toBe(400);
      expect(error.code).toBe('ERR_CODE');
      expect(error.details).toEqual({ field: 'username' });
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe('AppError');
    });

    it('should correctly initialize ValidationError', () => {
      const error = new ValidationError('Invalid request body', { field: 'email' });
      expect(error.statusCode).toBe(400);
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.details).toEqual({ field: 'email' });
    });

    it('should correctly initialize AuthenticationError', () => {
      const error = new AuthenticationError();
      expect(error.statusCode).toBe(401);
      expect(error.code).toBe('AUTHENTICATION_ERROR');
      expect(error.message).toBe('Authentication required');
    });

    it('should correctly initialize AuthorizationError', () => {
      const error = new AuthorizationError();
      expect(error.statusCode).toBe(403);
      expect(error.code).toBe('AUTHORIZATION_ERROR');
      expect(error.message).toBe('Insufficient permissions');
    });

    it('should correctly initialize NotFoundError', () => {
      const error = new NotFoundError('User');
      expect(error.statusCode).toBe(404);
      expect(error.code).toBe('NOT_FOUND_ERROR');
      expect(error.message).toBe('User not found');
    });

    it('should correctly initialize ConflictError', () => {
      const error = new ConflictError('Username already exists');
      expect(error.statusCode).toBe(409);
      expect(error.code).toBe('CONFLICT_ERROR');
    });

    it('should correctly initialize RateLimitError', () => {
      const error = new RateLimitError();
      expect(error.statusCode).toBe(429);
      expect(error.code).toBe('RATE_LIMIT_ERROR');
    });

    it('should correctly initialize ExternalServiceError', () => {
      const error = new ExternalServiceError('OpenAI Timeout', 'OpenAI', { timeout: true });
      expect(error.statusCode).toBe(503);
      expect(error.code).toBe('EXTERNAL_SERVICE_ERROR');
      expect(error.service).toBe('OpenAI');
      expect(error.details).toEqual({ timeout: true });
    });

    it('should correctly initialize DatabaseError', () => {
      const error = new DatabaseError('Connection failed', { db: 'postgresql' });
      expect(error.statusCode).toBe(500);
      expect(error.code).toBe('DATABASE_ERROR');
      expect(error.message).toBe('Database error: Connection failed');
    });
  });

  describe('Error Guards', () => {
    it('isAppError should check if error is an AppError instance', () => {
      expect(isAppError(new AppError('msg'))).toBe(true);
      expect(isAppError(new ValidationError('msg'))).toBe(true);
      expect(isAppError(new Error('msg'))).toBe(false);
      expect(isAppError(null)).toBe(false);
    });

    it('isOperationalError should verify operational status', () => {
      const opError = new AppError('msg', 500, 'ERR', null, true);
      const nonOpError = new AppError('msg', 500, 'ERR', null, false);
      expect(isOperationalError(opError)).toBe(true);
      expect(isOperationalError(nonOpError)).toBe(false);
      expect(isOperationalError(new Error('msg'))).toBe(false);
    });

    it('isExternalServiceError should check if error is an ExternalServiceError instance', () => {
      expect(isExternalServiceError(new ExternalServiceError('msg', 'service'))).toBe(true);
      expect(isExternalServiceError(new ValidationError('msg'))).toBe(false);
    });
  });

  describe('Error Severity', () => {
    it('should return correct severity based on statusCode or property', () => {
      const lowErr = createStandardError('msg', 400, 'ERR', 'validation', 'low');
      expect(getErrorSeverity(lowErr)).toBe('low');

      expect(getErrorSeverity(new AppError('msg', 500))).toBe('critical');
      expect(getErrorSeverity(new AppError('msg', 400))).toBe('high');
      expect(getErrorSeverity(new AppError('msg', 302))).toBe('medium');
      expect(getErrorSeverity(new Error('standard error'))).toBe('medium');
    });
  });

  describe('Error Category', () => {
    it('should return correct category from mapping or custom metadata', () => {
      expect(getErrorCategory(new ValidationError('msg'))).toBe('validation');
      expect(getErrorCategory(new AuthenticationError())).toBe('authentication');
      expect(getErrorCategory(new AuthorizationError())).toBe('authorization');
      expect(getErrorCategory(new NotFoundError())).toBe('not_found');
      expect(getErrorCategory(new ConflictError('msg'))).toBe('conflict');
      expect(getErrorCategory(new RateLimitError())).toBe('rate_limit');
      expect(getErrorCategory(new ExternalServiceError('msg', 'serv'))).toBe('external_service');
      expect(getErrorCategory(new DatabaseError('msg'))).toBe('database');
      expect(getErrorCategory(new Error('standard'))).toBe('internal');

      const customCat = createStandardError('msg', 400, 'ERR', 'billing_management' as any);
      expect(getErrorCategory(customCat)).toBe('billing_management');
    });
  });

  describe('Retryable Status', () => {
    it('should return correct retryable flag', () => {
      expect(isRetryableError(new AppError('msg', 500))).toBe(true);
      expect(isRetryableError(new RateLimitError())).toBe(true);
      expect(isRetryableError(new ExternalServiceError('msg', 'serv'))).toBe(true);
      expect(isRetryableError(new ValidationError('msg'))).toBe(false);

      const forceNoRetry = createStandardError('msg', 500, 'ERR', 'internal', 'high', false);
      expect(isRetryableError(forceNoRetry)).toBe(false);
    });
  });

  describe('Error Factory Functions', () => {
    it('should generate error instances correctly', () => {
      expect(createValidationError('msg')).toBeInstanceOf(ValidationError);
      expect(createNotFoundError('Resource')).toBeInstanceOf(NotFoundError);
      expect(createAuthError('msg')).toBeInstanceOf(AuthenticationError);
      expect(createExternalServiceError('msg', 'serv')).toBeInstanceOf(ExternalServiceError);
    });
  });
});
