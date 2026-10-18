import { useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import FlaggedResultsCard from '../../components/FlaggedResultsCard.jsx';
import ManualReviewBanner from '../../components/ManualReviewBanner.jsx';
import PatientHeader from '../../components/PatientHeader.jsx';
import Timeline from '../../components/Timeline.jsx';
import VisitSummary from '../../components/VisitSummary.jsx';
import { ErrorState, Skeleton } from '../../components/common/index.jsx';
import { usePatientSession } from '../../context/PatientSession.jsx';
import { useConsentTimer } from '../../hooks/useConsentTimer.js';
import { usePatientRecord } from '../../hooks/usePatientRecord.js';

export default function PatientRecord() {
  const { id } = useParams();
  const nav = useNavigate();
  const { patient, consent } = usePatientSession();
  const valid = patient?.patient_id === id && !!consent;
  const remaining = useConsentTimer(consent?.expiresAt);
  const { summary, timeline, loading, error, reload } = usePatientRecord(valid ? id : null, consent?.token);

  // Fail closed: expired consent or a 403 sends the doctor back to the consent step.
  const denied = error?.status === 403;
  useEffect(() => {
    if (valid && (remaining <= 0 || denied)) nav('/doctor/consent', { replace: true, state: { expired: true } });
  }, [valid, remaining, denied, nav]);

  if (!valid) return <Navigate to="/doctor" replace />;

  return (
    <div className="space-y-8">
      <PatientHeader patient={patient} remaining={remaining} />
      {error && !denied && <ErrorState message={error.message} onRetry={reload} />}
      {loading && !summary ? <Skeleton className="h-44 !rounded-[28px]" /> : <VisitSummary summary={summary} timeline={timeline} />}
      <FlaggedResultsCard flagged={summary?.flagged} loading={loading && !summary} />
      <ManualReviewBanner count={summary?.needs_review_count} />
      <section className="pt-4">
        <h2 className="mb-8 font-display text-4xl font-extrabold">History</h2>
        {loading && !timeline
          ? <div className="space-y-4">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-20" />)}</div>
          : <Timeline items={timeline || []} />}
      </section>
      <Link to="/doctor" className="btn-line">Search another patient</Link>
    </div>
  );
}
