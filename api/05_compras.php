<?php
// Los Castores API - Purchase Endpoints
require_once __DIR__ . '/01_config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST' && $action === 'crear') {
    $input = getInput();
    $user = requireAuth($pdo);
    
    $sucursalId = $input['sucursal_id'] ?? 1;
    $metodoPago = $input['metodo_pago'] ?? 'qr';
    $nombreCompleto = $input['nombre_completo'] ?? $user['nombre'] ?? '';
    $telefono = $input['telefono'] ?? '';
    $ciudad = $input['ciudad'] ?? '';
    $direccion = $input['direccion'] ?? '';
    $notas = $input['notas'] ?? '';
    
    $stmt = $pdo->prepare("
        SELECT ci.*, p.precio, p.nombre
        FROM carrito_item ci
        JOIN producto p ON ci.productoId = p.id
        WHERE ci.usuarioId = ?
    ");
    $stmt->execute([$user['id']]);
    $items = $stmt->fetchAll();
    
    if (empty($items)) {
        respond(['error' => 'El carrito está vacío'], 400);
    }
    
    $total = array_reduce($items, function($sum, $item) {
        return $sum + ($item['precio'] * $item['cantidad']);
    }, 0);
    
    $codigo = generateCode('LC');
    
    $stmt = $pdo->prepare("
        INSERT INTO compra (codigo, usuarioId, sucursalId, metodoPago, estado, totalBs, nombreCompleto, telefono, ciudad, direccion, notas, fechaActualizacion)
        VALUES (?, ?, ?, ?, 'pendiente_pago', ?, ?, ?, ?, ?, ?, NOW())
    ");
    $stmt->execute([$codigo, $user['id'], $sucursalId, $metodoPago, $total, $nombreCompleto, $telefono, $ciudad, $direccion, $notas]);
    
    $compraId = $pdo->lastInsertId();
    
    $stmtItem = $pdo->prepare("INSERT INTO compra_item (compraId, productoId, cantidad, precioUnitario, subtotal) VALUES (?, ?, ?, ?, ?)");
    foreach ($items as $item) {
        $subtotal = $item['precio'] * $item['cantidad'];
        $stmtItem->execute([$compraId, $item['productoId'], $item['cantidad'], $item['precio'], $subtotal]);
    }
    
    $stmt = $pdo->prepare("DELETE FROM carrito_item WHERE usuarioId = ?");
    $stmt->execute([$user['id']]);
    
    respond([
        'compra' => [
            'id' => $compraId,
            'codigo' => $codigo,
            'total' => $total,
            'estado' => 'pendiente_pago',
            'metodoPago' => $metodoPago
        ],
        'message' => 'Compra creada exitosamente'
    ], 201);
}

if ($method === 'GET' && $action === 'listar') {
    $user = requireAuth($pdo);
    
    $stmt = $pdo->prepare("
        SELECT c.*, COUNT(ci.id) as items_count
        FROM compra c
        LEFT JOIN compra_item ci ON c.id = ci.compraId
        WHERE c.usuarioId = ?
        GROUP BY c.id
        ORDER BY c.fechaCreacion DESC
    ");
    $stmt->execute([$user['id']]);
    respond(['compras' => $stmt->fetchAll()]);
}

if ($method === 'GET' && $id) {
    $user = requireAuth($pdo);
    
    $stmt = $pdo->prepare("
        SELECT c.*, s.nombre as sucursal_nombre, s.ciudad as sucursal_ciudad
        FROM compra c
        LEFT JOIN sucursal s ON c.sucursalId = s.id
        WHERE c.id = ? AND c.usuarioId = ?
    ");
    $stmt->execute([$id, $user['id']]);
    $compra = $stmt->fetch();
    
    if (!$compra) {
        respond(['error' => 'Compra no encontrada'], 404);
    }
    
    $stmt = $pdo->prepare("
        SELECT ci.*, p.nombre, p.imagen, p.enlace
        FROM compra_item ci
        JOIN producto p ON ci.productoId = p.id
        WHERE ci.compraId = ?
    ");
    $stmt->execute([$id]);
    $compra['items'] = $stmt->fetchAll();
    
    respond(['compra' => $compra]);
}

if ($method === 'POST' && $action === 'confirmar-pago') {
    $input = getInput();
    $compraId = $input['compra_id'] ?? null;
    $referencia = $input['referencia'] ?? null;
    
    if (!$compraId) {
        respond(['error' => 'compra_id requerido'], 400);
    }
    
    $stmt = $pdo->prepare("UPDATE compra SET estado = 'pagado', fechaActualizacion = NOW() WHERE id = ?");
    $stmt->execute([$compraId]);
    
    $stmt = $pdo->prepare("UPDATE pago SET estado = 'pagado', fechaPago = NOW(), referencia = ? WHERE compraId = ?");
    $stmt->execute([$referencia, $compraId]);
    
    respond(['message' => 'Pago confirmado', 'compraId' => $compraId]);
}

respond(['error' => 'Acción no válida en compras'], 400);
