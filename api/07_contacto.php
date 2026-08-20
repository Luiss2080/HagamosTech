<?php
// HagamosTech API - Contact Endpoints
require_once __DIR__ . '/01_config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = getInput();
    
    $nombre = sanitize($input['nombre'] ?? '');
    $correo = sanitize($input['correo'] ?? '');
    $telefono = sanitize($input['telefono'] ?? '');
    $asunto = sanitize($input['asunto'] ?? '');
    $mensaje = sanitize($input['mensaje'] ?? '');
    $tipo = sanitize($input['tipo'] ?? 'contacto');
    
    if (!$nombre || !$correo || !$mensaje) {
        respond(['error' => 'Nombre, correo y mensaje son requeridos'], 400);
    }
    
    $stmt = $pdo->prepare("INSERT INTO mensaje (nombre, correo, telefono, asunto, mensaje, tipo, estado, fechaCreacion) VALUES (?, ?, ?, ?, ?, ?, 'nuevo', NOW())");
    $stmt->execute([$nombre, $correo, $telefono, $asunto, $mensaje, $tipo]);
    
    $mensajeId = $pdo->lastInsertId();
    
    respond([
        'mensaje' => [
            'id' => $mensajeId,
            'nombre' => $nombre,
            'correo' => $correo,
            'tipo' => $tipo
        ],
        'message' => 'Mensaje enviado exitosamente'
    ], 201);
}

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM mensaje ORDER BY fechaCreacion DESC");
    respond(['mensajes' => $stmt->fetchAll()]);
}

respond(['error' => 'Acción no válida en contacto'], 400);
