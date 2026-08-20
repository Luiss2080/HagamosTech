import { useState } from 'react';
import apiClient from '../../servicios/clienteApi';

const useDelivery = () => {
  const [zonas, setZonas] = useState([]);
  const [repartidores, setRepartidores] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  const cargarZonas = async () => {
    try { const { data } = await apiClient.get('/delivery-sistema/zonas'); if (data.success) setZonas(data.zonas || []); } catch (e) { console.error(e); }
  };
  const cargarRepartidores = async () => {
    try { const { data } = await apiClient.get('/delivery-sistema/repartidores'); if (data.success) setRepartidores(data.repartidores || []); } catch (e) { console.error(e); }
  };
  const cargarPedidos = async () => {
    try { const { data } = await apiClient.get('/delivery-sistema/pedidos'); if (data.success) setPedidos(data.pedidos || []); } catch (e) { console.error(e); }
  };
  const cargarTodo = async () => Promise.all([cargarZonas(), cargarRepartidores(), cargarPedidos()]);

  const crearZona = async (p) => { try { const { data } = await apiClient.post('/delivery-sistema/zonas', p); if (data.success) { cargarZonas(); return { ok: true }; } return { ok: false, mensaje: data.mensaje }; } catch (e) { return { ok: false, mensaje: e.response?.data?.mensaje || 'Error' }; } };
  const editarZona = async (id, p) => { try { const { data } = await apiClient.put(`/delivery-sistema/zonas/${id}`, p); if (data.success) { cargarZonas(); return { ok: true }; } return { ok: false }; } catch (e) { return { ok: false, mensaje: e.response?.data?.mensaje || 'Error' }; } };
  const eliminarZona = async (id) => { try { const { data } = await apiClient.delete(`/delivery-sistema/zonas/${id}`); if (data.success) { cargarZonas(); return { ok: true, mensaje: data.mensaje }; } return { ok: false }; } catch (e) { return { ok: false, mensaje: e.response?.data?.mensaje || 'Error' }; } };

  const crearRepartidor = async (p) => { try { const { data } = await apiClient.post('/delivery-sistema/repartidores', p); if (data.success) { cargarRepartidores(); return { ok: true }; } return { ok: false, mensaje: data.mensaje }; } catch (e) { return { ok: false, mensaje: e.response?.data?.mensaje || 'Error' }; } };
  const editarRepartidor = async (id, p) => { try { const { data } = await apiClient.put(`/delivery-sistema/repartidores/${id}`, p); if (data.success) { cargarRepartidores(); return { ok: true }; } return { ok: false }; } catch (e) { return { ok: false, mensaje: e.response?.data?.mensaje || 'Error' }; } };
  const eliminarRepartidor = async (id) => { try { const { data } = await apiClient.delete(`/delivery-sistema/repartidores/${id}`); if (data.success) { cargarRepartidores(); return { ok: true, mensaje: data.mensaje }; } return { ok: false }; } catch (e) { return { ok: false, mensaje: e.response?.data?.mensaje || 'Error' }; } };

  const crearPedido = async (p) => { try { const { data } = await apiClient.post('/delivery-sistema/pedidos', p); if (data.success) { cargarPedidos(); return { ok: true, pedido: data.pedido }; } return { ok: false, mensaje: data.mensaje }; } catch (e) { return { ok: false, mensaje: e.response?.data?.mensaje || e.response?.data?.error || 'Error' }; } };
  const editarPedido = async (id, p) => { try { const { data } = await apiClient.put(`/delivery-sistema/pedidos/${id}`, p); if (data.success) { cargarPedidos(); return { ok: true }; } return { ok: false }; } catch (e) { return { ok: false, mensaje: e.response?.data?.mensaje || 'Error' }; } };
  const cambiarEstado = async (id, estado, repartidorId) => { try { const { data } = await apiClient.put(`/delivery-sistema/pedidos/${id}/estado`, { estado, repartidorId }); if (data.success) { cargarPedidos(); return { ok: true }; } return { ok: false }; } catch (e) { return { ok: false, mensaje: e.response?.data?.mensaje || 'Error' }; } };
  const eliminarPedido = async (id) => { try { const { data } = await apiClient.delete(`/delivery-sistema/pedidos/${id}`); if (data.success) { cargarPedidos(); return { ok: true }; } return { ok: false }; } catch (e) { return { ok: false, mensaje: e.response?.data?.mensaje || 'Error' }; } };

  return {
    zonas, repartidores, pedidos,
    cargarTodo, cargarPedidos,
    crearZona, editarZona, eliminarZona,
    crearRepartidor, editarRepartidor, eliminarRepartidor,
    crearPedido, editarPedido, cambiarEstado, eliminarPedido
  };
};

export default useDelivery;