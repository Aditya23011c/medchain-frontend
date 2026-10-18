import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FlaskConical, Pill, Stethoscope } from 'lucide-react';
import { api, USE_MOCK } from '../api/index.js';
import { homeFor, useAuth } from '../context/AuthContext.jsx';
import Brand, { Mark } from '../components/Brand.jsx';
import { Button, ErrorState, Field } from '../components/common/index.jsx';

const ROLES = [
  { id: 'doctor', label: 'Doctor', Icon: Stethoscope, note: 'Search patients and read full records, after the patient consents.' },
  { id: 'diagnostic_center', label: 'Diagnostic center', Icon: FlaskConical, note: 'Upload lab reports. You cannot read anyone’s history.' },
  { id: 'pharmacy', label: 'Pharmacy', Icon: Pill, note: 'Record dispensed medicines. You cannot read anyone’s history.' },
];

// A gyroscope of three tilted rings with a seal at its centre.
function Gyro() {
  const rings = ['rotateX(72deg)', 'rotateY(72deg)', 'rotateX(72deg) rotateY(60deg)'];
  return (
    <div className="relative mx-auto h-72 w-72 [perspective:900px]" aria-hidden>
      <div className="absolute inset-0 animate-orbit [transform-style:preserve-3d]">
        {rings.map((t, i) => (
          <div key={t} className="absolute inset-0 rounded-full border-2 border-white/30" style={{ transform: t }}>
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#4FD6A5] shadow-[0_0_14px_#4FD6A5]" style={{ opacity: 1 - i * 0.2 }} />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center"><Mark className="h-24 w-24 drop-shadow-[0_0_28px_rgba(141,187,245,0.7)]" /></div>
    </div>
  );
}

export default function Login() {
  const { provider, signIn } = useAuth();
  const nav = useNavigate();
  const [role, setRole] = useState('doctor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  if (provider) return <Navigate to={homeFor(provider.type)} replace />;
  const current = ROLES.find((r) => r.id === role);

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
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden p-12 text-white lg:flex" style={{ background: 'linear-gradient(160deg,#0E2236 0%,#123a63 100%)' }}>
        <Link to="/"><Brand light /></Link>
        <div>
          <Gyro />
          <h2 className="mx-auto mt-10 max-w-md text-center font-display text-4xl font-extrabold leading-tight !text-white">Records that stay whole, wherever care happens.</h2>
          <p className="mx-auto mt-3 max-w-sm text-center text-white/70">Encrypted files, a fingerprint on the chain, and the patient’s consent before any doctor looks.</p>
        </div>
        <p className="text-sm text-white/50">Only license-verified providers can sign in.</p>
      </aside>

      <main className="flex items-center justify-center px-5 py-12">
        <form onSubmit={submit} noValidate className="w-full max-w-md animate-rise space-y-6">
          <div className="lg:hidden"><Brand /></div>
          <div>
            <h1 className="font-display text-4xl font-extrabold">Welcome back</h1>
            <p className="mt-1 text-ink-soft">Choose how you work with patients, then sign in.</p>
          </div>
          <div role="radiogroup" aria-label="Sign in as" className="grid grid-cols-3 gap-2">
            {ROLES.map(({ id, label, Icon }) => (
              <button key={id} type="button" role="radio" aria-checked={role === id} onClick={() => setRole(id)}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-2 py-4 text-sm font-semibold transition ${role === id ? 'border-signal bg-signal-tint text-signal-deep' : 'border-mist bg-white text-ink-soft hover:border-signal/50'}`}>
                <Icon className="h-6 w-6" aria-hidden /> <span className="text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
          <p className="rounded-2xl bg-cloud px-4 py-3 text-sm text-ink-soft">{current.note}</p>
          <Field id="email" type="email" label="Registered email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          <Field id="password" type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          {error && <ErrorState message={error} />}
          <Button type="submit" loading={loading} className="w-full">Sign in</Button>
          {USE_MOCK && <p className="text-center text-xs text-ink-mute">Demo mode: any email and password work. The password “wrong” shows the error state.</p>}
        </form>
      </main>
    </div>
  );
}
