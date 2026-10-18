import { useCallback, useEffect, useState } from 'react';
import { api } from '../api/index.js';

export function usePatientRecord(patientId, consentToken) {
  const [state, setState] = useState({ summary: null, timeline: null, loading: !!patientId, error: null });

  const load = useCallback(() => {
    if (!patientId || !consentToken) return;
    setState((s) => ({ ...s, loading: true, error: null }));
    Promise.all([api.getSummary(patientId, consentToken), api.getTimeline(patientId, consentToken)])
      .then(([summary, timeline]) => setState({ summary, timeline, loading: false, error: null }))
      .catch((error) => setState((s) => ({ ...s, loading: false, error })));
  }, [patientId, consentToken]);

  useEffect(load, [load]);
  return { ...state, reload: load };
}
