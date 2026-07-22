import type { Location } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function LocationCard({ location }: { location: Location }) {
  const name = getMetafieldValue(location.metadata?.location_name) || location.title
  const address = getMetafieldValue(location.metadata?.address)
  const phone = getMetafieldValue(location.metadata?.phone)
  const email = getMetafieldValue(location.metadata?.email)
  const hours = getMetafieldValue(location.metadata?.hours)
  const reservationInfo = getMetafieldValue(location.metadata?.reservation_info)
  const reservationLink = getMetafieldValue(location.metadata?.reservation_link)
  const photo = location.metadata?.location_photo

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-charcoal/5">
      {photo && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={`${photo.imgix_url}?w=1000&h=560&fit=crop&auto=format,compress`}
            alt={name}
            width={500}
            height={280}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-serif text-2xl font-bold text-charcoal mb-4">{name}</h3>

        <div className="space-y-3 text-sm text-charcoal/80">
          {address && (
            <p className="flex gap-2">
              <span className="text-ember">📍</span>
              <span className="whitespace-pre-line">{address}</span>
            </p>
          )}
          {phone && (
            <p className="flex gap-2">
              <span className="text-ember">📞</span>
              <a href={`tel:${phone}`} className="hover:text-ember transition-colors">{phone}</a>
            </p>
          )}
          {email && (
            <p className="flex gap-2">
              <span className="text-ember">✉️</span>
              <a href={`mailto:${email}`} className="hover:text-ember transition-colors">{email}</a>
            </p>
          )}
        </div>

        {hours && (
          <div className="mt-5">
            <h4 className="font-serif text-lg font-semibold text-charcoal mb-1">Hours</h4>
            <p className="text-sm text-charcoal/70 whitespace-pre-line leading-relaxed">{hours}</p>
          </div>
        )}

        {reservationInfo && (
          <div className="mt-5">
            <h4 className="font-serif text-lg font-semibold text-charcoal mb-1">Reservations</h4>
            <p className="text-sm text-charcoal/70 whitespace-pre-line leading-relaxed">{reservationInfo}</p>
          </div>
        )}

        {reservationLink && (
          <a
            href={reservationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-ember hover:bg-ember-dark text-cream font-medium px-6 py-2.5 rounded-full transition-colors uppercase tracking-wider text-sm"
          >
            Reserve a Table
          </a>
        )}
      </div>
    </article>
  )
}