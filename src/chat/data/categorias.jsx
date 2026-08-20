import React from 'react';
import { Wrench, BookOpen, Truck, Users } from 'lucide-react';

export const categories = [
  {
    id: 'robotica',
    title: 'Robótica y Competencias',
    icon: <Wrench size={16} />,
    color: 'text-[#a41e22] bg-[#a41e22]/10',
    questions: [
      { q: '¿Kits para competencias?', a: '**Seguidor de Línea, Sumo, Minisumo y Laberinto.** Cada kit trae chasis, sensores, motores, batería y manual. ¡Listo para armar y competir en torneos!' },
      { q: '¿Piezas para armar mi robot?', a: '**Chasis de aluminio y acrílico, ruedas omnidireccionales, orugas, baterías LiPo 2S/3S, bluetooth HC-05 y HC-06.** Todo lo necesario para armar desde cero.' },
      { q: '¿Dan asesoría para proyectos?', a: '**Sí.** Revisamos tu diseño, te orientamos con los kits adecuados y ayudamos con la programación. Escríbenos por WhatsApp y agenda una sesión.' }
    ]
  },
  {
    id: 'libros',
    title: 'Libros Escolares',
    icon: <BookOpen size={16} />,
    color: 'text-[#a41e22] bg-[#a41e22]/10',
    questions: [
      { q: '¿Libros de primaria?', a: '**Matemáticas, Ciencias, Lenguaje, Inglés y más — de 1ro a 6to.** Actualizados al currículo boliviano. Dime el grado y materia que buscas.' },
      { q: '¿Tienen para secundaria?', a: '**De 1ro a 6to: Matemática, Física, Química, Biología, Historia, Literatura, Inglés y Filosofía.** Ediciones actualizadas de las mejores editoriales.' },
      { q: '¿Incluyen material digital?', a: '**Muchos títulos sí.** Traen ejercicios interactivos, videos y evaluaciones en línea. Pregunta por el libro específico para confirmar.' }
    ]
  },
  {
    id: 'envios',
    title: 'Compras, Envíos y Pagos',
    icon: <Truck size={16} />,
    color: 'text-[#a41e22] bg-[#a41e22]/10',
    questions: [
      { q: '¿Cómo compro?', a: '**Directo del catálogo en línea o por WhatsApp al +591 61320004.** Pagas con efectivo, QR o tarjeta. También atendemos pedidos institucionales.' },
      { q: '¿Envían a todo Bolivia?', a: '**Sí, a los 9 departamentos.** Santa Cruz: 24-48h. Interior: 2 a 5 días. Todo incluye código de rastreo. Dime tu ciudad y te calculo el costo.' },
      { q: '¿Emiten factura?', a: '**Factura fiscal con IVA incluido.** Solo danos tu NIT o CI al finalizar. Para instituciones manejamos nota de entrega y crédito.' }
    ]
  },
  {
    id: 'asesor',
    title: 'Hablar con un Asesor',
    icon: <Users size={16} />,
    color: 'text-[#a41e22] bg-[#a41e22]/10',
    isLink: true,
    questions: []
  }
];
