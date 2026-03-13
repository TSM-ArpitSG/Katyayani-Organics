/**
 * ProtectedRoute Component
 * 
 * @author Arpit Singh
 * @description A route wrapper component that protects routes from unauthorized access.
 * Redirects unauthenticated users to the login page.
 * 
 * @component
 * @example
 * <ProtectedRoute>
 *   <DashboardPage />
 * </ProtectedRoute>
 */

import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';

/**
 * Props for ProtectedRoute component
 * @interface ProtectedRouteProps
 * @property {React.ReactNode} children - Child components to render if authenticated
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute - Guards routes that require authentication
 * 
 * @param {ProtectedRouteProps} props - Component props
 * @returns {JSX.Element} Either the protected children or redirect to login
 * 
 * @description
 * - Checks authentication status from Redux store
 * - If authenticated: renders children components
 * - If not authenticated: redirects to /login page
 * - Uses 'replace' to prevent back navigation to protected route
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Get authentication status from Redux store
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Redirect to login if user is not authenticated
  // 'replace' prop prevents adding to browser history
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content if authenticated
  return <>{children}</>;
}