import React, { useState, useRef, useEffect } from 'react';

const DropdownSelect = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = options.find(o => String(o.value) === String(value)) || options[0];

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs font-bold flex items-center justify-between gap-2 focus:ring-2 focus:ring-[#E95A0C]/40 outline-none cursor-pointer transition-all hover:border-[#E95A0C]/40">
        {selected.icon && <i className={`${selected.icon} text-[#E95A0C] text-xs`}></i>}
        <span className="flex-1 text-left">{selected.label}</span>
        <i className={`fas fa-chevron-down text-[9px] text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>
      {open && (
        <div className="absolute z-[100] mt-1 w-full min-w-[180px] rounded-xl border border-slate-200/60 dark:border-white/5 bg-white shadow-2xl dark:shadow-black/80 overflow-hidden">
          {options.map(opt => (
            <button key={opt.value} type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full px-4 py-2.5 text-xs font-bold flex items-center gap-2 text-left transition-all cursor-pointer ${
                String(opt.value) === String(value) ? 'bg-[#8B4513] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
               }`}>
              {opt.icon && <i className={`${opt.icon} text-xs ${String(opt.value) === String(value) ? 'text-white' : 'text-[#E95A0C]'}`}></i>}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const UsuarioEditView = ({
  usuarioForm,
  setUsuarioForm,
  submitUsuario,
  onBackToList,
  roles
}) => {
  const roleOptions = roles.map(r => ({
    value: String(r.id),
    label: r.nombre.toUpperCase(),
    icon: r.id === 1 ? 'fas fa-user-shield' : 'fas fa-user-gear'
  }));

  return (
    <div className="space-y-5 font-montserrat w-full">
      {/* CABECERA */}
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-[#E95A0C]mber-600 flex items-center justify-center text-xl font-black shadow-sm shrink-0 border border-amber-250">
            <i className="fas fa-user-pen"></i>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Sistema</span>
              <span>{'>'}</span>
              <span>Usuarios</span>
              <span>{'>'}</span>
              <span className="text-[#E95A0C]">Editar Ficha</span>
            </div>
            <h2 className="text-xl font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">
              Editar Cuenta: {usuarioForm.nombre} {usuarioForm.apellido}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">
              Modifique los accesos, contraseñas y datos del perfil para este usuario del sistema.
            </p>
          </div>
        </div>
 
        <button onClick={onBackToList}
          className="px-5 py-2.5 rounded-xl bg-[#8B4513] hover:bg-[#8B4513] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md border border-slate-700 shrink-0">
          <i className="fas fa-arrow-left"></i>
          <span>Volver al listado</span>
        </button>
      </div>

      <form onSubmit={submitUsuario} className="space-y-5">
        
        {/* SECCION 1: CREDENCIALES */}
        <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
            <i className="fas fa-key text-[#E95A0C] text-sm"></i>
            <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
              CREDENCIALES DE ACCESO AL SISTEMA
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">NOMBRE DE USUARIO (USERNAME) <b className="text-red-500">*</b></label>
              <div className="relative">
                <i className="fas fa-at absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input type="text" placeholder="Ej. adriel.lino" required value={usuarioForm.usuario}
                  onChange={(e) => setUsuarioForm(prev => ({ ...prev, usuario: e.target.value }))}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">CORREO ELECTRÓNICO <b className="text-red-500">*</b></label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input type="email" placeholder="Ej. correo@dominio.com" required value={usuarioForm.correo}
                  onChange={(e) => setUsuarioForm(prev => ({ ...prev, correo: e.target.value }))}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-850 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">CAMBIAR CONTRASEÑA (DEJAR EN BLANCO PARA NO MODIFICAR)</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input type="password" placeholder="Nueva contraseña" value={usuarioForm.contrasena}
                  onChange={(e) => setUsuarioForm(prev => ({ ...prev, contrasena: e.target.value }))}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">ROL ASIGNADO <b className="text-red-550">*</b></label>
              <DropdownSelect value={usuarioForm.rolId} onChange={(val) => setUsuarioForm(prev => ({ ...prev, rolId: val }))} options={roleOptions} />
            </div>
          </div>
        </div>

        {/* SECCION 2: DATOS PERSONALES */}
        <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
            <i className="fas fa-address-card text-[#E95A0C] text-sm"></i>
            <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
              DATOS DE IDENTIDAD PERSONAL
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">NOMBRES <b className="text-red-500">*</b></label>
              <div className="relative">
                <i className="fas fa-font absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input type="text" placeholder="Ej. Adriel Alessandro" required value={usuarioForm.nombre}
                  onChange={(e) => setUsuarioForm(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold uppercase" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">APELLIDOS <b className="text-red-500">*</b></label>
              <div className="relative">
                <i className="fas fa-font absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input type="text" placeholder="Ej. Lino Mendoza" required value={usuarioForm.apellido}
                  onChange={(e) => setUsuarioForm(prev => ({ ...prev, apellido: e.target.value }))}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold uppercase" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">NÚMERO C.I. (CÉDULA DE IDENTIDAD)</label>
              <div className="relative">
                <i className="fas fa-id-card absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input type="text" placeholder="Ej. 15354012" value={usuarioForm.numci}
                  onChange={(e) => setUsuarioForm(prev => ({ ...prev, numci: e.target.value }))}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">FECHA DE NACIMIENTO</label>
              <div className="relative">
                <i className="fas fa-calendar absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input type="date" value={usuarioForm.fenac}
                  onChange={(e) => setUsuarioForm(prev => ({ ...prev, fenac: e.target.value }))}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
              </div>
            </div>
          </div>
        </div>

        {/* SECCION 3: CONTACTO Y AFILIACIÓN */}
        <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
            <i className="fas fa-phone text-[#E95A0C] text-sm"></i>
            <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
              DATOS DE CONTACTO Y VÍNCULO INSTITUCIONAL
            </h4>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">NÚMERO TELEFÓNICO / CELULAR</label>
                <div className="relative">
                  <i className="fas fa-mobile-screen-button absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                  <input type="text" placeholder="Ej. 69258622" value={usuarioForm.numtel}
                    onChange={(e) => setUsuarioForm(prev => ({ ...prev, numtel: e.target.value }))}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">COLEGIO / INSTITUCIÓN ASOCIADA</label>
                <div className="relative">
                  <i className="fas fa-school absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                  <input type="text" placeholder="Ej. Colegio San Agustín" value={usuarioForm.nomcol}
                    onChange={(e) => setUsuarioForm(prev => ({ ...prev, nomcol: e.target.value }))}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold uppercase" />
                </div>
              </div>
            </div>

            {/* BOTONES ACCION + DETALLE VISUAL */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <i className="fas fa-shield-halved text-[#E95A0C] text-xs"></i>
                <span>Los campos con <b className="text-[#E95A0C]">*</b> son obligatorios</span>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={onBackToList}
                  className="px-6 py-3 rounded-xl bg-[#8B4513] hover:bg-slate-900 dark:hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm border border-slate-700 flex items-center gap-2 justify-center">
                  <i className="fas fa-times"></i> Cancelar
                </button>
                <button type="submit"
                  className="px-8 py-3 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg dark:shadow-black/60 shadow-orange-900/5 dark:shadow-none flex items-center gap-2 hover:scale-105">
                  <i className="fas fa-check"></i>
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UsuarioEditView;






















