import { useState } from 'react';
import apiClient from '../../servicios/clienteApi';

const useCompras = () => {
  const [compras, setCompras] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const cargarCompras = async () => {
    try {
      const { data } = await apiClient.get('/compras-sistema');
      if (data.success) setCompras(data.compras || []);
    } catch (e) { console.error(e); }
  };

  const cargarSucursales = async () => {
    try {
      const { data } = await apiClient.get('/stock-sistema/sucursales');
      if (data.success) setSucursales(data.sucursales || []);
    } catch (e) { console.error(e); }
  };

  const crearCompra = async (payload) => {
    try {
      const { data } = await apiClient.post('/compras-sistema', payload);
      if (data.success) { cargarCompras(); return { ok: true, compra: data.compra }; }
      return { ok: false, mensaje: data.mensaje };
    } catch (error) {
      return { ok: false, mensaje: error.response?.data?.mensaje || error.response?.data?.error || 'Error al registrar la compra' };
    }
  };

  const editarCompra = async (id, payload) => {
    try {
      const { data } = await apiClient.put(`/compras-sistema/${id}`, payload);
      if (data.success) { cargarCompras(); return { ok: true }; }
      return { ok: false, mensaje: data.mensaje };
    } catch (error) {
      return { ok: false, mensaje: error.response?.data?.mensaje || 'Error al actualizar la compra' };
    }
  };

  const anularCompra = async (id) => {
    try {
      const { data } = await apiClient.put(`/compras-sistema/${id}/anular`);
      if (data.success) { cargarCompras(); return { ok: true }; }
      return { ok: false };
    } catch (error) {
      return { ok: false, mensaje: error.response?.data?.mensaje || 'No se pudo anular la compra' };
    }
  };

  const eliminarCompra = async (id) => {
    try {
      const { data } = await apiClient.delete(`/compras-sistema/${id}`);
      if (data.success) { cargarCompras(); return { ok: true }; }
      return { ok: false };
    } catch (error) {
      return { ok: false, mensaje: error.response?.data?.mensaje || 'No se pudo eliminar la compra' };
    }
  };

  return {
    compras,
    sucursales,
    cargarCompras,
    cargarSucursales,
    crearCompra,
    editarCompra,
    anularCompra,
    eliminarCompra
  };
};

export default useCompras;