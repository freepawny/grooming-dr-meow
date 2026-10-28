import { useState, useEffect } from 'react'
import ServiceCard, { type Service } from './ServiceCard'

const SERVICE_CONFIG: Record<string, { description: string }> = {
  basic: {
    description: 'Mandi, pengeringan, penyisiran, dan perawatan dasar.',
  },
  full: {
    description: 'Perawatan grooming yang lebih lengkap untuk kucing.',
  },
  kitten: {
    description: 'Perawatan yang disesuaikan untuk kucing usia kitten.',
  },
  addon: {
    description: 'Tambahan layanan sesuai kebutuhan kucing kesayanganmu.',
  },
}

function Services() {
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
        console.error('Gagal memuat layanan:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    loadServices()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) {
    return (
      <section id="layanan" className="py-20 lg:py-28">
        <div className="dm-container">
          <div className="text-center max-w-2xl mx-auto">
            <span className="dm-section-label">Layanan Kami</span>
            <h2 className="dm-section-title">Perawatan terbaik untuk si meong</h2>
            <p className="mt-4 text-slate-500">Memuat layanan...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="layanan" className="py-20 lg:py-28">
      <div className="dm-container">
        <div className="text-center max-w-2xl mx-auto">
          <span className="dm-section-label">Layanan Kami</span>
          <h2 className="dm-section-title">Perawatan terbaik untuk si meong</h2>
          <p className="mt-4 text-slate-500">
            Pilih layanan yang sesuai dengan kebutuhan kucing kesayanganmu.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const config = SERVICE_CONFIG[service.id]
            return config ? (
              <ServiceCard
                key={service.id}
                service={service}
                description={config.description}
              />
            ) : null
          })}
        </div>
      </div>
    </section>
  )
}

export default Services