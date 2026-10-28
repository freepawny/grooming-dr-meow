<?php require_once __DIR__ . '/../templates/header.php'; ?>

<?php if (isset($data['service']) && $data['service']): ?>
    <div class="card">
        <h1><?php echo htmlspecialchars($data['service']['name'], ENT_QUOTES, 'UTF-8'); ?></h1>
        <hr style="border: none; border-top: 2px solid #f59e0b; margin: 1rem 0;">
        <p style="font-size: 1.25rem; color: #f59e0b;"><strong>Harga:</strong> Rp <?php echo number_format($data['service']['price'], 0, ',', '.'); ?></p>
        <p><strong>ID Layanan:</strong> <?php echo htmlspecialchars($data['service']['id'], ENT_QUOTES, 'UTF-8'); ?></p>
        <div style="margin-top: 2rem;">
            <a href="/index_mvc.php?url=service" style="color: #f59e0b; font-weight: bold;">← Kembali ke Daftar Layanan</a>
        </div>
    </div>
<?php else: ?>
    <div class="card">
        <h1>Layanan Tidak Ditemukan</h1>
        <p>Maaf, layanan yang Anda cari tidak tersedia.</p>
        <p><a href="/index_mvc.php?url=service" style="color: #f59e0b;">← Kembali ke Daftar Layanan</a></p>
    </div>
<?php endif; ?>

<?php require_once __DIR__ . '/../templates/footer.php'; ?>
