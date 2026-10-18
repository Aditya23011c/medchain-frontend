import { Link, Route, Routes } from 'react-router-dom';
import { useAuth, homeFor } from '../context/AuthContext.jsx';
import RoleGuard from './RoleGuard.jsx';
import Login from '../pages/Login.jsx';
import Landing from '../pages/Landing.jsx';
import DoctorDashboard from '../pages/doctor/DoctorDashboard.jsx';
import ConsentStep from '../pages/doctor/ConsentStep.jsx';
import PatientRecord from '../pages/doctor/PatientRecord.jsx';
import UploadReport from '../pages/diagnostic/UploadReport.jsx';
import RecordDispense from '../pages/pharmacy/RecordDispense.jsx';

function Message({ title, text }) {
  const { role } = useAuth();
  return (
    <div className="mx-auto flex min-h-screen max-w-md animate-rise flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl font-extrabold">{title}</h1>
      <p className="mt-2 text-ink-soft">{text}</p>
      <Link to={role ? homeFor(role) : '/login'} className="btn-solid mt-6">Go to your workspace</Link>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route element={<RoleGuard allow={['doctor']} />}>
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/consent" element={<ConsentStep />} />
        <Route path="/doctor/patient/:id" element={<PatientRecord />} />
      </Route>
      <Route element={<RoleGuard allow={['diagnostic_center']} />}>
        <Route path="/diagnostic" element={<UploadReport />} />
      </Route>
      <Route element={<RoleGuard allow={['pharmacy']} />}>
        <Route path="/pharmacy" element={<RecordDispense />} />
      </Route>

      <Route path="/403" element={<Message title="Not available for your role" text="Only verified doctors can open patient records. Diagnostic centers and pharmacies can upload only." />} />
      <Route path="*" element={<Message title="Page not found" text="That address doesn't exist." />} />
    </Routes>
  );
}
