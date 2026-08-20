const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
    const seedsDir = path.join(__dirname, 'seeds');
    const seedFiles = fs.readdirSync(seedsDir)
        .filter(file => file.endsWith('.js'))
        .sort(); // Orden progresivo por timestamp

    console.log(`Iniciando secuencia de siembra (${seedFiles.length} archivos detectados)...`);

    for (const file of seedFiles) {
        const seedPath = path.join(seedsDir, file);
        const seedFunction = require(seedPath);
        
        console.log(`\n--- Ejecutando: ${file} ---`);
        await seedFunction(prisma);
    }

    console.log('\n--- Secuencia de siembra finalizada con éxito ---');
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
