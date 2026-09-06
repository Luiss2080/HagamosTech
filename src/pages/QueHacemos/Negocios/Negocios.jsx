import React from 'react';
import { Store, ShoppingCart, TrendingUp, BarChart, ArrowRight, CheckCircle2, Award, Briefcase } from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import TestimonialCarousel from '../../../components/carouseles/CarruselTestimonios';

const BUSINESS_SERVICES = [
  {
    title: 'Digitalización Completa',
    desc: 'Llevamos tu negocio físico al mundo digital. Desde sistemas de inventario en la nube hasta presencia omnicanal, modernizando cada punto de contacto.',
    icon: <Store className="text-[#A3E635]" size={28} />,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['Transformación', 'Nube', 'Procesos']
  },
  {
    title: 'E-Commerce y Ventas Web',
    desc: 'Tiendas online de alta conversión. Optimizadas para velocidad extrema, pasarelas de pago seguras y una experiencia de usuario impecable.',
    icon: <ShoppingCart className="text-[#A3E635]" size={28} />,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    tags: ['Tienda Online', 'Pagos Seguros', 'Ventas']
  },
  {
    title: 'Automatización de Procesos',
    desc: 'Despídete de las tareas manuales y repetitivas. Integramos CRMs, ERPs y automatizamos tu flujo de trabajo para que tu equipo ahorre horas valiosas.',
    icon: <TrendingUp className="text-[#A3E635]" size={28} />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['CRMs', 'Integraciones', 'Eficiencia']
  },
  {
    title: 'Inteligencia de Negocios (BI)',
    desc: 'Tableros de control y análisis de datos en tiempo real. Toma decisiones basadas en métricas exactas, no en suposiciones, y escala con seguridad.',
    icon: <BarChart className="text-[#A3E635]" size={28} />,
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
    tags: ['Data', 'Dashboards', 'KPIs']
  }
];

const STATS = [
  { value: '+150%', label: 'Crecimiento Promedio' },
  { value: '24/7', label: 'Operación Automatizada' },
  { value: 'x3', label: 'Conversión Web' },
  { value: '-40%', label: 'Costos Operativos' }
];

const TESTIMONIOS = [
  { name: 'Carlos R.', role: 'Dueño de Retail', text: 'Pasar a vender online con la plataforma que nos desarrollaron triplicó nuestras ventas en el primer mes. Increíble.' },
  { name: 'Sofía M.', role: 'Gerente de Operaciones', text: 'Automatizaron nuestra facturación y control de inventario. Ahora nuestro equipo hace en horas lo que antes tomaba días enteros.' },
  { name: 'Javier T.', role: 'Director Comercial', text: 'El dashboard de inteligencia de negocios nos permitió ver exactamente dónde perdíamos dinero y cómo optimizar nuestra inversión publicitaria.' }
];

const Negocios = () => {
  return (
    <div className="dark relative overflow-hidden min-h-screen bg-[#050505] font-montserrat">
      <CircuitBackground />
      <CircleParticles colorScheme="dark" />
      
      {/* Background glow for hero */}
      <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[50%] bg-[#A3E635]/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 z-10 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 text-xs font-black uppercase tracking-widest text-[#A3E635] mb-6 animate-fade-in-up">
                <Briefcase size={16} /> Soluciones Corporativas
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up uppercase tracking-tighter" style={{ animationDelay: '0.1s' }}>
                Revoluciona tu <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#84CC16]">Modelo de Negocio</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg max-w-xl font-medium mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Digitalización, automatización de procesos y plataformas de comercio electrónico diseñadas para escalar tus ventas y reducir tus costos operativos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <a href="https://wa.me/59161320004?text=Hola,%20busco%20digitalizar%20y%20escalar%20mi%20negocio" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#A3E635] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#84CC16] transition-all hover:scale-105 shadow-lg shadow-[#A3E635]/20 flex items-center justify-center gap-2">
                  Agendar Consultoría <ArrowRight size={16} />
                </a>
              </div>
              
              {/* Quick checks */}
              <div className="mt-8 flex flex-col gap-3 text-sm font-bold text-slate-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-2"><CheckCircle2 className="text-[#A3E635]" size={18} /> Transformación Digital Integral</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="text-[#A3E635]" size={18} /> Optimización de Flujos de Trabajo</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="text-[#A3E635]" size={18} /> Presencia Online 24/7</div>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 animate-slide-left relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 group">
                <div className="absolute inset-0 bg-[#A3E635]/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                <img 
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1200&q=80" 
                  alt="Equipo corporativo discutiendo estrategias de negocio" 
                  className="w-full h-[400px] md:h-[550px] object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 right-6 z-20 bg-black/80 backdrop-blur-md border border-neutral-700 p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#A3E635] rounded-full flex items-center justify-center text-black">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-white font-black text-lg leading-none">ROI +</p>
                    <p className="text-slate-300 text-xs font-bold uppercase tracking-wider">Retorno Asegurado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="py-10 bg-neutral-900/50 border-y border-neutral-800 z-10 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-neutral-800">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center px-4">
                <h3 className="text-3xl md:text-5xl font-black text-[#A3E635] mb-1">{stat.value}</h3>
                <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZIG-ZAG FEATURE CARDS */}
      <section className="py-24 z-10 relative px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Impulsa tu <span className="text-[#A3E635]">Empresa</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">Tus competidores ya están automatizando sus operaciones. Mantente a la vanguardia con soluciones empresariales robustas y escalables.</p>
          </div>

          <div className="flex flex-col gap-24">
            {BUSINESS_SERVICES.map((srv, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16`}>
                  
                  {/* Image side */}
                  <div className="w-full md:w-1/2 relative group">
                    <div className="absolute -inset-4 bg-[#A3E635]/10 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img 
                      src={srv.image} 
                      alt={srv.title} 
                      className="w-full h-[300px] md:h-[400px] object-cover rounded-[2rem] border border-neutral-800 shadow-2xl relative z-10"
                    />
                  </div>

                  {/* Text side */}
                  <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                    <div className="w-14 h-14 rounded-2xl bg-[#A3E635]/10 border border-[#A3E635]/20 flex items-center justify-center mb-6">
                      {srv.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4">{srv.title}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed mb-6">{srv.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {srv.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-slate-300 text-[10px] font-black uppercase tracking-wider rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 relative z-10">
        <TestimonialCarousel testimonials={TESTIMONIOS.map((t, idx) => {
          const photos = [
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80'
          ];
          return { ...t, image: photos[idx % photos.length] };
        })} />
      </section>

      {/* BUSINESS CTA */}
      <section className="py-20 z-10 relative px-6 pb-32">
        <div className="container mx-auto max-w-5xl">
          <div className="p-10 md:p-16 rounded-[3rem] bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#A3E635] to-transparent opacity-50"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80')] opacity-5 mix-blend-overlay object-cover pointer-events-none group-hover:opacity-10 transition-opacity duration-700"></div>
            
            <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10 text-white uppercase tracking-tight">
              Escala sin <span className="text-[#A3E635]">Límites</span>
            </h2>
            <p className="text-base md:text-lg font-medium text-slate-400 mb-10 max-w-xl mx-auto relative z-10">
              Automatiza tus procesos hoy y prepárate para el crecimiento de mañana. Conversemos sobre las metas de tu negocio.
            </p>
            <a href="https://wa.me/59161320004?text=Hola,%20me%20interesa%20digitalizar%20mi%20negocio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-[#A3E635] text-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#84CC16] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(163,230,53,0.3)] relative z-10">
              Transformar mi Negocio <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Negocios;
