const crypto = require('crypto');

// Tokens de sesión firmados (HMAC-SHA256, estilo JWT), sin dependencias.
// Formato: base64url(header).base64url(payload).firma
// Payload: { sub: <usuarioId>, iat: <ms>, exp: <ms> }

const SECRET = process.env.JWT_SECRET || 'hagamostech_dev_secret_key_2026';
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
const verificarToken = (token) => {
    if (!token || typeof token !== 'string') return null;

    const partes = token.split('.');

    if (partes.length === 3) {
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
    }

    // Compatibilidad temporal con el token legado: token-user-<id>-<ts>
    const legado = token.match(/^token-user-(\d+)-\d+$/);
    return legado ? parseInt(legado[1]) : null;
};

module.exports = { firmarToken, verificarToken, EXPIRACION_MS };
