// src/components/PublicRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
