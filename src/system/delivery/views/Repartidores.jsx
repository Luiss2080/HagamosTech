import React, { useState } from 'react';
import DeleteModal from '../../components/mod/delete';

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold";

const FormModal = ({ repartidor, onClose, onSave }) => {
  const [form, setForm] = useState(repartidor || { nombre: '', telefono: '', vehiculo: '', disponible: true, activo: true });
  const set = (c, v) => setForm(prev => ({ ...prev, [c]: v }));

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat">
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-6 max-w-md w-full border border-slate-200/60 dark:border-white/5 shadow-2xl">
        <h4 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2"><i className="fas fa-motorcycle text-[#E95A0C]"></i>{repartidor ? 'Editar Repartidor' : 'Nuevo Repartidor'}</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">NOMBRE *</label>
            <input value={form.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Nombre del repartidor" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">TELÉFONO</label>
              <input value={form.telefono} onChange={(e) => set('telefono', e.target.value)} placeholder="Celular" className={inputCls} />
            </div>
            <div>
              <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">VEHÍCULO</label>
              <input value={form.vehiculo} onChange={(e) => set('vehiculo', e.target.value)} placeholder="Moto / Auto" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/60 bg-slate-50 cursor-pointer">
              <input type="checkbox" checked={form.disponible} onChange={(e) => set('disponible', e.target.checked)} className="w-4 h-4 accent-emerald-500" />
              <span className="text-xs font-black uppercase text-slate-600">Disponible</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/60 bg-slate-50 cursor-pointer">
              <input type="checkbox" checked={form.activo} onChange={(e) => set('activo', e.target.checked)} className="w-4 h-4 accent-[#E95A0C]" />
              <span className="text-xs font-black uppercase text-slate-600">Activo</span>
            </label>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-[#070710] text-slate-700 text-xs font-black uppercase tracking-wider cursor-pointer">Cancelar</button>
          <button onClick={() => onSave(form)} className="flex-1 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-md">Guardar</button>
        </div>
      </div>
    </div>
  );
};

const Repartidores = ({ repartidores, crearRepartidor, editarRepartidor, eliminarRepartidor }) => {
  const [modal, setModal] = useState(null);
  const [aEliminar, setAEliminar] = useState(null);

  const guardar = async (form) => {
    const payload = { nombre: form.nombre, telefono: form.telefono, vehiculo: form.vehiculo, disponible: form.disponible, activo: form.activo };
    const res = modal?.id ? await editarRepartidor(modal.id, payload) : await crearRepartidor(payload);
    if (res && !res.ok && res.mensaje) alert(res.mensaje);
    setModal(null);
  };

  return (
    <div className="space-y-4 font-montserrat w-full">
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] overflow-visible relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 pb-4 border-b-2 border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-lg shrink-0"><i className="fas fa-motorcycle"></i></div>
            <div>
              <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-tight">REPARTIDORES <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block"></span></h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest m-0 mt-0.5">{repartidores.length} repartidores</p>
            </div>
          </div>
          <button onClick={() => setModal({})} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E95A0C] to-orange-700 text-white text-[10px] font-black uppercase tracking-wider shadow-md cursor-pointer flex items-center gap-2"><i className="fas fa-plus"></i>Nuevo Repartidor</button>
        </div>

        {repartidores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {repartidores.map(r => (
              <div key={r.id} className="relative bg-white rounded-2xl border border-slate-200/60 shadow-md p-4 overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-sky-400 to-sky-500"></div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center text-base"><i className="fas fa-motorcycle"></i></span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${r.disponible ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-400'}`}>{r.disponible ? 'Disponible' : 'Ocupado'}</span>
                </div>
                <h4 className="text-[13px] font-black text-[#4A2E1B] dark:text-white leading-tight">{r.nombre}</h4>
                <div className="space-y-0.5 mt-1">
                  {r.telefono && <p className="text-[9px] font-bold text-slate-400"><i className="fas fa-phone mr-1 text-[8px] text-[#E95A0C]"></i>{r.telefono}</p>}
                  {r.vehiculo && <p className="text-[9px] font-bold text-slate-400"><i className="fas fa-car mr-1 text-[8px] text-[#E95A0C]"></i>{r.vehiculo}</p>}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <span className={`text-[9px] font-black uppercase ${r.activo ? 'text-emerald-600' : 'text-slate-400'}`}>{r.activo ? 'Activo' : 'Inactivo'}</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => setModal(r)} className="w-7 h-7 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-600 text-[10px] cursor-pointer"><i className="fas fa-pen"></i></button>
                    <button onClick={() => setAEliminar(r)} className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 text-[10px] cursor-pointer"><i className="fas fa-trash-can"></i></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center font-bold text-slate-400"><i className="fas fa-motorcycle text-3xl text-[#E95A0C] block mb-2 opacity-50"></i>Sin repartidores registrados.</div>
        )}
      </div>

      {modal && <FormModal repartidor={modal?.id ? modal : null} onClose={() => setModal(null)} onSave={guardar} />}
      <DeleteModal isOpen={!!aEliminar} onClose={() => setAEliminar(null)} onConfirm={async () => { if (aEliminar) { const res = await eliminarRepartidor(aEliminar.id); setAEliminar(null); if (res && res.mensaje) alert(res.mensaje); } }} title="¿Eliminar Repartidor?" message="Si el repartidor tiene pedidos asociados se desactivará." itemName={aEliminar?.nombre} itemIcon="fas fa-motorcycle" />
    </div>
  );
};

export default Repartidores;