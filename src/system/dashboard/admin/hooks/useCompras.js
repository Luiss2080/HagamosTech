import { useState } from 'react';
import apiClient from '../../../../servicios/clienteApi';
const showAlert = () => {};

const useCompras = (user, libros) => {
  const [compras, setCompras] = useState([]);
  const [compraForm, setCompraForm] = useState({
    libroId: '', cantidad: 1, proveedorNombre: '', proveedorContacto: '', precioCompra: '', observaciones: ''
  });

  const cargarCompras = async () => {
    try {
      const { data } = await apiClient.get('/compras-sistema');
      if (data.success) setCompras(data.compras);
    } catch (error) {
      console.error(error);
    }
  };

  const submitCompra = async (e, callbacks = {}) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.post('/compras-sistema/procesar', {
        ...compraForm,
        usuarioId: user?.id
      });
      if (data.success) {
        showAlert({ title: 'Compra Registrada', message: 'Entrada de stock cargada correctamente', type: 'success' });
        setCompraForm({ libroId: '', cantidad: 1, proveedorNombre: '', proveedorContacto: '', precioCompra: '', observaciones: '' });
        cargarCompras();
        if (callbacks.onSuccess) callbacks.onSuccess();
      }
    } catch (error) {
      const msg = error.response?.data?.mensaje || 'Error al registrar la compra';
      showAlert({ title: 'Error', message: msg, type: 'error' });
    }
  };

  const anularCompra = async (id, callbacks = {}) => {
    try {
      const { data } = await apiClient.delete(`/compras-sistema/${id}`);
      if (data.success) {
        showAlert({ title: 'Compra Anulada', message: 'Compra anulada correctamente. Stock revertido.', type: 'success' });
        cargarCompras();
        if (callbacks.onSuccess) callbacks.onSuccess();
      }
    } catch (error) {
      const msg = error.response?.data?.mensaje || 'No se pudo anular la compra';
      showAlert({ title: 'Error', message: msg, type: 'error' });
    }
  };

  return {
    compras,
    compraForm,
    setCompraForm,
    cargarCompras,
    submitCompra,
    anularCompra,
  };
};

export default useCompras;
