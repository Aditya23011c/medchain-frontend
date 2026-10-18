const D = 'M0 30 H60 L70 30 L78 12 L88 52 L98 22 L104 30 H170 L178 30 L186 8 L198 58 L208 26 L214 30 H300';

/** A heartbeat line with a travelling pulse. Decorative. */
export default function Ecg({ className = '', color = '#1D6FD6' }) {
  const common = { d: D, pathLength: 100, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', vectorEffect: 'non-scaling-stroke' };
  return (
    <svg viewBox="0 0 300 60" preserveAspectRatio="none" className={className} aria-hidden>
      <path {...common} stroke={color} strokeOpacity="0.18" strokeWidth="2" />
      <path {...common} stroke={color} strokeWidth="2.5" strokeDasharray="14 86" className="animate-ecg" style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    </svg>
  );
}
