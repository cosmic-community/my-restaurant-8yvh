import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPageBySlug, getMetafieldValue } from '@/lib/cosmic'
import Markdown from 'react-markdown'

export const metadata = {
  title: 'About | My Restaurant',
  description: 'Learn the story behind My Restaurant — our craft, our team, and our commitment to fire and flavor.',
}

export default async function AboutPage() {
  const page = await getPageBySlug('about')

  if (!page) {
    notFound()
  }

  const eyebrow = getMetafieldValue(page.metadata?.eyebrow)
  const heading = getMetafieldValue(page.metadata?.heading) || page.title
  const subheading = getMetafieldValue(page.metadata?.subheading)
  const body = getMetafieldValue(page.metadata?.body)
  const ctaLabel = getMetafieldValue(page.metadata?.cta_label)
  const ctaLink = getMetafieldValue(page.metadata?.cta_link)
  const heroImage = page.metadata?.hero_image?.imgix_url

  return (
    <div className="bg-cream">
      {/* Hero */}
      <div className="relative bg-charcoal text-cream">
        {heroImage && (
          <div className="absolute inset-0">
            <img
              src={`${heroImage}?w=2000&auto=format,compress`}
              alt={heading}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal" />
          </div>
        )}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
          {eyebrow && (
            <p className="uppercase tracking-[0.3em] text-gold text-sm mb-4">{eyebrow}</p>
          )}
          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight">{heading}</h1>
          {subheading && (
            <p className="mt-6 text-lg sm:text-xl text-cream/80 max-w-2xl mx-auto leading-relaxed">
              {subheading}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal/80 prose-li:text-charcoal/80 prose-strong:text-charcoal">
          <Markdown>{body}</Markdown>
        </article>

        {ctaLabel && ctaLink && (
          <div className="mt-12 text-center">
            <Link
              href={ctaLink}
              className="inline-block bg-ember hover:bg-ember-dark text-cream font-medium uppercase tracking-wider px-10 py-4 rounded transition-colors"
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}