import { AlertCircle, ScanSearch } from 'lucide-react';
import { Tick } from './common/index.jsx';

// Rendered in this order. Change here if the backend reports stages differently.
export const STAGE_ORDER = [
  { key: 'uploading', label: 'Uploading file', note: 'Encrypting and storing the original' },
  { key: 'anchoring', label: 'Anchoring on blockchain', note: 'Saving the file fingerprint' },
  { key: 'ocr_running', label: 'Reading values', note: 'Finding each test and its range' },
  { key: 'done', label: 'Done', note: 'Added to the patient record' },
];

export default function UploadStatus({ stage, message }) {
  const failed = stage === 'error';
  const review = stage === 'needs_manual_review';
  const idx = review ? STAGE_ORDER.length - 1 : STAGE_ORDER.findIndex((s) => s.key === stage);
  return (
    <ol aria-live="polite">
      {STAGE_ORDER.map((s, i) => {
        const last = i === STAGE_ORDER.length - 1;
        const complete = !failed && (i < idx || (i === idx && (stage === 'done' || review)));
        const active = i === idx && !complete && !failed;
        const errorHere = failed && i === Math.max(idx, 0);
        const warn = last && review;
        const node = errorHere ? 'bg-coral-tint text-coral border-coral'
          : warn ? 'bg-honey-tint text-honey border-honey'
          : complete ? 'bg-mint text-white border-mint'
          : active ? 'bg-white text-signal border-signal' : 'bg-white text-ink-mute border-mist';
        return (
          <li key={s.key} className="relative flex gap-4 pb-7 last:pb-0">
            {!last && (
              <span className="absolute left-[15px] top-9 h-[calc(100%-2.25rem)] w-0.5 bg-mist">
                <span className="block w-full bg-mint transition-all duration-700" style={{ height: complete || i < idx ? '100%' : '0%' }} />
              </span>
            )}
            <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${node}`}>
              {active && <span className="absolute inset-0 animate-pulseRing rounded-full bg-signal/40" />}
              {errorHere ? <AlertCircle className="h-4 w-4" aria-hidden /> : warn ? <ScanSearch className="h-4 w-4" aria-hidden /> : complete ? <Tick /> : <span className={`h-2 w-2 rounded-full ${active ? 'bg-signal' : 'bg-mist'}`} />}
            </span>
            <span>
              <span className={`block font-semibold leading-8 ${active || complete || errorHere ? 'text-ink' : 'text-ink-mute'}`}>{warn ? 'Needs manual review' : s.label}</span>
              {(active || errorHere) && <span className="block text-sm text-ink-soft">{errorHere && message ? <span className="text-coral">{message}</span> : s.note}</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
