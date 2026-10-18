import { AlertTriangle, Inbox, Loader2 } from 'lucide-react';

export function Button({ variant = 'solid', loading = false, className = '', children, ...rest }) {
  return (
    <button {...rest} disabled={rest.disabled || loading} className={`${variant === 'solid' ? 'btn-solid' : 'btn-line'} ${className}`}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
}

export function Field({ label, hint, error, id, ...input }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-soft">{label}</label>
      <input id={id} {...input} aria-invalid={!!error} className={`field ${error ? '!border-coral' : ''}`} />
      {error ? <p className="mt-1.5 text-sm font-medium text-coral">{error}</p> : hint && <p className="mt-1.5 text-sm text-ink-mute">{hint}</p>}
    </div>
  );
}

export const Skeleton = ({ className = '' }) => (
  <div className={`relative overflow-hidden rounded-2xl bg-cloud ${className}`}>
    <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent" />
  </div>
);

export function EmptyState({ title, hint, action }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cloud"><Inbox className="h-6 w-6 text-ink-mute" aria-hidden /></span>
      <p className="mt-4 font-display text-xl font-bold">{title}</p>
      {hint && <p className="mt-1 max-w-sm text-ink-soft">{hint}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-2xl border border-coral/25 bg-coral-tint p-4">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-coral" aria-hidden />
      <div className="flex-1">
        <p className="font-semibold text-coral">{message}</p>
        {onRetry && <button onClick={onRetry} className="mt-1 text-sm font-semibold text-coral underline">Try again</button>}
      </div>
    </div>
  );
}

/** Self-drawing check mark. */
export function Tick({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeDasharray="24 24" className="animate-tick" />
    </svg>
  );
}
