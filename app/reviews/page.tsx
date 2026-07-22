import { getCustomerReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'

export const metadata = {
  title: 'Reviews | My Restaurant',
  description: 'Read what our guests are saying about their dining experience.',
}

export default async function ReviewsPage() {
  const reviews = await getCustomerReviews()

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.metadata?.rating || 0), 0) / reviews.length
      : 0

  return (
    <div className="bg-cream">
      <div className="bg-charcoal text-cream py-16 text-center px-4">
        <p className="uppercase tracking-[0.3em] text-gold text-sm mb-3">Testimonials</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold">Customer Reviews</h1>
        {reviews.length > 0 && (
          <p className="mt-4 text-gold text-lg">
            ★ {avgRating.toFixed(1)} average from {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {reviews.length === 0 ? (
          <p className="text-center text-charcoal/60">No reviews available yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}