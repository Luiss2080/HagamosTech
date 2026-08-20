import React from 'react';

// Tarjeta KPI completa estilo Dashboard (número + tendencia + detalles).
const KpiCard = ({
  icon,
  number,
  title,
  trend,
  details = [],
  bubble = 'bg-[#E95A0C]',
  border = 'border-l-[#E95A0C]',
  onClick
}) => (
  <div
    onClick={onClick}
    className={`bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-lg shadow-orange-900/5 dark:shadow-black/60 hover:shadow-xl dark:shadow-black/60 border border-orange-200/50 border-l-4 ${border} overflow-hidden group transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} hover:-translate-y-1 relative`}
  >
    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#E95A0C]/10 to-transparent rounded-full blur-2xl pointer-events-none animate-pulse"></div>
    <div className="p-4 flex items-center justify-between relative z-10">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-11 h-11 rounded-xl ${bubble} text-white flex items-center justify-center text-base shadow-lg shadow-orange-900/5 dark:shadow-black/60 shadow-orange-500/20 dark:shadow-none group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0`}>
          <i className={icon}></i>
        </div>
        <div className="min-w-0">
          <h3 className="text-2xl font-black text-[#4A2E1B] dark:text-white leading-none">{number}</h3>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</span>
        </div>
      </div>
      {(trend || (details && details.length > 0)) && (
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-px h-10 bg-slate-200 dark:bg-white/10"></div>
          <div className="flex flex-col items-end gap-1">
            {trend && (
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1 ${trend.cls || 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50'}`}>
                <i className={`${trend.icon || 'fas fa-arrow-up'} text-[9px]`}></i>{trend.text}
              </span>
            )}
            {details.map((d, i) => (
              <span key={i} className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                <i className={`${d.icon} text-[8px] ${d.color || 'text-[#E95A0C]'}`}></i>{d.text}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default KpiCard;