const { PrismaClient } = require('@prisma/client');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const prisma = new PrismaClient();

async function main() {
  // --- Roles (ids fijos: 4 = Invitado usado por obtenerInvitados) ---
  const roles = [
    { id: 1, nombre: 'Admin', descripcion: 'Administrador general del sistema' },
    { id: 2, nombre: 'Cliente', descripcion: 'Cliente registrado' },
    { id: 3, nombre: 'Empleado', descripcion: 'Personal interno' },
    { id: 4, nombre: 'Invitado', descripcion: 'Usuario invitado (modo regalo)' },
  ];
  for (const r of roles) {
    await prisma.rol.upsert({ where: { id: r.id }, create: r, update: r });
  }
  console.log('Roles creados/actualizados.');

  // --- Permisos base ---
  const permisos = [
    { id: 1, nombre: 'admin_total', descripcion: 'Control total del sistema', modulo: 'sistema' },
    { id: 2, nombre: 'gestionar_usuarios', descripcion: 'Gestionar usuarios', modulo: 'usuarios' },
    { id: 3, nombre: 'ver_reportes', descripcion: 'Ver reportes', modulo: 'reportes' },
  ];
  for (const p of permisos) {
    await prisma.permiso.upsert({ where: { id: p.id }, create: p, update: p });
  }
  console.log('Permisos creados/actualizados.');

  // Asignar todos los permisos al rol Admin (id 1)
  for (const p of permisos) {
    const existe = await prisma.detalleRolPermisos.findFirst({
      where: { fkIdR: 1, fkIdP: p.id },
    });
    if (!existe) {
      await prisma.detalleRolPermisos.create({ data: { fkIdR: 1, fkIdP: p.id } });
    }
  }
  console.log('Permisos asignados al rol Admin.');

  // --- Usuario administrador (contraseña en texto plano, igual que AuthController) ---
  const adminCorreo = 'admin@hagamostech.bo';
  await prisma.usuario.upsert({
    where: { correo: adminCorreo },
    create: {
      correo: adminCorreo,
      contrasena: 'Admin123',
      nombre: 'Administrador',
      usuario: 'admin',
      rolId: 1,
      emailVerificado: true,
      activo: true,
    },
    update: { rolId: 1, activo: true },
  });
  console.log('Usuario administrador creado/actualizado:', adminCorreo);

  // --- Cupón de bienvenida de ejemplo para el admin (modo regalo) ---
  const admin = await prisma.usuario.findUnique({ where: { correo: adminCorreo } });
  if (admin) {
    const fechaExp = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await prisma.cuponDescuento.upsert({
      where: { usuarioId: admin.id },
      create: {
        usuarioId: admin.id,
        codigo: 'HT-BIENVENIDA',
        estado: 'pendiente',
        extendido: false,
        fechaExpiracion: fechaExp,
      },
      update: {},
    });
    console.log('Cupón de bienvenida creado/actualizado para el admin.');
  }

  console.log('\n--- Siembra mínima de HagamosTech finalizada ---');
}

main()
  .catch((e) => {
    console.error('\n!!! Error durante la siembra !!!');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
