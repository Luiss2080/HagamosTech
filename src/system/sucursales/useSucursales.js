import { useState } from 'react';
import apiClient from '../../servicios/clienteApi';

const useSucursales = () => {
  const [sucursales, setSucursales] = useState([]);

  const cargarSucursales = async () => {
    try {
      const { data } = await apiClient.get('/sucursales-sistema');
      if (data.success) setSucursales(data.sucursales || []);
    } catch (e) { console.error(e); }
  };

  const crearSucursal = async (payload) => {
    try {
      const { data } = await apiClient.post('/sucursales-sistema', payload);
      if (data.success) { cargarSucursales(); return { ok: true }; }
      return { ok: false, mensaje: data.mensaje };
    } catch (error) {
      return { ok: false, mensaje: error.response?.data?.mensaje || error.response?.data?.error || 'Error al registrar la sucursal' };
    }
  };

  const editarSucursal = async (id, payload) => {
    try {
      const { data } = await apiClient.put(`/sucursales-sistema/${id}`, payload);
      if (data.success) { cargarSucursales(); return { ok: true }; }
      return { ok: false, mensaje: data.mensaje };
    } catch (error) {
      return { ok: false, mensaje: error.response?.data?.mensaje || 'Error al actualizar la sucursal' };
    }
  };

  const eliminarSucursal = async (id) => {
    try {
      const { data } = await apiClient.delete(`/sucursales-sistema/${id}`);
      if (data.success) { cargarSucursales(); return { ok: true, mensaje: data.mensaje }; }
      return { ok: false };
    } catch (error) {
      return { ok: false, mensaje: error.response?.data?.mensaje || 'No se pudo eliminar la sucursal' };
    }
  };

  return {
    sucursales,
    cargarSucursales,
    crearSucursal,
    editarSucursal,
    eliminarSucursal
  };
};

export default useSucursales;