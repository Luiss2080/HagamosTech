<?php
// HagamosTech API - Auth Endpoints
require_once __DIR__ . '/01_config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST' && $action === 'login') {
    $input = getInput();
    $correo = $input['correo'] ?? '';
    $contrasena = $input['contrasena'] ?? '';
    
    if (!$correo || !$contrasena) {
        respond(['error' => 'Correo y contraseÃ±a requeridos'], 400);
    }
    
    $stmt = $pdo->prepare("SELECT * FROM usuario WHERE correo = ?");
    $stmt->execute([$correo]);
    $user = $stmt->fetch();
    
    if (!$user || !password_verify($contrasena, $user['contrasena'])) {
        respond(['error' => 'Credenciales invÃ¡lidas'], 401);
    }
    
    $token = $user['id'];
    unset($user['contrasena']);
    
    respond([
        'usuario' => $user,
        'token' => $token,
        'message' => 'Login exitoso'
    ]);
}

if ($method === 'POST' && $action === 'registro') {
    $input = getInput();
    $correo = $input['correo'] ?? '';
    $contrasena = $input['contrasena'] ?? '';
    $nombre = $input['nombre'] ?? '';
    
    if (!$correo || !$contrasena) {
        respond(['error' => 'Correo y contraseÃ±a requeridos'], 400);
    }
    
    $stmt = $pdo->prepare("SELECT id FROM usuario WHERE correo = ?");
    $stmt->execute([$correo]);
    if ($stmt->fetch()) {
        respond(['error' => 'El correo ya estÃ¡ registrado'], 409);
    }
    
    $hash = password_hash($contrasena, PASSWORD_DEFAULT);
    
    $stmt = $pdo->prepare("INSERT INTO usuario (correo, contrasena, nombre, fechaActualizacion) VALUES (?, ?, ?, NOW())");
    $stmt->execute([$correo, $hash, $nombre]);
    
    $userId = $pdo->lastInsertId();
    
    respond([
        'usuario' => ['id' => $userId, 'correo' => $correo, 'nombre' => $nombre],
        'token' => $userId,
        'message' => 'Registro exitoso'
    ], 201);
}

if ($method === 'GET' && $action === 'perfil') {
    $user = requireAuth($pdo);
    unset($user['contrasena']);
    respond(['usuario' => $user]);
}

if ($method === 'POST' && $action === 'logout') {
    respond(['message' => 'Logout exitoso']);
}

respond(['error' => 'AcciÃ³n no vÃ¡lida en auth'], 400);
