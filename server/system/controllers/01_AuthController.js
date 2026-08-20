const prisma = require('../../models/prisma');
const crypto = require('crypto');
const {
    generarSecret,
    verificarCodigo,
    otpauthUrl
} = require('../utils/02_totp');
const { enviarCorreoVerificacion, enviarCorreoRecuperacion } = require('../utils/01_mailer');

// Roles que exigen doble factor (2FA / Google Authenticator) al iniciar sesión
const ROLES_2FA = [1, 12, 13]; // Administrador, Secretaria, Personal LosHagamosTech

const leer2FA = async (usuarioId) => {
    const u = await prisma.usuario.findUnique({
        where: { id: usuarioId },
        select: { twoFactorSecret: true, twoFactorEnabled: true }
    });
    return {
        twoFactorSecret: u ? u.twoFactorSecret : null,
        twoFactorEnabled: u ? u.twoFactorEnabled : false
    };
};

const guardarSecret2FA = (usuarioId, secret) =>
    prisma.usuario.update({ where: { id: usuarioId }, data: { twoFactorSecret: secret } });

const set2FAHabilitado = (usuarioId, habilitado) =>
    prisma.usuario.update({ where: { id: usuarioId }, data: { twoFactorEnabled: habilitado } });

const obtenerUsuarioPorToken = async (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    const token = authHeader.split(' ')[1];
    const parts = token.split('-');
    const userId = parseInt(parts[2]);
    if (isNaN(userId)) return null;
    return prisma.usuario.findUnique({
        where: { id: userId },
        include: {
            rol: {
                include: {
                    detalleRolPermisos: { include: { permiso: true } }
                }
            },
            suscripcion: true
        }
    });
};

const construirRespuestaUsuario = (usuario, dosFA) => {
    const permisos = usuario.rol?.detalleRolPermisos.map(drp => drp.permiso.nombre) || [];
    let estadoSuscripcion = usuario.suscripcion?.estado || null;
    const finPrueba = usuario.suscripcion?.fechaFinPrueba;
    if (estadoSuscripcion === 'suscrito' && finPrueba && new Date() > finPrueba) {
        estadoSuscripcion = 'vencido';
    }
    
    // Preparar info del cupón
    let infoCupon = null;
    if (usuario.cuponDescuento) {
        const expirado = new Date() > (usuario.cuponDescuento.fechaExpiracionExtendida || usuario.cuponDescuento.fechaExpiracion);
        let estadoCupon = usuario.cuponDescuento.estado;
        if (estadoCupon === 'pendiente' && expirado) {
            estadoCupon = 'inactivo';
        }
        infoCupon = {
            estado: estadoCupon,
            fechaExpiracion: usuario.cuponDescuento.fechaExpiracion,
            fechaExpiracionExtendida: usuario.cuponDescuento.fechaExpiracionExtendida,
            extendido: usuario.cuponDescuento.extendido,
            codigo: usuario.cuponDescuento.codigo
        };
    }

    return {
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        numci: usuario.numci,
        fenac: usuario.fenac,
        numtel: usuario.numtel,
        nomcol: usuario.nomcol,
        fotoPerfil: usuario.fotoPerfil || '',
        rolId: usuario.rolId,
        rolNombre: usuario.rol?.nombre || 'Usuario',
        permisos,
        twoFactorEnabled: !!dosFA?.twoFactorEnabled,
        emailVerificado: !!usuario.emailVerificado,
        suscripcion: estadoSuscripcion ? {
            estado: estadoSuscripcion,
            fechaFinPrueba: finPrueba
        } : null,
        cupon: infoCupon
    };
};

