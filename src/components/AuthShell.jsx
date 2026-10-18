import { Link } from 'react-router-dom';
import Brand, { Mark } from './Brand.jsx';

// A gyroscope of three tilted rings with the seal at its centre.
function Gyro() {
  const rings = ['rotateX(72deg)', 'rotateY(72deg)', 'rotateX(72deg) rotateY(60deg)'];
  return (
    <div className="relative mx-auto h-72 w-72 [perspective:900px]" aria-hidden>
      <div className="absolute inset-0 animate-orbit [transform-style:preserve-3d]">
        {rings.map((t, i) => (
          <div key={t} className="absolute inset-0 rounded-full border-2 border-white/30" style={{ transform: t }}>
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#4FD6A5] shadow-[0_0_14px_#4FD6A5]" style={{ opacity: 1 - i * 0.2 }} />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center"><Mark className="h-24 w-24 drop-shadow-[0_0_28px_rgba(141,187,245,0.7)]" /></div>
    </div>
  );
}

/** Split layout shared by sign in and registration. */
export default function AuthShell({ children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden p-12 text-white lg:flex" style={{ background: 'linear-gradient(160deg,#0E2236 0%,#123a63 100%)' }}>
        <Link to="/"><Brand light /></Link>
        <div>
          <Gyro />
          <h2 className="mx-auto mt-10 max-w-md text-center font-display text-4xl font-extrabold leading-tight !text-white">Records that stay whole, wherever care happens.</h2>
          <p className="mx-auto mt-3 max-w-sm text-center text-white/70">Encrypted files, a fingerprint on the chain, and the patient’s consent before any doctor looks.</p>
        </div>
        <p className="text-sm text-white/50">Only license-verified providers can sign in.</p>
      </aside>
      <main className="flex items-center justify-center px-5 py-12">{children}</main>
    </div>
  );
}
