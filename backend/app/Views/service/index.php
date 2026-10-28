<?php require_once __DIR__ . '/../templates/header.php'; ?>

<h1>Daftar Layanan Grooming Dr. Meow</h1>
<p style="margin-bottom: 2rem; color: #666;">Pilih layanan yang sesuai dengan kebutuhan kucing kesayanganmu.</p>

<?php if (isset($data['services']) && is_array($data['services']) && !empty($data['services'])): ?>
    <?php foreach ($data['services'] as $service): ?>
        <div class="card">
            <h2><?php echo htmlspecialchars($service['name'], ENT_QUOTES, 'UTF-8'); ?></h2>
            <p><strong>Harga:</strong> Rp <?php echo number_format($service['price'], 0, ',', '.'); ?></p>
            <p><a href="/index_mvc.php?url=service/show/<?php echo htmlspecialchars($service['id'], ENT_QUOTES, 'UTF-8'); ?>" style="color: #f59e0b; font-weight: bold;">Lihat Detail →</a></p>
        </div>
    <?php endforeach; ?>
<?php else: ?>
    <div class="card">
        <p>Tidak ada layanan tersedia.</p>
    </div>
<?php endif; ?>

<?php require_once __DIR__ . '/../templates/footer.php'; ?>
