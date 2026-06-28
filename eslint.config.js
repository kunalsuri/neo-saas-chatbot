/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist', 'node_modules', 'build', '*.config.js'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2025,
      globals: globals.browser,
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Temporarily make these rules more lenient while you fix issues
      'react-refresh/only-export-components': 'off', // Temporarily disabled
      '@typescript-eslint/no-unused-vars': [
        'warn', // Downgraded from error to warning
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn', // Downgraded from error
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn', // Downgraded from error
      'no-var': 'error',
      'no-undef': 'warn', // Downgraded from error
      'no-redeclare': 'warn', // Downgraded from error
      'react-hooks/exhaustive-deps': 'warn', // Ensure this is a warning, not error
      '@typescript-eslint/no-unsafe-function-type': 'warn', // Downgraded
      '@typescript-eslint/no-require-imports': 'warn', // Downgraded
    },
  },
  {
    files: ['server/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-console': 'off', // Allow console in server code
    },
  },
];