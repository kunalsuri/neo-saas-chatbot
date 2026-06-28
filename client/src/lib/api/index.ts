/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

// Feature-specific API imports
export { dashboardApi } from '@/features/dashboard/api/dashboard-api';
export { quotesApi } from '@/features/content/api/quotes-api';
export { imagesApi } from '@/features/content/api/images-api';
export { postsApi } from '@/features/content/api/posts-api';
export { captionsApi } from '@/features/content/api/captions-api';
export { templatesApi } from '@/features/templates/api/templates-api';
export { instagramApi } from '@/features/social/api/instagram-api';
export { translationApi } from '@/features/translation/api/translation-api';
export { ollamaApi } from '@/shared/api/ollama-api';
export { lmStudioApi } from '@/shared/api/lmstudio-api';
export { modelManagementApi } from '@/shared/api/modelManagementApi';

// Legacy compatibility - imports for the deprecated api object
import { dashboardApi } from '@/features/dashboard/api/dashboard-api';
import { quotesApi } from '@/features/content/api/quotes-api';
import { imagesApi } from '@/features/content/api/images-api';
import { postsApi } from '@/features/content/api/posts-api';
import { captionsApi } from '@/features/content/api/captions-api';
import { templatesApi } from '@/features/templates/api/templates-api';
import { instagramApi } from '@/features/social/api/instagram-api';
import { translationApi } from '@/features/translation/api/translation-api';
import { ollamaApi } from '@/shared/api/ollama-api';
import { lmStudioApi } from '@/shared/api/lmstudio-api';



/**
 * @deprecated Use feature-specific APIs instead (e.g., dashboardApi, quotesApi, etc.)
 * This consolidated API object is provided for backward compatibility only.
 */
export const api = {
  // Dashboard
  getDashboardStats: dashboardApi.getDashboardStats,
  getRecentPosts: dashboardApi.getRecentPosts,

  // Quotes
  generateQuote: quotesApi.generateQuote,
  generateCustomQuoteOllama: quotesApi.generateCustomQuoteOllama,
  generateQuoteOllama: quotesApi.generateQuoteOllama,

  // Images
  searchImages: imagesApi.searchImages,
  getCuratedImages: imagesApi.getCuratedImages,
  searchPixabayImages: imagesApi.searchPixabayImages,
  getImageCategories: imagesApi.getImageCategories,

  // Posts
  createPost: postsApi.createPost,
  schedulePost: postsApi.schedulePost,
  publishPost: postsApi.publishPost,

  // Templates
  getTemplates: templatesApi.getTemplates,
  getPopularTemplates: templatesApi.getPopularTemplates,
  getExampleTemplates: templatesApi.getExampleTemplates,

  // Captions
  generateCaption: captionsApi.generateCaption,

  // Instagram
  getInstagramAuthUrl: instagramApi.getInstagramAuthUrl,

  // Ollama
  checkOllamaHealth: ollamaApi.checkHealth,
  getOllamaModels: ollamaApi.getModels,
  testOllamaConnection: ollamaApi.testConnection,

  // LM Studio
  checkLMStudioHealth: lmStudioApi.checkHealth,
  getLMStudioModels: lmStudioApi.getModels,
  testLMStudioConnection: lmStudioApi.testConnection,
  loadLMStudioModel: lmStudioApi.loadModel,
  unloadLMStudioModel: lmStudioApi.unloadModel,

  // Translation History
  getTranslationHistory: translationApi.getHistory,
  getTranslationById: translationApi.getById,
  saveTranslation: translationApi.save,
  deleteTranslation: translationApi.delete,


};
