import React, { useState, useEffect } from 'react';
import { BreadcrumbHeader } from '../components/layouts/Sidebar';
import Pagination from '../components/Pagination';
import apiClient from '../../servicios/clienteApi';
const showAlert = () => {};

const Mensajes = () => {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [buscar, setBuscar] = useState('');
  const [detalleMensaje, setDetalleMensaje] = useState(null);
  const itemsPerPage = 8;

  const cargarMensajes = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get('/contacto');
      setMensajes(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      showAlert({ title: 'Error', message: 'No se pudieron cargar los mensajes', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMensajes();
  }, []);

  const filtrados = buscar
    ? mensajes.filter(m => m.nombre?.toLowerCase().includes(buscar.toLowerCase()) || m.correo?.toLowerCase().includes(buscar.toLowerCase()) || m.mensaje?.toLowerCase().includes(buscar.toLowerCase()))
    : mensajes;

  const totalPages = Math.ceil(filtrados.length / itemsPerPage) || 1;
  const paginados = filtrados.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-4 font-montserrat w-full">
      <BreadcrumbHeader
        icon="fas fa-envelope"
        breadcrumbs={['Sistema', 'Ajustes', 'Mensajes']}
        title="Bandeja de Mensajes"
        subtitle="Consulte los mensajes y consultas enviadas desde el formulario de contacto del sitio."
      />

      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input
              type="text"
              placeholder="Buscar por nombre, correo o mensaje..."
              value={buscar}
              onChange={(e) => { setBuscar(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold"
            />
          </div>
          <button onClick={cargarMensajes} className="px-4 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider cursor-pointer">
            <i className="fas fa-arrows-rotate"></i>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100 dark:border-white/5 dark:border-white/5 text-[#E95A0C] uppercase text-[9px] font-black tracking-widest                 <th className="py-3.5 px-4">Remitente</th>
                <th className="py-3.5 px-4">Correo</th>
                <th className="py-3.5 px-4">Mensaje</th>
                <th className="py-3.5 px-4">Fecha</th>
                <th className="py-3.5 px-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {paginados.length > 0 ? (
                paginados.map((m, idx) => (
                  <tr key={idx} className="hover: dark:hover:bg-red-950/20">
                    <td className="py-3.5 px-4 font-extrabold text-[#4A2E1B] dark:text-white">{m.nombre || 'Anónimo'}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 dark:text-slate-400">{m.correo || 'N/A'}</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 max-w-[250px] truncate">{m.mensaje || ''}</td>
                    <td className="py-3.5 px-4 text-slate-400 text-[10px]">{m.fecha ? new Date(m.fecha).toLocaleDateString() : 'N/A'}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setDetalleMensaje(m)}
                        className="px-3 py-1.5 rounded-xl bg-[#E95A0C] hover:bg-red-700 text-white text-[9px] font-black uppercase cursor-pointer"
                      >
                        <i className="fas fa-eye"></i> Ver
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="py-8 text-center text-slate-400 font-bold">No hay mensajes registrados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filtrados.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        itemLabel="mensajes"
      />

      {detalleMensaje && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat">
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 max-w-md w-full border border-slate-200/60 dark:border-white/5 shadow-2xl dark:shadow-black/80">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <h4 className="text-xs font-black text-slate-850 uppercase">Detalle del Mensaje</h4>
              <button onClick={() => setDetalleMensaje(null)} className="text-slate-400 hover:text-slate-600 dark:text-slate-400 font-black cursor-pointer">&times;</button>
            </div>
            <div className="space-y-3">
              <div><span className="text-[9px] font-black uppercase text-[#E95A0C] block">Remitente</span><span className="text-xs font-bold text-slate-800 dark:text-slate-200">{detalleMensaje.nombre || 'Anónimo'}</span></div>
              <div><span className="text-[9px] font-black uppercase text-[#E95A0C] block">Correo</span><span className="text-xs font-bold text-slate-800 dark:text-slate-200">{detalleMensaje.correo || 'N/A'}</span></div>
              <div><span className="text-[9px] font-black uppercase text-[#E95A0C] block">Teléfono</span><span className="text-xs font-bold text-slate-800 dark:text-slate-200">{detalleMensaje.telefono || 'N/A'}</span></div>
              <div><span className="text-[9px] font-black uppercase text-[#E95A0C] block">Mensaje</span><p className="text-xs text-slate-600 dark:text-slate-400 mt-1 p-3 bg-slate-50 dark:bg-[#070710] rounded-xl">{detalleMensaje.mensaje}</p></div>
            </div>
            <button
              onClick={() => setDetalleMensaje(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-[#070710] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-black text-xs uppercase cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mensajes;






















