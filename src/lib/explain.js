// Turns a patient's summary and timeline into plain sentences for the "In plain words" panel.
const word = (f) => (f.flag === 'high' ? 'above' : 'below');

export function explainRecord(summary, timeline = []) {
  if (!summary) return null;
  const flagged = summary.flagged || [];
  const reports = timeline.filter((t) => t.type === 'report');
  const years = timeline.length ? new Date().getFullYear() - Number(timeline[timeline.length - 1].date.slice(0, 4)) : 0;
  const lines = [];

  if (flagged.length) {
    const latest = [...flagged].sort((a, b) => b.reported_on.localeCompare(a.reported_on))[0];
    lines.push({ tone: 'bad', text: `${flagged.length} ${flagged.length === 1 ? 'value is' : 'values are'} outside the normal range. The most recent is ${latest.test_name} at ${latest.value} ${latest.unit}, ${word(latest)} the normal ${latest.ref_low}–${latest.ref_high}.` });
  } else {
    lines.push({ tone: 'ok', text: 'No abnormal values were found in the reports on record.' });
  }
  if (summary.needs_review_count) {
    lines.push({ tone: 'warn', text: `${summary.needs_review_count} ${summary.needs_review_count === 1 ? 'report was' : 'reports were'} not read confidently, so nothing in ${summary.needs_review_count === 1 ? 'it was' : 'them were'} flagged. Check the original.` });
  }
  if (reports.length) lines.push({ tone: 'info', text: `${reports.length} lab ${reports.length === 1 ? 'report' : 'reports'} from ${new Set(reports.map((r) => r.provider_name)).size} provider(s)${years > 0 ? `, spanning about ${years} years` : ''}.` });
  return { headline: flagged.length ? 'Some results need your attention' : 'Nothing abnormal on record', lines };
}
