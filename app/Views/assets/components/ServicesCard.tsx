export interface Service {
  id: string
  name: string
  price: number
}

interface ServiceCardProps {
  service: Service
  description: string
}

const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function ServiceCard({ service, description }: ServiceCardProps) {
  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{service.name}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-baseline justify-between">
        <span className="text-xs text-slate-400 font-medium">Mulai dari</span>
        <span className="text-lg font-bold text-slate-900">
          {formatRupiah(service.price)}
        </span>
      </div>
    </div>
  )
}

export default ServiceCard