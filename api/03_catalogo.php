<?php
// Los Castores API - Catalog Endpoints
require_once __DIR__ . '/01_config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET' && $action === 'categorias') {
    $stmt = $pdo->query("SELECT * FROM categoria ORDER BY id ASC");
    respond(['categorias' => $stmt->fetchAll()]);
}

if ($method === 'GET' && $action === 'productos') {
    $categoriaId = $_GET['categoria'] ?? null;
    
    if ($categoriaId) {
        $stmt = $pdo->prepare("SELECT * FROM producto WHERE categoriaId = ? ORDER BY id ASC");
        $stmt->execute([$categoriaId]);
    } else {
        $stmt = $pdo->query("SELECT * FROM producto ORDER BY id ASC");
    }
    
    $productos = $stmt->fetchAll();
    
    // Parse JSON fields
    foreach ($productos as &$p) {
        if ($p['caracteristicas']) $p['caracteristicas'] = json_decode($p['caracteristicas'], true);
        if ($p['especificaciones']) $p['especificaciones'] = json_decode($p['especificaciones'], true);
        if ($p['zonas']) $p['zonas'] = json_decode($p['zonas'], true);
        if ($p['miniaturas']) $p['miniaturas'] = json_decode($p['miniaturas'], true);
        if ($p['tags']) $p['tags'] = json_decode($p['tags'], true);
    }
    
    respond(['productos' => $productos]);
}

if ($method === 'GET' && $action === 'servicios') {
    $stmt = $pdo->query("SELECT * FROM servicio ORDER BY orden ASC");
    respond(['servicios' => $stmt->fetchAll()]);
}

if ($method === 'GET' && $action === 'flujo') {
    $stmt = $pdo->query("SELECT * FROM catalogo_flujo_paso ORDER BY orden ASC");
    respond(['pasos' => $stmt->fetchAll()]);
}

if ($method === 'GET' && $action === 'producto') {
    $enlace = $id ?? $_GET['enlace'] ?? null;
    if (!$enlace) {
        respond(['error' => 'Enlace requerido'], 400);
    }
    
    $stmt = $pdo->prepare("SELECT * FROM producto WHERE enlace = ?");
    $stmt->execute([$enlace]);
    $producto = $stmt->fetch();
    
    if (!$producto) {
        respond(['error' => 'Producto no encontrado'], 404);
    }
    
    if ($producto['caracteristicas']) $producto['caracteristicas'] = json_decode($producto['caracteristicas'], true);
    if ($producto['especificaciones']) $producto['especificaciones'] = json_decode($producto['especificaciones'], true);
    if ($producto['zonas']) $producto['zonas'] = json_decode($producto['zonas'], true);
    if ($producto['miniaturas']) $producto['miniaturas'] = json_decode($producto['miniaturas'], true);
    if ($producto['tags']) $producto['tags'] = json_decode($producto['tags'], true);
    
    respond(['producto' => $producto]);
}

respond(['error' => 'AcciÃ³n no vÃ¡lida en catÃ¡logo'], 400);
