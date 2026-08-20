import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';
import CarruselProductos from '../../../components/carouseles/CarruselProductos';

const PRODUCTOS_CAFETERIA = [
  { id: 'caf-1', name: 'Café Americano Regular', subtitle: 'El Clásico', icon: 'fa-mug-hot', type: 'Caliente', desc: 'Intenso y aromático. El compañero perfecto para tus salteñas de la mañana.', price: 'Bs. 8', coverImg: '/img/05_Productos/Cafe/Americano.png', includes: ['Café boliviano', 'Azúcar', 'Crema'] },
  { id: 'caf-2', name: 'Café Americano Doble', subtitle: 'Carga Extra', icon: 'fa-mug-hot', type: 'Caliente', desc: 'Doble shot para los que necesitan ese empujón al empezar el día. Sin excusas.', price: 'Bs. 12', coverImg: '/img/05_Productos/Cafe/Espresso.png', includes: ['Doble shot', 'Azúcar', 'Crema'] },
  { id: 'caf-3', name: 'Capuccino Espumoso', subtitle: 'Suave y Cremoso', icon: 'fa-mug-saucer', type: 'Caliente', desc: 'Espresso con leche vaporizada y espuma sedosa. Suavidad con carácter.', price: 'Bs. 12', coverImg: '/img/05_Productos/Cafe/Capuccino.png', includes: ['Espresso', 'Leche vaporizada', 'Espuma'] },
  { id: 'caf-4', name: 'Capuccino Doble Shot', subtitle: 'Doble Intensidad', icon: 'fa-mug-saucer', type: 'Caliente', desc: 'Más cremoso, más intenso. El doble de todo lo que te gusta del capuccino.', price: 'Bs. 16', coverImg: '/img/05_Productos/Cafe/Mokaccino.png', includes: ['Doble Espresso', 'Leche vaporizada', 'Espuma'] },
  { id: 'caf-5', name: 'Espresso Puro', subtitle: 'Intensidad Pura', icon: 'fa-mug-hot', type: 'Caliente', desc: 'Para puristas. La esencia del café concentrada en un sorbo sin distracciones.', price: 'Bs. 10', coverImg: '/img/05_Productos/Cafe/Espresso.png', includes: ['Doble shot espresso', 'Crema natural'] },
  { id: 'caf-6', name: 'Chocolatada Caliente', subtitle: 'Abrigo Dulce', icon: 'fa-mug-hot', type: 'Caliente', desc: 'Chocolate cremoso bien caliente. El abrazo reconfortante para los días fríos.', price: 'Bs. 10', coverImg: '/img/05_Productos/Cafe/Chocolatada.png', includes: ['Chocolate', 'Leche', 'Crema batida'] },
  { id: 'caf-7', name: 'Mokaccino Cremoso', subtitle: 'Fusión Perfecta', icon: 'fa-mug-hot', type: 'Caliente', desc: 'Café y chocolate en armonía. Dulce, cremoso y absolutamente irresistible.', price: 'Bs. 14', coverImg: '/img/05_Productos/Cafe/Mokaccino.png', includes: ['Espresso', 'Chocolate', 'Leche', 'Crema'] },
  { id: 'caf-8', name: 'Frapuccino de Chocolate', subtitle: 'Frescura Helada', icon: 'fa-blender', type: 'Helado', desc: 'Bebida helada de chocolate con café. Refrescante y deliciosamente cremosa.', price: 'Bs. 18', coverImg: '/img/05_Productos/Frapuccinos/FrapuccinoChocolate.png', includes: ['Café', 'Chocolate', 'Hielo', 'Crema'] },
  { id: 'caf-9', name: 'Frapuccino Dulce de Leche', subtitle: 'Antojo Irresistible', icon: 'fa-blender', type: 'Helado', desc: 'El sabor inconfundible del dulce de leche en un frapuccino para chuparse los dedos.', price: 'Bs. 18', coverImg: '/img/05_Productos/Frapuccinos/FrapuccinoDulceDeLeche.png', includes: ['Café', 'Dulce de leche', 'Hielo', 'Crema'] },
  { id: 'caf-10', name: 'Frapuccino Clásico', subtitle: 'El Original', icon: 'fa-blender', type: 'Helado', desc: 'Suave, refrescante y perfecto para los días de calor en Santa Cruz. Un clásico.', price: 'Bs. 16', coverImg: '/img/05_Productos/Frapuccinos/FrapuccinoRegular.png', includes: ['Café', 'Leche', 'Hielo', 'Crema'] }
];

const CarruselCafeteria = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="w-full px-2 sm:px-4 relative z-20">
                    <div className="text-center mb-2 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#5D3A1F]/20">
                            <i className="fas fa-mug-hot text-[#5D3A1F] mr-1"></i> Cafetería de Especialidad
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-4 leading-tight">
                            Café y{' '}
                            <span className="relative inline-block text-[#5D3A1F]">
                                Frapuccinos.
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Desde el espresso más intenso hasta el frapuccino más cremoso. El maridaje perfecto para acompañar tus salteñas.
                        </p>
                    </div>
                    <CarruselProductos products={PRODUCTOS_CAFETERIA} />
                </div>
            </section>
        </div>
    );
};

export default CarruselCafeteria;
