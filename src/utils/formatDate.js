const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
export const formatDate = (iso) => (iso ? fmt.format(new Date(iso)) : '');
export const ageFrom = (dob) => Math.floor((Date.now() - new Date(dob)) / 3.15576e10);
export const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
