/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React from 'react';
import { Button, ButtonProps } from '../button';
import { 
  Check, 
  X, 
  Trash2, 
  Edit, 
  Save, 
  Loader2, 
  ExternalLink, 
  RefreshCw,
  Plus
} from 'lucide-react';

// Action Button - Primary action button
export const ActionButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "default", ...props }, ref) => (
    <Button ref={ref} variant={variant} {...props}>
      {children}
    </Button>
  )
);
ActionButton.displayName = "ActionButton";

// Cancel Button - Secondary action for cancelling
export const CancelButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Cancel", variant = "outline", ...props }, ref) => (
    <Button ref={ref} variant={variant} {...props}>
      <X className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
CancelButton.displayName = "CancelButton";

// Confirm Button - For confirmation actions
export const ConfirmButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Confirm", variant = "default", ...props }, ref) => (
    <Button ref={ref} variant={variant} {...props}>
      <Check className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
ConfirmButton.displayName = "ConfirmButton";

// Delete Button - Destructive action button
export const DeleteButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Delete", variant = "destructive", ...props }, ref) => (
    <Button ref={ref} variant={variant} {...props}>
      <Trash2 className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
DeleteButton.displayName = "DeleteButton";

// Edit Button - For editing actions
export const EditButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Edit", variant = "outline", ...props }, ref) => (
    <Button ref={ref} variant={variant} {...props}>
      <Edit className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
EditButton.displayName = "EditButton";

// Save Button - For saving actions
export const SaveButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Save", variant = "default", ...props }, ref) => (
    <Button ref={ref} variant={variant} {...props}>
      <Save className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
SaveButton.displayName = "SaveButton";

// Submit Button - For form submissions
export const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Submit", type = "submit", variant = "default", ...props }, ref) => (
    <Button ref={ref} type={type} variant={variant} {...props}>
      {children}
    </Button>
  )
);
SubmitButton.displayName = "SubmitButton";

// Loading Button - Button with loading state
export const LoadingButton = React.forwardRef<HTMLButtonElement, ButtonProps & { loading?: boolean }>(
  ({ children, loading = false, disabled, ...props }, ref) => (
    <Button ref={ref} disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </Button>
  )
);
LoadingButton.displayName = "LoadingButton";

// Icon Button - Button with just an icon
export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "ghost", size = "icon", ...props }, ref) => (
    <Button ref={ref} variant={variant} size={size} {...props} />
  )
);
IconButton.displayName = "IconButton";

// Link Button - Button that looks like a link
export const LinkButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "link", ...props }, ref) => (
    <Button ref={ref} variant={variant} {...props}>
      {children}
      <ExternalLink className="w-4 h-4 ml-2" />
    </Button>
  )
);
LinkButton.displayName = "LinkButton";

// Refresh Button - For refresh actions
export const RefreshButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Refresh", variant = "outline", ...props }, ref) => (
    <Button ref={ref} variant={variant} {...props}>
      <RefreshCw className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
RefreshButton.displayName = "RefreshButton";

// Close Button - For closing modals/dialogs
export const CloseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "ghost", size = "icon", ...props }, ref) => (
    <Button ref={ref} variant={variant} size={size} {...props}>
      <X className="w-4 h-4" />
    </Button>
  )
);
CloseButton.displayName = "CloseButton";

// Add Button - For adding new items
export const AddButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Add", variant = "default", ...props }, ref) => (
    <Button ref={ref} variant={variant} {...props}>
      <Plus className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
AddButton.displayName = "AddButton";