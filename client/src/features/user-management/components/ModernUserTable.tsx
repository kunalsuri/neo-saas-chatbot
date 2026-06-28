/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

/**
 * Modernized User Table with latest shadcn/ui components
 * Features: Avatar, Skeleton loading, enhanced Checkbox, Command palette integration
 */

import React from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, Edit, Activity, Trash2, UserCheck, UserX, Shield, Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/shared/components/ui/dropdown-menu';
import { 
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command';
import { CompleteUser } from '@/features/user-management';
import { Role, ROLE_DISPLAY_NAMES } from '@/features/auth';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'destructive' | 'secondary' | 'outline';
type SortColumn = 'status' | 'plan' | 'createdAt' | 'lastLogin' | 'username' | 'email' | 'role';
type UserStatus = 'active' | 'inactive' | 'suspended';

interface ModernUserTableProps {
  readonly users: CompleteUser[];
  readonly isLoading: boolean;
  readonly selectedUsers: string[];
  readonly sortBy: SortColumn;
  readonly sortDirection: 'asc' | 'desc';
  readonly onSelectUser: (userId: string, isSelected: boolean) => void;
  readonly onSelectAll: (isSelected: boolean) => void;
  readonly onEditUser: (user: CompleteUser) => void;
  readonly onViewActivity: (userId: string) => void;
  readonly onDeleteUser: (userId: string, username: string) => void;
  readonly onChangeStatus?: (userId: string, status: UserStatus) => void;
  readonly onSortChange: (column: SortColumn) => void;
}

// Loading skeleton component
const UserTableSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }, (_, i) => `skeleton-row-${Date.now()}-${i}`).map((key) => (
      <div key={key} className="flex items-center space-x-4 p-4">
        <Skeleton className="h-4 w-4" />
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
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
);

export function ModernUserTable({
  users,
  isLoading,
  selectedUsers,
  sortBy,
  sortDirection,
  onSelectUser,
  onSelectAll,
  onEditUser,
  onViewActivity,
  onDeleteUser,
  onChangeStatus,
  onSortChange
}: ModernUserTableProps) {
  const [commandOpen, setCommandOpen] = React.useState(false);
  
  const getRoleBadgeVariant = (role: Role): BadgeVariant => {
    const colorMap: Record<Role, BadgeVariant> = {
      admin: 'destructive',
      pro_user: 'default',
      free_user: 'secondary',
    };
    return colorMap[role] || 'secondary';
  };

  const getStatusBadgeVariant = (status: string): BadgeVariant => {
    const colorMap: Record<string, BadgeVariant> = {
      active: 'default',
      inactive: 'secondary',
      suspended: 'destructive',
      pending: 'outline',
    };
    return colorMap[status] || 'secondary';
  };

  const getInitials = (name?: string, username?: string, email?: string) => {
    if (name) {
      return name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2);
    }
    if (username) {
      return username.slice(0, 2).toUpperCase();
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  // Command palette for quick user search and actions
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-[200px]" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCommandOpen(true)}
            className="relative"
          >
            <Search className="mr-2 h-4 w-4" />
            Quick Search...
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
        <UserTableSkeleton />
      </div>
    );
  }

  return (
    <>
      {/* Command Dialog for Quick Actions */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search users or actions..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Users">
            {users.slice(0, 5).map((user) => (
              <CommandItem
                key={user.id}
                onSelect={() => {
                  onEditUser(user);
                  setCommandOpen(false);
                }}
              >
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarImage src={user.avatar || undefined} alt={user.name || user.username} />
                  <AvatarFallback className="text-xs">
                    {getInitials(user.name, user.username, user.email)}
                  </AvatarFallback>
                </Avatar>
                <span>{user.name || user.username}</span>
                <span className="ml-auto text-xs text-muted-foreground">{user.email}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => setCommandOpen(false)}>
              <UserCheck className="mr-2 h-4 w-4" />
              <span>Create New User</span>
            </CommandItem>
            <CommandItem onSelect={() => setCommandOpen(false)}>
              <Activity className="mr-2 h-4 w-4" />
              <span>View Analytics</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {selectedUsers.length > 0 && (
              <span>{selectedUsers.length} of {users.length} user(s) selected</span>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCommandOpen(true)}
            className="relative"
          >
            <Search className="mr-2 h-4 w-4" />
            Quick Search...
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]">
                  <Checkbox
                    checked={users.length > 0 && selectedUsers.length === users.length}
                    onCheckedChange={(checked) => onSelectAll(!!checked)}
                    aria-label="Select all users"
                  />
                </TableHead>
                <TableHead>User</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-medium"
                    onClick={() => onSortChange('role')}
                  >
                    Role
                    {sortBy === 'role' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-medium"
                    onClick={() => onSortChange('plan')}
                  >
                    Plan
                    {sortBy === 'plan' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-medium"
                    onClick={() => onSortChange('status')}
                  >
                    Status
                    {sortBy === 'status' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-medium"
                    onClick={() => onSortChange('createdAt')}
                  >
                    Created
                    {sortBy === 'createdAt' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-medium"
                    onClick={() => onSortChange('lastLogin')}
                  >
                    Last Login
                    {sortBy === 'lastLogin' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow 
                  key={user.id}
                  className={cn(
                    "group hover:bg-muted/50 transition-colors",
                    selectedUsers.includes(user.id) && "bg-muted/30"
                  )}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) => onSelectUser(user.id, !!checked)}
                      aria-label={`Select ${user.name || user.username}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={user.avatar || undefined} 
                          alt={user.name || user.username}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                          {getInitials(user.name, user.username, user.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="font-medium leading-none">
                          {user.name || user.username}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role || 'free_user')}>
                      {ROLE_DISPLAY_NAMES[user.role || 'free_user']}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewActivity(user.id)}>
                          <Activity className="mr-2 h-4 w-4" />
                          View Activity
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {onChangeStatus && (
                          <>
                            {user.status !== 'active' && (
                              <DropdownMenuItem 
                                onClick={() => onChangeStatus(user.id, 'active')}
                                className="text-green-600"
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            {user.status === 'active' && (
                              <DropdownMenuItem 
                                onClick={() => onChangeStatus(user.id, 'inactive')}
                                className="text-orange-600"
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Deactivate
                              </DropdownMenuItem>
                            )}
                            {user.status !== 'suspended' && (
                              <DropdownMenuItem 
                                onClick={() => onChangeStatus(user.id, 'suspended')}
                                className="text-red-600"
                              >
                                <Shield className="mr-2 h-4 w-4" />
                                Suspend
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem 
                          onClick={() => onDeleteUser(user.id, user.name || user.username)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No users found</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ModernUserTable;