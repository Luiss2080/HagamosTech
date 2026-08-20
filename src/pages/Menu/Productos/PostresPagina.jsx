import React from 'react';
import CatalogoProductos from './shared/CatalogoProductos';
import ConstructorSundae from './sections/ConstructorSundae';
import GaleriaSabores from './shared/GaleriaSabores';
import BeneficiosProducto from './shared/BeneficiosProducto';
import CtaProducto from './shared/CtaProducto';

const BENEFICIOS = [
  { icon: 'fa-ice-cream', titulo: 'Helado Artesanal', desc: 'Cremoso y elaborado con ingredientes de primera calidad.' },
  { icon: 'fa-candy-cane', titulo: 'Toppings Variados', desc: 'Salsas, frutas, galletas y mucho más para personalizar tu postre.' },
  { icon: 'fa-snowflake', titulo: 'Bien Frío', desc: 'Servido en la temperatura perfecta para disfrutar al máximo.' },
  { icon: 'fa-heart', titulo: 'El Mejor Final', desc: 'El cierre dulce ideal para tu experiencia HagamosTech.' },
];

const PostresPagina = () => {
    return (
        <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

            <CatalogoProductos
                categoriaId="postres"
                titulo="Nuestros"
                resaltado="Postres."
                descripcion="Sundaes helados y dulces caseros para cerrar tu comida. Explorá el catálogo y tocá cada producto para ver su detalle."
            />
            <ConstructorSundae />
            <GaleriaSabores
                imagenes={[
                    { src: '/img/05_Productos/Postres/SundaChocolate.png', nombre: 'Sundae Chocolate', etiqueta: 'Dulce' },
                    { src: '/img/05_Productos/Postres/SundaeVainilla.png', nombre: 'Sundae Vainilla', etiqueta: 'Clásico' },
                    { src: '/img/05_Productos/Postres/SundaMixto.png', nombre: 'Sundae Mixto', etiqueta: 'Especial' },
                ]}
                badge="Galería de Postres"
                titulo="El final"
                resaltado="perfecto"
                descripcion="Sundaes helados con toppings a elección."
            />
            <BeneficiosProducto
                beneficios={BENEFICIOS}
                badge="Dulces Caseros"
                titulo="El capricho"
                resaltado="que merecés"
            />
            <CtaProducto
                frase="Terminá tu comida con un postre y hacé la experiencia completa."
                enlaceMenu="/menu/postres"
            />
        </div>
    );
};

export default PostresPagina;
