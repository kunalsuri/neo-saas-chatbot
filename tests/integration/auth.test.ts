/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

// @vitest-environment node

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createTestApp } from '../helpers/testApp';

describe('Authentication API Integration', () => {
  const app = createTestApp();

  it('should manage the user registration, login, and session lifecycle', async () => {
    // 1. Create a supertest agent to persist cookies across requests
    const agent = request.agent(app);

    // 2. Fetch the CSRF token
    const csrfRes = await agent
      .get('/api/auth/csrf-token')
      .expect(200);
    
    const csrfToken = csrfRes.body.data.csrfToken;
    expect(csrfToken).toBeDefined();
    expect(typeof csrfToken).toBe('string');

    // 3. Check current session status (should be false/unauthenticated)
    const statusRes1 = await agent
      .get('/api/session/status')
      .expect(200);
    expect(statusRes1.body.data.authenticated).toBe(false);

    // 4. Try signing up with invalid fields (validation check)
    await agent
      .post('/api/auth/signup')
      .set('x-csrf-token', csrfToken)
      .send({ username: 'u', email: 'not-an-email', password: '12' })
      .expect(400);

    // 5. Sign up a new user
    const signupRes = await agent
      .post('/api/auth/signup')
      .set('x-csrf-token', csrfToken)
      .send({
        username: 'testintegrationuser',
        email: 'testint@example.com',
        password: 'securepassword123',
      })
      .expect(200);

    expect(signupRes.body.success).toBe(true);
    expect(signupRes.body.data).toHaveProperty('id');
    expect(signupRes.body.data.username).toBe('testintegrationuser');

    // 6. Verify session is now authenticated
    const statusRes2 = await agent
      .get('/api/session/status')
      .expect(200);
    expect(statusRes2.body.data.authenticated).toBe(true);

    // 7. Get logged-in user profile
    const profileRes = await agent
      .get('/api/auth/me')
      .expect(200);
    expect(profileRes.body.data.username).toBe('testintegrationuser');
    expect(profileRes.body.data.email).toBe('testint@example.com');

    // 8. Sign out
    const logoutRes = await agent
      .post('/api/auth/logout')
      .set('x-csrf-token', csrfToken)
      .expect(200);
    expect(logoutRes.body.success).toBe(true);

    // 9. Verify session is now unauthenticated
    const statusRes3 = await agent
      .get('/api/session/status')
      .expect(200);
    expect(statusRes3.body.data.authenticated).toBe(false);
  });

  it('should reject login with incorrect credentials', async () => {
    const agent = request.agent(app);

    // Get CSRF Token
    const csrfRes = await agent.get('/api/auth/csrf-token').expect(200);
    const csrfToken = csrfRes.body.data.csrfToken;

    // Login with invalid credentials
    const loginRes = await agent
      .post('/api/auth/login')
      .set('x-csrf-token', csrfToken)
      .send({
        username: 'nonexistentuser',
        password: 'wrongpassword',
      })
      .expect(401);

    expect(loginRes.body.success).toBe(false);
    expect(loginRes.body.error).toContain('Invalid credentials');
  });

  it('should block POST requests without a CSRF token', async () => {
    const agent = request.agent(app);

    const signupRes = await agent
      .post('/api/auth/signup')
      .send({
        username: 'testnocsrf',
        email: 'nocsrf@example.com',
        password: 'securepassword123',
      })
      .expect(403);

    expect(signupRes.body.error).toBe('CSRF token missing');
  });
});
