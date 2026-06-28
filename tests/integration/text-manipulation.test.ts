/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

// @vitest-environment node

import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createTestApp } from '../helpers/testApp';

describe('Text Manipulation API Integration', () => {
  const app = createTestApp();
  const agent = request.agent(app);
  let csrfToken = '';

  beforeAll(async () => {
    // 1. Fetch CSRF token
    const csrfRes = await agent.get('/api/auth/csrf-token').expect(200);
    csrfToken = csrfRes.body.data.csrfToken;

    // 2. Register/Login a test user to authenticate our session
    await agent
      .post('/api/auth/signup')
      .set('x-csrf-token', csrfToken)
      .send({
        username: 'texttestuser',
        email: 'texttest@example.com',
        password: 'securepassword123',
      })
      .expect(200);
  });

  describe('POST /api/text/strip-formatting', () => {
    it('should strip markdown and HTML formatting from text', async () => {
      const response = await agent
        .post('/api/text/strip-formatting')
        .set('x-csrf-token', csrfToken)
        .send({
          text: '### Header\nThis is **bold** text and <i>italic HTML</i>.',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.cleanedText).toBe('Header\nThis is bold text and italic HTML.');
      expect(response.body.data.originalLength).toBe(56);
      expect(response.body.data.cleanedLength).toBe(41);
    });

    it('should fail if payload violates stripFormattingSchema', async () => {
      await agent
        .post('/api/text/strip-formatting')
        .set('x-csrf-token', csrfToken)
        .send({
          text: '', // too short, min(1) constraint
        })
        .expect(400);
    });
  });

  describe('POST /api/text/compare-files', () => {
    it('should compute diff and return html formatting', async () => {
      const response = await agent
        .post('/api/text/compare-files')
        .set('x-csrf-token', csrfToken)
        .send({
          fileA: 'Hello world\nThis is file A',
          fileB: 'Hello world\nThis is file B',
          fileAName: 'a.txt',
          fileBName: 'b.txt',
          outputFormat: 'html',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('diff');
      expect(response.body.data.format).toBe('html');
      expect(response.body.data.stats).toEqual({
        additions: 0,
        deletions: 0,
        modifications: 1,
      });
      expect(response.body.data.diff).toContain('<!DOCTYPE html>');
      expect(response.body.data.diff).toContain('a.txt');
      expect(response.body.data.diff).toContain('b.txt');
    });

    it('should compute diff and return plain text formatting', async () => {
      const response = await agent
        .post('/api/text/compare-files')
        .set('x-csrf-token', csrfToken)
        .send({
          fileA: 'Hello world\nThis is line A',
          fileB: 'Hello world\nThis is line B',
          outputFormat: 'text',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.format).toBe('text');
      expect(response.body.data.diff).toContain('File Comparison');
      expect(response.body.data.diff).toContain('~ This is line A');
      expect(response.body.data.diff).toContain('→ This is line B');
    });
  });
});
