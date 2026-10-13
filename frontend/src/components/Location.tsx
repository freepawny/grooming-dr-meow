function Location() {
  return (
    <section id="lokasi" className="py-20 bg-sky-50/60">
      <div className="dm-container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="dm-section-label">Lokasi</span>
            <h2 className="dm-section-title">Grooming Dr. Meow</h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Grooming Dr. Meow melayani pelanggan di wilayah Malang. Gunakan fitur antar-jemput saat booking apabila membutuhkan layanan kurir.
            </p>

            <div className="mt-7 space-y-4">
              <div className="flex gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-white flex items-center justify-center"></div>
                <div>
                  <p className="font-bold text-slate-800">Lokasi</p>
                  <p className="text-sm text-slate-500">Alamat Grooming Dr. Meow, Malang</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-white flex items-center justify-center"></div>
                <div>
                  <p className="font-bold text-slate-800">Antar-Jemput</p>
                  <p className="text-sm text-slate-500">Tersedia sesuai wilayah layanan.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-80 rounded-3xl bg-white border border-sky-100 flex items-center justify-center">
            <div className="text-center px-5">
              <div className="text-5xl"></div>
              <p className="mt-3 font-black text-slate-700">Map Placeholder</p>
              <p className="mt-1 text-sm text-slate-400">Ganti komponen ini dengan Google Maps</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Location