import { useState } from 'react';
import apiClient from '../../../../servicios/clienteApi';
const showAlert = () => {};

const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioForm, setUsuarioForm] = useState({
    usuario: '', nombre: '', apellido: '', numci: '', fenac: '', numtel: '', nomcol: '', correo: '', contrasena: '', rolId: '4'
  });
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [roles, setRoles] = useState([]);
  const [rolForm, setRolForm] = useState({ nombre: '', permisoIds: [] });
  const [rolEditando, setRolEditando] = useState(null);

  const cargarUsuarios = async () => {
    try {
      const [resUsers, resRoles] = await Promise.all([
        apiClient.get('/usuarios-sistema'),
        apiClient.get('/roles-sistema')
      ]);
      if (resUsers.data.success) setUsuarios(resUsers.data.usuarios);
      if (resRoles.data.success) setRoles(resRoles.data.roles);
    } catch (error) {
      console.error(error);
    }
  };

  const submitUsuario = async (e) => {
    e.preventDefault();
    try {
      if (usuarioEditando) {
        const { data } = await apiClient.put(`/usuarios-sistema/${usuarioEditando.id}`, usuarioForm);
        if (data.success) {
          showAlert({ title: 'Usuario Actualizado', message: 'El usuario fue modificado correctamente', type: 'success' });
          setUsuarioEditando(null);
          setUsuarioForm({
            usuario: '', nombre: '', apellido: '', numci: '', fenac: '', numtel: '', nomcol: '', correo: '', contrasena: '', rolId: '4'
          });
          cargarUsuarios();
        }
      } else {
        const { data } = await apiClient.post('/usuarios-sistema', usuarioForm);
        if (data.success) {
          showAlert({ title: 'Usuario Creado', message: 'El usuario fue registrado con éxito', type: 'success' });
          setUsuarioForm({
            usuario: '', nombre: '', apellido: '', numci: '', fenac: '', numtel: '', nomcol: '', correo: '', contrasena: '', rolId: '4'
          });
          cargarUsuarios();
        }
      }
    } catch (error) {
      const msg = error.response?.data?.mensaje || 'Error al procesar usuario';
      showAlert({ title: 'Error', message: msg, type: 'error' });
    }
  };

  const cambiarEstadoUsuario = async (id, activoActual) => {
    try {
      const { data } = await apiClient.put(`/usuarios-sistema/${id}/estado`, { activo: !activoActual });
      if (data.success) {
        showAlert({ title: 'Estado Modificado', message: 'Se actualizó el estado del usuario', type: 'success' });
        cargarUsuarios();
      }
    } catch (error) {
      showAlert({ title: 'Error', message: 'No se pudo cambiar el estado', type: 'error' });
    }
  };

  const submitRol = async (e) => {
    e.preventDefault();
    try {
      if (rolEditando) {
        const { data } = await apiClient.put(`/roles-sistema/${rolEditando.id}`, rolForm);
        if (data.success) {
          showAlert({ title: 'Rol Actualizado', message: 'El rol fue modificado correctamente', type: 'success' });
          setRolEditando(null);
          setRolForm({ nombre: '', permisoIds: [] });
          cargarUsuarios();
        }
      } else {
        const { data } = await apiClient.post('/roles-sistema', rolForm);
        if (data.success) {
          showAlert({ title: 'Rol Registrado', message: 'El nuevo rol fue creado', type: 'success' });
          setRolForm({ nombre: '', permisoIds: [] });
          cargarUsuarios();
        }
      }
    } catch (error) {
      const msg = error.response?.data?.mensaje || 'Error al procesar rol';
      showAlert({ title: 'Error', message: msg, type: 'error' });
    }
  };

  const eliminarRol = async (id) => {
    try {
      const { data } = await apiClient.delete(`/roles-sistema/${id}`);
      if (data.success) {
        showAlert({ title: 'Rol Eliminado', message: 'El rol fue eliminado correctamente', type: 'success' });
        cargarUsuarios();
      }
    } catch (error) {
      const msg = error.response?.data?.mensaje || 'No se pudo eliminar el rol';
      showAlert({ title: 'Error', message: msg, type: 'error' });
    }
  };

  return {
    usuarios,
    usuarioForm,
    usuarioEditando,
    roles,
    rolForm,
    rolEditando,
    setUsuarioForm,
    setUsuarioEditando,
    setRolForm,
    setRolEditando,
    cargarUsuarios,
    submitUsuario,
    cambiarEstadoUsuario,
    submitRol,
    eliminarRol,
  };
};

export default useUsuarios;
