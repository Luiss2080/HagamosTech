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
      { q: '¿Qué apoyo académico ofrecen?', a: '**Orientamos** en tareas guiadas, informes, monografías, exposiciones y proyectos de aprendizaje. La disponibilidad depende de la materia y el nivel; el estudiante desarrolla y presenta su propio trabajo.' },
      { q: '¿Pueden orientarme con un tríptico o una exposición escolar?', a: '**Sí.** Podemos revisar la consigna y orientar la organización de contenidos, esquemas y diapositivas para una exposición o feria escolar.' },
      { q: '¿Dan apoyo en tesis, proyectos de grado y tecnología?', a: '**Sí.** Podemos orientar la delimitación del tema, la estructura, las referencias y la comprensión de algoritmos o simulaciones, según la consigna y el alcance.' },
      { q: '¿Qué pasa si mi fecha de entrega está cerca?', a: 'Compartinos la fecha, la materia y la consigna. Revisamos disponibilidad antes de confirmar si podemos acompañarte; no asumimos un plazo sin evaluar el caso.' }
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
