<?php
require_once __DIR__ . '/../classes/GroomingService.php';

// Inisialisasi object GroomingService dengan data layanan grooming
$groomingService = new GroomingService(
    'full',
    'Full Grooming',
    175000,
    'Perawatan grooming yang lebih lengkap untuk kucing kesayanganmu.',
    array('Mandi', 'Pengeringan', 'Penyisiran bulu', 'Pembersihan telinga', 'Pemotongan kuku', 'Parfum khusus kucing')
);

// Ambil data dari object melalui method
$profile = $groomingService->getProfile();
$features = $groomingService->getFeatures();
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grooming Dr. Meow - OOP Demo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            border-bottom: 2px solid #f59e0b;
            padding-bottom: 10px;
        }
        .profile {
            margin: 20px 0;
        }
        .profile-item {
            margin: 10px 0;
            padding: 10px;
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
        }
        .label {
            font-weight: bold;
            color: #555;
        }
        .features {
            margin: 20px 0;
        }
        .features h2 {
            color: #333;
            margin-bottom: 15px;
        }
        .feature-list {
            list-style: none;
            padding: 0;
        }
        .feature-list li {
            padding: 12px 20px;
            margin: 8px 0;
            background-color: #fefce8;
            border-radius: 4px;
            border-left: 4px solid #f59e0b;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Grooming Dr. Meow</h1>
        
        <div class="profile">
            <div class="profile-item">
                <span class="label">Nama Layanan:</span> <?php echo htmlspecialchars($profile['name'], ENT_QUOTES, 'UTF-8'); ?>
            </div>
            <div class="profile-item">
                <span class="label">Harga:</span> <?php echo htmlspecialchars($groomingService->getFormattedPrice(), ENT_QUOTES, 'UTF-8'); ?>
            </div>
            <div class="profile-item">
                <span class="label">Deskripsi:</span> <?php echo htmlspecialchars($profile['description'], ENT_QUOTES, 'UTF-8'); ?>
            </div>
        </div>
        
        <div class="features">
            <h2>Fitur Layanan</h2>
            <ul class="feature-list">
                <?php foreach ($features as $feature): ?>
                    <li><?php echo htmlspecialchars($feature, ENT_QUOTES, 'UTF-8'); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>
</body>
</html>
