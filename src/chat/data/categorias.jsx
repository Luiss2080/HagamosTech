import React from 'react';
import { Wrench, BookOpen, Truck, Users } from 'lucide-react';

export const categories = [
  {
    id: 'tecnologia',
    title: 'Soluciones Tecnológicas',
    icon: <Wrench size={16} />,
    color: 'text-[#A3E635] bg-[#A3E635]/10',
    questions: [
      { q: '¿Qué soluciones ofrecen?', a: '**Desarrollo web y de software, diseño gráfico y soluciones digitales a medida.** Contanos qué necesitás; revisamos el alcance y conversamos alternativas.' },
      { q: '¿Ofrecen automatizaciones, n8n o servidores?', a: '**No ofrecemos automatización de procesos, n8n, operación de servidores ni infraestructura compleja.** Sí podemos evaluar desarrollo web, software, bases de datos y soluciones digitales dentro de nuestro alcance.' },
      { q: '¿Hacen soluciones a medida?', a: '**Evaluamos cada solicitud.** Revisamos los requisitos y te contamos qué opciones son viables, con alcance y condiciones conversadas antes de comenzar.' }
    ]
  },
  {
    id: 'academia',
    title: 'Apoyo Académico',
    icon: <BookOpen size={16} />,
    color: 'text-[#A3E635] bg-[#A3E635]/10',
    questions: [
      { q: '¿Ayudan con trabajos académicos?', a: '**Brindamos mentorías, tareas guiadas y orientación para informes, monografías y proyectos socioformativos**, además de presentaciones, formato APA 7 y recursos visuales. El estudiante desarrolla y presenta su propio trabajo.' },
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
      { q: '¿Ayudan a empezar un negocio?', a: '**Creación de marca, manual de identidad visual, catálogos digitales y piezas gráficas** para promociones o fechas especiales. El alcance se conversa según lo que necesites.' },
      { q: '¿Mejoran mi perfil profesional?', a: '**CV optimizado ATS, perfil de LinkedIn, cartas de presentación, portafolios, preparación de entrevistas y certificados digitales.**' },
      { q: '¿Cómo contrato un servicio?', a: '**Escribinos por WhatsApp al +591 61320004.** Conversamos sobre tu necesidad, posibilidades, presupuesto y modalidad antes de confirmar una propuesta.' }
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
