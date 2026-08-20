-- =====================================================
-- TABLA: pasos_catalogo
-- =====================================================
INSERT INTO pasos_catalogo (id, clave, icono, colorIcono, titulo, descripcion, chip, orden) VALUES
(1, 'elige',  'fa-cart-shopping', 'text-[#a41e22]', 'Elige tu salteña',            'Selecciona entre pollo, carne, picante o vegetariana.', 'Menú completo', 1),
(2, 'ordena', 'fa-mobile-screen', 'text-[#c5a059]', 'Haz tu pedido',               'Confirma tu pedido y elige la sucursal de retiro.',      'Pedido online', 2),
(3, 'recoge', 'fa-store',         'text-[#2e7d32]', 'Recógela calientita',          'Retira en tu sucursal más cercana o te la llevamos.',     'Delivery',      3);
