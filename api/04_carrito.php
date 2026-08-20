<?php
// Los Castores API - Cart Endpoints
require_once __DIR__ . '/01_config.php';

$method = $_SERVER['REQUEST_METHOD'];
$user = requireAuth($pdo);

if ($method === 'GET') {
    $stmt = $pdo->prepare("
        SELECT ci.*, p.nombre, p.precio, p.imagen, p.enlace, p.categoriaId
        FROM carrito_item ci
        JOIN producto p ON ci.productoId = p.id
        WHERE ci.usuarioId = ?
    ");
    $stmt->execute([$user['id']]);
    $items = $stmt->fetchAll();
    
    $total = array_reduce($items, function($sum, $item) {
        return $sum + ($item['precio'] * $item['cantidad']);
    }, 0);
    
    respond(['items' => $items, 'total' => $total, 'cantidad' => count($items)]);
}

if ($method === 'POST') {
    $input = getInput();
    $productoId = $input['producto_id'] ?? null;
    $cantidad = $input['cantidad'] ?? 1;
    
    if (!$productoId) {
        respond(['error' => 'producto_id requerido'], 400);
    }
    
    $stmt = $pdo->prepare("SELECT id, cantidad FROM carrito_item WHERE usuarioId = ? AND productoId = ?");
    $stmt->execute([$user['id'], $productoId]);
    $existing = $stmt->fetch();
    
    if ($existing) {
        $newCantidad = $existing['cantidad'] + $cantidad;
        $stmt = $pdo->prepare("UPDATE carrito_item SET cantidad = ? WHERE id = ?");
        $stmt->execute([$newCantidad, $existing['id']]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO carrito_item (usuarioId, productoId, cantidad) VALUES (?, ?, ?)");
        $stmt->execute([$user['id'], $productoId, $cantidad]);
    }
    
    respond(['message' => 'Producto agregado al carrito', 'productoId' => $productoId]);
}

if ($method === 'DELETE') {
    $itemId = $id ?? null;
    
    if ($itemId === 'limpiar') {
        $stmt = $pdo->prepare("DELETE FROM carrito_item WHERE usuarioId = ?");
        $stmt->execute([$user['id']]);
        respond(['message' => 'Carrito vaciado']);
    }
    
    if ($itemId) {
        $stmt = $pdo->prepare("DELETE FROM carrito_item WHERE id = ? AND usuarioId = ?");
        $stmt->execute([$itemId, $user['id']]);
        respond(['message' => 'Item eliminado']);
    }
    
    respond(['error' => 'ID requerido'], 400);
}

respond(['error' => 'AcciÃ³n no vÃ¡lida en carrito'], 400);
