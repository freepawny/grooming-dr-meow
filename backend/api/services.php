<?php
// api/services.php
// Endpoint GET /api/services

require_once __DIR__ . '/../includes/helpers.php';

$data = readJsonFile('services.json');
sendJson(200, array('success' => true, 'data' => $data));
