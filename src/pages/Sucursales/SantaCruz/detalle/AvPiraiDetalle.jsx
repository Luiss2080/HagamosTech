import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CircuitBackground from '../../../../components/fondos/FondoTech';
import CircleParticles from '../../../../components/fondos/ParticulasCirculares';
import PageHero from '../../../../components/func/MigasPan';

export const DetailAvPirai = () => {
  const [flipped, setFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('menu');
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [rotateDeg, setRotateDeg] = useState(0);
  const gallery = ['/img/10_sucursales/SantaCruz/03_Sucursal.png', '/img/10_sucursales/SantaCruz/01_Sucursal.png', '/img/10_sucursales/SantaCruz/02_Sucursal.png'];

  useEffect(() => { const t = setInterval(() => setGalleryIdx(prev => (prev + 1) % 3), 3500); return () => clearInterval(t); }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: ((e.clientX - rect.left) / rect.width - 0.5) * 30, y: ((e.clientY - rect.top) / rect.height - 0.5) * -30 });
  };

  const handleSpin = () => setRotateDeg(prev => prev + 360);

  // === FEATURES ===
  const features = [
    { icon: 'fa-sun', label: 'Apertura', value: '7:45 a.m.', color: 'bg-[#FF4D00]' },
    { icon: 'fa-bread-slice', label: 'Horneado', value: 'Desde 4:00 am', color: 'bg-[#5D3A1F]' },
    { icon: 'fa-mug-hot', label: 'Café', value: 'Cortesía 7-9am', color: 'bg-[#8B4513]' },
    { icon: 'fa-ticket', label: 'Descuento', value: '10% antes 8:30', color: 'bg-[#CC3D00]' },
  ];

  // === MENU ===
  const menuItems = [
    { icon: 'fa-drumstick-bite', name: 'Salteña de Carne', price: 'Bs. 7', desc: 'Nuestra clásica a precio especial de madrugada. Misma calidad.', tag: 'Oferta' },
    { icon: 'fa-drumstick-bite', name: 'Salteña de Pollo', price: 'Bs. 7', desc: 'Pollo al jugo con crema de hierbas. Suave y deliciosa.', tag: 'Suave' },
    { icon: 'fa-mug-hot', name: 'Café Americano', price: 'Bs. 4', desc: 'Gratis de 7:00 a 9:00 a.m. con cualquier compra.', tag: 'Cortesía' },
    { icon: 'fa-blender', name: 'Jugo de Naranja', price: 'Bs. 8', desc: 'Recién exprimido. Vitamina C para arrancar el día.', tag: 'Natural' },
    { icon: 'fa-bread-slice', name: 'Pan con Queso', price: 'Bs. 3', desc: 'Marraqueta crujiente con queso criollo derretido.', tag: 'Simple' },
    { icon: 'fa-cake-candles', name: 'Empanada Dulce', price: 'Bs. 4', desc: 'Rellena de dulce de leche y espolvoreada con azúcar.', tag: 'Postre' },
  ];

  // === COMBOS ===
  const combos = [
    { qty: 'x6', name: 'Combo Familiar', price: 'Bs. 42', icon: 'fa-users', desc: '6 salteñas surtidas + 2 jugos grandes' },
    { qty: 'x12', name: 'Combo Oficina', price: 'Bs. 78', icon: 'fa-briefcase', desc: '12 salteñas + 4 jugos + delivery' },
    { qty: 'x24', name: 'Combo Evento', price: 'Bs. 148', icon: 'fa-cake-candles', desc: '24 salteñas + 6 jugos + caja regalo' },
    { qty: 'x50', name: 'Combo Empresa', price: 'Bs. 290', icon: 'fa-building', desc: '50 salteñas + 12 jugos + mesero' },
  ];

  // === TIMELINE ===
  const timeline = [
    { year: '2012', title: 'Inauguración', desc: 'Abrimos con 2 empleados y 4 mesas. El primer día vendimos 150 salteñas.' },
    { year: '2015', title: 'Primera Expansión', desc: 'Sumamos el mostrador de jugos y doblamos la capacidad.' },
    { year: '2019', title: 'Reconocimiento', desc: 'Elegidos "La salteñería de los madrugadores" por la comunidad.' },
    { year: '2024', title: 'Hoy', desc: '500+ clientes diarios, pedido express en 3 minutos, la favorita de la zona norte.' },
  ];

  // === RESEÑAS ===
  const reviews = [
    { name: 'María G.', stars: 5, text: 'Las salteñas de carne son las mejores que probé en Santa Cruz. Siempre calentitas y jugosas.', tag: 'Cliente Frecuente' },
    { name: 'Carlos R.', stars: 5, text: 'El delivery es rapidísimo. Pedí para una reunión y llegaron en 20 minutos.', tag: 'Pedido Corporativo' },
    { name: 'Andrea L.', stars: 5, text: 'El café de cortesía con una salteña de pollo es mi combinación favorita.', tag: 'Desayuno Favorito' },
    { name: 'Pedro M.', stars: 4, text: 'La de fricasé es picante exacto. Solo mejorar el tiempo de espera los sábados.', tag: 'Sabor Auténtico' },
    { name: 'Lucía T.', stars: 5, text: 'Celebramos un cumpleaños y nos armaron un combo especial. ¡Increíble!', tag: 'Evento Familiar' },
    { name: 'Diego V.', stars: 5, text: 'Vengo casi todos los días. El café para clientes frecuentes se agradece.', tag: 'Cliente Diario' },
  ];

  // === DATOS ===
  const datos = [
    { num: '35+', label: 'Años de receta', icon: 'fa-scroll', desc: 'La misma fórmula desde 1989', color: 'from-[#FF4D00] to-[#CC3D00]' },
    { num: '1,200', label: 'Salteñas diarias', icon: 'fa-fire', desc: 'Horneadas en el día, nada reciclado', color: 'from-[#5D3A1F] to-[#452A16]' },
    { num: '12', label: 'Colaboradores', icon: 'fa-people-group', desc: 'Equipo dedicado a tu servicio', color: 'from-[#8B4513] to-[#6B3410]' },
    { num: '98%', label: 'Satisfacción', icon: 'fa-face-smile', desc: 'Basado en nuestras encuestas', color: 'from-[#CC3D00] to-[#AA3000]' },
  ];

  // === PROCESO ===
  const proceso = [
    { step: '01', icon: 'fa-phone', title: 'Pedí', desc: 'Llamanos o escribinos por WhatsApp. Decinos cuántas salteñas y de qué tipo.' },
    { step: '02', icon: 'fa-fire-burner', title: 'Horneamos', desc: 'Cada pedido se hornea en el momento. Nada está pre-cocido.' },
    { step: '03', icon: 'fa-face-smile', title: 'Disfrutá', desc: 'Recibí tu pedido calentito. En el local, para llevar o en tu casa.' },
  ];

  // === FAQ ===
  const faqs = [
    { q: '¿Hacen delivery a toda la ciudad?', a: 'Sí, cubrimos toda la zona urbana. Delivery gratis en pedidos de 12+ salteñas dentro del 3er anillo.' },
    { q: '¿Puedo reservar para un grupo grande?', a: '¡Claro! Llamá con 24 horas de anticipación. Tenemos capacidad para grupos de hasta 45 personas.' },
    { q: '¿Tienen opciones sin picante?', a: 'Sí, nuestras salteñas de carne y pollo son suaves. Solo la de fricasé es picante.' },
    { q: '¿Aceptan pagos con tarjeta?', a: 'Aceptamos efectivo, QR Simple y transferencias. Próximamente POS para tarjetas.' },
  ];

  // === COMPARATIVA ===
  const comparativa = [
    { l: 'Salteñas recalentadas del día anterior', r: 'Horneado fresco desde las 4:00 a.m.', icon: 'fa-clock' },
    { l: 'Atención lenta, filas largas', r: 'Pedido express listo en 3 minutos', icon: 'fa-bolt' },
    { l: 'Sin café ni bebidas incluidas', r: 'Café de cortesía de 7:00 a 9:00 a.m.', icon: 'fa-mug-hot' },
    { l: 'Precios altos, poca variedad', r: 'Precios justos, 10% descuento antes 8:30', icon: 'fa-ticket' },
  ];

  // === EVENTOS ===
  const eventos = [
    { day: 'Lunes', icon: 'fa-book-open', title: 'Club de Lectura', desc: 'Intercambio de libros y charla literaria con café de cortesía. 9:00–11:00 a.m.' },
    { day: 'Miércoles', icon: 'fa-paint-brush', title: 'Arte y Salteñas', desc: 'Exposición de artistas locales. Inauguración con degustación gratuita.' },
    { day: 'Viernes', icon: 'fa-music', title: 'Jazz Morning', desc: 'Trío de jazz en vivo mientras desayunás. 9:00 a.m.' },
    { day: 'Sábados', icon: 'fa-seedling', title: 'Mercado Orgánico', desc: 'Productores locales con miel, quesos, panes y frutas. 8:00–12:00.' },
  ];

  // === CAFE ===
  const cafetabs = [
    { key: 'cafe', label: 'Cafetería', icon: 'fa-mug-hot' },
    { key: 'saltenas', label: 'Salteñas', icon: 'fa-drumstick-bite' },
    { key: 'pasteleria', label: 'Pastelería', icon: 'fa-cake-candles' },
  ];
  const cafeMenu = [
    { icon: 'fa-mug-hot', name: 'Espresso', price: 'Bs. 12', desc: 'Café colombiano, extracción perfecta.', tag: 'Premium' },
    { icon: 'fa-mug-saucer', name: 'Capuccino', price: 'Bs. 16', desc: 'Espuma cremosa, toque de canela.', tag: 'Clásico' },
    { icon: 'fa-mug-hot', name: 'Mocaccino', price: 'Bs. 18', desc: 'Chocolate belga 70% + café + leche.', tag: 'Dulce' },
    { icon: 'fa-ice-cream', name: 'Affogato', price: 'Bs. 22', desc: 'Helado artesanal + espresso caliente.', tag: 'Gourmet' },
  ];
  const saltenasMenu = [
    { icon: 'fa-drumstick-bite', name: 'Salteña de Carne', price: 'Bs. 9', desc: 'Corte premium de res, jugosa.', tag: 'Clásica' },
    { icon: 'fa-drumstick-bite', name: 'Salteña de Pollo', price: 'Bs. 9', desc: 'Pechuga, crema de hierbas finas.', tag: 'Suave' },
    { icon: 'fa-leaf', name: 'Salteña Capresse', price: 'Bs. 11', desc: 'Tomate, albahaca, mozzarella.', tag: 'Veggie' },
    { icon: 'fa-cheese', name: 'Salteña 4 Quesos', price: 'Bs. 12', desc: 'Gouda, parmesano, azul y crema.', tag: 'Gourmet' },
  ];
  const pasteleriaMenu = [
    { icon: 'fa-cake-candles', name: 'Cheesecake', price: 'Bs. 20', desc: 'New York style, frutos rojos.', tag: 'Premium' },
    { icon: 'fa-cookie', name: 'Brownie', price: 'Bs. 15', desc: 'Chocolate 70% cacao, nueces.', tag: 'Intenso' },
    { icon: 'fa-bread-slice', name: 'Croissant', price: 'Bs. 10', desc: 'Manteca francesa, hojaldrado.', tag: 'Artesanal' },
    { icon: 'fa-candy-cane', name: 'Alfajor', price: 'Bs. 8', desc: 'Dulce de leche, coco, chocolate.', tag: 'Dulce' },
  ];
  const tabMenu = activeTab === 'cafe' ? cafeMenu : activeTab === 'saltenas' ? saltenasMenu : pasteleriaMenu;

  // === AMBIENTE ===
  const ambiente = [
    { icon: 'fa-music', label: 'Jazz en Vivo', value: 'Viernes y sábados', desc: 'Trío de jazz local ameniza tu desayuno' },
    { icon: 'fa-book-open', label: 'Biblioteca', value: 'Libre intercambio', desc: 'Dejá un libro, llevate otro. Más de 200 títulos' },
    { icon: 'fa-palette', label: 'Galería de Arte', value: 'Artistas locales', desc: 'Exposición rotativa mensual de pintores' },
    { icon: 'fa-wifi', label: 'Coworking', value: 'WiFi 500mb', desc: 'Mesas amplias con enchufes para trabajar' },
  ];

  // === CAFE GRANOS ===
  const granos = [
    { name: 'Caranavi Clásico', type: 'Lavado', notes: 'Chocolate, caramelo, nuez', roast: 'Medio', icon: 'fa-mountain' },
    { name: 'Samaipata Reserva', type: 'Natural', notes: 'Frutas rojas, miel, floral', roast: 'Claro', icon: 'fa-leaf' },
    { name: 'Blend HagamosTech', type: 'Honey', notes: 'Cacao, panela, fruta madura', roast: 'Medio-Oscuro', icon: 'fa-fire' },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10">
        <CircuitBackground />
        <PageHero
          title="Salteñas HagamosTech"
          highlight="Av. Piraí."
          description="Showcase de secciones: todas las ideas creativas reunidas en una sola página para que elijas cuáles te gustan."
        />
      </div>

      {/* ====== 1. FEATURES GRID (cards de colores) ====== */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 1 · Features Grid</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div key={i} className={`relative rounded-[2rem] p-6 ${f.color} text-white text-center overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default`}>
                <CircleParticles count={8} colorScheme="dark" />
                <div className="relative z-10">
                  <i className={`fas ${f.icon} text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300`}></i>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">{f.label}</p>
                  <p className="text-sm font-black leading-tight">{f.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 2. CARD 3D QUE SIGUE EL MOUSE ====== */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 2 · Card 3D (sigue el mouse)</span>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
            <CircuitBackground />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-20">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#8B4513] mb-4 leading-tight">La experiencia <span className="text-[#FF4D00]">completa</span></h2>
                <p className="text-slate-600 font-semibold mb-4 leading-relaxed">Esta card reacciona al movimiento de tu mouse. Ideal para destacar una imagen de la sucursal o una promo especial.</p>
                <div className="flex flex-wrap gap-2">
                  {['Terraza', 'Música', 'A/A', 'WiFi', 'Delivery', 'Pet Friendly'].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-[#FFF6F6] text-[#8B4513] text-[9px] font-black uppercase tracking-wider border border-orange-100">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center" onMouseMove={handleMouseMove} onMouseLeave={() => setMousePos({ x: 0, y: 0 })}>
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-[3rem] bg-gradient-to-br from-[#FF4D00] to-[#CC3D00] p-2 shadow-2xl shadow-orange-500/25 transition-transform duration-200 ease-out cursor-pointer" style={{ transform: `perspective(800px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) scale(1.02)` }}>
                  <div className="w-full h-full rounded-[2.7rem] overflow-hidden">
                    <img src="/img/10_sucursales/SantaCruz/03_Sucursal.png" alt="Av Pirai" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 3. CARD FLIP 3D (click para girar) ====== */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 3 · Card Flip 3D (click para girar)</span>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
            <CircuitBackground />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-20">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#8B4513] mb-4 leading-tight">Detrás de <span className="text-[#FF4D00]">la card</span></h2>
                <p className="text-slate-600 font-semibold mb-4 leading-relaxed">Hacé clic en la card para descubrir la info oculta. Perfecto para promociones, secretos de la casa o datos curiosos.</p>
                <div className="flex flex-wrap gap-2">
                  {['Madrugador', 'Express', 'Económico', 'Café gratis', 'Descuentos'].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-[#FFF6F6] text-[#8B4513] text-[9px] font-black uppercase tracking-wider border border-orange-100">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center" style={{ perspective: '1000px' }}>
                <div className="w-64 h-64 cursor-pointer" onClick={() => setFlipped(!flipped)} style={{ transformStyle: 'preserve-3d', transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                  <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#FF4D00] to-[#CC3D00] p-1.5 shadow-2xl shadow-orange-500/25 overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                    <img src="/img/10_sucursales/SantaCruz/02_Sucursal.png" alt="Av Pirai" className="w-full h-full object-cover rounded-[2.2rem]" />
                  </div>
                  <div className="absolute inset-0 rounded-[2.5rem] bg-[#5D3A1F] p-6 shadow-2xl flex flex-col items-center justify-center text-center text-white" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <CircleParticles count={12} colorScheme="dark" />
                    <div className="relative z-10">
                      <i className="fas fa-mug-hot text-4xl mb-3"></i>
                      <h4 className="text-xl font-black font-heading mb-2">Café de Cortesía</h4>
                      <p className="text-sm font-semibold text-white/80 mb-3">De 7:00 a 9:00 a.m. tu café va por cuenta de la casa con cualquier compra.</p>
                      <span className="inline-block px-3 py-1 rounded-full bg-[#FF4D00] text-[10px] font-black uppercase tracking-wider">¡Gratis!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 4. GALERÍA 3D CON SPIN ====== */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 4 · Galería con Spin 360°</span>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
            <CircuitBackground />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-20">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#8B4513] mb-4 leading-tight">Galería <span className="text-[#FF4D00]">interactiva</span></h2>
                <p className="text-slate-600 font-semibold mb-4 leading-relaxed">Auto-rota cada 3.5 segundos. Click en la imagen para girar 360°. Botones para cambiar manualmente de foto.</p>
                <div className="flex gap-2 flex-wrap">
                  {gallery.map((_, i) => (
                    <button key={i} onClick={() => setGalleryIdx(i)} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${i === galleryIdx ? 'bg-[#FF4D00] text-white' : 'bg-white border border-gray-200 text-slate-500 hover:border-[#FF4D00]'}`}>Foto {i + 1}</button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-full h-60 sm:h-72 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white cursor-pointer" onClick={handleSpin} style={{ perspective: '1000px' }}>
                  <div className="w-full h-full transition-transform duration-700 ease-out" style={{ transform: `rotateY(${rotateDeg}deg)` }}>
                    <img src={gallery[galleryIdx]} alt="Galería" className="w-full h-full object-cover" style={{ backfaceVisibility: 'hidden' }} />
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {[0, 1, 2].map(i => (<button key={i} onClick={(e) => { e.stopPropagation(); setGalleryIdx(i); }} className={`w-2.5 h-2.5 rounded-full transition-all ${i === galleryIdx ? 'bg-[#FF4D00] scale-125' : 'bg-white/70'}`} />))}
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400"><i className="fas fa-hand-pointer mr-1 text-[#FF4D00]"></i>Click en la imagen para girar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 5. MENÚ GRID (cards alternadas) ====== */}
      <section className="relative z-10 pb-12">
        <CircuitBackground />
        <div className="container mx-auto px-6 max-w-6xl relative z-20">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 5 · Menú Grid</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item, i) => (
              <div key={i} className={`relative rounded-[2rem] p-6 transition-all duration-500 group overflow-hidden border hover:-translate-y-2 z-10 text-center ${i % 2 === 0 ? 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-xl shadow-orange-500/20' : 'bg-[#5D3A1F] text-white border-[#5D3A1F] shadow-xl shadow-[#5D3A1F]/20'}`}>
                <CircleParticles count={8} colorScheme="dark" />
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1.5 rounded-b-xl z-10 ${i % 2 === 0 ? 'bg-[#5D3A1F]' : 'bg-[#FF4D00]'}`}></div>
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-3 mx-auto ${i % 2 === 0 ? 'bg-white/20' : 'bg-white/10'}`}><i className={`fas ${item.icon}`}></i></div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/15 text-[8px] font-black uppercase tracking-wider mb-2">{item.tag}</span>
                  <h4 className="text-lg font-black mb-1">{item.name}</h4>
                  <p className="text-2xl font-black mb-2">{item.price}</p>
                  <p className="text-xs font-medium opacity-80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 6. COMBOS ====== */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 6 · Combos y Precios</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {combos.map((c, i) => (
              <div key={i} className={`relative rounded-[2rem] p-6 transition-all duration-500 group overflow-hidden border hover:-translate-y-2 z-10 text-center ${i % 2 === 0 ? 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-xl shadow-orange-500/20' : 'bg-[#5D3A1F] text-white border-[#5D3A1F] shadow-xl shadow-[#5D3A1F]/20'}`}>
                <CircleParticles count={8} colorScheme="dark" />
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1.5 rounded-b-xl z-10 ${i % 2 === 0 ? 'bg-[#5D3A1F]' : 'bg-[#FF4D00]'}`}></div>
                <div className="relative z-10">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/15 text-[8px] font-black uppercase tracking-wider mb-3">{c.qty}</span>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-white/20 text-xl"><i className={`fas ${c.icon}`}></i></div>
                  <h4 className="text-lg font-black mb-1">{c.name}</h4>
                  <p className="text-2xl font-black mb-2">{c.price}</p>
                  <p className="text-xs font-medium opacity-80">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 7. MENÚ CON TABS ====== */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 7 · Menú con Tabs</span>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-md relative overflow-hidden">
            <CircuitBackground />
            <div className="text-center mb-6 relative z-20">
              <div className="inline-flex bg-[#FFF6F6] rounded-full p-1.5 border border-orange-100 shadow-sm gap-1">
                {cafetabs.map(tab => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === tab.key ? 'bg-[#8B4513] text-white shadow-md' : 'text-gray-500 hover:text-[#8B4513]'}`}>
                    <i className={`fas ${tab.icon} text-xs`}></i>{tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-20">
              {tabMenu.map((item, i) => (
                <div key={i} className="bg-[#FFF6F6] rounded-2xl p-5 border border-orange-100 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-[#8B4513]/10 flex items-center justify-center text-[#8B4513] text-xl mb-3 mx-auto"><i className={`fas ${item.icon}`}></i></div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#8B4513]/10 text-[#8B4513] text-[8px] font-black uppercase tracking-wider mb-2">{item.tag}</span>
                  <h4 className="font-black text-[#111827] mb-1">{item.name}</h4>
                  <p className="text-lg font-black text-[#8B4513] mb-1">{item.price}</p>
                  <p className="text-[10px] text-slate-500 font-semibold">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== 8. TIMELINE ====== */}
      <section className="relative z-10 pb-12">
        <CircuitBackground />
        <div className="container mx-auto px-6 max-w-4xl relative z-20">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 8 · Timeline Historia</span>
          </div>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF4D00] via-[#5D3A1F] to-[#FF4D00] -translate-x-1/2 hidden sm:block"></div>
            {timeline.map((item, i) => (
              <div key={i} className={`relative flex items-start gap-4 sm:gap-8 mb-6 sm:mb-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                <div className={`hidden sm:flex flex-1 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  <div className="bg-[#FFF6F6] rounded-2xl p-4 max-w-xs border border-orange-100 shadow-sm">
                    <p className="text-[10px] font-black text-[#FF4D00] uppercase tracking-wider mb-1">{item.year}</p>
                    <h4 className="text-sm font-black text-[#111827] mb-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 font-semibold">{item.desc}</p>
                  </div>
                </div>
                <div className="relative z-10 flex items-center justify-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#FF4D00] text-white flex items-center justify-center text-sm shadow-md shadow-orange-500/30 sm:absolute sm:left-1/2 sm:-translate-x-1/2"><i className="fas fa-circle text-[6px]"></i></div>
                </div>
                <div className="flex-1 sm:hidden"></div>
                <div className="sm:hidden bg-[#FFF6F6] rounded-2xl p-3 border border-orange-100 shadow-sm flex-1">
                  <p className="text-[10px] font-black text-[#FF4D00] uppercase tracking-wider mb-1">{item.year}</p>
                  <h4 className="text-sm font-black text-[#111827] mb-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 9. PROCESO PASO A PASO ====== */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 9 · Proceso Paso a Paso</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {proceso.map((p, i) => (
              <div key={i} className="relative text-center group">
                <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-white relative z-10 shadow-lg ${i % 2 === 0 ? 'bg-[#FF4D00] shadow-orange-500/30' : 'bg-[#5D3A1F] shadow-[#5D3A1F]/30'} group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`fas ${p.icon}`}></i>
                </div>
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-gray-100 select-none z-0 hidden sm:block">{p.step}</span>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative z-10">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#FF4D00] mb-1">{p.step} — {p.title}</p>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 10. MURO DE RESEÑAS ====== */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 10 · Muro de Reseñas</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {reviews.map((r, i) => (
              <div key={i} className="bg-[#FFF6F6] rounded-2xl p-5 border border-orange-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, j) => (<i key={j} className={`fas fa-star text-[10px] ${j < r.stars ? 'text-[#FF4D00]' : 'text-gray-200'}`}></i>))}
                </div>
                <p className="text-[11px] text-slate-600 font-semibold leading-relaxed mb-3">"{r.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FF4D00]/10 flex items-center justify-center text-[#FF4D00] font-black text-xs">{r.name.charAt(0)}</div>
                  <div>
                    <p className="text-[10px] font-black text-[#111827] uppercase tracking-wider">{r.name}</p>
                    <span className="text-[8px] font-bold text-[#FF4D00] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF4D00]/10">{r.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 11. DATOS CURIOSOS ====== */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 11 · Datos Curiosos / Stats</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {datos.map((d, i) => (
              <div key={i} className={`relative rounded-[2rem] p-6 bg-gradient-to-br ${d.color} text-white text-center overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default`}>
                <CircleParticles count={6} colorScheme="dark" />
                <div className="relative z-10">
                  <i className={`fas ${d.icon} text-2xl mb-2 block opacity-60 group-hover:opacity-100 transition-opacity`}></i>
                  <p className="text-2xl sm:text-3xl font-black font-heading mb-1">{d.num}</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] mb-1">{d.label}</p>
                  <p className="text-[10px] font-semibold opacity-70">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 12. ANTES vs DESPUÉS ====== */}
      <section className="relative z-10 pb-12">
        <CircuitBackground />
        <div className="container mx-auto px-6 max-w-6xl relative z-20">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 12 · Comparativa Antes/Después</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-md relative overflow-hidden">
              <CircuitBackground />
              <div className="grid grid-cols-2 gap-3 mb-3 relative z-10">
                <div className="text-center bg-red-50 rounded-xl p-3 border border-red-100">
                  <p className="text-[9px] font-black uppercase tracking-wider text-red-400 mb-1">Otras salteñerías</p>
                  <i className="fas fa-xmark text-red-400 text-lg"></i>
                </div>
                <div className="text-center bg-green-50 rounded-xl p-3 border border-green-100">
                  <p className="text-[9px] font-black uppercase tracking-wider text-green-600 mb-1">HagamosTech Av. Piraí</p>
                  <i className="fas fa-check text-green-500 text-lg"></i>
                </div>
              </div>
              <div className="space-y-2 relative z-10">
                {comparativa.map((item, j) => (
                  <div key={j} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-[#FF4D00]/10 flex items-center justify-center text-[#FF4D00] shrink-0 mt-0.5"><i className={`fas ${item.icon} text-xs`}></i></div>
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <p className="text-[10px] text-red-400 font-semibold line-through">{item.l}</p>
                      <p className="text-[10px] text-green-700 font-extrabold">{item.r}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#FF4D00] to-[#CC3D00] rounded-[2.5rem] p-8 text-white text-center flex flex-col items-center justify-center shadow-2xl shadow-orange-500/25 relative overflow-hidden">
              <CircleParticles count={14} colorScheme="dark" />
              <div className="relative z-10">
                <i className="fas fa-trophy text-5xl mb-4 opacity-80"></i>
                <h3 className="text-2xl font-black font-heading mb-2">La Diferencia</h3>
                <p className="text-sm font-semibold text-white/80 mb-4">No solo vendemos salteñas. Creamos momentos desde temprano, con calidad y calidez.</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  {['35+ años', '100% fresco', '10% desc.', 'Café gratis'].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-white/15 text-[10px] font-black uppercase tracking-wider border border-white/20">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 13. FAQ ====== */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 13 · Preguntas Frecuentes</span>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
            <CircuitBackground />
            <div className="space-y-3 relative z-20">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-[#FFF6F6] rounded-2xl border border-orange-100 overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer font-black text-sm text-[#111827] list-none">
                    {faq.q}
                    <i className="fas fa-chevron-down text-[#FF4D00] text-xs transition-transform group-open:rotate-180"></i>
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-[12px] text-slate-500 font-semibold leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== 14. FRASE DEL DÍA ====== */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 14 · Frase del Día</span>
          </div>
          <div className="bg-gradient-to-r from-[#FF4D00] to-[#CC3D00] rounded-[2.5rem] p-10 text-center shadow-2xl shadow-orange-500/25 relative overflow-hidden">
            <CircleParticles count={20} colorScheme="dark" />
            <div className="relative z-10">
              <i className="fas fa-quote-right text-5xl text-white/20 mb-4"></i>
              <p className="text-xl sm:text-2xl font-black font-heading text-white mb-4 italic">"No hay mejor manera de empezar el día que con una salteña caliente y una sonrisa."</p>
              <p className="text-sm font-bold text-white/70">— Don Mario, Fundador de HagamosTech</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 15. EVENTOS SEMANALES ====== */}
      <section className="relative z-10 pb-12">
        <CircuitBackground />
        <div className="container mx-auto px-6 max-w-6xl relative z-20">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 15 · Eventos Semanales</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {eventos.map((e, i) => (
              <div key={i} className={`relative rounded-[2.5rem] p-6 transition-all duration-500 group overflow-hidden border hover:-translate-y-2 z-10 text-center ${i % 2 === 0 ? 'bg-[#8B4513] text-white border-[#8B4513] shadow-xl shadow-[#8B4513]/20' : 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-xl shadow-orange-500/20'}`}>
                <CircleParticles count={8} colorScheme="dark" />
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1.5 rounded-b-xl z-10 ${i % 2 === 0 ? 'bg-[#FF4D00]' : 'bg-[#8B4513]'}`}></div>
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-[9px] font-black uppercase tracking-wider mb-3">{e.day}</span>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 mx-auto ${i % 2 === 0 ? 'bg-white/20' : 'bg-white/10'}`}><i className={`fas ${e.icon}`}></i></div>
                  <h4 className="text-lg font-black mb-1">{e.title}</h4>
                  <p className="text-xs font-medium opacity-80">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 16. CAFÉ DE ESPECIALIDAD ====== */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 16 · Café de Especialidad</span>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-md relative overflow-hidden">
            <CircuitBackground />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-20">
              {granos.map((cafe, i) => (
                <div key={i} className="bg-[#FFF6F6] rounded-2xl p-5 border border-orange-100 text-center hover:shadow-md transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-[#8B4513]/10 flex items-center justify-center text-[#8B4513] text-2xl mb-3 mx-auto"><i className={`fas ${cafe.icon}`}></i></div>
                  <h4 className="font-black text-[#111827] text-sm mb-1">{cafe.name}</h4>
                  <p className="text-[11px] text-[#8B4513] font-black uppercase tracking-wider mb-2">{cafe.type} · {cafe.roast}</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {cafe.notes.split(', ').map((note, j) => (
                      <span key={j} className="px-2.5 py-1 rounded-full bg-white text-[#8B4513] text-[9px] font-bold border border-orange-100">{note}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== 17. AMBIENTE ====== */}
      <section className="relative z-10 pb-12">
        <CircuitBackground />
        <div className="container mx-auto px-6 max-w-6xl relative z-20">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 17 · Nuestro Ambiente</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ambiente.map((a, i) => (
              <div key={i} className={`relative rounded-[2.5rem] p-6 sm:p-8 transition-all duration-500 group overflow-hidden border hover:-translate-y-2 z-10 text-center ${i % 2 === 0 ? 'bg-[#8B4513] text-white border-[#8B4513] shadow-xl shadow-[#8B4513]/20' : 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-xl shadow-orange-500/20'}`}>
                <CircleParticles count={10} colorScheme="dark" />
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-2/5 h-1.5 rounded-b-xl z-10 ${i % 2 === 0 ? 'bg-[#FF4D00]' : 'bg-[#8B4513]'}`}></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto ${i % 2 === 0 ? 'bg-white/20' : 'bg-white/10'}`}><i className={`fas ${a.icon}`}></i></div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">{a.label}</p>
                  <p className="text-sm font-black mb-1">{a.value}</p>
                  <p className="text-[10px] font-semibold opacity-80 mt-2">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 18. MAPA CÓMO LLEGAR ====== */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 18 · Mapa Cómo Llegar</span>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-md relative overflow-hidden">
            <CircuitBackground />
            <div className="flex flex-wrap justify-center gap-2 mb-6 relative z-20">
              {['Mercado Abasto', 'Av. Piraí', 'Canal Isuto', 'Radial 17', 'UAGRM', 'Terminal'].map((ref, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-[#FFF6F6] text-[#111827] text-[10px] font-black uppercase tracking-wider border border-orange-100 flex items-center gap-1.5">
                  <i className="fas fa-arrow-right text-[#FF4D00] text-[8px]"></i>{ref} → 2 min
                </span>
              ))}
            </div>
            <div className="h-48 rounded-2xl overflow-hidden shadow-inner border border-gray-100 relative z-20">
              <iframe src="https://maps.google.com/maps?q=Av.+Pira%C3%AD+344,+Santa+Cruz+de+la+Sierra&z=16&output=embed" width="100%" height="100%" style={{border:0}} loading="lazy" title="Av Pirai"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 19. SUSCRIPCIÓN ====== */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-2 border border-[#5D3A1F]/20">Sección 19 · Suscripción/Newsletter</span>
          </div>
          <div className="bg-gradient-to-br from-[#8B4513] to-[#FF4D00] rounded-[2.5rem] p-8 sm:p-12 text-center shadow-2xl shadow-orange-500/20 relative overflow-hidden">
            <CircleParticles count={18} colorScheme="dark" />
            <div className="relative z-10">
              <i className="fas fa-envelope-open-text text-5xl text-white/20 mb-4"></i>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white mb-3">¿Querés enterarte de todo?</h2>
              <p className="text-white/80 font-semibold mb-6 max-w-md mx-auto">Nuevos sabores, eventos, promos especiales y mucho más directo a tu WhatsApp.</p>
              <a href="https://wa.me/59161320004?text=Hola%20Los%20HagamosTech!%20Quiero%20recibir%20novedades" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#8B4513] rounded-full font-black text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
                <i className="fab fa-whatsapp text-xl"></i>
                Suscribirme por WhatsApp
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 pb-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="bg-gradient-to-r from-[#8B4513] to-[#6B3410] rounded-[2.5rem] p-10 shadow-2xl shadow-[#8B4513]/25 relative overflow-hidden">
            <CircleParticles count={14} colorScheme="dark" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black font-heading text-white mb-3">Madrugá con HagamosTech</h3>
              <p className="text-white/90 font-semibold mb-6">Av. Piraí 344 · Café de cortesía hasta las 9 a.m.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="tel:33552038" className="px-6 py-3 bg-white text-[#8B4513] rounded-full font-black text-xs uppercase tracking-wider shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"><i className="fas fa-phone"></i>3 3552038</a>
                <a href="https://wa.me/59161320004" className="px-6 py-3 bg-[#FF4D00] text-white rounded-full font-black text-xs uppercase tracking-wider shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"><i className="fab fa-whatsapp"></i>WhatsApp</a>
                <a href="https://maps.app.goo.gl/vyDVunvkBmjqjKbf7" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-[#8B4513] rounded-full font-black text-xs uppercase tracking-wider shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"><i className="fas fa-map-marker-alt"></i>Google Maps</a>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link to="/sucursales/santa-cruz" className="text-sm font-bold text-[#8B4513] hover:text-[#FF4D00] transition-colors"><i className="fas fa-arrow-left mr-1.5"></i>Volver a sucursales Santa Cruz</Link>
          </div>
        </div>
      </section>
    </div>
  );
};
