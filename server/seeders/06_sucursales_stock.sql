-- =====================================================
-- TABLA: sucursal
-- =====================================================
INSERT INTO sucursal (id, nombre, ciudad, direccion, telefono, activo, fechaCreacion, fechaActualizacion) VALUES
(1, 'Los Castores - Casa Matriz', 'Santa Cruz de la Sierra', 'Av. El Trompillo, entre 2do y 3er anillo', '70000000', 1, NOW(), NOW());

-- =====================================================
-- TABLA: inventario_sucursal (stock por sucursal)
-- =====================================================
INSERT INTO inventario_sucursal (sucursalId, productoId, stock, fechaCreacion, fechaActualizacion) VALUES
(1, 1, 50, NOW(), NOW()),
(1, 2, 50, NOW(), NOW()),
(1, 3, 50, NOW(), NOW()),
(1, 4, 50, NOW(), NOW()),
(1, 5, 50, NOW(), NOW()),
(1, 6, 50, NOW(), NOW());
