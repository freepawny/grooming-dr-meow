<?php

require_once 'core/App.php';
require_once 'core/Controller.php';

session_start();

// Route API requests to existing API handlers
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if (strpos($uri, '/api/') === 0) {
    require_once __DIR__ . '/index.php';
    exit;
}

// Handle MVC routing for frontend
$app = new App();
