const normalizar = (valor = '') => String(valor)
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('es');

export const filtrarProyectos = (proyectos, busqueda, etapa) => {
  const termino = normalizar(busqueda.trim());
  return proyectos.filter((proyecto) => {
    const coincideEtapa = etapa === 'todas' || proyecto.etapa === etapa;
    const coincideTexto = !termino || [proyecto.titulo, proyecto.categoria, proyecto.descripcion]
      .some((valor) => normalizar(valor).includes(termino));
    return coincideEtapa && coincideTexto;
  });
};

export const ordenarProyectos = (proyectos, criterio) => {
  const etapas = ['idea', 'consulta', 'progreso', 'revision', 'finalizado'];
  return [...proyectos].sort((a, b) => {
    if (criterio === 'nombre') return a.titulo.localeCompare(b.titulo, 'es', { sensitivity: 'base' });
    if (criterio === 'etapa') return etapas.indexOf(a.etapa) - etapas.indexOf(b.etapa);
    return new Date(b.actualizadoEn || b.creadoEn || 0) - new Date(a.actualizadoEn || a.creadoEn || 0);
  });
};

export const filtrarNotas = (notas, busqueda, proyectoId) => {
  const termino = normalizar(busqueda.trim());
  return notas.filter((nota) => {
    const coincideProyecto = proyectoId === 'todas' || (proyectoId === 'generales' ? !nota.proyectoId : String(nota.proyectoId) === proyectoId);
    const coincideTexto = !termino || [nota.titulo, nota.contenido].some((valor) => normalizar(valor).includes(termino));
    return coincideProyecto && coincideTexto;
  });
};

export const ordenarNotas = (notas, criterio) => [...notas].sort((a, b) => {
  if (criterio === 'nombre') return a.titulo.localeCompare(b.titulo, 'es', { sensitivity: 'base' });
  return new Date(b.actualizadoEn || b.creadoEn || 0) - new Date(a.actualizadoEn || a.creadoEn || 0);
});

export const filtrarEventos = (eventos, periodo, ahora = new Date()) => {
  const inicio = new Date(ahora);
  inicio.setHours(0, 0, 0, 0);
  const fin = new Date(inicio);
  if (periodo === 'hoy') fin.setDate(fin.getDate() + 1);
  if (periodo === 'semana') fin.setDate(fin.getDate() + 7);
  return eventos
    .filter(({ inicio: fecha }) => {
      const fechaEvento = new Date(fecha);
      return fechaEvento >= inicio && (periodo === 'todos' || fechaEvento < fin);
    })
    .sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
};

export const obtenerDiasDelCalendario = (mes) => {
  const primerDia = new Date(mes.getFullYear(), mes.getMonth(), 1);
  const inicio = new Date(primerDia);
  inicio.setDate(1 - primerDia.getDay());
  return Array.from({ length: 42 }, (_, indice) => {
    const dia = new Date(inicio);
    dia.setDate(inicio.getDate() + indice);
    return dia;
  });
};

export const fechaLocal = (date) => {
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export const fechaHoraLocal = (value) => {
  const date = new Date(value);
  return `${fechaLocal(date)}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};
