import { useState } from 'react';
import apiClient from '../../servicios/clienteApi';

const useHorno = () => {
  const [registros, setRegistros] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const cargar = async () => {
    try { const { data } = await apiClient.get('/horno-sistema'); if (data.success) setRegistros(data.registros || []); } catch (e) { console.error(e); }
  };
  const cargarSucursales = async () => {
    try { const { data } = await apiClient.get('/stock-sistema/sucursales'); if (data.success) setSucursales(data.sucursales || []); } catch (e) { console.error(e); }
  };

  const crear = async (p) => {
    try { const { data } = await apiClient.post('/horno-sistema', p); if (data.success) { cargar(); return { ok: true }; } return { ok: false, mensaje: data.mensaje }; }
    catch (e) { return { ok: false, mensaje: e.response?.data?.mensaje || e.response?.data?.error || 'Error' }; }
  };
  const editar = async (id, p) => {
    try { const { data } = await apiClient.put(`/horno-sistema/${id}`, p); if (data.success) { cargar(); return { ok: true }; } return { ok: false }; }
    catch (e) { return { ok: false, mensaje: e.response?.data?.mensaje || 'Error' }; }
  };
  const anular = async (id) => {
    try { const { data } = await apiClient.put(`/horno-sistema/${id}/anular`); if (data.success) { cargar(); return { ok: true }; } return { ok: false }; }
    catch (e) { return { ok: false, mensaje: e.response?.data?.mensaje || 'Error' }; }
  };
  const eliminar = async (id) => {
    try { const { data } = await apiClient.delete(`/horno-sistema/${id}`); if (data.success) { cargar(); return { ok: true }; } return { ok: false }; }
    catch (e) { return { ok: false, mensaje: e.response?.data?.mensaje || 'Error' }; }
  };

  return { registros, sucursales, cargar, cargarSucursales, crear, editar, anular, eliminar };
};

export default useHorno;