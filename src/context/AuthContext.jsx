import { createContext, useContext, useState } from 'react';
import { TOKEN_KEY } from '../api/client.js';

const PROVIDER_KEY = 'medchain.provider';
const Ctx = createContext(null);

export const homeFor = (role) => ({ doctor: '/doctor', diagnostic_center: '/diagnostic', pharmacy: '/pharmacy' }[role] || '/login');

export function AuthProvider({ children }) {
  const [provider, setProvider] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(PROVIDER_KEY)); } catch { return null; }
  });

  const signIn = ({ token, provider }) => {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(PROVIDER_KEY, JSON.stringify(provider));
    setProvider(provider);
  };
  const signOut = () => { sessionStorage.clear(); setProvider(null); };

  return <Ctx.Provider value={{ provider, role: provider?.type, signIn, signOut }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
