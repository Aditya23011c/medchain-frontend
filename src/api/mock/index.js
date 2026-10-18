import { patient, summary, timeline, openPrescriptions } from './data.js';

const wait = (ms = 400 + Math.random() * 500) => new Promise((r) => setTimeout(r, ms));
const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
const uploads = new Map();

export async function login({ role, email, password }) {
  await wait();
  if (!email || !password) fail(400, 'Enter your registered email and password.');
  if (password === 'wrong') fail(401, 'Email or password is incorrect.');
  const names = { doctor: 'Dr. Meera Iyer', diagnostic_center: 'City Diagnostics', pharmacy: 'LifeCare Pharmacy' };
  return { token: `mock.jwt.${role}`, provider: { provider_id: `prov_${role}`, name: names[role], type: role, verified: true } };
}

// Demo triggers: name containing "nobody" -> 404, "fail" -> 500.
export async function lookupPatient({ name }) {
  await wait();
  if (/fail/i.test(name)) fail(500, 'The server could not complete the lookup. Try again.');
  if (/nobody/i.test(name)) fail(404, 'No patient matches that name and Aadhaar number.');
  return { ...patient };
}

export async function requestConsent() { await wait(); return { consent_id: 'c_1', expires_in_sec: 120 }; }

export async function verifyConsent({ otp }) {
  await wait();
  if (otp !== '123456') fail(401, 'That code is not correct. Check with the patient and try again.');
  return { consent_token: 'mock-consent', expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString() };
}

export async function getSummary(_id, consentToken) {
  await wait();
  if (!consentToken) fail(403, 'Patient consent is required to view this record.');
  return summary;
}

export async function getTimeline(_id, consentToken) {
  await wait();
  if (!consentToken) fail(403, 'Patient consent is required to view this record.');
  return timeline;
}

// r_31 is the "tampered" report for the hash-mismatch demo.
export async function verifyReport(reportId) {
  await wait(300);
  return { report_id: reportId, match: reportId !== 'r_31', anchored_at: '2024-03-02T09:14:00Z' };
}

export async function uploadReport({ file }) {
  await wait(500);
  const id = `r_${Date.now()}`;
  uploads.set(id, { start: Date.now(), review: /blurry/i.test(file.name), error: /error/i.test(file.name) });
  return { report_id: id };
}

// Time-driven stages. Name a file "blurry" for manual review, "error" for a failure.
export async function getReportStatus(reportId) {
  await wait(150);
  const u = uploads.get(reportId);
  if (!u) fail(404, 'Upload not found.');
  const t = Date.now() - u.start;
  if (u.error && t > 2000) return { report_id: reportId, stage: 'error', message: 'The file could not be read. Upload a clearer copy.' };
  if (t < 1200) return { report_id: reportId, stage: 'uploading' };
  if (t < 2600) return { report_id: reportId, stage: 'anchoring' };
  if (t < 4200) return { report_id: reportId, stage: 'ocr_running' };
  return { report_id: reportId, stage: u.review ? 'needs_manual_review' : 'done' };
}

export async function listOpenPrescriptions() { await wait(); return openPrescriptions; }
export async function createDispense() { await wait(700); return { dispense_id: `d_${Date.now()}` }; }

// Demo trigger: an email containing "taken" returns a 409.
export async function register({ email }) {
  await wait(900);
  if (/taken/i.test(email)) fail(409, 'An account with this email already exists. Try signing in instead.');
  return { provider_id: `prov_${Date.now()}`, status: 'pending_verification' };
}
