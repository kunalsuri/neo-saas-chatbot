/**
 * Modern Toast Notification Setup with Sonner
 * Replacement for react-hot-toast
 */

import React from 'react';
import { toast as sonnerToast } from 'sonner';

export const modernToast = {
  success: (message: string, options?: { description?: string; duration?: number }) => {
    return sonnerToast.success(message, {
      description: options?.description,
      duration: options?.duration || 4000,
    });
  },

  error: (message: string, options?: { description?: string; duration?: number }) => {
    return sonnerToast.error(message, {
      description: options?.description,
      duration: options?.duration || 6000,
    });
  },

  info: (message: string, options?: { description?: string; duration?: number }) => {
    return sonnerToast.info(message, {
      description: options?.description,
      duration: options?.duration || 4000,
    });
  },

  warning: (message: string, options?: { description?: string; duration?: number }) => {
    return sonnerToast.warning(message, {
      description: options?.description,
      duration: options?.duration || 5000,
    });
  },

  loading: (message: string) => {
    return sonnerToast.loading(message);
  },

  promise: <T>(
    promise: Promise<T>,
    { loading, success, error }: { loading: string; success: string; error: string }
  ) => {
    return sonnerToast.promise(promise, {
      loading,
      success,
      error,
    });
  },

  custom: (jsx: (id: string | number) => React.ReactElement, options?: { duration?: number }) => {
    return sonnerToast.custom(jsx, {
      duration: options?.duration || 4000,
    });
  },

  dismiss: (id?: string | number) => {
    return sonnerToast.dismiss(id);
  },
};