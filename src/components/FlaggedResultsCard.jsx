import { useState } from 'react';
import { ArrowDown, ArrowUp, ChevronDown } from 'lucide-react';
import Gauge from './Gauge.jsx';
import { EmptyState, Skeleton } from './common/index.jsx';
import { formatDate } from '../utils/formatDate.js';

export function FlagPill({ flag }) {
  const high = flag === 'high';
  const Icon = high ? ArrowUp : ArrowDown;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${high ? 'bg-coral-tint text-coral' : 'bg-honey-tint text-honey'}`}>
      <Icon className="h-4 w-4" aria-hidden /> {high ? 'High' : 'Low'}
    </span>
  );
}

function explain(r) {
  const base = r.flag === 'high' ? r.ref_high : r.ref_low;
  const pct = base ? Math.round((Math.abs(r.value - base) / base) * 100) : null;
  const side = r.flag === 'high' ? 'above the top' : 'below the bottom';
  return `${r.value} ${r.unit} is ${pct != null ? `about ${pct}% ` : ''}${side} of the normal range (${r.ref_low} to ${r.ref_high}).`;
}

function Row({ r, i }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="animate-rise" style={{ animationDelay: `${180 + i * 110}ms` }}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open}
        className="grid w-full items-center gap-x-8 gap-y-2 px-6 py-5 text-left transition hover:bg-ward/70 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto_auto]">
        <div>
          <p className="text-lg font-bold leading-tight">{r.test_name}</p>
          <p className="text-sm text-ink-mute">{formatDate(r.reported_on)}, {r.provider_name}</p>
          <p className="mt-1 font-display text-3xl font-extrabold num">{r.value} <span className="font-sans text-base font-medium text-ink-mute">{r.unit}</span></p>
        </div>
        <Gauge value={r.value} low={r.ref_low} high={r.ref_high} flag={r.flag} delay={i * 140} />
        <FlagPill flag={r.flag} />
        <ChevronDown className={`h-5 w-5 text-ink-mute transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="mx-6 mb-5 rounded-2xl bg-ward p-4 text-[15px] text-ink-soft">
            <p className="font-semibold text-ink">{explain(r)}</p>
            <p className="mt-1">One result is a reason to look closer, not a diagnosis. Compare it with earlier reports in the history below.</p>
            <p className="mt-1 text-sm text-ink-mute">Read from report {r.report_id} with {Math.round(r.ocr_confidence * 100)}% confidence.</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function FlaggedResultsCard({ flagged = [], loading = false }) {
  const sorted = [...flagged].sort((a, b) => b.reported_on.localeCompare(a.reported_on));
  return (
    <section className="sheet overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-mist px-6 py-5">
        <div>
          <h2 className="text-2xl font-extrabold">Needs attention</h2>
          <p className="text-ink-soft">Results outside the normal range, from every report on record.</p>
        </div>
        {!loading && sorted.length > 0 && <span className="rounded-full bg-coral-tint px-3 py-1 text-sm font-bold text-coral">{sorted.length} flagged</span>}
      </div>
      {loading ? (
        <div className="space-y-4 p-6">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-20" />)}</div>
      ) : sorted.length === 0 ? (
        <EmptyState title="Nothing outside the normal range" hint="Every result read from this patient's reports is within its range." />
      ) : (
        <ul className="divide-y divide-mist">{sorted.map((r, i) => <Row key={r.result_id} r={r} i={i} />)}</ul>
      )}
    </section>
  );
}
