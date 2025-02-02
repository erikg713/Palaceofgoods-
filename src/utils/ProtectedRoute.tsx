import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../state/authStore';

// Enhanced role types with permissions
export type Permission = 
  | 'read:users'
  | 'write:users'
  | 'read:products'
  | 'write:products'
  | 'manage:settings';

export type UserRole = 'buyer' | 'seller' | 'admin';

interface RoleConfig {
  permissions: Permission[];
  level: number;
}

// Role configuration with hierarchical permissions
const ROLE_CONFIG: Record<UserRole, RoleConfig> = {
  buyer: {
    permissions: ['read:products'],
    level: 1
  },
  seller: {
    permissions: ['read:products', 'write:products'],
    level: 2
  },
  admin: {
    permissions: ['read:users', 'write:users', 'read:products', 'write:products', 'manage:settings'],
    level: 3
  }
};

// Enhanced props interface
interface ProtectedRouteProps {
  role: UserRole | UserRole[];
  children: React.ReactNode;
  redirectTo?: string;
  loadingComponent?: React.ReactNode;
  unauthorizedFallback?: React.ReactNode;
  requirePermissions?: Permission[];
  minRoleLevel?: number;
  sessionTimeout?: number;
  onSessionExpired?: () => void;
}

// Custom hook for session management
const useSessionTimeout = (timeout?: number, onExpire?: () => void) => {
  useEffect(() => {
    if (!timeout) return;

    let timeoutId: NodeJS.Timeout;
    
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        onExpire?.();
      }, timeout * 1000);
    };

    // Reset timeout on user activity
    const handleActivity = () => {
      resetTimeout();
    };

    // Set up event listeners
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    // Initial timeout
    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [timeout, onExpire]);
};

// Custom hook for permission checking
const usePermissionCheck = (
  userRole: UserRole | null, 
  requiredRole: UserRole | UserRole[],
  requiredPermissions?: Permission[],
  minRoleLevel?: number
) => {
  if (!userRole) return false;

  // Check if user has required role
  const hasRequiredRole = Array.isArray(requiredRole)
    ? requiredRole.includes(userRole)
    : userRole === requiredRole;

  if (!hasRequiredRole) return false;

  const userConfig = ROLE_CONFIG[userRole];

  // Check minimum role level
  if (minRoleLevel && userConfig.level < minRoleLevel) {
    return false;
  }

  // Check specific permissions
  if (requiredPermissions?.length) {
    return requiredPermissions.every(permission => 
      userConfig.permissions.includes(permission)
    );
  }

  return true;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  role,
  children,
  redirectTo = '/login',
  loadingComponent = null,
  unauthorizedFallback = null,
  requirePermissions,
  minRoleLevel,
  sessionTimeout,
  onSessionExpired
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    role: userRole, 
    isLoading, 
    isAuthenticated,
    lastActivityTime,
    logout 
  } = useAuthStore();

  // Handle session timeout
  useSessionTimeout(sessionTimeout, () => {
    logout();
    onSessionExpired?.();
    navigate(redirectTo, { state: { from: location.pathname, reason: 'session_timeout' } });
  });

  // Check for session expiration
  useEffect(() => {
    if (lastActivityTime && sessionTimeout) {
      const timeSinceLastActivity = (Date.now() - lastActivityTime) / 1000;
      if (timeSinceLastActivity > sessionTimeout) {
        logout();
        onSessionExpired?.();
        navigate(redirectTo, { 
          state: { from: location.pathname, reason: 'session_timeout' } 
        });
      }
    }
  }, [lastActivityTime, sessionTimeout, logout, navigate, redirectTo]);

  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ 
          from: location.pathname,
          reason: 'unauthenticated'
        }}
        replace 
      />
    );
  }

  const hasPermission = usePermissionCheck(
    userRole, 
    role, 
    requirePermissions, 
    minRoleLevel
  );

  if (!hasPermission) {
    if (unauthorizedFallback) {
      return <>{unauthorizedFallback}</>;
    }
    return (
      <Navigate 
        to="/unauthorized" 
        state={{ 
          from: location.pathname,
          reason: 'unauthorized',
          requiredRole: role,
          requiredPermissions,
          minRoleLevel
        }}
        replace 
      />
    );
  }

  return <>{children}</>;
};

// Enhanced HOC with all options
export const withRoleProtection = (
  WrappedComponent: React.ComponentType<any>,
  role: UserRole | UserRole[],
  options: Omit<ProtectedRouteProps, 'role' | 'children'> = {}
) => {
  return function WithRoleProtection(props: any) {
    return (
      <ProtectedRoute role={role} {...options}>
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };
};

// Utility function to check if a role has specific permissions
export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  return ROLE_CONFIG[role].permissions.includes(permission);
};

// Utility function to check if a role meets a minimum level requirement
export const meetsMinimumLevel = (role: UserRole, minLevel: number): boolean => {
  return ROLE_CONFIG[role].level >= minLevel;
};

export default ProtectedRoute;
