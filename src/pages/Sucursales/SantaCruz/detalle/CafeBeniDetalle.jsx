import React from 'react';
import HeroDetalleSeccion from './sections/HeroDetalleSeccion';
import ProcesoSeccion from './sections/ProcesoSeccion';
import GaleriaSeccion from './sections/GaleriaSeccion';
import TimelineSeccion from './sections/TimelineSeccion';
import MapaSeccion from './sections/MapaSeccion';
import ResenasSeccion from './sections/ResenasSeccion';
import CtaSeccion from './sections/CtaSeccion';

const proceso = [
    { step: '01', icon: 'fa-phone', title: 'Pedí', desc: 'Elegí tus salteñas gourmet y tu café de especialidad. Reservá tu mesa o pedí delivery.' },
    { step: '02', icon: 'fa-fire-burner', title: 'Preparamos', desc: 'Baristas certificados preparan tu café en el momento. Las salteñas salen del horno artesanal.' },
    { step: '03', icon: 'fa-face-smile', title: 'Disfrutá', desc: 'Viví la experiencia en nuestra terraza con vista al parque, o llevate el mejor sabor a casa.' },
];

const imagenes = [
    '/img/10_sucursales/SantaCruz/04_Sucursal.png',
    '/img/10_sucursales/SantaCruz/01_Sucursal.png',
    '/img/10_sucursales/SantaCruz/02_Sucursal.png',
];

const timeline = [
    { year: '2019', title: 'Nace Café Beni', desc: 'Abrimos como una apuesta diferente: combinar la tradición salteñera con el café de especialidad.' },
    { year: '2021', title: 'Jazz y Arte', desc: 'Sumamos el trío de jazz en vivo los fines de semana y la galería de artistas locales.' },
    { year: '2023', title: 'Café Propio', desc: 'Empezamos a trabajar directamente con productores de Caranavi y Samaipata.' },
    { year: '2024', title: 'Hoy', desc: 'El punto de encuentro favorito de emprendedores, artistas y amantes del buen gusto.' },
];

const referencias = ['Parque Urbano', 'Av. Beni', 'Zona Norte', 'Plaza Nueva', 'Colegio Beni'];

const resenas = [
    { name: 'Renata V.', stars: 5, text: 'El capuccino con una salteña de 4 quesos es una combinación sublime. El jazz de los viernes es un lujo.', tag: 'Amante del Café' },
    { name: 'Martín D.', stars: 5, text: 'Trabajo remoto desde la terraza con vista al parque. El wifi es rapidísimo y el café excelente.', tag: 'Coworking' },
    { name: 'Isabel C.', stars: 5, text: 'Trajimos a los artistas de la galería y fue una experiencia única. Degustamos salteñas mientras veíamos arte.', tag: 'Cultura' },
    { name: 'Roberto S.', stars: 5, text: 'El affogato es el mejor de Santa Cruz. La atención de los baristas es de primer nivel.', tag: 'Gourmet' },
    { name: 'Valentina P.', stars: 4, text: 'Hermoso ambiente y terraza. Los domingos se llena, mejor reservar o llegar temprano.', tag: 'Terraza' },
    { name: 'Andrés L.', stars: 5, text: 'El mercado orgánico de los sábados con las salteñas es el plan perfecto de la semana.', tag: 'Mercado' },
];

const DetailCafeBeni = () => {
    return (
        <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>

            <HeroDetalleSeccion
                titulo="Los Castores"
                resaltado="Café Beni."
                descripcion="Nuestra experiencia gourmet. Donde la tradición salteñera se encuentra con el café de especialidad y un ambiente único frente al parque."
            />

            <ProcesoSeccion
                pasos={proceso}
                titulo="Tu experiencia,"
                resaltado="paso a paso"
            />

            <GaleriaSeccion
                imagenes={imagenes}
                titulo="Conocé"
                resaltado="nuestro espacio"
                descripcion="Explorá la galería de nuestra experiencia gourmet en Café Beni."
            />

            <TimelineSeccion
                eventos={timeline}
                titulo="El camino de"
                resaltado="Café Beni"
            />

            <MapaSeccion
                referencias={referencias}
                mapaSrc="https://maps.google.com/maps?q=Av.+Beni+2160,+Santa+Cruz+de+la+Sierra&z=15&output=embed"
                titulo="Estamos"
                resaltado="acá"
            />

            <ResenasSeccion
                resenas={resenas}
                titulo="Clientes"
                resaltado="felices"
            />

            <CtaSeccion
                frase="Av. Beni 2160 · Café de especialidad + Salteñas gourmet · Frente al parque."
                telefono="+59161320004"
                whatsapp="WhatsApp"
                mapaLink="https://maps.app.goo.gl/wwNLzMyyizWoJXBGA"
                gradiente="from-[#8B4513] to-[#5D3010]"
            />
        </div>
    );
};

export { DetailCafeBeni };
