import apiClient from './clienteApi';

const API = '/perfil/espacio';
const rutas = { proyecto: 'proyectos', nota: 'notas', evento: 'eventos', tarea: 'tareas', recurso: 'recursos', enfoque: 'enfoque' };
const rutasPlural = new Set(['proyectos', 'notas', 'eventos', 'tareas', 'recursos', 'enfoque']);

export const listarEspacioPersonal = async () => {
  const [proyectos, notas, eventos, tareas, recursos, sesionesEnfoque] = await Promise.all([
    apiClient.get(`${API}/proyectos`),
    apiClient.get(`${API}/notas`),
    apiClient.get(`${API}/eventos`),
    apiClient.get(`${API}/tareas`),
    apiClient.get(`${API}/recursos`),
    apiClient.get(`${API}/enfoque`),
  ]);
  return { proyectos: proyectos.data.data, notas: notas.data.data, eventos: eventos.data.data, tareas: tareas.data.data, recursos: recursos.data.data, sesionesEnfoque: sesionesEnfoque.data.data };
};

export const guardarRegistroPersonal = async ({ tipo, id, values }) => {
  const endpoint = rutas[tipo];
  const payload = { ...values };
  if (payload.proyectoId === '') payload.proyectoId = null;
  if (payload.inicio) payload.inicio = new Date(payload.inicio).toISOString();
  if (payload.fin === '') payload.fin = null;
  else if (payload.fin) payload.fin = new Date(payload.fin).toISOString();
  if (payload.iniciadoEn) payload.iniciadoEn = new Date(payload.iniciadoEn).toISOString();
  if (payload.completadoEn) payload.completadoEn = new Date(payload.completadoEn).toISOString();
  if (id) return apiClient.put(`${API}/${endpoint}/${id}`, payload);
  return apiClient.post(`${API}/${endpoint}`, payload);
};

export const eliminarRegistroPersonal = (tipo, id) => {
  const endpoint = rutasPlural.has(tipo) ? tipo : rutas[tipo];
  return apiClient.delete(`${API}/${endpoint}/${id}`);
};

export const actualizarEtapaProyecto = (id, etapa) => apiClient.put(`${API}/proyectos/${id}`, { etapa });
