import { Link, Navigate } from 'react-router-dom';
import Brand from '../components/Brand.jsx';
import Flythrough from '../components/Flythrough.jsx';
import { useAuth, homeFor } from '../context/AuthContext.jsx';

export default function Landing() {
  const { provider } = useAuth();
  if (provider) return <Navigate to={homeFor(provider.type)} replace />;
  return (
    <div>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-mist/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Brand />
          <Link to="/login" className="btn-line !py-2">Sign in</Link>
        </div>
      </header>
      <Flythrough />
    </div>
  );
}
