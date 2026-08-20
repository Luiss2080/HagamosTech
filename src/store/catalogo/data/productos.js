// Catálogo central de productos de Los Castores
// Organizado por categorías y tipos, con detalle para cada producto.

const CATEGORIAS = [
  {
    id: 'saltenas',
    nombre: 'Salteñas',
    icono: 'fa-fire',
    color: 'bg-[#FF4D00]',
    descripcion: 'El corazón de nuestra casa. Dulces, picantes y súper picantes.',
    tipos: ['Dulce', 'Picante', 'Extra Picante', 'Pack x6', 'Combo'],
    productos: [
      { id: 'sal-1', nombre: 'Salteña de Carne Dulce', tipo: 'Dulce', subtitulo: 'La Clásica', precio: 8, precioAntes: 10, imagen: '/img/05_Productos/Salteñas/Salteñas.png', descripcion: 'Jugosa y equilibrada, con el dulzor justo que resalta la carne de primera. La favorita de todos los días desde 1989.', incluye: ['Carne de res', 'Aceituna', 'Huevo', 'Papa'], icono: 'fa-drumstick-bite' },
      { id: 'sal-2', nombre: 'Salteña de Pollo Dulce', tipo: 'Dulce', subtitulo: 'Suave y Cremosa', precio: 8, precioAntes: 10, imagen: '/img/05_Productos/Salteñas/PrecocidasCongeladas.png', descripcion: 'Pollo tierno con un relleno suave y cremoso que se deshace en cada bocado.', incluye: ['Pollo', 'Aceituna', 'Huevo', 'Papa'], icono: 'fa-egg' },
      { id: 'sal-3', nombre: 'Salteña de Carne Picante', tipo: 'Picante', subtitulo: 'Para Valientes', precio: 8, precioAntes: 10, imagen: '/img/05_Productos/Salteñas/PrecocidasCongeladasMax.png', descripcion: 'Ají molido seleccionado que despierta los sentidos en cada mordida.', incluye: ['Carne de res', 'Ají molido', 'Aceituna', 'Huevo'], icono: 'fa-pepper-hot' },
      { id: 'sal-4', nombre: 'Súper Picante de Carne', tipo: 'Extra Picante', subtitulo: 'Edición Extrema', precio: 9, precioAntes: 11, imagen: '/img/05_Productos/Salteñas/CrudasCongeladas.png', descripcion: 'Solo para valientes. Mezcla de ajíes seleccionados que desafían tu paladar.', incluye: ['Carne de res', 'Ajíes mixtos', 'Aceituna', 'Huevo'], icono: 'fa-fire' },
      { id: 'sal-5', nombre: 'Salteñas Precocidas Congeladas', tipo: 'Pack x6', subtitulo: 'Horneá en Casa', precio: 40, precioAntes: 48, imagen: '/img/05_Productos/Salteñas/PrecocidasCongeladas.png', descripcion: 'Llevate el auténtico sabor a tu hogar. Solo 25 minutos de horno y listo.', incluye: ['Pack x6', 'Precocidas', 'Listas para hornear'], icono: 'fa-snowflake' },
      { id: 'sal-6', nombre: 'Salteñas Crudas Congeladas', tipo: 'Pack x6', subtitulo: 'Frescas del Freezer', precio: 35, precioAntes: 42, imagen: '/img/05_Productos/Salteñas/CrudasCongeladas.png', descripcion: 'Crudas y listas para hornear a tu gusto. El mismo sabor de siempre, cuando vos quieras.', incluye: ['Pack x6', 'Crudas', 'Hornear 25 min'], icono: 'fa-box' },
      { id: 'sal-7', nombre: 'Combo Pacata Familiar', tipo: 'Combo', subtitulo: 'Para Compartir', precio: 55, precioAntes: 66, imagen: '/img/05_Productos/Salteñas/ComboPacata.png', descripcion: 'El combo ideal para reuniones. Variedad de salteñas mixtas, refrescos y salsa especial.', incluye: ['6 Salteñas mixtas', '2 Refrescos', 'Salsa especial'], icono: 'fa-gift' },
    ]
  },
  {
    id: 'cafeteria',
    nombre: 'Cafetería',
    icono: 'fa-mug-hot',
    color: 'bg-[#5D3A1F]',
    descripcion: 'Café de especialidad boliviano para acompañar tus mañanas.',
    tipos: ['Caliente'],
    productos: [
      { id: 'caf-1', nombre: 'Café Americano Regular', tipo: 'Caliente', subtitulo: 'El Clásico', precio: 8, precioAntes: 10, imagen: '/img/05_Productos/Cafe/Americano.png', descripcion: 'Intenso y aromático. El compañero perfecto para tus salteñas de la mañana.', incluye: ['Café boliviano', 'Azúcar', 'Crema'], icono: 'fa-mug-hot' },
      { id: 'caf-2', nombre: 'Café Americano Doble', tipo: 'Caliente', subtitulo: 'Carga Extra', precio: 12, precioAntes: 15, imagen: '/img/05_Productos/Cafe/Espresso.png', descripcion: 'Doble shot para los que necesitan ese empujón al empezar el día.', incluye: ['Doble shot', 'Azúcar', 'Crema'], icono: 'fa-mug-hot' },
      { id: 'caf-3', nombre: 'Capuccino Espumoso', tipo: 'Caliente', subtitulo: 'Suave y Cremoso', precio: 12, precioAntes: 15, imagen: '/img/05_Productos/Cafe/Capuccino.png', descripcion: 'Espresso con leche vaporizada y espuma sedosa. Suavidad con carácter.', incluye: ['Espresso', 'Leche vaporizada', 'Espuma'], icono: 'fa-mug-saucer' },
      { id: 'caf-4', nombre: 'Capuccino Doble Shot', tipo: 'Caliente', subtitulo: 'Doble Intensidad', precio: 16, precioAntes: 20, imagen: '/img/05_Productos/Cafe/Mokaccino.png', descripcion: 'Más cremoso, más intenso. El doble de todo lo que te gusta del capuccino.', incluye: ['Doble Espresso', 'Leche vaporizada', 'Espuma'], icono: 'fa-mug-saucer' },
      { id: 'caf-5', nombre: 'Espresso Puro', tipo: 'Caliente', subtitulo: 'Intensidad Pura', precio: 10, precioAntes: 12, imagen: '/img/05_Productos/Cafe/Espresso.png', descripcion: 'Para puristas. La esencia del café concentrada en un sorbo sin distracciones.', incluye: ['Doble shot espresso', 'Crema natural'], icono: 'fa-mug-hot' },
      { id: 'caf-6', nombre: 'Chocolatada Caliente', tipo: 'Caliente', subtitulo: 'Abrigo Dulce', precio: 10, precioAntes: 12, imagen: '/img/05_Productos/Cafe/Chocolatada.png', descripcion: 'Chocolate cremoso bien caliente. El abrazo reconfortante para los días fríos.', incluye: ['Chocolate', 'Leche', 'Crema batida'], icono: 'fa-mug-hot' },
      { id: 'caf-7', nombre: 'Mokaccino Cremoso', tipo: 'Caliente', subtitulo: 'Fusión Perfecta', precio: 14, precioAntes: 17, imagen: '/img/05_Productos/Cafe/Mokaccino.png', descripcion: 'Café y chocolate en armonía. Dulce, cremoso y absolutamente irresistible.', incluye: ['Espresso', 'Chocolate', 'Leche', 'Crema'], icono: 'fa-mug-hot' },
    ]
  },
  {
    id: 'frapuccinos',
    nombre: 'Frapuccinos',
    icono: 'fa-blender',
    color: 'bg-[#8B4513]',
    descripcion: 'Bebidas heladas y cremosas para refrescar tus días.',
    tipos: ['Helado'],
    productos: [
      { id: 'frap-1', nombre: 'Frapuccino de Chocolate', tipo: 'Helado', subtitulo: 'Frescura Helada', precio: 18, precioAntes: 22, imagen: '/img/05_Productos/Frapuccinos/FrapuccinoChocolate.png', descripcion: 'Bebida helada de chocolate con café. Refrescante y deliciosamente cremosa.', incluye: ['Café', 'Chocolate', 'Hielo', 'Crema'], icono: 'fa-blender' },
      { id: 'frap-2', nombre: 'Frapuccino Dulce de Leche', tipo: 'Helado', subtitulo: 'Antojo Irresistible', precio: 18, precioAntes: 22, imagen: '/img/05_Productos/Frapuccinos/FrapuccinoDulceDeLeche.png', descripcion: 'El sabor inconfundible del dulce de leche en un frapuccino para chuparse los dedos.', incluye: ['Café', 'Dulce de leche', 'Hielo', 'Crema'], icono: 'fa-blender' },
      { id: 'frap-3', nombre: 'Frapuccino Clásico', tipo: 'Helado', subtitulo: 'El Original', precio: 16, precioAntes: 20, imagen: '/img/05_Productos/Frapuccinos/FrapuccinoRegular.png', descripcion: 'Suave, refrescante y perfecto para los días de calor en Santa Cruz. Un clásico.', incluye: ['Café', 'Leche', 'Hielo', 'Crema'], icono: 'fa-blender' },
    ]
  },
  {
    id: 'refrescos',
    nombre: 'Refrescos',
    icono: 'fa-leaf',
    color: 'bg-[#CC3D00]',
    descripcion: 'Jugos naturales y refrescos tradicionales.',
    tipos: ['Frutas Frescas', 'Cítrico', 'Casero', 'Sin Gas', 'Gasificada'],
    productos: [
      { id: 'ref-1', nombre: 'Licuado Natural con Agua', tipo: 'Frutas Frescas', subtitulo: 'Refrescante y Ligero', precio: 10, precioAntes: 12, imagen: '/img/05_Productos/Refrescos/LicuadoConAgua.png', descripcion: 'Licuado de frutas naturales con agua. Saludable y revitalizante.', incluye: ['Frutas frescas', 'Agua', 'Azúcar opcional'], icono: 'fa-blender' },
      { id: 'ref-2', nombre: 'Licuado Cremoso con Leche', tipo: 'Frutas Frescas', subtitulo: 'Sustancioso', precio: 12, precioAntes: 15, imagen: '/img/05_Productos/Refrescos/LicuadoConLeche.png', descripcion: 'Licuado cremoso con leche fresca. Ideal como complemento de tus salteñas.', incluye: ['Frutas frescas', 'Leche', 'Azúcar opcional'], icono: 'fa-blender' },
      { id: 'ref-3', nombre: 'Limonada Recién Exprimida', tipo: 'Cítrico', subtitulo: 'Frescura Natural', precio: 8, precioAntes: 10, imagen: '/img/05_Productos/Refrescos/LicuadosConFrutas.png', descripcion: 'Recién exprimida. El clásico refrescante que nunca puede faltar en tu mesa.', incluye: ['Limón fresco', 'Agua', 'Azúcar', 'Hielo'], icono: 'fa-lemon' },
      { id: 'ref-4', nombre: 'Mocochinchi Oriental', tipo: 'Casero', subtitulo: 'Tradición Boliviana', precio: 8, precioAntes: 10, imagen: '/img/05_Productos/Refrescos/Mocochinchi.png', descripcion: 'Durazno deshidratado con canela. Dulce, aromático y bien oriental.', incluye: ['Durazno seco', 'Canela', 'Azúcar', 'Hielo'], icono: 'fa-wine-glass' },
      { id: 'ref-5', nombre: 'Agua Mineral 500ml', tipo: 'Sin Gas', subtitulo: 'Pureza en Botella', precio: 6, precioAntes: 8, imagen: '/img/05_Productos/Refrescos/Agua500ml.png', descripcion: 'Agua mineral bien fría. El acompañante más puro para cualquier salteña.', incluye: ['Agua mineral', '500ml'], icono: 'fa-bottle-water' },
      { id: 'ref-6', nombre: 'Tostada de la Casa', tipo: 'Gasificada', subtitulo: 'Nuestro Refresco', precio: 7, precioAntes: 9, imagen: '/img/05_Productos/Refrescos/Tostada.png', descripcion: 'El refresco oficial de Los Castores. El maridaje perfecto para las picantes.', incluye: ['Refresco Tostada', 'Hielo'], icono: 'fa-beer-mug' },
    ]
  },
  {
    id: 'postres',
    nombre: 'Postres',
    icono: 'fa-ice-cream',
    color: 'bg-[#8B3A13]',
    descripcion: 'Sundaes helados y dulces caseros para cerrar con broche de oro.',
    tipos: ['Postre Helado'],
    productos: [
      { id: 'pos-1', nombre: 'Sundae de Chocolate', tipo: 'Postre Helado', subtitulo: 'Dulce Final', precio: 12, precioAntes: 15, imagen: '/img/05_Productos/Postres/SundaChocolate.png', descripcion: 'Helado cremoso bañado en salsa de chocolate. El broche de oro de tu comida.', incluye: ['Helado de vainilla', 'Chocolate', 'Crema'], icono: 'fa-ice-cream' },
      { id: 'pos-2', nombre: 'Sundae de Vainilla', tipo: 'Postre Helado', subtitulo: 'Simple y Perfecto', precio: 10, precioAntes: 12, imagen: '/img/05_Productos/Postres/SundaeVainilla.png', descripcion: 'El clásico de siempre. Sencillo, delicioso y perfecto para cualquier antojo.', incluye: ['Helado de vainilla', 'Topping', 'Galleta'], icono: 'fa-ice-cream' },
      { id: 'pos-3', nombre: 'Sundae Mixto Especial', tipo: 'Postre Helado', subtitulo: 'Lo Mejor de Dos', precio: 14, precioAntes: 17, imagen: '/img/05_Productos/Postres/SundaMixto.png', descripcion: 'Chocolate y vainilla en un solo sundae. Para los que no saben elegir.', incluye: ['Helado mixto', 'Chocolate', 'Crema', 'Cereza'], icono: 'fa-ice-cream' },
    ]
  }
];

// Helper: busca un producto por su id
export const buscarProducto = (id) => {
  for (const cat of CATEGORIAS) {
    const prod = cat.productos.find(p => p.id === id);
    if (prod) return { ...prod, categoria: cat.nombre, categoriaId: cat.id, categoriaIcono: cat.icono, categoriaColor: cat.color };
  }
  return null;
};

// Helper: todos los productos con su categoría
export const todosLosProductos = () => {
  const todos = [];
  for (const cat of CATEGORIAS) {
    for (const prod of cat.productos) {
      todos.push({ ...prod, categoria: cat.nombre, categoriaId: cat.id, categoriaIcono: cat.icono, categoriaColor: cat.color });
    }
  }
  return todos;
};

export default CATEGORIAS;
