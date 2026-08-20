import React, { useState, useMemo, useEffect, useRef } from 'react';
import { BreadcrumbHeader } from '../../components/layouts/Sidebar';
import Pagination from '../../components/Pagination';
import { CATEGORIAS_PERMISOS, filtrarPorCategoria } from '../constantes';

const DropdownSelect = ({ label, value, onChange, options }) => {
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
      {label && (
        <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">{label}</label>
      )}
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-white dark:bg-[#040408] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs font-bold flex items-center justify-between gap-2 focus:ring-2 focus:ring-[#E95A0C]/40 outline-none cursor-pointer transition-all hover:border-[#E95A0C]/40">
        {selected.icon && <i className={`${selected.icon} text-[#E95A0C] text-xs`}></i>}
        <span className="flex-1 text-left truncate">{selected.label}</span>
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
              <span className="truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const DropdownCategorias = ({ value, onChange, options, open, setOpen }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [setOpen]);

  const selected = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="px-4 py-1.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-[10px] font-black uppercase tracking-wider shadow-md shadow-orange-900/5 dark:shadow-none transition-all cursor-pointer flex items-center gap-2 border border-red-500/20"
        title="Filtrar por categoría de permisos"
      >
        <i className="fas fa-layer-group text-[10px]"></i>
        <span className="whitespace-nowrap">{selected.label}</span>
        <i className={`fas fa-chevron-down text-[9px] transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>
      {open && (
        <div className="absolute z-[100] mt-1 right-0 min-w-[210px] rounded-xl border border-slate-200/60 dark:border-white/5 bg-white shadow-2xl dark:shadow-black/80 overflow-hidden">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full px-3.5 py-2.5 text-xs font-bold flex items-center gap-2 text-left transition-all cursor-pointer ${
                opt.value === value ? 'bg-[#8B4513] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {opt.icon && <i className={`${opt.icon} text-xs ${opt.value === value ? 'text-white' : 'text-[#E95A0C]'}`}></i>}
              <span>{opt.label}</span>
              {opt.value === value && <i className="fas fa-check ml-auto text-[10px]"></i>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const MatrizPermisos = ({
  permisos = [],
  matrizPermisos = [],
  togglePermisoRol,
  setActiveTab
}) => {
  const [buscarFila, setBuscarFila] = useState('');
  const [searchCriterion, setSearchCriterion] = useState('general');
  const [sortPreset, setSortPreset] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [rolFiltro, setRolFiltro] = useState('todos');
  const [categoria, setCategoria] = useState('todas');
  const [categoriasOpen, setCategoriasOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [buscarFila, searchCriterion, sortPreset, sortDirection, rolFiltro, categoria]);

  const rolesVisibles = useMemo(() => {
    if (rolFiltro === 'todos') return matrizPermisos;
    return matrizPermisos.filter(r => String(r.id) === String(rolFiltro));
  }, [matrizPermisos, rolFiltro]);

  const permisosFiltrados = useMemo(() => {
    if (!permisos || !Array.isArray(permisos)) return [];
    const term = (buscarFila || '').toLowerCase().trim();
    let filtered = permisos.filter(p => {
      if (!term) return true;
      if (searchCriterion === 'nombre') {
        return p.nombre && p.nombre.toLowerCase().includes(term);
      }
      return (p.nombre && p.nombre.toLowerCase().includes(term)) || String(p.id).includes(term);
    });

    filtered = filtrarPorCategoria(filtered, categoria);

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortPreset === 'nombre_az') {
        comparison = (a.nombre || '').localeCompare(b.nombre || '');
      } else {
        comparison = a.id - b.id;
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [permisos, buscarFila, searchCriterion, sortPreset, sortDirection, categoria]);

  const totalPages = Math.ceil(permisosFiltrados.length / itemsPerPage) || 1;
  const paginatedPermisos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return permisosFiltrados.slice(start, start + itemsPerPage);
  }, [permisosFiltrados, currentPage]);

  const resetFilters = () => {
    setBuscarFila('');
    setSearchCriterion('general');
    setSortPreset('id');
    setSortDirection('asc');
    setRolFiltro('todos');
    setCategoria('todas');
    setCurrentPage(1);
  };

  const criterioOptions = [
    { value: 'general', label: 'Todo (código + id)', icon: 'fas fa-border-all' },
    { value: 'nombre', label: 'Código de Permiso', icon: 'fas fa-font' },
  ];

  const sortOptions = [
    { value: 'id', label: 'ID', icon: 'fas fa-hashtag' },
    { value: 'nombre_az', label: 'Código A-Z', icon: 'fas fa-sort-alpha-down' },
  ];

  const directionOptions = [
    { value: 'asc', label: 'Ascendente', icon: 'fas fa-arrow-down-a-z' },
    { value: 'desc', label: 'Descendente', icon: 'fas fa-arrow-down-z-a' },
  ];

  const rolOptions = [
    { value: 'todos', label: 'Todos los roles', icon: 'fas fa-users' },
    ...matrizPermisos.map(r => ({ value: String(r.id), label: r.nombre, icon: 'fas fa-user-tag' })),
  ];

  return (
    <div className="space-y-4 font-montserrat w-full">
      <BreadcrumbHeader
        icon="fas fa-sliders"
        breadcrumbs={[
          { label: 'Sistema', onClick: () => setActiveTab && setActiveTab('inicio') },
          { label: 'Seguridad' },
          { label: 'Matriz de Accesos' }
        ]}
        title="Matriz de Accesos y Seguridad"
        subtitle="Gestione interactivamente las asignaciones de permisos y autorizaciones para cada rol."
        actionButtonText="Nuevo Permiso"
        onActionClick={() => setActiveTab && setActiveTab('nuevo-permiso')}
      />

      {/* PANEL DE CONSULTA Y FILTRADO */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] overflow-visible relative z-10">
        <div className="bg-gradient-to-r from-orange-50/80 to-transparent dark:from-[#E95A0C]/10 dark:to-transparent p-4 rounded-xl border border-orange-200/50 dark:border-[#E95A0C]/20 mb-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-md shadow-orange-900/5 dark:shadow-none shrink-0">
            <i className="fas fa-table-cells-large"></i>
          </div>
          <div>
            <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">CONSULTA Y FILTRADO</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest leading-normal m-0 mt-0.5">
              Filtre permisos, seleccione el rol a visualizar y administre las asignaciones de la matriz.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          {/* BUSCADOR */}
          <div className="sm:col-span-5 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">FILTRAR PERMISOS</label>
            <div className="relative">
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input type="text" placeholder="Buscar permiso por nombre o código..." value={buscarFila}
                onChange={(e) => setBuscarFila(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold uppercase" />
              {buscarFila && (
                <button onClick={() => setBuscarFila('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-400 cursor-pointer bg-transparent border-0 font-bold text-sm">
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* CRITERIO */}
          <div className="sm:col-span-3">
            <DropdownSelect label="CRITERIO" value={searchCriterion} onChange={setSearchCriterion} options={criterioOptions} />
          </div>

          {/* ORDENAR */}
          <div className="sm:col-span-3">
            <DropdownSelect label="ORDENAR POR" value={sortPreset} onChange={setSortPreset} options={sortOptions} />
          </div>

          {/* BOTÓN FILTROS */}
          <div className="sm:col-span-1">
            <button onClick={() => setIsFiltersModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#8B4513] text-white flex items-center justify-center text-sm shadow-md shadow-orange-900/5 dark:shadow-none transition-all cursor-pointer border-0 h-[40px] hover:scale-105"
              title="Ajustar Filtros"><i className="fas fa-filter"></i></button>
          </div>
        </div>
      </div>

      {/* TABLA DE LA MATRIZ */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] overflow-visible relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 pb-4 border-b-2 border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-lg dark:shadow-black/60 shadow-orange-900/5 dark:shadow-none shrink-0">
              <i className="fas fa-table-cells-large"></i>
            </div>
            <div>
              <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-tight flex items-center gap-2">
                MATRIZ DE PERMISOS POR ROL
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              </h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest m-0 mt-0.5">
                <i className="fas fa-chevron-right text-[6px] text-[#E95A0C] mr-1"></i>
                Asignación de permisos por rol del sistema
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-[#E95A0C] border border-orange-200/50 dark:dark:border-orange-900/50 text-[10px] px-4 py-1.5 rounded-xl font-black uppercase shadow-sm flex items-center gap-2 shrink-0 whitespace-nowrap">
              <i className="fas fa-key text-[10px]"></i>
              <span className="text-xs">{permisosFiltrados.length}</span>
              PERMISOS
            </span>
            <span className="text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-white/5 text-[10px] px-4 py-1.5 rounded-xl font-black uppercase shadow-sm flex items-center gap-2 shrink-0 whitespace-nowrap">
              <i className="fas fa-user-tag text-[10px]"></i>
              <span className="text-xs">{rolesVisibles.length}</span>
              ROLES VISIBLES
            </span>
            <DropdownCategorias
              value={categoria}
              onChange={setCategoria}
              options={CATEGORIAS_PERMISOS}
              open={categoriasOpen}
              setOpen={setCategoriasOpen}
            />
            <div className="w-44 shrink-0">
              <DropdownSelect
                value={typeof rolFiltro === 'string' ? rolFiltro : String(rolFiltro)}
                onChange={(v) => setRolFiltro(v)}
                options={rolOptions}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100 dark:border-white/5 text-[#E95A0C] uppercase text-[9px] font-black tracking-widest">
                <th className="py-2.5 px-3 text-left whitespace-nowrap" style={{ width: '18%' }}><i className="fas fa-key text-[#E95A0C] mr-1.5"></i>PERMISO</th>
                {rolesVisibles.map(r => (
                  <th key={r.id} className="py-2.5 px-2 text-center" style={{ width: `${(82 / Math.max(rolesVisibles.length, 1))}%` }}>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-6 h-6 rounded-lg text-[#E95A0C] flex items-center justify-center text-[10px] border border-orange-500/20 dark:border-orange-500/10">
                        <i className="fas fa-user-tag"></i>
                      </div>
                      <span className="text-[9px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider leading-snug break-words" style={{ lineHeight: '1.15' }}>{r.nombre}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {paginatedPermisos.length > 0 ? (
                paginatedPermisos.map((p) => (
                  <tr key={p.id} className="hover: dark:hover:bg-red-950/10 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E95A0C]/10 to-red-500/5 text-[#E95A0C] flex items-center justify-center text-xs border border-[#E95A0C]/20 shrink-0 shadow-sm">
                          <i className="fas fa-shield-halved"></i>
                        </div>
                        <div className="min-w-0">
                          <span className="font-extrabold text-[#4A2E1B] dark:text-white whitespace-nowrap text-[11px] block leading-tight truncate max-w-[180px]">{p.nombre}</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[8px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-[#070710] px-1.5 py-0.5 rounded-md">
                              <i className="fas fa-hashtag text-[7px] mr-0.5"></i>{p.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    {rolesVisibles.map(r => {
                      const tiene = r.detalleRolPermisos && r.detalleRolPermisos.some(drp => drp.fkIdP === p.id);
                      return (
                        <td key={r.id} className="py-2.5 px-2 text-center">
                          <label className="relative inline-flex items-center cursor-pointer group">
                            <input type="checkbox" checked={tiene || r.id === 1} disabled={r.id === 1}
                              onChange={() => togglePermisoRol(r.id, p.id, tiene)}
                              className="sr-only peer" />
                            <div className={`w-5 h-5 rounded-md border-2 transition-all duration-150 flex items-center justify-center mx-auto group-hover:scale-110 ${
                              tiene || r.id === 1
                                ? 'bg-[#E95A0C] border-[#E95A0C] shadow-sm shadow-orange-900/5 dark:shadow-none'
                                : 'bg-white border-slate-300 group-hover:border-[#E95A0C]/50'
                            }`}>
                              {(tiene || r.id === 1) && (
                                <i className="fas fa-check text-white text-[8px]"></i>
                              )}
                            </div>
                          </label>
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={rolesVisibles.length + 1} className="py-12 text-center font-bold text-slate-400">
                    <i className="fas fa-shield-slash text-3xl text-[#E95A0C] block mb-2 opacity-50"></i>
                    No se encontraron permisos en la matriz con ese filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINACIÓN */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] text-center w-full">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={permisosFiltrados.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          itemLabel="permisos en la matriz"
        />
      </div>

      {/* MODAL DE FILTROS */}
      {isFiltersModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat">
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 max-w-sm w-full border border-slate-200/60 dark:border-white/5 shadow-2xl dark:shadow-black/80 relative animate-fade-in">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider flex items-center gap-2 m-0">
                <i className="fas fa-filter text-[#E95A0C]"></i> AJUSTAR FILTROS DE LA MATRIZ
              </h4>
              <button onClick={() => setIsFiltersModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:text-slate-400 font-black cursor-pointer border-0 bg-transparent text-sm">✕</button>
            </div>

            <div className="space-y-4">
              <DropdownSelect label="Criterio de Búsqueda" value={searchCriterion} onChange={setSearchCriterion} options={criterioOptions} />
              <DropdownSelect label="Ordenar Por" value={sortPreset} onChange={setSortPreset} options={sortOptions} />
              <DropdownSelect label="Dirección de Orden" value={sortDirection} onChange={setSortDirection} options={directionOptions} />
              <DropdownSelect label="Rol a Visualizar" value={typeof rolFiltro === 'string' ? rolFiltro : String(rolFiltro)} onChange={setRolFiltro} options={rolOptions} />
              <DropdownSelect label="Categoría de Permiso" value={categoria} onChange={setCategoria} options={CATEGORIAS_PERMISOS} />
            </div>

            <div className="flex items-center gap-2.5 mt-6 pt-4 border-t border-slate-100">
              <button type="button" onClick={() => { resetFilters(); setIsFiltersModalOpen(false); }}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-[#070710] hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer border-0">
                Limpiar
              </button>
              <button type="button" onClick={() => { setIsFiltersModalOpen(false); setCurrentPage(1); }}
                className="flex-1 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-md border-0">
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrizPermisos;