<?php
// Los Castores API - Payment Endpoints
require_once __DIR__ . '/01_config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST' && $action === 'confirmar') {
    $input = getInput();
    $compraId = $input['compra_id'] ?? null;
    $referencia = $input['referencia'] ?? null;
    $monto = $input['monto'] ?? 0;
    
    if (!$compraId) {
        respond(['error' => 'compra_id requerido'], 400);
    }
    
    $stmt = $pdo->prepare("UPDATE compra SET estado = 'pagado', fechaActualizacion = NOW() WHERE id = ?");
    $stmt->execute([$compraId]);
    
    $stmt = $pdo->prepare("INSERT INTO pago (compraId, metodoPago, estado, monto, referencia, fechaPago) VALUES (?, 'qr', 'pagado', ?, ?, NOW())");
    $stmt->execute([$compraId, $monto, $referencia]);
    
    respond(['message' => 'Pago confirmado', 'compraId' => $compraId]);
}

if ($method === 'GET' && $action === 'estado') {
    $codigo = $id ?? $_GET['codigo'] ?? null;
    if (!$codigo) {
        respond(['error' => 'Código requerido'], 400);
    }
    
    $stmt = $pdo->prepare("
        SELECT p.*, c.codigo as compra_codigo
        FROM pago p
        JOIN compra c ON p.compraId = c.id
        WHERE c.codigo = ?
    ");
    $stmt->execute([$codigo]);
    $pago = $stmt->fetch();
    
    if (!$pago) {
        respond(['error' => 'Pago no encontrado'], 404);
    }
    
    respond(['pago' => $pago]);
}

respond(['error' => 'Acción no válida en pagos'], 400);
