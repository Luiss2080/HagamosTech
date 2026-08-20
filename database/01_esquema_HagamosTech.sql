-- =====================================================================
-- Loshagamostech - Esquema completo (Salteñería HagamosTech)
-- Autenticación + Catálogo (store) + Clientes
-- Mejorado respecto al esquema original: FKs reales, utf8mb4, seguridad
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `Loshagamostech`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `Loshagamostech`;

SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================================
-- SEGURIDAD / AUTENTICACIÓN
-- =====================================================================

-- 1. ROLES -------------------------------------------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id`          INT NOT NULL AUTO_INCREMENT,
  `nombre`      VARCHAR(50) NOT NULL,
  `descripcion` VARCHAR(200) DEFAULT NULL,
  `creado_en`   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_roles_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. PERMISOS ----------------------------------------------------------
DROP TABLE IF EXISTS `permisos`;
CREATE TABLE `permisos` (
  `id`          INT NOT NULL AUTO_INCREMENT,
  `nombre`      VARCHAR(50) NOT NULL,
  `descripcion` VARCHAR(200) DEFAULT NULL,
  `modulo`      VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_permisos_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. DETALLE ROL-PERMISO (matriz) --------------------------------------
DROP TABLE IF EXISTS `detalle_rol_permisos`;
CREATE TABLE `detalle_rol_permisos` (
  `id`      INT NOT NULL AUTO_INCREMENT,
  `fk_id_r` INT NOT NULL,
  `fk_id_p` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_rol_permiso` (`fk_id_r`, `fk_id_p`),
  KEY `fk_detalle_permiso` (`fk_id_p`),
  CONSTRAINT `fk_detalle_rol`     FOREIGN KEY (`fk_id_r`) REFERENCES `roles` (`id`)    ON DELETE CASCADE,
  CONSTRAINT `fk_detalle_permiso` FOREIGN KEY (`fk_id_p`) REFERENCES `permisos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. USUARIOS (sistema admin) ------------------------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id`                 INT NOT NULL AUTO_INCREMENT,
  `nombre`             VARCHAR(100) NOT NULL,
  `apellido`           VARCHAR(100) DEFAULT NULL,
  `numci`              VARCHAR(50)  DEFAULT NULL,
  `fenac`              DATE DEFAULT NULL,
  `numtel`             VARCHAR(20)  DEFAULT NULL,
  `nomcol`             VARCHAR(200) DEFAULT NULL,
  `foto_perfil`        LONGTEXT DEFAULT NULL,
  `email`              VARCHAR(150) NOT NULL,
  `password`           VARCHAR(255) NOT NULL,
  `rol_id`             INT NOT NULL,
  `email_verificado`   TINYINT(1) NOT NULL DEFAULT 0,
  `activo`             TINYINT(1) NOT NULL DEFAULT 1,
  `usuario`            VARCHAR(50) DEFAULT NULL,
  `two_factor_secret`  VARCHAR(255) DEFAULT NULL,
  `two_factor_enabled` TINYINT(1) NOT NULL DEFAULT 0,
  `intentos_fallidos`  INT NOT NULL DEFAULT 0,
  `bloqueado_hasta`    DATETIME DEFAULT NULL,
  `ultimo_acceso`      DATETIME DEFAULT NULL,
  `creado_en`          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_usuarios_email` (`email`),
  KEY `fk_usuarios_rol` (`rol_id`),
  CONSTRAINT `fk_usuarios_rol` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. SUSCRIPCIONES (invitado / plan por usuario) -----------------------
DROP TABLE IF EXISTS `suscripciones`;
CREATE TABLE `suscripciones` (
  `id`                    INT NOT NULL AUTO_INCREMENT,
  `usuarioId`             INT NOT NULL,
  `estado`                VARCHAR(50) NOT NULL DEFAULT 'invitado',
  `invitado_activado`     TINYINT(1) NOT NULL DEFAULT 0,
  `invitado_extendido`    TINYINT(1) NOT NULL DEFAULT 0,
  `invitado_extensiones`  INT NOT NULL DEFAULT 0,
  `historial_extensiones` JSON DEFAULT NULL,
  `fechaInicio`           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaFinPrueba`        DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `suscripciones_usuarioId_key` (`usuarioId`),
  CONSTRAINT `suscripciones_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. USUARIOS_CLIENTES (store público - registro/login PHP) ----------------------
DROP TABLE IF EXISTS `usuarios_clientes`;
CREATE TABLE `usuarios_clientes` (
  `id`                 INT NOT NULL AUTO_INCREMENT,
  `correo`             VARCHAR(191) NOT NULL,
  `contrasena`         VARCHAR(255) NOT NULL,
  `nombre`             VARCHAR(191) DEFAULT NULL,
  `foto_perfil`        VARCHAR(191) DEFAULT NULL,
  `email_verificado`   TINYINT(1) NOT NULL DEFAULT 0,
  `telefono`           VARCHAR(20) DEFAULT NULL,
  `fechaCreacion`      DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `fechaActualizacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Usuario_correo_key` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. VERIFICACIÓN DE CORREO (registro) ---------------------------------
DROP TABLE IF EXISTS `verificacion_correos`;
CREATE TABLE `verificacion_correos` (
  `id`         INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `token`      VARCHAR(255) NOT NULL,
  `codigo`     VARCHAR(10) DEFAULT NULL,
  `creado_en`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expira_en`  DATETIME NOT NULL,
  `usado`      TINYINT(1) NOT NULL DEFAULT 0,
  `usado_en`   DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_verif_usuario` (`usuario_id`),
  CONSTRAINT `fk_verif_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. RECUPERACIÓN DE CONTRASEÑA ----------------------------------------
