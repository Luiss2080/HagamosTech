import React, { useEffect, useRef, useState } from 'react';

/* ── Icon badge (same style as login modal) ── */
const IconBadge = ({ icon, size = 'md', active = false }) => {
  const sz = size === 'lg' ? 'w-10 h-10' : size === 'sm' ? 'w-6 h-6' : 'w-8 h-8';
  const ic = size === 'lg' ? 'text-sm'   : size === 'sm' ? 'text-[9px]' : 'text-[11px]';
  return (
    <span className={`${sz} rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
      active
        ? 'bg-[#FF4D00] border border-[#CC3D00] text-white shadow-[0_4px_14px_rgba(255,77,0,0.4)]'
        : 'bg-orange-50 border border-orange-200 text-[#FF4D00]'
    }`}>
      <i className={`fas ${icon} ${ic}`} />
    </span>
  );
};

/* eslint-disable no-unused-vars */
const _KitchenCardUnused = null; // removed per user request



/* ── Step chip ── */
const StepChip = ({ icon, label, done, active }) => (
  <div className={`flex flex-col items-center gap-1 transition-all duration-500 ${done || active ? 'opacity-100' : 'opacity-35'}`}>
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-500"
      style={{
        background: done ? '#FF4D00' : active ? 'rgba(255,77,0,0.12)' : 'rgba(255,255,255,0.5)',
        borderColor: done || active ? '#FF4D00' : 'rgba(255,77,0,0.15)',
        boxShadow: active ? '0 0 16px rgba(255,77,0,0.4)' : done ? '0 2px 8px rgba(255,77,0,0.3)' : 'none',
      }}
    >
      <i className={`fas ${icon} text-[11px] transition-colors duration-300 ${done ? 'text-white' : active ? 'text-[#FF4D00]' : 'text-gray-400'}`} />
    </div>
    <span className={`text-[7.5px] font-black uppercase tracking-wider transition-colors duration-300 ${done || active ? 'text-[#FF4D00]' : 'text-gray-400'}`}>{label}</span>
  </div>
);

