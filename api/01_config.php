<?php
// HagamosTech API - Configuración de Base de Datos
// Detecta automáticamente el entorno: local vs producción

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ============================================================
// DETECCIÓN DE ENTORNO
// ============================================================
$hostname = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? 'localhost';
$isLocal = in_array($hostname, ['localhost', '127.0.0.1', '::1']) || strpos($hostname, '.test') !== false || strpos($hostname, '.local') !== false;

// ============================================================
// CONFIGURACIÓN POR ENTORNO
// ============================================================
if ($isLocal) {
    // DESARROLLO LOCAL (Laragon)
    $host = '127.0.0.1';
    $user = 'root';
    $pass = '';
    $db   = 'HagamosTech';
    $port = 3306;
} else {
    // PRODUCCIÓN (Servidor)
    // IMPORTANTE: Cambiar estas credenciales según tu hosting
    $host = 'localhost'; // O el host que te proporcione tu proveedor
    $user = 'hagamostech_user'; // Cambiar por usuario real del servidor
    $pass = 'password_seguro'; // Cambiar por password real
    $db   = 'HagamosTech';
    $port = 3306;
}

// ============================================================
// CONEXIÓN PDO
// ============================================================
$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database connection failed',
        'environment' => $isLocal ? 'local' : 'production',
        'host' => $host,
        'details' => $e->getMessage()
    ]);
    exit();
}

// ============================================================
// FUNCIONES AUXILIARES
// ============================================================
function respond($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit();
}

function getInput() {
    $json = file_get_contents('php://input');
    return json_decode($json, true) ?? [];
}

function requireAuth($pdo) {
    $headers = getallheaders();
    $token = $headers['Authorization'] ?? '';
    $token = str_replace('Bearer ', '', $token);
    
    if (empty($token)) {
        respond(['error' => 'Unauthorized - Token required'], 401);
    }
    
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE id = ?");
    $stmt->execute([$token]);
    $user = $stmt->fetch();
    
    if (!$user) {
        respond(['error' => 'Invalid token'], 401);
    }
    
    return $user;
}

function generateCode($prefix = 'HT') {
    return $prefix . '-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -6));
}

function sanitize($data) {
    if (is_array($data)) {
        return array_map('sanitize', $data);
    }
    return htmlspecialchars(strip_tags($data), ENT_QUOTES, 'UTF-8');
}

// ============================================================
// INFO DE ENTORNO (para debugging)
// ============================================================
$ENV_INFO = [
    'environment' => $isLocal ? 'development' : 'production',
    'host' => $hostname,
    'database' => $db,
    'php_version' => PHP_VERSION
];
