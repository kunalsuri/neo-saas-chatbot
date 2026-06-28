/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { vi } from 'vitest';

// Virtual memory-based file system to intercept and isolate data storage
export const mockFiles: Record<string, string> = {};

vi.mock('fs/promises', () => {
  return {
    default: {
      readFile: vi.fn().mockImplementation(async (filePath: string) => {
        const normalized = filePath.replace(/\\/g, '/');
        // Let's support relative path keys in our mock dictionary
        const key = normalized.startsWith('./') ? normalized.slice(2) : normalized;
        if (mockFiles[key] !== undefined) {
          return mockFiles[key];
        }
        throw new Error(`ENOENT: no such file or directory, open '${filePath}'`);
      }),
      writeFile: vi.fn().mockImplementation(async (filePath: string, data: string) => {
        const normalized = filePath.replace(/\\/g, '/');
        const key = normalized.startsWith('./') ? normalized.slice(2) : normalized;
        mockFiles[key] = data;
        return undefined;
      }),
      mkdir: vi.fn().mockResolvedValue(undefined),
    },
  };
});

import express from 'express';
import { registerRoutes } from '../../server/routes';
import { globalErrorHandler, notFoundHandler, requestIdMiddleware } from '../../server/shared/middleware/errorHandler';
import { requestLoggingMiddleware, performanceLoggingMiddleware } from '../../server/shared/middleware/logging';
import { featureAvailabilityMiddleware, environmentSecurityMiddleware, serviceAvailabilityMiddleware, createHealthCheckHandler } from '../../server/shared/middleware/environment';

export function createTestApp() {
  const app = express();

  // Apply base middlewares
  app.use(environmentSecurityMiddleware());
  app.use(requestIdMiddleware);
  app.use(featureAvailabilityMiddleware());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(requestLoggingMiddleware);
  app.use(performanceLoggingMiddleware);

  app.use(serviceAvailabilityMiddleware());

  // Health endpoint
  app.get('/health', createHealthCheckHandler());

  // Register main feature routes
  registerRoutes(app);

  // Error handling
  app.use(globalErrorHandler);
  app.use(notFoundHandler);

  return app;
}
