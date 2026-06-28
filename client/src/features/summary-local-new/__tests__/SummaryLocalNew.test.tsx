/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import SummaryLocalNew from '../SummaryLocalNew';
import { useSummaryHistory } from '../useSummaryHistory';
import { useOllamaConfig } from '@/features/settings/hooks/useOllamaConfig';
import { useLMStudioConfig } from '@/features/settings/hooks/useLMStudioConfig';
import { useAuthContext } from '@/features/auth';

// Mock all the hooks and dependencies
vi.mock('../useSummaryHistory');
vi.mock('@/features/settings/hooks/useOllamaConfig');
vi.mock('@/features/settings/hooks/useLMStudioConfig');
vi.mock('@/features/auth');
vi.mock('@/shared/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

// Mock framer-motion: passthrough for ANY motion.<tag> (div, button, span, ...)
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: () => ({ children, ...props }: any) => <div {...props}>{children}</div>
    }
  ),
  AnimatePresence: ({ children }: any) => children
}));

// Mock heavy presentational children that pull in unrelated providers/imports
vi.mock('@/features/chatbot/components/ai/LocalAIModelStatus', () => ({
  LocalAIModelStatus: () => null
}));
vi.mock('@/shared/components/ui/TemplateSelector', () => ({
  TemplateSelector: () => null
}));

const mockUseSummaryHistory = useSummaryHistory as any;
const mockUseOllamaConfig = useOllamaConfig as any;
const mockUseLMStudioConfig = useLMStudioConfig as any;
const mockUseAuthContext = useAuthContext as any;

// SummaryLocalNew has no routing; wrapper kept as a passthrough so call sites are unchanged.
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

describe('SummaryLocalNew', () => {
  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    
    // Default mock implementations
    mockUseAuthContext.mockReturnValue({
      checkAuth: vi.fn(),
      user: { id: 'test-user' }
    });
    
    mockUseOllamaConfig.mockReturnValue({
      config: { model: 'test-model' },
      connectionStatus: { connected: true },
      availableModels: ['test-model'],
      isConnected: true,
      refetchModels: vi.fn()
    });
    
    mockUseLMStudioConfig.mockReturnValue({
      availableModels: ['lm-test-model'],
      isConnected: true,
      connectionStatus: { connected: true },
      refetchModels: vi.fn()
    });
  });

  describe('History handling with undefined/null values', () => {
    it('should handle undefined history gracefully', async () => {
      mockUseSummaryHistory.mockReturnValue({
        history: undefined, // This should not cause a crash
        deleteSummary: vi.fn(),
        addSummary: vi.fn()
      });

      render(
        <TestWrapper>
          <SummaryLocalNew />
        </TestWrapper>
      );

      // Should render without crashing
      expect(screen.getByText('AI Summary Generator')).toBeInTheDocument();
      
      // History section should show "No summaries yet"
      await waitFor(() => {
        expect(screen.getByText('No summaries yet')).toBeInTheDocument();
      });
    });

    it('should handle null history gracefully', async () => {
      mockUseSummaryHistory.mockReturnValue({
        history: null, // This should not cause a crash
        deleteSummary: vi.fn(),
        addSummary: vi.fn()
      });

      render(
        <TestWrapper>
          <SummaryLocalNew />
        </TestWrapper>
      );

      // Should render without crashing
      expect(screen.getByText('AI Summary Generator')).toBeInTheDocument();
      
      // History section should show "No summaries yet"
      await waitFor(() => {
        expect(screen.getByText('No summaries yet')).toBeInTheDocument();
      });
    });

    it('should handle empty array history', async () => {
      mockUseSummaryHistory.mockReturnValue({
        history: [], // Empty array should work fine
        deleteSummary: vi.fn(),
        addSummary: vi.fn()
      });

      render(
        <TestWrapper>
          <SummaryLocalNew />
        </TestWrapper>
      );

      // Should render without crashing
      expect(screen.getByText('AI Summary Generator')).toBeInTheDocument();
      
      // History section should show "No summaries yet"
      await waitFor(() => {
        expect(screen.getByText('No summaries yet')).toBeInTheDocument();
      });
    });

    it('should handle valid history array', async () => {
      const mockHistory = [
        {
          id: '1',
          prompt: 'Test prompt',
          originalText: 'Test content',
          summary: 'Test summary',
          model: 'test-model',
          tokens: 100,
          timestamp: new Date().toISOString()
        }
      ];

      mockUseSummaryHistory.mockReturnValue({
        history: mockHistory,
        deleteSummary: vi.fn(),
        addSummary: vi.fn()
      });

      render(
        <TestWrapper>
          <SummaryLocalNew />
        </TestWrapper>
      );

      // Should render without crashing
      expect(screen.getByText('AI Summary Generator')).toBeInTheDocument();
      
      // History should show the count
      await waitFor(() => {
        expect(screen.getByText('1')).toBeInTheDocument(); // Badge with count
      });
    });

    it('should filter out invalid history items', async () => {
      const mockHistory = [
        {
          id: '1',
          prompt: 'Test prompt',
          originalText: 'Test content',
          summary: 'Test summary',
          model: 'test-model',
          tokens: 100,
          timestamp: new Date().toISOString()
        },
        null, // Invalid item
        undefined, // Invalid item
        { id: '2' }, // Missing required fields
        'invalid', // Not an object
      ];

      mockUseSummaryHistory.mockReturnValue({
        history: mockHistory,
        deleteSummary: vi.fn(),
        addSummary: vi.fn()
      });

      render(
        <TestWrapper>
          <SummaryLocalNew />
        </TestWrapper>
      );

      // Should render without crashing
      expect(screen.getByText('AI Summary Generator')).toBeInTheDocument();
      
      // History should show count of 1 (only valid item)
      await waitFor(() => {
        expect(screen.getByText('1')).toBeInTheDocument(); // Badge with count
      });
    });
  });

  describe('Model handling with undefined/null values', () => {
    it('should handle undefined available models', async () => {
      mockUseOllamaConfig.mockReturnValue({
        config: { model: 'test-model' },
        connectionStatus: { connected: true },
        availableModels: undefined, // This should not cause a crash
        isConnected: true,
        refetchModels: vi.fn()
      });

      mockUseLMStudioConfig.mockReturnValue({
        availableModels: undefined, // This should not cause a crash
        isConnected: true,
        connectionStatus: { connected: true },
        refetchModels: vi.fn()
      });

      mockUseSummaryHistory.mockReturnValue({
        history: [],
        deleteSummary: vi.fn(),
        addSummary: vi.fn()
      });

      render(
        <TestWrapper>
          <SummaryLocalNew />
        </TestWrapper>
      );

      // Should render without crashing
      expect(screen.getByText('AI Summary Generator')).toBeInTheDocument();
    });
  });
});