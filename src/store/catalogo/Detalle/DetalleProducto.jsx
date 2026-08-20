import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import PageHero from '../../../components/func/MigasPan';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';
import { buscarProducto } from '../data/productos';
import VisualizadorProducto from './sections/VisualizadorProducto';
import InfoProducto from './sections/InfoProducto';
import BeneficiosDetalle from './sections/BeneficiosDetalle';
import Relacionados from './sections/Relacionados';
import CarritoFlotante from '../sections/CarritoFlotante';

const DetalleProducto = () => {
  const { id } = useParams();
  const producto = buscarProducto(id || '');

  if (!producto) {
    return <Navigate to="/errors/404" replace />;
  }

  return (
    <main id="detalle-producto-page" className="relative overflow-hidden bg-[#fafafa] min-h-screen">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero */}
      <div className="relative z-10">
        <CircuitBackground />
        <PageHero
          title={producto.nombre.split(' ').slice(0, -1).join(' ')}
          highlight={producto.nombre.split(' ').slice(-1)[0] || producto.tipo}
          description={(
            <>
              {producto.descripcion} Preparado de forma artesanal con ingredientes frescos del día, esta delicia de la categoría {producto.categoria} es la elección perfecta para acompañar tus mañanas.
            </>
          )}
        />
      </div>

      {/* Imagen (izquierda) + Info (derecha) en grid equitativo */}
      <div className="relative z-10 py-4">
        <CircuitBackground />
        <div className="container mx-auto px-6 max-w-7xl relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Columna izquierda: imagen */}
            <div>
              <VisualizadorProducto producto={producto} />
            </div>
            {/* Columna derecha: info */}
            <div>
              <InfoProducto producto={producto} />
            </div>
          </div>
        </div>
      </div>

      {/* Beneficios */}
      <BeneficiosDetalle />

      {/* Relacionados */}
      <Relacionados producto={producto} />

      {/* Carrito flotante */}
      <CarritoFlotante />
    </main>
  );
};

export default DetalleProducto;
