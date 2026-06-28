/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

// AI agents: See /AI-PROJECT-MANIFEST.md for complete project context
// Initialize Sentry first, before any other imports
import { initializeSentry, Sentry } from "./shared/config/sentry";
initializeSentry();

import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, logMessage } from "./vite";
import { globalErrorHandler, notFoundHandler, requestIdMiddleware } from "./shared/middleware/errorHandler";
import { requestLoggingMiddleware, performanceLoggingMiddleware } from "./shared/middleware/logging";
import { featureAvailabilityMiddleware, environmentSecurityMiddleware, serviceAvailabilityMiddleware, createHealthCheckHandler } from "./shared/middleware/environment";
import { log as logger } from "./shared/utils/logger";
import { config, validateConfiguration } from "./shared/config/environment";

const app = express();

// Sentry request handler is automatically set up by the integration

// Validate environment configuration on startup
const configValidation = validateConfiguration();
if (!configValidation.isValid) {
  console.error('❌ Server configuration validation failed:');
  configValidation.errors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
}

if (configValidation.warnings.length > 0) {
  console.warn('⚠️  Server configuration warnings:');
  configValidation.warnings.forEach(warning => console.warn(`  - ${warning}`));
}

// Add environment security headers
app.use(environmentSecurityMiddleware());

// Add request ID middleware for error tracking
app.use(requestIdMiddleware);

// Add feature availability context
app.use(featureAvailabilityMiddleware());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add structured logging middleware
app.use(requestLoggingMiddleware);
app.use(performanceLoggingMiddleware);

// Add service availability checks
app.use(serviceAvailabilityMiddleware());

// Health check endpoint
app.get('/health', createHealthCheckHandler());

(async () => {
  const server = await registerRoutes(app);

  // Sentry error handler (must be before other error handlers)
  app.use(Sentry.expressErrorHandler());
  
  // Global error handler
  app.use(globalErrorHandler);
  
  // 404 handler
  app.use(notFoundHandler);

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Use validated configuration.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = config.port;
  const host = config.isDevelopment ? "127.0.0.1" : "0.0.0.0";
  
  server.listen(port, host, () => {
    logger.info(`Server started successfully`, { port, host, environment: config.nodeEnv });
    logMessage(`serving on port ${port}`);
  }).on('error', (err: Error & { code?: string }) => {
    if (err.code === 'EADDRINUSE') {
      logger.error(`Port ${port} is already in use`);
      process.exit(1);
    } else {
      logger.error('Server failed to start', { error: err.message, code: err.code });
      throw err;
    }
  });
})();
