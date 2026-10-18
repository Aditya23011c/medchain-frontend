import { useRef, useState } from 'react';

/** Six code boxes driven by one real input, so paste, autofill and screen readers all work. */
export default function OtpInput({ value, onChange, id, length = 6 }) {
  const ref = useRef(null);
  const [focus, setFocus] = useState(false);
  return (
    <div className="relative" onClick={() => ref.current?.focus()}>
      <input ref={ref} id={id} value={value} maxLength={length} inputMode="numeric" autoComplete="one-time-code" aria-label={`${length}-digit code`}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, length))}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        className="absolute inset-0 z-10 h-full w-full cursor-text opacity-0" />
      <div className="flex justify-between gap-2.5" aria-hidden>
        {Array.from({ length }).map((_, i) => {
          const active = focus && i === Math.min(value.length, length - 1);
          return (
            <div key={i} className={`flex h-16 flex-1 items-center justify-center rounded-2xl border-2 font-display text-3xl font-extrabold transition ${active ? 'border-signal bg-white ring-4 ring-signal/15' : value[i] ? 'border-signal/40 bg-signal-tint' : 'border-mist bg-white'}`}>
              {value[i] || (active && <span className="h-7 w-0.5 animate-blink bg-signal" />)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
