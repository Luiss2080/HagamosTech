import React, { useState, useRef, useEffect } from 'react';

const DropdownSelect = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = options.find(o => o.value === value) || options[0];

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
                opt.value === value ? 'bg-[#8B4513] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}>
              {opt.icon && <i className={`${opt.icon} text-xs ${opt.value === value ? 'text-white' : 'text-[#E95A0C]'}`}></i>}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ClienteCreateView = ({
  clienteForm,
  setClienteForm,
  submitCliente,
  onBackToList,
  activeTab
}) => {
  const isColegio = activeTab === 'colegios';
  return (
    <div className="space-y-5 font-montserrat w-full">
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl  text-[#E95A0C] flex items-center justify-center text-xl font-black shadow-sm shrink-0 border border-orange-200/50 dark:dark:border-orange-900/50">
            <i className={isColegio ? "fas fa-school" : "fas fa-user-plus"}></i>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Sistema</span>
              <span>{'>'}</span>
              <span>{isColegio ? 'Colegios' : 'Clientes'}</span>
              <span>{'>'}</span>
              <span className="text-[#E95A0C]">Nuevo Registro</span>
            </div>
            <h2 className="text-xl font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">
              {isColegio ? 'Registrar Colegio' : 'Registrar Cliente'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">
              {isColegio ? 'Ingrese los datos generales para crear la ficha del colegio o institución.' : 'Ingrese los datos generales para crear la ficha comercial.'}
            </p>
          </div>
        </div>
 
        <button onClick={onBackToList}
          className="px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-red-900/30 border border-red-800/40 shrink-0">
          <i className="fas fa-arrow-left"></i>
          <span>Volver al listado</span>
        </button>
      </div>

      <form onSubmit={submitCliente} className="space-y-5">

        {/* SECCION 1: TIPO Y DOCUMENTO */}
        <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
            <i className="fas fa-id-card text-[#E95A0C] text-sm"></i>
            <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
              {'INFORMACION DE IDENTIFICACION Y TIPO DE PERSONA'}
            </h4>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-2">
                TIPO DE CLIENTE: <b className="text-red-500">*</b>
              </label>
              <div className="flex gap-3">
                <button type="button" onClick={() => setClienteForm(prev => ({ ...prev, tipoCliente: 'NATURAL' }))}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    clienteForm.tipoCliente === 'NATURAL' ? 'bg-[#E95A0C] text-white shadow-md shadow-orange-900/5 dark:shadow-none' : 'bg-slate-100 dark:bg-[#070710] text-slate-600 dark:text-slate-400 hover:text-[#E95A0C]'
                  }`}>
                  <i className="fas fa-user"></i>
                  <span>Persona Natural</span>
                </button>
                <button type="button" onClick={() => setClienteForm(prev => ({ ...prev, tipoCliente: 'JURIDICO' }))}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    clienteForm.tipoCliente === 'JURIDICO' ? 'bg-[#E95A0C] text-white shadow-md shadow-orange-900/5 dark:shadow-none' : 'bg-slate-100 dark:bg-[#070710] text-slate-600 dark:text-slate-400 hover:text-[#E95A0C]'
                  }`}>
                  <i className="fas fa-building"></i>
                  <span>{'Persona Juridica / Colegio'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                  {clienteForm.tipoCliente === 'JURIDICO' ? 'NIT / REGISTRO FISCAL:' : 'CODIGO / DOCUMENTO DE IDENTIDAD:'} <b className="text-red-500">*</b>
                </label>
                <input type="text" required
                  placeholder={clienteForm.tipoCliente === 'JURIDICO' ? 'Ej: 1023456789' : 'Ej: 7320474'}
                  value={clienteForm.documento}
                  onChange={(e) => setClienteForm(prev => ({ ...prev, documento: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                  COMPLEMENTO DE DOCUMENTO (OPCIONAL):
                </label>
                <input type="text" placeholder="Ej: 1B" value={clienteForm.complemento || ''}
                  onChange={(e) => setClienteForm(prev => ({ ...prev, complemento: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
              </div>
            </div>
          </div>
        </div>

        {/* SECCION 2: DATOS DE CONTACTO */}
        <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
            <i className="fas fa-user-gear text-[#E95A0C] text-sm"></i>
            <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
              {'INFORMACION GENERAL Y CONTACTO'}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                {clienteForm.tipoCliente === 'JURIDICO' ? 'RAZON SOCIAL / NOMBRE INSTITUCION:' : 'NOMBRE COMPLETO DEL CLIENTE:'} <b className="text-red-500">*</b>
              </label>
              <input type="text" required
                placeholder={clienteForm.tipoCliente === 'JURIDICO' ? 'Ej: Colegio San Jose S.R.L.' : 'Ej: Sofia Torrez Blanco'}
                value={clienteForm.nombre}
                onChange={(e) => setClienteForm(prev => ({ ...prev, nombre: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                {'CORREO ELECTRONICO:'} <b className="text-red-500">*</b>
              </label>
              <input type="email" required placeholder="cliente@ejemplo.com" value={clienteForm.correo}
                onChange={(e) => setClienteForm(prev => ({ ...prev, correo: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                {'TELEFONO / CELULAR:'} <b className="text-red-500">*</b>
              </label>
              <input type="text" required placeholder="Ej: 73204745" value={clienteForm.telefono}
                onChange={(e) => setClienteForm(prev => ({ ...prev, telefono: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                CIUDAD / DEPARTAMENTO:
              </label>
              <DropdownSelect value={clienteForm.ciudad || 'La Paz'}
                onChange={(val) => setClienteForm(prev => ({ ...prev, ciudad: val }))}
                options={[
                  { value: 'La Paz', label: 'La Paz', icon: 'fas fa-city' },
                  { value: 'Cochabamba', label: 'Cochabamba', icon: 'fas fa-city' },
                  { value: 'Santa Cruz', label: 'Santa Cruz', icon: 'fas fa-city' },
                  { value: 'Sucre', label: 'Sucre', icon: 'fas fa-city' },
                  { value: 'Tarija', label: 'Tarija', icon: 'fas fa-city' },
                  { value: 'Potosi', label: 'Potosi', icon: 'fas fa-city' },
                  { value: 'Oruro', label: 'Oruro', icon: 'fas fa-city' },
                  { value: 'Beni', label: 'Beni', icon: 'fas fa-city' },
                  { value: 'Pando', label: 'Pando', icon: 'fas fa-city' },
                ]} />
            </div>
          </div>
        </div>

        {/* SECCION 3: DIRECCION Y CATEGORIA */}
        <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
            <i className="fas fa-location-dot text-[#E95A0C] text-sm"></i>
            <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
              {'UBICACION Y CLASIFICACION COMERCIAL'}
            </h4>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                {'DIRECCION PRINCIPAL DE FACTURACION / ENTREGA:'} <b className="text-red-500">*</b>
              </label>
              <input type="text" required placeholder="Ej: Av. Arce #2080, Edificio Los Pinos Piso 4"
                value={clienteForm.direccion}
                onChange={(e) => setClienteForm(prev => ({ ...prev, direccion: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                  RUBRO / TIPO DE ACTIVIDAD:
                </label>
                <DropdownSelect value={clienteForm.rubro || 'Educacion'}
                  onChange={(val) => setClienteForm(prev => ({ ...prev, rubro: val }))}
                  options={[
                    { value: 'Educacion', label: 'Colegio / Institucion Educativa', icon: 'fas fa-school' },
                    { value: 'Universitario', label: 'Universitario / Academico', icon: 'fas fa-graduation-cap' },
                    { value: 'Particular', label: 'Particular / Estudiante', icon: 'fas fa-user' },
                    { value: 'Distribuidor', label: 'Distribuidor Comercial', icon: 'fas fa-truck' },
                  ]} />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                  ESTADO DE LA CUENTA:
                </label>
                <DropdownSelect value={clienteForm.estado || 'Activo'}
                  onChange={(val) => setClienteForm(prev => ({ ...prev, estado: val }))}
                  options={[
                    { value: 'Activo', label: 'Activo', icon: 'fas fa-circle-check' },
                    { value: 'En Observacion', label: 'En Observacion', icon: 'fas fa-circle-exclamation' },
                    { value: 'Inactivo', label: 'Inactivo', icon: 'fas fa-circle-xmark' },
                  ]} />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                {'NOTAS / OBSERVACIONES PARTICULARES:'}
              </label>
              <textarea rows="3" placeholder="Ingrese detalles especiales, horario de entrega o persona de contacto recomendada..."
                value={clienteForm.observaciones || ''}
                onChange={(e) => setClienteForm(prev => ({ ...prev, observaciones: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold"></textarea>
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
                <span>{isColegio ? 'Registrar Colegio' : 'Registrar Cliente'}</span>
              </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default ClienteCreateView;






