DROP TABLE IF EXISTS `recuperacion_password`;
CREATE TABLE `recuperacion_password` (
  `id`            INT NOT NULL AUTO_INCREMENT,
  `usuario_id`    INT NOT NULL,
  `token`         VARCHAR(255) NOT NULL,
  `creado_en`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expira_en`     DATETIME NOT NULL,
  `usado`         TINYINT(1) NOT NULL DEFAULT 0,
  `usado_en`      DATETIME DEFAULT NULL,
  `ip_solicitud`  VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_recup_usuario` (`usuario_id`),
  CONSTRAINT `fk_recup_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. LOG DE ACTIVIDADES -------------------------------------------------
DROP TABLE IF EXISTS `log_actividades`;
CREATE TABLE `log_actividades` (
  `id`          INT NOT NULL AUTO_INCREMENT,
  `usuario_id`  INT DEFAULT NULL,
  `accion`      VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  `ip_address`  VARCHAR(45) DEFAULT NULL,
  `user_agent`  VARCHAR(255) DEFAULT NULL,
  `creado_en`   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_log_usuario` (`usuario_id`),
  CONSTRAINT `fk_log_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- CLIENTES (módulo system)
-- =====================================================================
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `id`              INT NOT NULL AUTO_INCREMENT,
  `codigo_cliente`  VARCHAR(20) NOT NULL,
  `nombre_completo` VARCHAR(200) NOT NULL,
  `tipo_cliente`    ENUM('PERSONA','INSTITUCION') NOT NULL DEFAULT 'PERSONA',
  `ci_nit`          VARCHAR(50) DEFAULT NULL,
  `telefono`        VARCHAR(20) NOT NULL,
  `email`           VARCHAR(150) DEFAULT NULL,
  `direccion`       TEXT,
  `nacionalidad`    VARCHAR(100) NOT NULL DEFAULT 'Bolivia',
  `departamento`    VARCHAR(100) NOT NULL DEFAULT 'Santa Cruz',
  `observaciones`   TEXT,
  `activo`          TINYINT(1) NOT NULL DEFAULT 1,
  `fecha_registro`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_codigo_cliente` (`codigo_cliente`),
  KEY `idx_clientes_departamento` (`departamento`),
  KEY `idx_clientes_tipo` (`tipo_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- CATÁLOGO / STORE
-- =====================================================================

-- 10. CATEGORÍAS ---------------------------------------------------------
DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria` (
  `id`                 INT NOT NULL AUTO_INCREMENT,
  `enlace`             VARCHAR(191) NOT NULL,
  `titulo`             VARCHAR(191) NOT NULL,
  `subtitulo`          VARCHAR(191) DEFAULT NULL,
  `descripcion`        TEXT,
  `icono`              VARCHAR(50) DEFAULT NULL,
  `etiqueta`           VARCHAR(50) DEFAULT NULL,
  `acento`             VARCHAR(20) DEFAULT NULL,
  `orden`              INT NOT NULL DEFAULT 0,
  `activo`             TINYINT(1) NOT NULL DEFAULT 1,
  `fechaCreacion`      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_categoria_enlace` (`enlace`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. PRODUCTOS -----------------------------------------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
  `id`                 INT NOT NULL AUTO_INCREMENT,
  `enlace`             VARCHAR(191) NOT NULL,
  `nombre`             VARCHAR(191) NOT NULL,
  `precio`             DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `precioAnterior`     DECIMAL(10,2) DEFAULT NULL,
  `descuento`          VARCHAR(20) DEFAULT NULL,
  `calificacion`       VARCHAR(10) DEFAULT NULL,
  `imagen`             VARCHAR(500) DEFAULT NULL,
  `insignia`           VARCHAR(50) DEFAULT NULL,
  `descripcion`        TEXT,
  `descripcionCorta`   TEXT,
  `disponibilidad`     VARCHAR(50) DEFAULT NULL,
  `categoriaId`        INT NOT NULL,
  `stock`              INT NOT NULL DEFAULT 0,
  `activo`             TINYINT(1) NOT NULL DEFAULT 1,
  `fechaCreacion`      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_producto_enlace` (`enlace`),
  KEY `fk_producto_categoria` (`categoriaId`),
  CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. SUCURSALES -----------------------------------------------------------
DROP TABLE IF EXISTS `sucursal`;
CREATE TABLE `sucursal` (
  `id`                 INT NOT NULL AUTO_INCREMENT,
  `nombre`             VARCHAR(191) NOT NULL,
  `ciudad`             VARCHAR(100) NOT NULL DEFAULT 'Santa Cruz de la Sierra',
  `direccion`          VARCHAR(191) DEFAULT NULL,
  `telefono`           VARCHAR(20) DEFAULT NULL,
  `activo`             TINYINT(1) NOT NULL DEFAULT 1,
  `fechaCreacion`      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. STOCK POR SUCURSAL -----------------------------------------------------
DROP TABLE IF EXISTS `inventario_sucursal`;
CREATE TABLE `inventario_sucursal` (
  `id`                 INT NOT NULL AUTO_INCREMENT,
  `sucursalId`         INT NOT NULL,
  `productoId`         INT NOT NULL,
  `stock`              INT NOT NULL DEFAULT 0,
  `fechaCreacion`      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_sucursal_producto` (`sucursalId`, `productoId`),
  KEY `fk_dsp_producto` (`productoId`),
  CONSTRAINT `fk_dsp_sucursal` FOREIGN KEY (`sucursalId`) REFERENCES `sucursal` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_dsp_producto` FOREIGN KEY (`productoId`) REFERENCES `producto` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. CARRITO --------------------------------------------------------------
DROP TABLE IF EXISTS `carrito_item`;
CREATE TABLE `carrito_item` (
  `id`            INT NOT NULL AUTO_INCREMENT,
  `usuarioId`     INT NOT NULL,
  `productoId`    INT NOT NULL,
  `cantidad`      INT NOT NULL DEFAULT 1,
  `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_carrito_usuario_producto` (`usuarioId`, `productoId`),
  KEY `fk_carrito_producto` (`productoId`),
  CONSTRAINT `fk_carrito_usuario`  FOREIGN KEY (`usuarioId`)  REFERENCES `usuarios_clientes` (`id`)  ON DELETE CASCADE,
  CONSTRAINT `fk_carrito_producto` FOREIGN KEY (`productoId`) REFERENCES `producto` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. COMPRA (pedido) -------------------------------------------------------
DROP TABLE IF EXISTS `compra`;
CREATE TABLE `compra` (
  `id`                 INT NOT NULL AUTO_INCREMENT,
  `codigo`             VARCHAR(50) NOT NULL,
  `usuarioId`          INT NOT NULL,
  `sucursalId`         INT NOT NULL,
  `metodoPago`         ENUM('qr','tarjeta','transferencia','efectivo') NOT NULL DEFAULT 'qr',
  `estado`             ENUM('pendiente_pago','pagado','cancelado') NOT NULL DEFAULT 'pendiente_pago',
  `totalBs`            DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `nombreCompleto`     VARCHAR(191) DEFAULT NULL,
  `telefono`           VARCHAR(20) DEFAULT NULL,
  `ciudad`             VARCHAR(100) DEFAULT NULL,
  `direccion`          VARCHAR(191) DEFAULT NULL,
  `notas`              TEXT,
  `fechaCreacion`      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_compra_codigo` (`codigo`),
  KEY `fk_compra_usuario` (`usuarioId`),
  KEY `fk_compra_sucursal` (`sucursalId`),
  CONSTRAINT `fk_compra_usuario`  FOREIGN KEY (`usuarioId`)  REFERENCES `usuarios_clientes` (`id`)  ON DELETE RESTRICT,
  CONSTRAINT `fk_compra_sucursal` FOREIGN KEY (`sucursalId`) REFERENCES `sucursal` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. COMPRA ITEM ------------------------------------------------------------
DROP TABLE IF EXISTS `compra_item`;
CREATE TABLE `compra_item` (
  `id`             INT NOT NULL AUTO_INCREMENT,
  `compraId`       INT NOT NULL,
  `productoId`     INT NOT NULL,
  `cantidad`       INT NOT NULL,
  `precioUnitario` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `subtotal`       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`),
  KEY `fk_ci_compra` (`compraId`),
  KEY `fk_ci_producto` (`productoId`),
  CONSTRAINT `fk_ci_compra`   FOREIGN KEY (`compraId`)   REFERENCES `compra` (`id`)   ON DELETE CASCADE,
  CONSTRAINT `fk_ci_producto` FOREIGN KEY (`productoId`) REFERENCES `producto` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. PAGOS --------------------------------------------------------------------
DROP TABLE IF EXISTS `pago`;
CREATE TABLE `pago` (
  `id`            INT NOT NULL AUTO_INCREMENT,
  `compraId`      INT NOT NULL,
  `metodoPago`    ENUM('qr','tarjeta','transferencia','efectivo') NOT NULL DEFAULT 'qr',
  `estado`        ENUM('pendiente','pagado','fallido','en_verificacion') NOT NULL DEFAULT 'pendiente',
  `monto`         DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `referencia`    VARCHAR(191) DEFAULT NULL,
  `fechaPago`     DATETIME DEFAULT NULL,
  `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_pago_compra` (`compraId`),
  CONSTRAINT `fk_pago_compra` FOREIGN KEY (`compraId`) REFERENCES `compra` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 18. MENSAJES DE CONTACTO ------------------------------------------------------
DROP TABLE IF EXISTS `mensaje`;
CREATE TABLE `mensaje` (
  `id`            INT NOT NULL AUTO_INCREMENT,
  `nombre`        VARCHAR(191) NOT NULL,
  `correo`        VARCHAR(191) NOT NULL,
  `telefono`      VARCHAR(20) DEFAULT NULL,
  `asunto`        VARCHAR(191) DEFAULT NULL,
  `mensaje`       TEXT NOT NULL,
  `tipo`          ENUM('contacto','pedido','sugerencia','soporte') NOT NULL DEFAULT 'contacto',
  `estado`        ENUM('nuevo','leido','respondido','archivado') NOT NULL DEFAULT 'nuevo',
  `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 19. FLUJO DE CATÁLOGO -----------------------------------------------------------
DROP TABLE IF EXISTS `pasos_catalogo`;
CREATE TABLE `pasos_catalogo` (
  `id`          INT NOT NULL AUTO_INCREMENT,
  `clave`       VARCHAR(191) NOT NULL,
  `icono`       VARCHAR(50) NOT NULL,
  `colorIcono`  VARCHAR(50) DEFAULT NULL,
  `titulo`      VARCHAR(191) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `chip`        VARCHAR(100) DEFAULT NULL,
  `orden`       INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_flujo_clave` (`clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 20. SERVICIOS ------------------------------------------------------------------
DROP TABLE IF EXISTS `servicio`;
CREATE TABLE `servicio` (
  `id`          INT NOT NULL AUTO_INCREMENT,
  `clave`       VARCHAR(191) NOT NULL,
  `icono`       VARCHAR(50) NOT NULL,
  `colorIcono`  VARCHAR(50) DEFAULT NULL,
  `titulo`      VARCHAR(191) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `etiqueta`    VARCHAR(100) DEFAULT NULL,
  `orden`       INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_servicio_clave` (`clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
