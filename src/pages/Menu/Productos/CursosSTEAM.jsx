import React from 'react';
import CatalogoProductos from './shared/CatalogoProductos';
import CataCafe from './sections/CataCafe';
import GaleriaSabores from './shared/GaleriaSabores';
import BeneficiosProducto from './shared/BeneficiosProducto';
import CtaProducto from './shared/CtaProducto';

const BENEFICIOS = [
  { icon: 'fa-seedling', titulo: 'Grano Boliviano', desc: 'Café de Caranavi y Samaipata, tostado para resaltar su mejor perfil.' },
  { icon: 'fa-mug-saucer', titulo: 'Baristas Expertos', desc: 'Nuestro equipo prepara cada taza con técnica y dedicación.' },
  { icon: 'fa-temperature-high', titulo: 'Siempre Caliente', desc: 'Servimos tu café en la temperatura perfecta para disfrutarlo.' },
  { icon: 'fa-heart', titulo: 'Hecho con Cariño', desc: 'Cada taza lleva el mismo amor que nuestras salteñas desde 1989.' },
];

const CafePagina = () => {
    return (
        <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

            <CatalogoProductos
                categoriaId="cafeteria"
                titulo="Nuestra"
                resaltado="Cafetería."
                descripcion="Café de especialidad boliviano, capuccinos cremosos y chocolatadas. Explorá el catálogo y tocá cada producto para ver su detalle."
            />
            <CataCafe />
            <GaleriaSabores
                imagenes={[
                    { src: '/img/05_Productos/Cafe/Americano.png', nombre: 'Americano', etiqueta: 'El Clásico' },
                    { src: '/img/05_Productos/Cafe/Capuccino.png', nombre: 'Capuccino', etiqueta: 'Suave' },
                    { src: '/img/05_Productos/Cafe/Espresso.png', nombre: 'Espresso', etiqueta: 'Intenso' },
                    { src: '/img/05_Productos/Cafe/Chocolatada.png', nombre: 'Chocolatada', etiqueta: 'Dulce' },
                ]}
                badge="Galería de Café"
                titulo="La taza"
                resaltado="perfecta"
                descripcion="Cada preparación con granos bolivianos de especialidad."
            />
            <BeneficiosProducto
                beneficios={BENEFICIOS}
                badge="Nuestro Café"
                titulo="La pasión por el"
                resaltado="buen café"
            />
            <CtaProducto
                frase="Pedí tu café favorito y acompañá la experiencia con nuestras salteñas."
                enlaceMenu="/menu/cafe"
            />
        </div>
    );
};

export default CafePagina;
