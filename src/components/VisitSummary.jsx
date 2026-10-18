import Ecg from './Ecg.jsx';
import { explainRecord } from '../lib/explain.js';

const DOT = { bad: 'bg-[#FF8A90]', warn: 'bg-[#F5C45A]', ok: 'bg-[#4FD6A5]', info: 'bg-[#8DBBF5]' };

/** The quick read: a few plain sentences before the detail. */
export default function VisitSummary({ summary, timeline }) {
  const e = explainRecord(summary, timeline || []);
  if (!e) return null;
  return (
    <section className="relative animate-rise overflow-hidden rounded-[28px] bg-ink p-7 text-white shadow-lift" style={{ animationDelay: '120ms' }}>
      <Ecg color="#8DBBF5" className="pointer-events-none absolute -right-6 top-3 h-14 w-72 opacity-70" />
      <p className="text-sm font-semibold text-white/60">Quick read</p>
      <h2 className="mt-1 max-w-xl font-display text-3xl font-extrabold leading-tight !text-white">{e.headline}</h2>
      <ul className="mt-4 max-w-2xl space-y-2.5 text-white/85">
        {e.lines.map((l) => (
          <li key={l.text} className="flex gap-3"><span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${DOT[l.tone]}`} />{l.text}</li>
        ))}
      </ul>
    </section>
  );
}
