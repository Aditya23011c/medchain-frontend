import { useInView } from '../hooks/useInView.js';
import TimelineItem from './TimelineItem.jsx';
import { EmptyState } from './common/index.jsx';

function Year({ year, items }) {
  const [ref, seen] = useInView();
  return (
    <div ref={ref} className="grid gap-4 md:grid-cols-[6rem_1fr]">
      <h3 className="font-display text-4xl font-extrabold text-ink/15 md:sticky md:top-24 md:self-start num">{year}</h3>
      <ul className="space-y-7 border-l-2 border-mist pl-8">
        {items.map((it, i) => (
          <TimelineItem key={`${it.type}-${it.id}`} item={it} reveal={seen} delay={i * 90} />
        ))}
      </ul>
    </div>
  );
}

export default function Timeline({ items = [] }) {
  if (!items.length) return <EmptyState title="No history yet" hint="Prescriptions, reports and dispensed medicines will appear here." />;
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
  const byYear = sorted.reduce((acc, it) => { (acc[it.date.slice(0, 4)] ||= []).push(it); return acc; }, {});
  return (
    <div className="space-y-12">
      {Object.keys(byYear).sort((a, b) => b - a).map((y) => <Year key={y} year={y} items={byYear[y]} />)}
    </div>
  );
}
