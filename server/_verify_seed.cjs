const { PrismaClient } = require('@prisma/client');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const p = new PrismaClient();
(async () => {
  const roles = await p.rol.count();
  const usuarios = await p.usuario.count();
  const invitado = await p.usuario.findFirst({ where: { rolId: 4 } });
  const cupones = await p.cuponDescuento.count();
  const admin = await p.usuario.findUnique({ where: { correo: 'admin@hagamostech.bo' } });
  console.log(JSON.stringify({ roles, usuarios, cupones, adminRol: admin && admin.rolId, invitadoExiste: !!invitado }, null, 2));
  await p.$disconnect();
})().catch(e => { console.error(e.message); process.exit(1); });
