import React, { useState } from 'react';
import CATEGORIAS from '../../data/productos';

interface VisualizadorProps {
  producto: any;
}

const generarGalerias = (producto: any) => {
  const cat = CATEGORIAS.find(c => c.id === producto.categoriaId);
  const imagenes: string[] = [];
  if (producto.imagen) imagenes.push(producto.imagen);
  if (cat) {
    for (const p of cat.productos) {
      if (imagenes.length >= 8) break;
      if (p.imagen && !imagenes.includes(p.imagen)) imagenes.push(p.imagen);
    }
  }
  const extras = ['/img/05_Productos/Combos/Desayuno.png', '/img/05_Productos/Salteñas/Salteñas.png', '/img/05_Productos/Postres/SundaeVainilla.png', '/img/05_Productos/Cafe/Capuccino.png'];
  for (const ex of extras) {
    if (imagenes.length >= 6) break;
    if (!imagenes.includes(ex)) imagenes.push(ex);
  }
  while (imagenes.length < 6) {
    imagenes.push(imagenes[imagenes.length % Math.max(1, imagenes.length)]);
  }
  return imagenes.slice(0, 6);
};

const VisualizadorProducto: React.FC<VisualizadorProps> = ({ producto }) => {
  const [imgActiva, setImgActiva] = useState(0);
  const [zoom, setZoom] = useState(false);
  const galeria = generarGalerias(producto);
  const colorCat = producto.categoriaColor || 'bg-[#FF4D00]';
  const descuento = producto.precioAntes ? Math.round((1 - producto.precio / producto.precioAntes) * 100) : 0;

  const entrega = [
    { icon: 'fa-motorcycle', label: 'Delivery', valor: 'A domicilio', color: 'bg-[#FF4D00]' },
    { icon: 'fa-store', label: 'Retiro', valor: 'En local', color: 'bg-[#5D3A1F]' },
    { icon: 'fa-clock', label: 'Listo', valor: 'Al momento', color: 'bg-[#8B4513]' },
  ];

  return (
    <div className="sticky top-24 flex flex-col gap-4">
      {/* Visor principal */}
      <div className="bg-white rounded-[2rem] ring-2 ring-orange-100 shadow-2xl shadow-orange-950/10 relative overflow-hidden border border-orange-50">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B4513] to-[#FF4D00]"></div>
        <div className="absolute -top-14 -right-14 w-44 h-44 rounded-full bg-[#FF4D00]/10 blur-3xl animate-float-slow pointer-events-none"></div>
        <div className="absolute -bottom-14 -left-10 w-44 h-44 rounded-full bg-[#8B4513]/10 blur-3xl animate-float-medium pointer-events-none"></div>

        {/* Marco interno */}
        <div className="relative z-10 m-3 rounded-[1.4rem] border-2 border-dashed border-orange-100 overflow-hidden">
          {/* Imagen principal con datos dentro */}
          <div className={`relative aspect-square w-full max-h-[400px] overflow-hidden ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={() => setZoom(!zoom)}>
            <img
              src={galeria[imgActiva]}
              alt={producto.nombre}
              className={`w-full h-full object-cover transition-transform duration-500 ${zoom ? 'scale-125' : 'scale-100'}`}
              style={{ transformOrigin: '50% 50%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none"></div>

            {/* Badges superiores */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
              <span className={`px-2.5 py-1 rounded-full ${colorCat} text-white text-[8px] font-black uppercase tracking-wider shadow-md flex items-center gap-1`}>
                <i className={`fas ${producto.icono || 'fa-star'} text-[8px]`}></i>{producto.tipo}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/90 text-[#8B4513] text-[8px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                <i className="fas fa-tag text-[9px]"></i>{producto.subtitulo}
              </span>
            </div>
            {descuento > 0 && (
              <span className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-[10px] font-black shadow-md animate-pulse z-10 flex items-center gap-1">
                <i className="fas fa-fire"></i>-{descuento}%
              </span>
            )}

            {/* Contador */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[9px] font-black border border-white/20 z-10 flex items-center gap-1.5">
              <i className="fas fa-images text-[8px] text-amber-300"></i>{imgActiva + 1}/{galeria.length}
            </div>

            {/* Indicador de zoom */}
            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-[9px] font-black border border-white/20 z-10 flex items-center gap-1.5 transition-all duration-300 hover:bg-[#FF4D00] hover:border-[#FF4D00]">
              <i className={`fas ${zoom ? 'fa-magnifying-glass-minus' : 'fa-magnifying-glass-plus'} text-amber-300`}></i>{zoom ? 'Alejar' : 'Acercar'}
            </div>

            {/* Datos dentro de la imagen */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star text-[11px] ${i < 4 ? 'text-amber-400' : 'text-gray-400'}`}></i>
                  ))}
                </div>
                <span className="text-[11px] font-black text-white/95">4.9</span>
                <span className="text-[11px] font-semibold text-white/75">· 120+ vendidos</span>
                <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 border border-white/25 text-[8px] font-black uppercase tracking-widest text-amber-300">
                  <i className="fas fa-bolt text-[8px]"></i> Original
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-white leading-tight mb-1 drop-shadow-lg">{producto.nombre}</h2>
              <div className="flex items-end gap-2">
                <span className="text-[12px] font-black text-white/80 mb-1">Bs.</span>
                <span className="text-4xl font-black font-heading text-white leading-none drop-shadow-lg">{producto.precio}</span>
                {producto.precioAntes && <span className="text-sm font-black text-white/60 line-through mb-1">Bs. {producto.precioAntes}</span>}
              </div>
              <p className="text-[10px] font-bold text-green-400 mt-1 flex items-center gap-1">
                <i className="fas fa-circle-check"></i>Precio final, sin cargos ocultos
              </p>
            </div>
          </div>
        </div>

        {/* Miniaturas (mínimo 6) */}
        <div className="relative z-10 px-4 py-3 border-b border-dashed border-orange-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
              <i className="fas fa-images text-[#FF4D00] mr-1"></i>Galería
            </p>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{galeria.length} fotos</p>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {galeria.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgActiva(i)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${imgActiva === i ? 'border-[#FF4D00] shadow-md scale-105 ring-2 ring-[#FF4D00]/30' : 'border-gray-200 hover:border-[#FF4D00]/50 hover:scale-105'}`}
              >
                <img src={img} alt={`${producto.nombre} ${i + 1}`} className="w-full h-full object-cover" />
                {imgActiva === i && <div className="absolute inset-0 bg-[#FF4D00]/20 border-2 border-white pointer-events-none"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Pie del visor */}
        <div className="relative z-10 px-4 py-2.5 bg-[#FFF9F4] border-t border-orange-50 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#8B4513]">
            <i className="fas fa-camera text-[#FF4D00]"></i> Foto real del producto
          </span>
          <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400">
            <i className="fas fa-arrows-rotate text-[#FF4D00]"></i> Click para zoom suave
          </span>
        </div>
      </div>

      {/* Entrega */}
      <div className="bg-white rounded-[2rem] ring-1 ring-orange-100 shadow-xl shadow-orange-950/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B4513] to-[#FF4D00]"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#FF4D00]/10 blur-3xl animate-float-slow pointer-events-none"></div>

        <div className="relative z-10 p-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-3">
            <i className="fas fa-truck text-[#FF4D00] mr-1"></i>Entrega
          </p>
          <div className="grid grid-cols-3 gap-2">
            {entrega.map((m, i) => (
              <div key={i} className={`${m.color} flex flex-col items-center text-center gap-1 p-3 rounded-xl text-white shadow-lg hover:-translate-y-1 hover:scale-105 hover:shadow-xl transition-all duration-300 group`}>
                <i className={`fas ${m.icon} text-lg mb-1 group-hover:scale-110 group-hover:rotate-6 transition-transform`}></i>
                <p className="text-[8px] font-black uppercase tracking-wider text-white/80">{m.label}</p>
                <p className="text-[11px] font-black">{m.valor}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizadorProducto;
