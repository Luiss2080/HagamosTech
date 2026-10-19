/**
 * Procesamiento de Lenguaje Natural del Asistente Niko.
 * Coincidencia por frases y por tokens (sin acentos), ponderando palabras
 * largas. Devuelve respuestas alineadas al Catálogo Maestro de HagamosTech.
 */

const STOP_WORDS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al', 'en', 'para', 'por', 'con', 'sin',
  'sobre', 'bajo', 'entre', 'hacia', 'hasta', 'segun', 'y', 'o', 'pero', 'mas', 'que', 'como', 'donde',
  'cuando', 'quien', 'cual', 'cuales', 'este', 'esta', 'estos', 'estas', 'ese', 'esa', 'esos', 'esas', 'mi',
  'mis', 'tu', 'tus', 'su', 'sus', 'nos', 'me', 'te', 'le', 'les', 'es', 'son', 'hay', 'tienen', 'tiene',
  'ofrecen', 'ofrecen', 'hacen', 'hace', 'pueden', 'puedo', 'quisiera', 'queria', 'necesito', 'busco'
]);

export const RESPUESTA_DESCONOCIDA =
  'No estoy seguro de entender tu consulta.\n\n' +
  'Puedo ayudarte con información sobre:\n' +
  '• **Soluciones Tecnológicas** (web, apps, software).\n' +
  '• **Apoyo Académico** (presentaciones, APA 7, simuladores).\n' +
  '• **Emprendedores y Negocios** (marca, catálogos, publicidad).\n' +
  '• **Empleo** (CV ATS, LinkedIn, portafolios).\n' +
  '• **Diseño gráfico**, **acompañamiento académico** y **soluciones digitales a medida**.\n\n' +
  'Si preferís hablar con un asesor, escribí **"asesor"** o **"whatsapp"**.';

