import { BookOpen, ArrowRight } from 'lucide-react'

export default function LibraryPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
              <BookOpen className="h-10 w-10" style={{ color: 'var(--primary)' }} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
              style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
              Bibliothèque Sociale
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              Social <span style={{ color: 'var(--primary)' }}>Library</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
              A curated collection of books, resources, and materials for your personal and professional development journey.
            </p>
            <div className="mt-8 p-8 rounded-2xl border" style={{ backgroundColor: 'color-mix(in oklch, var(--background) 50%, transparent)', borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }}>
              <p className="font-medium mb-4" style={{ color: 'var(--foreground)' }}>Coming Soon</p>
              <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>Our social library is being prepared. Get notified when it launches.</p>
              <a href="https://wa.me/237600000000?text=Bonjour, je souhaite être informé du lancement de la bibliothèque sociale"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                Get notified <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
