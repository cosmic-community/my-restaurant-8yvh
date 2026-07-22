'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center">
        <div className="text-4xl mb-4">🔥</div>
        <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">Something went wrong</h2>
        <p className="text-charcoal/60 mb-6">We couldn't load this page. Please try again.</p>
        <button
          onClick={reset}
          className="bg-ember hover:bg-ember-dark text-cream font-medium px-6 py-2.5 rounded-full transition-colors uppercase tracking-wider text-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}