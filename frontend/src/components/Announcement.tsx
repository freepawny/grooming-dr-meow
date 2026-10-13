function Announcement() {
    return (
        <section id="pengumuman" className="py-20 bg-sky-50/60">
            <div className="dm-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
                    <div>
                        <span className="dm-section-label">Papan</span>
                        <h2 className="dm-section-title">Pengumuman</h2>
                        <br/>
                        <p className="max-w-md text-slate-500">
                            Informasi promo, jadwal operasional, dan pengumuman terbaru untuk
                            pelanggan.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <article className="dm-card p-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-500 text-xs font-bold">
                            PROMO
                        </span>
                        <h3 className="mt-4 text-xl font-extrabold text-slate-800">
                            Promo Grooming
                        </h3>
                        <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                            Dapatkan informasi promo grooming terbaru dari Dr. Meow.
                        </p>
                    </article>

                    <article className="dm-card p-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-500 text-xs font-bold">
                            INFO
                        </span>
                        <h3 className="mt-4 text-xl font-extrabold text-slate-800">
                            Jadwal Operasional
                        </h3>
                        <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                            Cek jadwal buka dan informasi operasional Grooming Dr. Meow.
                        </p>
                    </article>

                    <article className="dm-card p-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-500 text-xs font-bold">
                            UPDATE
                        </span>
                        <h3 className="mt-4 text-xl font-extrabold text-slate-800">
                            Informasi Penting
                        </h3>
                        <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                            Informasi terbaru mengenai layanan Grooming Dr. Meow.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default Announcement;
