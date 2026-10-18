import * as mock from './mock/index.js';
import * as real from './real/index.js';

/**
 * Mock mode is the default, so the demo works even if the env var is missing (for example on Vercel).
 * Set VITE_USE_MOCK=false to talk to the real backend.
 */
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
export const api = USE_MOCK ? mock : real;
