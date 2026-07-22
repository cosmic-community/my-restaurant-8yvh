import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🥩</span>
            <span className="font-serif text-xl font-bold text-cream">My Restaurant</span>
          </div>
          <p className="text-sm leading-relaxed">
            Prime cuts, aged to perfection. An unforgettable steakhouse experience.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-lg text-cream mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/menu" className="hover:text-gold transition-colors">Menu</Link></li>
            <li><Link href="/about" className="hover:text-gold transition-colors">About</Link></li>
            <li><Link href="/locations" className="hover:text-gold transition-colors">Locations</Link></li>
            <li><Link href="/reviews" className="hover:text-gold transition-colors">Reviews</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg text-cream mb-3">Visit Us</h4>
          <p className="text-sm leading-relaxed">
            Find hours, locations, and reservation info on our{' '}
            <Link href="/locations" className="text-gold hover:underline">locations page</Link>.
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} My Restaurant. All rights reserved.
      </div>
    </footer>
  )
}