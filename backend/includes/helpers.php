<?php
// includes/helpers.php
// Fungsi pembantu prosedural

require_once __DIR__ . '/../config/config.php';

function readJsonFile($filename)
{
    $filePath = DATA_DIR . '/' . $filename;
    if (!file_exists($filePath)) {
        return array();
    }
    $content = file_get_contents($filePath);
    if ($content === false) {
        return array();
    }
    $data = json_decode($content, true);
    if (!is_array($data)) {
        return array();
    }
    return $data;
}

function writeJsonFile($filename, $data)
{
    $filePath = DATA_DIR . '/' . $filename;
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return file_put_contents($filePath, $json);
}

function sendJson($statusCode, $payload)
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function getJsonInput()
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return array();
    }
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        return array();
    }
    return $decoded;
}

function trimValue($value)
{
    if (!is_string($value)) {
        if (is_null($value)) {
            return '';
        }
        return trim((string)$value);
    }
    return trim($value);
}
