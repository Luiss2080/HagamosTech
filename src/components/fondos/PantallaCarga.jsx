import React, { useEffect, useRef, useState } from 'react';

/* ── Icon badge ── */
const IconBadge = ({ icon, size = 'md', active = false }) => {
  const sz = size === 'lg' ? 'w-10 h-10' : size === 'sm' ? 'w-6 h-6' : 'w-8 h-8';
  const ic = size === 'lg' ? 'text-sm'   : size === 'sm' ? 'text-[9px]' : 'text-[11px]';
  return (
    <span className={`${sz} rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
      active
        ? 'bg-[#A3E635] border border-[#84CC16] text-[#0A0A0A] shadow-[0_4px_14px_rgba(163,230,53,0.4)]'
        : 'bg-lime-950/20 border border-lime-800/30 text-[#A3E635]'
    }`}>
      <i className={`fas ${icon} ${ic}`} />
    </span>
  );
};

/* ── Step chip ── */
const StepChip = ({ icon, label, done, active }) => (
  <div className={`flex flex-col items-center gap-1 transition-all duration-500 ${done || active ? 'opacity-100' : 'opacity-35'}`}>
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-500"
      style={{
        background: done ? '#A3E635' : active ? 'rgba(163,230,53,0.12)' : 'rgba(255,255,255,0.05)',
        borderColor: done || active ? '#A3E635' : 'rgba(163,230,53,0.15)',
        boxShadow: active ? '0 0 16px rgba(163,230,53,0.4)' : done ? '0 2px 8px rgba(163,230,53,0.3)' : 'none',
      }}
    >
      <i className={`fas ${icon} text-[11px] transition-colors duration-300 ${done ? 'text-[#0A0A0A]' : active ? 'text-[#A3E635]' : 'text-gray-500'}`} />
    </div>
    <span className={`text-[7.5px] font-black uppercase tracking-wider transition-colors duration-300 ${done || active ? 'text-[#A3E635]' : 'text-gray-500'}`}>{label}</span>
  </div>
);

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut]   = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const STEPS = [
    { icon: 'fa-code',             label: 'Código'    },
    { icon: 'fa-network-wired',    label: 'Red'       },
    { icon: 'fa-server',           label: 'Servidor'  },
    { icon: 'fa-shield-halved',    label: 'Seguridad' },
    { icon: 'fa-star',             label: '¡Listo!'   },
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
      style={{ background: '#050505' }}
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
          0%,100% { box-shadow:0 0 0 0 rgba(163,230,53,0.4); }
          50%      { box-shadow:0 0 0 10px rgba(163,230,53,0); }
        }
        @keyframes lcLogoFloat {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-12px); }
        }
        @keyframes lcRingGlow {
          0%,100% { filter:drop-shadow(0 0 8px rgba(163,230,53,.45)); }
          50%      { filter:drop-shadow(0 0 24px rgba(163,230,53,.85)); }
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

        .lc-logo   { animation:lcLogoFloat 4s ease-in-out infinite; }
        .lc-ring   { animation:lcRingGlow 2.2s ease-in-out infinite; }
        .lc-card-in{ animation:lcCardIn .5s cubic-bezier(.34,1.56,.64,1) both; }
        .lc-shimmer{
          background:linear-gradient(90deg,#A3E635 0%,#84CC16 35%,#FFFFFF 50%,#84CC16 65%,#A3E635 100%);
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

      {/* ── FONDO TECNOLÓGICO ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Orbes borrosos verdes */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#A3E635]/10 rounded-full blur-[80px] lc-float-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#84CC16]/5 rounded-full blur-[100px] lc-float-med" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-[#A3E635]/8 rounded-full blur-[90px] lc-float-fast" />

        {/* Micro dots */}
        <div className="absolute top-[40%] left-[30%] w-2 h-2 rounded-full bg-[#A3E635]/20 lc-pulse-dot" />
        <div className="absolute top-[60%] right-[35%] w-3 h-3 rounded-full bg-[#84CC16]/20 lc-pulse-dot" style={{ animationDelay:'1s' }} />
        <div className="absolute bottom-[30%] left-[50%] w-1.5 h-1.5 rounded-full bg-[#A3E635]/25 lc-pulse-dot" style={{ animationDelay:'.5s' }} />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:`url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNjMsMjMwLDUzLDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")`,
          }}
        />

        {/* Steam effects */}
        <div className="absolute" style={{ left:'50%', top:'46%', transform:'translateX(-50%)', width:220 }}>
          {[8,28,48,68,88].map((x, i) => (
            <div key={i} className="absolute bottom-0 rounded-full"
              style={{
                left:`${x}%`, width:3, height:60,
                background:'linear-gradient(to top, rgba(163,230,53,0.15), transparent)',
                animation:`lcSteam ${2.5+i*0.3}s ease-out ${i*0.55}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── CONTENIDO CENTRAL ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[500px] px-5 text-center text-white">

        {/* Live badge */}
        <div className="lc-card-in mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
          style={{
            background:'rgba(17,24,39,0.85)', backdropFilter:'blur(12px)',
            border:'1.5px solid rgba(163,230,53,0.3)',
            boxShadow:'0 4px 18px rgba(163,230,53,0.15)',
            animationDelay:'.05s',
          }}
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[#A3E635]" style={{ animation:'lcPing 1.1s cubic-bezier(0,0,.2,1) infinite' }} />
            <span className="relative w-2 h-2 rounded-full bg-[#A3E635]" />
          </span>
          <i className="fas fa-terminal text-[#A3E635] text-[9px]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/90">INICIANDO ENTORNO</span>
        </div>

        {/* Logo floating */}
        <div className="lc-logo lc-card-in mb-4" style={{ animationDelay:'.1s' }}>
          <img
            src="/img/02_Logos/LogoHeader.png"
            alt="HagamosTech"
            className="h-24 sm:h-28 w-auto object-contain"
            style={{ filter:'drop-shadow(0 6px 24px rgba(163,230,53,0.25))' }}
          />
        </div>

        {/* Descripción ampliada */}
        <div className="lc-card-in mb-6 px-2" style={{ animationDelay:'.16s' }}>
          <p className="text-[14px] font-bold text-slate-300 leading-relaxed">
            Desarrollo a medida, robótica educativa y soluciones digitales con el
            <span className="text-[#A3E635] font-black"> estándar más alto </span>
            de calidad y soporte.
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">
              <i className="fas fa-laptop-code text-[#A3E635] text-[9px]" /> Software Pro
            </span>
            <span className="w-1 h-1 rounded-full bg-[#A3E635]/30" />
            <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">
              <i className="fas fa-robot text-[#A3E635] text-[9px]" /> Robótica STEAM
            </span>
            <span className="w-1 h-1 rounded-full bg-[#A3E635]/30" />
            <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">
              <i className="fas fa-headset text-[#A3E635] text-[9px]" /> Soporte 24/7
            </span>
          </div>
        </div>

        {/* Ring progress */}
        <div className="lc-card-in relative flex items-center justify-center mb-5" style={{ width:160, height:160, animationDelay:'.28s' }}>
          <div className="absolute inset-0 rounded-full"
            style={{ background:'radial-gradient(circle, rgba(163,230,53,0.12) 0%, transparent 70%)', animation:'lcRingGlow 2.5s ease-in-out infinite' }}
          />
          <svg className="lc-ring absolute w-full h-full" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(163,230,53,0.10)" strokeWidth="6" />
            {[0,72,144,216,288].map((deg, i) => {
              const rad = (deg - 90) * Math.PI / 180;
              return (
                <circle key={i}
                  cx={70 + (radius+5)*Math.cos(rad)} cy={70 + (radius+5)*Math.sin(rad)} r="2.5"
                  fill={progress >= i*20 ? '#A3E635' : 'rgba(163,230,53,0.18)'}
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
                <stop offset="0%"   stopColor="#A3E635" />
                <stop offset="60%"  stopColor="#84CC16" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="relative z-10 flex flex-col items-center">
            <span className="font-heading font-black leading-none text-[#A3E635]" style={{ fontSize:'2.7rem', filter:'drop-shadow(0 2px 10px rgba(163,230,53,0.35))' }}>
              {progress}
            </span>
            <span className="text-[9px] font-black uppercase tracking-[.2em] text-slate-400 -mt-1">% cargando</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="lc-card-in w-full mb-2" style={{ animationDelay:'.32s' }}>
          <div className="w-full rounded-full overflow-hidden"
            style={{ height:9, background:'rgba(163,230,53,0.09)', border:'1px solid rgba(163,230,53,0.14)' }}
          >
            <div className="lc-shimmer h-full rounded-full" style={{ width:`${progress}%`, transition:'width .15s ease-out' }} />
          </div>
        </div>

        {/* Step indicators */}
        <div className="lc-card-in w-full flex items-center gap-1 mb-6" style={{ animationDelay:'.36s' }}>
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <StepChip {...s} done={i < stepIdx} active={i === stepIdx} />
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px rounded-full transition-all duration-500"
                  style={{ background: i < stepIdx ? '#A3E635' : 'rgba(163,230,53,0.15)' }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Redes sociales */}
        <div className="flex items-center gap-2 mt-2 mb-1">
          {[
            { icon: 'fa-facebook-f', href: 'https://www.facebook.com/HagamosTech',        color: '#1877F2', label: 'Facebook'  },
            { icon: 'fa-instagram',  href: 'https://www.instagram.com/hagamostech/', color: '#E1306C', label: 'Instagram' },
            { icon: 'fa-tiktok',     href: 'https://www.tiktok.com/@hagamostech',           color: '#010101', label: 'TikTok'    },
            { icon: 'fa-whatsapp',   href: 'https://wa.me/59161320004',                    color: '#25D366', label: 'WhatsApp'  },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{
                background: 'rgba(17,24,39,0.80)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(163,230,53,0.15)',
              }}
            >
              <span
                className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: s.color, boxShadow: `0 3px 10px ${s.color}55` }}
              >
                <i className={`fab ${s.icon} text-white text-[9px]`} />
              </span>
              <span className="text-[10px] font-black text-slate-350">{s.label}</span>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LoadingScreen;
