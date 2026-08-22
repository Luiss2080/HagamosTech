import React from 'react';
import CatalogoProductos from './shared/CatalogoProductos';
import MezcladorFrutas from './sections/MezcladorFrutas';
import GaleriaSabores from './shared/GaleriaSabores';
import BeneficiosProducto from './shared/BeneficiosProducto';
import CtaProducto from './shared/CtaProducto';

const BENEFICIOS = [
  { icon: 'fa-leaf', titulo: 'Frutas Naturales', desc: 'Jugos y licuados hechos con frutas frescas de estación.' },
  { icon: 'fa-wine-glass', titulo: 'Tradición Boliviana', desc: 'Mocochinchi y refrescos clásicos preparados como en casa.' },
  { icon: 'fa-snowflake', titulo: 'Bien Helados', desc: 'Siempre servidos bien fríos para refrescar tu día.' },
  { icon: 'fa-heart', titulo: 'Sin Conservantes', desc: 'Todo natural, sin colorantes ni aditivos artificiales.' },
];

const RefrescosPagina = () => {
    return (
        <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

            <CatalogoProductos
                categoriaId="refrescos"
                titulo="Nuestros"
                resaltado="Refrescos."
                descripcion="Jugos naturales, licuados frescos y refrescos tradicionales. Explorá el catálogo y tocá cada producto para ver su detalle."
            />
            <MezcladorFrutas />
            <GaleriaSabores
                imagenes={[
                    { src: '/img/05_Productos/Refrescos/LicuadoConAgua.png', nombre: 'Licuado con Agua', etiqueta: 'Ligero' },
                    { src: '/img/05_Productos/Refrescos/LicuadoConLeche.png', nombre: 'Licuado con Leche', etiqueta: 'Cremoso' },
                    { src: '/img/05_Productos/Refrescos/Mocochinchi.png', nombre: 'Mocochinchi', etiqueta: 'Tradición' },
                    { src: '/img/05_Productos/Refrescos/Tostada.png', nombre: 'Tostada', etiqueta: 'Gasificada' },
                ]}
                badge="Galería de Refrescos"
                titulo="Naturaleza"
                resaltado="en vaso"
                descripcion="Jugos y refrescos naturales preparados al momento."
            />
            <BeneficiosProducto
                beneficios={BENEFICIOS}
                badge="100% Natural"
                titulo="La frescura"
                resaltado="en tu mesa"
            />
            <CtaProducto
                frase="Pedí tus refrescos favoritos y refrescá cada bocado de tus salteñas."
                enlaceMenu="/menu/refrescos"
            />
        </div>
    );
};

export default RefrescosPagina;
