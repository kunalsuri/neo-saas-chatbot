/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

/**
 * Modernized User Management Page with latest shadcn/ui components
 * Features: Command palette, Sonner toasts, Avatar components, Skeleton loading
 */

import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { secureGet, securePost, securePut, secureDelete } from '@/features/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { modernToast } from '@/shared/utils/modernToast';

// Import modernized components
import { ModernUserManagementHeader } from './ModernUserManagementHeader';
import { ModernUserTable } from './ModernUserTable';
import { UserStats } from './UserStats';
import { UserPagination } from './UserPagination';
import { UserFormDialog } from './UserFormDialog';
import { UserActivityDialog, transformUserActivityToItems } from './UserActivityDialog';
import { UserAnalyticsDashboard } from './UserAnalyticsDashboard';
import { EnhancedUserFilters } from './EnhancedUserFilters';
import { UserManagementErrorBoundary } from './ErrorBoundary';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { BulkActionDialog } from './BulkActionDialog';
import { UserManagementErrorState } from './UserManagementErrorState';

// Import types
import { CompleteUser, UserQuery } from '../types/user-management';
import { Role } from '@/features/auth';
import { UserActivity } from '../types/user-activity';

// Import hooks
import { useUserManagementWebSocket } from '../hooks/useWebSocket';
import { useDebouncedSearch } from '../hooks/useDebounce';

