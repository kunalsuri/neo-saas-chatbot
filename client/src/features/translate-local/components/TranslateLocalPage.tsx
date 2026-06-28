/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useState, useCallback } from 'react';
import { Languages, PlusCircle, Settings, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Switch } from '@/shared/components/ui/switch';

import { useToast } from '@/shared/hooks/use-toast';
import { LocalAIModelStatus } from '@/features/chatbot/components/ai/LocalAIModelStatus';


// Modern components
import { LanguagePairSelector } from './LanguageSelector';
import { TranslationInterface } from './TranslationInterface';
import { TranslationHistory } from './TranslationHistory';

// Modern hooks
import { useTranslation } from '../hooks/useTranslation';
import { useTranslationHistory } from '../hooks/useTranslationHistory';
import { useTranslationConfig } from '../hooks/useTranslationConfig';

// Types and utils
import { TranslationHistoryItem } from '../types';
import { validateTranslationText, detectPotentialLanguage } from '../lib/utils';
import { ERROR_MESSAGES } from '../lib/constants';

export function TranslateLocalPage() {
  const { toast } = useToast();
  
  // Local state
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [showHistory, setShowHistory] = useState(true);
  
  // Modern hooks
  const {
    config,
    serverHealth,
    availableModels,
    isHealthChecking,
    setProvider,
    setModel,
    setSourceLang,
    setTargetLang,
    swapLanguages,
    toggleMode,
    checkServerHealth,
    isServerOnline,
    hasAvailableModels,
    isCasual,
  } = useTranslationConfig();

  const handleTranslationSuccess = useCallback((result: string) => {
    setTranslatedText(result);
  }, []);

  const {
    translate,
    cancel,
    isTranslating,
    translation,
    tokens,
    confidence,
  } = useTranslation({
    provider: config.provider,
    onSuccess: handleTranslationSuccess,
  });

  const {
    history,
    isLoading: historyLoading,
    searchQuery,
    setSearchQuery,
    selectedItem,
    selectItem,
    clearSelection,
    saveToHistory,
    deleteFromHistory,
    toggleBookmark,
  } = useTranslationHistory();

  // Auto-save translations when they are completed
  React.useEffect(() => {
    if (translatedText && sourceText.trim() && translatedText.trim()) {
      // Use a small delay to ensure all state is updated and avoid multiple saves
      const timeoutId = setTimeout(() => {
        const historyItem = {
          original: sourceText,
          translated: translatedText,
          sourceLang: config.sourceLang,
          targetLang: config.targetLang,
          model: config.model,
          tokens: tokens || 0,
          userId: 'local-user',
          ...(confidence !== undefined && { confidence }),
        };
        
        // Only save if this combination doesn't already exist in history
        const isDuplicate = history.some(item => 
          item.original.trim() === historyItem.original.trim() &&
          item.translated.trim() === historyItem.translated.trim() &&
          item.sourceLang === historyItem.sourceLang &&
          item.targetLang === historyItem.targetLang
        );
        
        if (!isDuplicate) {
          saveToHistory(historyItem);
        }
      }, 500); // Small delay to debounce

      return () => clearTimeout(timeoutId);
    }
    
    return undefined; // Explicit return for all code paths
  }, [translatedText, sourceText, config, tokens, confidence, history, saveToHistory]);

  // Handlers
  const handleTranslate = useCallback(async () => {
    const validation = validateTranslationText(sourceText);
    if (!validation.isValid) {
      toast({
        title: "Invalid Input",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    if (!isServerOnline) {
      toast({
        title: "Server Offline",
        description: ERROR_MESSAGES.serverOffline,
        variant: "destructive",
      });
      return;
    }

    if (!hasAvailableModels || !config.model) {
      toast({
        title: "No Model Available",
        description: ERROR_MESSAGES.noModel,
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

    // Auto-detect source language if enabled
    let finalSourceLang = config.sourceLang;
    if (config.autoDetect) {
      const detected = detectPotentialLanguage(sourceText);
      if (detected && detected !== config.sourceLang) {
        finalSourceLang = detected;
        toast({
          title: "Language Detected",
          description: `Detected language: ${detected}`,
        });
      }
    }

    try {
      translate({
        text: sourceText,
        sourceLang: finalSourceLang,
        targetLang: config.targetLang,
        model: config.model,
        isCasual: isCasual,
      });
    } catch (error) {
      console.error('Translation failed:', error);
    }
  }, [
    sourceText, 
    config, 
    isServerOnline, 
    hasAvailableModels, 
    availableModels,
    isCasual, 
    translate, 
    toast
  ]);

  const handleSaveToHistory = useCallback(async () => {
    if (!sourceText.trim() || !translatedText.trim()) return;

    try {
      const historyItem = {
        original: sourceText,
        translated: translatedText,
        sourceLang: config.sourceLang,
        targetLang: config.targetLang,
        model: config.model,
        tokens: tokens || 0,
        userId: 'local-user',
        ...(confidence !== undefined && { confidence }),
      };
      
      saveToHistory(historyItem);
    } catch (error) {
      console.error('Failed to save translation:', error);
    }
  }, [sourceText, translatedText, config, tokens, confidence, saveToHistory]);

  const handleNewTranslation = useCallback(() => {
    // Save current translation if exists
    if (sourceText.trim() && translatedText.trim()) {
      handleSaveToHistory();
    }
    
    // Clear state
    setSourceText('');
    setTranslatedText('');
    clearSelection();
    cancel();
  }, [sourceText, translatedText, handleSaveToHistory, clearSelection, cancel]);

  const handleSelectFromHistory = useCallback((item: TranslationHistoryItem) => {
    selectItem(item);
    
    // Load translation into interface
    setSourceText(item.original);
    setTranslatedText(item.translated);
    setSourceLang(item.sourceLang);
    setTargetLang(item.targetLang);
    
    toast({
      title: "Translation Loaded",
      description: `Loaded from ${item.model}`,
    });
  }, [selectItem, setSourceLang, setTargetLang, toast]);

  const handleClearText = useCallback(() => {
    setSourceText('');
    setTranslatedText('');
    clearSelection();
    cancel();
  }, [clearSelection, cancel]);

  // Auto-save when translation completes (removed to prevent loops)
  // Manual save is available through handleSaveToHistory or the save button

  // Update translated text when translation hook updates
  React.useEffect(() => {
    if (translation) {
      setTranslatedText(translation);
    }
  }, [translation]);

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
                <Languages className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  AI Translator
                </h1>
                <p className="text-muted-foreground">
                  Real-time translation with local AI models
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={handleNewTranslation}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Translation
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
                sessionInfo={`${history.length} translations in history`}
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
          {/* Translation Interface */}
          <div className="lg:col-span-3 space-y-6">
            {/* Configuration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Translation Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Language Selection */}
                  <LanguagePairSelector
                    sourceLang={config.sourceLang}
                    targetLang={config.targetLang}
                    onSourceChange={setSourceLang}
                    onTargetChange={setTargetLang}
                    onSwap={swapLanguages}
                    disabled={isTranslating}
                  />
                  
                  {/* Mode Settings */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Translation Style</div>
                      <p className="text-xs text-muted-foreground">
                        Choose between formal and casual tone
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "text-sm transition-colors",
                        !isCasual && "text-foreground font-medium"
                      )}>
                        Formal
                      </span>
                      <Switch
                        checked={isCasual}
                        onCheckedChange={toggleMode}
                        disabled={isTranslating}
                      />
                      <span className={cn(
                        "text-sm transition-colors",
                        isCasual && "text-foreground font-medium"
                      )}>
                        Casual
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Translation Interface */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Translation</CardTitle>
                </CardHeader>
                <CardContent>
                  <TranslationInterface
                    sourceText={sourceText}
                    translatedText={translatedText}
                    onSourceTextChange={setSourceText}
                    onTranslate={handleTranslate}
                    onClear={handleClearText}
                    isTranslating={isTranslating}
                    disabled={!isServerOnline || !hasAvailableModels}
                    {...(tokens !== undefined && { tokens })}
                    {...(confidence !== undefined && { confidence })}
                    {...(selectedItem?.isBookmarked !== undefined && { isBookmarked: selectedItem.isBookmarked })}
                    {...(selectedItem && { onToggleBookmark: () => toggleBookmark(selectedItem.id) })}
                  />
                </CardContent>
              </Card>
            </motion.div>
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
                  <TranslationHistory
                    history={history}
                    isLoading={historyLoading}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSelect={handleSelectFromHistory}
                    onDelete={deleteFromHistory}
                    onToggleBookmark={toggleBookmark}
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

export default function TranslateLocal() {
  return <TranslateLocalPage />;
}