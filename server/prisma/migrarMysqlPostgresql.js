/*
 * Migra los datos activos de HagamosTech desde MySQL a PostgreSQL.
 * No elimina ni actualiza datos de origen. Requiere MYSQL_SOURCE_URL solo durante la ejecución.
 */
require('dotenv').config();
const mysql = require('mysql2/promise');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const isoDate = (value) => {
    if (!value) return null;
    if (value instanceof Date) return value;
    const raw = String(value);
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return new Date(`${raw}T00:00:00.000Z`);
    const timestamp = raw.replace(' ', 'T');
    return new Date(/[zZ]|[+-]\d{2}:?\d{2}$/.test(timestamp) ? timestamp : `${timestamp}Z`);
};

const mapRow = {
    roles: (r) => ({ id: r.id, nombre: r.nombre, descripcion: r.descripcion }),
    permisos: (r) => ({ id: r.id, nombre: r.nombre, descripcion: r.descripcion, modulo: r.modulo }),
    detalle_rol_permisos: (r) => ({ id: r.id, fkIdR: r.fk_id_r, fkIdP: r.fk_id_p }),
    usuarios: (r) => ({
        id: r.id, usuario: r.usuario, twoFactorSecret: r.two_factor_secret,
        twoFactorEnabled: Boolean(r.two_factor_enabled), nombre: r.nombre, apellido: r.apellido,
        numci: r.numci, fenac: isoDate(r.fenac), numtel: r.numtel, nomcol: r.nomcol,
        correo: r.email, contrasena: r.password, fotoPerfil: r.foto_perfil, rolId: r.rol_id,
        emailVerificado: Boolean(r.email_verificado), activo: Boolean(r.activo),
        intentosFallidos: r.intentos_fallidos, bloqueadoHasta: isoDate(r.bloqueado_hasta),
        ultimoAcceso: isoDate(r.ultimo_acceso), fechaCreacion: isoDate(r.creado_en),
        fechaActualizacion: isoDate(r.actualizado_en),
    }),
    suscripciones: (r) => ({
        id: r.id, usuarioId: r.usuarioId, estado: r.estado,
        fechaFinPrueba: isoDate(r.fecha_fin_prueba), invitadoActivado: Boolean(r.invitado_activado),
        invitadoExtendido: Boolean(r.invitado_extendido), creadoEn: isoDate(r.creado_en),
        actualizadoEn: isoDate(r.actualizado_en),
    }),
    verificacion_correos: (r) => ({
        id: r.id, usuarioId: r.usuario_id, token: r.token, codigo: r.codigo,
        creadoEn: isoDate(r.creado_en), expiraEn: isoDate(r.expira_en), usado: Boolean(r.usado), usadoEn: isoDate(r.usado_en),
    }),
    recuperacion_password: (r) => ({
        id: r.id, usuarioId: r.usuario_id, token: r.token, creadoEn: isoDate(r.creado_en),
        expiraEn: isoDate(r.expira_en), usado: Boolean(r.usado), usadoEn: isoDate(r.usado_en), ipSolicitud: r.ip_solicitud,
    }),
    registros_pendientes: (r) => ({
        id: r.id, nombre: r.nombre, correo: r.correo, contrasena: r.contrasena,
        codigo: r.codigo, token: r.token, creadoEn: isoDate(r.creado_en),
        expiraEn: isoDate(r.expira_en), usado: Boolean(r.usado),
    }),
    mensaje: (r) => ({
        id: r.id, nombre: r.nombre, correo: r.correo, telefono: r.telefono, asunto: r.asunto,
        mensaje: r.mensaje, tipo: r.tipo, estado: r.estado, fechaCreacion: isoDate(r.fechaCreacion),
    }),
    proyectos_personales: (r) => ({
        id: r.id, usuarioId: r.usuario_id, titulo: r.titulo, categoria: r.categoria,
        descripcion: r.descripcion, etapa: r.etapa, creadoEn: isoDate(r.creado_en), actualizadoEn: isoDate(r.actualizado_en),
    }),
    notas_personales: (r) => ({
        id: r.id, usuarioId: r.usuario_id, proyectoId: r.proyecto_id, titulo: r.titulo,
        contenido: r.contenido, creadoEn: isoDate(r.creado_en), actualizadoEn: isoDate(r.actualizado_en),
    }),
    eventos_personales: (r) => ({
        id: r.id, usuarioId: r.usuario_id, proyectoId: r.proyecto_id, titulo: r.titulo,
        descripcion: r.descripcion, inicio: isoDate(r.inicio), fin: isoDate(r.fin),
        creadoEn: isoDate(r.creado_en), actualizadoEn: isoDate(r.actualizado_en),
    }),
};

