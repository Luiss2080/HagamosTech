import React, { useState, useEffect } from 'react';
import { 
  Store, ShoppingCart, TrendingUp, BarChart, ArrowRight, 
  CheckCircle2, Globe, Cpu, Users, Zap, ShieldCheck 
} from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import TestimonialCarousel from '../../../components/carouseles/CarruselTestimonios';

const DynamicDashboard = () => {
  const [revenue, setRevenue] = useState(12450);
  const [users, setUsers] = useState(842);
  const [conversion, setConversion] = useState(3.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue(prev => prev + Math.floor(Math.random() * 50));
      setUsers(prev => prev + (Math.random() > 0.7 ? 1 : 0));
      setConversion(prev => +(prev + (Math.random() * 0.1 - 0.05)).toFixed(2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-16 p-1 rounded-[2rem] bg-gradient-to-br from-[#A3E635]/30 via-neutral-800 to-[#84CC16]/10 shadow-[0_0_50px_rgba(163,230,53,0.15)] animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      <div className="bg-[#050505] rounded-[1.8rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between border border-neutral-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#A3E635]/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        {/* Metric 1 */}
        <div className="flex-1 text-center md:text-left z-10 w-full md:w-auto p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 hover:bg-neutral-900 hover:border-[#A3E635]/30 transition-all">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
            <TrendingUp size={14} className="text-[#A3E635]" /> Ingresos (Mensual)
          </p>
          <p className="text-3xl md:text-4xl font-black text-white font-mono">${revenue.toLocaleString()}</p>
        </div>

        {/* Metric 2 */}
        <div className="flex-1 text-center md:text-left z-10 w-full md:w-auto p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 hover:bg-neutral-900 hover:border-[#A3E635]/30 transition-all">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
            <Users size={14} className="text-[#A3E635]" /> Tráfico Activo
          </p>
          <p className="text-3xl md:text-4xl font-black text-white font-mono">{users}</p>
        </div>

        {/* Metric 3 */}
        <div className="flex-1 text-center md:text-left z-10 w-full md:w-auto p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 hover:bg-neutral-900 hover:border-[#A3E635]/30 transition-all">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
            <Zap size={14} className="text-[#A3E635]" /> Conversión Web
          </p>
          <p className="text-3xl md:text-4xl font-black text-[#A3E635] font-mono">{conversion}%</p>
        </div>
      </div>
    </div>
  );
};

const SOLUCIONES = [
  {
    title: 'E-Commerce & Ventas',
    desc: 'Tiendas virtuales de alto rendimiento. Conectamos pasarelas de pago, inventarios y logística.',
    icon: <ShoppingCart size={20} />,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Inteligencia de Negocios',
    desc: 'Dashboards automatizados que consolidan tu información financiera, operativa y comercial.',
    icon: <BarChart size={20} />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Presencia Omnicanal',
    desc: 'Llevamos tu negocio local al entorno digital, integrando Google, redes y tu propia web.',
    icon: <Store size={20} />,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Automatización (ERPs)',
    desc: 'Integramos sistemas que facturan y organizan tu empresa solos, despidiéndote del Excel manual.',
    icon: <Cpu size={20} />,
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Gestión de Clientes',
    desc: 'Fideliza y administra a tus clientes desde una plataforma centralizada y fácil de usar.',
    icon: <Users size={20} />,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Ciberseguridad',
    desc: 'Garantizamos que los datos de tu empresa y tus transacciones estén encriptados y protegidos.',
    icon: <ShieldCheck size={20} />,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
  }
];

const SolucionesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
      {SOLUCIONES.map((item, idx) => (
        <div key={idx} className="rounded-[2rem] bg-neutral-900/40 border border-neutral-800 hover:bg-neutral-900 transition-colors group overflow-hidden relative flex flex-col">
          <div className="h-1/2 w-full overflow-hidden relative">
             <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
             <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent"></div>
          </div>
          <div className="p-6 relative z-10 -mt-10 flex flex-col justify-end flex-grow">
            <div className="w-12 h-12 rounded-xl bg-black border border-neutral-800 flex items-center justify-center text-[#A3E635] mb-4 group-hover:-rotate-12 transition-transform shadow-lg relative z-20">
              {item.icon}
            </div>
            <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm font-medium">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProcessTimeline = () => {
  const steps = [
    { title: 'Auditoría Digital', desc: 'Analizamos tus cuellos de botella actuales y fugas de capital.', icon: <BarChart size={20} /> },
    { title: 'Arquitectura de Solución', desc: 'Diseñamos la plataforma web o el sistema de automatización.', icon: <Store size={20} /> },
    { title: 'Desarrollo e Integración', desc: 'Programamos y conectamos pasarelas de pago, inventarios y CRMs.', icon: <Cpu size={20} /> },
    { title: 'Escalamiento y Soporte', desc: 'Tu negocio crece, nuestro sistema lo soporta 24/7 sin caídas.', icon: <TrendingUp size={20} /> },
  ];

  return (
    <div className="relative border-l-2 border-neutral-800 ml-6 md:ml-10 py-10">
      {steps.map((step, idx) => (
        <div key={idx} className="mb-16 relative pl-10 md:pl-16 group">
          <div className="absolute left-[-21px] top-0 w-10 h-10 rounded-full bg-black border-2 border-neutral-800 flex items-center justify-center text-[#A3E635] group-hover:border-[#A3E635] group-hover:bg-[#A3E635]/10 transition-colors duration-500 shadow-lg">
            {step.icon}
          </div>
          <div className="bg-neutral-900/30 p-6 rounded-2xl border border-neutral-800/50 hover:bg-neutral-900/60 transition-colors duration-300">
            <h4 className="text-xl font-black text-white mb-2 flex items-center gap-3">
              <span className="text-[#A3E635] text-xs font-mono">STEP 0{idx + 1}</span> {step.title}
            </h4>
            <p className="text-slate-400 font-medium">{step.desc}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-0 left-[-6px] w-3 h-3 rounded-full bg-[#A3E635] animate-ping"></div>
    </div>
  );
};

const TESTIMONIOS = [
  { name: 'Grupo Inmobiliario', role: 'CEO', text: 'El CRM a medida y la web interactiva que construyeron triplicó nuestra captación de leads. Una inversión que se pagó sola en 2 meses.' },
  { name: 'Retailer Nacional', role: 'Gerente de E-Commerce', text: 'Migrar a una plataforma robusta con HagamosTech eliminó nuestras caídas en Black Friday. Transacciones fluidas y un dashboard increíble.' },
  { name: 'Clínica Médica', role: 'Director Operativo', text: 'Automatizar las citas y el cobro nos ahorró 4 horas diarias de trabajo administrativo. La tecnología es de primer nivel.' }
];

const Negocios = () => {
  return (
    <div className="dark relative overflow-hidden min-h-screen bg-[#050505] font-montserrat">
      <CircuitBackground />
      <CircleParticles colorScheme="dark" />
      
      {/* Dynamic Grid Background for Tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-20"></div>
      
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100%] h-[60%] bg-[#A3E635]/5 rounded-[100%] blur-[150px] pointer-events-none"></div>

      {/* HERO SECTION - IMMERSIVE DASHBOARD */}
      <section className="relative pt-32 pb-10 z-10 px-6">
        <div className="container mx-auto max-w-7xl text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 text-xs font-black uppercase tracking-widest text-[#A3E635] mb-8 animate-fade-in-up">
            <Globe size={16} /> Ecosistema Corporativo
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up uppercase tracking-tighter" style={{ animationDelay: '0.1s' }}>
            Tu Negocio en <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] via-yellow-300 to-[#84CC16]">Piloto Automático</span>
          </h1>
          
          <p className="text-slate-400 text-base md:text-lg max-w-2xl font-medium mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Desarrollamos tecnología que reemplaza el trabajo manual. Desde tiendas en línea de conversión extrema hasta sistemas ERPs que manejan tus datos en tiempo real.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a href="https://wa.me/59161320004?text=Hola,%20quiero%20digitalizar%20mi%20empresa" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#A3E635] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#84CC16] transition-all hover:scale-105 shadow-lg shadow-[#A3E635]/20 flex items-center justify-center gap-2">
              Analizar mi Modelo de Negocio <ArrowRight size={16} />
            </a>
          </div>

          <DynamicDashboard />
        </div>
      </section>

      {/* METRICS ASIDE */}
      <section className="py-12 z-10 relative px-6 border-b border-neutral-900 bg-neutral-950/50">
        <div className="container mx-auto max-w-7xl">
           <div className="flex flex-wrap justify-center gap-10 md:gap-24 opacity-80">
              <div className="text-center">
                <h4 className="text-3xl font-black text-white">x3</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Ventas Promedio</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-black text-white">-40%</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Costos Operativos</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-black text-white">24/7</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Operación Continua</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-black text-white">100%</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Medible y Escalable</p>
              </div>
           </div>
        </div>
      </section>

      {/* BENTO BOX GRID SECTION */}
      <section className="py-24 z-10 relative px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Soluciones <span className="text-[#A3E635]">Integrales</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">
              Un ecosistema digital donde cada pieza de software trabaja para ti, reduciendo márgenes de error e impulsando tus KPIs al límite.
            </p>
          </div>

          <SolucionesGrid />
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-24 z-10 relative px-6 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            <div className="w-full lg:w-1/3 sticky top-32">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                Tu Camino a la <br/> <span className="text-[#A3E635]">Digitalización</span>
              </h2>
              <p className="text-slate-400 font-medium mb-8">
                No vendemos código genérico. Construimos estrategias tangibles y sistemas que se acoplan perfectamente al ADN de tu empresa.
              </p>
              <div className="p-6 rounded-2xl bg-[#A3E635]/10 border border-[#A3E635]/30">
                <h4 className="font-black text-white mb-2 flex items-center gap-2"><ShieldCheck className="text-[#A3E635]" size={20}/> Garantía de Éxito</h4>
                <p className="text-sm text-slate-400">Todo desarrollo viene con acompañamiento y escalabilidad garantizada por contrato.</p>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <ProcessTimeline />
            </div>

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
          <div className="p-10 md:p-20 rounded-[3rem] bg-[#A3E635] text-black text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80')] opacity-5 mix-blend-overlay object-cover pointer-events-none group-hover:opacity-[0.15] transition-opacity duration-700"></div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-6 relative z-10 uppercase tracking-tighter">
              El mercado no te <br className="hidden md:block" /> va a esperar.
            </h2>
            <p className="text-lg md:text-xl font-bold opacity-80 mb-10 max-w-2xl mx-auto relative z-10">
              Cada día sin digitalizar es un cliente que le regalas a la competencia. Moderniza tu empresa hoy mismo.
            </p>
            <a href="https://wa.me/59161320004?text=Hola,%20es%20hora%20de%20digitalizar%20mi%20negocio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl relative z-10 hover:shadow-[#000]/50">
              Solicitar Presupuesto <Zap size={18} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Negocios;
