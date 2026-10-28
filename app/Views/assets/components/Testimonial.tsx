function Testimonial() {
  return (
    <section id="testimoni" className="py-20 lg:py-28">
      <div className="dm-container">
        <div className="text-center max-w-2xl mx-auto">
          <span className="dm-section-label">Testimoni</span>
          <h2 className="dm-section-title">Apa kata pelanggan?</h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <article className="p-7 rounded-3xl bg-sky-50">
            <div className="text-yellow-400 text-lg">★★★★★</div>
            <p className="mt-4 text-slate-600 leading-relaxed">
              "Pelayanannya bagus, kucing saya juga kelihatan nyaman."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center"></div>
              <div>
                <p className="font-extrabold">Customer 01</p>
                <p className="text-xs text-slate-400">Pemilik kucing</p>
              </div>
            </div>
          </article>

          <article className="p-7 rounded-3xl bg-blue-50">
            <div className="text-yellow-400 text-lg">★★★★★</div>
            <p className="mt-4 text-slate-600 leading-relaxed">
              "Groomernya ramah dan proses booking sangat mudah."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center"></div>
              <div>
                <p className="font-extrabold">Customer 02</p>
                <p className="text-xs text-slate-400">Pemilik kucing</p>
              </div>
            </div>
          </article>

          <article className="p-7 rounded-3xl bg-indigo-50">
            <div className="text-yellow-400 text-lg">★★★★★</div>
            <p className="mt-4 text-slate-600 leading-relaxed">
              "Fitur antar-jemput sangat membantu ketika saya tidak bisa datang langsung."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center"></div>
              <div>
                <p className="font-extrabold">Customer 03</p>
                <p className="text-xs text-slate-400">Pemilik kucing</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Testimonial