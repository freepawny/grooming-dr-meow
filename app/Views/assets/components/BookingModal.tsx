import { useState, useEffect, type FormEvent, type ChangeEvent, type KeyboardEvent } from 'react'

interface FormData {
  customerName: string
  customerPhone: string
  service: string
  bookingDate: string
  bookingTime: string
  catName: string
  arrivalMethod: string
  pickupAddress: string
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customerPhone: '',
    service: '',
    bookingDate: '',
    bookingTime: '',
    catName: '',
    arrivalMethod: 'Datang Sendiri',
    pickupAddress: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [minDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown as unknown as EventListener)
    return () => document.removeEventListener('keydown', handleKeyDown as unknown as EventListener)
  }, [isOpen, onClose])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const newErrors: Partial<FormData> = {}
    const required: (keyof FormData)[] = ['customerName', 'customerPhone', 'service', 'bookingDate', 'bookingTime', 'catName', 'arrivalMethod']
    required.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = 'Field ini wajib diisi'
      }
    })

    if (formData.arrivalMethod === 'Antar-Jemput' && !formData.pickupAddress?.trim()) {
      newErrors.pickupAddress = 'Alamat penjemputan wajib diisi untuk metode Antar-Jemput'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'HTTP ' + res.status)
      }

      alert(`Reservasi berhasil dikirim!\n\nID: ${data.data.id}`)
      onClose()
      setFormData({
        customerName: '',
        customerPhone: '',
        service: '',
        bookingDate: '',
        bookingTime: '',
        catName: '',
        arrivalMethod: 'Datang Sendiri',
        pickupAddress: '',
      })
    } catch (err: unknown) {
      console.error('Gagal mengirim reservasi:', err)
      alert('Gagal mengirim reservasi:\n' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div id="bookingModal" className="fixed inset-0 z-[100] bg-slate-900/60 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[2rem] shadow-2xl">
        <div className="sticky top-0 z-10 bg-white px-6 py-5 border-b border-sky-50 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-sky-500">RESERVASI</p>
            <h2 className="text-2xl font-black text-slate-800">Booking Grooming</h2>
          </div>
          <button id="closeBooking" type="button" className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 text-xl" onClick={onClose}>×</button>
        </div>

        <form id="bookingForm" className="p-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="customerName" className="block mb-2 text-sm font-bold text-slate-700">Nama Pemilik</label>
            <input
              id="customerName"
              name="customerName"
              type="text"
              required
              placeholder="Masukkan nama"
              className={`dm-input ${errors.customerName ? 'border-red-400 focus:border-red-400' : ''}`}
              value={formData.customerName}
              onChange={handleChange}
            />
            {errors.customerName && <p className="mt-1 text-xs text-red-500">{errors.customerName}</p>}
          </div>

          <div>
            <label htmlFor="customerPhone" className="block mb-2 text-sm font-bold text-slate-700">Nomor WhatsApp</label>
            <input
              id="customerPhone"
              name="customerPhone"
              type="tel"
              required
              placeholder="08xxxxxxxxxx"
              className={`dm-input ${errors.customerPhone ? 'border-red-400 focus:border-red-400' : ''}`}
              value={formData.customerPhone}
              onChange={handleChange}
            />
            {errors.customerPhone && <p className="mt-1 text-xs text-red-500">{errors.customerPhone}</p>}
          </div>

          <div>
            <label htmlFor="service" className="block mb-2 text-sm font-bold text-slate-700">Pilih Layanan</label>
            <select
              id="service"
              name="service"
              required
              className={`dm-input ${errors.service ? 'border-red-400 focus:border-red-400' : ''}`}
              value={formData.service}
              onChange={handleChange}
            >
              <option value="">Pilih layanan</option>
              <option value="Basic Grooming">Basic Grooming</option>
              <option value="Full Grooming">Full Grooming</option>
              <option value="Grooming Kitten">Grooming Kitten</option>
              <option value="Add-on Service">Add-on Service</option>
            </select>
            {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
          </div>

          <div>
            <label htmlFor="bookingDate" className="block mb-2 text-sm font-bold text-slate-700">Tanggal</label>
            <input
              id="bookingDate"
              name="bookingDate"
              type="date"
              required
              min={minDate}
              className={`dm-input ${errors.bookingDate ? 'border-red-400 focus:border-red-400' : ''}`}
              value={formData.bookingDate}
              onChange={handleChange}
            />
            {errors.bookingDate && <p className="mt-1 text-xs text-red-500">{errors.bookingDate}</p>}
          </div>

          <div>
            <label htmlFor="bookingTime" className="block mb-2 text-sm font-bold text-slate-700">Waktu</label>
            <input
              id="bookingTime"
              name="bookingTime"
              type="time"
              required
              className={`dm-input ${errors.bookingTime ? 'border-red-400 focus:border-red-400' : ''}`}
              value={formData.bookingTime}
              onChange={handleChange}
            />
            {errors.bookingTime && <p className="mt-1 text-xs text-red-500">{errors.bookingTime}</p>}
          </div>

          <div>
            <label htmlFor="catName" className="block mb-2 text-sm font-bold text-slate-700">Nama Kucing</label>
            <input
              id="catName"
              name="catName"
              type="text"
              required
              placeholder="Contoh: Mochi"
              className={`dm-input ${errors.catName ? 'border-red-400 focus:border-red-400' : ''}`}
              value={formData.catName}
              onChange={handleChange}
            />
            {errors.catName && <p className="mt-1 text-xs text-red-500">{errors.catName}</p>}
          </div>

          <div>
            <label className="block mb-3 text-sm font-bold text-slate-700">Metode Kedatangan</label>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="arrivalMethod"
                  value="Datang Sendiri"
                  className="peer sr-only"
                  checked={formData.arrivalMethod === 'Datang Sendiri'}
                  onChange={handleChange}
                />
                <div className="p-4 rounded-2xl border-2 border-slate-200 peer-checked:border-sky-400 peer-checked:bg-sky-50 transition">
                  <div className="text-2xl">🏠</div>
                  <p className="mt-2 font-extrabold">Datang Sendiri</p>
                  <p className="text-xs text-slate-500">Pelanggan datang ke lokasi grooming.</p>
                </div>
              </label>

              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="arrivalMethod"
                  value="Antar-Jemput"
                  className="peer sr-only"
                  checked={formData.arrivalMethod === 'Antar-Jemput'}
                  onChange={handleChange}
                />
                <div className="p-4 rounded-2xl border-2 border-slate-200 peer-checked:border-sky-400 peer-checked:bg-sky-50 transition">
                  <div className="text-2xl">🛵</div>
                  <p className="mt-2 font-extrabold">Antar-Jemput</p>
                  <p className="text-xs text-slate-500">Kurir menjemput kucing.</p>
                </div>
              </label>
            </div>
          </div>

          <div id="pickupAddressContainer" className={formData.arrivalMethod === 'Antar-Jemput' ? '' : 'hidden'}>
            <label htmlFor="pickupAddress" className="block mb-2 text-sm font-bold text-slate-700">Alamat Penjemputan</label>
            <textarea
              id="pickupAddress"
              name="pickupAddress"
              rows={3}
              placeholder="Masukkan alamat lengkap penjemputan..."
              className={`dm-input resize-none ${errors.pickupAddress ? 'border-red-400 focus:border-red-400' : ''}`}
              value={formData.pickupAddress}
              onChange={handleChange}
            />
            {errors.pickupAddress && <p className="mt-1 text-xs text-red-500">{errors.pickupAddress}</p>}
            <p className="mt-2 text-xs text-slate-400">
              Layanan antar-jemput tersedia untuk wilayah layanan Grooming Dr. Meow di Malang.
            </p>
          </div>

          <button
            type="submit"
            className="w-full dm-button-primary rounded-2xl py-4 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Mengirim...' : 'Konfirmasi Reservasi'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookingModal