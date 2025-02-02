import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../state/authStore';

// Define available roles
export type UserRole = 'buyer' | 'seller' | 'admin';

interface ProtectedRouteProps {
  // Allow single role or array of roles
  role: UserRole | UserRole[];
  children: React.ReactNode;
  // Optional redirect path
  redirectTo?: string;
  // Optional loading component
  loadingComponent?: React.ReactNode;
  // Optional fallback for unauthorized access
  unauthorizedFallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  role,
  children,
  redirectTo = '/login',
  loadingComponent = null,
  unauthorizedFallback = null,
}) => {
  const location = useLocation();
  const { role: userRole, isLoading, isAuthenticated } = useAuthStore();

  // Handle loading state
  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  // Handle authentication check
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location.pathname }}
        replace 
      />
    );
  }

  // Check if user has required role(s)
  const hasRequiredRole = Array.isArray(role)
    ? role.includes(userRole as UserRole)
    : userRole === role;

  // Handle unauthorized access
  if (!hasRequiredRole) {
    if (unauthorizedFallback) {
      return <>{unauthorizedFallback}</>;
    }
    return (
      <Navigate 
        to="/unauthorized" 
        state={{ from: location.pathname }}
        replace 
      />
    );
  }

  // Render protected content
  return <>{children}</>;
};

// Higher-order component for role-based route protection
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

export default ProtectedRoute;
