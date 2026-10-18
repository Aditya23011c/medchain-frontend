import { useEffect, useState } from 'react';
import { api } from '../api/index.js';

const TERMINAL = ['done', 'needs_manual_review', 'error'];

/** Polls the report status until it reaches a terminal stage. */
export function useUploadStatus(reportId) {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    if (!reportId) { setStatus(null); return undefined; }
    let stop = false;
    const tick = async () => {
      try {
        const s = await api.getReportStatus(reportId);
        if (stop) return;
        setStatus(s);
        if (!TERMINAL.includes(s.stage)) setTimeout(tick, 800);
      } catch (e) {
        if (!stop) setStatus({ report_id: reportId, stage: 'error', message: e.message });
      }
    };
    tick();
    return () => { stop = true; };
  }, [reportId]);
  return status;
}
