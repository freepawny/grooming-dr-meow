<?php
// api/health.php
// Endpoint GET /api/health

require_once __DIR__ . '/../includes/helpers.php';

sendJson(200, array('success' => true, 'data' => 'ok'));
