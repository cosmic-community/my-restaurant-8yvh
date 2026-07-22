export const dynamic = 'force-dynamic'

import { getLocations } from '@/lib/cosmic'
import LocationCard from '@/components/LocationCard'

export const metadata = {
  title: 'Locations | My Restaurant',
  description: 'Find our restaurant locations, hours, and reservation info.',
}

export default async function LocationsPage() {
  const locations = await getLocations()

  return (
    <div className="bg-cream">
      <div className="bg-charcoal text-cream py-16 text-center px-4">
        <p className="uppercase tracking-[0.3em] text-gold text-sm mb-3">Visit Us</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold">Locations & Hours</h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        {locations.length === 0 ? (
          <p className="text-center text-charcoal/60">No locations available yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}