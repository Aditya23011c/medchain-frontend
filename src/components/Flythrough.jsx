import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronsDown } from 'lucide-react';
import { ArtConsent, ArtIdentify, ArtPages, ArtRead, ArtSeal, HeroSheets } from './art/Art.jsx';
import { useReducedMotion } from '../hooks/useInView.js';
import { ROLES, SCENES } from '../content/story.js';

const GAP = 900; // distance between scenes along the camera path
const N = SCENES.length;
const ART = { identify: ArtIdentify, pages: ArtPages, read: ArtRead, seal: ArtSeal, consent: ArtConsent };
const clamp = (n) => Math.min(1, Math.max(0, n));

// Small medical crosses scattered through the depth of the scene, so you feel the camera moving past them.
const rand = (i, n) => { const v = Math.sin(i * 97.13 + n * 13.7) * 43758.5453; return v - Math.floor(v); };
const CROSSES = Array.from({ length: 26 }, (_, i) => ({
  x: (rand(i, 1) - 0.5) * 1700, y: (rand(i, 2) - 0.5) * 1000, z: -150 - rand(i, 3) * GAP * (N - 1),
  s: 16 + rand(i, 4) * 38, c: i % 3 === 0 ? '#13966C' : '#1D6FD6',
}));

function SceneBody({ scene, onTour }) {
  if (scene.kind === 'hero') {
    return (
      <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
        <div className="fade" style={{ transform: 'translateZ(40px)' }}>
          <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.02] md:text-[4.4rem]">Every report. One patient. Nothing lost between clinics.</h1>
          <p className="mt-5 max-w-lg text-lg text-ink-soft md:text-xl">MedChain gathers prescriptions, lab results and dispensed medicines into one record that only verified doctors can open, with the abnormal values on top.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/login" className="btn-solid">Sign in <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            <button onClick={onTour} className="btn-line">Take the tour</button>
          </div>
        </div>
        <div className="fade hidden sm:block" style={{ transform: 'translateZ(110px)' }}><HeroSheets /></div>
      </div>
    );
  }
  if (scene.kind === 'final') {
    return (
      <div className="fade mx-auto max-w-3xl text-center" style={{ transform: 'translateZ(40px)' }}>
        <h2 className="font-display text-4xl font-extrabold leading-tight md:text-6xl">Open the record that follows the patient.</h2>
        <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
          {ROLES.map((r) => (
            <div key={r.name} className="sheet p-4"><p className="font-display text-lg font-bold">{r.name}</p><p className="mt-1 text-sm text-ink-soft">{r.text}</p></div>
          ))}
        </div>
        <Link to="/login" className="btn-solid mt-8 !px-8 !py-3.5 text-lg">Sign in to MedChain <ArrowRight className="h-5 w-5" aria-hidden /></Link>
      </div>
    );
  }
  const Art = ART[scene.art];
  return (
    <div className={`grid items-center gap-8 md:grid-cols-2 ${scene.x > 0 ? 'md:[&>*:first-child]:order-2' : ''}`}>
      <div className="fade" style={{ transform: 'translateZ(40px)' }}>
        <p className="text-base font-bold text-signal">{scene.label}</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold leading-[1.05] md:text-5xl">{scene.title}</h2>
        <p className="mt-4 max-w-md text-lg text-ink-soft">{scene.text}</p>
        <p className="mt-5 inline-flex rounded-full border border-mist bg-white px-4 py-1.5 text-sm font-semibold shadow-sheet">You will see it in: {scene.where}</p>
      </div>
      <div className="fade h-52 md:h-72" style={{ transform: 'translateZ(100px)' }}><Art /></div>
    </div>
  );
}

/**
 * A scroll-driven camera. Scenes sit along the Z axis; scrolling dollies the camera through them
 * with eased inertia, a slow weave, and pointer parallax. Reduced-motion visitors get plain sections.
 */
