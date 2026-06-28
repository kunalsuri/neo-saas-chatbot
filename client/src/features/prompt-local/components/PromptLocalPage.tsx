/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PlusCircle, Activity } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { useToast } from '@/shared/hooks/use-toast';
import { LocalAIModelStatus } from '@/features/chatbot/components/ai/LocalAIModelStatus';

// Modern components
import { ModesSelector } from './ModesSelector';
import { PromptInterface } from './PromptInterface';
import { PromptHistory } from './PromptHistory';

// Modern hooks
import { usePrompt } from '../hooks/usePrompt';
import { usePromptHistory } from '../hooks/usePromptHistory';
import { usePromptConfig } from '../hooks/usePromptConfig';

// Types and utils
import { PromptHistoryItem } from '../types';
import { validatePromptText } from '../lib/utils';
import { ERROR_MESSAGES } from '../lib/constants';

export function PromptLocalPage() {
  const { toast } = useToast();
  
  // Local state
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [improvedPrompt, setImprovedPrompt] = useState('');
  const [showHistory, setShowHistory] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<PromptHistoryItem | null>(null);
  
  // Modern hooks
  const {
    config,
    serverHealth,
    availableModels,
    isHealthChecking,
    setProvider,
    setModel,
    setMode,
    setOutputFormat,
    checkServerHealth,
    isServerOnline,
    hasAvailableModels,
  } = usePromptConfig();

  const handleImprovementSuccess = useCallback((result: string) => {
    setImprovedPrompt(result);
  }, []);

  const {
    improve,
    cancel,
    isImproving,
    improved,
    tokens,
    confidence,
  } = usePrompt({
    provider: config.provider,
    onSuccess: handleImprovementSuccess,
  });

  const {
    history,
    isLoading: historyLoading,
    addToHistory,
    removeFromHistory,
    toggleBookmark,
  } = usePromptHistory();

  // Event handlers
  const handleImprove = useCallback(async () => {
    // Validate input
    const validation = validatePromptText(originalPrompt);
    if (!validation.isValid) {
      toast({
        title: "Invalid Input",
        description: validation.errors[0] || ERROR_MESSAGES.invalidInput,
        variant: "destructive",
      });
      return;
    }

    // Check server status
    if (!isServerOnline || !hasAvailableModels) {
      toast({
        title: "Service Unavailable",
        description: ERROR_MESSAGES.serverOffline,
        variant: "destructive",
      });
      return;
    }

    // Validate that the selected model is actually available
    if (!availableModels.includes(config.model)) {
      toast({
        title: "Invalid Model Selected",
        description: `Model "${config.model}" is not available for provider "${config.provider}". Please select a different model.`,
        variant: "destructive",
      });
      return;
    }

    try {
      await improve({
        original: originalPrompt,
        provider: config.provider,
        model: config.model,
        mode: config.mode,
        outputFormat: config.outputFormat,
      });
    } catch {
      // Error handling is done in the hook
    }
  }, [
    originalPrompt,
    isServerOnline,
    hasAvailableModels,
    availableModels,
    config,
    improve,
    toast,
  ]);

  const handleClear = useCallback(() => {
    setOriginalPrompt('');
    setImprovedPrompt('');
    setSelectedItem(null);
    cancel();
  }, [cancel]);

  const handleNewImprovement = useCallback(() => {
    // Save current improvement if it exists and auto-save is enabled
    if (config.autoSave && originalPrompt.trim() && improvedPrompt.trim()) {
      addToHistory({
        original: originalPrompt,
        improved: improvedPrompt,
        model: config.model,
        provider: config.provider,
        mode: config.mode,
        outputFormat: config.outputFormat,
        tokens: tokens || 0,
        ...(confidence !== null && confidence !== undefined && { confidence }),
        userId: 'local-user',
        isBookmarked: false,
      }).catch(() => {
        // Silently handle auto-save errors
      });
    }
    
    // Clear current state
    handleClear();
  }, [
    config.autoSave,
    originalPrompt,
    improvedPrompt,
    config.model,
    config.provider,
    config.mode,
    config.outputFormat,
    tokens,
    confidence,
    addToHistory,
    handleClear,
  ]);

  const handleSaveToHistory = useCallback(async () => {
    if (!originalPrompt.trim() || !improvedPrompt.trim()) {
      toast({
        title: "Nothing to Save",
        description: "Please improve a prompt before saving to history",
        variant: "destructive",
      });
      return;
    }

    try {
      await addToHistory({
        original: originalPrompt,
        improved: improvedPrompt,
        model: config.model,
        provider: config.provider,
        mode: config.mode,
        outputFormat: config.outputFormat,
        tokens: tokens || 0,
        ...(confidence !== null && { confidence }),
        userId: 'local-user',
        isBookmarked: false,
      });
    } catch {
      // Error handling is done in the hook
    }
  }, [
    originalPrompt,
    improvedPrompt,
    config,
    tokens,
    confidence,
    addToHistory,
    toast,
  ]);

  const handleSelectFromHistory = useCallback((item: PromptHistoryItem) => {
    setOriginalPrompt(item.original);
    setImprovedPrompt(item.improved);
    setSelectedItem(item);
    
    // Update config to match the historical item
    if (item.provider !== config.provider) {
      setProvider(item.provider);
    }
    if (item.model !== config.model && availableModels.includes(item.model)) {
      setModel(item.model);
    }
    if (item.mode !== config.mode) {
      setMode(item.mode);
    }
    if (item.outputFormat !== config.outputFormat) {
      setOutputFormat(item.outputFormat);
    }
    
    toast({
      title: "Prompt Loaded",
      description: `Loaded prompt from ${new Date(item.timestamp).toLocaleDateString()}`,
    });
  }, [config, availableModels, setProvider, setModel, setMode, setOutputFormat, toast]);

  const handleToggleBookmark = useCallback(async (id: string) => {
    try {
      await toggleBookmark(id);
      
      // Update selected item if it's the one being bookmarked
      if (selectedItem?.id === id) {
        setSelectedItem(prev => prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null);
      }
    } catch {
      // Error handling is done in the hook
    }
  }, [toggleBookmark, selectedItem]);

  // Update improved prompt when hook updates
  React.useEffect(() => {
    if (improved) {
      setImprovedPrompt(improved);
    }
  }, [improved]);

  // Auto-save improvements when they are completed
  React.useEffect(() => {
    if (improvedPrompt && originalPrompt.trim() && improvedPrompt.trim()) {
      // Use a small delay to ensure all state is updated and avoid multiple saves
      const timeoutId = setTimeout(() => {
        const historyItem = {
          original: originalPrompt,
          improved: improvedPrompt,
          model: config.model,
          provider: config.provider,
          mode: config.mode,
          outputFormat: config.outputFormat,
          tokens: tokens || 0,
          userId: 'local-user',
          isBookmarked: false,
          ...(confidence !== null && confidence !== undefined && { confidence }),
        };
        
        // Only save if this combination doesn't already exist in history
        const isDuplicate = history.some(item => 
          item.original.trim() === historyItem.original.trim() &&
          item.improved.trim() === historyItem.improved.trim() &&
          item.model === historyItem.model &&
          item.mode === historyItem.mode
        );
        
        if (!isDuplicate) {
          addToHistory(historyItem).catch(() => {
            // Silently handle auto-save errors
          });
        }
      }, 500); // Small delay to debounce

      return () => clearTimeout(timeoutId);
    }
    
    return undefined; // Explicit return for all code paths
  }, [improvedPrompt, originalPrompt, config, history, tokens, confidence, addToHistory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  AI Prompt Improver
                </h1>
                <p className="text-muted-foreground">
                  Enhance your prompts with local AI models
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={handleNewImprovement}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Improvement
              </Button>
            </div>
          </div>
        </motion.div>

        {/* AI Model Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-6 border-0 shadow-lg bg-gradient-to-r from-card to-card/80">
            <CardContent className="p-6">
              <LocalAIModelStatus
                currentProvider={config.provider}
                currentModel={config.model || 'No model selected'}
                sessionInfo={`${history.length} prompts in history`}
                ollamaConnected={config.provider === 'ollama' && isServerOnline}
                ollamaModels={config.provider === 'ollama' ? [...availableModels] : []}
                ollamaConnectionStatus={(() => {
                  if (config.provider !== 'ollama') return 'Not using Ollama';
                  if (serverHealth.error) return serverHealth.error;
                  return isServerOnline ? 'Connected' : 'Disconnected';
                })()}
                lmStudioConnected={config.provider === 'lmstudio' && isServerOnline}
                lmStudioModels={config.provider === 'lmstudio' ? [...availableModels] : []}
                lmStudioError={config.provider === 'lmstudio' ? serverHealth.error : undefined}
                onProviderChange={setProvider}
                onModelChange={setModel}
                onRefresh={checkServerHealth}
                isRefreshing={isHealthChecking}
                showProviderToggle={true}
                showModelSelect={true}
                showRefreshButton={true}
                showErrorAlert={true}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Column - Prompt Interface */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Prompt Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <PromptInterface
                    originalPrompt={originalPrompt}
                    improvedPrompt={improvedPrompt}
                    onOriginalChange={setOriginalPrompt}
                    onImprove={handleImprove}
                    onClear={handleClear}
                    isImproving={isImproving}
                    disabled={!isServerOnline || !hasAvailableModels}
                    {...(tokens !== null && { tokens })}
                    {...(confidence !== null && { confidence })}
                    {...(selectedItem?.isBookmarked !== undefined && { isBookmarked: selectedItem.isBookmarked })}
                    {...(selectedItem && { onToggleBookmark: () => { handleToggleBookmark(selectedItem.id); } })}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Improvement Settings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ModesSelector
                mode={config.mode}
                outputFormat={config.outputFormat}
                onModeChange={setMode}
                onFormatChange={setOutputFormat}
                disabled={isImproving}
              />
            </motion.div>

            {/* Save Button */}
            {originalPrompt && improvedPrompt && !config.autoSave && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  onClick={handleSaveToHistory}
                  variant="outline"
                  className="w-full"
                >
                  Save to History
                </Button>
              </motion.div>
            )}
          </div>

          {/* History Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="border-0 shadow-lg h-fit">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    History
                    {history.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {history.length}
                      </Badge>
                    )}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHistory(!showHistory)}
                  >
                    {showHistory ? 'Hide' : 'Show'}
                  </Button>
                </div>
              </CardHeader>
              {showHistory && (
                <CardContent>
                  <PromptHistory
                    history={history}
                    isLoading={historyLoading}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSelect={handleSelectFromHistory}
                    onDelete={removeFromHistory}
                    onToggleBookmark={handleToggleBookmark}
                    selectedItem={selectedItem}
                  />
                </CardContent>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function PromptLocal() {
  return <PromptLocalPage />;
}