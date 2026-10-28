<?php

require_once __DIR__ . '/core/App.php';
require_once __DIR__ . '/core/Controller.php';

session_start();

// Route API requests if called directly
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$scriptName = $_SERVER['SCRIPT_NAME'];

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

if (strpos($uri, '/api/') === 0) {
    require_once __DIR__ . '/index.php';
    exit;
}

// Handle MVC routing for frontend
$app = new App();
