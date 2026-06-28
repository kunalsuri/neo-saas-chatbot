# Error Monitoring with Sentry

This document explains how error monitoring is implemented in the SaaS AI ChatBot platform using Sentry.

## 🚀 Quick Setup

### 1. Create Sentry Project

1. Go to [sentry.io](https://sentry.io) and create an account
2. Create a new project for your application
3. Choose "React" for frontend and "Node.js" for backend
4. Copy the DSN from your project settings

### 2. Environment Configuration

Add the following to your environment files:

**Development (.env)**
```bash
# Optional in development
SENTRY_DSN=https://your-dev-sentry-dsn@sentry.io/project-id
VITE_SENTRY_DSN=https://your-dev-sentry-dsn@sentry.io/project-id
```

**Production (.env.production)**
```bash
# Recommended in production
SENTRY_DSN=https://your-prod-sentry-dsn@sentry.io/project-id
VITE_SENTRY_DSN=https://your-prod-sentry-dsn@sentry.io/project-id
```

### 3. Verify Installation

Start your application and trigger an error to verify Sentry is working:

```javascript
// In browser console or component
throw new Error("Test error for Sentry");
```

## 📊 Features Implemented

### Server-Side Monitoring

- **Automatic Error Capture**: All unhandled exceptions are captured
- **Performance Monitoring**: Request tracing and performance metrics
- **User Context**: Automatic user information attachment
- **Request Context**: Full request details for debugging
- **Custom Events**: Business logic monitoring

### Client-Side Monitoring

- **React Error Boundaries**: Graceful error handling with fallback UI
- **Session Replay**: Visual reproduction of user sessions (on errors)
- **Performance Monitoring**: Component render times and interactions
- **User Actions**: Breadcrumb trail of user interactions
- **Custom Error Reporting**: Manual error reporting with context

## 🛠 Usage Examples

### Manual Error Reporting (Client)

```typescript
import { reportError, reportEvent, addBreadcrumb } from '@/lib/errorReporting';

// Report an error with context
try {
  await riskyOperation();
} catch (error) {
  reportError(error, {
    operation: 'riskyOperation',
    userId: user.id,
    additionalData: { foo: 'bar' }
  });
}

// Report a business event
reportEvent('User completed onboarding', 'info', {
  userId: user.id,
  plan: user.plan,
  completionTime: Date.now()
});

// Add breadcrumb for user actions
addBreadcrumb('User clicked generate button', 'user_action', {
  buttonId: 'generate-content',
  page: '/ai-chatbot'
});
```

### Manual Error Reporting (Server)

```typescript
import { captureBusinessEvent, capturePerformanceMetric } from '../shared/middleware/sentry';

// Capture business events
captureBusinessEvent('User upgraded plan', {
  userId: user.id,
  fromPlan: 'free',
  toPlan: 'pro',
  revenue: 29.99
}, user);

// Capture performance metrics
capturePerformanceMetric('ai_response_time', responseTime, 'ms', {
  model: 'gpt-4',
  provider: 'openai'
});
```

### Setting User Context

```typescript
import { setUserContext, clearUserContext } from '@/lib/errorReporting';

// On login
setUserContext({
  id: user.id,
  username: user.username,
  email: user.email,
  plan: user.plan
});

// On logout
clearUserContext();
```

## 🔧 Configuration Options

### Server Configuration

Located in `server/shared/config/sentry.ts`:

- **Environment**: Automatically set based on NODE_ENV
- **Sample Rates**: 10% in production, 100% in development
- **Data Filtering**: Removes sensitive headers and data
- **Integrations**: Express, HTTP, and Profiling

### Client Configuration

Located in `client/src/lib/sentry.ts`:

- **Session Replay**: Captures user sessions on errors
- **Performance Monitoring**: Tracks component performance
- **Error Filtering**: Filters out known non-critical errors
- **React Integration**: Deep React component error tracking

## 📈 Monitoring Best Practices

### 1. Error Categorization

Use tags to categorize errors:

```typescript
Sentry.withScope((scope) => {
  scope.setTag('error_type', 'validation_error');
  scope.setTag('component', 'user_registration');
  Sentry.captureException(error);
});
```

### 2. Performance Monitoring

Track key business metrics:

```typescript
// Track AI response times
capturePerformanceMetric('ai_chat_response', responseTime, 'ms', {
  model: modelName,
  provider: providerName,
  success: 'true'
});

// Track user engagement
reportEvent('Feature used', 'info', {
  feature: 'ai_translation',
  duration: sessionDuration,
  success: true
});
```

### 3. User Journey Tracking

Use breadcrumbs to track user flow:

```typescript
// Track user navigation
addBreadcrumb('Navigated to AI Chat', 'navigation');

// Track user interactions
addBreadcrumb('Generated AI response', 'user_action', {
  prompt_length: prompt.length,
  model: selectedModel
});

// Track business events
addBreadcrumb('Subscription upgraded', 'business', {
  from_plan: 'free',
  to_plan: 'pro'
});
```

## 🚨 Alert Configuration

### Recommended Alerts

1. **High Error Rate**: > 5% error rate in 5 minutes
2. **Performance Degradation**: > 2s average response time
3. **New Error Types**: First occurrence of new error
4. **User Impact**: Errors affecting > 10 users in 10 minutes

### Alert Channels

- **Slack**: For immediate team notification
- **Email**: For non-critical issues
- **PagerDuty**: For critical production issues

## 🔍 Debugging with Sentry

### Error Details Available

- **Stack Trace**: Full error stack with source maps
- **User Context**: User ID, email, plan, session info
- **Request Context**: URL, method, headers, body
- **Browser Context**: Browser, OS, device info
- **Session Replay**: Visual reproduction of user session
- **Breadcrumbs**: User action trail leading to error

### Performance Insights

- **Transaction Traces**: Full request/response cycles
- **Database Queries**: Query performance and N+1 detection
- **External API Calls**: Third-party service performance
- **Frontend Performance**: Component render times

## 📊 Dashboard Setup

### Key Metrics to Monitor

1. **Error Rate**: Percentage of requests resulting in errors
2. **Response Time**: Average and P95 response times
3. **User Impact**: Number of users affected by errors
4. **Feature Usage**: Adoption of new features
5. **Business Metrics**: Conversions, upgrades, churn

### Custom Dashboards

Create dashboards for:

- **Engineering**: Error rates, performance, deployments
- **Product**: Feature usage, user journeys, conversions
- **Business**: Revenue impact, user satisfaction, growth

## 🔒 Privacy & Compliance

### Data Scrubbing

Sensitive data is automatically scrubbed:

- **Passwords**: Never sent to Sentry
- **API Keys**: Filtered from headers
- **Personal Data**: Can be configured to scrub PII
- **Payment Info**: Credit card numbers automatically detected

### GDPR Compliance

- **Data Retention**: Configure retention periods
- **User Deletion**: Remove user data on request
- **Data Processing**: Document data processing activities
- **Consent**: Implement user consent for error tracking

## 🚀 Deployment Considerations

### Release Tracking

Configure release tracking for better error attribution:

```bash
# Set release version
SENTRY_RELEASE=$(git rev-parse HEAD)
```

### Source Maps

Ensure source maps are uploaded for better stack traces:

```bash
# Upload source maps (automated in CI/CD)
sentry-cli releases files $SENTRY_RELEASE upload-sourcemaps ./dist
```

### Environment Separation

Use different Sentry projects for:

- **Development**: Local development and testing
- **Staging**: Pre-production testing
- **Production**: Live user traffic

## 📚 Additional Resources

- [Sentry Documentation](https://docs.sentry.io/)
- [React Integration Guide](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Node.js Integration Guide](https://docs.sentry.io/platforms/node/)
- [Performance Monitoring](https://docs.sentry.io/product/performance/)
- [Session Replay](https://docs.sentry.io/product/session-replay/)