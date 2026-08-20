-- =====================================================================
-- LosCastoresSCZ - Seeds (roles, permisos, matriz, usuarios, catálogo)
-- =====================================================================

USE `LosCastoresSCZ`;

SET FOREIGN_KEY_CHECKS = 0;

-- ROLES ----------------------------------------------------------------
INSERT INTO `roles` (`id`, `nombre`, `descripcion`) VALUES
(1,  'Administrador',         'Acceso total al sistema'),
(2,  'Vendedor',              'Gestión de clientes, ventas y pedidos'),
(3,  'Invitado',              'Rol por defecto al crear una cuenta'),
(4,  'Cocina',                'Personal de producción de salteñas'),
(5,  'Cajero',                'Atención en caja y pedidos'),
(6,  'Personal Los Castores', 'Personal de la salteñería con permisos intermedios');

-- PERMISOS --------------------------------------------------------------
INSERT INTO `permisos` (`id`, `nombre`, `descripcion`, `modulo`) VALUES
(1,  'ACCESO_SISTEMA',       'Acceso al panel de administración', 'Sistema'),
(2,  'ACCESO_CLIENTES',      'Ver módulo de clientes', 'Clientes'),
(3,  'REGISTRO_CLIENTE',     'Registrar nuevos clientes', 'Clientes'),
(4,  'GESTION_CLIENTES',     'Editar y gestionar clientes', 'Clientes'),
(5,  'ACCESO_USUARIOS',      'Ver módulo de usuarios', 'Seguridad'),
(6,  'CREAR_USUARIO',        'Crear usuarios del sistema', 'Seguridad'),
(7,  'EDITAR_USUARIO',       'Editar usuarios del sistema', 'Seguridad'),
(8,  'ACCESO_ROLES',         'Ver módulo de roles', 'Seguridad'),
(9,  'CREAR_ROL',            'Crear roles', 'Seguridad'),
(10, 'EDITAR_ROL',           'Editar roles', 'Seguridad'),
(11, 'ACCESO_PERMISOS',      'Ver módulo de permisos', 'Seguridad'),
(12, 'GESTIONAR_PERMISOS',   'Gestionar permisos', 'Seguridad'),
(13, 'ACCESO_MATRIZ',        'Ver matriz rol-permiso', 'Seguridad'),
(14, 'ACCESO_CATALOGO',      'Ver catálogo de productos', 'Catálogo'),
(15, 'GESTIONAR_PRODUCTOS',  'Crear, editar y eliminar productos', 'Catálogo'),
(16, 'ACCESO_VENTAS',        'Ver módulo de ventas', 'Ventas'),
(17, 'NUEVA_VENTA',          'Registrar nuevas ventas', 'Ventas'),
(18, 'HISTORIAL_VENTAS',     'Ver historial de ventas', 'Ventas'),
(19, 'ACCESO_PEDIDOS',       'Ver pedidos de la tienda', 'Ventas'),
(20, 'ACCESO_CONFIGURACION', 'Ver configuración del sistema', 'Sistema');

-- MATRIZ ROL-PERMISO ----------------------------------------------------
INSERT INTO `detalle_rol_permisos` (`fk_id_r`, `fk_id_p`) VALUES
-- Administrador (todo)
(1, 1),(1, 2),(1, 3),(1, 4),(1, 5),(1, 6),(1, 7),(1, 8),(1, 9),(1, 10),
(1, 11),(1, 12),(1, 13),(1, 14),(1, 15),(1, 16),(1, 17),(1, 18),(1, 19),(1, 20),
-- Vendedor
(2, 2),(2, 3),(2, 4),(2, 14),(2, 16),(2, 17),(2, 18),(2, 19),
-- Invitado (sin permisos de admin)
(3, 14),
-- Cocina
(4, 14),(4, 19),
-- Cajero
(5, 2),(5, 3),(5, 16),(5, 17),(5, 18),(5, 19),
-- Personal Los Castores
(6, 2),(6, 3),(6, 4),(6, 14),(6, 16),(6, 17),(6, 18),(6, 19);

