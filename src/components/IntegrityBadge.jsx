import { useCallback, useEffect, useState } from 'react';
import { CircleHelp, Loader2, ShieldAlert } from 'lucide-react';
import { api } from '../api/index.js';
import { formatDate } from '../utils/formatDate.js';

const ShieldOk = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" strokeDasharray="24 24" className="animate-tick" />
  </svg>
);

const LOOK = {
  verified: { cls: 'bg-mint-tint text-mint', text: 'Integrity verified', Icon: ShieldOk },
  tampered: { cls: 'bg-coral-tint text-coral animate-shake', text: 'Hash mismatch: file was altered', Icon: ShieldAlert },
  checking: { cls: 'bg-cloud text-ink-mute', text: 'Checking…', Icon: Loader2 },
  unavailable: { cls: 'bg-honey-tint text-honey', text: 'Could not verify', Icon: CircleHelp },
};

/** Compares the report file's fingerprint with the one anchored on the blockchain. */
export default function IntegrityBadge({ reportId }) {
  const [state, setState] = useState('checking');
  const [anchoredAt, setAnchoredAt] = useState(null);

  const check = useCallback(() => {
    setState('checking');
    api.verifyReport(reportId)
      .then((r) => { setAnchoredAt(r.anchored_at); setState(r.match ? 'verified' : 'tampered'); })
      .catch(() => setState('unavailable'));
  }, [reportId]);
  useEffect(check, [check]);

  const { cls, text, Icon } = LOOK[state];
  return (
    <span className="inline-flex items-center gap-2">
      <span role="status" key={state} title={anchoredAt ? `Anchored ${formatDate(anchoredAt)}` : undefined} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${cls}`}>
        <Icon className={`h-5 w-5 ${state === 'checking' ? 'animate-spin' : ''}`} aria-hidden /> {text}
      </span>
      {(state === 'unavailable' || state === 'tampered') && <button onClick={check} className="text-sm font-semibold text-ink-soft underline">Check again</button>}
    </span>
  );
}
