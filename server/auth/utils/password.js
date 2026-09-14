const crypto = require('crypto');

// Hash de contraseñas con scrypt (nativo de Node, sin dependencias).
// Formato almacenado: `scrypt$<saltHex>$<hashHex>`.

const SALT_BYTES = 16;
const KEYLEN = 64;

const esHashPassword = (valor) =>
    typeof valor === 'string' && valor.startsWith('scrypt$');

const hashearContrasena = (plano) =>
    new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(SALT_BYTES).toString('hex');
        crypto.scrypt(String(plano), salt, KEYLEN, (err, derivada) => {
            if (err) return reject(err);
            resolve(`scrypt$${salt}$${derivada.toString('hex')}`);
        });
    });

const hashearContrasenaSync = (plano) => {
    const salt = crypto.randomBytes(SALT_BYTES).toString('hex');
    const derivada = crypto.scryptSync(String(plano), salt, KEYLEN);
    return `scrypt$${salt}$${derivada.toString('hex')}`;
};

// Compara en tiempo constante. Acepta texto plano legado (usuarios previos).
const verificarContrasena = (plano, almacenada) =>
    new Promise((resolve) => {
        if (!almacenada) return resolve(false);

        if (!esHashPassword(almacenada)) {
            return resolve(String(plano) === String(almacenada));
        }

        const [, salt, hashHex] = almacenada.split('$');
        crypto.scrypt(String(plano), salt, KEYLEN, (err, derivada) => {
            if (err) return resolve(false);
            const esperada = Buffer.from(hashHex, 'hex');
            resolve(esperada.length === derivada.length && crypto.timingSafeEqual(esperada, derivada));
        });
    });

module.exports = {
    esHashPassword,
    hashearContrasena,
    hashearContrasenaSync,
    verificarContrasena
};
