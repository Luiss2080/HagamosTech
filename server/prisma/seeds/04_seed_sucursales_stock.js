module.exports = async (prisma) => {
    console.log('Sembrando Sucursales y Stock Los Castores...');

    const sucursal = await prisma.sucursal.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            nombre: 'Los Castores - Casa Matriz',
            ciudad: 'Santa Cruz de la Sierra',
            direccion: 'Av. El Trompillo, entre 2do y 3er anillo',
            telefono: '70000000',
            activo: true
        }
    });

    const productos = await prisma.producto.findMany();

    for (const producto of productos) {
        await prisma.inventarioSucursal.upsert({
            where: {
                sucursalId_productoId: {
                    sucursalId: sucursal.id,
                    productoId: producto.id
                }
            },
            update: {
                stock: 50
            },
            create: {
                sucursalId: sucursal.id,
                productoId: producto.id,
                stock: 50
            }
        });
    }

    console.log(`Stock inicial asignado para ${productos.length} productos en Los Castores Central.`);
};
