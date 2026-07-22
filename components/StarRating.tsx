export default function StarRating({ rating }: { rating: number }) {
  const safeRating = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <div className="flex text-gold" aria-label={`${safeRating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < safeRating ? 'text-gold' : 'text-charcoal/20'}>
          ★
        </span>
      ))}
    </div>
  )
}