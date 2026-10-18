/** Hospital identity: ward-white surfaces, scrub-navy ink, wayfinding blue, clinical flag colours. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0E2236', soft: '#3C5368', mute: '#6B8095' },
        ward: '#F3F7FA', mist: '#DCE6EE', cloud: '#E9F0F6',
        signal: { DEFAULT: '#1D6FD6', deep: '#154FA0', tint: '#E6F0FC' },
        mint: { DEFAULT: '#13966C', tint: '#DDF4EB' },
        coral: { DEFAULT: '#D93B45', tint: '#FDE8E9' },
        honey: { DEFAULT: '#B77905', tint: '#FDF1D6' },
        plum: { DEFAULT: '#6B4FD3', tint: '#EEEAFB' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Atkinson Hyperlegible Next"', '"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sheet: '0 1px 0 rgba(14,34,54,.04), 0 18px 40px -18px rgba(14,34,54,.22)',
        lift: '0 30px 60px -24px rgba(14,34,54,.38)',
      },
      keyframes: {
        rise: { from: { opacity: 0, transform: 'translateY(14px)' }, to: { opacity: 1, transform: 'none' } },
        dolly: { from: { opacity: 0, transform: 'perspective(1400px) translate3d(0,10px,-60px)' }, to: { opacity: 1, transform: 'none' } },
        ecg: { from: { strokeDashoffset: 100 }, to: { strokeDashoffset: 0 } },
        orbit: { from: { transform: 'rotateX(-14deg) rotateY(0deg)' }, to: { transform: 'rotateX(-14deg) rotateY(360deg)' } },
        float: { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(-10px)' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: 0.5 }, '100%': { transform: 'scale(2.2)', opacity: 0 } },
        shake: { '0%,100%': { transform: 'translateX(0)' }, '20%': { transform: 'translateX(-5px)' }, '40%': { transform: 'translateX(5px)' }, '60%': { transform: 'translateX(-3px)' }, '80%': { transform: 'translateX(3px)' } },
        tick: { from: { strokeDashoffset: 24 }, to: { strokeDashoffset: 0 } },
        scan: { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(96px)' } },
        shimmer: { to: { transform: 'translateX(100%)' } },
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        nudge: { '0%,100%': { transform: 'translateY(0)', opacity: 0.4 }, '50%': { transform: 'translateY(6px)', opacity: 1 } },
      },
      animation: {
        rise: 'rise .65s cubic-bezier(.2,.8,.2,1) both',
        dolly: 'dolly .55s cubic-bezier(.2,.8,.2,1) both',
        ecg: 'ecg 3.4s linear infinite',
        orbit: 'orbit 26s linear infinite',
        float: 'float 5.5s ease-in-out infinite alternate',
        pulseRing: 'pulseRing 1.8s ease-out infinite',
        shake: 'shake .5s ease-in-out',
        tick: 'tick .6s .1s ease-out both',
        scan: 'scan 2.8s ease-in-out infinite alternate',
        shimmer: 'shimmer 1.5s infinite',
        blink: 'blink 1s steps(2) infinite',
        nudge: 'nudge 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
