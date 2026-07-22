export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="text-4xl animate-pulse">🥩</div>
        <p className="mt-4 text-charcoal/60 font-serif text-lg">Preparing your table...</p>
      </div>
    </div>
  )
}