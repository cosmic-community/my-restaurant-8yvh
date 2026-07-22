import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-charcoal text-cream sticky top-0 z-40 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl">🥩</span>
          <span className="font-serif text-2xl font-bold tracking-tight">My Restaurant</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
          <Link href="/menu" className="hover:text-gold transition-colors">Menu</Link>
          <Link href="/about" className="hover:text-gold transition-colors">About</Link>
          <Link href="/locations" className="hover:text-gold transition-colors">Locations</Link>
          <Link href="/reviews" className="hover:text-gold transition-colors">Reviews</Link>
        </nav>
        <Link
          href="/locations"
          className="sm:hidden text-sm font-medium uppercase tracking-wider text-gold"
        >
          Locations
        </Link>
      </div>
    </header>
  )
}