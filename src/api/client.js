import axios from 'axios';

export const TOKEN_KEY = 'medchain.token';

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000' });

client.interceptors.request.use((cfg) => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Normalise errors to { message, status } and fail closed on 401.
client.interceptors.response.use(
  (r) => r,
  (err) => {
    const status = err.response?.status;
    if (status === 401 && !err.config.url.includes('/auth/login')) {
      sessionStorage.clear();
      window.location.assign('/login');
    }
    const message = err.response?.data?.message || (err.response ? 'Something went wrong. Try again.' : 'Cannot reach the server. Check VITE_API_URL, or set VITE_USE_MOCK=true for the demo.');
    return Promise.reject(Object.assign(new Error(message), { status }));
  }
);

export default client;
