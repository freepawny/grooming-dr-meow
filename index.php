<?php
// index.php (router utama - terintegrasi MVC di root)

// Define paths for MVC structure
define('APP_ROOT', __DIR__);
define('CORE_ROOT', __DIR__ . '/core');
define('APP_PATH', __DIR__ . '/app');
define('PUBLIC_PATH', __DIR__ . '/public');

require_once __DIR__ . '/includes/helpers.php';

// Route API requests
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$scriptName = $_SERVER['SCRIPT_NAME'];

// Hilangkan base path jika ada
$basePath = str_replace('\\', '/', dirname($scriptName));
if ($basePath === '/') {
    $basePath = '';
}

if ($basePath !== '' && strpos($uri, $basePath) === 0) {
    $uri = substr($uri, strlen($basePath));
}
if ($uri === '') {
    $uri = '/';
}

// Routing untuk API
if (strpos($uri, '/api/') === 0) {
    $apiPath = substr($uri, strlen('/api/'));
    // Bersihkan
    $apiPath = trim($apiPath, '/');
    if ($apiPath === '') {
        sendJson(404, array('success' => false, 'error' => 'API endpoint not found'));
        exit;
    }

    $target = __DIR__ . '/api/' . $apiPath . '.php';
    if (file_exists($target)) {
        require $target;
        exit;
    }

    // Handle case tanpa .php eksplisit
    $target2 = __DIR__ . '/api/' . $apiPath;
    if (is_dir($target2) && file_exists($target2 . '/index.php')) {
        require $target2 . '/index.php';
        exit;
    }

    sendJson(404, array('success' => false, 'error' => 'API endpoint not found'));
    exit;
}

// Untuk non-API routes, gunakan MVC
require_once __DIR__ . '/index_mvc.php';
exit;
