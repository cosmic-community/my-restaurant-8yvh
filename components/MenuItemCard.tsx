import type { MenuItem } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import DietaryTags from '@/components/DietaryTags'

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const name = getMetafieldValue(item.metadata?.name) || item.title
  const description = getMetafieldValue(item.metadata?.description)
  const price = item.metadata?.price
  const image = item.metadata?.featured_image
  const isFavorite = item.metadata?.chefs_favorite === true

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-charcoal/5 hover:shadow-lg transition-shadow flex flex-col">
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
          {isFavorite && (
            <span className="absolute top-3 left-3 bg-ember text-cream text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow">
              ⭐ Chef's Favorite
            </span>
          )}
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl font-semibold text-charcoal">{name}</h3>
          {typeof price === 'number' && (
            <span className="font-semibold text-ember whitespace-nowrap">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-charcoal/70 mt-2 leading-relaxed flex-1">{description}</p>
        )}
        <DietaryTags tags={item.metadata?.dietary_tags} />
      </div>
    </article>
  )
}