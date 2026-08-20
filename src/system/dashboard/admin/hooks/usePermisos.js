import { useState } from 'react';
import apiClient from '../../../../servicios/clienteApi';
const showAlert = () => {};

const usePermisos = (user, fetchProfile) => {
  const [permisos, setPermisos] = useState([]);
  const [permisoForm, setPermisoForm] = useState({ nombre: '' });
  const [permisoEditando, setPermisoEditando] = useState(null);
  const [permisosDisponibles, setPermisosDisponibles] = useState([]);
  const [matrizPermisos, setMatrizPermisos] = useState([]);

  const cargarPermisos = async () => {
    try {
      const { data } = await apiClient.get('/permisos-sistema');
      if (data.success) setPermisosDisponibles(data.permisos);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarMatrizPermisos = async () => {
    try {
      const { data } = await apiClient.get('/roles-sistema/matriz-permisos');
      if (data.success) {
        setPermisos(data.permisos);
        setMatrizPermisos(data.roles);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitPermiso = async (e) => {
    e.preventDefault();
    try {
      if (permisoEditando) {
        const { data } = await apiClient.put(`/permisos-sistema/${permisoEditando.id}`, permisoForm);
        if (data.success) {
          showAlert({ title: 'Permiso Actualizado', message: 'Permiso actualizado correctamente', type: 'success' });
          setPermisoForm({ nombre: '' });
          setPermisoEditando(null);
          cargarPermisos();
          cargarMatrizPermisos();
        }
      } else {
        const { data } = await apiClient.post('/permisos-sistema', permisoForm);
        if (data.success) {
          showAlert({ title: 'Permiso Registrado', message: 'Permiso creado correctamente', type: 'success' });
          setPermisoForm({ nombre: '' });
          cargarPermisos();
          cargarMatrizPermisos();
        }
      }
    } catch (error) {
      const msg = error.response?.data?.mensaje || 'Error al procesar permiso';
      showAlert({ title: 'Error', message: msg, type: 'error' });
    }
  };

  const eliminarPermiso = async (id) => {
    try {
      const { data } = await apiClient.delete(`/permisos-sistema/${id}`);
      if (data.success) {
        showAlert({ title: 'Permiso Eliminado', message: 'Permiso eliminado correctamente', type: 'success' });
        cargarPermisos();
        cargarMatrizPermisos();
      }
    } catch (error) {
      const msg = error.response?.data?.mensaje || 'No se pudo eliminar el permiso';
      showAlert({ title: 'Error', message: msg, type: 'error' });
    }
  };

  const togglePermisoRol = async (rolId, permisoId, tiene) => {
    const rolActualObj = matrizPermisos.find(r => r.id === rolId);
    let nuevosPermisoIds = rolActualObj.detalleRolPermisos.map(drp => drp.fkIdP);

    if (tiene) {
      nuevosPermisoIds = nuevosPermisoIds.filter(id => id !== permisoId);
    } else {
      nuevosPermisoIds.push(permisoId);
    }

    try {
      const { data } = await apiClient.post('/roles-sistema/matriz-permisos', {
        rolId,
        permisoIds: nuevosPermisoIds
      });
      if (data.success) {
        showAlert({ title: 'Permiso Guardado', message: 'Se actualizaron los permisos del rol', type: 'success' });
        cargarMatrizPermisos();
        if (user?.rolId === rolId) {
          fetchProfile();
        }
      }
    } catch (error) {
      showAlert({ title: 'Error', message: 'No se pudieron actualizar permisos', type: 'error' });
    }
  };

  return {
    permisos,
    permisoForm,
    permisoEditando,
    permisosDisponibles,
    matrizPermisos,
    setPermisoForm,
    setPermisoEditando,
    cargarPermisos,
    cargarMatrizPermisos,
    submitPermiso,
    eliminarPermiso,
    togglePermisoRol,
  };
};

export default usePermisos;
