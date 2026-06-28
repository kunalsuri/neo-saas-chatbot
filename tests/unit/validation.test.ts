/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { describe, it, expect } from 'vitest';
import {
  loginSchema,
  signupSchema,
  chatMessageSchema,
  translationSchema,
  promptImprovementSchema,
  stripFormattingSchema,
  compareFilesSchema,
} from '../../shared/validation';

describe('Shared Zod Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct credentials', () => {
      const valid = { username: 'testuser', password: 'securepassword123' };
      const parsed = loginSchema.safeParse(valid);
      expect(parsed.success).toBe(true);
    });

    it('should reject usernames too short', () => {
      const invalid = { username: 'te', password: 'securepassword123' };
      const parsed = loginSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
      if (!parsed.success) {
        expect(parsed.error.issues[0]?.message).toBe('Username must be at least 3 characters');
      }
    });

    it('should reject passwords too short', () => {
      const invalid = { username: 'testuser', password: '12345' };
      const parsed = loginSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
      if (!parsed.success) {
        expect(parsed.error.issues[0]?.message).toBe('Password must be at least 6 characters');
      }
    });
  });

  describe('signupSchema', () => {
    it('should validate a correct signup request', () => {
      const valid = { username: 'newuser', email: 'user@example.com', password: 'secretpassword' };
      const parsed = signupSchema.safeParse(valid);
      expect(parsed.success).toBe(true);
    });

    it('should reject invalid email formats', () => {
      const invalid = { username: 'newuser', email: 'invalid-email', password: 'secretpassword' };
      const parsed = signupSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
      if (!parsed.success) {
        expect(parsed.error.issues[0]?.message).toBe('Invalid email format');
      }
    });
  });

  describe('chatMessageSchema', () => {
    it('should validate a valid chat message payload with Ollama provider', () => {
      const valid = { message: 'Hello AI', provider: 'ollama', model: 'llama3' };
      const parsed = chatMessageSchema.safeParse(valid);
      expect(parsed.success).toBe(true);
    });

    it('should validate a valid chat message payload with LM Studio provider', () => {
      const valid = { message: 'Hello AI', provider: 'lmstudio', model: 'gpt-4o' };
      const parsed = chatMessageSchema.safeParse(valid);
      expect(parsed.success).toBe(true);
    });

    it('should reject unsupported providers', () => {
      const invalid = { message: 'Hello AI', provider: 'openai', model: 'gpt-4' };
      const parsed = chatMessageSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
    });

    it('should reject empty messages', () => {
      const invalid = { message: '', provider: 'ollama', model: 'llama3' };
      const parsed = chatMessageSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
    });
  });

  describe('translationSchema', () => {
    it('should validate a valid translation payload', () => {
      const valid = {
        text: 'Hello world',
        sourceLang: 'en',
        targetLang: 'fr',
        model: 'llama-translate',
        isCasual: true,
      };
      const parsed = translationSchema.safeParse(valid);
      expect(parsed.success).toBe(true);
    });

    it('should reject empty source text', () => {
      const invalid = {
        text: '',
        sourceLang: 'en',
        targetLang: 'fr',
        model: 'llama-translate',
      };
      const parsed = translationSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
    });
  });

  describe('promptImprovementSchema', () => {
    it('should validate a valid prompt improvement payload', () => {
      const valid = { prompt: 'Make this professional', model: 'mistral' };
      const parsed = promptImprovementSchema.safeParse(valid);
      expect(parsed.success).toBe(true);
    });

    it('should allow optional model name', () => {
      const valid = { prompt: 'Improve this' };
      const parsed = promptImprovementSchema.safeParse(valid);
      expect(parsed.success).toBe(true);
    });
  });

  describe('stripFormattingSchema', () => {
    it('should validate correct formatting payload', () => {
      const valid = { text: '**bold text** and _italics_' };
      const parsed = stripFormattingSchema.safeParse(valid);
      expect(parsed.success).toBe(true);
    });

    it('should reject empty text', () => {
      const invalid = { text: '' };
      const parsed = stripFormattingSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
    });
  });

  describe('compareFilesSchema', () => {
    it('should validate a correct comparison payload', () => {
      const valid = { fileA: 'Hello A', fileB: 'Hello B', outputFormat: 'text' };
      const parsed = compareFilesSchema.safeParse(valid);
      expect(parsed.success).toBe(true);
      expect(parsed.data?.outputFormat).toBe('text');
    });

    it('should apply default outputFormat html if omitted', () => {
      const valid = { fileA: 'Hello A', fileB: 'Hello B' };
      const parsed = compareFilesSchema.safeParse(valid);
      expect(parsed.success).toBe(true);
      expect(parsed.data?.outputFormat).toBe('html');
    });

    it('should reject invalid output formats', () => {
      const invalid = { fileA: 'Hello A', fileB: 'Hello B', outputFormat: 'pdf' };
      const parsed = compareFilesSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
    });
  });
});