export const BANCO_CONOCIMIENTO = [
  {
    id: 'saludos',
    keywords: ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'que tal', 'hey', 'niko'],
    answer:
      '¡Hola! 👋 Bienvenido a HagamosTech. Soy **Niko**, tu asistente virtual.\n\n' +
      'Puedo contarte sobre **desarrollo web y de software**, **diseño gráfico**, **acompañamiento académico**, servicios para **emprendedores y profesionales**, y **soluciones a medida**. El alcance y las condiciones se conversan para cada caso.\n\n' +
      '¿En qué te ayudo hoy?'
  },
  {
    id: 'despedida',
    keywords: ['adios', 'chao', 'nos vemos', 'hasta luego', 'bye', 'cuidate', 'gracias adios', 'finalizar', 'cerrar'],
    answer: '¡Gracias por comunicarte con HagamosTech! Tu necesidad, hagámosla realidad. ¡Que tengas un excelente día! 👋'
  },
  {
    id: 'agradecimiento',
    keywords: ['gracias', 'mil gracias', 'excelente', 'genial', 'perfecto', 'entendido', 'comprendido', 'ok'],
    answer: '¡Es un placer! Si tenés otra consulta, escribila acá nomás. Estoy para ayudarte. 😊'
  },
  {
    id: 'servicios',
    keywords: ['servicios', 'soluciones', 'que hacen', 'que ofrecen', 'portafolio', 'catalogo de servicios', 'areas', 'categorias'],
    answer:
      'Estas son nuestras áreas de solución:\n' +
      '1. **Acompañamiento académico** → mentorías, tareas guiadas, informes, monografías y proyectos socioformativos.\n' +
      '2. **Emprendedores y negocios** → marca, manual de identidad, catálogos digitales y piezas gráficas.\n' +
      '3. **Empleo** → CV optimizado ATS, LinkedIn, cartas, portafolios, entrevistas y certificados.\n' +
      '4. **Diseño gráfico** → logos, flyers, packaging, tarjetas y retoque fotográfico.\n' +
      '5. **Desarrollo web y e-commerce** → páginas, landing, tiendas online, catálogos y UI/UX.\n' +
      '6. **Software** → sistemas a medida y bases de datos.\n' +
      '7. **Soluciones personalizadas** → desarrollo digital según alcance y viabilidad.\n' +
      '8. **Soluciones a medida** → "Contanos tu problema, nosotros vemos cómo hacerlo".\n\n' +
      '¿Sobre cuál querés que profundice?'
  },
  {
    id: 'estudiantes',
    keywords: ['estudiante', 'estudiantes', 'academico', 'universidad', 'colegio', 'escuela', 'docente', 'institucion', 'tesis', 'monografia', 'presentacion', 'powerpoint', 'diapositivas', 'apa', 'apa 7', 'infografia', 'diagrama', 'linea de tiempo', 'mapa conceptual', 'portada', 'simulador', 'simuladores', 'redes', 'robótica educativa', 'robotica', 'programacion', 'algoritmo', 'medicina', 'salud', 'enfermeria'],
    answer:
      'Apoyamos a estudiantes, docentes e instituciones con:\n' +
      '• **Presentaciones PowerPoint e Interactivas** (defensas de tesis, ciencias de la salud).\n' +
      '• **Formato APA 7 y documentación técnica** (monografías, citas, corrección de estilo).\n' +
      '• **Infografías, diagramas y líneas de tiempo** (esquemas anatómicos, flujos de datos).\n' +
      '• **Mapas conceptuales y portadas académicas**.\n' +
      '• **Simuladores educativos y proyectos de redes** (entornos virtuales, robótica educativa).\n' +
      '• **Mentorías y apoyo en tareas** con ejercicios guiados.\n' +
      '• **Orientación en informes, monografías y proyectos socioformativos**.\n\n' +
      'El estudiante desarrolla y presenta su propio trabajo. La disponibilidad depende de la materia y el nivel; consultanos tu caso.'
  },
  {
    id: 'emprendedores',
    keywords: ['emprendedor', 'emprendedores', 'emprendimiento', 'negocio', 'negocios', 'pyme', 'marca', 'branding', 'identidad visual', 'manual de identidad', 'menus qr', 'menu qr', 'catalogo', 'catalogos', 'publicidad', 'promocion', 'promociones', 'oferta', 'ofertas', 'fechas especiales', 'whatsapp business', 'clientes', 'local', 'tienda'],
    answer:
      'Para emprendedores y negocios ofrecemos:\n' +
      '• **Creación de marca y branding básico**.\n' +
      '• **Manual de identidad visual** (colores, tipografías y pautas de uso).\n' +
      '• **Catálogos digitales de productos o servicios**.\n' +
      '• **Publicidad para promociones y ofertas**.\n' +
      '• **Publicidad para fechas especiales** (Navidad, Black Friday).\n' +
      '\n' +
      '¿Querés que veamos tu caso en particular?'
  },
  {
    id: 'empleo',
    keywords: ['empleo', 'trabajo', 'cv', 'curriculum', 'curriculum vitae', 'ats', 'linkedin', 'carta de presentacion', 'carta', 'portafolio', 'entrevista', 'certificado', 'certificados', 'diploma', 'constancia', 'reclutamiento', 'vacante'],
    answer:
      'Para tu desarrollo profesional te ayudamos con:\n' +
      '• **Currículum profesional y CV optimizado ATS**.\n' +
      '• **Optimización de perfil de LinkedIn**.\n' +
      '• **Cartas de presentación y traducción de CV** (ES/EN).\n' +
      '• **Portafolios profesionales digitales** (GitHub, Figma).\n' +
      '• **Preparación para entrevistas y asesoría laboral**.\n' +
      '• **Certificados digitales** (diplomas y constancias).\n\n' +
      '¿Querés que empecemos por tu CV?'
  },
  {
    id: 'diseno',
    keywords: ['diseno', 'diseño', 'logo', 'logos', 'isologotipo', 'identidad', 'flyer', 'flyers', 'banner', 'banners', 'pancarta', 'redes sociales', 'packaging', 'etiqueta', 'etiquetas', 'tarjeta', 'tarjetas', 'invitacion', 'invitaciones', 'retoque', 'fotografia', 'edicion fotografica', 'imagen'],
    answer:
      'En diseño gráfico integral hacemos:\n' +
      '• **Logos e identidad visual (isologotipos)**.\n' +
      '• **Flyers, banners, pancartas y piezas para redes**.\n' +
      '• **Packaging, etiquetas y catálogos físicos**.\n' +
      '• **Tarjetas de presentación e invitaciones** (con QR).\n' +
      '• **Edición y retoque fotográfico**.\n\n' +
      'Contame qué necesitás; conversamos alcance y presupuesto según el proyecto.'
  },
  {
    id: 'web',
    keywords: ['web', 'pagina', 'paginas', 'pagina web', 'landing', 'landing page', 'sitio', 'tienda online', 'ecommerce', 'e-commerce', 'carrito', 'pedidos', 'catalogo online', 'blog', 'ui', 'ux', 'responsive', 'formulario', 'hosting', 'dominio', 'seo', 'portafolio web'],
    answer:
      'En desarrollo web y e-commerce ofrecemos:\n' +
      '• **Páginas web empresariales** y sitios corporativos.\n' +
      '• **Landing pages y portafolios personales**.\n' +
      '• **Tiendas online básicas y sistemas de pedidos**.\n' +
      '• **Catálogos digitales online y blogs**.\n' +
      '• **Diseño UI/UX, formularios y web responsive**.\n\n' +
      '¿Tenés ya un diseño o partimos de cero?'
  },
  {
    id: 'software',
    keywords: ['software', 'sistema', 'sistemas', 'aplicacion', 'aplicaciones', 'app', 'apps', 'backend', 'frontend', 'base de datos', 'bases de datos', 'sql', 'react', 'laravel', 'blade', 'devops', 'servidor', 'servidores', 'hosting', 'hardware', 'api', 'codigo', 'programacion'],
    answer:
      'Construimos soluciones tecnológicas a medida:\n' +
      '• **Desarrollo de sistemas web y software** (React, backends, Laravel/Blade).\n' +
      '• **Diseño y gestión de bases de datos** según los requisitos del sistema.\n\n' +
      'No ofrecemos operación de servidores, DevOps ni infraestructura compleja. Contanos tu necesidad para revisar el alcance.'
  },
  {
    id: 'ia',
    keywords: ['ia', 'inteligencia artificial', 'chatbot', 'chatbots', 'asistente', 'asistentes', 'automatizacion', 'automatizar', 'automatico', 'crm', 'facturacion', 'correos', 'prompts', 'github', 'productividad', 'integracion', 'integraciones', 'predictivo'],
    answer:
      'No ofrecemos automatización de procesos ni n8n. Podemos evaluar funciones con inteligencia artificial dentro de una aplicación o sistema, si encajan con los requisitos, el alcance y la viabilidad del proyecto.'
  },
  {
    id: 'personalizadas',
    keywords: ['medida', 'personalizada', 'personalizado', 'idea', 'problema', 'necesidad', 'no encaja', 'especial', 'diferente', 'desde cero'],
    answer:
      'Cada solicitud se evalúa antes de confirmar el trabajo:\n' +
      '1. **Contanos** tu idea o frustración.\n' +
      '2. **Analizamos** viabilidad y tecnologías.\n' +
      '3. **Proponemos** alcance, entregables, presupuesto y tiempos para conversar.\n' +
      '4. **Hacemos** la solución.\n' +
      '5. **Entregamos** lo acordado y explicamos el resultado.\n\n' +
      'Describime tu caso y lo evaluamos.'
  },
  {
    id: 'precios',
    keywords: ['precio', 'precios', 'costo', 'costos', 'cuanto cuesta', 'cuanto sale', 'presupuesto', 'cotizacion', 'cotizar', 'tarifa', 'tarifas', 'packs', 'pack', 'plan', 'planes', 'suscripcion', 'inversion'],
    answer:
      'El presupuesto, las etapas y la modalidad de pago se conversan según tu proyecto y tus posibilidades. No tenemos precios universales publicados. Contanos qué necesitás para revisar alternativas.'
  },
  {
    id: 'como_trabajamos',
    keywords: ['como trabajan', 'proceso', 'metodologia', 'flujo', 'pasos', 'como es el proceso', 'plazos', 'tiempos', 'entrega', 'entregas', 'tiempo de entrega'],
    answer:
      'El proceso se acuerda para cada solicitud:\n' +
      '1. **Contanos:** nos explicás tu idea o problema.\n' +
      '2. **Analizamos:** evaluamos viabilidad y tecnologías.\n' +
      '3. **Proponemos:** plan de acción, tiempos y presupuesto.\n' +
      '4. **Hacemos:** construimos el software, la identidad o el proyecto.\n' +
      '5. **Entregamos:** presentamos lo acordado y conversamos las opciones de seguimiento si las necesitás.'
  },
  {
    id: 'pagos',
    keywords: ['pago', 'pagos', 'pagar', 'transferencia', 'qr', 'efectivo', 'tarjeta', 'factura', 'nit', 'banco', 'comprobante'],
    answer:
      'Las opciones de pago, anticipos y facturación se conversan y confirman antes de comenzar, de acuerdo con el servicio y la situación de cada cliente. Escribinos para revisar alternativas.'
  },
  {
    id: 'soporte',
    keywords: ['soporte', 'mantenimiento', 'actualizacion', 'actualizaciones', 'monitoreo', 'backup', 'ayuda tecnica', 'falla', 'error'],
    answer:
      'Podemos revisar mantenimiento, correcciones o mejoras de sistemas existentes. El alcance, la disponibilidad y la modalidad se acuerdan por separado. No ofrecemos operación de servidores ni DevOps.'
  },
  {
    id: 'contacto_humano',
    keywords: ['hablar', 'whatsapp', 'asesor', 'vendedor', 'telefono', 'celular', 'llamar', 'atencion directa', 'soporte humano', 'persona', 'humano', 'contacto', 'contactar', 'correo', 'email'],
    answer:
      'Con gusto te derivamos con el equipo:\n\n' +
      '💬 **WhatsApp:** [+591 61320004](https://api.whatsapp.com/send?phone=59161320004)\n' +
      '📧 **Email:** contacto@hagamostech.bo\n\n' +
      'También podés completar el formulario en **Contactanos**.'
  },
  {
    id: 'ubicacion',
    keywords: ['donde', 'ubicacion', 'direccion', 'oficina', 'santa cruz', 'horario', 'horarios', 'atencion', 'donde estan'],
    answer:
      'Podés escribirnos por WhatsApp al **+591 61320004** o al correo **contacto@hagamostech.bo**. Los tiempos de respuesta se coordinan según disponibilidad.'
  },
  {
    id: 'redes',
    keywords: ['facebook', 'instagram', 'tiktok', 'redes sociales', 'redes', 'publicaciones'],
    answer:
      'Seguinos en redes para ver proyectos y novedades:\n' +
      '• **Instagram:** [@hagamostech](https://www.instagram.com/hagamostech/)\n' +
      '• **Facebook:** [HagamosTech](https://www.facebook.com/HagamosTech)\n' +
      '• **TikTok:** [@hagamostech](https://www.tiktok.com/@hagamostech)'
  },
  {
    id: 'garantia',
    keywords: ['garantia', 'confidencial', 'confidencialidad', 'privacidad', 'reembolso', 'devolucion', 'seguridad'],
    answer:
      'No publicamos una garantía universal: cualquier garantía o ajuste se conversa y se especifica en la propuesta del proyecto. Para información sobre datos personales, consultá la Política de Privacidad.'
  }
];

