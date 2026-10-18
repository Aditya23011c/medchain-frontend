import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { api, USE_MOCK } from '../api/index.js';
import { homeFor, useAuth } from '../context/AuthContext.jsx';
import AuthShell from '../components/AuthShell.jsx';
import Brand from '../components/Brand.jsx';
import RolePicker, { ROLES } from '../components/RolePicker.jsx';
import { Button, ErrorState, Field, Tick } from '../components/common/index.jsx';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function strength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}
const LABEL = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];
const BAR = ['bg-mist', 'bg-coral', 'bg-honey', 'bg-signal', 'bg-mint'];

function PasswordField({ id, label, value, onChange, error, autoComplete, hint }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-soft">{label}</label>
      <div className="relative">
        <input id={id} type={show ? 'text' : 'password'} value={value} onChange={onChange} autoComplete={autoComplete} aria-invalid={!!error} className={`field pr-12 ${error ? '!border-coral' : ''}`} />
        <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-ink-mute hover:text-ink">
          {show ? <EyeOff className="h-5 w-5" aria-hidden /> : <Eye className="h-5 w-5" aria-hidden />}
        </button>
      </div>
      {error ? <p className="mt-1.5 text-sm font-medium text-coral">{error}</p> : hint}
    </div>
  );
}

export default function Register() {
  const { provider } = useAuth();
  const [role, setRole] = useState('doctor');
  const [f, setF] = useState({ name: '', license: '', email: '', phone: '', password: '', confirm: '', agree: false });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  if (provider) return <Navigate to={homeFor(provider.type)} replace />;

  const cfg = ROLES.find((r) => r.id === role);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const score = f.password ? Math.max(1, strength(f.password)) : 0;

  const validate = () => {
    const e = {};
    if (f.name.trim().length < 2) e.name = `Enter the ${cfg.nameLabel.toLowerCase()}.`;
    if (f.license.trim().length < 5) e.license = 'Enter your license number exactly as issued.';
    if (!EMAIL.test(f.email.trim())) e.email = 'Enter a valid email address.';
    if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\s/g, ''))) e.phone = 'Enter a 10-digit Indian mobile number.';
    if (f.password.length < 8 || strength(f.password) < 3) e.password = 'Use at least 8 characters with upper and lower case letters and a number.';
    if (f.confirm !== f.password) e.confirm = 'The passwords do not match.';
    if (!f.agree) e.agree = 'Please confirm to continue.';
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    setApiError(null);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      await api.register({ role, name: f.name.trim(), license_no: f.license.trim(), email: f.email.trim(), phone: f.phone.replace(/\s/g, ''), password: f.password });
      setDone(true);
    } catch (err) { setApiError(err.message); }
    finally { setLoading(false); }
  };

  if (done) {
    return (
      <AuthShell>
        <div className="w-full max-w-md animate-rise text-center">
          <span className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-mint-tint text-mint">
            <span className="absolute inset-0 animate-pulseRing rounded-full bg-mint/30" />
            <Tick className="relative h-9 w-9" />
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold">Registration received</h1>
          <p className="mt-3 text-ink-soft">We will check your license before the account is activated. You will be able to sign in once it is verified.</p>
          <div className="mt-6 rounded-2xl bg-cloud p-4 text-left text-sm text-ink-soft">
            <p className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden /> Registered as <b className="text-ink">{cfg.label}</b> with <b className="text-ink">{f.email.trim()}</b>.</p>
          </div>
          {USE_MOCK && <p className="mt-4 text-xs text-ink-mute">Demo mode: you can sign in right away with any password.</p>}
          <Link to="/login" className="btn-solid mt-8 w-full">Go to sign in</Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <form onSubmit={submit} noValidate className="w-full max-w-md animate-rise space-y-5">
        <div className="lg:hidden"><Brand /></div>
        <div>
          <h1 className="font-display text-4xl font-extrabold">Create a provider account</h1>
          <p className="mt-1 text-ink-soft">For doctors, diagnostic centers and pharmacies. Your license is verified before you can sign in.</p>
        </div>
        <RolePicker value={role} onChange={setRole} />
        <Field id="name" label={cfg.nameLabel} value={f.name} onChange={set('name')} error={errors.name} autoComplete="name" />
        <Field id="license" label={cfg.licenseLabel} value={f.license} onChange={set('license')} error={errors.license} autoComplete="off" hint="We check this against the issuing authority." />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="remail" type="email" label="Email" value={f.email} onChange={set('email')} error={errors.email} autoComplete="email" />
          <Field id="phone" type="tel" inputMode="numeric" label="Mobile number" value={f.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel-national" placeholder="98765 43210" />
        </div>
        <PasswordField id="rpassword" label="Password" value={f.password} onChange={set('password')} error={errors.password} autoComplete="new-password"
          hint={f.password && (
            <div className="mt-2" aria-live="polite">
              <div className="flex gap-1.5">{[1, 2, 3, 4].map((i) => <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= score ? BAR[score] : 'bg-mist'}`} />)}</div>
              <p className="mt-1 text-sm text-ink-mute">{LABEL[score]}</p>
            </div>
          )} />
        <PasswordField id="rconfirm" label="Confirm password" value={f.confirm} onChange={set('confirm')} error={errors.confirm} autoComplete="new-password" />
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
            <input type="checkbox" checked={f.agree} onChange={set('agree')} className="mt-1 h-5 w-5 shrink-0 rounded border-2 border-mist accent-[#1D6FD6]" />
            I confirm these details are accurate and I am authorised to work with patient records.
          </label>
          {errors.agree && <p className="mt-1.5 text-sm font-medium text-coral">{errors.agree}</p>}
        </div>
        {apiError && <ErrorState message={apiError} />}
        <Button type="submit" loading={loading} className="w-full">Create account</Button>
        <p className="text-center text-ink-soft">Already registered? <Link to="/login" className="font-semibold text-signal underline">Sign in</Link></p>
        {USE_MOCK && <p className="text-center text-xs text-ink-mute">Demo mode: an email containing “taken” shows the already-registered error.</p>}
      </form>
    </AuthShell>
  );
}
