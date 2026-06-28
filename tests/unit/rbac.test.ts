/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { describe, it, expect } from 'vitest';
import {
  hasPermission,
  isAdmin,
  isProUser,
  hasRoleLevel,
  getRolePermissions,
  canManageUsers,
  canAccessSystemSettings,
  canViewAnalytics,
  getRoleDisplayName,
  validateRole,
} from '../../server/shared/utils/rbac';

describe('RBAC Utilities', () => {
  describe('isAdmin', () => {
    it('should return true for admin role', () => {
      expect(isAdmin('admin')).toBe(true);
    });

    it('should return false for pro_user role', () => {
      expect(isAdmin('pro_user')).toBe(false);
    });

    it('should return false for free_user role', () => {
      expect(isAdmin('free_user')).toBe(false);
    });

    it('should return false for undefined role', () => {
      expect(isAdmin(undefined)).toBe(false);
    });
  });

  describe('isProUser', () => {
    it('should return true for admin role', () => {
      expect(isProUser('admin')).toBe(true);
    });

    it('should return true for pro_user role', () => {
      expect(isProUser('pro_user')).toBe(true);
    });

    it('should return false for free_user role', () => {
      expect(isProUser('free_user')).toBe(false);
    });

    it('should return false for undefined role', () => {
      expect(isProUser(undefined)).toBe(false);
    });
  });

  describe('hasRoleLevel', () => {
    it('should correctly compare roles in hierarchy', () => {
      // Admin checks
      expect(hasRoleLevel('admin', 'admin')).toBe(true);
      expect(hasRoleLevel('admin', 'pro_user')).toBe(true);
      expect(hasRoleLevel('admin', 'free_user')).toBe(true);

      // Pro User checks
      expect(hasRoleLevel('pro_user', 'admin')).toBe(false);
      expect(hasRoleLevel('pro_user', 'pro_user')).toBe(true);
      expect(hasRoleLevel('pro_user', 'free_user')).toBe(true);

      // Free User checks
      expect(hasRoleLevel('free_user', 'admin')).toBe(false);
      expect(hasRoleLevel('free_user', 'pro_user')).toBe(false);
      expect(hasRoleLevel('free_user', 'free_user')).toBe(true);
    });

    it('should return false if user role is undefined', () => {
      expect(hasRoleLevel(undefined, 'free_user')).toBe(false);
    });
  });

  describe('hasPermission', () => {
    it('should grant all permissions to admin', () => {
      expect(hasPermission('admin', 'user_management')).toBe(true);
      expect(hasPermission('admin', 'system_settings')).toBe(true);
      expect(hasPermission('admin', 'premium_features')).toBe(true);
      expect(hasPermission('admin', 'billing_management')).toBe(true);
    });

    it('should grant selective permissions to pro_user', () => {
      expect(hasPermission('pro_user', 'premium_features')).toBe(true);
      expect(hasPermission('pro_user', 'api_access')).toBe(true);
      expect(hasPermission('pro_user', 'user_management')).toBe(false);
      expect(hasPermission('pro_user', 'system_settings')).toBe(false);
    });

    it('should deny permissions to free_user', () => {
      expect(hasPermission('free_user', 'premium_features')).toBe(false);
      expect(hasPermission('free_user', 'user_management')).toBe(false);
    });

    it('should return false if role is undefined', () => {
      expect(hasPermission(undefined, 'premium_features')).toBe(false);
    });
  });

  describe('canManageUsers', () => {
    it('should allow admin and deny others', () => {
      expect(canManageUsers('admin')).toBe(true);
      expect(canManageUsers('pro_user')).toBe(false);
      expect(canManageUsers('free_user')).toBe(false);
      expect(canManageUsers(undefined)).toBe(false);
    });
  });

  describe('canAccessSystemSettings', () => {
    it('should allow admin and deny others', () => {
      expect(canAccessSystemSettings('admin')).toBe(true);
      expect(canAccessSystemSettings('pro_user')).toBe(false);
      expect(canAccessSystemSettings('free_user')).toBe(false);
      expect(canAccessSystemSettings(undefined)).toBe(false);
    });
  });

  describe('canViewAnalytics', () => {
    it('should allow admin and deny others', () => {
      expect(canViewAnalytics('admin')).toBe(true);
      expect(canViewAnalytics('pro_user')).toBe(false);
      expect(canViewAnalytics('free_user')).toBe(false);
      expect(canViewAnalytics(undefined)).toBe(false);
    });
  });

  describe('getRolePermissions', () => {
    it('should return list of permissions mapping to role', () => {
      expect(getRolePermissions('admin')).toContain('user_management');
      expect(getRolePermissions('pro_user')).toContain('premium_features');
      expect(getRolePermissions('free_user')).toEqual([]);
    });
  });

  describe('getRoleDisplayName', () => {
    it('should return user friendly names', () => {
      expect(getRoleDisplayName('admin')).toBe('Administrator');
      expect(getRoleDisplayName('pro_user')).toBe('Pro User');
      expect(getRoleDisplayName('free_user')).toBe('Free User');
    });
  });

  describe('validateRole', () => {
    it('should return typed role for valid role strings', () => {
      expect(validateRole('admin')).toBe('admin');
      expect(validateRole('pro_user')).toBe('pro_user');
      expect(validateRole('free_user')).toBe('free_user');
    });

    it('should return undefined for invalid role strings', () => {
      expect(validateRole('invalid_role')).toBeUndefined();
      expect(validateRole('')).toBeUndefined();
      expect(validateRole(undefined)).toBeUndefined();
    });
  });
});
