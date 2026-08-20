<?php
// Los Castores API - Main Router
require_once __DIR__ . '/01_config.php';

$uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($uri, PHP_URL_PATH);
$path = str_replace('/api/', '', $path);
$path = str_replace('/api', '', $path);
$segments = array_filter(explode('/', trim($path, '/')));

// Router
if (empty($segments)) {
    respond([
        'status' => 'ok',
        'message' => 'Los Castores API v1.0',
        'time' => date('Y-m-d H:i:s')
    ]);
}

$module = $segments[0] ?? '';
$action = $segments[1] ?? '';
$id = $segments[2] ?? null;

switch ($module) {
    case 'catalogo':
        require_once __DIR__ . '/03_catalogo.php';
        break;
    
    case 'auth':
        require_once __DIR__ . '/02_auth.php';
        break;
    
    case 'carrito':
        require_once __DIR__ . '/04_carrito.php';
        break;
    
    case 'compras':
        require_once __DIR__ . '/05_compras.php';
        break;
    
    case 'pagos':
        require_once __DIR__ . '/06_pagos.php';
        break;
    
    case 'contacto':
        require_once __DIR__ . '/07_contacto.php';
        break;
    
    case 'config':
        respond([
            'api_url' => 'https://tudominio.com/api',
            'version' => '1.0',
            'environment' => 'production'
        ]);
        break;
    
    case 'estado':
        respond([
            'status' => 'online',
            'database' => 'connected',
            'time' => date('Y-m-d H:i:s')
        ]);
        break;
    
    default:
        respond(['error' => 'Endpoint not found: ' . $module], 404);
}
