async function seed(prisma) {
    console.log('Sembrando flujo de compra Los Castores...');

    const pasos = [
        {
            clave: 'elige',
            icono: 'fa-cart-shopping',
            colorIcono: 'text-[#a41e22]',
            titulo: 'Elige tu salteña',
            descripcion: 'Selecciona entre pollo, carne, picante o vegetariana.',
            chip: 'Menú completo',
            orden: 1,
        },
        {
            clave: 'ordena',
            icono: 'fa-mobile-screen',
            colorIcono: 'text-[#c5a059]',
            titulo: 'Haz tu pedido',
            descripcion: 'Confirma tu pedido y elige la sucursal de retiro.',
            chip: 'Pedido online',
            orden: 2,
        },
        {
            clave: 'recoge',
            icono: 'fa-store',
            colorIcono: 'text-[#2e7d32]',
            titulo: 'Recógela calientita',
            descripcion: 'Retira en tu sucursal más cercana o te la llevamos.',
            chip: 'Delivery',
            orden: 3,
        },
    ];

    for (const paso of pasos) {
        await prisma.pasosCatalogo.upsert({
            where: { clave: paso.clave },
            update: paso,
            create: paso,
        });
    }
}

module.exports = seed;
