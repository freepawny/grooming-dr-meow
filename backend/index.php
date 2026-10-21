<?php
// index.php (router sederhana di dalam folder backend)
// Menangani request ke /api/* seperti pola routing prosedural

require_once __DIR__ . '/includes/helpers.php';

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

// Default untuk akses non-api
http_response_code(404);
header('Content-Type: text/plain; charset=utf-8');
echo "Not Found";
