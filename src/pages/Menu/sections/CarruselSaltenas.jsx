import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';
import CarruselProductos from '../../../components/carouseles/CarruselProductos';

const PRODUCTOS_SALTENAS = [
  { id: 'sal-1', name: 'Salteña de Carne Dulce', subtitle: 'La Clásica', icon: 'fa-drumstick-bite', type: 'Dulce', desc: 'Jugosa y equilibrada, con el dulzor justo que resalta la carne de primera. La favorita de todos los días desde 1989.', price: 'Bs. 8', coverImg: '/img/05_Productos/Salteñas/Salteñas.png', includes: ['Carne de res', 'Aceituna', 'Huevo', 'Papa'] },
  { id: 'sal-2', name: 'Salteña de Pollo Dulce', subtitle: 'Suave y Cremosa', icon: 'fa-egg', type: 'Dulce', desc: 'Pollo tierno con un relleno suave y cremoso que se deshace en cada bocado. Perfecta para cualquier momento del día.', price: 'Bs. 8', coverImg: '/img/05_Productos/Salteñas/PrecocidasCongeladas.png', includes: ['Pollo', 'Aceituna', 'Huevo', 'Papa'] },
  { id: 'sal-3', name: 'Salteña de Carne Picante', subtitle: 'Para Valientes', icon: 'fa-pepper-hot', type: 'Picante', desc: 'Ají molido seleccionado que despierta los sentidos en cada mordida. Intensidad garantizada para los amantes del picante.', price: 'Bs. 8', coverImg: '/img/05_Productos/Salteñas/PrecocidasCongeladasMax.png', includes: ['Carne de res', 'Ají molido', 'Aceituna', 'Huevo'] },
  { id: 'sal-4', name: 'Súper Picante de Carne', subtitle: 'Edición Extrema', icon: 'fa-fire', type: 'Extra Picante', desc: 'Solo para valientes. Mezcla de ajíes seleccionados que desafían tu paladar al máximo nivel. ¿Te animás a probarla?', price: 'Bs. 9', coverImg: '/img/05_Productos/Salteñas/CrudasCongeladas.png', includes: ['Carne de res', 'Ajíes mixtos', 'Aceituna', 'Huevo'] },
  { id: 'sal-5', name: 'Salteñas Precocidas Congeladas', subtitle: 'Horneá en Casa', icon: 'fa-snowflake', type: 'Pack x6', desc: 'Llevate el auténtico sabor a tu hogar. Solo 25 minutos de horno y disfrutá salteñas como recién salidas de nuestra cocina.', price: 'Bs. 40', coverImg: '/img/05_Productos/Salteñas/PrecocidasCongeladas.png', includes: ['Pack x6', 'Precocidas', 'Listas para hornear'] },
  { id: 'sal-6', name: 'Salteñas Crudas Congeladas', subtitle: 'Frescas del Freezer', icon: 'fa-box', type: 'Pack x6', desc: 'Crudas y listas para hornear a tu gusto. El mismo sabor de siempre, pero cuando vos quieras y a tu ritmo.', price: 'Bs. 35', coverImg: '/img/05_Productos/Salteñas/CrudasCongeladas.png', includes: ['Pack x6', 'Crudas', 'Hornear 25 min'] },
  { id: 'sal-7', name: 'Combo Pacata Familiar', subtitle: 'Para Compartir', icon: 'fa-gift', type: 'Combo', desc: 'El combo ideal para reuniones. Variedad de salteñas mixtas, refrescos y nuestra salsa especial. ¡Alcanza para todos!', price: 'Bs. 55', coverImg: '/img/05_Productos/Salteñas/ComboPacata.png', includes: ['6 Salteñas mixtas', '2 Refrescos', 'Salsa especial'] },
  { id: 'sal-8', name: 'Salteña de Pollo Picante', subtitle: 'Picor Selecto', icon: 'fa-pepper-hot', type: 'Picante', desc: 'Pollo jugoso con especias que realzan el sabor casero. El picante justo y medido para los que buscan equilibrio perfecto.', price: 'Bs. 8', coverImg: '/img/05_Productos/Salteñas/PrecocidasCongeladasMax.png', includes: ['Pollo', 'Ají molido', 'Aceituna', 'Huevo'] }
];

const CarruselSaltenas = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="w-full px-2 sm:px-4 relative z-20">
                    <div className="text-center mb-2 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#FF4D00]/20">
                            <i className="fas fa-utensils text-[#FF4D00] mr-1"></i> Nuestras Estrellas
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-4 leading-tight">
                            Salteñas{' '}
                            <span className="relative inline-block text-[#FF4D00]">
                                Artesanales.
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Dulces, picantes, súper picantes y para hornear en casa. El auténtico sabor cruceño horneado a diario desde 1989.
                        </p>
                    </div>
                    <CarruselProductos products={PRODUCTOS_SALTENAS} />
                </div>
            </section>
        </div>
    );
};

export default CarruselSaltenas;
