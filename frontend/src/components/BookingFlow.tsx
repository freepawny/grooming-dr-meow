function BookingFlow() {
  return (
    <section id="alur" className="py-20 bg-sky-50/60">
      <div className="dm-container">
        <div className="text-center max-w-2xl mx-auto">
          <span className="dm-section-label">Alur Pemesanan</span>
          <h2 className="dm-section-title">Booking jadi lebih mudah</h2>
          <p className="mt-4 text-slate-500">
            Proses pemesanan dirancang sederhana agar pelanggan mudah melakukan reservasi.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          <div className="bg-white p-6 rounded-3xl text-center shadow-sm">
            <div className="mx-auto w-12 h-12 rounded-full bg-sky-400 text-white flex items-center justify-center font-black">1</div>
            <h3 className="mt-4 font-extrabold">Pilih Layanan</h3>
            <p className="mt-2 text-sm text-slate-500">Tentukan layanan grooming.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl text-center shadow-sm">
            <div className="mx-auto w-12 h-12 rounded-full bg-sky-400 text-white flex items-center justify-center font-black">2</div>
            <h3 className="mt-4 font-extrabold">Pilih Jadwal</h3>
            <p className="mt-2 text-sm text-slate-500">Tentukan tanggal dan waktu.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl text-center shadow-sm">
            <div className="mx-auto w-12 h-12 rounded-full bg-sky-400 text-white flex items-center justify-center font-black">3</div>
            <h3 className="mt-4 font-extrabold">Data Kucing</h3>
            <p className="mt-2 text-sm text-slate-500">Masukkan informasi kucing.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl text-center shadow-sm">
            <div className="mx-auto w-12 h-12 rounded-full bg-sky-400 text-white flex items-center justify-center font-black">4</div>
            <h3 className="mt-4 font-extrabold">Metode Kedatangan</h3>
            <p className="mt-2 text-sm text-slate-500">Datang sendiri atau antar-jemput.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl text-center shadow-sm">
            <div className="mx-auto w-12 h-12 rounded-full bg-sky-400 text-white flex items-center justify-center font-black">5</div>
            <h3 className="mt-4 font-extrabold">Konfirmasi</h3>
            <p className="mt-2 text-sm text-slate-500">Tunggu konfirmasi admin.</p>
          </div>
        </div>

        <div className="mt-8 p-7 rounded-3xl bg-white border border-sky-100">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-sky-100 flex items-center justify-center text-3xl">🛵</div>
            <div>
              <h3 className="text-xl font-black text-slate-800">Layanan Antar-Jemput</h3>
              <p className="mt-1 text-slate-500">
                Pelanggan di wilayah Malang dapat memilih metode <strong>Antar-Jemput</strong> ketika melakukan booking. Alamat penjemputan akan dimasukkan pada proses reservasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingFlow