import React, { useState } from 'react';
import { formatearBs } from '../constantes';
import DeleteModal from '../../components/mod/delete';

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold";

const FormModal = ({ zona, onClose, onSave }) => {
  const [form, setForm] = useState(zona || { nombre: '', tarifa: '', tiempo: '', descripcion: '', activo: true });
  const set = (c, v) => setForm(prev => ({ ...prev, [c]: v }));

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat">
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-6 max-w-md w-full border border-slate-200/60 dark:border-white/5 shadow-2xl">
        <h4 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2"><i className="fas fa-location-dot text-[#E95A0C]"></i>{zona ? 'Editar Zona' : 'Nueva Zona'}</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">NOMBRE *</label>
            <input value={form.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Zona 1 · Centro" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">TARIFA (Bs) *</label>
              <input type="number" step="0.01" min="0" value={form.tarifa} onChange={(e) => set('tarifa', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">TIEMPO</label>
              <input value={form.tiempo} onChange={(e) => set('tiempo', e.target.value)} placeholder="20–25 min" className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">DESCRIPCIÓN</label>
            <input value={form.descripcion} onChange={(e) => set('descripcion', e.target.value)} placeholder="Cobertura de la zona" className={inputCls} />
          </div>
          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/60 bg-slate-50 cursor-pointer">
            <input type="checkbox" checked={form.activo} onChange={(e) => set('activo', e.target.checked)} className="w-4 h-4 accent-[#E95A0C]" />
            <span className="text-xs font-black uppercase text-slate-600">Zona activa</span>
          </label>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-[#070710] text-slate-700 text-xs font-black uppercase tracking-wider cursor-pointer">Cancelar</button>
          <button onClick={() => onSave(form)} className="flex-1 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-md">Guardar</button>
        </div>
      </div>
    </div>
  );
};

const Zonas = ({ zonas, crearZona, editarZona, eliminarZona }) => {
  const [modal, setModal] = useState(null);
  const [aEliminar, setAEliminar] = useState(null);

  const guardar = async (form) => {
    const payload = { nombre: form.nombre, tarifa: form.tarifa, tiempo: form.tiempo, descripcion: form.descripcion, activo: form.activo };
    const res = modal?.id ? await editarZona(modal.id, payload) : await crearZona(payload);
    if (res && !res.ok && res.mensaje) alert(res.mensaje);
    setModal(null);
  };

  return (
    <div className="space-y-4 font-montserrat w-full">
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] overflow-visible relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 pb-4 border-b-2 border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-lg shrink-0"><i className="fas fa-location-dot"></i></div>
            <div>
              <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-tight">ZONAS DE REPARTO <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block"></span></h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest m-0 mt-0.5">{zonas.length} zonas tarifadas</p>
            </div>
          </div>
          <button onClick={() => setModal({})} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E95A0C] to-orange-700 text-white text-[10px] font-black uppercase tracking-wider shadow-md cursor-pointer flex items-center gap-2"><i className="fas fa-plus"></i>Nueva Zona</button>
        </div>

        {zonas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {zonas.map(z => (
              <div key={z.id} className="relative bg-white rounded-2xl border border-slate-200/60 shadow-md p-4 overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E95A0C] via-[#5D3A1F] to-[#E95A0C]"></div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 text-[#E95A0C] flex items-center justify-center text-base"><i className="fas fa-location-dot"></i></span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${z.activo ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-400'}`}>{z.activo ? 'Activa' : 'Inactiva'}</span>
                </div>
                <h4 className="text-[13px] font-black text-[#4A2E1B] dark:text-white leading-tight">{z.nombre}</h4>
                <p className="text-[9px] font-bold text-slate-400 mt-0.5">{z.descripcion || '—'}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <div>
                    <p className="text-lg font-black text-[#FF4D00]">{formatearBs(z.tarifa)}</p>
                    {z.tiempo && <p className="text-[9px] font-bold text-slate-400"><i className="fas fa-clock mr-1 text-[8px]"></i>{z.tiempo}</p>}
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => setModal(z)} className="w-7 h-7 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-600 text-[10px] cursor-pointer"><i className="fas fa-pen"></i></button>
                    <button onClick={() => setAEliminar(z)} className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 text-[10px] cursor-pointer"><i className="fas fa-trash-can"></i></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center font-bold text-slate-400"><i className="fas fa-location-dot text-3xl text-[#E95A0C] block mb-2 opacity-50"></i>Sin zonas registradas.</div>
        )}
      </div>

      {modal && <FormModal zona={modal?.id ? modal : null} onClose={() => setModal(null)} onSave={guardar} />}
      <DeleteModal isOpen={!!aEliminar} onClose={() => setAEliminar(null)} onConfirm={async () => { if (aEliminar) { const res = await eliminarZona(aEliminar.id); setAEliminar(null); if (res && res.mensaje) alert(res.mensaje); } }} title="¿Eliminar Zona?" message="Si la zona tiene pedidos asociados se desactivará." itemName={aEliminar?.nombre} itemIcon="fas fa-location-dot" />
    </div>
  );
};

export default Zonas;