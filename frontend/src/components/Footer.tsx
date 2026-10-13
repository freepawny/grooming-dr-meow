function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="dm-container py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <img src="/assets/logo.png" alt="Grooming Dr. Meow" className="w-24 md:w-28 lg:w-32 h-auto" />
            <p className="mt-4 text-slate-400 max-w-sm leading-relaxed">
              Layanan grooming profesional untuk kucing kesayanganmu di Malang.
            </p>
          </div>

          <div>
            <h3 className="font-black">Navigasi</h3>
            <div className="mt-4 flex flex-col gap-3 text-slate-400 text-sm">
              <a href="#layanan" className="hover:text-white">Layanan</a>
              <a href="#alur" className="hover:text-white">Alur Pemesanan</a>
              <a href="#harga" className="hover:text-white">Harga</a>
              <a href="#lokasi" className="hover:text-white">Lokasi</a>
              <a href="#testimoni" className="hover:text-white">Testimoni</a>
            </div>
          </div>

          <div>
            <h3 className="font-black">Kontak</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p>📍 Malang</p>
              <p>📱 Nomor WhatsApp</p>
              <a
                href="https://www.instagram.com/grooming.drmeow"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white"
              >
                📷 @grooming.drmeow
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-sm text-slate-500 flex flex-col sm:flex-row justify-between gap-3">
          <p>© 2026 Grooming Dr. Meow.</p>
          <p>Website Project — Pemrograman Web</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer