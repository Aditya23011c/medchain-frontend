import { FlaskConical, Pill, Stethoscope } from 'lucide-react';

export const ROLES = [
  { id: 'doctor', label: 'Doctor', Icon: Stethoscope, note: 'Search patients and read full records, after the patient consents.', nameLabel: 'Full name', licenseLabel: 'Medical council registration number' },
  { id: 'diagnostic_center', label: 'Diagnostic center', Icon: FlaskConical, note: 'Upload lab reports. You cannot read anyone’s history.', nameLabel: 'Center name', licenseLabel: 'Laboratory license number' },
  { id: 'pharmacy', label: 'Pharmacy', Icon: Pill, note: 'Record dispensed medicines. You cannot read anyone’s history.', nameLabel: 'Pharmacy name', licenseLabel: 'Drug license number' },
];

export default function RolePicker({ value, onChange }) {
  return (
    <div role="radiogroup" aria-label="I am a" className="grid grid-cols-3 gap-2">
      {ROLES.map(({ id, label, Icon }) => (
        <button key={id} type="button" role="radio" aria-checked={value === id} onClick={() => onChange(id)}
          className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-2 py-4 text-sm font-semibold transition ${value === id ? 'border-signal bg-signal-tint text-signal-deep' : 'border-mist bg-white text-ink-soft hover:border-signal/50'}`}>
          <Icon className="h-6 w-6" aria-hidden /> <span className="text-center leading-tight">{label}</span>
        </button>
      ))}
    </div>
  );
}
