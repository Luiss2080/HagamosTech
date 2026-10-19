import React from 'react';
import FondoTech from '../../../components/fondos/FondoTech';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';

const VALUES = [
  {
    title: <>Tu necesidad,<br /><span className="text-[#A3E635]">nuestra solución.</span></>,
    label: 'Nuestra misión',
    description: 'Convertir problemas, necesidades e ideas en soluciones reales con tecnología, creatividad y conocimiento. Analizamos cada caso para encontrar un camino posible.',
    icon: 'fa-bullseye',
    features: ['fa-lightbulb', 'fa-handshake', 'fa-star'],
    vision: false,
  },
  {
    title: <>La puerta a lo<br /><span className="text-[#171717]">digital.</span></>,
    label: 'Nuestra visión',
    description: 'Ser una marca de soluciones digitales multidisciplinaria, cercana a personas, estudiantes, emprendimientos y empresas, sin importar el tamaño de su necesidad.',
    icon: 'fa-eye',
    features: ['fa-globe', 'fa-rocket', 'fa-users'],
    vision: true,
  },
];

const MisionVision = ({ embedded = false }) => {
  const cards = (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
      {VALUES.map((item) => (
        <article key={item.label} className={`group relative flex min-h-[310px] flex-col items-center justify-center overflow-hidden rounded-[1.75rem] border p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,.24)] transition duration-300 hover:-translate-y-1 sm:min-h-[330px] sm:p-8 ${item.vision ? 'border-[#A3E635]/40 bg-gradient-to-br from-[#B8F34D] via-[#A3E635] to-[#8FD322] text-[#0A0A0A]' : 'border-white/10 bg-gradient-to-br from-[#11140D] via-[#0B0D09] to-[#090A08] text-white'}`}>
          <CircleParticles count={8} colorScheme={item.vision ? 'light' : 'dark'} />
          <div aria-hidden="true" className={`pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full blur-[70px] ${item.vision ? 'bg-white/25' : 'bg-[#A3E635]/15'}`} />
          <div className="relative z-10 flex max-w-xl flex-col items-center">
            <span className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[9px] font-black uppercase tracking-[.2em] ${item.vision ? 'border-black/10 bg-black/[.06] text-black/80' : 'border-[#A3E635]/25 bg-[#A3E635]/[.08] text-[#A3E635]'}`}>
              <i className={`fa-solid ${item.icon}`} aria-hidden="true" /> {item.label}
            </span>
            <h2 className={`text-3xl font-black uppercase leading-[1.03] tracking-tight sm:text-4xl lg:text-[2.65rem] ${item.vision ? 'text-[#0A0A0A]' : 'text-white'}`}>{item.title}</h2>
            <p className={`mt-4 max-w-lg text-xs font-semibold leading-relaxed sm:text-sm ${item.vision ? 'text-[#0A0A0A]/80' : 'text-slate-300'}`}>
              {item.description}
            </p>
            <div className="mt-5 flex justify-center gap-2.5" aria-hidden="true">
              {item.features.map((icon, index) => (
                <span key={icon} className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm transition group-hover:-translate-y-0.5 ${item.vision ? (index === 1 ? 'border-black/10 bg-black text-[#A3E635]' : 'border-black/10 bg-black/[.08] text-black') : (index === 1 ? 'border-[#A3E635]/40 bg-[#A3E635] text-black' : 'border-[#A3E635]/20 bg-[#A3E635]/10 text-[#A3E635]')}`}>
                  <i className={`fa-solid ${icon}`} />
                </span>
              ))}
            </div>
          </div>
          <i aria-hidden="true" className={`fa-solid ${item.icon} pointer-events-none absolute -bottom-7 ${item.vision ? '-right-5 text-black/[.05]' : '-left-5 text-white/[.04]'} text-[8rem] transition-transform duration-500 group-hover:scale-105`} />
        </article>
      ))}
    </div>
  );

  if (embedded) {
    return <div id="mision" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 pb-14 sm:pb-16">{cards}</div>;
  }

  return (
    <section id="mision" className="relative isolate overflow-hidden px-6 py-14 text-white sm:py-16">
      <FondoTech />
      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mx-auto mb-8 max-w-3xl text-center">
          <h1 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">Misión y <span className="text-[#A3E635]">visión</span></h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">El propósito que guía nuestro trabajo y la dirección que queremos construir.</p>
        </header>
        {cards}
      </div>
    </section>
  );
};

export default MisionVision;
