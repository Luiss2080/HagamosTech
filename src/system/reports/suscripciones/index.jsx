import React, { useState, useEffect } from 'react';
import { BreadcrumbHeader } from '../../components/layouts/Sidebar';
import ReportFilters from './components/ReportFilters';
import ReportKPIs from './components/ReportKPIs';
import ReportCharts from './components/ReportCharts';
import apiClient from '../../../servicios/clienteApi';

const ReportesSuscripcionesAnalitica = ({ setActiveTab }) => {
  const [isGenerating, setIsGenerating] = useState(true);
  
  // Estados de Parametrización
  const [rango, setRango] = useState('mes');
  const [tipoVenta, setTipoVenta] = useState('todas');
  const [sucursal, setSucursal] = useState('todas');

  // Estados de Datos
  const [kpis, setKpis] = useState(null);
  const [dataLine, setDataLine] = useState([]);
  const [dataBar, setDataBar] = useState([]);
  const [dataPie, setDataPie] = useState([]);
  const [dataTop, setDataTop] = useState([]);

  const generarReporte = async () => {
    setIsGenerating(true);
    try {
      const { data } = await apiClient.get(`/reportes-sistema/suscripciones`);
      if (data.success) {
        setKpis(data.kpis);
        setDataLine(data.dataLine || []);
        setDataBar(data.dataBar || []);
        setDataPie(data.dataPie || []);
        setDataTop(data.dataTop || []);
      }
    } catch (error) {
      console.warn("Error generando analíticas:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generarReporte();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="space-y-5 font-montserrat w-full">
      <BreadcrumbHeader
        icon="fas fa-star"
        breadcrumbs={[
          { label: 'Sistema', onClick: () => setActiveTab && setActiveTab('inicio') },
          { label: 'Reportes' },
          { label: 'Analítica de Suscripciones' }
        ]}
        title="Dashboard Analítico de Suscripciones"
        subtitle="Rendimiento de membresías, MRR (Ingreso Mensual Recurrente) y churn rate."
        actionButtonText="Descargar Informe Completo"
        onActionClick={() => alert('Generando informe PDF...')}
      />

      {/* Componente de Filtros Superiores */}
      <ReportFilters 
        rango={rango} setRango={setRango}
        tipoVenta={tipoVenta} setTipoVenta={setTipoVenta}
        sucursal={sucursal} setSucursal={setSucursal}
        onGenerate={generarReporte}
      />

      {/* Componente de KPIs */}
      <ReportKPIs kpis={kpis} isGenerating={isGenerating} />

      {/* Componente de Gráficas Múltiples */}
      <ReportCharts 
        isGenerating={isGenerating}
        dataLine={dataLine}
        dataBar={dataBar}
        dataPie={dataPie}
        dataTop={dataTop}
      />
    </div>
  );
};

export default ReportesSuscripcionesAnalitica;






















