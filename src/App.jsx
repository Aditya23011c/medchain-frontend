import { AuthProvider } from './context/AuthContext.jsx';
import { PatientSessionProvider } from './context/PatientSession.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <AuthProvider>
      <PatientSessionProvider>
        <AppRoutes />
      </PatientSessionProvider>
    </AuthProvider>
  );
}
