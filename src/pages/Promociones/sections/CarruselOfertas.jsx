import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';
import CarruselProductos from '../../../components/carouseles/CarruselProductos';

const productosOferta = [
    { id: 1, coverImg: '/img/05_Productos/Salteñas/PrecocidasCongeladasMax.png', name: 'Salteñas Precocidas', subtitle: 'Promoción', icon: 'fa-drumstick-bite', type: 'Congeladas', price: 'Bs. 68', desc: 'Docena de salteñas precocidas y congeladas para que las hornees en casa. Frescas del día.', size: 'Docena', includes: ['Precocidas', 'Listas en 20 min', '6 sabores'] },
    { id: 2, coverImg: '/img/05_Productos/Salteñas/CrudasCongeladas.png', name: 'Salteñas Crudas', subtitle: 'Oferta por mayor', icon: 'fa-snowflake', type: 'Crudas', price: 'Bs. 60', desc: 'Crudas y congeladas, listas para hornearte en casa con la receta tradicional. Sabor garantizado.', size: 'Docena', includes: ['Crudas', 'Empaque sellado', '4 variedades'] },
    { id: 3, coverImg: '/img/05_Productos/Cafe/Capuccino.png', name: 'Capuccino', subtitle: '2x1', icon: 'fa-mug-hot', type: 'Cafetería', price: 'Bs. 16', desc: 'Capuccino espumoso de nuestra cafetería. Llevá 2 y pagá solo 1.', size: 'Grande', includes: ['2x1', 'Canela extra', 'Leche vaporizada'] },
    { id: 4, coverImg: '/img/05_Productos/Postres/SundaeVainilla.png', name: 'Sundae Vainilla', subtitle: 'Oferta', icon: 'fa-ice-cream', type: 'Postres', price: 'Bs. 14', desc: 'Sundae cremoso de vainilla con toppings a elección. Perfecto para el calor.', size: 'Individual', includes: ['3 toppings', 'Salsa extra', 'Fruta fresca'] },
    { id: 5, coverImg: '/img/05_Productos/Refrescos/Mocochinchi.png', name: 'Mocochinchi', subtitle: 'Refresco del día', icon: 'fa-glass-water', type: 'Refresco', price: 'Bs. 6', desc: 'Refresco tradicional de mocochinchi preparado al día. Dulce y refrescante.', size: 'Vaso grande', includes: ['Con hielo', 'Canela', 'Al alcance de tu mano'] },
    { id: 6, coverImg: '/img/05_Productos/Frapuccinos/FrapuccinoChocolate.png', name: 'Frapuccino Chocolate', subtitle: 'Promo verano', icon: 'fa-blender', type: 'Frapuccino', price: 'Bs. 22', desc: 'Frapuccino helado de chocolate con crema batida. El favorito del verano.', size: 'Grande', includes: ['Crema batida', 'Chocolate belga', 'Hielo frappé'] },
];

const CarruselOfertas = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#5D3A1F]/20">
                            <i className="fas fa-tags text-[#5D3A1F] mr-1"></i> Ofertas de Temporada
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-3 leading-tight">
                            Productos en <span className="relative inline-block text-[#FF4D00]">
                                oferta
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Deslizá para ver todas las ofertas de temporada: congeladas, café, postres y más. Llevá tus favoritos al mejor precio antes de que se agoten.
                        </p>
                    </div>

                    <div className="relative z-20">
                        <CarruselProductos products={productosOferta} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CarruselOfertas;
