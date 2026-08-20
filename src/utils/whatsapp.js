export const WHATSAPP_NUMBERS = ['59160936506', '59165945908', '59165945901'];

export const getRandomWhatsApp = () => {
    return WHATSAPP_NUMBERS[Math.floor(Math.random() * WHATSAPP_NUMBERS.length)];
};
