import React, { useState } from 'react';

const DIAS = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const CalendarioModal = ({ isOpen, onClose }) => {
  const hoy = new Date();
  const [year, setYear] = useState(hoy.getFullYear());
  const [month, setMonth] = useState(hoy.getMonth());

  if (!isOpen) return null;

  const primerDia = new Date(year, month, 1).getDay();
  const diasEnMes = new Date(year, month + 1, 0).getDate();
  const celdas = [];
  for (let i = 0; i < primerDia; i++) celdas.push(null);
  for (let d = 1; d <= diasEnMes; d++) celdas.push(d);

  const navegar = (delta) => {
    let m = month + delta;
    let y = year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setMonth(m);
    setYear(y);
  };

  return (
    <div className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat" onClick={onClose}>
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-6 max-w-md w-full border border-slate-200/60 dark:border-white/5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 text-[#E95A0C] flex items-center justify-center"><i className="fas fa-calendar-days text-sm"></i></span>
            <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider">Calendario de Producción</h4>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#070710] text-slate-500 hover:text-red-500 flex items-center justify-center cursor-pointer"><i className="fas fa-times text-sm"></i></button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navegar(-1)} className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#070710] text-[#E95A0C] cursor-pointer"><i className="fas fa-chevron-left"></i></button>
          <p className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wide">{MESES[month]} {year}</p>
          <button onClick={() => navegar(1)} className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#070710] text-[#E95A0C] cursor-pointer"><i className="fas fa-chevron-right"></i></button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DIAS.map((d, i) => <span key={i} className="text-center text-[9px] font-black uppercase text-slate-400 py-1">{d}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {celdas.map((d, i) => {
            const esHoy = d === hoy.getDate() && month === hoy.getMonth() && year === hoy.getFullYear();
            return d ? (
              <span key={i} className={`text-center py-2 rounded-lg text-[11px] font-black cursor-default ${esHoy ? 'bg-gradient-to-r from-[#E95A0C] to-orange-700 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-orange-50'}`}>{d}</span>
            ) : <span key={i} />;
          })}
        </div>

        <p className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-bold text-center">
          <i className="fas fa-fire-burner text-[#E95A0C] mr-1"></i>Planifique las tandas de horneado del mes.
        </p>
      </div>
    </div>
  );
};

export default CalendarioModal;