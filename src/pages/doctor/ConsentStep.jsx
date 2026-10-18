import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { KeyRound, Smartphone } from 'lucide-react';
import { api, USE_MOCK } from '../../api/index.js';
import { Button, ErrorState } from '../../components/common/index.jsx';
import OtpInput from '../../components/OtpInput.jsx';
import { usePatientSession } from '../../context/PatientSession.jsx';

export default function ConsentStep() {
  const { patient, setConsent } = usePatientSession();
  const nav = useNavigate();
  const expired = useLocation().state?.expired;
  const [consentId, setConsentId] = useState(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(true);
  const [verifying, setVerifying] = useState(false);

  const sendCode = () => {
    if (!patient) return;
    setSending(true);
    setError(null);
    api.requestConsent(patient.patient_id).then((r) => setConsentId(r.consent_id)).catch((e) => setError(e.message)).finally(() => setSending(false));
  };
  useEffect(() => { setConsent(null); sendCode(); /* eslint-disable-next-line */ }, []);
  if (!patient) return <Navigate to="/doctor" replace />;

  const verify = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setError(null);
    try {
      const r = await api.verifyConsent({ consent_id: consentId, otp });
      setConsent({ token: r.consent_token, expiresAt: Date.parse(r.expires_at) });
      nav(`/doctor/patient/${patient.patient_id}`, { replace: true });
    } catch (err) { setError(err.message); setOtp(''); }
    finally { setVerifying(false); }
  };

  return (
    <div className="mx-auto max-w-lg">
      <form onSubmit={verify} noValidate className="sheet animate-rise space-y-6 p-8">
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-signal-tint text-signal">
          <span className="absolute inset-0 animate-pulseRing rounded-full bg-signal/30" />
          <Smartphone className="relative h-7 w-7" aria-hidden />
        </span>
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-tight">Ask {patient.name.split(' ')[0]} for their code</h1>
          <p className="mt-2 text-ink-soft">We sent a 6-digit code to the phone linked to Aadhaar <span className="font-semibold num">{patient.aadhaar_masked}</span>. Once they read it out, you can open the record for 30 minutes.</p>
        </div>
        {expired && <ErrorState message="Your access expired. Ask the patient for a new code." />}
        <OtpInput id="otp" value={otp} onChange={setOtp} />
        {error && <ErrorState message={error} onRetry={!consentId ? sendCode : undefined} />}
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" loading={verifying} disabled={otp.length !== 6 || !consentId}><KeyRound className="h-4 w-4" aria-hidden /> Open record</Button>
          <Button type="button" variant="line" loading={sending} onClick={sendCode}>Send a new code</Button>
        </div>
        {USE_MOCK && <p className="text-xs text-ink-mute">Demo mode: the code is 123456.</p>}
      </form>
    </div>
  );
}
