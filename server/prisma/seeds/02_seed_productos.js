async function seed(prisma) {
    console.log('Sembrando productos HagamosTech...');
    
    const categorias = await prisma.categoria.findMany();
    const catMap = {};
    categorias.forEach(c => catMap[c.enlace] = c.id);

    const productos = [
        {
            enlace: 'saltena-de-pollo',
            nombre: 'Salteña de Pollo',
            categoriaEnlace: 'saltenas',
            precio: 12.00,
            precioAnterior: 15.00,
            descuento: '20% OFF',
            calificacion: '4.9',
            imagen: '/img/06_Productos/saltena-pollo.jpg',
            insignia: 'Más vendida',
            descripcion: 'Salteña jugosa de pollo con la receta tradicional cruceña: masa dorada, caldo de pollo y picante a elección.',
            descripcionCorta: 'La clásica de pollo, jugosa y dorada.',
            disponibilidad: 'En stock'
        },
        {
            enlace: 'saltena-de-carne',
            nombre: 'Salteña de Carne',
            categoriaEnlace: 'saltenas',
            precio: 13.00,
            precioAnterior: null,
            descuento: null,
            calificacion: '4.8',
            imagen: '/img/06_Productos/saltena-carne.jpg',
            insignia: null,
            descripcion: 'Salteña de carne de res desmechada con verduras y el toque secreto de la casa.',
            descripcionCorta: 'Carne de res jugosa con el toque de la casa.',
            disponibilidad: 'En stock'
        },
        {
            enlace: 'saltena-de-pollo-picante',
            nombre: 'Salteña de Pollo Picante',
            categoriaEnlace: 'saltenas',
            precio: 12.50,
            precioAnterior: null,
            descuento: null,
            calificacion: '4.9',
            imagen: '/img/06_Productos/saltena-pollo-picante.jpg',
            insignia: 'Picante',
            descripcion: 'Para los que aman el picante: pollo con ají y especias extra.',
            descripcionCorta: 'Pollo con picante intenso.',
            disponibilidad: 'En stock'
        },
        {
            enlace: 'saltena-vegetariana',
            nombre: 'Salteña Vegetariana',
            categoriaEnlace: 'saltenas-vegetarianas',
            precio: 11.00,
            precioAnterior: null,
            descuento: null,
            calificacion: '4.7',
            imagen: '/img/06_Productos/saltena-vegetariana.jpg',
            insignia: null,
            descripcion: 'Salteña rellena de verduras frescas, queso y sin carne.',
            descripcionCorta: 'Verduras y queso, sin carne.',
            disponibilidad: 'En stock'
        },
        {
            enlace: 'jugo-de-mango',
            nombre: 'Jugo Natural de Mango',
            categoriaEnlace: 'bebidas',
            precio: 10.00,
            precioAnterior: null,
            descuento: null,
            calificacion: '4.8',
            imagen: '/img/06_Productos/jugo-mango.jpg',
            insignia: null,
            descripcion: 'Jugo natural de mango 100% fruta.',
            descripcionCorta: 'Refrescante jugo de mango.',
            disponibilidad: 'En stock'
        },
        {
            enlace: 'cafe-de-la-casa',
            nombre: 'Café de la Casa',
            categoriaEnlace: 'bebidas',
            precio: 8.00,
            precioAnterior: null,
            descuento: null,
            calificacion: '4.6',
            imagen: '/img/06_Productos/cafe-casa.jpg',
            insignia: null,
            descripcion: 'Café recién preparado, ideal para acompañar tu salteña.',
            descripcionCorta: 'Café fresco para acompañar.',
            disponibilidad: 'En stock'
        }
    ];

    for (const p of productos) {
        const catId = catMap[p.categoriaEnlace];
        if (!catId) {
            console.log(`Advertencia: Categoría no encontrada: ${p.categoriaEnlace}`);
            continue;
        }

        const { categoriaEnlace, ...pData } = p;
        await prisma.producto.upsert({
            where: { enlace: p.enlace },
            update: { ...pData, categoriaId: catId },
            create: { ...pData, categoriaId: catId },
        });
    }
}

module.exports = seed;
