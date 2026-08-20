import { useState } from 'react';
import apiClient from '../../../../servicios/clienteApi';
const showAlert = () => {};

const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [verificandoIntegridad, setVerificandoIntegridad] = useState(false);

  const cargarDashboard = async () => {
    setLoadingDashboard(true);
    try {
      const { data } = await apiClient.get('/ventas-sistema/dashboard');
      if (data.success) {
        setDashboardData(data);
      } else {
        throw new Error("No success in response");
      }
    } catch (error) {
      console.error("API error, using mock data for Salteñeria:", error);
      // MOCK DATA PARA SALTEÑERIA
      setDashboardData({
        success: true,
        kpis: {
          totalUsuarios: 24,
          totalEstudiantes: 1500, // Clientes recurrentes
          totalLibrosCatalogo: 12, // Tipos de Salteñas/Productos
        },
        distribucionRoles: [
          { rolNombre: 'Administrador', cantidad: 2 },
          { rolNombre: 'Cajero', cantidad: 6 },
          { rolNombre: 'Hornero', cantidad: 4 },
          { rolNombre: 'Repartidor', cantidad: 12 }
        ],
        datosGrafico: [
          { fecha: new Date(Date.now() - 6*86400000).toISOString(), total: 4500 },
          { fecha: new Date(Date.now() - 5*86400000).toISOString(), total: 4800 },
          { fecha: new Date(Date.now() - 4*86400000).toISOString(), total: 4200 },
          { fecha: new Date(Date.now() - 3*86400000).toISOString(), total: 5100 },
          { fecha: new Date(Date.now() - 2*86400000).toISOString(), total: 6200 },
          { fecha: new Date(Date.now() - 1*86400000).toISOString(), total: 8500 },
          { fecha: new Date().toISOString(), total: 9100 }
        ]
      });
    } finally {
      setLoadingDashboard(false);
    }
  };

  const verificarIntegridadInventario = async () => {
    setVerificandoIntegridad(true);
    try {
      const { data } = await apiClient.get('/inventario-sistema/integridad');
      if (data.success) {
        if (data.integro) {
          showAlert({ title: 'Integridad OK', message: 'La auditoría de stock no arrojó inconsistencias en el inventario', type: 'success' });
        } else {
          showAlert({ title: 'Inconsistencia Detectada', message: 'Se detectaron discrepancias entre el stock actual y la suma de movimientos', type: 'warning' });
        }
      }
    } catch (error) {
      showAlert({ title: 'Error', message: 'No se pudo auditar la base de datos', type: 'error' });
    } finally {
      setVerificandoIntegridad(false);
    }
  };

  return {
    dashboardData,
    loadingDashboard,
    verificandoIntegridad,
    cargarDashboard,
    verificarIntegridadInventario,
  };
};

export default useDashboardData;
