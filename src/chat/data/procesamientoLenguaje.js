/**
 * Procesamiento de Lenguaje Natural (NLP) corporativo para el Asistente Niko.
 * Implementa un algoritmo de aproximación de preguntas mediante coincidencia de palabras clave,
 * ponderación de tokens y similitud semántica.
 */

const STOP_WORDS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al', 'en', 'para', 'por', 'con', 'sin',
  'sobre', 'bajo', 'entre', 'hacia', 'hasta', 'para', 'segun', 'y', 'o', 'pero', 'mas', 'que', 'como', 'donde',
  'cuando', 'quien', 'cual', 'cuales', 'este', 'esta', 'estos', 'estas', 'ese', 'esa', 'esos', 'esas', 'mi',
  'mis', 'tu', 'tus', 'su', 'sus', 'nos', 'me', 'te', 'le', 'les'
]);

const BANCO_CONOCIMIENTO = [
  {
    id: "saludos",
    keywords: ["hola", "buenos dias", "buenas tardes", "buenas noches", "saludos", "estimado", "niko", "comunicacion", "contacto"],
    answer: "¡Hola! Bienvenido a HagamosTech. Soy Niko, tu asistente virtual. Estoy aquí para ayudarte con información sobre nuestras soluciones tecnológicas, apoyo en proyectos académicos, digitalización de negocios y asesoría personalizada. ¿En qué te puedo ayudar hoy?"
  },
  {
    id: "despedida",
    keywords: ["adios", "chao", "nos vemos", "hasta luego", "bye", "cuidate", "feliz dia", "terminar", "cerrar", "finalizar"],
    answer: "¡Gracias por comunicarte con HagamosTech! Recuerda: ¿Tenés una necesidad? Hagámosla realidad. ¡Que tengas un excelente día!"
  },
  {
    id: "agradecimiento",
    keywords: ["gracias", "excelente", "amable", "ok", "bien", "perfecto", "mil gracias", "genial", "entendido", "comprendido"],
    answer: "¡Es un placer atenderte! En HagamosTech trabajamos para ofrecerte siempre lo mejor. Si tienes otra consulta, no dudes en preguntar."
  },
  {
    id: "soluciones_tech",
    keywords: ["tecnologia", "desarrollo", "sistema", "sistemas", "software", "aplicacion", "aplicaciones", "app", "ia", "inteligencia artificial", "automatizacion", "procesos", "base de datos", "bases de datos", "formularios", "gestion"],
    answer: "Ofrecemos soluciones tecnológicas a medida para personas y empresas:\n\n• **Desarrollo Web & Sistemas:** Portales, landing pages, catálogos en línea y sistemas de gestión.\n• **Automatización de Procesos:** Integración de APIs, chatbots inteligentes y automatización con IA.\n• **Soporte & Cloud:** Configuración de bases de datos y despliegue en la nube."
  },
  {
    id: "soluciones_academia",
    keywords: ["academia", "estudiante", "estudiantes", "universidad", "colegio", "proyecto", "proyectos", "tesis", "grado", "simulador", "simuladores", "programacion", "recursos", "documentacion", "guia"],
    answer: "Ayudamos a estudiantes, docentes e instituciones educativas:\n\n• **Proyectos Académicos:** Estructuración, codificación y lógica de sistemas.\n• **Simuladores Educativos:** Desarrollo de entornos interactivos en web.\n• **Guías y Recursos:** Diapositivas dinámicas, documentación técnica y material digital de estudio."
  },
  {
    id: "soluciones_negocios",
    keywords: ["negocio", "negocios", "emprendimiento", "emprendedores", "digitalizacion", "paginas", "catalogo", "catalogos", "pedidos", "presencia", "identidad", "clientes"],
    answer: "Impulsamos la presencia digital de pequeños y medianos negocios:\n\n• **Digitalización:** Catálogos digitales integrados, landing pages y sistemas de pedidos.\n• **Gestión:** Formularios de contacto y herramientas internas para organizar tus clientes.\n• **Identidad Visual:** Presencia web profesional con enlaces directos a WhatsApp."
  },
  {
    id: "como_trabajamos",
    keywords: ["como trabajan", "proceso", "metodologia", "flujo", "pasos", "hacer", "desarrollo", "entrega", "analisis", "propuesta", "modelo"],
    answer: "Trabajamos bajo un modelo transparente de 5 pasos:\n\n1. **Contanos:** Nos explicas tu idea o problema.\n2. **Analizamos:** Estudiamos las mejores tecnologías aplicables.\n3. **Proponemos:** Planteamos la solución y el presupuesto.\n4. **Hacemos:** Desarrollamos y construimos la herramienta.\n5. **Entregamos:** Recibes el resultado listo para usar."
  },
  {
    id: "metodos_pago",
    keywords: ["pago", "pagar", "tarjeta", "qr", "efectivo", "transferencia", "factura", "nit", "banco", "comprobante"],
    answer: "Aceptamos múltiples métodos de pago para tu comodidad:\n\n• **Transferencias Bancarias** (a nuestras cuentas oficiales).\n• **Pago rápido por QR Simple**.\n• **Efectivo** (para entregas locales).\n\nEmitimos factura por todas tus soluciones. Solo indícanos tus datos de facturación."
  },
  {
    id: "contacto_humano",
    keywords: ["hablar", "whatsapp", "vendedor", "telefono", "celular", "llamar", "atencion directa", "soporte humano", "asesor directo", "persona", "humano"],
    answer: "Si deseas realizar un pedido o necesitas atención personalizada, puedes comunicarte directamente con nuestro equipo de atención al cliente:\n\n💬 **WhatsApp:** [+591 61320004](https://api.whatsapp.com/send?phone=59161320004)\n📧 **Email:** contacto@hagamostech.bo"
  },
  {
    id: "soluciones_personalizadas",
    keywords: ["personalizada", "personalizado", "diferente", "idea", "problema", "caso", "analizar", "hacer", "crear", "medida"],
    answer: "¡Por supuesto! Si tu necesidad no encaja en una categoría común, contanos el problema y nosotros nos encargamos de diseñar y construir la solución desde cero para ti."
  }
];

