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
  '• **Diseño Gráfico**, **Automatización e IA** y **soluciones a medida**.\n\n' +
  'Si preferís hablar con un asesor, escribí **"asesor"** o **"whatsapp"**.';

export const BANCO_CONOCIMIENTO = [
  {
    id: 'saludos',
    keywords: ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'que tal', 'hey', 'niko'],
    answer:
      '¡Hola! 👋 Bienvenido a HagamosTech. Soy **Niko**, tu asistente virtual.\n\n' +
      'Puedo contarte sobre nuestras **soluciones tecnológicas**, **apoyo académico**, servicios para **emprendedores**, **empleo**, **diseño**, **automatización e IA** y **soluciones a medida**.\n\n' +
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
      '1. **Estudiantes y sector académico** → presentaciones, APA 7, infografías, mapas, simuladores y apoyo en programación.\n' +
      '2. **Emprendedores y negocios** → marca, manual de identidad, menús QR, publicidad y gestión de clientes.\n' +
      '3. **Empleo** → CV optimizado ATS, LinkedIn, cartas, portafolios, entrevistas y certificados.\n' +
      '4. **Diseño gráfico** → logos, flyers, packaging, tarjetas y retoque fotográfico.\n' +
      '5. **Desarrollo web y e-commerce** → páginas, landing, tiendas online, catálogos y UI/UX.\n' +
      '6. **Software y hardware** → sistemas a medida, bases de datos y DevOps.\n' +
      '7. **Automatización e IA** → asistentes, integración de IA y productividad.\n' +
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
      '• **Apoyo en proyectos de programación** (algoritmos y lógica).\n\n' +
      'Contanos tu tema y te pasamos una propuesta.'
  },
  {
    id: 'emprendedores',
    keywords: ['emprendedor', 'emprendedores', 'emprendimiento', 'negocio', 'negocios', 'pyme', 'marca', 'branding', 'identidad visual', 'manual de identidad', 'menus qr', 'menu qr', 'catalogo', 'catalogos', 'publicidad', 'promocion', 'promociones', 'oferta', 'ofertas', 'fechas especiales', 'whatsapp business', 'clientes', 'local', 'tienda'],
    answer:
      'Para emprendedores y negocios ofrecemos:\n' +
      '• **Creación de marca y branding básico**.\n' +
      '• **Manual de identidad visual** (paletas, tipografías, reglas 4x4).\n' +
      '• **Menús QR y catálogos de productos**.\n' +
      '• **Publicidad para promociones y ofertas** (flash sale, 2x1).\n' +
      '• **Publicidad para fechas especiales** (Navidad, Black Friday).\n' +
      '• **Gestión de clientes inicial** (WhatsApp Business y contactos).\n\n' +
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
      '• **Flyers, banners, pancartas y piezas para redes** (formato 4x4 y gran formato).\n' +
      '• **Packaging, etiquetas y catálogos físicos**.\n' +
      '• **Tarjetas de presentación e invitaciones** (con QR).\n' +
      '• **Edición y retoque fotográfico**.\n\n' +
      'Contame qué necesitás y te cotizamos.'
  },
  {
    id: 'web',
    keywords: ['web', 'pagina', 'paginas', 'pagina web', 'landing', 'landing page', 'sitio', 'tienda online', 'ecommerce', 'e-commerce', 'carrito', 'pedidos', 'catalogo online', 'blog', 'ui', 'ux', 'responsive', 'formulario', 'hosting', 'dominio', 'seo', 'portafolio web'],
    answer:
      'En desarrollo web y e-commerce ofrecemos:\n' +
      '• **Páginas web empresariales** y sitios corporativos.\n' +
      '• **Landing pages y portafolios personales** de alta conversión.\n' +
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
      '• **Diseño y gestión de bases de datos** (normalización, mantenimiento).\n' +
      '• **Soporte tecnológico y DevOps** (despliegue, servidores, monitoreo).\n\n' +
      'Contanos tu necesidad y te proponemos la arquitectura.'
  },
  {
    id: 'ia',
    keywords: ['ia', 'inteligencia artificial', 'chatbot', 'chatbots', 'asistente', 'asistentes', 'automatizacion', 'automatizar', 'automatico', 'crm', 'facturacion', 'correos', 'prompts', 'github', 'productividad', 'integracion', 'integraciones', 'predictivo'],
    answer:
      'Optimizamos procesos con automatización e IA:\n' +
      '• **Integración de soluciones con IA** (prompts, asistentes virtuales, análisis predictivo).\n' +
      '• **Automatización de procesos empresariales** (CRM, facturación, correos).\n' +
      '• **Gestión de herramientas de productividad** (entornos colaborativos y GitHub).\n\n' +
      '¿Qué tarea repetitiva querés automatizar?'
  },
  {
    id: 'personalizadas',
    keywords: ['medida', 'personalizada', 'personalizado', 'idea', 'problema', 'necesidad', 'no encaja', 'especial', 'diferente', 'desde cero'],
    answer:
      '¡Es nuestra especialidad! Aplicamos la filosofía **"Contanos tu problema, nosotros vemos cómo hacerlo"**:\n' +
      '1. **Contanos** tu idea o frustración.\n' +
      '2. **Analizamos** viabilidad y tecnologías.\n' +
      '3. **Proponemos** un plan con tiempos.\n' +
      '4. **Hacemos** la solución.\n' +
      '5. **Entregamos** con soporte y confidencialidad.\n\n' +
      'Describime tu caso y lo evaluamos.'
  },
  {
    id: 'precios',
    keywords: ['precio', 'precios', 'costo', 'costos', 'cuanto cuesta', 'cuanto sale', 'presupuesto', 'cotizacion', 'cotizar', 'tarifa', 'tarifas', 'packs', 'pack', 'plan', 'planes', 'suscripcion', 'inversion'],
    answer:
      'Cada proyecto se cotiza según su alcance. Te damos **presupuesto sin cargo** y, para mantenimiento, tenemos **planes de soporte** (Esencial, Profesional y Empresa).\n\n' +
      'Contanos qué necesitás y te pasamos un número concreto. También podés ver los packs en la sección **Promociones**.'
  },
  {
    id: 'como_trabajamos',
    keywords: ['como trabajan', 'proceso', 'metodologia', 'flujo', 'pasos', 'como es el proceso', 'plazos', 'tiempos', 'entrega', 'entregas', 'tiempo de entrega'],
    answer:
      'Trabajamos con un modelo transparente de 5 pasos:\n' +
      '1. **Contanos:** nos explicás tu idea o problema.\n' +
      '2. **Analizamos:** evaluamos viabilidad y tecnologías.\n' +
      '3. **Proponemos:** plan de acción, tiempos y presupuesto.\n' +
      '4. **Hacemos:** construimos el software, la identidad o el proyecto.\n' +
      '5. **Entregamos:** despliegue con resultados y soporte continuo.'
  },
  {
    id: 'pagos',
    keywords: ['pago', 'pagos', 'pagar', 'transferencia', 'qr', 'efectivo', 'tarjeta', 'factura', 'nit', 'banco', 'comprobante'],
    answer:
      'Métodos de pago disponibles:\n' +
      '• **Transferencia bancaria** a cuentas oficiales.\n' +
      '• **QR Simple**.\n' +
      '• **Efectivo** (para entregas locales).\n' +
      '• **Tarjeta** de débito/crédito.\n\n' +
      'Emitimos **factura** por todas las soluciones; solo danos tu NIT o CI.'
  },
  {
    id: 'soporte',
    keywords: ['soporte', 'mantenimiento', 'actualizacion', 'actualizaciones', 'monitoreo', 'backup', 'ayuda tecnica', 'falla', 'error'],
    answer:
      'Ofrecemos **soporte tecnológico continuo**: mantenimiento, actualizaciones, monitoreo y despliegue (DevOps).\n\n' +
      'Si tu proyecto ya está en marcha, contanos qué falla y lo revisamos.'
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
      'Nuestra oficina principal está en **Av. San Martín y 2do Anillo, Equipetrol, Santa Cruz**.\n\n' +
      'Horarios: **Lunes a viernes de 09:00 a 18:00**. También atendemos online.'
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
      'Trabajamos con **100% de confidencialidad** y garantía sobre lo entregado dentro del alcance acordado.\n\n' +
      'Podés ver detalles en **Términos** y **Privacidad** (pie de página).'
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
