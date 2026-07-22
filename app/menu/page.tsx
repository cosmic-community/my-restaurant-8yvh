export const dynamic = 'force-dynamic'

import { getMenuCategories, getMenuItems } from '@/lib/cosmic'
import MenuSection from '@/components/MenuSection'
import MenuItemCard from '@/components/MenuItemCard'
import type { MenuItem } from '@/types'

export const metadata = {
  title: 'Menu | My Restaurant',
  description: 'Explore our full steakhouse menu, grouped by category with pricing and dietary info.',
}

export default async function MenuPage() {
  const [categories, items] = await Promise.all([
    getMenuCategories(),
    getMenuItems(),
  ])

  // Group items by category id
  const itemsByCategory: Record<string, MenuItem[]> = {}
  const uncategorized: MenuItem[] = []

  for (const item of items) {
    const catId = item.metadata?.category?.id
    if (catId) {
      const existing = itemsByCategory[catId]
      if (existing) {
        existing.push(item)
      } else {
        itemsByCategory[catId] = [item]
      }
    } else {
      uncategorized.push(item)
    }
  }

  const hasCategorizedItems = categories.some((cat) => {
    const catItems = itemsByCategory[cat.id]
    return catItems && catItems.length > 0
  })

  return (
    <div className="bg-cream">
      <div className="bg-charcoal text-cream py-16 text-center px-4">
        <p className="uppercase tracking-[0.3em] text-gold text-sm mb-3">Fine Dining</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold">Our Menu</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {!hasCategorizedItems && uncategorized.length === 0 && (
          <p className="text-center text-charcoal/60">No menu items available yet.</p>
        )}

        {categories.map((category) => {
          const catItems = itemsByCategory[category.id]
          if (!catItems || catItems.length === 0) return null
          return (
            <MenuSection key={category.id} category={category} items={catItems} />
          )
        })}

        {uncategorized.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">More Dishes</h2>
              <div className="w-16 h-0.5 bg-gold mx-auto mt-3" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {uncategorized.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}