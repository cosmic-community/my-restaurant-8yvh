import { createBucketClient } from '@cosmicjs/sdk'
import type { MenuCategory, MenuItem, Location, CustomerReview, Page } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render metafield values that may be objects
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'menu-categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const categories = response.objects as MenuCategory[]
    return categories.sort((a, b) => {
      const orderA = a.metadata?.display_order ?? 999
      const orderB = b.metadata?.display_order ?? 999
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch menu categories')
  }
}

export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'menu-items' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as MenuItem[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch menu items')
  }
}

export async function getLocations(): Promise<Location[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'locations' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Location[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch locations')
  }
}

export async function getCustomerReviews(): Promise<CustomerReview[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'customer-reviews' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const reviews = response.objects as CustomerReview[]
    return reviews.sort((a, b) => {
      const dateA = new Date(a.metadata?.date || '').getTime()
      const dateB = new Date(b.metadata?.date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch customer reviews')
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'pages', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object as Page
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error(`Failed to fetch page: ${slug}`)
  }
}