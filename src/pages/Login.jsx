import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { api, USE_MOCK } from '../api/index.js';
import { homeFor, useAuth } from '../context/AuthContext.jsx';
import AuthShell from '../components/AuthShell.jsx';
import Brand from '../components/Brand.jsx';
import RolePicker, { ROLES } from '../components/RolePicker.jsx';
import { Button, ErrorState, Field } from '../components/common/index.jsx';

export default function Login() {
  const { provider, signIn } = useAuth();
  const nav = useNavigate();
  const [role, setRole] = useState('doctor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  if (provider) return <Navigate to={homeFor(provider.type)} replace />;

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const session = await api.login({ role, email: email.trim(), password });
      signIn(session);
      nav(homeFor(session.provider.type), { replace: true });
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <AuthShell>
      <form onSubmit={submit} noValidate className="w-full max-w-md animate-rise space-y-6">
        <div className="lg:hidden"><Brand /></div>
        <div>
          <h1 className="font-display text-4xl font-extrabold">Welcome back</h1>
          <p className="mt-1 text-ink-soft">Choose how you work with patients, then sign in.</p>
        </div>
        <RolePicker value={role} onChange={setRole} />
        <p className="rounded-2xl bg-cloud px-4 py-3 text-sm text-ink-soft">{ROLES.find((r) => r.id === role).note}</p>
        <Field id="email" type="email" label="Registered email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
        <Field id="password" type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        {error && <ErrorState message={error} />}
        <Button type="submit" loading={loading} className="w-full">Sign in</Button>
        <p className="text-center text-ink-soft">New to MedChain? <Link to="/register" className="font-semibold text-signal underline">Create a provider account</Link></p>
        {USE_MOCK && <p className="text-center text-xs text-ink-mute">Demo mode: any email and password work. The password “wrong” shows the error state.</p>}
      </form>
    </AuthShell>
  );
}