-- USUARIO ADMIN ----------------------------------------------------------
-- Password: Admin123! (texto plano, compatible con AuthController.js de Node)
INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `numci`, `numtel`, `email`, `password`, `rol_id`, `email_verificado`, `activo`, `usuario`, `two_factor_enabled`) VALUES
(1, 'Administrador', 'Los Castores', NULL, '70000000', 'admin@loscatoresscz.com', 'Admin123!', 1, 1, 1, 'admin', 0);

INSERT INTO `suscripciones` (`usuarioId`, `estado`, `fechaFinPrueba`) VALUES
(1, 'suscrito', DATE_ADD(NOW(), INTERVAL 365 DAY));

-- USUARIO STORE PÚBLICO (demo) -------------------------------------------
-- Password: saltena123 (texto plano, compatible con PHP api/auth.php)
INSERT INTO `usuario` (`id`, `correo`, `contrasena`, `nombre`, `email_verificado`, `telefono`) VALUES
(1, 'cliente@loscatoresscz.com', 'saltena123', 'Cliente Demo', 1, '70000001');

-- CATEGORÍAS -------------------------------------------------------------
INSERT INTO `categoria` (`id`, `enlace`, `titulo`, `subtitulo`, `descripcion`, `icono`, `etiqueta`, `acento`, `orden`) VALUES
(1, 'saltenas',        'Salteñas',         'Las clásicas de la casa', 'Salteñas jugosas preparadas con receta tradicional cruceña.', 'fa-solid fa-utensils', 'Más vendidas', '#a41e22', 1),
(2, 'saltenas-vegetarianas', 'Salteñas Vegetarianas', 'Opción sin carne', 'Salteñas rellenas de verduras frescas y queso.', 'fa-solid fa-leaf', 'Saludable', '#2e7d32', 2),
(3, 'bebidas',         'Bebidas',          'Acompaña tu salteña', 'Jugos naturales, refrescos y café.', 'fa-solid fa-mug-hot', NULL, '#c5a059', 3),
(4, 'postres',         'Postres',          'El final perfecto', 'Dulces caseros para después de tu salteña.', 'fa-solid fa-cake-candles', NULL, '#6d4c41', 4);

-- PRODUCTOS ---------------------------------------------------------------
INSERT INTO `producto` (`id`, `enlace`, `nombre`, `precio`, `precioAnterior`, `descuento`, `calificacion`, `imagen`, `insignia`, `descripcion`, `descripcionCorta`, `disponibilidad`, `categoriaId`, `stock`, `activo`) VALUES
(1, 'saltena-de-pollo', 'Salteña de Pollo', 12.00, 15.00, '20% OFF', '4.9', '/img/06_Productos/saltena-pollo.jpg', 'Más vendida', 'Salteña jugosa de pollo con la receta tradicional cruceña: masa dorada, caldo de pollo y picante a elección.', 'La clásica de pollo, jugosa y dorada.', 'En stock', 1, 100, 1),
(2, 'saltena-de-carne', 'Salteña de Carne', 13.00, NULL, NULL, '4.8', '/img/06_Productos/saltena-carne.jpg', NULL, 'Salteña de carne de res desmechada con verduras y el toque secreto de la casa.', 'Carne de res jugosa con el toque de la casa.', 'En stock', 1, 100, 1),
(3, 'saltena-de-pollo-picante', 'Salteña de Pollo Picante', 12.50, NULL, NULL, '4.9', '/img/06_Productos/saltena-pollo-picante.jpg', 'Picante', 'Para los que aman el picante: pollo con ají y especias extra.', 'Pollo con picante intenso.', 'En stock', 1, 80, 1),
(4, 'saltena-vegetariana', 'Salteña Vegetariana', 11.00, NULL, NULL, '4.7', '/img/06_Productos/saltena-vegetariana.jpg', NULL, 'Salteña rellena de verduras frescas, queso y sin carne.', 'Verduras y queso, sin carne.', 'En stock', 2, 60, 1),
(5, 'jugo-de-mango', 'Jugo Natural de Mango', 10.00, NULL, NULL, '4.8', '/img/06_Productos/jugo-mango.jpg', NULL, 'Jugo natural de mango 100% fruta.', 'Refrescante jugo de mango.', 'En stock', 3, 50, 1),
(6, 'cafe-de-la-casa', 'Café de la Casa', 8.00, NULL, NULL, '4.6', '/img/06_Productos/cafe-casa.jpg', NULL, 'Café recién preparado, ideal para acompañar tu salteña.', 'Café fresco para acompañar.', 'En stock', 3, 50, 1);

