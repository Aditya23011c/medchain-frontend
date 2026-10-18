import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { LogOut, Pill, Search, UploadCloud } from 'lucide-react';
import Brand from './Brand.jsx';
import Ecg from './Ecg.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { usePatientSession } from '../context/PatientSession.jsx';

const NAV = {
  doctor: { to: '/doctor', label: 'Patients', Icon: Search },
  diagnostic_center: { to: '/diagnostic', label: 'Upload report', Icon: UploadCloud },
  pharmacy: { to: '/pharmacy', label: 'Dispense', Icon: Pill },
};
const ROLE = {
  doctor: { label: 'Doctor', cls: 'bg-signal-tint text-signal-deep' },
  diagnostic_center: { label: 'Diagnostic center', cls: 'bg-plum-tint text-plum' },
  pharmacy: { label: 'Pharmacy', cls: 'bg-mint-tint text-mint' },
};

export default function Shell() {
  const { provider, signOut } = useAuth();
  const { clear } = usePatientSession();
  const { pathname } = useLocation();
  const { to, label, Icon } = NAV[provider.type];
  const role = ROLE[provider.type];
  const logout = () => { clear(); signOut(); };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-mist bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-4 py-3">
          <Link to="/" aria-label="MedChain home" className="shrink-0"><Brand /></Link>
          <NavLink to={to} className={({ isActive }) => `inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold transition ${isActive ? 'bg-ink text-white' : 'text-ink-soft hover:bg-cloud'}`}>
            <Icon className="h-4 w-4" aria-hidden /> {label}
          </NavLink>
          {/* the heartbeat line ties the two ends of the bar together */}
          <div className="hidden h-8 flex-1 lg:block"><Ecg className="h-full w-full" /></div>
          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <div className="hidden text-right leading-tight sm:block">
              <p className="max-w-[12rem] truncate text-[15px] font-semibold">{provider.name}</p>
              <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${role.cls}`}>{role.label}</span>
            </div>
            <button onClick={logout} className="btn-line !px-3 !py-2" aria-label="Sign out" title="Sign out"><LogOut className="h-4 w-4" aria-hidden /></button>
          </div>
        </div>
      </header>
      {/* each page glides in, like the camera settling on a new room */}
      <main className="mx-auto max-w-6xl px-4 py-10"><div key={pathname} className="animate-dolly"><Outlet /></div></main>
    </div>
  );
}
