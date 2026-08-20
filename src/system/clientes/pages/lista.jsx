import React, { useState, useRef, useEffect, useMemo } from 'react';

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
    <div className="relative w-full" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-white dark:bg-[#040408] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs font-bold flex items-center justify-between gap-2 focus:ring-2 focus:ring-[#E95A0C]/40 outline-none cursor-pointer transition-all hover:border-[#E95A0C]/40">
        {selected.icon && <i className={`${selected.icon} text-[#E95A0C] text-xs`}></i>}
        <span className="flex-1 text-left">{selected.label}</span>
        <i className={`fas fa-chevron-down text-[9px] text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>
      {open && (
        <div className="absolute z-[100] mt-1 w-full min-w-[180px] rounded-xl border border-slate-200/60 dark:border-white/5 bg-white shadow-2xl dark:shadow-black/80 overflow-hidden">
          {options.map(opt => (
            <button key={opt.value} type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full px-3.5 py-2.5 text-xs font-bold flex items-center gap-2 text-left transition-all cursor-pointer ${
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

const ClientesLista = ({
  clientesFiltrados, paginatedClients,
  onViewDetail, onEdit, onDelete,
  buscarCliente, setBuscarCliente,
  searchCriterion, setSearchCriterion,
  sortPreset, setSortPreset,
  sortDirection, setSortDirection,
  onSearch, onNavigateToJuridico,
  isColegiosTab, onNavigateToNatural
}) => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [showSmartResults, setShowSmartResults] = useState(false);
  const searchContainerRef = useRef(null);

  const criterioOptions = [
    { value: 'general', label: 'Vista General', icon: 'fas fa-border-all' },
    { value: 'nombre', label: 'Nombre o Razón Social', icon: 'fas fa-font' },
    { value: 'documento', label: 'Documento', icon: 'fas fa-id-card' },
  ];

  const sortOptions = [
    { value: 'recientes', label: 'Fecha Registro', icon: 'fas fa-calendar' },
    { value: 'antiguos', label: 'Nombre A-Z', icon: 'fas fa-sort-alpha-down' },
  ];

  const directionOptions = [
    { value: 'desc', label: 'Descendente', icon: 'fas fa-arrow-down-z-a' },
    { value: 'asc', label: 'Ascendente', icon: 'fas fa-arrow-down-a-z' },
  ];

  // Cerrar buscador inteligente al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSmartResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Obtener primeros 5 resultados inteligentes
  const smartResults = useMemo(() => {
    return clientesFiltrados.slice(0, 5);
  }, [clientesFiltrados]);

  const handleSelectSmartItem = (item) => {
    setBuscarCliente(item.nombre);
    setShowSmartResults(false);
    if (onSearch) onSearch();
  };

  return (
    <div className="space-y-4 font-montserrat w-full">
      {/* PANEL DE FILTRADO Y BÚSQUEDA GLOBAL */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] overflow-visible relative z-25">
        <div className="bg-gradient-to-r from-orange-50/80 to-transparent dark:from-[#E95A0C]/10 dark:to-transparent p-4 rounded-xl border border-orange-200/50 dark:border-[#E95A0C]/20 mb-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-md shadow-orange-900/5 dark:shadow-none shrink-0">
            <i className="fas fa-search"></i>
          </div>
          <div>
            <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">CONSULTA Y LISTADO</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest leading-normal m-0 mt-0.5">
              Búsqueda avanzada de clientes por múltiples campos con paginación integrada.
            </p>
          </div>
        </div>
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none !important;
          }
          .no-scrollbar {
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
        `}</style>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          {/* BUSCADOR INTELIGENTE */}
          <div className="sm:col-span-5 space-y-1 relative" ref={searchContainerRef}>
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">BUSCAR CLIENTE</label>
            <div className="relative">
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input type="text" placeholder="Buscar cliente de forma inteligente..." value={buscarCliente}
                onFocus={() => setShowSmartResults(true)}
                onChange={(e) => { setBuscarCliente(e.target.value); setShowSmartResults(true); }}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
            </div>

            {/* Lista Desplegable Inteligente - Con el mismo estilo moderno de DropdownSelect */}
            {showSmartResults && (
              <div className="absolute z-[100] mt-1 w-full rounded-xl border border-slate-200/60 dark:border-white/5 bg-white shadow-2xl dark:shadow-black/80 overflow-hidden max-h-60 overflow-y-auto">
                <div className="bg-[#E95A0C] text-white px-3.5 py-2 border-b border-orange-800/50 dark:border-white/10 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <i className="fas fa-list-ul text-[9px]"></i>
                  <span>Resultados sugeridos</span>
                </div>
                {smartResults.length > 0 ? (
                  smartResults.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onMouseDown={() => handleSelectSmartItem(item)}
                      className="w-full px-3.5 py-2.5 text-xs font-bold flex items-center justify-between text-left transition-all cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-b border-slate-100/50 last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <i className={isColegiosTab ? "fas fa-school text-[#E95A0C] text-[10px]" : "fas fa-user text-[#E95A0C] text-[10px]"}></i>
                        <span className="truncate uppercase">{item.nombre}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#E95A0C]  border border-orange-500/20 dark:border-orange-500/10 px-2 py-0.5 rounded-lg shrink-0">
                        {item.codigo}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-3.5 py-2.5 text-xs font-bold text-slate-400 text-center">
                    No se encontraron coincidencias
                  </div>
                )}
              </div>
            )}
          </div>

          {/* FILTROS EN PANTALLA */}
          <div className="sm:col-span-3 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">CRITERIO</label>
            <DropdownSelect value={searchCriterion} onChange={setSearchCriterion} options={criterioOptions} />
          </div>

          <div className="sm:col-span-3 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">ORDENAR POR</label>
            <DropdownSelect value={sortPreset} onChange={setSortPreset} options={sortOptions} />
          </div>

          {/* BOTÓN FILTROS */}
          <div className="sm:col-span-1">
            <button onClick={() => setIsFiltersModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#8B4513] text-white flex items-center justify-center text-sm shadow-md shadow-orange-900/5 dark:shadow-none transition-all cursor-pointer border-0 h-[40px] hover:scale-105"
              title="Ajustar Filtros"><i className="fas fa-filter"></i></button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
          <span className="text-[10px] font-black uppercase text-[#E95A0C] mr-2">TIPO DE CLIENTE:</span>
          {isColegiosTab ? (
            <>
              <button onClick={onNavigateToNatural}
                className="px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer bg-slate-100 dark:bg-[#070710] text-slate-600 dark:text-slate-400 hover:text-[#E95A0C] flex items-center gap-2 border border-slate-200/60 dark:border-white/5">
                CLIENTE NATURAL <i className="fas fa-external-link-alt text-[9px]"></i>
              </button>
              <span className="px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#E95A0C] text-white shadow-md shadow-orange-900/5 dark:shadow-none">CLIENTE JURÍDICO / COLEGIO</span>
            </>
          ) : (
            <>
              <span className="px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#E95A0C] text-white shadow-md shadow-orange-900/5 dark:shadow-none">CLIENTE NATURAL</span>
              <button onClick={onNavigateToJuridico}
                className="px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer bg-slate-100 dark:bg-[#070710] text-slate-600 dark:text-slate-400 hover:text-[#E95A0C] flex items-center gap-2 border border-slate-200/60 dark:border-white/5">
                CLIENTE JURÍDICO <i className="fas fa-external-link-alt text-[9px]"></i>
              </button>
            </>
          )}
        </div>
      </div>

      {/* TABLA PRINCIPAL */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] overflow-visible relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 pb-4 border-b-2 border-slate-100 dark:border-white/5 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-lg dark:shadow-black/60 shadow-orange-900/5 dark:shadow-none shrink-0">
              <i className="fas fa-table-list"></i>
            </div>
            <div>
              <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-tight flex items-center gap-2">
                {isColegiosTab ? "LISTADO DE COLEGIOS / JURÍDICOS" : "LISTADO DE CLIENTES NATURALES"}
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              </h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest m-0 mt-0.5">
                <i className="fas fa-chevron-right text-[6px] text-[#E95A0C] mr-1"></i>
                Resultados de la consulta activa
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className=" text-[#E95A0C] border border-orange-200/50 dark:dark:border-orange-900/50 text-[10px] px-4 py-1.5 rounded-xl font-black uppercase shadow-sm flex items-center gap-2">
              <i className="fas fa-users text-[10px]"></i>
              <span className="text-xs">{clientesFiltrados.length}</span>
              {isColegiosTab ? "COLEGIOS REGISTRADOS" : "CLIENTES REGISTRADOS"}
            </span>
          </div>
        </div>

        <div className="w-full overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100 dark:border-white/5 dark:border-white/5 text-[#E95A0C] uppercase text-[9px] font-black tracking-widest">
                <th className="py-3.5 px-4 whitespace-nowrap"><i className="fas fa-user text-[#E95A0C] mr-1.5"></i>CLIENTE</th>
                <th className="py-3.5 px-4 whitespace-nowrap"><i className="fas fa-id-card text-[#E95A0C] mr-1.5"></i>DOCUMENTO</th>
                <th className="py-3.5 px-4 whitespace-nowrap"><i className="fas fa-phone text-[#E95A0C] mr-1.5"></i>TELÉFONO</th>
                <th className="py-3.5 px-4 whitespace-nowrap"><i className="fas fa-location-dot text-[#E95A0C] mr-1.5"></i>DIRECCIÓN</th>
                <th className="py-3.5 px-4 text-center w-28 whitespace-nowrap"><i className="fas fa-calendar text-[#E95A0C] mr-1.5"></i>REGISTRO</th>
                <th className="py-3.5 px-4 text-center w-24 whitespace-nowrap"><i className="fas fa-bolt text-[#E95A0C] mr-1.5"></i>ESTADO</th>
                <th className="py-3.5 px-4 text-center w-36 whitespace-nowrap"><i className="fas fa-sliders text-[#E95A0C] mr-1.5"></i>ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {paginatedClients.length > 0 ? (
                paginatedClients.map((c, idx) => (
                  <tr key={idx} className="hover: dark:hover:bg-red-950/20 transition-colors" style={{ transitionDelay: `${idx * 60}ms` }}>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl  text-[#E95A0C] flex items-center justify-center text-sm shrink-0 border border-orange-500/20 dark:border-orange-500/10 shadow-sm">
                          <i className={isColegiosTab ? "fas fa-school" : "fas fa-user-large"}></i>
                        </div>
                        <div>
                          <span className="font-extrabold text-[#4A2E1B] dark:text-white text-xs block leading-tight">{c.nombre}</span>
                          <span className="text-[10px] text-[#E95A0C] font-mono font-bold block mt-0.5">{c.parsed?.correo || ''}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200 text-xs font-mono">{c.parsed?.documento || ''}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300 text-xs">{c.parsed?.telefono || ''}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-slate-600 dark:text-slate-400 text-xs block truncate max-w-[160px] font-medium">{c.parsed?.direccion || ''}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-[10px] font-bold text-slate-400">
                      {c.created_at ? new Date(c.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {(() => {
                        const estado = (c.parsed && c.parsed.estado) || 'Activo';
                        if (estado === 'Inactivo') {
                          return (
                            <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-700 text-[9px] font-black uppercase inline-flex items-center gap-1.5 shadow-sm">
                              <i className="fas fa-circle-xmark text-[8px]"></i> INACTIVO
                            </span>
                          );
                        }
                        if (estado === 'En Observacion') {
                          return (
                            <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-[#E95A0C]mber-700 text-[9px] font-black uppercase inline-flex items-center gap-1.5 shadow-sm">
                              <i className="fas fa-clock text-[8px]"></i> EN OBSERVACIÓN
                            </span>
                          );
                        }
                        return (
                          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-[#E95A0C]merald-800 text-[9px] font-black uppercase inline-flex items-center gap-1.5 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> ACTIVO
                          </span>
                        );
                      })()}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => onViewDetail(c)}
                          className="group relative w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white flex items-center justify-center text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer border-0 hover:scale-110 hover:shadow-lg dark:shadow-black/60 hover:shadow-sky-500/30 active:scale-95"
                          title="Ver Ficha">
                          <i className="fas fa-file-invoice"></i>
                          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-[#8B4513] text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg dark:shadow-black/60 pointer-events-none z-10">Ver Ficha</span>
                        </button>
                        <button onClick={() => onEdit(c)}
                          className="group relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white flex items-center justify-center text-xs shadow-md shadow-amber-500/20 dark:shadow-none transition-all cursor-pointer border-0 hover:scale-110 hover:shadow-lg dark:shadow-black/60 hover:shadow-amber-500/30 active:scale-95"
                          title="Editar">
                          <i className="fas fa-pen"></i>
                          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-[#8B4513] text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg dark:shadow-black/60 pointer-events-none z-10">Editar</span>
                        </button>
                        <button onClick={() => onDelete(c)}
                          className="group relative w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white flex items-center justify-center text-xs shadow-md shadow-rose-500/20 transition-all cursor-pointer border-0 hover:scale-110 hover:shadow-lg dark:shadow-black/60 hover:shadow-rose-500/30 active:scale-95"
                          title="Dar de Baja">
                          <i className="fas fa-trash-can"></i>
                          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-[#8B4513] text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg dark:shadow-black/60 pointer-events-none z-10">Eliminar</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-450 font-bold">
                    <i className="fas fa-user-slash text-3xl text-[#E95A0C] block mb-2 opacity-50"></i>
                    Aún no hay clientes registrados bajo esta categoría.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE FILTROS (ESTILO MODAL DE ERROR/SUCCESS/DELETE) */}
      {isFiltersModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat">
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 max-w-sm w-full border border-slate-200/60 dark:border-white/5 shadow-2xl dark:shadow-black/80 relative animate-fade-in">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider flex items-center gap-2 m-0">
                <i className="fas fa-filter text-[#E95A0C]"></i> AJUSTAR FILTROS
              </h4>
              <button onClick={() => setIsFiltersModalOpen(false)} className="text-slate-400 hover:text-slate-655 font-black cursor-pointer border-0 bg-transparent text-sm">✕</button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">Criterio de Búsqueda</label>
                <DropdownSelect value={searchCriterion} onChange={setSearchCriterion} options={criterioOptions} />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">Ordenar Por</label>
                <DropdownSelect value={sortPreset} onChange={setSortPreset} options={sortOptions} />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">Dirección de Orden</label>
                <DropdownSelect value={sortDirection} onChange={setSortDirection} options={directionOptions} />
              </div>
            </div>

            <div className="flex items-center gap-2.5 mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setSearchCriterion('general');
                  setSortPreset('recientes');
                  setSortDirection('desc');
                  setIsFiltersModalOpen(false);
                  if (onSearch) onSearch();
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-[#070710] hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer border-0"
              >
                Limpiar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsFiltersModalOpen(false);
                  if (onSearch) onSearch();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-md border-0"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientesLista;






















