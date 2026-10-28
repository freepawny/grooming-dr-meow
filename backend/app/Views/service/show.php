<?php require_once '../app/Views/templates/header.php'; ?>

<?php if (isset($data['service']) && $data['service']): ?>
    <div class="card">
        <h1><?php echo htmlspecialchars($data['service']['name'], ENT_QUOTES, 'UTF-8'); ?></h1>
        <p><strong>Harga:</strong> Rp <?php echo number_format($data['service']['price'], 0, ',', '.'); ?></p>
        <p><strong>ID Layanan:</strong> <?php echo htmlspecialchars($data['service']['id'], ENT_QUOTES, 'UTF-8'); ?></p>
        <p><a href="/index.php?url=service" style="color: #f59e0b;">← Kembali ke Daftar Layanan</a></p>
    </div>
<?php else: ?>
    <div class="card">
        <p>Layanan tidak ditemukan.</p>
        <p><a href="/index.php?url=service" style="color: #f59e0b;">← Kembali ke Daftar Layanan</a></p>
    </div>
<?php endif; ?>

<?php require_once '../app/Views/templates/footer.php'; ?>
