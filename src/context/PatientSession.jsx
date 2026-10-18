import { createContext, useContext, useState } from 'react';

// In-memory only. The patient (masked) and consent token are never persisted.
const Ctx = createContext(null);

export function PatientSessionProvider({ children }) {
  const [patient, setPatient] = useState(null);
  const [consent, setConsent] = useState(null); // { token, expiresAt (ms) }
  const clear = () => { setPatient(null); setConsent(null); };
  return <Ctx.Provider value={{ patient, setPatient, consent, setConsent, clear }}>{children}</Ctx.Provider>;
}
export const usePatientSession = () => useContext(Ctx);
