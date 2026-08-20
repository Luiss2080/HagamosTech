const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS cupones_descuento (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuarioId INT UNIQUE,
        codigo VARCHAR(50) NULL,
        estado VARCHAR(191) NOT NULL DEFAULT 'pendiente',
        extendido BOOLEAN NOT NULL DEFAULT false,
        fechaExpiracion DATETIME(3) NOT NULL,
        fechaExpiracionExtendida DATETIME(3) NULL,
        creadoEn DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        actualizadoEn DATETIME(3) NOT NULL,
        FOREIGN KEY (usuarioId) REFERENCES usuarios(id) ON DELETE CASCADE
      )
    `);
    console.log("Tabla cupones_descuento creada.");
    
    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE suscripciones
        DROP COLUMN invitado_activado,
        DROP COLUMN invitado_extendido,
        DROP COLUMN invitado_extensiones,
        DROP COLUMN historial_extensiones
      `);
      console.log("Columnas de invitado eliminadas.");
    } catch (e) {
      console.log("Las columnas ya estaban eliminadas o error menor:", e.message);
    }

  } catch (e) {
    console.error("Error global:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
