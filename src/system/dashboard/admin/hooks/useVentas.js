import { useState } from 'react';
import apiClient from '../../../../servicios/clienteApi';

const useVentas = () => {
  const [ventas, setVentas] = useState([]);

  const cargarVentas = async () => {
    try {
      const { data } = await apiClient.get('/ventas-sistema');
      if (data.success) setVentas(data.ventas || []);
    } catch (error) {
      console.error(error);
    }
  };

  const crearVenta = async (payload) => {
    try {
      const { data } = await apiClient.post('/ventas-sistema', payload);
      if (data.success) {
        cargarVentas();
        return { ok: true, venta: data.venta };
      }
      return { ok: false, mensaje: data.mensaje || 'No se pudo registrar la venta' };
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || error.response?.data?.error || 'Error al registrar la venta';
      return { ok: false, mensaje };
    }
  };

  const anularVenta = async (id) => {
    try {
      const { data } = await apiClient.put(`/ventas-sistema/${id}/anular`);
      if (data.success) {
        cargarVentas();
        return { ok: true };
      }
      return { ok: false };
    } catch (error) {
      return { ok: false, mensaje: error.response?.data?.mensaje || 'No se pudo anular la venta' };
    }
  };

  const eliminarVenta = async (id) => {
    try {
      const { data } = await apiClient.delete(`/ventas-sistema/${id}`);
      if (data.success) {
        cargarVentas();
        return { ok: true };
      }
      return { ok: false };
    } catch (error) {
      return { ok: false, mensaje: error.response?.data?.mensaje || 'No se pudo eliminar la venta' };
    }
  };

  return {
    ventas,
    cargarVentas,
    crearVenta,
    anularVenta,
    eliminarVenta
  };
};

export default useVentas;