const AuthController = {
    login: async (req, res) => {
        const { correo, contrasena } = req.body;
        try {
            const usuario = await prisma.usuario.findFirst({
                where: { correo },
                include: {
                    rol: {
                        include: {
                            detalleRolPermisos: { include: { permiso: true } }
                        }
                    },
                    suscripcion: true,
                    cuponDescuento: true
                }
            });
            if (!usuario || usuario.contrasena !== contrasena) {
                return res.status(401).json({ mensaje: 'Credenciales inválidas' });
            }
            if (!usuario.activo) {
                return res.status(403).json({ mensaje: 'Cuenta desactivada' });
            }

            const dosFA = await leer2FA(usuario.id);

            // Los roles con 2FA obligatorio requieren el código del autenticador
            if (ROLES_2FA.includes(usuario.rolId)) {
                let secret = dosFA.twoFactorSecret;
                if (!secret) {
                    secret = generarSecret();
                    await guardarSecret2FA(usuario.id, secret);
                }
                // Mientras la cuenta no esté vinculada al autenticador, se re-muestra el QR
                if (!dosFA.twoFactorEnabled) {
                    return res.json({
                        exito: true,
                        requiere2fa: true,
                        primerUso: true,
                        usuarioId: usuario.id,
                        nombre: usuario.nombre,
                        correo: usuario.correo,
                        secret,
                        otpauthUrl: otpauthUrl(secret, usuario.correo)
                    });
                }
                return res.json({
                    exito: true,
                    requiere2fa: true,
                    primerUso: false,
                    usuarioId: usuario.id,
                    nombre: usuario.nombre,
                    correo: usuario.correo
                });
            }

            res.json({
                exito: true,
                token_acceso: `token-user-${usuario.id}-${Date.now()}`,
                usuario: construirRespuestaUsuario(usuario, dosFA)
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error durante el inicio de sesión' });
        }
    },

    // Segundo paso del login: valida el código TOTP y emite el token
    verificar2fa: async (req, res) => {
        const { usuarioId, codigo } = req.body;
        try {
            const userId = parseInt(usuarioId);
            if (isNaN(userId)) {
                return res.status(400).json({ mensaje: 'Datos de inicio de sesión inválidos' });
            }
            const usuario = await prisma.usuario.findUnique({
                where: { id: userId },
                include: {
                    rol: {
                        include: {
                            detalleRolPermisos: { include: { permiso: true } }
                        }
                    },
                    suscripcion: true,
                    cuponDescuento: true
                }
            });
            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
            const dosFA = await leer2FA(userId);
            if (!dosFA.twoFactorSecret) {
                return res.status(400).json({ mensaje: 'El doble factor no está configurado para esta cuenta' });
            }
            if (!verificarCodigo(dosFA.twoFactorSecret, codigo, 2)) {
                return res.status(400).json({ mensaje: 'El código de autenticación es incorrecto' });
            }
            if (!dosFA.twoFactorEnabled) {
                await set2FAHabilitado(userId, true);
            }
            res.json({
                exito: true,
                token_acceso: `token-user-${usuario.id}-${Date.now()}`,
                usuario: construirRespuestaUsuario(usuario, { ...dosFA, twoFactorEnabled: true })
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al verificar el código de autenticación' });
        }
    },

    // Regenera el secreto únicamente durante la configuración inicial del 2FA.
    regenerarQR2FA: async (req, res) => {
        const userId = parseInt(req.body.usuarioId);
        const { correo, contrasena } = req.body;
        try {
            if (isNaN(userId) || !correo || !contrasena) {
                return res.status(400).json({ mensaje: 'Datos de inicio de sesión inválidos' });
            }

            const usuario = await prisma.usuario.findUnique({
                where: { id: userId },
                select: { id: true, correo: true, contrasena: true, activo: true, twoFactorEnabled: true }
            });
            if (!usuario || usuario.correo !== correo || usuario.contrasena !== contrasena) {
                return res.status(401).json({ mensaje: 'Credenciales inválidas' });
            }
            if (!usuario.activo) {
                return res.status(403).json({ mensaje: 'Cuenta desactivada' });
            }
            const secret = generarSecret();
            await prisma.usuario.update({
                where: { id: userId },
                data: { twoFactorSecret: secret, twoFactorEnabled: false }
            });
            return res.json({
                exito: true,
                secret,
                otpauthUrl: otpauthUrl(secret, usuario.correo)
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'No se pudo regenerar el código QR' });
        }
    },

    // Genera y envía código de verificación (no bloquea la respuesta)
    generarYEnviarCodigo: ({ id, correo, nombre, codigo }) => {
        enviarCorreoVerificacion({ to: correo, nombre, codigo, expiraMin: 15 });
    },

    registro: async (req, res) => {
        const { nombre, correo, contrasena } = req.body;
        try {
            const usuarioExistente = await prisma.usuario.findFirst({ where: { correo } });
            if (usuarioExistente) {
                return res.status(400).json({ mensaje: 'El correo ya está registrado' });
            }

            const codigo = String(Math.floor(100000 + Math.random() * 900000));
            const token = crypto.randomBytes(32).toString('hex');

            const pendiente = await prisma.registroPendiente.create({
                data: {
                    nombre,
                    correo,
                    contrasena,
                    codigo,
                    token,
                    expiraEn: new Date(Date.now() + 15 * 60 * 1000)
                }
            });

            AuthController.generarYEnviarCodigo(pendiente);

            res.status(201).json({
                exito: true,
                requiereVerificacion: true,
                usuarioId: pendiente.id,
                nombre: pendiente.nombre,
                correo: pendiente.correo,
                mensaje: 'Revisa tu correo e ingresa el código de verificación para activar tu cuenta.'
            });
        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({ error: 'Error durante el registro' });
        }
    },

    // Valida el código enviado por correo y completa el alta (inicia sesión)
    verificarCorreo: async (req, res) => {
        const { usuarioId, codigo } = req.body;
        try {
            const pendienteId = parseInt(usuarioId);
            if (isNaN(pendienteId)) {
                return res.status(400).json({ mensaje: 'Datos de verificación inválidos' });
            }
            const pendiente = await prisma.registroPendiente.findUnique({ where: { id: pendienteId } });
            if (!pendiente || pendiente.usado) {
                return res.status(400).json({ mensaje: 'Código inválido o ya utilizado' });
            }
            if (new Date() > new Date(pendiente.expiraEn)) {
                return res.status(400).json({ mensaje: 'El código ha expirado. Solicita uno nuevo.' });
            }
            if (String(pendiente.codigo) !== String(codigo).replace(/\D/g, '')) {
                return res.status(400).json({ mensaje: 'El código de verificación es incorrecto' });
            }

            await prisma.registroPendiente.deleteMany({
                where: { correo: pendiente.correo }
            });

            let rolInvitado = await prisma.rol.findFirst({ where: { nombre: 'Invitado' } });
            if (!rolInvitado) {
                rolInvitado = await prisma.rol.create({ data: { nombre: 'Invitado' } });
            }

            const usuario = await prisma.usuario.create({
                data: {
                    nombre: pendiente.nombre,
                    correo: pendiente.correo,
                    contrasena: pendiente.contrasena,
                    rolId: rolInvitado.id,
                    emailVerificado: true,
                    cuponDescuento: {
                        create: {
                            estado: 'pendiente',
                            fechaExpiracion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 72 horas para reclamar
                        }
                    }
                },
                include: {
                    rol: { include: { detalleRolPermisos: { include: { permiso: true } } } },
                    suscripcion: true,
                    cuponDescuento: true
                }
            });

            const dosFA = await leer2FA(usuario.id);

            res.json({
                exito: true,
                mensaje: 'Correo verificado correctamente',
                token_acceso: `token-user-${usuario.id}-${Date.now()}`,
                usuario: construirRespuestaUsuario(usuario, dosFA)
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al verificar el correo' });
        }
    },

    // Envía el correo de recuperación de contraseña con un enlace temporal
    solicitarRecuperacion: async (req, res) => {
        const { correo } = req.body;
        try {
            if (!correo) {
                return res.status(400).json({ mensaje: 'El correo es requerido' });
            }
            const usuario = await prisma.usuario.findFirst({ where: { correo } });
            if (!usuario) {
                // No revelar si el correo existe o no
                return res.json({ success: true, mensaje: 'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.' });
            }

            const token = crypto.randomBytes(32).toString('hex');
            const ip = req.ip || req.socket?.remoteAddress || '';
            await prisma.recuperacionPassword.create({
                data: {
                    usuarioId: usuario.id,
                    token,
                    expiraEn: new Date(Date.now() + 30 * 60 * 1000),
                    ipSolicitud: ip
                }
            });

            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4000';
            const enlace = `${frontendUrl}/recuperar-contrasena?token=${token}`;

            enviarCorreoRecuperacion({
                to: usuario.correo,
                nombre: usuario.nombre,
                enlace,
                expiraMin: 30
            });

            res.json({ success: true, mensaje: 'Revisa tu correo electrónico: te enviamos un enlace para restablecer tu contraseña.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al solicitar la recuperación de contraseña' });
        }
    },

    // Valida el enlace y actualiza la contraseña
    restablecerContrasena: async (req, res) => {
        const { token, nuevaContrasena } = req.body;
        try {
            if (!token || !nuevaContrasena) {
                return res.status(400).json({ mensaje: 'Enlace y nueva contraseña son requeridos' });
            }
            if (String(nuevaContrasena).length < 6) {
                return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 6 caracteres' });
            }
            const row = await prisma.recuperacionPassword.findFirst({
                where: { token },
                orderBy: { id: 'desc' }
            });
            if (!row) {
                return res.status(400).json({ mensaje: 'El enlace de recuperación no es válido' });
            }
            if (row.usado) {
                return res.status(400).json({ mensaje: 'Este enlace ya fue utilizado. Solicita uno nuevo.' });
            }
            if (new Date() > new Date(row.expiraEn)) {
                return res.status(400).json({ mensaje: 'El enlace ha expirado. Solicita uno nuevo.' });
            }

            await prisma.usuario.update({
                where: { id: row.usuarioId },
                data: { contrasena: String(nuevaContrasena) }
            });
            await prisma.recuperacionPassword.update({
                where: { id: row.id },
                data: { usado: true, usadoEn: new Date() }
            });

            res.json({ success: true, mensaje: 'Contraseña restablecida correctamente. Ya puedes iniciar sesión.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al restablecer la contraseña' });
        }
    },

    // Reenvía un nuevo código de verificación
    reenviarCorreo: async (req, res) => {
        const { usuarioId } = req.body;
        try {
            const pendienteId = parseInt(usuarioId);
            if (isNaN(pendienteId)) {
                return res.status(400).json({ mensaje: 'Datos de verificación inválidos' });
            }
            const pendiente = await prisma.registroPendiente.findUnique({ where: { id: pendienteId } });
            if (!pendiente) {
                return res.status(404).json({ mensaje: 'Solicitud de registro no encontrada' });
            }

            const codigo = String(Math.floor(100000 + Math.random() * 900000));
            await prisma.registroPendiente.update({
                where: { id: pendienteId },
                data: { codigo, expiraEn: new Date(Date.now() + 15 * 60 * 1000) }
            });

            AuthController.generarYEnviarCodigo({ ...pendiente, codigo });
            res.json({ success: true, mensaje: 'Se envió un nuevo código de verificación a tu correo.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al reenviar el código de verificación' });
        }
    },

    perfil: async (req, res) => {
        try {
            const usuario = await obtenerUsuarioPorToken(req);
            if (!usuario) {
                return res.status(401).json({ mensaje: 'No autorizado' });
            }
            const dosFA = await leer2FA(usuario.id);
            res.json({ success: true, data: construirRespuestaUsuario(usuario, dosFA) });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener perfil' });
        }
    },

    actualizarPerfil: async (req, res) => {
        try {
            const usuario = await obtenerUsuarioPorToken(req);
            if (!usuario) {
                return res.status(401).json({ mensaje: 'No autorizado' });
            }

            const { nombre, apellido, numci, fenac, numtel, nomcol, fotoPerfil } = req.body;

            const dataToUpdate = {};
            if (nombre !== undefined) dataToUpdate.nombre = nombre;
            if (apellido !== undefined) dataToUpdate.apellido = apellido;
            if (numci !== undefined) dataToUpdate.numci = numci;
            if (fenac !== undefined) dataToUpdate.fenac = fenac ? new Date(fenac) : null;
            if (numtel !== undefined) dataToUpdate.numtel = numtel;
            if (nomcol !== undefined) dataToUpdate.nomcol = nomcol;
            if (fotoPerfil !== undefined) dataToUpdate.fotoPerfil = fotoPerfil;

            const actualizado = await prisma.usuario.update({
                where: { id: usuario.id },
                data: dataToUpdate,
                include: {
                    rol: {
                        include: {
                            detalleRolPermisos: { include: { permiso: true } }
                        }
                    },
                    suscripcion: true,
                    cuponDescuento: true
                }
            });

            const dosFA = await leer2FA(usuario.id);
            res.json({ success: true, data: construirRespuestaUsuario(actualizado, dosFA) });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar perfil' });
        }
    },

    // ── Gestión 2FA desde el perfil ──────────────────────────────────
    obtenerSetup2FA: async (req, res) => {
        try {
            const usuario = await obtenerUsuarioPorToken(req);
            if (!usuario) {
                return res.status(401).json({ mensaje: 'No autorizado' });
            }
            const dosFA = await leer2FA(usuario.id);
            let secret = dosFA.twoFactorSecret;
            if (!secret) {
                secret = generarSecret();
                await guardarSecret2FA(usuario.id, secret);
            }
            res.json({
                success: true,
                secret,
                otpauthUrl: otpauthUrl(secret, usuario.correo),
                enabled: dosFA.twoFactorEnabled
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al generar la configuración 2FA' });
        }
    },

    activar2FA: async (req, res) => {
        try {
            const usuario = await obtenerUsuarioPorToken(req);
            if (!usuario) {
                return res.status(401).json({ mensaje: 'No autorizado' });
            }
            const { codigo } = req.body;
            const dosFA = await leer2FA(usuario.id);
            let secret = dosFA.twoFactorSecret;
            if (!secret) {
                secret = generarSecret();
                await guardarSecret2FA(usuario.id, secret);
            }
            if (!verificarCodigo(secret, codigo)) {
                return res.status(400).json({ mensaje: 'El código de autenticación es incorrecto' });
            }
            await set2FAHabilitado(usuario.id, true);
            res.json({ success: true, mensaje: 'Doble factor activado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al activar el doble factor' });
        }
    },

    desactivar2FA: async (req, res) => {
        try {
            const usuario = await obtenerUsuarioPorToken(req);
            if (!usuario) {
                return res.status(401).json({ mensaje: 'No autorizado' });
            }
            await set2FAHabilitado(usuario.id, false);
            res.json({ success: true, mensaje: 'Doble factor desactivado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al desactivar el doble factor' });
        }
    }
};

module.exports = AuthController;
