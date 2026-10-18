// Copy for the landing tour. Each scene is one stop on the camera's path through a patient record.
export const SCENES = [
  { id: 'hero', kind: 'hero', label: 'Start', x: 0, y: 0, ry: 0 },
  { id: 'identify', kind: 'chapter', art: 'identify', label: 'A patient walks in', title: 'Recognised everywhere, stored nowhere', text: 'Name and Aadhaar at any clinic, lab or pharmacy. We keep only a scrambled hash, so the same patient is matched across providers and the real number is never saved.', where: 'Patient search', x: -40, y: 10, ry: 16 },
  { id: 'upload', kind: 'chapter', art: 'pages', label: 'Every visit adds a page', title: 'Three places, one record', text: 'Doctors add prescriptions, labs add reports, pharmacies log what they handed over. Each lands on the same patient, linked to what came before.', where: 'Upload and dispense portals', x: 40, y: -10, ry: -16 },
  { id: 'read', kind: 'chapter', art: 'read', label: 'Numbers get read', title: 'What is out of range rises to the top', text: 'Lab tables are scanned and every value is checked against its normal range. If the software is unsure of a digit, it says so instead of guessing.', where: 'Needs attention', x: -40, y: 10, ry: 16 },
  { id: 'seal', kind: 'chapter', art: 'seal', label: 'Sealed against edits', title: 'Change one digit and it shows', text: 'Reports stay encrypted. Only a fingerprint of each file is anchored on a blockchain, so any later edit breaks the match and turns the badge red.', where: 'Integrity badge', x: 40, y: -10, ry: -16 },
  { id: 'consult', kind: 'chapter', art: 'consent', label: 'Years later', title: 'One consent away', text: 'A doctor searches, the patient shares a one-time code, and the full record opens for 30 minutes with the flagged results first.', where: 'Patient record', x: -40, y: 10, ry: 16 },
  { id: 'final', kind: 'final', label: 'Begin', x: 0, y: 0, ry: 0 },
];

export const ROLES = [
  { name: 'Doctors', text: 'Search patients and read the full record, after consent.' },
  { name: 'Diagnostic centers', text: 'Upload lab reports. No access to history.' },
  { name: 'Pharmacies', text: 'Record what was dispensed. No access to history.' },
];
