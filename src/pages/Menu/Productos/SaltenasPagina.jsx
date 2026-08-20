import React from 'react';
import CatalogoProductos from './shared/CatalogoProductos';
import EscalaPicante from './sections/EscalaPicante';
import GaleriaSabores from './shared/GaleriaSabores';
import BeneficiosProducto from './shared/BeneficiosProducto';
import CtaProducto from './shared/CtaProducto';

const BENEFICIOS = [
  { icon: 'fa-fire-burner', titulo: 'Horneado Diario', desc: 'Nuestra masa se prepara cada madrugada para que siempre esté crocante y jugosa.' },
  { icon: 'fa-leaf', titulo: 'Ingredientes Frescos', desc: 'Carne, pollo y verduras seleccionadas cada día en el mercado.' },
  { icon: 'fa-scroll', titulo: 'Receta Original', desc: 'La misma fórmula desde 1989, sin cambios ni atajos.' },
  { icon: 'fa-truck-fast', titulo: 'Delivery Express', desc: 'Llevamos tus salteñas calentitas a casa en menos de 30 minutos.' },
];

const SaltenasPagina = () => {
    return (
        <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

            <CatalogoProductos
                categoriaId="saltenas"
                titulo="Nuestras"
                resaltado="Salteñas."
                descripcion="Dulces, picantes, súper picantes y para hornear en casa. Explorá el catálogo completo y tocá cada producto para ver su detalle."
            />
            <EscalaPicante />
            <GaleriaSabores
                imagenes={[
                    { src: '/img/05_Productos/Salteñas/Salteñas.png', nombre: 'Salteña de Carne', etiqueta: 'La Clásica' },
                    { src: '/img/05_Productos/Salteñas/PrecocidasCongeladas.png', nombre: 'Salteña de Pollo', etiqueta: 'Suave' },
                    { src: '/img/05_Productos/Salteñas/PrecocidasCongeladasMax.png', nombre: 'Salteña Picante', etiqueta: 'Para Valientes' },
                    { src: '/img/05_Productos/Salteñas/CrudasCongeladas.png', nombre: 'Súper Picante', etiqueta: 'Extrema' },
                ]}
                badge="Galería de Sabores"
                titulo="Un sabor para"
                resaltado="cada gusto"
                descripcion="De la clásica dulce a la súper picante, siempre hay una salteña perfecta para vos."
            />
            <BeneficiosProducto
                beneficios={BENEFICIOS}
                badge="Por Qué Nos Eligen"
                titulo="La diferencia está en"
                resaltado="el detalle"
            />
            <CtaProducto
                frase="Pedí tus salteñas favoritas y llevá el verdadero sabor de Los Castores a tu mesa."
                enlaceMenu="/menu/saltenas"
            />
        </div>
    );
};

export default SaltenasPagina;
