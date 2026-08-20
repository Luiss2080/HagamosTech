import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CalendarioModal = ({ isOpen, onClose, userId }) => {
  const [eventos, setEventos] = useState([]);
  const [nuevoEvento, setNuevoEvento] = useState({ titulo: '', tipo: 'mantenimiento', fecha: new Date().toISOString().split('T')[0] });
  const [mesActual, setMesActual] = useState(new Date());

  useEffect(() => {
    if (isOpen && userId) {
      const data = localStorage.getItem(`loscatores_agenda_${userId}`);
      if (data) setEventos(JSON.parse(data));
    }
  }, [isOpen, userId]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`loscatores_agenda_${userId}`, JSON.stringify(eventos));
    }
  }, [eventos, userId]);

  if (!isOpen) return null;

  const diasMes = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0).getDate();
  const primerDiaMes = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1).getDay();

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!nuevoEvento.titulo.trim()) return;
    setEventos([...eventos, { ...nuevoEvento, id: Date.now() }]);
    setNuevoEvento({ ...nuevoEvento, titulo: '' });
  };

  const cambiarMes = (inc) => {
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + inc, 1));
  };

  const estilosTipo = {
    mantenimiento: { color: 'text-[#8B4513]', bg: 'bg-[#8B4513]/10', border: 'border-[#8B4513]/20', icon: 'fas fa-tools', label: 'Mant.' },
    produccion: { color: 'text-[#FF4D00]', bg: 'bg-[#FF4D00]/10', border: 'border-[#FF4D00]/20', icon: 'fas fa-bread-slice', label: 'Prod.' },
    especial: { color: 'text-[#5D3A1F]', bg: 'bg-[#5D3A1F]/10', border: 'border-[#5D3A1F]/20', icon: 'fas fa-star', label: 'Especial' },
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-[500] bg-[#FFF5EC] flex p-6 gap-6 overflow-hidden font-montserrat">
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF4D00]/5 rounded-full blur-[100px] -mr-[400px] -mt-[400px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#8B4513]/5 rounded-full blur-[80px] -ml-[300px] -mb-[300px] pointer-events-none z-0"></div>

      <div className="w-[380px] bg-white rounded-[32px] flex flex-col relative z-20 shadow-[0_10px_40px_rgba(139,69,19,0.08)] border-2 border-white overflow-hidden shrink-0">
        <div className="p-7 border-b border-gray-100 bg-[#FF4D00]">
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <i className="far fa-calendar-check"></i> Nueva Tarea
          </h2>
          <p className="text-white/80 text-sm font-bold mt-1">Registra eventos en tu agenda personal.</p>
        </div>
        
        <form onSubmit={handleAgregar} className="p-7 flex-1 overflow-y-auto space-y-5 custom-scrollbar">
          <div>
            <label className="text-[11px] font-black uppercase text-gray-500 mb-2 block tracking-widest">Título de la Tarea</label>
            <input type="text" value={nuevoEvento.titulo} onChange={e => setNuevoEvento({...nuevoEvento, titulo: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-[#8B4513] outline-none focus:border-[#FF4D00] focus:bg-white transition-all shadow-inner" placeholder="Ej. Limpieza general..." />
          </div>
          <div>
            <label className="text-[11px] font-black uppercase text-gray-500 mb-2 block tracking-widest">Fecha Programada</label>
            <input type="date" value={nuevoEvento.fecha} onChange={e => setNuevoEvento({...nuevoEvento, fecha: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-[#8B4513] outline-none focus:border-[#FF4D00] focus:bg-white transition-all shadow-inner" />
          </div>
          <div>
            <label className="text-[11px] font-black uppercase text-gray-500 mb-2 block tracking-widest">Categoría del Evento</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(estilosTipo).map(key => (
                <button type="button" key={key} onClick={() => setNuevoEvento({...nuevoEvento, tipo: key})} 
                  className={`py-3 flex flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${nuevoEvento.tipo === key ? 'border-[#FF4D00] bg-[#FF4D00] text-white shadow-md' : 'border-gray-200 text-gray-500 hover:border-[#FF4D00]/40'}`}>
                  <i className={`${estilosTipo[key].icon} text-base mb-0.5`}></i> {estilosTipo[key].label}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <button type="submit" className="w-full bg-[#FF4D00] hover:bg-[#E64500] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#FF4D00]/30 transition-all flex items-center justify-center gap-2">
              Guardar Tarea <i className="fas fa-save"></i>
            </button>
          </div>
        </form>

        <div className="p-6 border-t border-gray-100 bg-gray-50 mt-auto">
           <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
             <span className="text-xs font-bold text-gray-600"><i className="fas fa-list-ul mr-2 text-[#8B4513]"></i> Total Registrados</span>
             <span className="bg-[#8B4513] text-white px-2 py-0.5 rounded-lg text-xs font-black shadow-inner">{eventos.filter(e => e.fecha.startsWith(mesActual.toISOString().slice(0, 7))).length}</span>
           </div>
        </div>
      </div>

      <div className="flex-1 relative flex flex-col p-6 bg-white/70 backdrop-blur-xl rounded-[32px] shadow-[0_10px_40px_rgba(139,69,19,0.06)] border-2 border-white overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA0KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]">
        
        <div className="flex items-center justify-between mb-5 relative z-10 bg-white p-4 rounded-[20px] shadow-sm border border-white/50 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#FF4D00] text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border-2 border-white">
              <i className="far fa-calendar-alt"></i>
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#5D3A1F] capitalize tracking-tight">{mesActual.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</h2>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Planificador Mensual General</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-100">
            <button onClick={() => cambiarMes(-1)} className="w-10 h-10 rounded-full text-[#8B4513] hover:bg-white hover:shadow-sm hover:text-[#FF4D00] flex items-center justify-center transition-all text-lg"><i className="fas fa-chevron-left"></i></button>
            <button onClick={() => setMesActual(new Date())} className="px-5 h-10 rounded-full bg-[#FF4D00] text-white font-black text-xs uppercase tracking-widest shadow-md hover:bg-[#E64500] transition-colors">Mes Actual</button>
            <button onClick={() => cambiarMes(1)} className="w-10 h-10 rounded-full text-[#8B4513] hover:bg-white hover:shadow-sm hover:text-[#FF4D00] flex items-center justify-center transition-all text-lg"><i className="fas fa-chevron-right"></i></button>
            <div className="w-px h-6 bg-gray-200 mx-1"></div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white text-gray-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all shadow-sm"><i className="fas fa-times text-lg"></i></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-3 mb-3 relative z-10 shrink-0">
          {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map(dia => (
            <div key={dia} className="text-center text-[10px] font-black uppercase tracking-widest text-[#8B4513] bg-white/60 py-2.5 rounded-xl border border-white shadow-sm backdrop-blur-sm">{dia}</div>
          ))}
        </div>

        <div className="flex-1 relative z-10 overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 min-h-0">
          <div className="grid grid-cols-7 gap-3 pb-2">
            {Array.from({ length: primerDiaMes }).map((_, i) => <div key={`empty-${i}`} className="min-h-[100px] rounded-[20px] bg-white/30 border border-white/50 backdrop-blur-sm"></div>)}
            {Array.from({ length: diasMes }).map((_, i) => {
              const dia = i + 1;
              const fechaStr = `${mesActual.getFullYear()}-${String(mesActual.getMonth() + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
              const isToday = new Date().toISOString().split('T')[0] === fechaStr;
              const evs = eventos.filter(e => e.fecha === fechaStr);

              return (
                <div key={dia} className={`min-h-[100px] rounded-[20px] p-2.5 border-[3px] transition-all flex flex-col ${isToday ? 'border-[#FF4D00] bg-orange-50/90 shadow-md scale-[1.02] z-20' : 'border-white bg-white/80 hover:border-[#FF4D00]/40 shadow-sm hover:shadow-lg'} backdrop-blur-sm`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-black inline-flex w-7 h-7 items-center justify-center rounded-lg shadow-inner ${isToday ? 'bg-[#FF4D00] text-white' : 'bg-gray-50 text-[#5D3A1F] border border-gray-100'}`}>{dia}</span>
                    {evs.length > 0 && <span className="text-[9px] font-black text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">{evs.length} tareas</span>}
                  </div>
                  
                  <div className="space-y-1.5 flex-1">
                    {evs.map(ev => {
                      const st = estilosTipo[ev.tipo] || estilosTipo.mantenimiento;
                      return (
                        <div key={ev.id} className={`text-[9px] font-bold px-2 py-1.5 rounded-lg flex items-center gap-1.5 truncate border ${st.bg} ${st.color} ${st.border} shadow-sm group`}>
                          <i className={`${st.icon} opacity-80 text-xs`}></i>
                          <span className="truncate flex-1" title={ev.titulo}>{ev.titulo}</span>
                          <i className="fas fa-trash-alt cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:scale-110" onClick={(e) => { e.stopPropagation(); setEventos(eventos.filter(x => x.id !== ev.id)); }}></i>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarioModal;