// Loading skeleton for user management page
const UserManagementSkeleton = () => (
  <div className="container mx-auto p-6 space-y-6">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[150px] mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-[120px]" />
          <Skeleton className="h-9 w-[100px]" />
        </div>
      </div>
      <Skeleton className="h-px w-full" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={`stat-skeleton-${i}`}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-[100px]" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-[60px]" />
              <Skeleton className="h-4 w-4" />
            </div>
            <Skeleton className="h-3 w-[120px] mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
    
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-[80px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`table-skeleton-${i}`} className="flex items-center space-x-4 p-4">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-3 w-[100px]" />
                </div>
                <Skeleton className="h-6 w-[60px]" />
                <Skeleton className="h-6 w-[50px]" />
                <Skeleton className="h-6 w-[70px]" />
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-8 w-8" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export function ModernUserManagement() {
  const queryClient = useQueryClient();

  // Real-time updates via WebSocket
  const { isConnected: wsConnected, connectionStatus } = useUserManagementWebSocket();

  // Enhanced search with debouncing
  const { searchValue, setSearchValue, debouncedValue } = useDebouncedSearch('', 300);

  // State for filters, sorting, and pagination
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive' | 'suspended' | 'pending' | 'all_statuses'>('all_statuses');
  const [roleFilter, setRoleFilter] = useState<Role | 'all_roles'>('all_roles');
  const [filteredUsers, setFilteredUsers] = useState<CompleteUser[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);

  type SortField = 'status' | 'plan' | 'createdAt' | 'lastLogin' | 'username' | 'email' | 'role';
  const [sorting, setSorting] = useState({ sortBy: 'createdAt' as SortField, sortDirection: 'desc' as 'asc' | 'desc' });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // State for selected users (for bulk actions)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // State for dialogs
  const [userFormDialog, setUserFormDialog] = useState({
    isOpen: false,
    user: undefined as CompleteUser | undefined,
  });

  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);

  // Confirmation dialog states
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({
    isOpen: false,
    userId: '',
    username: '',
  });

  const [bulkActionDialog, setBulkActionDialog] = useState({
    isOpen: false,
    action: '' as 'activate' | 'deactivate' | '',
  });

  // User Management API functions (same as before)
  const userManagementApi = {
    getUsers: async (query: UserQuery): Promise<{ users: CompleteUser[]; pagination: any }> => {
      const params = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, String(value));
        }
      });

      const response = await secureGet(`/api/users?${params.toString()}`);
      if (!response.success) throw new Error(response.error || 'Failed to fetch users');
      return response.data;
    },

    createUser: async (userData: Partial<CompleteUser>): Promise<CompleteUser> => {
      const response = await securePost('/api/users', userData);
      if (!response.success) throw new Error(response.error || 'Failed to create user');
      return response.data;
    },

    updateUser: async (id: string, userData: Partial<CompleteUser>): Promise<CompleteUser> => {
      const response = await securePut(`/api/users/${id}`, userData);
      if (!response.success) throw new Error(response.error || 'Failed to update user');
      return response.data;
    },

    deleteUser: async (id: string): Promise<void> => {
      const response = await secureDelete(`/api/users/${id}`);
      if (!response.success) throw new Error(response.error || 'Failed to delete user');
    },

    getUserActivity: async (userId: string): Promise<UserActivity> => {
      const response = await secureGet(`/api/user-activity/${userId}`);
      if (!response.success) throw new Error(response.error || 'Failed to fetch user activity');
      return response.data.activity;
    },

    bulkActivateUsers: async (userIds: string[]): Promise<void> => {
      const response = await securePost('/api/users/bulk-activate', { userIds });
      if (!response.success) throw new Error(response.error || 'Failed to activate users');
    },

    bulkDeactivateUsers: async (userIds: string[]): Promise<void> => {
      const response = await securePost('/api/users/bulk-deactivate', { userIds });
      if (!response.success) throw new Error(response.error || 'Failed to deactivate users');
    },

    changeUserStatus: async (userId: string, status: 'active' | 'inactive' | 'suspended'): Promise<CompleteUser> => {
      const response = await fetch(`/api/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to change user status' }));
        throw new Error(errorData.error || 'Failed to change user status');
      }

      const result = await response.json();
      if (!result.success) throw new Error(result.error || 'Failed to change user status');
      return result.data;
    },
  };

  // Combine all query parameters
  const queryParams = useMemo(() => ({
    search: debouncedValue,
    status: statusFilter !== 'all_statuses' ? statusFilter : undefined,
    role: roleFilter !== 'all_roles' ? roleFilter : undefined,
    sortBy: sorting.sortBy,
    sortOrder: sorting.sortDirection,
    page: currentPage,
    limit: pageSize
  }), [debouncedValue, statusFilter, roleFilter, sorting, currentPage, pageSize]);

  // Main users query
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users', debouncedValue, statusFilter, roleFilter, sorting, currentPage, pageSize, 'admin-panel'],
    queryFn: () => userManagementApi.getUsers(queryParams),
    placeholderData: (previousData) => previousData,
    retry: (failureCount, error) => {
      if (error.message.includes('Authentication') || error.message.includes('401')) {
        return false;
      }
      return failureCount < 2;
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  // User activity query
  const { data: activityData, isLoading: isLoadingActivity } = useQuery<UserActivity>({
    queryKey: ['userActivity', selectedUserId],
    queryFn: () => userManagementApi.getUserActivity(selectedUserId),
    enabled: !!selectedUserId && isActivityDialogOpen
  });

  // Mutations with modernToast
  const createUserMutation = useMutation({
    mutationFn: (userData: Partial<CompleteUser>) => userManagementApi.createUser(userData),
    onSuccess: () => {
      modernToast.success('User created successfully');
      setUserFormDialog({ isOpen: false, user: undefined });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      modernToast.error('Failed to create user', { description: error.message });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: Partial<CompleteUser> }) =>
      userManagementApi.updateUser(id, userData),
    onSuccess: () => {
      modernToast.success('User updated successfully');
      setUserFormDialog({ isOpen: false, user: undefined });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      modernToast.error('Failed to update user', { description: error.message });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => userManagementApi.deleteUser(id),
    onSuccess: () => {
      modernToast.success('User deleted successfully');
      setDeleteConfirmDialog({ isOpen: false, userId: '', username: '' });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      modernToast.error('Failed to delete user', { description: error.message });
    },
  });

  const changeStatusMutation = useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: 'active' | 'inactive' | 'suspended' }) =>
      userManagementApi.changeUserStatus(userId, status),
    onSuccess: (data, variables) => {
      const statusText = variables.status === 'active' ? 'activated' :
        variables.status === 'inactive' ? 'deactivated' : 'suspended';
      modernToast.success(`User ${statusText} successfully`);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      modernToast.error('Failed to change user status', { description: error.message });
    },
  });

  // Event handlers (same as before but simplified)
  const handleCreateUser = () => {
    setUserFormDialog({ isOpen: true, user: undefined });
  };

  const handleEditUser = (user: CompleteUser) => {
    setUserFormDialog({ isOpen: true, user });
  };

  const handleUserFormSubmit = (data: Partial<CompleteUser>) => {
    if (userFormDialog.user) {
      updateUserMutation.mutate({ id: userFormDialog.user.id, userData: data });
    } else {
      createUserMutation.mutate(data);
    }
  };

  // Loading state with modern skeleton
  if (isLoading && !data) {
    return <UserManagementSkeleton />;
  }

  // Error state
  if (error && !data) {
    return (
      <UserManagementErrorState
        error={error}
        isLoading={isLoading}
        onRetry={() => refetch()}
        onRefreshPage={() => window.location.reload()}
      />
    );
  }

  return (
    <UserManagementErrorBoundary>
      <div className="container mx-auto p-6 space-y-6">
        <ModernUserManagementHeader
          wsConnected={wsConnected}
          showAnalytics={showAnalytics}
          userCount={data?.users.length}
          onToggleAnalytics={() => setShowAnalytics(!showAnalytics)}
          onCreateUser={handleCreateUser}
        />

        {/* Analytics Dashboard */}
        {showAnalytics && (
          <UserAnalyticsDashboard users={data?.users || []} />
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users">Users ({data?.users.length || 0})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            {/* User Stats */}
            <UserStats
              users={data?.users || []}
              totalUsers={data?.pagination?.total || 0}
            />

            {/* Enhanced User Filters */}
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <EnhancedUserFilters
                    users={data?.users || []}
                    onFilteredUsersChange={setFilteredUsers}
                    selectedUsers={selectedUsers}
                    onBulkAction={(action) => {
                      if (action === 'export') {
                        // Export handled in the component
                      } else {
                        setBulkActionDialog({ isOpen: true, action });
                      }
                    }}
                  />

                  {/* Modern User Table */}
                  <ModernUserTable
                    users={filteredUsers.length > 0 ? filteredUsers : data?.users || []}
                    isLoading={isLoading}
                    sortBy={sorting.sortBy}
                    sortDirection={sorting.sortDirection}
                    selectedUsers={selectedUsers}
                    onSelectUser={(userId, isSelected) => {
                      setSelectedUsers(prev =>
                        isSelected ? [...prev, userId] : prev.filter(id => id !== userId)
                      );
                    }}
                    onSelectAll={(isSelected) => {
                      setSelectedUsers(isSelected && data?.users ? data.users.map(user => user.id) : []);
                    }}
                    onEditUser={handleEditUser}
                    onViewActivity={(userId: string) => {
                      const user = (filteredUsers.length > 0 ? filteredUsers : data?.users || []).find(u => u.id === userId);
                      if (user) {
                        setSelectedUserId(userId);
                        setSelectedUsername(user.username);
                        setIsActivityDialogOpen(true);
                      }
                    }}
                    onDeleteUser={(userId, username) => {
                      setDeleteConfirmDialog({ isOpen: true, userId, username });
                    }}
                    onChangeStatus={(userId, status) => {
                      changeStatusMutation.mutate({ userId, status });
                    }}
                    onSortChange={(sortBy) => {
                      setSorting(prev => ({
                        sortBy,
                        sortDirection: prev.sortBy === sortBy && prev.sortDirection === 'asc' ? 'desc' : 'asc',
                      }));
                    }}
                  />

                  {/* Pagination */}
                  {data?.pagination && (
                    <UserPagination
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      pageSize={pageSize}
                      setPageSize={setPageSize}
                      totalItems={data.pagination.total}
                      totalPages={data.pagination.totalPages}
                      isLoading={isLoading}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <UserAnalyticsDashboard users={data?.users || []} />
          </TabsContent>
        </Tabs>

        {/* Dialogs (same as before) */}
        <UserFormDialog
          isOpen={userFormDialog.isOpen}
          onClose={() => setUserFormDialog({ isOpen: false, user: undefined })}
          {...(userFormDialog.user ? { user: userFormDialog.user } : {})}
          onSubmit={handleUserFormSubmit}
          isLoading={createUserMutation.isPending || updateUserMutation.isPending}
        />

        {isActivityDialogOpen && (
          <UserActivityDialog
            isOpen={isActivityDialogOpen}
            onClose={() => setIsActivityDialogOpen(false)}
            userId={selectedUserId}
            username={selectedUsername}
            activities={transformUserActivityToItems(activityData)}
            isLoading={isLoadingActivity}
          />
        )}

        <DeleteConfirmationDialog
          isOpen={deleteConfirmDialog.isOpen}
          username={deleteConfirmDialog.username}
          isDeleting={deleteUserMutation.isPending}
          onCancel={() => setDeleteConfirmDialog({ isOpen: false, userId: '', username: '' })}
          onConfirm={() => {
            if (deleteConfirmDialog.userId) {
              deleteUserMutation.mutate(deleteConfirmDialog.userId);
            }
          }}
        />

        <BulkActionDialog
          isOpen={bulkActionDialog.isOpen}
          action={bulkActionDialog.action}
          selectedUserCount={selectedUsers.length}
          isProcessing={false}
          onCancel={() => setBulkActionDialog({ isOpen: false, action: '' })}
          onConfirm={() => {
            setBulkActionDialog({ isOpen: false, action: '' });
            setSelectedUsers([]);
          }}
        />
      </div>
    </UserManagementErrorBoundary>
  );
}

export default ModernUserManagement;