<?php
// config/config.php
// Konfigurasi dasar backend PHP prosedural

define('APP_ROOT', dirname(__DIR__));
define('PROJECT_ROOT', dirname(dirname(__DIR__)));
define('DATA_DIR', PROJECT_ROOT . '/data');

define('JSON_PRETTY_PRINT', JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
