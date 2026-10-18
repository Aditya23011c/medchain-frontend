import { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { api } from '../../api/index.js';
import PatientSearch from '../../components/PatientSearch.jsx';
import UploadStatus from '../../components/UploadStatus.jsx';
import ManualReviewBanner from '../../components/ManualReviewBanner.jsx';
import { Button, ErrorState } from '../../components/common/index.jsx';
import { useUploadStatus } from '../../hooks/useUploadStatus.js';

export default function UploadReport() {
  const [patient, setPatient] = useState(null);
  const [file, setFile] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);
  const input = useRef(null);
  const status = useUploadStatus(reportId);
  const stage = status?.stage || (reportId ? 'uploading' : null);
  const finished = ['done', 'needs_manual_review', 'error'].includes(stage);

  const reset = () => { setPatient(null); setFile(null); setReportId(null); setError(null); };
  const pick = (f) => {
    if (!f) return;
    if (!/\.(pdf|png|jpe?g)$/i.test(f.name)) return setError('Upload a PDF, PNG or JPG file.');
    setError(null);
    setFile(f);
  };
  const submit = async () => {
    setUploading(true);
    setError(null);
    try { setReportId((await api.uploadReport({ patientId: patient.patient_id, file })).report_id); }
    catch (e) { setError(e.message); }
    finally { setUploading(false); }
  };

  return (
    <div>
      <div className="animate-rise">
        <h1 className="font-display text-5xl font-extrabold leading-[1.02]">Add a lab report</h1>
        <p className="mt-3 max-w-lg text-lg text-ink-soft">Find the patient, drop in the report, and we will read it, seal it and add it to their record. You can upload only; history stays private to doctors.</p>
      </div>

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="sheet animate-rise p-7" style={{ animationDelay: '100ms' }}>
          {!patient ? (
            <PatientSearch onFound={setPatient} submitLabel="Select patient" />
          ) : (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-cloud px-4 py-3">
                <p><span className="font-display text-lg font-bold">{patient.name}</span> <span className="ml-1 text-sm text-ink-soft num">Aadhaar {patient.aadhaar_masked}</span></p>
                {!reportId && <button onClick={reset} className="text-sm font-semibold text-signal underline">Change</button>}
              </div>
              {!reportId && (
                <>
                  <div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setDragging(false); pick(e.dataTransfer.files[0]); }}
                    className={`flex flex-col items-center rounded-[22px] border-2 border-dashed px-4 py-12 text-center transition ${dragging ? 'scale-[1.02] border-signal bg-signal-tint' : 'border-signal/40 bg-signal-tint/40'}`}>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-signal shadow-sheet"><UploadCloud className="h-6 w-6" aria-hidden /></span>
                    <p className="mt-3 font-display text-xl font-bold">{file ? file.name : 'Drop the report here'}</p>
                    <p className="text-sm text-ink-soft">PDF, PNG or JPG</p>
                    <Button variant="line" className="mt-4" onClick={() => input.current.click()}>{file ? 'Choose a different file' : 'Choose file'}</Button>
                    <input ref={input} type="file" accept=".pdf,.png,.jpg,.jpeg" className="sr-only" onChange={(e) => pick(e.target.files[0])} />
                  </div>
                  {error && <ErrorState message={error} />}
                  <Button className="w-full" disabled={!file} loading={uploading} onClick={submit}>Upload report</Button>
                  <p className="text-xs text-ink-mute">Demo mode: a file name containing “blurry” ends in manual review, and “error” shows a failure.</p>
                </>
              )}
              {reportId && finished && <Button variant="line" onClick={reset}>Upload another report</Button>}
            </div>
          )}
        </div>

        <aside className="sheet animate-rise p-7" style={{ animationDelay: '220ms' }}>
          <h2 className="mb-6 font-display text-2xl font-extrabold">{reportId ? 'Progress' : 'What happens next'}</h2>
          <UploadStatus stage={stage} message={status?.message} />
          {stage === 'needs_manual_review' && <div className="mt-6"><ManualReviewBanner variant="upload" /></div>}
        </aside>
      </div>
    </div>
  );
}
