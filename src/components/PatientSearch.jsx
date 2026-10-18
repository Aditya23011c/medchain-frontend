import { useState } from 'react';
import { Lock } from 'lucide-react';
import { api, USE_MOCK } from '../api/index.js';
import { Button, ErrorState, Field } from './common/index.jsx';
import { formatAadhaarInput } from '../utils/maskAadhaar.js';

/**
 * Name + Aadhaar lookup, shared by all three portals.
 * The raw Aadhaar lives only in this component's state and is cleared the moment the form is submitted.
 */
export default function PatientSearch({ onFound, submitLabel = 'Find patient' }) {
  const [name, setName] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const digits = aadhaar.replace(/\D/g, '');
    const next = {};
    if (!name.trim()) next.name = "Enter the patient's full name.";
    if (digits.length !== 12) next.aadhaar = 'Aadhaar must be 12 digits.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setAadhaar(''); // never keep the raw number after submit
    setApiError(null);
    setLoading(true);
    try { onFound(await api.lookupPatient({ name: name.trim(), aadhaar: digits })); }
    catch (err) { setApiError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <Field id="pname" label="Patient name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} autoComplete="off" />
      <Field id="paadhaar" label="Aadhaar number" value={aadhaar} inputMode="numeric" autoComplete="off" placeholder="1234 5678 9012"
        onChange={(e) => setAadhaar(formatAadhaarInput(e.target.value))} error={errors.aadhaar} />
      <p className="flex items-start gap-2 text-sm text-ink-soft"><Lock className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden />Used once to find the record, then discarded. Only the last four digits are ever shown.</p>
      {apiError && <ErrorState message={apiError} />}
      <Button type="submit" loading={loading} className="w-full">{submitLabel}</Button>
      {USE_MOCK && <p className="text-xs text-ink-mute">Demo mode: any name and 12 digits work. A name containing “nobody” returns not found, “fail” returns a server error.</p>}
    </form>
  );
}
