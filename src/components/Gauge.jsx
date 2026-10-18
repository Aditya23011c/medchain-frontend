import { useEffect, useState } from 'react';

const clamp = (n) => Math.min(1, Math.max(0, n));

/** A clinical scale: the green band is the normal range, the pin is this patient's value. */
export default function Gauge({ value, low, high, flag, delay = 0 }) {
  const span = high - low || 1;
  const min = low - span * 0.9;
  const max = high + span * 0.9;
  const pct = (v) => clamp((v - min) / (max - min)) * 100;
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 150 + delay); return () => clearTimeout(t); }, [delay]);

  const color = flag === 'high' ? '#D93B45' : '#B77905';
  const tint = flag === 'high' ? '#FDE8E9' : '#FDF1D6';
  const left = on ? pct(value) : pct((low + high) / 2); // the pin travels from the middle of the range
  const move = 'left 1000ms cubic-bezier(.2,.9,.2,1)';

  return (
    <div className="relative h-[74px]" role="img" aria-label={`Value ${value}, normal range ${low} to ${high}`}>
      <div className="absolute top-0 -translate-x-1/2 rounded-lg px-2 py-0.5 font-display text-sm font-extrabold num" style={{ left: `${left}%`, transition: move, background: tint, color }}>{value}</div>
      <div className="absolute top-[26px] h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[7px] border-x-transparent" style={{ left: `${left}%`, transition: move, borderTopColor: color }} />
      <div className="absolute inset-x-0 top-[38px] h-3 rounded-full bg-cloud" />
      <div className="absolute top-[38px] h-3 rounded-full bg-mint/35" style={{ left: `${pct(low)}%`, width: `${pct(high) - pct(low)}%` }} />
      {[low, high].map((v) => (
        <div key={v} className="absolute top-[34px] flex -translate-x-1/2 flex-col items-center" style={{ left: `${pct(v)}%` }}>
          <span className="block h-5 w-0.5 rounded bg-mint" />
          <span className="mt-1 block text-xs font-semibold text-ink-mute num">{v}</span>
        </div>
      ))}
    </div>
  );
}
