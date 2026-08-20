import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200/60 dark:border-white/5 shadow-xl dark:shadow-black/60 rounded-xl">
        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4 text-[10px] font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></span>
              <span className="text-slate-500 dark:text-slate-400 capitalize">{entry.name}</span>
            </div>
            <span className="text-[#4A2E1B] dark:text-white">
               {entry.value.toString().includes('%') ? entry.value : `Bs. ${entry.value}`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ReportCharts = ({ isGenerating, dataLine, dataBar, dataPie, dataTop }) => {
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl border border-slate-200/60 dark:border-white/5">
        <i className="fas fa-chart-pie text-3xl mb-3 animate-pulse text-[#E95A0C]"></i>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Generando métricas visuales...</span>
      </div>
    );
  }

  const COLORS = ['#E95A0C', '#0ea5e9', '#f59e0b', '#8b5cf6', '#10b981'];
  const maxTop = dataTop && dataTop.length ? Math.max(...dataTop.map(i => Number(i.value) || 0)) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* 1. Tendencia de Ventas */}
      <div className="lg:col-span-8 bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-md border border-slate-200/60 dark:border-white/5 overflow-hidden flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-md shadow-orange-900/5 dark:shadow-none"><i className="fas fa-chart-line"></i></div>
            <div>
              <h3 className="text-[11px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider">Crecimiento de Suscriptores</h3>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1"><i className="fas fa-arrow-trend-up text-[8px] text-[#E95A0C]merald-500"></i> Evolución en el periodo seleccionado</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 flex-1">
          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataLine} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 'bold' }} dy={5} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 'bold' }} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="ingresos" stroke="#E95A0C" strokeWidth={3} dot={{ r: 4, fill: '#E95A0C', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, fill: '#E95A0C', stroke: '#fff', strokeWidth: 2 }} name="Ingresos" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 2. Planes (Mensual/Anual) */}
      <div className="lg:col-span-4 bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-md border border-slate-200/60 dark:border-white/5 overflow-hidden flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-600 text-white flex items-center justify-center text-sm shadow-md shadow-cyan-500/30"><i className="fas fa-wallet"></i></div>
            <div>
              <h3 className="text-[11px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider">Planes (Mensual/Anual)</h3>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1"><i className="fas fa-percentage text-[8px] text-cyan-500"></i> Distribución de canales</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 flex-1 flex flex-col relative">
          <div className="w-full h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataPie} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none" cx="50%" cy="50%">
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {dataPie.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-50 dark:bg-[#070710] p-2 rounded-lg">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                <span className="text-[9px] font-black uppercase text-slate-700 dark:text-slate-300">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Comparativa General (Barras) */}
      <div className="lg:col-span-6 bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-md border border-slate-200/60 dark:border-white/5 overflow-hidden flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm shadow-md shadow-blue-500/30 dark:shadow-none"><i className="fas fa-chart-column"></i></div>
            <div>
              <h3 className="text-[11px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider">Estado de Suscripciones</h3>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1"><i className="fas fa-box text-[8px] text-blue-500"></i> Desglose de ingresos</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 flex-1">
          <div className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataBar} margin={{ top: 10, right: 0, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 'bold' }} dy={5} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 'bold' }} />
                <RechartsTooltip cursor={{fill: '#f8fafc'}} content={<CustomTooltip />} />
                <Bar dataKey="Productos" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="Suscripciones" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Top Suscriptores / Sucursales */}
      <div className="lg:col-span-6 bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-md border border-slate-200/60 dark:border-white/5 overflow-hidden flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/400 text-white flex items-center justify-center text-sm shadow-md shadow-amber-500/30"><i className="fas fa-trophy"></i></div>
            <div>
              <h3 className="text-[11px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider">Top Suscriptores</h3>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1"><i className="fas fa-star text-[8px] text-[#E95A0C]mber-500"></i> Mayor volumen de ventas</p>
            </div>
          </div>
        </div>
        <div className="px-5 py-5 flex-1 flex flex-col justify-center space-y-4">
          {dataTop.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 group">
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-black shrink-0 shadow-sm ${idx === 0 ? 'bg-amber-100 dark:bg-amber-950/40 text-[#E95A0C]mber-600 border border-amber-200' : 'bg-slate-100 dark:bg-[#070710] text-slate-500 dark:text-slate-400'}`}>
                {idx === 0 ? <i className="fas fa-crown"></i> : idx + 1}
              </span>
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 w-24 truncate shrink-0 uppercase">{item.name}</span>
              <div className="flex-1 h-2.5 bg-slate-100 dark:bg-[#070710] rounded-full overflow-hidden flex items-center relative">
                <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${maxTop ? (item.value / maxTop) * 100 : 0}%`, backgroundColor: idx === 0 ? '#E95A0C' : '#94a3b8' }}></div>
              </div>
              <span className="text-[9px] font-black text-[#4A2E1B] dark:text-white w-14 text-right shrink-0">Bs. {item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportCharts;






