export default function Flythrough() {
  const reduce = useReducedMotion();
  const wrap = useRef(null);
  const world = useRef(null);
  const scenes = useRef([]);
  const crosses = useRef([]);
  const fill = useRef(null);
  const [active, setActive] = useState(0);

  const toScene = (i) => {
    const el = wrap.current;
    const max = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + (i / (N - 1)) * max, behavior: 'smooth' });
  };

  useEffect(() => {
    if (reduce) return undefined;
    let raf; let cur = 0; let target = 0; let mx = 0; let my = 0; let tx = 0; let ty = 0; let last = -1;

    const measure = () => {
      const el = wrap.current;
      const max = el.offsetHeight - window.innerHeight;
      target = clamp(-el.getBoundingClientRect().top / max);
    };
    const move = (e) => { tx = (e.clientX / window.innerWidth - 0.5) * 2; ty = (e.clientY / window.innerHeight - 0.5) * 2; };

    const tick = () => {
      cur += (target - cur) * 0.07; mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
      const camZ = cur * (N - 1) * GAP;

      SCENES.forEach((s, i) => {
        const el = scenes.current[i];
        if (!el) return;
        const t = camZ - i * GAP; // negative: still ahead of the camera, positive: already passed
        const o = t < 0 ? clamp(1 + t / (GAP * 1.1)) : clamp(1 - t / (GAP * 0.42));
        const ry = s.ry * clamp(Math.abs(t) / GAP) * (t < 0 ? 1 : -0.45); // swings square to the camera as it arrives
        el.style.transform = `translate(-50%,-50%) translate3d(${s.x}px,${s.y}px,${t}px) rotateY(${ry}deg)`;
        el.style.setProperty('--o', o.toFixed(3));
        el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
        el.style.pointerEvents = o > 0.7 ? 'auto' : 'none';
      });
      CROSSES.forEach((c, i) => {
        const el = crosses.current[i];
        if (!el) return;
        const t = c.z + camZ;
        const o = t < 0 ? clamp(1 + t / (GAP * 1.8)) : clamp(1 - t / 420);
        el.style.transform = `translate3d(${c.x}px,${c.y}px,${t}px)`;
        el.style.opacity = (o * 0.4).toFixed(3);
      });
      // camera: a slow weave plus pointer parallax
      world.current.style.transform = `rotateX(${(-my * 1.6).toFixed(3)}deg) rotateY(${(mx * 2.2 + Math.sin(cur * Math.PI * 3) * 1.4).toFixed(3)}deg) rotateZ(${(Math.sin(cur * Math.PI * 2) * 0.5).toFixed(3)}deg)`;
      fill.current.style.transform = `scaleY(${cur.toFixed(4)})`;
      const idx = Math.round(cur * (N - 1));
      if (idx !== last) { last = idx; setActive(idx); }
      raf = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('pointermove', move);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      window.removeEventListener('pointermove', move);
    };
  }, [reduce]);

  if (reduce) {
    return (
      <div className="mx-auto max-w-5xl space-y-24 px-4 pb-24 pt-28">
        {SCENES.map((s) => <section key={s.id}><SceneBody scene={s} onTour={() => window.scrollTo({ top: 600 })} /></section>)}
      </div>
    );
  }

  return (
    <div ref={wrap} style={{ height: `${(N - 1) * 95 + 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden [perspective:1100px]" style={{ perspectiveOrigin: '50% 45%' }}>
        <div ref={world} className="absolute inset-0 will-change-transform [transform-style:preserve-3d]">
          <div className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]">
            {CROSSES.map((c, i) => (
              <svg key={i} ref={(el) => { crosses.current[i] = el; }} viewBox="0 0 10 10" className="absolute left-0 top-0" style={{ width: c.s, height: c.s, opacity: 0 }} aria-hidden>
                <rect x="3.6" y="0.5" width="2.8" height="9" rx="1.4" fill={c.c} /><rect x="0.5" y="3.6" width="9" height="2.8" rx="1.4" fill={c.c} />
              </svg>
            ))}
            {SCENES.map((s, i) => (
              <div key={s.id} ref={(el) => { scenes.current[i] = el; }} className="absolute left-0 top-0 w-[min(1040px,92vw)] [transform-style:preserve-3d]" style={{ visibility: 'hidden' }}>
                <SceneBody scene={s} onTour={() => toScene(1)} />
              </div>
            ))}
          </div>
        </div>

        {/* progress rail: click a stop to travel there */}
        <nav aria-label="Tour progress" className="absolute right-5 top-1/2 hidden h-56 -translate-y-1/2 md:block">
          <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded bg-mist"><div ref={fill} className="h-full origin-top rounded bg-signal" style={{ transform: 'scaleY(0)' }} /></div>
          <ul className="relative flex h-full flex-col items-center justify-between">
            {SCENES.map((s, i) => (
              <li key={s.id}>
                <button onClick={() => toScene(i)} aria-label={`Go to: ${s.label}`} aria-current={active === i} className={`block rounded-full border-2 transition-all ${active === i ? 'h-4 w-4 border-signal bg-signal' : 'h-3 w-3 border-mist bg-white hover:border-signal'}`} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 text-sm font-semibold text-ink-soft">
          <p key={active} className="animate-rise rounded-full bg-white/80 px-4 py-1 backdrop-blur">{active === 0 ? 'Scroll to travel through a record' : SCENES[active].label}</p>
          {active === 0 && <ChevronsDown className="h-5 w-5 animate-nudge text-signal" aria-hidden />}
        </div>
      </div>
    </div>
  );
}