const normalizar = (texto) =>
  String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const tokensDe = (texto) =>
  normalizar(texto)
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));

export const analizarMensajeUsuario = (text) => {
  const original = normalizar(text);
  const tokensUsuario = tokensDe(text);

  if (tokensUsuario.length === 0) {
    return 'Escribime tu consulta y te ayudo. Puedo hablarte de **soluciones tecnológicas**, **apoyo académico**, **emprendedores**, **empleo**, **diseño**, **IA** y **soluciones a medida**.';
  }

  // 1) Coincidencia por frase completa (más específica).
  for (const intento of BANCO_CONOCIMIENTO) {
    for (const keyword of intento.keywords) {
      if (keyword.includes(' ') && original.includes(normalizar(keyword))) {
        return intento.answer;
      }
    }
  }

  // 2) Puntuación por tokens compartidos (palabras largas pesan más).
  let mejor = null;
  let maximo = 0;

  for (const intento of BANCO_CONOCIMIENTO) {
    const setKeywords = new Set(intento.keywords.flatMap((k) => tokensDe(k)));
    let score = 0;
    for (const token of tokensUsuario) {
      if (setKeywords.has(token)) score += token.length >= 6 ? 2 : 1;
    }
    if (score > maximo) {
      maximo = score;
      mejor = intento;
    }
  }

  if (mejor && maximo >= 1) {
    return mejor.answer;
  }

  return RESPUESTA_DESCONOCIDA;
};

export const esRespuestaDesconocida = (respuesta) => respuesta === RESPUESTA_DESCONOCIDA;

export default analizarMensajeUsuario;
