<?php
// api/bookings.php
// Endpoint GET /api/bookings & POST /api/bookings

require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/functions.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $data = readJsonFile('bookings.json');
    sendJson(200, array('success' => true, 'data' => $data));
    exit;
}

if ($method === 'POST') {
    $input = getJsonInput();
    if (!is_array($input)) {
        $input = array();
    }

    list($valid, $errorMsg) = validateBookingInput($input);
    if (!$valid) {
        sendJson(400, array('success' => false, 'error' => $errorMsg));
        exit;
    }

    $booking = processBooking($input);
    appendBooking($booking);

    sendJson(201, array('success' => true, 'data' => $booking));
    exit;
}

sendJson(405, array('success' => false, 'error' => 'Method not allowed'));
