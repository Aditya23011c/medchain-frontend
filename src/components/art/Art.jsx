// Original illustrations for the landing story. Each fills its container (320 x 240 viewBox).
const idle = { transformBox: 'fill-box', transformOrigin: 'center' };
const Svg = ({ children }) => <svg viewBox="0 0 320 240" className="h-full w-full overflow-visible" aria-hidden>{children}</svg>;

export const ArtIdentify = () => (
  <Svg>
    <defs><linearGradient id="wb" x1="0" x2="1"><stop offset="0" stopColor="#1D6FD6" /><stop offset="1" stopColor="#154FA0" /></linearGradient></defs>
    <g className="animate-float" style={idle}>
      <rect x="20" y="52" width="280" height="92" rx="46" fill="#fff" stroke="#DCE6EE" strokeWidth="2" />
      <path d="M66 52H66a46 46 0 0 0 0 92h0z" fill="url(#wb)" />
      <circle cx="40" cy="76" r="5" fill="#F3F7FA" /><circle cx="40" cy="120" r="5" fill="#F3F7FA" />
      <rect x="92" y="74" width="104" height="11" rx="5.5" fill="#0E2236" />
      <rect x="92" y="94" width="70" height="8" rx="4" fill="#DCE6EE" />
      <rect x="92" y="110" width="88" height="8" rx="4" fill="#DCE6EE" />
      {[0, 4, 7, 9, 13, 16, 18, 22, 25, 28, 31, 34].map((x, i) => <rect key={x} x={214 + x} y="74" width={i % 3 === 0 ? 3 : 2} height="44" fill="#0E2236" />)}
    </g>
    {/* the number goes in, only a hash comes out */}
    <g>
      <rect x="40" y="176" width="108" height="32" rx="16" fill="#fff" stroke="#DCE6EE" strokeWidth="2" />
      <text x="94" y="197" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6B8095">XXXX 4821</text>
      <path d="M156 192h40" stroke="#13966C" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 7" />
      <path d="M192 185l8 7-8 7" fill="none" stroke="#13966C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="206" y="176" width="92" height="32" rx="16" fill="#DDF4EB" />
      <text x="252" y="197" textAnchor="middle" fontSize="13" fontWeight="700" fill="#13966C">a91f…c3e2</text>
    </g>
  </Svg>
);

const Sheet = ({ x, y, rot, accent, children }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect width="104" height="136" rx="14" fill="#fff" stroke="#DCE6EE" strokeWidth="2" />
    <rect width="104" height="26" rx="14" fill={accent} /><rect y="14" width="104" height="12" fill={accent} />
    {children}
  </g>
);
export const ArtPages = () => (
  <Svg>
    <g className="animate-float" style={idle}>
      <Sheet x="20" y="62" rot="-9" accent="#1D6FD6">
        <text x="14" y="18" fontSize="11" fontWeight="800" fill="#fff">Prescription</text>
        <text x="14" y="62" fontSize="26" fontWeight="800" fill="#1D6FD6">Rx</text>
        <rect x="14" y="76" width="70" height="7" rx="3.5" fill="#DCE6EE" /><rect x="14" y="92" width="52" height="7" rx="3.5" fill="#DCE6EE" />
      </Sheet>
      <Sheet x="108" y="40" rot="0" accent="#0E2236">
        <text x="14" y="18" fontSize="11" fontWeight="800" fill="#fff">Lab report</text>
        {[44, 62, 80, 98].map((y, i) => <g key={y}><rect x="14" y={y} width="44" height="7" rx="3.5" fill="#DCE6EE" /><rect x="68" y={y} width="22" height="7" rx="3.5" fill={i === 1 ? '#D93B45' : '#DCE6EE'} /></g>)}
      </Sheet>
      <Sheet x="198" y="62" rot="9" accent="#6B4FD3">
        <text x="14" y="18" fontSize="11" fontWeight="800" fill="#fff">Dispensed</text>
        <circle cx="34" cy="58" r="12" fill="#EEEAFB" /><rect x="58" y="52" width="32" height="12" rx="6" fill="#6B4FD3" opacity=".8" />
        <rect x="14" y="86" width="70" height="7" rx="3.5" fill="#DCE6EE" /><rect x="14" y="102" width="46" height="7" rx="3.5" fill="#DCE6EE" />
      </Sheet>
    </g>
  </Svg>
);

export const ArtRead = () => (
  <Svg>
    <defs><clipPath id="rc"><rect x="52" y="30" width="216" height="180" rx="18" /></clipPath></defs>
    <rect x="52" y="30" width="216" height="180" rx="18" fill="#fff" stroke="#DCE6EE" strokeWidth="2" />
    <g clipPath="url(#rc)">
      {[56, 86, 116, 146, 176].map((y, i) => (
        <g key={y}>
          {i === 2 && <rect x="52" y={y - 12} width="216" height="30" fill="#FDE8E9" />}
          <rect x="72" y={y} width="76" height="8" rx="4" fill={i === 2 ? '#0E2236' : '#DCE6EE'} />
          <rect x="196" y={y} width="42" height="8" rx="4" fill={i === 2 ? '#D93B45' : '#DCE6EE'} />
        </g>
      ))}
      {/* the reading beam sweeping down the page */}
      <g className="animate-scan" style={{ transform: 'translateY(0)' }}>
        <rect x="52" y="40" width="216" height="3" fill="#1D6FD6" />
        <rect x="52" y="12" width="216" height="28" fill="#1D6FD6" opacity=".10" />
      </g>
    </g>
    <g transform="translate(206 112)"><rect width="62" height="26" rx="13" fill="#D93B45" /><text x="31" y="18" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">HIGH</text></g>
  </Svg>
);

