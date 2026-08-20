import React from 'react';
import SeccionProducto from './SeccionProducto';

const GaleriaSabores = ({ imagenes, badge, titulo, resaltado, descripcion }) => {
    return (
        <SeccionProducto
            badge={badge}
            badgeIcon="fa-images"
            titulo={titulo}
            resaltado={resaltado}
            descripcion={descripcion}
        >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {imagenes.map((img, i) => (
                    <div key={i} className="group relative rounded-[2rem] overflow-hidden shadow-lg border-2 border-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <img src={img.src} alt={img.nombre} className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-white font-black text-xs leading-tight">{img.nombre}</p>
                            <p className="text-[9px] text-white/70 font-semibold uppercase tracking-wider">{img.etiqueta}</p>
                        </div>
                        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#FF4D00] text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <i className="fas fa-plus text-xs"></i>
                        </div>
                    </div>
                ))}
            </div>
        </SeccionProducto>
    );
};

export default GaleriaSabores;
