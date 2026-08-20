import React from 'react';
import HeroDetalleSeccion from './sections/HeroDetalleSeccion';
import ProcesoSeccion from './sections/ProcesoSeccion';
import GaleriaSeccion from './sections/GaleriaSeccion';
import TimelineSeccion from './sections/TimelineSeccion';
import MapaSeccion from './sections/MapaSeccion';
import ResenasSeccion from './sections/ResenasSeccion';
import CtaSeccion from './sections/CtaSeccion';

const proceso = [
    { step: '01', icon: 'fa-phone', title: 'Pedí', desc: 'Llamanos o escribinos por WhatsApp. Contanos cuántas salteñas y de qué tipo querés.' },
    { step: '02', icon: 'fa-fire-burner', title: 'Horneamos', desc: 'Cada pedido se hornea en el momento. Masa crocante y relleno jugoso, recién salido del horno.' },
    { step: '03', icon: 'fa-face-smile', title: 'Disfrutá', desc: 'Recibí tu pedido calentito. En la terraza de Equipetrol, para llevar o en la puerta de tu casa.' },
];

const imagenes = [
    '/img/10_sucursales/SantaCruz/01_Sucursal.png',
    '/img/10_sucursales/SantaCruz/02_Sucursal.png',
    '/img/10_sucursales/SantaCruz/04_Sucursal.png',
];

const timeline = [
    { year: '2010', title: 'Inauguración', desc: 'Abrimos con 3 empleados y 5 mesas. El primer día vendimos 200 salteñas en la zona norte.' },
    { year: '2013', title: 'Primera Expansión', desc: 'Duplicamos el espacio y sumamos la terraza exterior con jardín vertical.' },
    { year: '2016', title: 'Reconocimiento', desc: 'Ganamos "Mejor Salteñería de la Zona Norte" por votación popular.' },
    { year: '2020', title: 'Delivery Exprés', desc: 'Lanzamos el servicio de delivery propio con motorizados dedicados.' },
    { year: '2024', title: 'Hoy', desc: '45 personas de capacidad, 12 empleados y más de 500 clientes diarios.' },
];

const referencias = ['UIO Norte', 'Av. San Martín', 'Barrio Equipetrol', 'Colegio Alemán', 'Plaza Entrevías'];

const resenas = [
    { name: 'María G.', stars: 5, text: 'Vengo todos los sábados con mi familia. Las salteñas de carne son las mejores que probé en Santa Cruz. La terraza es hermosa.', tag: 'Cliente Frecuente' },
    { name: 'Carlos R.', stars: 5, text: 'El delivery es rapidísimo. Pedí para una reunión de oficina y llegaron calentitas en 20 minutos.', tag: 'Pedido Corporativo' },
    { name: 'Andrea L.', stars: 5, text: 'El jugo de tumbo con salteña de pollo es mi combinación favorita. El ambiente con jazz es perfecto.', tag: 'Desayuno Favorito' },
    { name: 'Pedro M.', stars: 4, text: 'Muy buenas salteñas, la de fricasé es picante exacto. Solo mejorar la espera los sábados.', tag: 'Sabor Auténtico' },
    { name: 'Lucía T.', stars: 5, text: 'Celebramos el cumpleaños de mi hija en la terraza. Nos armaron un combo especial, increíble atención.', tag: 'Evento Familiar' },
    { name: 'Diego V.', stars: 5, text: 'Trabajo a 2 cuadras y vengo casi todos los días. El café de cortesía para clientes frecuentes se agradece.', tag: 'Cliente Diario' },
];

const DetailEquipetrol = () => {
    return (
        <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>

            <HeroDetalleSeccion
                titulo="Los Castores"
                resaltado="Equipetrol."
                descripcion="Nuestra sucursal insignia. La primera, la más grande y la que marcó el camino para todas las demás. Tradición desde 1989."
            />

            <ProcesoSeccion
                pasos={proceso}
                titulo="Tu pedido,"
                resaltado="paso a paso"
            />

            <GaleriaSeccion
                imagenes={imagenes}
                titulo="Conocé"
                resaltado="nuestro espacio"
                descripcion="Explorá la galería de nuestra sucursal insignia en Equipetrol."
            />

            <TimelineSeccion
                eventos={timeline}
                titulo="El camino de"
                resaltado="Equipetrol"
            />

            <MapaSeccion
                referencias={referencias}
                mapaSrc="https://maps.google.com/maps?q=Equipetrol,+Santa+Cruz+de+la+Sierra&z=15&output=embed"
                titulo="Estamos"
                resaltado="acá"
            />

            <ResenasSeccion
                resenas={resenas}
                titulo="Clientes"
                resaltado="felices"
            />

            <CtaSeccion
                frase="Av. Cristóbal de Mendoza, esquina · En el corazón de Equipetrol, listos para atenderte."
                telefono="33430197"
                whatsapp="WhatsApp"
                mapaLink="https://maps.app.goo.gl/L6pWgHan11aPfE4p7"
                gradiente="from-[#FF4D00] to-[#CC3D00]"
            />
        </div>
    );
};

export { DetailEquipetrol };
