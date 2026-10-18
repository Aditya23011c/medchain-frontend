import { Lock } from 'lucide-react';
import { ageFrom, mmss } from '../utils/formatDate.js';

// Deterministic barcode so each patient id draws its own bars.
function Barcode({ value }) {
  let h = 7;
  for (const c of value) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const bars = [];
  let x = 0;
  for (let i = 0; i < 36; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    const w = 1 + ((h >>> 16) % 3);
    bars.push(<rect key={i} x={x} y="0" width={w} height="34" />);
    x += w + 1 + ((h >>> 8) % 2);
  }
  return <svg viewBox={`0 0 ${x} 34`} className="h-9 w-36 fill-ink" aria-hidden>{bars}</svg>;
}

function ConsentRing({ remaining, total = 1800 }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const low = remaining < 300;
  return (
    <div className="relative h-[72px] w-[72px]" role="timer" aria-label={`Access ends in ${mmss(remaining)}`}>
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#E9F0F6" strokeWidth="6" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={low ? '#D93B45' : '#13966C'} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, remaining / total))} style={{ transition: 'stroke-dashoffset 1s linear, stroke .4s' }} />
      </svg>
      <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold num ${low ? 'text-coral' : 'text-ink'}`}>{mmss(remaining)}</span>
    </div>
  );
}

/** The patient shown as a hospital ID wristband. */
export default function PatientHeader({ patient, remaining }) {
  return (
    <section className="sheet relative flex animate-rise flex-wrap items-center gap-x-8 gap-y-5 overflow-hidden !rounded-[34px] py-6 pl-16 pr-8">
      <span className="absolute inset-y-0 left-0 w-9 bg-signal" />
      <i className="absolute left-3 top-5 h-3 w-3 rounded-full bg-ward shadow-inner" />
      <i className="absolute bottom-5 left-3 h-3 w-3 rounded-full bg-ward shadow-inner" />
      <div className="min-w-0 flex-1">
        <h1 className="font-display text-4xl font-extrabold leading-none md:text-5xl">{patient.name}</h1>
        <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
          <span className="rounded-full bg-cloud px-3 py-1 num">{ageFrom(patient.dob)} years, {{ M: 'male', F: 'female', O: 'other' }[patient.sex]}</span>
          <span className="rounded-full bg-cloud px-3 py-1 num">Aadhaar {patient.aadhaar_masked}</span>
        </div>
      </div>
      <div className="hidden text-center sm:block">
        <Barcode value={patient.patient_id} />
        <p className="mt-1 text-xs font-semibold tracking-wide text-ink-mute num">{patient.patient_id}</p>
      </div>
      <div className="flex items-center gap-3">
        <ConsentRing remaining={remaining} />
        <p className="text-sm leading-tight text-ink-soft"><Lock className="mb-0.5 mr-1 inline h-3.5 w-3.5" aria-hidden />Patient consent<br />ends when the ring empties</p>
      </div>
    </section>
  );
}
