import { useState } from 'react';
import apiClient from '../../servicios/clienteApi';

const useStock = () => {
  const [resumen, setResumen] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const cargarResumen = async () => {
    try {
      const { data } = await apiClient.get('/stock-sistema/resumen');
      if (data.success) setResumen(data.resumen || []);
    } catch (e) { console.error(e); }
  };

  const cargarMovimientos = async () => {
    try {
      const { data } = await apiClient.get('/stock-sistema/movimientos');
      if (data.success) setMovimientos(data.movimientos || []);
    } catch (e) { console.error(e); }
  };

  const cargarAlertas = async () => {
    try {
      const { data } = await apiClient.get('/stock-sistema/alertas');
      if (data.success) setAlertas(data.alertas || []);
    } catch (e) { console.error(e); }
  };

  const cargarSucursales = async () => {
    try {
      const { data } = await apiClient.get('/stock-sistema/sucursales');
      if (data.success) setSucursales(data.sucursales || []);
    } catch (e) { console.error(e); }
  };

  const cargarTodo = async () => {
    await Promise.all([cargarResumen(), cargarMovimientos(), cargarAlertas(), cargarSucursales()]);
  };

  const crearMovimiento = async (payload) => {
    try {
      const { data } = await apiClient.post('/stock-sistema/movimientos', payload);
      if (data.success) {
        await Promise.all([cargarResumen(), cargarMovimientos(), cargarAlertas()]);
        return { ok: true };
      }
      return { ok: false, mensaje: data.mensaje };
    } catch (error) {
      return { ok: false, mensaje: error.response?.data?.mensaje || error.response?.data?.error || 'Error al registrar movimiento' };
    }
  };

  const crearTransferencia = async (payload) => {
    try {
      const { data } = await apiClient.post('/stock-sistema/transferencias', payload);
      if (data.success) {
        await Promise.all([cargarResumen(), cargarMovimientos(), cargarAlertas()]);
        return { ok: true };
      }
      return { ok: false, mensaje: data.mensaje };
    } catch (error) {
      return { ok: false, mensaje: error.response?.data?.mensaje || error.response?.data?.error || 'Error al transferir stock' };
    }
  };

  const setMinimo = async (payload) => {
    try {
      const { data } = await apiClient.put('/stock-sistema/minimo', payload);
      if (data.success) {
        await cargarResumen();
        return { ok: true };
      }
      return { ok: false };
    } catch (error) {
      return { ok: false, mensaje: error.response?.data?.mensaje || 'Error al actualizar el mínimo' };
    }
  };

  const eliminarMovimiento = async (id) => {
    try {
      const { data } = await apiClient.delete(`/stock-sistema/movimientos/${id}`);
      if (data.success) {
        await Promise.all([cargarResumen(), cargarMovimientos(), cargarAlertas()]);
        return { ok: true };
      }
      return { ok: false };
    } catch (error) {
      return { ok: false, mensaje: error.response?.data?.mensaje || 'No se pudo eliminar el movimiento' };
    }
  };

  return {
    resumen,
    movimientos,
    alertas,
    sucursales,
    cargarTodo,
    crearMovimiento,
    crearTransferencia,
    setMinimo,
    eliminarMovimiento
  };
};

export default useStock;