export const ArtSeal = () => (
  <Svg>
    <g style={{ ...idle }} className="animate-float">
      <circle cx="160" cy="120" r="92" fill="none" stroke="#1D6FD6" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" opacity=".5" />
      <circle cx="160" cy="120" r="70" fill="none" stroke="#13966C" strokeWidth="2" strokeDasharray="14 10" opacity=".55" />
      <path d="M160 62l46 19v34c0 31-20 53-46 66-26-13-46-35-46-66V81z" fill="#E6F0FC" stroke="#1D6FD6" strokeWidth="3" strokeLinejoin="round" />
      <path d="M140 124l15 15 27-32" fill="none" stroke="#13966C" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      {[[42, 120], [278, 120], [160, 18]].map(([x, y]) => <rect key={x + y} x={x - 14} y={y - 8} width="28" height="16" rx="8" fill="none" stroke="#6B8095" strokeWidth="3" />)}
    </g>
  </Svg>
);

export const ArtConsent = () => (
  <Svg>
    <g className="animate-float" style={idle}>
      <rect x="92" y="14" width="136" height="212" rx="26" fill="#0E2236" />
      <rect x="100" y="28" width="120" height="184" rx="16" fill="#fff" />
      <text x="160" y="62" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6B8095">Share this code</text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}><rect x={110 + i * 17} y="78" width="14" height="22" rx="4" fill={i < 4 ? '#E6F0FC' : '#F3F7FA'} stroke={i === 4 ? '#1D6FD6' : '#DCE6EE'} strokeWidth="1.5" />{i < 4 && <circle cx={117 + i * 17} cy="89" r="2.5" fill="#1D6FD6" />}</g>
      ))}
      <rect x="116" y="148" width="88" height="30" rx="15" fill="#1D6FD6" />
      <text x="160" y="168" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">Approve</text>
    </g>
    <g transform="translate(250 150)"><circle r="30" fill="#fff" stroke="#DCE6EE" strokeWidth="2" /><circle r="22" fill="none" stroke="#E9F0F6" strokeWidth="6" /><circle r="22" fill="none" stroke="#13966C" strokeWidth="6" strokeLinecap="round" strokeDasharray="104 138" transform="rotate(-90)" /><text y="5" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0E2236">30m</text></g>
  </Svg>
);

// Hero: three records fanned in real 3D so the camera can sweep past them.
// The outer element holds the 3D placement, the inner one floats (animations would otherwise replace the transform).
function Float({ className, place, delay = '0s', children }) {
  return (
    <div className={`absolute ${className}`} style={{ transform: place }}>
      <div className="h-full w-full animate-float rounded-[20px] border border-mist bg-white shadow-lift" style={{ animationDelay: delay }}>{children}</div>
    </div>
  );
}

export function HeroSheets() {
  return (
    <div className="relative mx-auto h-[330px] w-[300px] [transform-style:preserve-3d] md:h-[380px] md:w-[360px]">
      <Float className="left-0 top-10 h-60 w-48" place="translateZ(-80px) rotateY(18deg) rotateZ(-6deg)">
        <div className="h-9 rounded-t-[20px] bg-signal px-4 py-2 text-sm font-bold text-white">Prescription</div>
        <div className="space-y-2 p-4"><p className="font-display text-3xl font-extrabold text-signal">Rx</p><i className="block h-2 w-28 rounded bg-mist" /><i className="block h-2 w-20 rounded bg-mist" /></div>
      </Float>
      <Float className="right-0 top-14 h-60 w-48" place="translateZ(-40px) rotateY(-18deg) rotateZ(6deg)" delay="-2s">
        <div className="h-9 rounded-t-[20px] bg-plum px-4 py-2 text-sm font-bold text-white">Dispensed</div>
        <div className="space-y-2 p-4"><i className="block h-9 w-9 rounded-full bg-plum-tint" /><i className="block h-2 w-28 rounded bg-mist" /><i className="block h-2 w-16 rounded bg-mist" /></div>
      </Float>
      <Float className="inset-x-0 top-0 mx-auto h-72 w-60 md:h-80 md:w-64" place="translateZ(40px)" delay="-4s">
        <div className="flex h-10 items-center justify-between rounded-t-[20px] bg-ink px-4 text-sm font-bold text-white">Lab report <span className="rounded-full bg-mint px-2 py-0.5 text-[11px]">Verified</span></div>
        <div className="space-y-3 p-4">
          {[['Platelets', 'w-12'], ['Glucose', 'w-16']].map(([n, w]) => <div key={n} className="flex items-center justify-between text-sm text-ink-soft">{n}<i className={`block h-2 rounded bg-mist ${w}`} /></div>)}
          <div className="rounded-xl bg-coral-tint p-3">
            <div className="flex items-center justify-between text-sm font-bold text-coral">Haemoglobin <span>18.9 High</span></div>
            <div className="relative mt-3 h-2 rounded-full bg-white"><i className="absolute left-[34%] top-0 h-2 w-[30%] rounded-full bg-mint/40" /><i className="absolute -top-1 left-[82%] h-4 w-1.5 rounded bg-coral" /></div>
          </div>
          <div className="flex items-center justify-between text-sm text-ink-soft">Cholesterol <i className="block h-2 w-14 rounded bg-mist" /></div>
        </div>
      </Float>
    </div>
  );
}
