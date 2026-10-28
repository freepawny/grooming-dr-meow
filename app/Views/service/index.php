<?php require_once '../app/Views/templates/header.php'; ?>

<h1>Daftar Layanan</h1>

<?php if (isset($data['services']) && is_array($data['services'])): ?>
    <?php foreach ($data['services'] as $service): ?>
        <div class="card">
            <h2><?php echo htmlspecialchars($service['name'], ENT_QUOTES, 'UTF-8'); ?></h2>
            <p><strong>Harga:</strong> Rp <?php echo number_format($service['price'], 0, ',', '.'); ?></p>
            <p><a href="/index.php?url=service/show/<?php echo htmlspecialchars($service['id'], ENT_QUOTES, 'UTF-8'); ?>" style="color: #f59e0b;">Lihat Detail →</a></p>
        </div>
    <?php endforeach; ?>
<?php endif; ?>

<?php require_once '../app/Views/templates/footer.php'; ?>