/* ─────────────────────────────────── */
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut]   = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const STEPS = [
    { icon: 'fa-fire',             label: 'Horno'    },
    { icon: 'fa-wheat-awn',        label: 'Masa'     },
    { icon: 'fa-mortar-pestle',    label: 'Relleno'  },
    { icon: 'fa-hands',            label: 'Formado'  },
    { icon: 'fa-star',             label: '¡Lista!'  },
  ];



  /* ── Progress ── */
  useEffect(() => {
    const total = 2900, tick = 26;
    const maxSteps = total / tick;
    let cur = 0;
    const iv = setInterval(() => {
      cur++;
      const raw   = Math.min((cur / maxSteps) * 100, 100);
      const eased = raw >= 100 ? 100 : raw > 72 ? 72 + (raw - 72) * 0.38 : raw;
      setProgress(Math.round(eased));
      if (raw >= 100) {
        clearInterval(iv);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => { if (onCompleteRef.current) onCompleteRef.current(); }, 650);
        }, 380);
      }
    }, tick);
    return () => clearInterval(iv);
  }, []);

  const stepIdx    = Math.min(Math.floor(progress / (100 / STEPS.length)), STEPS.length - 1);
  const radius     = 62;
  const circ       = 2 * Math.PI * radius;
  const dashOffset = circ - (progress / 100) * circ;

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center
        transition-all duration-700 ease-out
        ${fadeOut ? 'opacity-0 scale-[1.04] pointer-events-none' : 'opacity-100 scale-100'}`}
      style={{ background: 'linear-gradient(135deg, #FFF5EC 0%, #FFE8D6 50%, #FFF0E8 100%)' }}
    >
      <style>{`
        @keyframes lcFloatSlow {
          0%,100% { transform:translateY(0px) translateX(0px) rotate(0deg); }
          33%      { transform:translateY(-40px) translateX(20px) rotate(4deg); }
          66%      { transform:translateY(-20px) translateX(-10px) rotate(-2deg); }
        }
        @keyframes lcFloatMed {
          0%,100% { transform:translateY(0px) translateX(0px) rotate(0deg); }
          33%      { transform:translateY(-50px) translateX(-15px) rotate(-4deg); }
          66%      { transform:translateY(-30px) translateX(10px) rotate(2deg); }
        }
        @keyframes lcFloatFast {
          0%,100% { transform:translateY(0px) scale(1); }
          50%      { transform:translateY(-30px) scale(1.1); }
        }
        @keyframes lcPulseGlow {
          0%,100% { box-shadow:0 0 0 0 rgba(255,77,0,0.4); }
          50%      { box-shadow:0 0 0 10px rgba(255,77,0,0); }
        }
        @keyframes lcLogoFloat {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-12px); }
        }
        @keyframes lcRingGlow {
          0%,100% { filter:drop-shadow(0 0 8px rgba(255,77,0,.45)); }
          50%      { filter:drop-shadow(0 0 24px rgba(255,77,0,.85)); }
        }
        @keyframes lcShimmer {
          0%  { background-position:-280% center; }
          100%{ background-position:280% center; }
        }
        @keyframes lcDot {
          0%,80%,100%{ transform:scale(0); opacity:0; }
          40%         { transform:scale(1); opacity:1; }
        }
        @keyframes lcPing {
          0%  { transform:scale(1);   opacity:.75; }
          70% { transform:scale(2.4); opacity:0;   }
          100%{ opacity:0; }
        }
        @keyframes lcCardIn {
          from{ opacity:0; transform:scale(.94) translateY(14px); }
          to  { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes lcSteam {
          0%   { opacity:.5; transform:translateY(0) scaleX(1); }
          60%  { opacity:.2; transform:translateY(-50px) scaleX(1.5); }
          100% { opacity:0;  transform:translateY(-90px) scaleX(.5); }
        }
        @keyframes lcSocialHover {
          0%  { transform:translateY(0); }
          50% { transform:translateY(-4px); }
          100%{ transform:translateY(0); }
        }

        .lc-logo   { animation:lcLogoFloat 4s ease-in-out infinite; }
        .lc-ring   { animation:lcRingGlow 2.2s ease-in-out infinite; }
        .lc-card-in{ animation:lcCardIn .5s cubic-bezier(.34,1.56,.64,1) both; }
        .lc-shimmer{
          background:linear-gradient(90deg,#FF4D00 0%,#FF8C00 35%,#FFD580 50%,#FF8C00 65%,#FF4D00 100%);
          background-size:280% auto;
          animation:lcShimmer 2s linear infinite;
        }
        .lc-d1{ animation:lcDot 1.4s ease-in-out -.32s infinite; }
        .lc-d2{ animation:lcDot 1.4s ease-in-out -.16s infinite; }
        .lc-d3{ animation:lcDot 1.4s ease-in-out   0s infinite; }
        .lc-float-slow { animation:lcFloatSlow 8s ease-in-out infinite; }
        .lc-float-med  { animation:lcFloatMed  7s ease-in-out infinite; }
        .lc-float-fast { animation:lcFloatFast 5s ease-in-out infinite; }
        .lc-pulse-dot  { animation:lcPulseGlow 2s infinite; }
      `}</style>

      {/* ════════════════════════════════════
          FONDO — exacto igual al FondoSaltenas
          ════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* ── Orbes borrosos (igual que FondoSaltenas) ── */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FF4D00]/10 rounded-full blur-[80px] lc-float-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#5D3A1F]/10 rounded-full blur-[100px] lc-float-med" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-[#FF8C00]/10 rounded-full blur-[90px] lc-float-fast" />

        {/* ── SVG Blobs orgánicos (igual que FondoSaltenas) ── */}
        <svg className="absolute top-[15%] left-[10%] w-28 h-28 text-[#FF4D00]/15 lc-float-slow" viewBox="0 0 200 200" fill="currentColor">
          <path d="M45.7,-76.4C58.9,-69.3,69.2,-55.9,78,-41.8C86.8,-27.7,94.2,-13.9,94.3,0.1C94.4,14.1,87.2,28.2,78.2,41.4C69.2,54.6,58.4,66.9,45.2,75.1C32,83.3,16,87.4,1.1,85.5C-13.7,83.7,-27.5,76,-40.4,67.6C-53.3,59.2,-65.4,50.1,-74.6,38.1C-83.8,26.1,-90.1,11.2,-91,-4.2C-91.9,-19.6,-87.4,-35.5,-77.8,-48.1C-68.2,-60.7,-53.5,-70,-39.1,-75.7C-24.7,-81.4,-12.3,-83.5,1.7,-86.4C15.7,-89.3,31.4,-93.1,45.7,-76.4Z" transform="translate(100 100)" />
        </svg>

        <svg className="absolute bottom-[20%] left-[15%] w-40 h-40 text-[#5D3A1F]/10 lc-float-med" viewBox="0 0 200 200" fill="currentColor">
          <path d="M42.7,-73.4C56.2,-66.1,68.6,-54.6,76.6,-40.5C84.6,-26.4,88.2,-9.7,86.2,6.3C84.2,22.3,76.6,37.6,65.8,49.8C55,62,41,71.1,25.9,76.8C10.8,82.5,-5.4,84.8,-20.9,81.8C-36.4,78.8,-51.2,70.5,-63.3,58.8C-75.4,47.1,-84.8,32,-88.7,15.6C-92.6,-0.8,-91,-18.5,-83.5,-33.5C-76,-48.5,-62.6,-60.8,-47.9,-67.7C-33.2,-74.6,-16.6,-76.1,-0.1,-76C16.4,-75.9,32.8,-74.2,42.7,-73.4Z" transform="translate(100 100)" />
        </svg>

        <svg className="absolute top-[25%] right-[15%] w-20 h-20 text-[#FF4D00]/15 lc-float-fast" viewBox="0 0 200 200" fill="currentColor">
          <path d="M51.5,-73.4C66.5,-64.4,78.3,-50.2,85.2,-34.1C92.1,-18,94.1,-0.1,90.3,16.4C86.5,32.9,76.9,48,63.9,59C50.9,70,34.5,76.9,17.7,81.1C0.9,85.3,-16.3,86.8,-32.4,82.3C-48.5,77.8,-63.5,67.3,-74.3,53.4C-85.1,39.5,-91.7,22.2,-93,-4.2C-94.3,-30.6,-90.3,-56.1,-76.9,-69.7C-63.5,-83.3,-40.7,-85.1,-21.9,-80C-3.1,-74.9,11.7,-63.1,25.2,-61.5C38.7,-59.9,51,-68.5,51.5,-73.4Z" transform="translate(100 100)" />
        </svg>

        {/* ── Micro dots (especias / chispas) ── */}
        <div className="absolute top-[40%] left-[30%] w-2 h-2 rounded-full bg-[#5D3A1F]/30 lc-pulse-dot" />
        <div className="absolute top-[60%] right-[35%] w-3 h-3 rounded-full bg-[#FF4D00]/40 lc-pulse-dot" style={{ animationDelay:'1s' }} />
        <div className="absolute bottom-[30%] left-[50%] w-1.5 h-1.5 rounded-full bg-[#8B4513]/30 lc-pulse-dot" style={{ animationDelay:'.5s' }} />
        <div className="absolute top-[20%] right-[40%] w-2.5 h-2.5 rounded-full bg-[#FF8C00]/40 lc-float-fast" style={{ animationDelay:'1.5s' }} />
        <div className="absolute bottom-[40%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#FF4D00]/50 lc-pulse-dot" style={{ animationDelay:'2s' }} />

        {/* ── Grid texture (igual que FondoSaltenas) ── */}
        <div
          className="absolute inset-0 opacity-60 pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage:`url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAxNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==")`,
          }}
        />

        {/* ── Olas decorativas (igual que FondoSaltenas) ── */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] opacity-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(100%+1.3px)] h-[80px] block">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#FF4D00]" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 opacity-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(100%+1.3px)] h-[80px] block">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#FF4D00]" />
          </svg>
        </div>

        {/* ── Steam wisps (detrás del logo) ── */}
        <div className="absolute" style={{ left:'50%', top:'46%', transform:'translateX(-50%)', width:220 }}>
          {[8,28,48,68,88].map((x, i) => (
            <div key={i} className="absolute bottom-0 rounded-full"
              style={{
                left:`${x}%`, width:3, height:60,
                background:'linear-gradient(to top, rgba(255,77,0,0.20), transparent)',
                animation:`lcSteam ${2.5+i*0.3}s ease-out ${i*0.55}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════
          CONTENIDO CENTRAL
          ════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[500px] px-5 text-center">

        {/* ── Live badge ── */}
        <div className="lc-card-in mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
          style={{
            background:'rgba(255,255,255,0.75)', backdropFilter:'blur(12px)',
            border:'1.5px solid rgba(255,77,0,0.22)',
            boxShadow:'0 4px 18px rgba(255,77,0,0.12)',
            animationDelay:'.05s',
          }}
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[#FF4D00]" style={{ animation:'lcPing 1.1s cubic-bezier(0,0,.2,1) infinite' }} />
            <span className="relative w-2 h-2 rounded-full bg-[#FF4D00]" />
          </span>
          <i className="fas fa-store text-[#FF4D00] text-[9px]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#5D3A1F]">Abriendo la Cocina</span>
        </div>

        {/* ── Logo floating ── */}
        <div className="lc-logo lc-card-in mb-4" style={{ animationDelay:'.1s' }}>
          <img
            src="/img/02_Logos/LogoHeader.png"
            alt="Los Castores"
            className="h-24 sm:h-28 w-auto object-contain"
            style={{ filter:'drop-shadow(0 6px 24px rgba(255,77,0,0.28))' }}
          />
        </div>

        {/* ── Descripción ampliada ── */}
        <div className="lc-card-in mb-6 px-2" style={{ animationDelay:'.16s' }}>
          <p className="text-[14px] font-bold text-[#5D3A1F]/75 leading-relaxed">
            Horneadas cada mañana con ingredientes 100% bolivianos,
            <span className="text-[#FF4D00] font-black"> receta artesanal </span>
            y el toque único que nos hace únicos en Santa Cruz.
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-[10px] font-black text-[#5D3A1F]/55 uppercase tracking-wider">
              <i className="fas fa-fire text-[#FF4D00] text-[9px]" /> Horno artesanal
            </span>
            <span className="w-1 h-1 rounded-full bg-[#FF4D00]/30" />
            <span className="flex items-center gap-1.5 text-[10px] font-black text-[#5D3A1F]/55 uppercase tracking-wider">
              <i className="fas fa-leaf text-[#FF4D00] text-[9px]" /> 100% boliviano
            </span>
            <span className="w-1 h-1 rounded-full bg-[#FF4D00]/30" />
            <span className="flex items-center gap-1.5 text-[10px] font-black text-[#5D3A1F]/55 uppercase tracking-wider">
              <i className="fas fa-motorcycle text-[#FF4D00] text-[9px]" /> Delivery
            </span>
          </div>
        </div>



        {/* ── Ring progress ── */}
        <div className="lc-card-in relative flex items-center justify-center mb-5" style={{ width:160, height:160, animationDelay:'.28s' }}>
          <div className="absolute inset-0 rounded-full"
            style={{ background:'radial-gradient(circle, rgba(255,77,0,0.12) 0%, transparent 70%)', animation:'lcRingGlow 2.5s ease-in-out infinite' }}
          />
          <svg className="lc-ring absolute w-full h-full" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,77,0,0.10)" strokeWidth="6" />
            {[0,72,144,216,288].map((deg, i) => {
              const rad = (deg - 90) * Math.PI / 180;
              return (
                <circle key={i}
                  cx={70 + (radius+5)*Math.cos(rad)} cy={70 + (radius+5)*Math.sin(rad)} r="2.5"
                  fill={progress >= i*20 ? '#FF4D00' : 'rgba(255,77,0,0.18)'}
                  style={{ transition:'fill .4s ease' }}
                />
              );
            })}
            <circle cx="70" cy="70" r={radius} fill="none"
              style={{
                stroke:'url(#lcGrad)', strokeWidth:'6.5',
                strokeDasharray:circ, strokeDashoffset:dashOffset,
                strokeLinecap:'round',
                transition:'stroke-dashoffset 0.08s ease-out',
                transform:'rotate(-90deg)', transformOrigin:'70px 70px',
              }}
            />
            <defs>
              <linearGradient id="lcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#FF4D00" />
                <stop offset="60%"  stopColor="#FF8C00" />
                <stop offset="100%" stopColor="#FFB347" />
              </linearGradient>
            </defs>
          </svg>
          <div className="relative z-10 flex flex-col items-center">
            <span className="font-heading font-black leading-none" style={{ fontSize:'2.7rem', color:'#FF4D00', filter:'drop-shadow(0 2px 10px rgba(255,77,0,0.35))' }}>
              {progress}
            </span>
            <span className="text-[9px] font-black uppercase tracking-[.2em] text-[#5D3A1F]/55 -mt-1">% cargando</span>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="lc-card-in w-full mb-2" style={{ animationDelay:'.32s' }}>
          <div className="w-full rounded-full overflow-hidden"
            style={{ height:9, background:'rgba(255,77,0,0.09)', border:'1px solid rgba(255,77,0,0.14)' }}
          >
            <div className="lc-shimmer h-full rounded-full" style={{ width:`${progress}%`, transition:'width .15s ease-out' }} />
          </div>
        </div>

        {/* ── Step indicators ── */}
        <div className="lc-card-in w-full flex items-center gap-1 mb-6" style={{ animationDelay:'.36s' }}>
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <StepChip {...s} done={i < stepIdx} active={i === stepIdx} />
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px rounded-full transition-all duration-500"
                  style={{ background: i < stepIdx ? '#FF4D00' : 'rgba(255,77,0,0.15)' }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Redes sociales ── */}
        <div className="flex items-center gap-2 mt-2 mb-1">
          {[
            { icon: 'fa-facebook-f', href: 'https://www.facebook.com/LosCastoresSC',        color: '#1877F2', label: 'Facebook'  },
            { icon: 'fa-instagram',  href: 'https://www.instagram.com/castoresscz/', color: '#E1306C', label: 'Instagram' },
            { icon: 'fa-tiktok',     href: 'https://www.tiktok.com/@castores.scz',           color: '#010101', label: 'TikTok'    },
            { icon: 'fa-whatsapp',   href: 'https://wa.me/59161320004',                    color: '#25D366', label: 'WhatsApp'  },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{
                background: 'rgba(255,255,255,0.80)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(255,77,0,0.15)',
              }}
            >
              <span
                className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: s.color, boxShadow: `0 3px 10px ${s.color}55` }}
              >
                <i className={`fab ${s.icon} text-white text-[9px]`} />
              </span>
              <span className="text-[10px] font-black text-[#5D3A1F]/70">{s.label}</span>
            </a>
          ))}
        </div>



      </div>
    </div>
  );
};

export default LoadingScreen;
