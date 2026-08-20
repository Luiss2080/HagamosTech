import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';
import PageHero from '../../../components/func/MigasPan';
import useCarritoStore from '../../useCarritoStore';

const HeroCatalogo = () => {
  const openCart = useCarritoStore((s) => s.openCart);

  const acciones = [
    { label: 'Hacer pedido', icon: 'fa-cart-plus', color: 'from-[#FF4D00] to-[#CC3D00]', accion: 'pedido' },
    { label: 'Ver carrito', icon: 'fa-shopping-cart', color: 'from-[#5D3A1F] to-[#452A16]', accion: 'carrito' },
    { label: 'Delivery', icon: 'fa-motorcycle', color: 'from-[#8B4513] to-[#6B3410]', accion: 'delivery' },
    { label: 'Contacto', icon: 'fa-headset', color: 'from-[#CC3D00] to-[#AA3000]', accion: 'contacto' },
  ];

  const handleAccion = (accion: string) => {
    if (accion === 'carrito') {
      openCart();
    } else if (accion === 'delivery') {
      window.location.hash = '#/servicios/delivery';
    } else if (accion === 'contacto') {
      window.location.hash = '#/contactanos';
    } else if (accion === 'pedido') {
      document.getElementById('seccion-productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative">
      <div className="relative z-10">
        <CircuitBackground />
        <PageHero
          title="Nuestro"
          highlight="Catálogo."
          description="Explorá todas nuestras categorías y tipos de productos. Elegí lo que más te guste y armá tu pedido."
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto w-full">
            {acciones.map((acc, i) => (
              <button
                key={i}
                onClick={() => handleAccion(acc.accion)}
                className={`group relative flex flex-row items-center justify-start gap-3 rounded-[1.2rem] bg-gradient-to-br ${acc.color} text-white py-3 px-4 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 overflow-hidden border border-white/20`}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                <div className="relative z-10 w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-base shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <i className={`fas ${acc.icon}`}></i>
                </div>
                <span className="relative z-10 text-[10px] font-black uppercase tracking-widest text-left leading-tight">{acc.label}</span>
              </button>
            ))}
          </div>
        </PageHero>
      </div>
    </div>
  );
};

export default HeroCatalogo;
