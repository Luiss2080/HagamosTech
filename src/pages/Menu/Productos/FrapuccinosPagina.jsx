import React from 'react';
import CatalogoProductos from './shared/CatalogoProductos';
import ConstructorFrapuccino from './sections/ConstructorFrapuccino';
import GaleriaSabores from './shared/GaleriaSabores';
import BeneficiosProducto from './shared/BeneficiosProducto';
import CtaProducto from './shared/CtaProducto';

const BENEFICIOS = [
  { icon: 'fa-snowflake', titulo: 'Súper Helado', desc: 'Preparados al momento con hielo finamente triturado.' },
  { icon: 'fa-whipped-cream', titulo: 'Crema Batida', desc: 'Coronados con crema batida y toppings a elección.' },
  { icon: 'fa-sun', titulo: 'Frescura Total', desc: 'La bebida perfecta para combatir el calor cruceño.' },
  { icon: 'fa-blender', titulo: 'Hechos al Momento', desc: 'Cada frapuccino se prepara cuando lo pedís.' },
];

const FrapuccinosPagina = () => {
    return (
        <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

            <CatalogoProductos
                categoriaId="frapuccinos"
                titulo="Nuestros"
                resaltado="Frapuccinos."
                descripcion="Bebidas heladas y cremosas de café para refrescar tus días más calurosos. Explorá el catálogo y tocá cada producto para ver su detalle."
            />
            <ConstructorFrapuccino />
            <GaleriaSabores
                imagenes={[
                    { src: '/img/05_Productos/Frapuccinos/FrapuccinoChocolate.png', nombre: 'Chocolate', etiqueta: 'Intenso' },
                    { src: '/img/05_Productos/Frapuccinos/FrapuccinoDulceDeLeche.png', nombre: 'Dulce de Leche', etiqueta: 'Cremoso' },
                    { src: '/img/05_Productos/Frapuccinos/FrapuccinoRegular.png', nombre: 'Clásico', etiqueta: 'Original' },
                ]}
                badge="Galería de Frapuccinos"
                titulo="Frescura"
                resaltado="helada"
                descripcion="La combinación perfecta de café, hielo y crema."
            />
            <BeneficiosProducto
                beneficios={BENEFICIOS}
                badge="Por Qué Nos Eligen"
                titulo="El sabor del"
                resaltado="verano"
            />
            <CtaProducto
                frase="Refrescate con nuestros frapuccinos y acompañalos con una salteña."
                enlaceMenu="/menu/frapuccinos"
            />
        </div>
    );
};

export default FrapuccinosPagina;
