import { useState, useEffect } from 'react'
import PriceRow from './PriceRow'

interface Service {
  id: string
  name: string
  price: number
}

function Price() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const loadServices = async () => {
      try {
        const res = await fetch('/api/services')
        const data = await res.json()
        if (mounted && data.success) {
          setServices(data.data)
        }
      } catch (err) {
        console.error('Gagal memuat harga:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    loadServices()
    return () => { mounted = false }
  }, [])

  const getPrice = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId)
    return service ? `Rp${service.price.toLocaleString('id-ID')}` : (loading ? 'Memuat…' : '—')
  }

  return (
    <section id="harga" className="py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="dm-section-label">Harga</span>
          <h2 className="dm-section-title">Pilihan layanan</h2>
          <p className="mt-4 text-slate-500">
            Harga di bawah masih berupa data dummy dan dapat diganti dengan harga asli.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-sky-100">
          <div className="grid grid-cols-2 bg-sky-50 px-6 py-4 font-extrabold text-slate-700">
            <span>Layanan</span>
            <span className="text-right">Harga</span>
          </div>

          <div className="divide-y divide-sky-50">
            {services.map((service) => (
              <PriceRow key={service.id} name={service.name} price={getPrice(service.id)} />
            ))}
            <PriceRow name="Antar-Jemput" price="Hubungi Admin" highlight />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Price