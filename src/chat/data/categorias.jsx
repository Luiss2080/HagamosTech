import React from 'react';
import { Wrench, BookOpen, Truck, Users } from 'lucide-react';

export const categories = [
  {
    id: 'tecnologia',
    title: 'Soluciones Tecnológicas',
    icon: <Wrench size={16} />,
    color: 'text-[#A3E635] bg-[#A3E635]/10',
    questions: [
      { q: '¿Qué soluciones ofrecen?', a: '**Desarrollo web y software, diseño gráfico, acompañamiento académico, servicios para emprendimientos y profesionales.** Cada proyecto se evalúa según su alcance.' },
      { q: '¿Realizan automatizaciones, n8n o servidores?', a: '**No ofrecemos automatizaciones, n8n, operación de servidores ni infraestructura compleja.**' },
      { q: '¿Hacen soluciones a medida?', a: '**Sí, dentro de nuestras áreas de desarrollo digital, diseño y acompañamiento académico.** Primero revisamos el alcance y la viabilidad.' }
    ]
  },
  {
    id: 'academia',
    title: 'Apoyo Académico',
    icon: <BookOpen size={16} />,
    color: 'text-[#A3E635] bg-[#A3E635]/10',
    questions: [
      { q: '¿Ayudan con trabajos académicos?', a: '**Damos mentorías y apoyo en tareas, informes, monografías y proyectos socioformativos**, además de presentaciones, formato APA 7 y recursos visuales. El estudiante desarrolla y presenta su propio trabajo.' },
      { q: '¿Hacen simuladores y proyectos de redes?', a: '**Podemos orientar proyectos y simuladores educativos** según la consigna, el nivel y el alcance.' },
      { q: '¿Dan apoyo en programación?', a: '**Sí.** Asesoría en código estructurado, algoritmos y lógica computacional para tus proyectos.' }
    ]
  },
  {
    id: 'negocios',
    title: 'Emprendedores y Empleo',
    icon: <Truck size={16} />,
    color: 'text-[#A3E635] bg-[#A3E635]/10',
    questions: [
      { q: '¿Ayudan a empezar un negocio?', a: '**Creación de marca, manual de identidad visual, catálogos digitales y publicidad para promociones y fechas especiales.**' },
      { q: '¿Mejoran mi perfil profesional?', a: '**CV optimizado ATS, perfil de LinkedIn, cartas de presentación, portafolios, preparación de entrevistas y certificados digitales.**' },
      { q: '¿Cómo contrato un servicio?', a: '**Escribinos por WhatsApp al +591 61320004 o completá el formulario.** Revisamos el alcance y te enviamos una propuesta.' }
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