-- SUCURSALES ---------------------------------------------------------------
INSERT INTO `sucursal` (`id`, `nombre`, `ciudad`, `direccion`, `telefono`) VALUES
(1, 'Casa Matriz', 'Santa Cruz de la Sierra', 'Av. El Trompillo, entre 2do y 3er anillo', '70000000'),
(2, 'Sucursal Centro', 'Santa Cruz de la Sierra', 'Calle Libertad, centro', '70000001');

INSERT INTO `inventario_sucursal` (`sucursalId`, `productoId`, `stock`) VALUES
(1, 1, 60),(1, 2, 60),(1, 3, 40),(1, 4, 30),(1, 5, 30),(1, 6, 30),
(2, 1, 40),(2, 2, 40),(2, 3, 40),(2, 4, 30),(2, 5, 20),(2, 6, 20);

-- CLIENTES (demo) -------------------------------------------------------------
INSERT INTO `clientes` (`codigo_cliente`, `nombre_completo`, `tipo_cliente`, `ci_nit`, `telefono`, `email`, `direccion`, `departamento`, `activo`) VALUES
('CLI-001', 'María Fernanda Rojas', 'PERSONA', '1234567', '70123456', 'maria.rojas@gmail.com', 'Zona Norte', 'Santa Cruz', 1),
('CLI-002', 'Restaurante El Fogón S.R.L.', 'INSTITUCION', '9876543', '71234567', 'pedidos@elfogon.com', 'Av. Banzer km 7', 'Santa Cruz', 1);

-- FLUJO DE CATÁLOGO -------------------------------------------------------------
INSERT INTO `pasos_catalogo` (`clave`, `icono`, `colorIcono`, `titulo`, `descripcion`, `chip`, `orden`) VALUES
('elige',    'fa-solid fa-cart-shopping', '#a41e22', 'Elige tu salteña',   'Selecciona entre pollo, carne, picante o vegetariana.', 'Menú completo', 1),
('ordena',   'fa-solid fa-mobile-screen', '#c5a059', 'Haz tu pedido',      'Confirma tu pedido y elige la sucursal de retiro.', 'Pedido online', 2),
('recoge',   'fa-solid fa-store',         '#2e7d32', 'Recógela calientita','Retira en tu sucursal más cercana o te la llevamos.', 'Delivery', 3);

-- SERVICIOS ---------------------------------------------------------------------
INSERT INTO `servicio` (`clave`, `icono`, `colorIcono`, `titulo`, `descripcion`, `etiqueta`, `orden`) VALUES
('delivery',   'fa-solid fa-truck-fast',  '#a41e22', 'Delivery',   'Llevamos tus salteñas hasta tu casa u oficina.', 'En Santa Cruz', 1),
('pedidos',    'fa-solid fa-box',         '#c5a059', 'Pedidos al por mayor', 'Pedidos grandes para eventos y empresas.', 'Cotiza gratis', 2),
('catering',   'fa-solid fa-users',       '#2e7d32', 'Catering',   'Llevamos las salteñas a tu evento.', 'Reserva', 3);

-- MENSAJE (demo) -----------------------------------------------------------------
INSERT INTO `mensaje` (`nombre`, `correo`, `telefono`, `asunto`, `mensaje`, `tipo`, `estado`) VALUES
('Cliente Demo', 'cliente@loscatoresscz.com', '70000001', 'Consulta de pedido', '¿Cuánto cuesta el delivery al centro?', 'pedido', 'nuevo');

SET FOREIGN_KEY_CHECKS = 1;
