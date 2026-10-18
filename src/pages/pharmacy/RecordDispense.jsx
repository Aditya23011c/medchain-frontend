import { useEffect, useState } from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { api } from '../../api/index.js';
import PatientSearch from '../../components/PatientSearch.jsx';
import { Button, EmptyState, ErrorState, Skeleton } from '../../components/common/index.jsx';
import { formatDate } from '../../utils/formatDate.js';

export default function RecordDispense() {
  const [patient, setPatient] = useState(null);
  const [rxList, setRxList] = useState(null);
  const [rx, setRx] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const loadRx = (p) => {
    setError(null);
    setRxList(null);
    api.listOpenPrescriptions(p.patient_id).then(setRxList).catch((e) => setError(e.message));
  };
  useEffect(() => { if (patient) loadRx(patient); }, [patient]);

  const choose = (r) => { setRx(r); setItems(r.medicines.map((m) => ({ name: m.name, qty: 1 }))); };
  const reset = () => { setPatient(null); setRxList(null); setRx(null); setItems([]); setDone(false); setError(null); };
  const setQty = (i, qty) => setItems((it) => it.map((x, j) => (j === i ? { ...x, qty } : x)));

  const save = async () => {
    setSaving(true);
    setError(null);
    try { await api.createDispense({ prescription_id: rx.prescription_id, items: items.filter((i) => i.qty > 0) }); setDone(true); }
    catch (e) { setError(e.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="animate-rise">
        <h1 className="font-display text-5xl font-extrabold leading-[1.02]">Record what you dispensed</h1>
        <p className="mt-3 text-lg text-ink-soft">Pick the prescription you filled and confirm what you handed over. It links back to the doctor’s original.</p>
      </div>

      <div className="sheet mt-8 animate-rise p-7" style={{ animationDelay: '100ms' }}>
        {!patient ? (
          <PatientSearch onFound={setPatient} submitLabel="Select patient" />
        ) : done ? (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="flex h-16 w-16 animate-rise items-center justify-center rounded-full bg-mint-tint text-mint"><CheckCircle2 className="h-8 w-8" aria-hidden /></span>
            <p className="mt-4 font-display text-2xl font-extrabold">Dispense recorded</p>
            <p className="text-ink-soft">It now appears on {patient.name}’s record, linked to the prescription.</p>
            <Button className="mt-6" onClick={reset}>Record another</Button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-cloud px-4 py-3">
              <p><span className="font-display text-lg font-bold">{patient.name}</span> <span className="ml-1 text-sm text-ink-soft num">Aadhaar {patient.aadhaar_masked}</span></p>
              <button onClick={reset} className="text-sm font-semibold text-signal underline">Change</button>
            </div>
            {error && <ErrorState message={error} onRetry={!rx ? () => loadRx(patient) : undefined} />}

            {!rx && (
              <div>
                <h2 className="mb-3 font-display text-2xl font-extrabold">Open prescriptions</h2>
                {!rxList && !error ? <div className="space-y-3"><Skeleton className="h-16" /><Skeleton className="h-16" /></div>
                  : rxList?.length === 0 ? <EmptyState title="Nothing left to dispense" hint="This patient has no open prescriptions." />
                  : <ul className="space-y-3">
                      {rxList?.map((r) => (
                        <li key={r.prescription_id}>
                          <button onClick={() => choose(r)} className="flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-mist px-5 py-4 text-left transition hover:border-signal hover:bg-signal-tint/50">
                            <span><span className="block text-lg font-bold">{r.medicines.map((m) => m.name).join(', ')}</span><span className="text-sm text-ink-mute">{formatDate(r.date)}, {r.doctor_name}</span></span>
                            <ChevronRight className="h-5 w-5 text-ink-mute" aria-hidden />
                          </button>
                        </li>
                      ))}
                    </ul>}
              </div>
            )}

            {rx && (
              <div>
                <h2 className="mb-4 font-display text-2xl font-extrabold">Items dispensed</h2>
                <ul className="space-y-3">
                  {items.map((it, i) => (
                    <li key={it.name} className="flex items-center justify-between gap-4 rounded-2xl bg-ward px-5 py-4">
                      <span><span className="block text-lg font-bold">{it.name}</span><span className="text-sm text-ink-soft">{rx.medicines[i].dosage}</span></span>
                      <label className="flex items-center gap-2 text-sm font-semibold text-ink-soft">Quantity
                        <input type="number" min="0" value={it.qty} onChange={(e) => setQty(i, Math.max(0, Number(e.target.value)))} className="field !w-20 !px-3 !py-2 text-center num" />
                      </label>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-3">
                  <Button loading={saving} disabled={!items.some((i) => i.qty > 0)} onClick={save}>Record dispense</Button>
                  <Button variant="line" onClick={() => setRx(null)}>Back</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
