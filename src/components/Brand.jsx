// The MedChain mark: a medical cross whose centre is a hash seal.
export function Mark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="12" y="2.5" width="8" height="27" rx="4" fill="#1D6FD6" />
      <rect x="2.5" y="12" width="27" height="8" rx="4" fill="#1D6FD6" />
      <circle cx="16" cy="16" r="5.2" fill="#fff" />
      <circle cx="16" cy="16" r="2.4" fill="#13966C" />
    </svg>
  );
}

export default function Brand({ stacked = false, light = false, className = '' }) {
  return (
    <span className={`inline-flex items-center ${stacked ? 'flex-col gap-2' : 'gap-2.5'} ${className}`}>
      <Mark className={stacked ? 'h-14 w-14' : 'h-9 w-9'} />
      <span className={`font-display font-extrabold leading-none tracking-tight ${stacked ? 'text-3xl' : 'text-[22px]'} ${light ? 'text-white' : 'text-ink'}`}>MedChain</span>
    </span>
  );
}
