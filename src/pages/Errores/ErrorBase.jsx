import React from 'react';
import { Link } from 'react-router-dom';
import FondoTech from '../../components/fondos/FondoTech';

/**
 * Componente base reutilizable para todas las páginas de error.
 * Mantiene la animación glitch en el número pero con los colores
 * y estilo del nuevo diseño de HagamosTech (verde y blanco).
 */
const ErrorBase = ({ code, title, description, logs, icon = 'fa-triangle-exclamation', action = { to: '/', label: 'Volver al inicio' } }) => (
  <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-28 pb-16 bg-[#050505] text-white">
    <style>{`
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
        color: #FFFFFF;
        animation: errGlitch1 2.4s infinite linear alternate-reverse;
      }
      .err-code::after {
        color: #A3E635;
        animation: errGlitch2 3.2s infinite linear alternate-reverse;
      }

      /* Log rows */
      .err-log-row { animation: errLogIn .35s ease-out both; }
      .err-log-row:nth-child(1) { animation-delay:.1s; }
      .err-log-row:nth-child(2) { animation-delay:.25s; }
      .err-log-row:nth-child(3) { animation-delay:.4s; }
    `}</style>

    {/* FONDO TECNOLÓGICO */}
    <FondoTech hideWaves={true} />

    {/* ════════ CONTENIDO ════════ */}
    <div className="relative z-10 flex flex-col items-center text-center max-w-[540px] w-full mx-auto text-white">

      {/* ── Live status badge ── */}
      <div className="err-card-in mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full"
        style={{
          background:'rgba(17,24,39,0.85)',
          backdropFilter:'blur(12px)',
          border:'1.5px solid rgba(163,230,53,0.3)',
          boxShadow:'0 4px 18px rgba(163,230,53,0.15)',
          animationDelay:'.05s'
        }}
      >
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-[#A3E635]" style={{ animation:'errPing 1.1s cubic-bezier(0,0,.2,1) infinite' }} />
          <span className="relative w-2 h-2 rounded-full bg-[#A3E635]" />
        </span>
        <i className={`fas ${icon} text-[#A3E635] text-[12px]`} />
        <span className="text-[11px] font-black uppercase tracking-widest text-white/95">
          ERROR DE ENTORNO
        </span>
      </div>

      {/* ── Glitch error number ── */}
      <div className="err-card-in mb-4 select-none" style={{ animationDelay:'.15s' }}>
        <h1
          className="err-code font-heading font-black leading-none"
          data-text={String(code)}
          style={{
            fontSize: 'clamp(8rem, 24vw, 12rem)',
            color: '#111111',
            WebkitTextStroke: '2px rgba(163,230,53,0.25)',
            textShadow: '3px 3px 0 rgba(163,230,53,0.18)',
            letterSpacing: '-0.02em',
          }}
        >
          {code}
        </h1>
      </div>

      {/* ── Error title ── */}
      <div className="err-card-in mb-3" style={{ animationDelay:'.2s' }}>
        <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-widest text-[#A3E635]">
          {title}
        </h2>
        {/* Underline */}
        <svg className="mx-auto mt-2 mb-6" width="160" height="8" viewBox="0 0 140 8">
          <path d="M2,5 C25,2 70,7 138,4" stroke="#A3E635" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* ── Description ── */}
      <p className="err-card-in text-[15px] font-bold text-slate-350 leading-relaxed mb-8 max-w-md" style={{ animationDelay:'.25s' }}>
        {description}
      </p>

      {/* ── Logs de diagnóstico ── */}
      {logs && logs.length > 0 && (
        <div className="err-card-in w-full max-w-sm mx-auto text-left rounded-2xl overflow-hidden border border-white/10 bg-[#111111]/90 backdrop-blur-md shadow-lg mb-8" style={{ animationDelay:'.3s' }}>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-black">
            <i className={`fas ${icon} text-[#A3E635] text-xs`} />
            <span className="text-[9px] font-black uppercase tracking-widest text-white/90">
              Diagnóstico del sistema
            </span>
            <span className="ml-auto flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A3E635]" />
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="w-2 h-2 rounded-full bg-neutral-700" />
            </span>
          </div>
          <div className="p-4 space-y-2 font-mono">
            {logs.map((log, i) => (
              <p key={i} className="err-log-row flex items-center gap-2 text-[10px] font-bold">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${log.type === 'error' ? 'bg-red-500' : log.type === 'warn' ? 'bg-[#A3E635]' : 'bg-neutral-600'}`} />
                <span className={log.type === 'error' ? 'text-red-400' : log.type === 'warn' ? 'text-[#A3E635]' : 'text-slate-400'}>
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
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-heading font-black uppercase tracking-widest text-[#0A0A0A] bg-[#A3E635] hover:bg-[#84CC16] text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#A3E635]/20 cursor-pointer"
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
