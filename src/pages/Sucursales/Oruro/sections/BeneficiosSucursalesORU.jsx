import React from 'react';
import CircuitBackground from '../../../../components/fondos/FondoSaltenas';
import CircleParticles from '../../../../components/fondos/ParticulasCirculares';

const BENEFICIOS = [
  { icon: 'fa-bolt', title: 'Servicio Rápido', desc: 'Sabemos que tu tiempo vale. En Oruro te atendemos con la misma eficiencia y calidez que nos caracteriza en todo el país.' },
  { icon: 'fa-leaf', title: 'Ingredientes Frescos', desc: 'Seleccionamos los mejores insumos cada día. Nada se recicla, todo se prepara fresco para garantizar el sabor inigualable.' },
  { icon: 'fa-medal', title: 'Calidad Garantizada', desc: 'Más de 35 años de tradición nos respaldan. Cada salteña lleva nuestra promesa de excelencia donde sea que estés.' },
  { icon: 'fa-hand-holding-heart', title: 'Atención Cercana', desc: 'Acabamos de llegar a Oruro y ya te recibimos con los brazos abiertos. Sos parte de la familia HagamosTech.' }
];

const BeneficiosSucursalesORU = () => {
    return (
        <div className="relative">
            <section className="relative z-10 pt-4 pb-24">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-6xl relative z-20">
                    <div className="text-center mb-6 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#8B4513]/10 text-[#8B4513] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#8B4513]/20">
                            <i className="fas fa-star text-[#8B4513] mr-1"></i> Nuestra Promesa
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-6 leading-tight">
                            El sabor que nos{' '}
                            <span className="relative inline-block text-[#FF4D00]">
                                distingue.
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Acabamos de llegar a Oruro con toda nuestra tradición. La misma calidad que disfrutan en Santa Cruz y Cochabamba, ahora más cerca de vos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {BENEFICIOS.map((item, i) => (
                            <div key={i} className={`relative rounded-[2.5rem] p-8 sm:p-10 transition-all duration-500 group overflow-hidden border hover:-translate-y-2 z-10 ${i % 2 === 0 ? 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-2xl shadow-orange-500/20' : 'bg-[#8B4513] text-white border-[#8B4513] shadow-xl shadow-[#8B4513]/20'}`}>
                                <CircleParticles count={14} colorScheme="dark" />
                                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-2/5 h-1.5 rounded-b-xl z-10 ${i % 2 === 0 ? 'bg-[#8B4513]' : 'bg-[#FF4D00]'}`}></div>

                                <div className="relative z-10 flex flex-col items-center text-center h-full">
                                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-2 ${i % 2 === 0 ? 'bg-white/20 border-white/20' : 'bg-white/10 border-white/15'}`}>
                                        <i className={`fas ${item.icon}`}></i>
                                    </div>
                                    <h3 className="text-xl font-black mb-4 tracking-tight">{item.title}</h3>
                                    <p className="text-sm font-medium leading-relaxed opacity-90 max-w-xs">{item.desc}</p>

                                    <div className="mt-6 pt-4 border-t border-white/15 w-full">
                                        <div className="flex justify-center gap-1.5">
                                            {[...Array(3)].map((_, j) => (
                                                <div key={j} className={`w-2 h-2 rounded-full ${j === 0 ? (i % 2 === 0 ? 'bg-white' : 'bg-[#FF4D00]') : 'bg-white/30'}`}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BeneficiosSucursalesORU;
