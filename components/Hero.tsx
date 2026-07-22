import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-charcoal text-cream overflow-hidden">
      <img
        src="https://imgix.cosmicjs.com/ecf8bd60-85e7-11f1-94b5-e7d581aac3e0-autopilot-photo-1600891964092-4316c288032e-1784736658271.jpeg?w=2000&h=1000&fit=crop&auto=format,compress"
        alt="Perfectly seared steak"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-28 sm:py-40 text-center">
        <p className="uppercase tracking-[0.3em] text-gold text-sm mb-4">Premium Steakhouse</p>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight">
          Prime Cuts, Aged to Perfection
        </h1>
        <p className="mt-6 text-lg text-cream/80 max-w-2xl mx-auto">
          An unforgettable dining experience featuring hand-selected steaks,
          fine wine, and impeccable service.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/menu"
            className="bg-ember hover:bg-ember-dark text-cream font-medium px-8 py-3 rounded-full transition-colors uppercase tracking-wider text-sm"
          >
            View Menu
          </Link>
          <Link
            href="/locations"
            className="border border-gold text-gold hover:bg-gold hover:text-charcoal font-medium px-8 py-3 rounded-full transition-colors uppercase tracking-wider text-sm"
          >
            Reserve a Table
          </Link>
        </div>
      </div>
    </section>
  )
}