const tokenizarYLimpiar = (texto) => {
  if (!texto) return [];
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[^a-z0-9\s]/g, "") 
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOP_WORDS.has(token));
};

export const analizarMensajeUsuario = (text) => {
  const tokensUsuario = tokenizarYLimpiar(text);
  
  if (tokensUsuario.length === 0) {
    return 'Por favor, escríbeme tu consulta. Puedo ayudarte con información sobre nuestras soluciones tecnológicas, académicas y para negocios.';
  }

  let mejorIntento = null;
  let puntuacionMaxima = 0;

  for (const intento of BANCO_CONOCIMIENTO) {
    let coincidenciaTotal = 0;
    
    for (const keyword of intento.keywords) {
      const tokensKeyword = tokenizarYLimpiar(keyword);
      const interseccion = tokensKeyword.filter(t => tokensUsuario.includes(t));
      
      if (interseccion.length > 0) {
        const pesoCoincidencia = (interseccion.length / tokensKeyword.length) * interseccion.length;
        coincidenciaTotal += pesoCoincidencia;
      }
    }

    const puntuacionIntento = coincidenciaTotal / (intento.keywords.length * 0.12 + 1);

    if (puntuacionIntento > puntuacionMaxima) {
      puntuacionMaxima = puntuacionIntento;
      mejorIntento = intento;
    }
  }

  const UMBRAL_ACEPTACION = 0.20;
  if (mejorIntento && puntuacionMaxima >= UMBRAL_ACEPTACION) {
    console.log(`NLP | Match formal: ${mejorIntento.id} (Score: ${puntuacionMaxima.toFixed(2)})`);
    return mejorIntento.answer;
  }

  for (const intento of BANCO_CONOCIMIENTO) {
    for (const keyword of intento.keywords) {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        console.log(`NLP | Match formal secundario (includes): ${intento.id}`);
        return intento.answer;
      }
    }
  }

  console.log(`NLP | No match. Max Score: ${puntuacionMaxima.toFixed(2)}`);
  return 'No estoy seguro de entender tu consulta.\n\nPuedo ayudarte con información sobre:\n\n• **💻 Soluciones Tecnológicas (Web, Apps).**\n• **🎓 Apoyo Académico (Proyectos, Tesis).**\n• **🏪 Digitalización de Negocios y Emprendedores.**\n• **🧩 Nuestro Flujo de Trabajo (Cómo trabajamos).**\n\nSi deseas hablar directamente con un asesor, escribe la palabra **"whatsapp"** o **"asesor"** para redirigirte.';
};
