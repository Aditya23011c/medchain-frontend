import * as mock from './mock/index.js';
import * as real from './real/index.js';

/** The one-line swap: set VITE_USE_MOCK=false in .env to hit the real backend. */
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
export const api = USE_MOCK ? mock : real;
