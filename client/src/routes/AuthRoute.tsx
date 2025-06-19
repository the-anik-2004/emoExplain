import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center text-amber-400 mt-20">Checking auth...</div>;
  }

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRoute;
