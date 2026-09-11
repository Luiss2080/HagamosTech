// Utilidades TOTP (RFC 6238) compatibles con Google Authenticator.
// Implementación propia con el módulo `crypto` de Node (sin dependencias externas).

const crypto = require('crypto');

const B32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const STEP = 30; // segundos por paso
const DIGITS = 6;

// ── Base32 ────────────────────────────────────────────────────────────

function base32Encode(buffer) {
    let bits = 0;
    let value = 0;
    let output = '';
    for (let i = 0; i < buffer.length; i++) {
        value = (value << 8) | buffer[i];
        bits += 8;
        while (bits >= 5) {
            output += B32_ALPHABET[(value >>> (bits - 5)) & 31];
            bits -= 5;
        }
    }
    if (bits > 0) {
        output += B32_ALPHABET[(value << (5 - bits)) & 31];
    }
    return output;
}

function base32Decode(str) {
    const clean = str.toUpperCase().replace(/=+$/, '').replace(/\s+/g, '');
    let bits = 0;
    let value = 0;
    const bytes = [];
    for (let i = 0; i < clean.length; i++) {
        const idx = B32_ALPHABET.indexOf(clean[i]);
        if (idx === -1) continue;
        value = (value << 5) | idx;
        bits += 5;
        if (bits >= 8) {
            bytes.push((value >>> (bits - 8)) & 0xff);
            bits -= 8;
        }
    }
    return Buffer.from(bytes);
}

// ── Secret ────────────────────────────────────────────────────────────

function generarSecret(bytes = 20) {
    return base32Encode(crypto.randomBytes(bytes));
}

// ── Código ────────────────────────────────────────────────────────────

function calcularCodigo(secret, timestamp = Date.now(), digits = DIGITS) {
    const counter = Math.floor(timestamp / 1000 / STEP);
    const key = base32Decode(secret);
    const msg = Buffer.alloc(8);
    msg.writeBigUInt64BE(BigInt(counter));
    const hmac = crypto.createHmac('sha1', key).update(msg).digest();
    const offset = hmac[hmac.length - 1] & 0x0f;
    const binCode =
        ((hmac[offset] & 0x7f) << 24) |
        ((hmac[offset + 1] & 0xff) << 16) |
        ((hmac[offset + 2] & 0xff) << 8) |
        (hmac[offset + 3] & 0xff);
    return (binCode % Math.pow(10, digits)).toString().padStart(digits, '0');
}

// Verifica el código permitiendo ±1 paso de desfase (ventana estándar).
function verificarCodigo(secret, codigo, window = 1) {
    if (!secret || !codigo) return false;
    const code = String(codigo).replace(/\D/g, '');
    if (code.length !== DIGITS) return false;
    const now = Date.now();
    for (let i = -window; i <= window; i++) {
        const candidato = calcularCodigo(secret, now + i * STEP * 1000, DIGITS);
        if (candidato === code) return true;
    }
    return false;
}

// ── URI otpauth (para el QR de Google Authenticator) ──────────────────

function otpauthUrl(secret, cuenta, emisor = 'HAGAMOSTECH') {
    const params = new URLSearchParams({
        secret,
        issuer: emisor,
        algorithm: 'SHA1',
        digits: String(DIGITS),
        period: String(STEP)
    });
    // El formato canónico de Google Authenticator usa la etiqueta "Emisor:cuenta"
    // sin codificar los separadores (solo se codifican espacios).
    return `otpauth://totp/${encodeURI(`${emisor}:${cuenta}`)}?${params.toString()}`;
}

module.exports = {
    generarSecret,
    calcularCodigo,
    verificarCodigo,
    otpauthUrl,
    STEP,
    DIGITS
};
