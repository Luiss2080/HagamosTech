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
    answer: "¡Hola! Bienvenido a Los Castores. Soy Niko, tu asistente virtual. Estoy aquí para ayudarte con información sobre nuestro menú de salteñas, horarios, sucursales y envíos. ¿En qué te puedo ayudar hoy?"
  },
  {
    id: "despedida",
    keywords: ["adios", "chao", "nos vemos", "hasta luego", "bye", "cuidate", "feliz dia", "terminar", "cerrar", "finalizar"],
    answer: "¡Gracias por comunicarte con Los Castores! Esperamos verte pronto disfrutando de las mejores salteñas. ¡Que tengas un excelente día!"
  },
  {
    id: "agradecimiento",
    keywords: ["gracias", "excelente", "amable", "ok", "bien", "perfecto", "mil gracias", "genial", "entendido", "comprendido"],
    answer: "¡Es un placer atenderte! En Los Castores trabajamos para ofrecerte siempre lo mejor. Si tienes otra consulta, no dudes en preguntar."
  },
  {
    id: "menu_saltenas",
    keywords: ["menu", "salteña", "salteñas", "sabor", "sabores", "pollo", "carne", "fricase", "hoja", "especial", "normal", "picante", "dulce", "precios", "carta"],
    answer: "Nuestro menú destaca por el verdadero sabor tradicional:\n\n• **Salteñas de Pollo y Carne:** (Normales, Picantes y Dulces).\n• **Salteñas Especiales:** (Fricasé, Santa Cruz, etc.).\n• **Bebidas:** Refrescos de fruta natural (mocochinchi, maracuyá) y cafetería.\n\nTodos nuestros productos son horneados diariamente con los mejores ingredientes."
  },
  {
    id: "ubicacion_tienda",
    keywords: ["ubicacion", "donde", "direccion", "tienda", "sucursal", "llegar", "maps", "local", "santa cruz", "bolivia", "calle", "ciudad", "quedan", "estan"],
    answer: "Tenemos varias sucursales en Santa Cruz de la Sierra para que siempre tengas una cerca de ti. Nuestra **Sede Central** está ubicada en:\n\n📍 Av. San Martín y 2do Anillo, Equipetrol.\n\nPuedes ver la ubicación exacta de todas nuestras sucursales en la sección de 'Sucursales' de la web."
  },
  {
    id: "horario_atencion",
    keywords: ["horario", "hora", "abierto", "cierran", "abren", "atencion", "fines de semana", "domingo", "sabado", "feriado", "cuando"],
    answer: "Te esperamos para disfrutar de tus salteñas favoritas en los siguientes horarios:\n\n• **Lunes a Domingo:** De 07:00 a 22:00 hrs.\n\n*Nota: Los horarios pueden variar ligeramente según la sucursal o en días feriados.*"
  },
  {
    id: "envios_pedidos",
    keywords: ["envio", "pedir", "delivery", "llegar", "tiempo", "domicilio", "llega", "moto", "repartidor", "pedido", "casa", "oficina"],
    answer: "¡Claro que sí! Contamos con servicio de **Delivery Express** para que disfrutes de nuestras salteñas calientitas sin salir de casa u oficina.\n\nPuedes realizar tu pedido comunicándote directamente a nuestro WhatsApp o teléfono fijo. Hacemos envíos rápidos en toda la zona metropolitana de Santa Cruz."
  },
  {
    id: "metodos_pago",
    keywords: ["pago", "pagar", "tarjeta", "qr", "efectivo", "transferencia", "factura", "nit", "banco", "comprobante"],
    answer: "Aceptamos múltiples métodos de pago para tu comodidad:\n\n• **Efectivo** (en todas nuestras sucursales y delivery).\n• **Pago rápido por QR Simple**.\n• **Tarjetas de Débito/Crédito**.\n\nAdemás, emitimos factura por todas tus compras. Solo indícanos tus datos de facturación al realizar tu pedido."
  },
  {
    id: "contacto_humano",
    keywords: ["hablar", "whatsapp", "vendedor", "telefono", "celular", "llamar", "atencion directa", "soporte humano", "asesor directo", "persona", "humano"],
    answer: "Si deseas realizar un pedido grande o necesitas atención personalizada, puedes comunicarte directamente con nuestro equipo de atención al cliente:\n\n💬 **WhatsApp / Pedidos:** [+591 61320004](https://api.whatsapp.com/send?phone=59161320004)\n📧 **Email:** contacto@loscastores.bo"
  },
  {
    id: "eventos_catering",
    keywords: ["evento", "catering", "fiesta", "cumpleaños", "reunion", "oficina", "cantidad", "por mayor", "pedido grande", "reserva"],
    answer: "¡Por supuesto! En Los Castores ofrecemos servicio de **Eventos y Catering**.\n\nAtendemos pedidos por mayor para cumpleaños, reuniones de oficina, desayunos de trabajo y celebraciones. Te recomendamos hacer tu reserva con al menos 24 horas de anticipación para asegurar disponibilidad y entrega puntual."
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
    return 'Por favor, escríbeme tu consulta. Puedo ayudarte con información sobre nuestro menú, horarios, sucursales y pedidos a domicilio.';
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
  return 'No estoy seguro de entender tu consulta.\n\nPuedo ayudarte con información sobre:\n\n• **🥟 Nuestro Menú y Sabores.**\n• **📍 Sucursales y Horarios.**\n• **🛵 Pedidos por Delivery.**\n• **🎉 Catering para Eventos.**\n\nSi deseas hacer un pedido ahora mismo, puedes escribir la palabra **"whatsapp"** o **"asesor"** para hablar directamente con nosotros.';
};
