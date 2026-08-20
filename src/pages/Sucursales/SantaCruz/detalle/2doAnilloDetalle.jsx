import React from 'react';
import HeroDetalleSeccion from './sections/HeroDetalleSeccion';
import ProcesoSeccion from './sections/ProcesoSeccion';
import GaleriaSeccion from './sections/GaleriaSeccion';
import TimelineSeccion from './sections/TimelineSeccion';
import MapaSeccion from './sections/MapaSeccion';
import ResenasSeccion from './sections/ResenasSeccion';
import CtaSeccion from './sections/CtaSeccion';

const proceso = [
    { step: '01', icon: 'fa-phone', title: 'Pedí', desc: 'Llamanos o escribinos por WhatsApp. En 30 minutos con anticipación tenés tu pedido listo.' },
    { step: '02', icon: 'fa-fire-burner', title: 'Horneamos', desc: 'Todo se prepara fresco y al momento. Nuestro pedido express garantiza 3 minutos de espera.' },
    { step: '03', icon: 'fa-face-smile', title: 'Disfrutá', desc: 'Pará, retirá y seguí tu camino. O quedate en nuestro amplio salón familiar.' },
];

const imagenes = [
    '/img/10_sucursales/SantaCruz/02_Sucursal.png',
    '/img/10_sucursales/SantaCruz/01_Sucursal.png',
    '/img/10_sucursales/SantaCruz/03_Sucursal.png',
];

const timeline = [
    { year: '2008', title: 'Apertura Estratégica', desc: 'Abrimos sobre el 2do Anillo para atender a la zona de mayor tránsito de la ciudad.' },
    { year: '2012', title: 'Pedido Express', desc: 'Innovamos con el sistema de pedido rápido en menos de 5 minutos para el auto.' },
    { year: '2016', title: 'Expansión del Salón', desc: 'Duplicamos la capacidad y sumamos el área infantil para las familias.' },
    { year: '2024', title: 'Hoy', desc: 'Más de 500 clientes diarios y el récord de 20 vehículos en la hora pico.' },
];

const referencias = ['3er Anillo', 'Av. Grigotá', 'Mercado Abasto', 'UAGRM', 'Estación de Buses'];

const resenas = [
    { name: 'José F.', stars: 5, text: 'Paro en el auto todos los días de camino al trabajo. La atención es rapidísima, 3 minutos y listo.', tag: 'Pedido Express' },
    { name: 'Carmen B.', stars: 5, text: 'Venimos con los niños porque tienen zona de juegos. Las salteñas siempre calientes y deliciosas.', tag: 'Familia' },
    { name: 'Ramiro Q.', stars: 5, text: 'Pedí 50 salteñas para un evento de la empresa. Llegaron puntuales y súper organizadas.', tag: 'Combo Empresa' },
    { name: 'Sandra P.', stars: 4, text: 'Muy buena ubicación para una parada rápida. El estacionamiento amplio es un plus enorme.', tag: 'Zona de Tránsito' },
    { name: 'Miguel A.', stars: 5, text: 'La de pollo con jugo de tumbo es mi ritual de los sábados. La fila avanza rápido.', tag: 'Cliente Fiel' },
    { name: 'Verónica S.', stars: 5, text: 'El área infantil salva la visita con niños. Mientras ellos juegan, nosotros disfrutamos.', tag: 'Área Kids' },
];

const Detail2doAnillo = () => {
    return (
        <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>

            <HeroDetalleSeccion
                titulo="Los Castores"
                resaltado="2do Anillo."
                descripcion="La sucursal más transitada de la ciudad. Sobre la vía más rápida de Santa Cruz, ideal para una parada express con el mejor sabor."
            />

            <ProcesoSeccion
                pasos={proceso}
                titulo="Pedido"
                resaltado="express"
            />

            <GaleriaSeccion
                imagenes={imagenes}
                titulo="Conocé"
                resaltado="nuestro espacio"
                descripcion="Explorá la galería de nuestra sucursal sobre el 2do Anillo."
            />

            <TimelineSeccion
                eventos={timeline}
                titulo="El camino de"
                resaltado="2do Anillo"
            />

            <MapaSeccion
                referencias={referencias}
                mapaSrc="https://maps.google.com/maps?q=-17.7830,-63.1705&z=15&output=embed"
                titulo="Estamos"
                resaltado="acá"
            />

            <ResenasSeccion
                resenas={resenas}
                titulo="Clientes"
                resaltado="felices"
            />

            <CtaSeccion
                frase="6R59+5W7 · Sobre el 2do Anillo, imposible perderse."
                telefono="33391432"
                whatsapp="WhatsApp"
                mapaLink="https://maps.app.goo.gl/GYF5RyA9vtDnDJ9WA"
                gradiente="from-[#5D3A1F] to-[#452A16]"
            />
        </div>
    );
};

export { Detail2doAnillo };
