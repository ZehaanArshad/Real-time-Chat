import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function GuestRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return user ? <Navigate to="/" replace /> : <Outlet />;
}

export default GuestRoute;
