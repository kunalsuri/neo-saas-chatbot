/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

// Components
export { default as ExternalModelManagement } from './components/ExternalModelManagement';
export { default as LocalModelManagement } from './components/LocalModelManagement';

// Hooks
export { useExternalModelManagement } from './hooks/useExternalModelManagement';
export { useModelSearch } from './hooks/useModelSearch';
export { useProviderConfig } from './hooks/useProviderConfig';
export { useProviderConnection } from './hooks/useProviderConnection';

// API
export { modelManagementApi } from '@/shared/api/modelManagementApi';
export { ollamaApi } from '@/shared/api/ollama-api';
export { lmStudioApi } from '@/shared/api/lmstudio-api';

// All types are now centralized in the shared directory
export * from '@/shared/types/model-management';
