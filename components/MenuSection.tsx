import type { MenuCategory, MenuItem } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import MenuItemCard from '@/components/MenuItemCard'

interface MenuSectionProps {
  category: MenuCategory
  items: MenuItem[]
}

export default function MenuSection({ category, items }: MenuSectionProps) {
  if (!items || items.length === 0) return null

  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">{name}</h2>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-3 mb-3" />
        {description && (
          <p className="text-charcoal/60 max-w-2xl mx-auto">{description}</p>
        )}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}