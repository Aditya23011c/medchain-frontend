import { useEffect, useState } from 'react';

/** Seconds left until `expiresAt` (ms). Returns 0 when there is no consent. */
export function useConsentTimer(expiresAt) {
  const calc = () => (expiresAt ? Math.max(0, Math.floor((expiresAt - Date.now()) / 1000)) : 0);
  const [left, setLeft] = useState(calc);
  useEffect(() => {
    setLeft(calc());
    if (!expiresAt) return undefined;
    const t = setInterval(() => setLeft(calc()), 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiresAt]);
  return left;
}
