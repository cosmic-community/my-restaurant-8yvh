import type { CustomerReview } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'

export default function ReviewCard({ review }: { review: CustomerReview }) {
  const name = getMetafieldValue(review.metadata?.reviewer_name) || review.title
  const text = getMetafieldValue(review.metadata?.review)
  const rating = review.metadata?.rating
  const dateStr = getMetafieldValue(review.metadata?.date)
  const locationName = review.metadata?.location?.metadata?.location_name
    ? getMetafieldValue(review.metadata.location.metadata.location_name)
    : ''

  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  return (
    <article className="bg-white rounded-xl p-6 shadow-sm border border-charcoal/5 flex flex-col">
      {typeof rating === 'number' && <StarRating rating={rating} />}
      {text && (
        <p className="text-charcoal/80 mt-4 leading-relaxed italic flex-1">“{text}”</p>
      )}
      <div className="mt-5 pt-4 border-t border-charcoal/10">
        <p className="font-semibold text-charcoal">{name}</p>
        <p className="text-xs text-charcoal/50 mt-0.5">
          {[locationName, formattedDate].filter(Boolean).join(' • ')}
        </p>
      </div>
    </article>
  )
}