# Sentry Error Monitoring Setup

This project uses Sentry for server-side and client-side error monitoring and performance tracking.

## Quick Start

1. **Configure Sentry DSN**:
   Run the setup script:
   ```bash
   npm run setup:sentry
   ```
   This will prompt you for your Sentry DSNs and configure them in `.env`.

2. **Verify Setup**:
   Run the verification script:
   ```bash
   node scripts/verify-sentry.js
   ```

3. **Check Detailed Documentation**:
   For complete details on the architecture, usage examples, and features of the Sentry integration, refer to [docs/ERROR_MONITORING.md](docs/ERROR_MONITORING.md).
