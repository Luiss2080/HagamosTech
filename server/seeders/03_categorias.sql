-- =====================================================
-- TABLA: categoria
-- =====================================================
INSERT INTO categoria (id, enlace, titulo, subtitulo, descripcion, icono, etiqueta, acento, orden, activo, fechaCreacion, fechaActualizacion) VALUES
(1, 'saltenas',             'Salteñas',              'Las clásicas de la casa',   'Salteñas jugosas preparadas con receta tradicional cruceña.',          'fa-utensils',     'Más vendidas', 'text-[#a41e22]', 1, 1, NOW(), NOW()),
(2, 'saltenas-vegetarianas','Salteñas Vegetarianas', 'Opción sin carne',          'Salteñas rellenas de verduras frescas y queso.',                       'fa-leaf',         'Saludable',    'text-[#2e7d32]', 2, 1, NOW(), NOW()),
(3, 'bebidas',              'Bebidas',               'Acompaña tu salteña',       'Jugos naturales, refrescos y café.',                                    'fa-mug-hot',      'Refrescos',    'text-[#c5a059]', 3, 1, NOW(), NOW()),
(4, 'postres',              'Postres',               'El final perfecto',         'Dulces caseros para después de tu salteña.',                            'fa-cake-candles', 'Dulces',       'text-[#6d4c41]', 4, 1, NOW(), NOW());
