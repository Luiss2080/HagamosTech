import React from 'react';
import { Wrench, BookOpen, Truck, Users } from 'lucide-react';

export const categories = [
  {
    id: 'tecnologia',
    title: 'Soluciones Tecnológicas',
    icon: <Wrench size={16} />,
    color: 'text-[#A3E635] bg-[#A3E635]/10',
    questions: [
      { q: '¿Qué soluciones ofrecen?', a: '**Desarrollo web y e-commerce, sistemas y software a medida, bases de datos, soporte y DevOps, automatización e inteligencia artificial.** Contanos qué necesitás y te armamos una propuesta.' },
      { q: '¿Integran inteligencia artificial?', a: '**Sí.** Asistentes virtuales, repositorios de prompts, automatización de procesos y análisis predictivo aplicados a tu negocio.' },
      { q: '¿Hacen soluciones a medida?', a: '**Sí, es nuestra especialidad.** "Contanos tu problema, nosotros vemos cómo hacerlo": analizamos, proponemos y construimos.' }
    ]
  },
  {
    id: 'academia',
    title: 'Apoyo Académico',
    icon: <BookOpen size={16} />,
    color: 'text-[#A3E635] bg-[#A3E635]/10',
    questions: [
      { q: '¿Ayudan con trabajos académicos?', a: '**Presentaciones PowerPoint e interactivas, formato APA 7, infografías, diagramas, líneas de tiempo, mapas conceptuales y portadas académicas.**' },
      { q: '¿Hacen simuladores y proyectos de redes?', a: '**Sí.** Entornos virtuales para pruebas de redes, robótica educativa y simulación de sistemas informáticos.' },
      { q: '¿Dan apoyo en programación?', a: '**Sí.** Asesoría en código estructurado, algoritmos y lógica computacional para tus proyectos.' }
    ]
  },
  {
    id: 'negocios',
    title: 'Emprendedores y Empleo',
    icon: <Truck size={16} />,
    color: 'text-[#A3E635] bg-[#A3E635]/10',
    questions: [
      { q: '¿Ayudan a empezar un negocio?', a: '**Creación de marca, manual de identidad visual, menús QR y catálogos, publicidad para promociones y fechas especiales, y gestión de clientes.**' },
      { q: '¿Mejoran mi perfil profesional?', a: '**CV optimizado ATS, perfil de LinkedIn, cartas de presentación, portafolios, preparación de entrevistas y certificados digitales.**' },
      { q: '¿Cómo contrato un servicio?', a: '**Por WhatsApp al +591 61320004.** Te damos una propuesta a medida, sin compromiso.' }
    ]
  },
  {
    id: 'asesor',
    title: 'Hablar con un Asesor',
    icon: <Users size={16} />,
    color: 'text-[#A3E635] bg-[#A3E635]/10',
    isLink: true,
    questions: []
  }
];
