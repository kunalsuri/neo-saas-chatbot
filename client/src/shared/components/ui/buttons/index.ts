/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

// Centralized Button Components Export
// This reduces the number of individual Button imports across the codebase

export { Button, ButtonProps, buttonVariants } from '../button';

// Re-export common button variants for easier access
export {
  ActionButton,
  CancelButton,
  ConfirmButton,
  DeleteButton,
  EditButton,
  SaveButton,
  SubmitButton,
  LoadingButton,
  IconButton,
  LinkButton,
  RefreshButton,
  CloseButton,
  AddButton
} from './variants.tsx';

// Export button group utilities
export {
  ButtonGroup,
  type ButtonGroupProps
} from './button-group.tsx';

// Export specialized button hooks
export {
  useButtonState,
  useAsyncButton,
  type ButtonStateOptions,
  type AsyncButtonOptions
} from './hooks.ts';