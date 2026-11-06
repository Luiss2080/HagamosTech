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
      { q: '¿Qué trabajos escolares y académicos realizan?', a: '**Realizamos y apoyamos en todo tipo de trabajo escolar y académico:** informes, proyectos, tesis, monografías, presentaciones en diapositivas, trípticos, afiches y tareas guiadas para todos los niveles: colegio, secundaria, instituto y universidad. Ofrecemos acompañamiento académico integral y formato APA 7.' },
      { q: '¿Hacen trípticos, diapositivas y proyectos de colegio?', a: '**Sí.** Diseñamos trípticos informativos, esquemas visuales, carpetas y diapositivas dinámicas en PowerPoint para exposiciones escolares, ferias y clases.' },
      { q: '¿Dan apoyo en tesis, proyectos de grado y tecnología?', a: '**Sí.** Apoyamos en proyectos de grado, tesis, monografías, desarrollo de sistemas y algoritmos computacionales.' }
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
