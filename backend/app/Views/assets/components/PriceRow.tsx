interface PriceRowProps {
  name: string
  price: string
  highlight?: boolean
}

export default function PriceRow({ name, price, highlight = false }: PriceRowProps) {
  return (
    <div className="grid grid-cols-2 px-6 py-5">
      <span className={highlight ? 'font-extrabold text-slate-800' : ''}>{name}</span>
      <span className="text-right font-bold text-sky-500">{price}</span>
    </div>
  )
}