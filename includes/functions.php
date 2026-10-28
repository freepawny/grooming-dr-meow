<?php
// includes/functions.php
// Fungsi bisnis prosedural (menggunakan function, conditional, loop)

require_once __DIR__ . '/helpers.php';

function validateBookingInput($input)
{
    $errors = array();

    $required = array('customerName', 'customerPhone', 'service', 'bookingDate', 'bookingTime', 'catName', 'arrivalMethod');
    foreach ($required as $key) {
        if (!array_key_exists($key, $input)) {
            $errors[] = $key;
            continue;
        }
        $value = trimValue($input[$key]);
        if ($value === '') {
            $errors[] = $key;
        }
    }

    if (!empty($errors)) {
        return array(false, 'Field wajib diisi: ' . implode(', ', $errors));
    }

    $arrivalMethod = trimValue($input['arrivalMethod']);
    if ($arrivalMethod === 'Antar-Jemput') {
        if (!array_key_exists('pickupAddress', $input)) {
            return array(false, 'pickupAddress wajib diisi untuk metode Antar-Jemput');
        }
        $pickupAddress = trimValue($input['pickupAddress']);
        if ($pickupAddress === '') {
            return array(false, 'pickupAddress wajib diisi untuk metode Antar-Jemput');
        }
    }

    return array(true, null);
}

function createBookingId()
{
    return 'BK-' . strtoupper(base_convert((string)time(), 10, 36)) . strtoupper(substr(bin2hex(random_bytes(2)), 0, 4));
}

function processBooking($input)
{
    $booking = array(
        'id' => createBookingId(),
        'createdAt' => date('c'),
        'customerName' => trimValue($input['customerName']),
        'customerPhone' => trimValue($input['customerPhone']),
        'service' => trimValue($input['service']),
        'bookingDate' => trimValue($input['bookingDate']),
        'bookingTime' => trimValue($input['bookingTime']),
        'catName' => trimValue($input['catName']),
        'arrivalMethod' => trimValue($input['arrivalMethod']),
        'pickupAddress' => trimValue(isset($input['pickupAddress']) ? $input['pickupAddress'] : ''),
    );

    return $booking;
}

function appendBooking($booking)
{
    $list = readJsonFile('bookings.json');
    if (!is_array($list)) {
        $list = array();
    }
    $list[] = $booking;
    return writeJsonFile('bookings.json', $list);
}
