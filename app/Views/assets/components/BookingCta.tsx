interface BookingCtaProps {
  onBookingClick: () => void
}

function BookingCta({ onBookingClick }: BookingCtaProps) {
  return (
    <section id="booking" className="py-20">
      <div className="dm-container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-sky-400 px-7 py-12 sm:px-12 lg:px-16 text-white">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-white/80 font-bold">Siap grooming?</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black">Booking grooming untuk si meong sekarang!</h2>
              <p className="mt-4 text-white/80 max-w-xl">
                Pilih layanan, masukkan data kucing, tentukan jadwal, dan pilih metode kedatangan yang sesuai.
              </p>
            </div>

            <div className="lg:text-right">
              <button type="button" data-open-booking className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-white text-sky-500 font-black hover:bg-sky-50 transition" onClick={onBookingClick}>
                Mulai Reservasi <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingCta