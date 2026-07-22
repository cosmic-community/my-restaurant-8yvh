import { getMetafieldValue } from '@/lib/cosmic'

export default function DietaryTags({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map((tag, index) => {
        const label = getMetafieldValue(tag)
        if (!label) return null
        return (
          <span
            key={`${label}-${index}`}
            className="text-xs uppercase tracking-wide font-medium px-2.5 py-1 rounded-full bg-gold-light/40 text-charcoal border border-gold/30"
          >
            {label}
          </span>
        )
      })}
    </div>
  )
}