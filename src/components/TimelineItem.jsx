import { FileText, Pill, ScanSearch, Stethoscope } from 'lucide-react';
import IntegrityBadge from './IntegrityBadge.jsx';
import { formatDate } from '../utils/formatDate.js';

const META = {
  prescription: { Icon: Stethoscope, dot: 'bg-signal-tint text-signal', title: 'Prescription' },
  report: { Icon: FileText, dot: 'bg-ink text-white', title: 'Lab report' },
  dispense: { Icon: Pill, dot: 'bg-plum-tint text-plum', title: 'Medicines dispensed' },
};

export default function TimelineItem({ item, reveal, delay }) {
  const { Icon, dot, title } = META[item.type];
  const who = item.provider_name || item.pharmacy_name;
  return (
    <li className={`relative transition-all duration-700 ease-out ${reveal ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: `${delay}ms` }}>
      <span className={`absolute -left-[3.15rem] top-0 flex h-9 w-9 items-center justify-center rounded-full ring-4 ring-ward ${dot}`}><Icon className="h-4 w-4" aria-hidden /></span>
      <p className="text-lg font-bold leading-tight">{item.type === 'report' ? item.report_type : title}</p>
      <p className="text-sm text-ink-mute">{formatDate(item.date)}, {who}</p>

      {item.type === 'prescription' && (
        <div className="mt-2 text-ink-soft">
          <ul className="space-y-0.5">{item.medicines.map((m) => <li key={m.name}><span className="font-semibold text-ink">{m.name}</span>, {m.dosage}</li>)}</ul>
          {item.notes && <p className="mt-1.5 text-sm italic">{item.notes}</p>}
        </div>
      )}
      {item.type === 'dispense' && (
        <ul className="mt-2 space-y-0.5 text-ink-soft">{item.items.map((m) => <li key={m.name}><span className="font-semibold text-ink">{m.name}</span>, quantity {m.qty}</li>)}</ul>
      )}
      {item.type === 'report' && (
        <div className="mt-3 space-y-3">
          <p className="text-ink-soft">
            {item.results_count} values read.{' '}
            {item.abnormal_count ? <span className="font-bold text-coral">{item.abnormal_count} outside range.</span> : 'All within range.'}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <IntegrityBadge reportId={item.id} />
            {item.ocr_status === 'needs_manual_review' && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-honey-tint px-3 py-1.5 text-sm font-semibold text-honey"><ScanSearch className="h-4 w-4" aria-hidden /> Needs manual review</span>
            )}
            <a href={item.file_url} className="text-sm font-semibold text-signal underline">Open original</a>
          </div>
        </div>
      )}
    </li>
  );
}
