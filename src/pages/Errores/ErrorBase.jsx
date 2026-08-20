import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente base reutilizable para todas las páginas de error.
 * Mantiene la animación glitch en el número pero con los colores
 * y estilo del nuevo diseño de Los Castores (naranja/marrón/crema).
 */
const ErrorBase = ({ code, title, description, logs, icon = 'fa-triangle-exclamation', action = { to: '/', label: 'Volver al inicio' } }) => (
  <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-28 pb-16">
    <style>{`
      /* ── Background animations (same as FondoSaltenas) ── */
      @keyframes errFloatSlow {
        0%,100% { transform:translateY(0px) translateX(0px) rotate(0deg); }
        33%      { transform:translateY(-40px) translateX(20px) rotate(4deg); }
        66%      { transform:translateY(-20px) translateX(-10px) rotate(-2deg); }
      }
      @keyframes errFloatMed {
        0%,100% { transform:translateY(0px) translateX(0px) rotate(0deg); }
        33%      { transform:translateY(-50px) translateX(-15px) rotate(-4deg); }
        66%      { transform:translateY(-30px) translateX(10px) rotate(2deg); }
      }
      @keyframes errFloatFast {
        0%,100% { transform:translateY(0px) scale(1); }
        50%      { transform:translateY(-30px) scale(1.1); }
      }
      @keyframes errPulse {
        0%,100% { box-shadow:0 0 0 0 rgba(255,77,0,0.35); }
        50%      { box-shadow:0 0 0 12px rgba(255,77,0,0); }
      }

      /* ── Glitch on the error number ── */
      @keyframes errGlitch1 {
        0%   { clip-path:inset(20% 0 80% 0); transform:translate(-3px, 0); }
        20%  { clip-path:inset(60% 0 10% 0); transform:translate( 3px, 0); }
        40%  { clip-path:inset(40% 0 50% 0); transform:translate(-2px, 0); }
        60%  { clip-path:inset(80% 0  5% 0); transform:translate( 2px, 0); }
        80%  { clip-path:inset(10% 0 70% 0); transform:translate(-3px, 0); }
        100% { clip-path:inset(30% 0 20% 0); transform:translate( 3px, 0); }
      }
      @keyframes errGlitch2 {
        0%   { clip-path:inset(10% 0 60% 0); transform:translate( 3px, 0); }
        20%  { clip-path:inset(30% 0 10% 0); transform:translate(-3px, 0); }
        40%  { clip-path:inset(80% 0  5% 0); transform:translate( 2px, 0); }
        60%  { clip-path:inset(15% 0 80% 0); transform:translate(-2px, 0); }
        80%  { clip-path:inset(60% 0 10% 0); transform:translate( 3px, 0); }
        100% { clip-path:inset(40% 0 30% 0); transform:translate(-3px, 0); }
      }

      /* ── Badge ping ── */
      @keyframes errPing {
        0%  { transform:scale(1);   opacity:.75; }
        70% { transform:scale(2.2); opacity:0;   }
        100%{ opacity:0; }
      }

      /* ── Card slide in ── */
      @keyframes errCardIn {
        from { opacity:0; transform:scale(.94) translateY(18px); }
        to   { opacity:1; transform:scale(1) translateY(0); }
      }

      /* ── Log line appear ── */
      @keyframes errLogIn {
        from { opacity:0; transform:translateX(-6px); }
        to   { opacity:1; transform:translateX(0); }
      }

      .err-float-slow { animation:errFloatSlow 8s ease-in-out infinite; }
      .err-float-med  { animation:errFloatMed  7s ease-in-out infinite; }
      .err-float-fast { animation:errFloatFast 5s ease-in-out infinite; }
      .err-pulse-dot  { animation:errPulse 2s infinite; }
      .err-card-in    { animation:errCardIn .55s cubic-bezier(.34,1.56,.64,1) both; }

      /* Glitch layers on the number */
      .err-code { position:relative; display:inline-block; }
      .err-code::before,
      .err-code::after {
        content: attr(data-text);
        position: absolute;
        top:0; left:0; width:100%; height:100%;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        letter-spacing: inherit;
      }
      .err-code::before {
        color: #FF8C00;
        animation: errGlitch1 2.4s infinite linear alternate-reverse;
      }
      .err-code::after {
        color: #FF4D00;
        animation: errGlitch2 3.2s infinite linear alternate-reverse;
      }

      /* Log rows */
      .err-log-row { animation: errLogIn .35s ease-out both; }
      .err-log-row:nth-child(1) { animation-delay:.1s; }
      .err-log-row:nth-child(2) { animation-delay:.25s; }
      .err-log-row:nth-child(3) { animation-delay:.4s; }
    `}</style>

    {/* ════════ BACKGROUND (idéntico al FondoSaltenas) ════════ */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ background:'linear-gradient(135deg, #FFF5EC 0%, #FFE8D6 50%, #FFF0E8 100%)' }}>
      {/* Orbes borrosos */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FF4D00]/10 rounded-full blur-[80px] err-float-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#5D3A1F]/10 rounded-full blur-[100px] err-float-med" />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-[#FF8C00]/10 rounded-full blur-[90px] err-float-fast" />

      {/* SVG blobs orgánicos */}
      <svg className="absolute top-[15%] left-[10%] w-28 h-28 text-[#FF4D00]/15 err-float-slow" viewBox="0 0 200 200" fill="currentColor">
        <path d="M45.7,-76.4C58.9,-69.3,69.2,-55.9,78,-41.8C86.8,-27.7,94.2,-13.9,94.3,0.1C94.4,14.1,87.2,28.2,78.2,41.4C69.2,54.6,58.4,66.9,45.2,75.1C32,83.3,16,87.4,1.1,85.5C-13.7,83.7,-27.5,76,-40.4,67.6C-53.3,59.2,-65.4,50.1,-74.6,38.1C-83.8,26.1,-90.1,11.2,-91,-4.2C-91.9,-19.6,-87.4,-35.5,-77.8,-48.1C-68.2,-60.7,-53.5,-70,-39.1,-75.7C-24.7,-81.4,-12.3,-83.5,1.7,-86.4C15.7,-89.3,31.4,-93.1,45.7,-76.4Z" transform="translate(100 100)" />
      </svg>
      <svg className="absolute bottom-[20%] left-[15%] w-40 h-40 text-[#5D3A1F]/10 err-float-med" viewBox="0 0 200 200" fill="currentColor">
        <path d="M42.7,-73.4C56.2,-66.1,68.6,-54.6,76.6,-40.5C84.6,-26.4,88.2,-9.7,86.2,6.3C84.2,22.3,76.6,37.6,65.8,49.8C55,62,41,71.1,25.9,76.8C10.8,82.5,-5.4,84.8,-20.9,81.8C-36.4,78.8,-51.2,70.5,-63.3,58.8C-75.4,47.1,-84.8,32,-88.7,15.6C-92.6,-0.8,-91,-18.5,-83.5,-33.5C-76,-48.5,-62.6,-60.8,-47.9,-67.7C-33.2,-74.6,-16.6,-76.1,-0.1,-76C16.4,-75.9,32.8,-74.2,42.7,-73.4Z" transform="translate(100 100)" />
      </svg>
      <svg className="absolute top-[25%] right-[15%] w-20 h-20 text-[#FF4D00]/15 err-float-fast" viewBox="0 0 200 200" fill="currentColor">
        <path d="M51.5,-73.4C66.5,-64.4,78.3,-50.2,85.2,-34.1C92.1,-18,94.1,-0.1,90.3,16.4C86.5,32.9,76.9,48,63.9,59C50.9,70,34.5,76.9,17.7,81.1C0.9,85.3,-16.3,86.8,-32.4,82.3C-48.5,77.8,-63.5,67.3,-74.3,53.4C-85.1,39.5,-91.7,22.2,-93,-4.2C-94.3,-30.6,-90.3,-56.1,-76.9,-69.7C-63.5,-83.3,-40.7,-85.1,-21.9,-80C-3.1,-74.9,11.7,-63.1,25.2,-61.5C38.7,-59.9,51,-68.5,51.5,-73.4Z" transform="translate(100 100)" />
      </svg>

      {/* Micro dots */}
      <div className="absolute top-[40%] left-[30%] w-2 h-2 rounded-full bg-[#5D3A1F]/30 err-pulse-dot" />
      <div className="absolute top-[60%] right-[35%] w-3 h-3 rounded-full bg-[#FF4D00]/40 err-pulse-dot" style={{ animationDelay:'1s' }} />
      <div className="absolute bottom-[30%] left-[50%] w-1.5 h-1.5 rounded-full bg-[#8B4513]/30 err-pulse-dot" style={{ animationDelay:'.5s' }} />
      <div className="absolute top-[20%] right-[40%] w-2.5 h-2.5 rounded-full bg-[#FF8C00]/40 err-float-fast" style={{ animationDelay:'1.5s' }} />
      <div className="absolute bottom-[40%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#FF4D00]/50 err-pulse-dot" style={{ animationDelay:'2s' }} />

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-60 mix-blend-multiply"
        style={{ backgroundImage:`url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAxNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==")` }}
      />

      {/* Olas decorativas */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] opacity-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[80px] block">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FF4D00" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 opacity-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[80px] block">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FF4D00" />
        </svg>
      </div>
    </div>

    {/* ════════ CONTENIDO ════════ */}
    <div className="relative z-10 flex flex-col items-center text-center max-w-[540px] w-full mx-auto">

      {/* ── Live status badge ── */}
      <div className="err-card-in mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full"
        style={{ background:'rgba(255,255,255,0.78)', backdropFilter:'blur(12px)', border:'1.5px solid rgba(255,77,0,0.22)', boxShadow:'0 4px 18px rgba(255,77,0,0.12)', animationDelay:'.05s' }}
      >
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-[#FF4D00]" style={{ animation:'errPing 1.1s cubic-bezier(0,0,.2,1) infinite' }} />
          <span className="relative w-2 h-2 rounded-full bg-[#FF4D00]" />
        </span>
        <i className={`fas ${icon} text-[#FF4D00] text-[12px]`} />
        <span className="text-[11px] font-black uppercase tracking-widest text-[#5D3A1F]">
          El horno está vacío
        </span>
      </div>

      {/* ── Glitch error number ── */}
      <div className="err-card-in mb-4 select-none" style={{ animationDelay:'.15s' }}>
        <h1
          className="err-code font-heading font-black leading-none"
          data-text={String(code)}
          style={{
            fontSize: 'clamp(8rem, 24vw, 12rem)',
            color: '#1a0800',
            WebkitTextStroke: '2px rgba(255,77,0,0.25)',
            textShadow: '3px 3px 0 rgba(255,77,0,0.18)',
            letterSpacing: '-0.02em',
          }}
        >
          {code}
        </h1>
      </div>

      {/* ── Error title ── */}
      <div className="err-card-in mb-3" style={{ animationDelay:'.2s' }}>
        <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-widest text-[#FF4D00]">
          {title}
        </h2>
        {/* Underline */}
        <svg className="mx-auto mt-2 mb-6" width="160" height="8" viewBox="0 0 140 8">
          <path d="M2,5 C25,2 70,7 138,4" stroke="#FF4D00" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* ── Description ── */}
      <p className="err-card-in text-[15px] font-bold text-[#5D3A1F]/70 leading-relaxed mb-8 max-w-md" style={{ animationDelay:'.25s' }}>
        {description}
      </p>

      {/* ── Logs de diagnóstico ── */}
      {logs && logs.length > 0 && (
        <div className="err-card-in w-full max-w-sm mx-auto text-left rounded-2xl overflow-hidden border border-[#5D3A1F]/15 bg-white/70 backdrop-blur-md shadow-lg mb-8" style={{ animationDelay:'.3s' }}>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a0800]">
            <i className={`fas ${icon} text-[#FF8C00] text-xs`} />
            <span className="text-[9px] font-black uppercase tracking-widest text-white/90">
              Diagnóstico del sistema
            </span>
            <span className="ml-auto flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
              <span className="w-2 h-2 rounded-full bg-[#FF8C00]" />
              <span className="w-2 h-2 rounded-full bg-[#5D3A1F]" />
            </span>
          </div>
          <div className="p-4 space-y-2 font-mono">
            {logs.map((log, i) => (
              <p key={i} className="err-log-row flex items-center gap-2 text-[10px] font-bold">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${log.type === 'error' ? 'bg-[#FF4D00]' : log.type === 'warn' ? 'bg-[#FF8C00]' : 'bg-[#8B4513]'}`} />
                <span className={log.type === 'error' ? 'text-[#CC3D00]' : log.type === 'warn' ? 'text-[#8B4513]' : 'text-[#5D3A1F]/70'}>
                  {log.text}
                </span>
              </p>
            ))}
          </div>
        </div>
      )}

      {/* ── Action button ── */}
      <div className="err-card-in" style={{ animationDelay:'.35s' }}>
        <Link
          to={action.to}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-heading font-black uppercase tracking-widest text-white text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #FF4D00 0%, #CC3D00 100%)',
            boxShadow: '0 6px 22px rgba(255,77,0,0.35)',
          }}
        >
          <i className={`fas ${action.icon || 'fa-house'} text-xs`} />
          {action.label}
          <i className="fas fa-arrow-right text-xs" />
        </Link>
      </div>

    </div>
  </div>
);

export default ErrorBase;
