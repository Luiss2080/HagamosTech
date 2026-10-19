-- Agrega el espacio privado de cada usuario sin eliminar tablas heredadas.
CREATE TABLE `proyectos_personales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `titulo` VARCHAR(120) NOT NULL,
    `categoria` VARCHAR(60) NOT NULL DEFAULT 'Personal',
    `descripcion` TEXT NULL,
    `etapa` VARCHAR(30) NOT NULL DEFAULT 'idea',
    `creado_en` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `actualizado_en` DATETIME(0) NOT NULL,
    INDEX `proyectos_personales_usuario_id_actualizado_en_idx`(`usuario_id`, `actualizado_en`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `notas_personales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `proyecto_id` INTEGER NULL,
    `titulo` VARCHAR(120) NOT NULL,
    `contenido` TEXT NOT NULL,
    `creado_en` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `actualizado_en` DATETIME(0) NOT NULL,
    INDEX `notas_personales_usuario_id_actualizado_en_idx`(`usuario_id`, `actualizado_en`),
    INDEX `notas_personales_proyecto_id_idx`(`proyecto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `eventos_personales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `proyecto_id` INTEGER NULL,
    `titulo` VARCHAR(120) NOT NULL,
    `descripcion` VARCHAR(500) NULL,
    `inicio` DATETIME(0) NOT NULL,
    `fin` DATETIME(0) NULL,
    `creado_en` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `actualizado_en` DATETIME(0) NOT NULL,
    INDEX `eventos_personales_usuario_id_inicio_idx`(`usuario_id`, `inicio`),
    INDEX `eventos_personales_proyecto_id_idx`(`proyecto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `proyectos_personales`
    ADD CONSTRAINT `proyectos_personales_usuario_id_fkey`
    FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `notas_personales`
    ADD CONSTRAINT `notas_personales_usuario_id_fkey`
    FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `notas_personales`
    ADD CONSTRAINT `notas_personales_proyecto_id_fkey`
    FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos_personales`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `eventos_personales`
    ADD CONSTRAINT `eventos_personales_usuario_id_fkey`
    FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `eventos_personales`
    ADD CONSTRAINT `eventos_personales_proyecto_id_fkey`
    FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos_personales`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
