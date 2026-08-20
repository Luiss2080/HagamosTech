import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';
import CarruselProductos from '../../../components/carouseles/CarruselProductos';

const PRODUCTOS_BEBIDAS_POSTRES = [
  { id: 'ref-1', name: 'Licuado Natural con Agua', subtitle: 'Refrescante y Ligero', icon: 'fa-blender', type: 'Frutas Frescas', desc: 'Licuado de frutas naturales con agua. Saludable y revitalizante.', price: 'Bs. 10', coverImg: '/img/05_Productos/Refrescos/LicuadoConAgua.png', includes: ['Frutas frescas', 'Agua', 'Azúcar opcional'] },
  { id: 'ref-2', name: 'Licuado Cremoso con Leche', subtitle: 'Sustancioso', icon: 'fa-blender', type: 'Frutas Frescas', desc: 'Licuado cremoso con leche fresca. Ideal como complemento de tus salteñas.', price: 'Bs. 12', coverImg: '/img/05_Productos/Refrescos/LicuadoConLeche.png', includes: ['Frutas frescas', 'Leche', 'Azúcar opcional'] },
  { id: 'ref-3', name: 'Limonada Recién Exprimida', subtitle: 'Frescura Natural', icon: 'fa-lemon', type: 'Cítrico', desc: 'Recién exprimida. El clásico refrescante que nunca puede faltar en tu mesa.', price: 'Bs. 8', coverImg: '/img/05_Productos/Refrescos/LicuadosConFrutas.png', includes: ['Limón fresco', 'Agua', 'Azúcar', 'Hielo'] },
  { id: 'ref-4', name: 'Mocochinchi Oriental', subtitle: 'Tradición Boliviana', icon: 'fa-wine-glass', type: 'Casero', desc: 'Durazno deshidratado con canela. Dulce, aromático y bien oriental.', price: 'Bs. 8', coverImg: '/img/05_Productos/Refrescos/Mocochinchi.png', includes: ['Durazno seco', 'Canela', 'Azúcar', 'Hielo'] },
  { id: 'ref-5', name: 'Agua Mineral 500ml', subtitle: 'Pureza en Botella', icon: 'fa-bottle-water', type: 'Sin Gas', desc: 'Agua mineral bien fría. El acompañante más puro para cualquier salteña.', price: 'Bs. 6', coverImg: '/img/05_Productos/Refrescos/Agua500ml.png', includes: ['Agua mineral', '500ml'] },
  { id: 'ref-6', name: 'Tostada de la Casa', subtitle: 'Nuestro Refresco', icon: 'fa-beer-mug', type: 'Gasificada', desc: 'El refresco oficial de HagamosTech. El maridaje perfecto para las picantes.', price: 'Bs. 7', coverImg: '/img/05_Productos/Refrescos/Tostada.png', includes: ['Refresco Tostada', 'Hielo'] },
  { id: 'pos-1', name: 'Sundae de Chocolate', subtitle: 'Dulce Final', icon: 'fa-ice-cream', type: 'Postre Helado', desc: 'Helado cremoso bañado en salsa de chocolate. El broche de oro de tu comida.', price: 'Bs. 12', coverImg: '/img/05_Productos/Postres/SundaChocolate.png', includes: ['Helado de vainilla', 'Chocolate', 'Crema'] },
  { id: 'pos-2', name: 'Sundae de Vainilla', subtitle: 'Simple y Perfecto', icon: 'fa-ice-cream', type: 'Postre Helado', desc: 'El clásico de siempre. Sencillo, delicioso y perfecto para cualquier antojo.', price: 'Bs. 10', coverImg: '/img/05_Productos/Postres/SundaeVainilla.png', includes: ['Helado de vainilla', 'Topping', 'Galleta'] },
  { id: 'pos-3', name: 'Sundae Mixto Especial', subtitle: 'Lo Mejor de Dos', icon: 'fa-ice-cream', type: 'Postre Helado', desc: 'Chocolate y vainilla en un solo sundae. Para los que no saben elegir.', price: 'Bs. 14', coverImg: '/img/05_Productos/Postres/SundaMixto.png', includes: ['Helado mixto', 'Chocolate', 'Crema', 'Cereza'] },
  { id: 'com-1', name: 'Combo Desayuno HagamosTech', subtitle: 'Arranque Perfecto', icon: 'fa-sun', type: 'Promo', desc: 'Salteña + café + jugo. El desayuno completo para arrancar el día con toda la energía.', price: 'Bs. 18', coverImg: '/img/05_Productos/Combos/Desayuno.png', includes: ['1 Salteña', 'Café Americano', 'Jugo natural'] },
  { id: 'com-2', name: 'Dúo Salteña con Tostada', subtitle: 'La Favorita', icon: 'fa-burger', type: 'Promo', desc: 'Dos salteñas más tu Tostada. La combinación que más piden nuestros clientes.', price: 'Bs. 20', coverImg: '/img/05_Productos/Combos/SalteñasConTostada.png', includes: ['2 Salteñas', 'Tostada', 'Salsa'] }
];

const CarruselBebidasPostres = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="w-full px-2 sm:px-4 relative z-20">
                    <div className="text-center mb-2 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#8B4513]/10 text-[#8B4513] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#8B4513]/20">
                            <i className="fas fa-glass-water text-[#8B4513] mr-1"></i> Para Acompañar
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-4 leading-tight">
                            Refrescos, postres{' '}
                            <span className="relative inline-block text-[#FF4D00]">
                                y combos.
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Licuados naturales, postres helados y los combos preferidos. Todo para completar tu experiencia HagamosTech.
                        </p>
                    </div>
                    <CarruselProductos products={PRODUCTOS_BEBIDAS_POSTRES} />
                </div>
            </section>
        </div>
    );
};

export default CarruselBebidasPostres;
