import client from '../client.js';

const consent = (token) => ({ headers: { 'X-Consent-Token': token } });
const data = (p) => p.then((r) => r.data);

export const login = (body) => data(client.post('/auth/login', body));
export const lookupPatient = (body) => data(client.post('/patients/lookup', body));
export const requestConsent = (patientId) => data(client.post('/consent/request', { patient_id: patientId }));
export const verifyConsent = (body) => data(client.post('/consent/verify', body));
export const getSummary = (id, token) => data(client.get(`/patients/${id}/summary`, consent(token)));
export const getTimeline = (id, token) => data(client.get(`/patients/${id}/timeline`, consent(token)));
export const verifyReport = (id) => data(client.get(`/reports/${id}/verify`));
export const uploadReport = ({ patientId, file }) => {
  const form = new FormData();
  form.append('patient_id', patientId);
  form.append('file', file);
  return data(client.post('/reports', form));
};
export const getReportStatus = (id) => data(client.get(`/reports/${id}/status`));
export const listOpenPrescriptions = (patientId) => data(client.get(`/patients/${patientId}/prescriptions`, { params: { open: true } }));
export const createDispense = (body) => data(client.post('/dispense', body));
