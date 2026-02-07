import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If admin route, check user role
  if (requireAdmin) {
    // Note: In a real app, you'd decode the JWT token to get the role
    // For now, we'll check if user has admin token (you can enhance this)
    // You might want to store user role in localStorage after login
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'Admin') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
