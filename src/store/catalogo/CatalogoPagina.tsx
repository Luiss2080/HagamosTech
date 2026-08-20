import React, { useState } from 'react';
import HeroCatalogo from './sections/HeroCatalogo';
import ProductosCatalogo from './sections/ProductosCatalogo';
import CarritoFlotante from './sections/CarritoFlotante';

const CatalogoPagina: React.FC = () => {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [vista, setVista] = useState<'grid' | 'list'>('grid');

  return (
    <main id="catalog-page" className="relative overflow-hidden bg-[#fafafa] min-h-screen">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Secciones */}
      <HeroCatalogo />
      <ProductosCatalogo
        categoriaActiva={categoriaActiva}
        setCategoriaActiva={setCategoriaActiva}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        vista={vista}
        setVista={setVista}
      />

      <CarritoFlotante />
    </main>
  );
};

export default CatalogoPagina;
