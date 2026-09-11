import React from 'react';
import CatalogoProductos from './shared/CatalogoProductos';
import CalculadoraCombos from './sections/CalculadoraCombos';
import GaleriaSabores from './shared/GaleriaSabores';
import BeneficiosProducto from './shared/BeneficiosProducto';
import CtaProducto from './shared/CtaProducto';

const BENEFICIOS = [
  { icon: 'fa-hand-holding-dollar', titulo: 'Precio Especial', desc: 'Ahorrá más con nuestros combos diseñados para cada ocasión.' },
  { icon: 'fa-users', titulo: 'Para Compartir', desc: 'Combos pensados para 2, 4 o más personas. Alcanza para todos.' },
  { icon: 'fa-box-open', titulo: 'Eventos y Oficinas', desc: 'Pedidos por mayor para fiestas, reuniones y empresas.' },
  { icon: 'fa-truck-fast', titulo: 'Delivery Coordinado', desc: 'Entregamos tu combo en la hora y lugar que elijas.' },
];

const CombosPagina = () => {
    return (
        <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

            <CatalogoProductos
                categoriaId="saltenas"
                tipo="Combo"
                titulo="Nuestros"
                resaltado="Combos."
                descripcion="Combos pensados para compartir, celebrar y ahorrar. Explorá el catálogo y tocá cada combo para ver su detalle."
            />
            <CalculadoraCombos />
            <GaleriaSabores
                imagenes={[
                    { src: '/img/05_Productos/Combos/Desayuno.png', nombre: 'Desayuno HagamosTech', etiqueta: 'Para arrancar' },
                    { src: '/img/05_Productos/Combos/SalteñasConTostada.png', nombre: 'Salteña con Tostada', etiqueta: 'La Favorita' },
                    { src: '/img/05_Productos/Salteñas/ComboPacata.png', nombre: 'Combo Pacata', etiqueta: 'Para compartir' },
                ]}
                badge="Galería de Combos"
                titulo="Compartí en"
                resaltado="grande"
                descripcion="Combos pensados para cada ocasión y cantidad de personas."
            />
            <BeneficiosProducto
                beneficios={BENEFICIOS}
                badge="Mejor Precio"
                titulo="Ahorrá"
                resaltado="en grande"
            />
            <CtaProducto
                frase="Elegí tu combo y disfrutá del mejor sabor en compañía."
                enlaceMenu="/menu/combos"
            />
        </div>
    );
};

export default CombosPagina;
