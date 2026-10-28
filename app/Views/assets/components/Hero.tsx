interface HeroProps {
  onBookingClick: () => void
  onServicesClick: () => void
}

function Hero({ onBookingClick, onServicesClick }: HeroProps) {
  return (
    <section id="home" className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden">
      <div className="absolute top-20 right-0 w-72 h-72 bg-sky-50 rounded-full blur-3xl opacity-70 -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-70 -z-10" />

      <div className="dm-container">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            

            <div className="flex items-center gap-4">
              <h1 className="text-[length:var(--font-size-hero)] sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-sky-400">
                Happy Cats,<br />
                Healthy Lives
              </h1>

              <img
                src="/assets/cat_paw.png"
                alt="Cat Paw"
                className="w-14 sm:w-20 lg:w-24 h-auto object-contain self-start -mt-2 sm:-mt-3 lg:-mt-4 rotate-12 animate-paw"
              />
            </div>

            <p className="mt-6 max-w-xl text-lg sm:text-xl text-slate-500 leading-relaxed">
              Layanan grooming profesional untuk kucing kesayanganmu dengan pelayanan yang nyaman dan terpercaya.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button type="button" data-open-booking className="dm-button-primary rounded-2xl px-7 py-4" onClick={onBookingClick}>
                Reservasi Sekarang
                <span className="text-xl">→</span>
              </button>
              <a href="#layanan" className="dm-button-secondary rounded-2xl px-7 py-4" onClick={onServicesClick}>
                Lihat Layanan
              </a>
            </div>

           
          </div>

          <div className="relative hidden md:flex justify-center lg:justify-end">
            <div className="relative w-[75%] max-w-sm lg:w-full lg:max-w-xl aspect-square bg-sky-50 rounded-[40%_60%_55%_45%] flex items-center justify-center overflow-hidden">
              <div className="absolute w-2/3 h-2/3 bg-white/80 rounded-full" />
              <img
                src="/assets/sleeping_cat_gemini.png"
                alt="Kucing sedang tidur"
                className="absolute left-[-1%] top-[11%] z-10 w-[110%] max-w-none h-auto object-contain animate-floating"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero