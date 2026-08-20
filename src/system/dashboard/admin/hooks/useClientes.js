import { useState } from 'react';
import apiClient from '../../../../servicios/clienteApi';
const showAlert = () => {};

const useClientes = (user) => {
  const [clientes, setClientes] = useState([]);
  const [buscarCliente, setBuscarCliente] = useState('');
  const [clienteForm, setClienteForm] = useState({ nombre: '', contacto: '' });

  const cargarClientes = async () => {
    try {
      const { data } = await apiClient.get('/clientes-sistema');
      if (data && data.success) {
        setClientes(Array.isArray(data.clientes) ? data.clientes : []);
      } else {
        setClientes([]);
      }
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      setClientes([]);
    }
  };

  const submitCliente = async (e) => {
    e.preventDefault();
    try {
      const contactoObj = {
        tipoCliente: clienteForm.tipoCliente,
        correo: clienteForm.correo,
        telefono: clienteForm.telefono,
        direccion: clienteForm.direccion,
        documento: clienteForm.documento,
        complemento: clienteForm.complemento,
        ciudad: clienteForm.ciudad,
        rubro: clienteForm.rubro,
        estado: clienteForm.estado,
        observaciones: clienteForm.observaciones
      };

      if (clienteForm.id) {
        const original = clientes.find(c => c.id === clienteForm.id || c.nombre === clienteForm.nombre);
        const { data } = await apiClient.put('/clientes-sistema/editar', {
          nombreOriginal: original ? original.nombre : clienteForm.nombre,
          contactoOriginal: original ? original.contacto : '',
          nuevoNombre: clienteForm.nombre,
          nuevoContacto: JSON.stringify(contactoObj)
        });
        if (data.success) {
          showAlert({ title: 'Cliente Actualizado', message: `Ficha de ${clienteForm.nombre} modificada con éxito`, type: 'success' });
          await cargarClientes();
        }
      } else {
        const { data } = await apiClient.post('/clientes-sistema/registrar', {
          nombre: clienteForm.nombre,
          contacto: JSON.stringify(contactoObj),
          usuarioId: user?.id
        });
        if (data.success) {
          showAlert({ title: 'Cliente Registrado', message: `Cliente ${clienteForm.nombre} creado con éxito`, type: 'success' });
          await cargarClientes();
        }
      }
    } catch (error) {
      showAlert({ title: 'Error', message: 'No se pudo procesar la solicitud del cliente', type: 'error' });
    }
  };

  const eliminarCliente = async (cliente) => {
    try {
      const { data } = await apiClient.post('/clientes-sistema/eliminar', {
        nombre: cliente.nombre,
        contacto: cliente.contacto
      });
      if (data.success) {
        showAlert({ title: 'Cliente Eliminado', message: 'Cliente dado de baja con éxito', type: 'success' });
        cargarClientes();
      }
    } catch (error) {
      showAlert({ title: 'Error', message: 'No se pudo dar de baja al cliente', type: 'error' });
    }
  };

  return {
    clientes,
    buscarCliente,
    clienteForm,
    setBuscarCliente,
    setClienteForm,
    cargarClientes,
    submitCliente,
    eliminarCliente,
  };
};

export default useClientes;
