import { useState } from 'react';
import apiClient from '../../../../servicios/clienteApi';
const showAlert = () => {};

const useColegios = (user) => {
  const [colegios, setColegios] = useState([]);
  const [buscarColegio, setBuscarColegio] = useState('');
  const [colegioForm, setColegioForm] = useState({
    id: '', nombre: '', correo: '', telefono: '', direccion: '', documento: '', complemento: '', ciudad: 'La Paz', rubro: 'Educación', estado: 'Activo', observaciones: ''
  });

  const cargarColegios = async () => {
    try {
      const { data } = await apiClient.get('/colegios-sistema');
      if (data && data.success) {
        setColegios(Array.isArray(data.colegios) ? data.colegios : []);
      } else {
        setColegios([]);
      }
    } catch (error) {
      console.error('Error al cargar colegios:', error);
      setColegios([]);
    }
  };

  const submitColegio = async (e) => {
    e.preventDefault();
    try {
      const contactoObj = {
        tipoCliente: 'JURIDICO',
        correo: colegioForm.correo,
        telefono: colegioForm.telefono,
        direccion: colegioForm.direccion,
        documento: colegioForm.documento,
        complemento: colegioForm.complemento,
        ciudad: colegioForm.ciudad,
        rubro: colegioForm.rubro,
        estado: colegioForm.estado,
        observaciones: colegioForm.observaciones
      };

      if (colegioForm.id) {
        const original = colegios.find(c => c.id === colegioForm.id || c.nombre === colegioForm.nombre);
        const { data } = await apiClient.put('/colegios-sistema/editar', {
          nombreOriginal: original ? original.nombre : colegioForm.nombre,
          nuevoNombre: colegioForm.nombre,
          nuevoContacto: JSON.stringify(contactoObj)
        });
        if (data.success) {
          showAlert({ title: 'Colegio Actualizado', message: `Ficha de ${colegioForm.nombre} modificada con éxito`, type: 'success' });
          await cargarColegios();
        }
      } else {
        const { data } = await apiClient.post('/colegios-sistema/registrar', {
          nombre: colegioForm.nombre,
          contacto: JSON.stringify(contactoObj),
          usuarioId: user?.id
        });
        if (data.success) {
          showAlert({ title: 'Colegio Registrado', message: `Colegio ${colegioForm.nombre} creado con éxito`, type: 'success' });
          await cargarColegios();
        }
      }
    } catch (error) {
      showAlert({ title: 'Error', message: 'No se pudo procesar la solicitud del colegio', type: 'error' });
    }
  };

  const eliminarColegio = async (colegio) => {
    try {
      const { data } = await apiClient.post('/colegios-sistema/eliminar', {
        nombre: colegio.nombre
      });
      if (data.success) {
        showAlert({ title: 'Dado de Baja', message: `Colegio ${colegio.nombre} marcado como inactivo`, type: 'success' });
        await cargarColegios();
      }
    } catch (error) {
      showAlert({ title: 'Error', message: 'No se pudo dar de baja al colegio', type: 'error' });
    }
  };

  return {
    colegios,
    buscarColegio,
    colegioForm,
    setBuscarColegio,
    setColegioForm,
    cargarColegios,
    submitColegio,
    eliminarColegio,
  };
};

export default useColegios;
