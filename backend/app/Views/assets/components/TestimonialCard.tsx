interface TestimonialCardProps {
  rating: number
  text: string
  author: string
  role: string
  avatarBg: string
  avatarIcon: React.ReactNode
}

export default function TestimonialCard({ rating, text, author, role, avatarBg, avatarIcon }: TestimonialCardProps) {
  return (
    <article className="p-7 rounded-3xl bg-sky-50">
      <div className="text-yellow-400 text-lg">
        {'★'.repeat(rating)}
      </div>
      <p className="mt-4 text-slate-600 leading-relaxed">"{text}"</p>
      <div className="mt-6 flex items-center gap-3">
        <div className={`w-11 h-11 rounded-full ${avatarBg} flex items-center justify-center`}>
          {avatarIcon}
        </div>
        <div>
          <p className="font-extrabold">{author}</p>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
      </div>
    </article>
  )
}