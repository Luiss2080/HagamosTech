import React from 'react';

const ReportKPIs = ({ kpis, isGenerating }) => {
  if (isGenerating) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl h-[90px] border border-slate-200/60 dark:border-white/5 flex items-center justify-center">
            <i className="fas fa-circle-notch fa-spin text-slate-300 text-xl"></i>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-md hover:shadow-xl dark:shadow-black/60 hover:shadow-emerald-500/15 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-emerald-500 overflow-hidden group transition-all duration-300 relative cursor-pointer hover:-translate-y-1">
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-50 dark:bg-emerald-950/400/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="p-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/400 text-white flex items-center justify-center text-base shadow-md shadow-emerald-500/20 dark:shadow-none group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"><i className="fas fa-dollar-sign"></i></div>
            <div>
              <h3 className="text-[#E95A0C]xl font-black text-[#4A2E1B] dark:text-white leading-none">Bs. {kpis?.totalIngresos?.toLocaleString() || '0'}</h3>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ingresos Totales</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-md hover:shadow-xl dark:shadow-black/60 hover:shadow-blue-500/15 dark:shadow-none border border-slate-200/60 dark:border-white/5 border-l-4 border-l-blue-600 overflow-hidden group transition-all duration-300 relative cursor-pointer hover:-translate-y-1">
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-50 dark:bg-blue-950/400/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="p-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center text-base shadow-md shadow-blue-500/20 dark:shadow-none group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"><i className="fas fa-shopping-cart"></i></div>
            <div>
              <h3 className="text-[#E95A0C]xl font-black text-[#4A2E1B] dark:text-white leading-none">{kpis?.ventasConcretadas || '0'}</h3>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ventas Exitosas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-md hover:shadow-xl dark:shadow-black/60 hover:shadow-amber-500/15 dark:shadow-none border border-slate-200/60 dark:border-white/5 border-l-4 border-l-amber-500 overflow-hidden group transition-all duration-300 relative cursor-pointer hover:-translate-y-1">
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-50 dark:bg-amber-950/400/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="p-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/400 text-white flex items-center justify-center text-base shadow-md shadow-amber-500/20 dark:shadow-none group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"><i className="fas fa-receipt"></i></div>
            <div>
              <h3 className="text-[#E95A0C]xl font-black text-[#4A2E1B] dark:text-white leading-none">Bs. {kpis?.ticketPromedio || '0'}</h3>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ticket Promedio</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-md hover:shadow-xl dark:shadow-black/60 hover:shadow-purple-500/15 dark:shadow-none border border-slate-200/60 dark:border-white/5 border-l-4 border-l-purple-600 overflow-hidden group transition-all duration-300 relative cursor-pointer hover:-translate-y-1">
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-50 dark:bg-purple-950/400/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="p-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center text-base shadow-md shadow-purple-500/20 dark:shadow-none group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"><i className="fas fa-boxes-stacked"></i></div>
            <div>
              <h3 className="text-[#E95A0C]xl font-black text-[#4A2E1B] dark:text-white leading-none">{kpis?.productosVendidos || '0'}</h3>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ítems Vendidos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportKPIs;






















