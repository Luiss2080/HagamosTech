export const URL_WHATSAPP = "https://api.whatsapp.com/send?phone=59161320004&text=Hola,%20necesito%20hablar%20con%20un%20asesor.";

export const config_CHAT = {
  botName: 'Niko',
  botRole: 'Asistente Virtual',
  initialMessage: '¡Hola! 👋 Soy **Niko**, asistente de **LOS CASTORES**. Preguntame sobre nuestro **menú, sucursales o pedidos.** ¿En qué te ayudo hoy?',
  followUpMessages: {
    afterQuestion: '¿Necesitas algo más?',
    afterUnknown: 'También puedes abrir el menú **(⋮)** para ver todos los temas.',
  },
  timing: {
    categoryResponse: 600,
    questionResponse: 800,
    followUpDelay: 1500,
    unknownFollowUpDelay: 2000,
    typingSimulation: 600,
  },
};
