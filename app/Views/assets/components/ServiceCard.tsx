interface ServiceCardProps {
  service: {
    id: string
    name: string
    price: number
  }
  iconBg: string
  icon: React.ReactNode
  description: string
}

export default function ServiceCard({ service, iconBg, icon, description }: ServiceCardProps) {
  return (
    <article className="dm-card p-6">
      <div className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center text-3xl`}>
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-extrabold text-slate-800">{service.name}</h3>
      <p className="mt-2 text-sm text-slate-500 leading-relaxed">{description}</p>
      <div className="mt-5 font-extrabold text-sky-500">
        Rp{service.price.toLocaleString('id-ID')}
      </div>
    </article>
  )
}