const modelForTable = {
    roles: 'rol', permisos: 'permiso', detalle_rol_permisos: 'detalleRolPermisos',
    usuarios: 'usuario', suscripciones: 'suscripcion', verificacion_correos: 'verificacionCorreo',
    recuperacion_password: 'recuperacionPassword', registros_pendientes: 'registroPendiente',
    mensaje: 'mensaje', proyectos_personales: 'proyectoPersonal', notas_personales: 'notaPersonal',
    eventos_personales: 'eventoPersonal',
};
const tableOrder = Object.keys(modelForTable);
const sequenceTables = [
    'roles', 'permisos', 'detalle_rol_permisos', 'usuarios', 'suscripciones',
    'verificacion_correos', 'recuperacion_password', 'registros_pendientes', 'mensaje',
    'proyectos_personales', 'notas_personales', 'eventos_personales',
];

async function main() {
    if (!process.env.MYSQL_SOURCE_URL) throw new Error('Define MYSQL_SOURCE_URL solo para ejecutar la migración de datos.');
    const sourceUrl = new URL(process.env.MYSQL_SOURCE_URL);
    if (sourceUrl.protocol !== 'mysql:') throw new Error('MYSQL_SOURCE_URL debe apuntar a la base MySQL de origen.');
    const source = await mysql.createConnection({
        host: sourceUrl.hostname,
        port: Number(sourceUrl.port || 3306),
        user: decodeURIComponent(sourceUrl.username || 'root'),
        password: decodeURIComponent(sourceUrl.password || ''),
        database: decodeURIComponent(sourceUrl.pathname.slice(1)),
        dateStrings: true,
    });

    try {
        const existente = await prisma.usuario.count();
        const proyectosExistentes = await prisma.proyectoPersonal.count();
        if (existente || proyectosExistentes) throw new Error('PostgreSQL ya tiene cuentas o proyectos; se cancela para no sobrescribir datos.');

        const datos = {};
        for (const table of tableOrder) {
            // Solo se interpolan nombres constantes del mapa incluido en este archivo.
            const [rows] = await source.query(`SELECT * FROM \`${table}\``);
            datos[table] = rows.map(mapRow[table]);
        }

        const importados = await prisma.$transaction(async (tx) => {
            const counts = {};
            for (const table of tableOrder) {
                const rows = datos[table];
                if (rows.length) {
                    const result = await tx[modelForTable[table]].createMany({ data: rows });
                    counts[table] = result.count;
                } else counts[table] = 0;
            }
            for (const table of sequenceTables) {
                const result = await tx.$queryRawUnsafe(`SELECT setval(pg_get_serial_sequence('${table}', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM \"${table}\"`);
                void result;
            }
            return counts;
        });
        console.log(`Migración PostgreSQL completada: ${Object.entries(importados).map(([table, count]) => `${table}=${count}`).join(', ')}`);
    } finally {
        await source.end();
    }
}

main().catch((error) => {
    console.error(`Migración cancelada: ${error.message}`);
    process.exitCode = 1;
}).finally(async () => prisma.$disconnect());
