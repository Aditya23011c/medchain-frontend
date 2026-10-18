import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Shell from '../components/Shell.jsx';

/** Fails closed: no session -> /login, wrong role -> /403. */
export default function RoleGuard({ allow }) {
  const { provider } = useAuth();
  const location = useLocation();
  if (!provider || !provider.verified) return <Navigate to="/login" state={{ from: location }} replace />;
  if (!allow.includes(provider.type)) return <Navigate to="/403" replace />;
  return <Shell />;
}
