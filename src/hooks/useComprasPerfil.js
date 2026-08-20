import { useState, useCallback } from 'react';
import apiClient from '../servicios/clienteApi';
import Cookies from 'js-cookie';

const getToken = () => sessionStorage.getItem('hagamostech_token') || Cookies.get('hagamostech_token');

export function useHistorialCompras() {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resumen, setResumen] = useState({ total: 0, cantidad: 0 });

  const listar = useCallback(async () => {
    setLoading(true);
    try {
      const token = getToken();
      const { data } = await apiClient.get('/compras/historial', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const lista = data.data || data.compras || data || [];
      setCompras(lista);
      if (data.resumen) setResumen(data.resumen);
      return lista;
    } catch {
      setCompras([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const descargarFactura = useCallback(async (pedidoId) => {
    try {
      const token = getToken();
      const { data } = await apiClient.get(`/compras/factura/${pedidoId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `factura_${pedidoId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      return { success: true };
    } catch {
      return { success: false, message: 'Error al descargar factura' };
    }
  }, []);

  return { compras, loading, resumen, listar, descargarFactura };
}
