async function seed(prisma) {
    console.log('Sembrando categorías Los Castores...');
    
    const categorias = [
        {
            enlace: 'saltenas',
            titulo: 'Salteñas',
            acento: 'text-[#a41e22]',
            subtitulo: 'Las clásicas de la casa',
            icono: 'fa-utensils',
            etiqueta: 'Más vendidas',
            contextoResumen: 'Salteñas jugosas preparadas con receta tradicional cruceña.',
            enfoque: 'Receta tradicional',
            audiencia: 'Todos los públicos',
            soporte: 'Pedido online y delivery',
            entrega: 'Entrega inmediata',
        },
        {
            enlace: 'saltenas-vegetarianas',
            titulo: 'Salteñas Vegetarianas',
            acento: 'text-[#2e7d32]',
            subtitulo: 'Opción sin carne',
            icono: 'fa-leaf',
            etiqueta: 'Saludable',
            contextoResumen: 'Salteñas rellenas de verduras frescas y queso.',
            enfoque: 'Opción saludable',
            audiencia: 'Vegetarianos y veganos',
            soporte: 'Pedido online y delivery',
            entrega: 'Entrega inmediata',
        },
        {
            enlace: 'bebidas',
            titulo: 'Bebidas',
            acento: 'text-[#c5a059]',
            subtitulo: 'Acompaña tu salteña',
            icono: 'fa-mug-hot',
            etiqueta: 'Refrescos',
            contextoResumen: 'Jugos naturales, refrescos y café.',
            enfoque: 'Bebidas naturales',
            audiencia: 'Todos los públicos',
            soporte: 'Pedido online',
            entrega: 'Entrega inmediata',
        },
        {
            enlace: 'postres',
            titulo: 'Postres',
            acento: 'text-[#6d4c41]',
            subtitulo: 'El final perfecto',
            icono: 'fa-cake-candles',
            etiqueta: 'Dulces',
            contextoResumen: 'Dulces caseros para después de tu salteña.',
            enfoque: 'Repostería casera',
            audiencia: 'Todos los públicos',
            soporte: 'Pedido online',
            entrega: 'Entrega inmediata',
        }
    ];

    for (const cat of categorias) {
        await prisma.categoria.upsert({
            where: { enlace: cat.enlace },
            update: cat,
            create: cat,
        });
    }
}

module.exports = seed;
