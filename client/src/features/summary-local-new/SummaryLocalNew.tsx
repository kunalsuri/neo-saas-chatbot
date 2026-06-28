/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useState, useMemo } from 'react';
import { useOllamaConfig } from '@/features/settings/hooks/useOllamaConfig';
import { useLMStudioConfig } from '@/features/settings/hooks/useLMStudioConfig';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import { Badge } from '@/shared/components/ui/badge';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { useToast } from "@/shared/hooks/use-toast";
import { useAuthContext } from "@/features/auth";
import { Loader2, Copy, Trash2, MessageSquare, FileText, PlusCircle, Settings, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSummaryHistory, type SummaryHistoryItem } from './useSummaryHistory';
import { LocalAIModelStatus } from '@/features/chatbot/components/ai/LocalAIModelStatus';
import { summaryApi } from './api';
import { AuthenticationError, ServerRestartError } from "@/features/auth/utils/secureApi";
import { TemplateSelector } from '@/shared/components/ui/TemplateSelector';

type AIProvider = 'ollama' | 'lmstudio';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

function SummaryLocalNewPage() {
  const { checkAuth, user } = useAuthContext();
  const { toast } = useToast();
  const { history: rawHistory, deleteSummary, addSummary } = useSummaryHistory();
  
  // Create filtered history with the same pattern as prompt-local
  const filteredHistory = useMemo(() => {
    // Ensure rawHistory is always an array, following prompt-local pattern
    // Add additional safety checks for undefined, null, or non-array values
    if (!rawHistory || !Array.isArray(rawHistory)) {
      return [];
    }
    
    // Filter out any invalid items that might cause issues
    return rawHistory.filter(item => 
      item && 
      typeof item === 'object' && 
      item.id && 
      item.summary && 
      item.originalText
    );
  }, [rawHistory]);
  
  const { config, connectionStatus, availableModels, isConnected, refetchModels: refetchOllamaModels } = useOllamaConfig();
  const { 
    availableModels: lmStudioModels, 
    isConnected: lmStudioConnected,
    connectionStatus: lmStudioConnectionStatus,
    refetchModels: refetchLMStudioModels
  } = useLMStudioConfig();
  
  const [currentModel, setCurrentModel] = useState(config.model);
  const [aiProvider, setAiProvider] = useState<AIProvider>('ollama');
  const [promptText, setPromptText] = useState('');
  const [contentText, setContentText] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [outputMode, setOutputMode] = useState<'text' | 'markdown'>('text');
  const [showHistory, setShowHistory] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);

  const getCurrentServerHealth = () => {
    return aiProvider === 'ollama' 
      ? { isOnline: isConnected, models: availableModels || [], error: isConnected ? undefined : connectionStatus.error }
      : { isOnline: lmStudioConnected, models: lmStudioModels || [], error: lmStudioConnectionStatus.error };
  };

  const handleProviderChange = (provider: AIProvider) => {
    setAiProvider(provider);
    const models = provider === 'ollama' ? (availableModels || []) : (lmStudioModels || []);
    if (models && models.length > 0) {
      setCurrentModel(models[0] || '');
    }
  };

  const handleModelChange = (model: string) => {
    setCurrentModel(model);
  };

  const handleGenerateSummary = async () => {
    if (!promptText.trim() || !contentText.trim()) return;
    
    setIsSummarizing(true);
    setSummaryText('');
    
    try {
      const response = await summaryApi.generate({
        prompt: promptText,
        content: contentText,
        model: currentModel,
        provider: aiProvider
      });
      
      setSummaryText(response.summary);
      setTokenCount(response.tokens || 0);
      
      // Save to history using complete data for server
      try {
        await summaryApi.saveWithFullData({
          prompt: promptText,
          content: contentText,
          summary: response.summary,
          model: currentModel,
          provider: aiProvider,
          tokens: response.tokens || 0
        });
        
        // Force a page reload to refresh the history
        // Note: Using reload as temporary solution until proper state management is implemented
        setTimeout(() => window.location.reload(), 100);
      } catch (saveError) {
        console.warn('Failed to save to server, using local storage fallback:', saveError);
        // Fallback to local-only storage
        await addSummary({
          prompt: promptText,
          originalText: contentText,
          summary: response.summary,
          model: currentModel,
          tokens: response.tokens || 0,
          userId: (user?.id as string) || 'local-user'
        });
      }
      
      toast({
        title: 'Summary Generated',
        description: 'Your summary has been created and saved to history.',
      });
      
    } catch (error) {
      console.error('Error generating summary:', error);
      let errorMessage = 'Failed to generate summary';
      
      if (error instanceof AuthenticationError || error instanceof ServerRestartError) {
        await checkAuth();
        errorMessage = 'Session expired. Please log in again.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleNewSummary = () => {
    setPromptText('');
    setContentText('');
    setSummaryText('');
    setTokenCount(0);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      duration: 2000,
    });
  };

  const handleSelectFromHistory = (item: SummaryHistoryItem) => {
    setPromptText(item.prompt);
    setContentText(item.originalText);
    setCurrentModel(item.model);
    setSummaryText(item.summary);
    setShowHistory(false);
  };

  const handleDeleteFromHistory = async (id: string) => {
    try {
      await deleteSummary(id);
      toast({
        title: 'Deleted',
        description: 'Summary removed from history',
      });
    } catch (error) {
      console.error('Failed to delete summary:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete summary',
        variant: 'destructive',
      });
    }
  };

  const handleSelectTemplate = (text: string) => {
    setPromptText(text);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8 flex justify-between items-start"
          variants={itemVariants}
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-3 flex items-center gap-3">
              <Sparkles className="w-10 h-10 text-primary" />
              AI Summary Generator
              <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                Modern
              </Badge>
            </h1>
            <p className="text-lg text-muted-foreground">Generate intelligent summaries with enhanced shadcn/ui components</p>
          </div>
          <Button 
            onClick={handleNewSummary} 
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
            size="lg"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            New Summary
          </Button>
        </motion.div>
        
        {/* AI Model Status */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 mb-8 border-0 shadow-lg bg-gradient-to-r from-card to-card/80">
            <LocalAIModelStatus
              currentProvider={aiProvider}
              currentModel={currentModel || 'No model'}
              sessionInfo="Modern Summary Generator"
              ollamaConnected={isConnected}
              ollamaModels={availableModels || []}
              ollamaConnectionStatus={connectionStatus.error || (connectionStatus.connected ? 'Connected' : 'Disconnected')}
              lmStudioConnected={lmStudioConnected}
              lmStudioModels={lmStudioModels || []}
              lmStudioError={lmStudioConnectionStatus.error}
              onProviderChange={handleProviderChange}
              onModelChange={handleModelChange}
              onRefresh={() => {
                if (aiProvider === 'ollama') {
                  refetchOllamaModels();
                  toast({
                    title: "Refreshing Ollama models",
                    description: "Checking for available models..."
                  });
                } else {
                  refetchLMStudioModels();
                  toast({
                    title: "Refreshing LM Studio models",
                    description: "Checking for available models..."
                  });
                }
              }}
              isRefreshing={isSummarizing}
              showProviderToggle={true}
              showModelSelect={true}
              showRefreshButton={true}
              showErrorAlert={true}
            />
          </Card>
        </motion.div>
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 space-y-8">
            {/* Settings Panel */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg bg-gradient-to-r from-card to-card/80">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Configuration
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSettings(!showSettings)}
                    >
                      {showSettings ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                </CardHeader>
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                          <Label htmlFor="output-mode" className="text-sm font-medium">
                            Output Format
                          </Label>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Text</span>
                            <Switch 
                              id="output-mode"
                              checked={outputMode === 'markdown'} 
                              onCheckedChange={(checked) => setOutputMode(checked ? 'markdown' : 'text')} 
                            />
                            <span className="text-sm text-muted-foreground">Markdown</span>
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>

            {/* Summary Interface */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg bg-gradient-to-r from-card to-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Summary Interface
                  </CardTitle>
                  <CardDescription>
                    Create intelligent summaries using advanced AI models
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Summary Instructions</Label>
                    <Textarea
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      placeholder="Enter your summarization instructions here (e.g., 'Create a concise bullet-point summary', 'Provide an executive overview')..."
                      className="min-h-[100px] resize-y"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.ctrlKey) {
                          handleGenerateSummary();
                        }
                      }}
                    />
                    <TemplateSelector
                      category="summary"
                      onSelectTemplate={handleSelectTemplate}
                      className="mt-3"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Content to Summarize</Label>
                    <Textarea
                      value={contentText}
                      onChange={(e) => setContentText(e.target.value)}
                      placeholder="Paste the content you want to summarize here..."
                      className="min-h-[160px] resize-y"
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Press Ctrl+Enter to generate summary • {contentText.length} characters
                      </p>
                      <Button
                        onClick={handleGenerateSummary}
                        disabled={!promptText.trim() || !contentText.trim() || !getCurrentServerHealth().isOnline || isSummarizing}
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      >
                        {isSummarizing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Summary
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Generated Summary</Label>
                    <div className="relative">
                      <Textarea
                        value={summaryText}
                        readOnly
                        className="min-h-[160px] resize-y border-dashed"
                        placeholder={isSummarizing ? 'Generating your summary...' : 'Your generated summary will appear here...'}
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        {currentModel && summaryText && (
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {currentModel}
                          </Badge>
                        )}
                        {tokenCount > 0 && (
                          <Badge variant="secondary" className="bg-muted">
                            {tokenCount} tokens
                          </Badge>
                        )}
                        {summaryText && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10"
                            onClick={() => handleCopy(summaryText)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right column - History */}
          <div className="xl:col-span-1">
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg bg-gradient-to-r from-card to-card/80">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      History
                      {filteredHistory.length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {filteredHistory.length}
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
                
                <AnimatePresence>
                  {showHistory && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0">
                        <ScrollArea className="h-[700px]">
                          <div className="space-y-3">
                            {filteredHistory.length === 0 ? null : filteredHistory.map((item, index) => (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group p-4 border border-border/50 rounded-lg cursor-pointer hover:bg-muted/30 hover:border-primary/30 transition-all duration-200"
                                onClick={() => handleSelectFromHistory(item)}
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                    {item.originalText}
                                  </p>
                                  <p className="text-sm mb-3 line-clamp-3">
                                    {item.summary}
                                  </p>
                                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                                    <Badge variant="outline" className="text-xs">
                                      {item.model}
                                    </Badge>
                                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2 hover:bg-destructive/10 hover:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteFromHistory(item.id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            ))}
                            {filteredHistory.length === 0 && (
                              <motion.div 
                                className="text-center py-12 text-muted-foreground"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                <p className="text-lg font-medium">No summaries yet</p>
                                <p className="text-sm mt-1">Generate your first summary to see it here</p>
                              </motion.div>
                            )}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SummaryLocalNew() {
  return (
    <SummaryLocalNewPage />
  );
}