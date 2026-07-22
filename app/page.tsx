export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getMenuCategories, getMenuItems, getCustomerReviews, getMetafieldValue } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import MenuItemCard from '@/components/MenuItemCard'
import ReviewCard from '@/components/ReviewCard'
import type { MenuItem } from '@/types'

export default async function HomePage() {
  const [categories, items, reviews] = await Promise.all([
    getMenuCategories(),
    getMenuItems(),
    getCustomerReviews(),
  ])

  const favorites: MenuItem[] = items
    .filter((item) => item.metadata?.chefs_favorite === true)
    .slice(0, 3)

  const featuredReviews = reviews.slice(0, 3)

  return (
    <>
      <Hero />

      {/* Chef's Favorites */}
      {favorites.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <p className="uppercase tracking-[0.3em] text-ember text-sm mb-2">Signature Dishes</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">Chef's Favorites</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-block border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream font-medium px-8 py-3 rounded-full transition-colors uppercase tracking-wider text-sm"
            >
              Explore Full Menu
            </Link>
          </div>
        </section>
      )}

      {/* Categories preview */}
      {categories.length > 0 && (
        <section className="bg-charcoal text-cream py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <p className="uppercase tracking-[0.3em] text-gold text-sm mb-2">Discover</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-10">Our Menu</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href="/menu"
                  className="border border-gold/40 text-cream hover:border-gold hover:text-gold px-6 py-3 rounded-full transition-colors font-serif text-lg"
                >
                  {getMetafieldValue(cat.metadata?.name) || cat.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      {featuredReviews.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <p className="uppercase tracking-[0.3em] text-ember text-sm mb-2">Testimonials</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">What Guests Say</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/reviews"
              className="inline-block border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream font-medium px-8 py-3 rounded-full transition-colors uppercase tracking-wider text-sm"
            >
              Read All Reviews
            </Link>
          </div>
        </section>
      )}
    </>
  )
}