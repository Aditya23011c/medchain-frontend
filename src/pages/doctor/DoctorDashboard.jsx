import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, KeyRound, Search } from 'lucide-react';
import PatientSearch from '../../components/PatientSearch.jsx';
import { usePatientSession } from '../../context/PatientSession.jsx';

const NEXT = [
  { Icon: Search, title: 'Find the patient', text: 'Name and Aadhaar, used once.' },
  { Icon: KeyRound, title: 'Get their consent', text: 'They read you a 6-digit code.' },
  { Icon: ClipboardCheck, title: 'Read the record', text: 'Flagged results first, then the full history.' },
];

export default function DoctorDashboard() {
  const nav = useNavigate();
  const { setPatient, setConsent } = usePatientSession();
  const onFound = (patient) => { setConsent(null); setPatient(patient); nav('/doctor/consent'); };
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div className="animate-rise">
        <h1 className="font-display text-5xl font-extrabold leading-[1.02]">Who are you seeing?</h1>
        <p className="mt-3 max-w-md text-lg text-ink-soft">Search for a patient to open their full history, from every doctor, lab and pharmacy.</p>
        <ol className="mt-10 space-y-6">
          {NEXT.map(({ Icon, title, text }, i) => (
            <li key={title} className="flex animate-rise gap-4" style={{ animationDelay: `${200 + i * 120}ms` }}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-signal-tint text-signal"><Icon className="h-5 w-5" aria-hidden /></span>
              <div><p className="font-display text-lg font-bold leading-tight">{title}</p><p className="text-ink-soft">{text}</p></div>
            </li>
          ))}
        </ol>
      </div>
      <div className="sheet animate-rise p-7" style={{ animationDelay: '120ms' }}><PatientSearch onFound={onFound} /></div>
    </div>
  );
}
