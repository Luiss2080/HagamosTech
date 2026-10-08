const crypto = require('crypto');

// Tokens de sesión firmados (HMAC-SHA256, estilo JWT), sin dependencias.
// Formato: base64url(header).base64url(payload).firma
// Payload: { sub: <usuarioId>, iat: <ms>, exp: <ms> }

// JWT_SECRET es obligatorio en producción: sin él el proceso no arranca. Solo en desarrollo/tests se
// usa un valor de prueba explícito (nunca sirve para firmar tokens de producción).
const SECRETO_SOLO_DESARROLLO = 'hagamostech_dev_secret_key_2026';
const resolverSecreto = (env = process.env) => {
    if (env.JWT_SECRET) return env.JWT_SECRET;
    if (env.NODE_ENV === 'production') {
        throw new Error('JWT_SECRET no está definido. Es obligatorio en producción.');
    }
    return SECRETO_SOLO_DESARROLLO;
};
const SECRET = resolverSecreto();
const EXPIRACION_MS = 1000 * 60 * 60 * 24 * 7; // 7 días

const aBase64Url = (valor) => Buffer.from(valor).toString('base64url');
const firmar = (data) => crypto.createHmac('sha256', SECRET).update(data).digest('base64url');

const firmarToken = (usuarioId) => {
    const header = aBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = aBase64Url(JSON.stringify({
        sub: Number(usuarioId),
        iat: Date.now(),
        exp: Date.now() + EXPIRACION_MS
    }));
    const data = `${header}.${payload}`;
    return `${data}.${firmar(data)}`;
};

const compararSeguro = (a, b) => {
    const bufferA = Buffer.from(a);
    const bufferB = Buffer.from(b);
    return bufferA.length === bufferB.length && crypto.timingSafeEqual(bufferA, bufferB);
};

// Devuelve el id de usuario o null si el token es inválido/expiró.
// El token legado token-user-<id>-<ts> ya no se acepta: cualquiera podía forjarlo.
const verificarToken = (token) => {
    if (!token || typeof token !== 'string') return null;

    const partes = token.split('.');
    if (partes.length !== 3) return null;

    const [header, payload, firma] = partes;
    const esperada = firmar(`${header}.${payload}`);
    if (!compararSeguro(firma, esperada)) return null;

    try {
        const json = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        if (!json.exp || Date.now() > json.exp) return null;
        const id = parseInt(json.sub);
        return Number.isNaN(id) ? null : id;
    } catch {
        return null;
    }
};

module.exports = { firmarToken, verificarToken, resolverSecreto, EXPIRACION_MS };
