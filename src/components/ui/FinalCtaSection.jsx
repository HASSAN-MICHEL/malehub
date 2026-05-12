import { ArrowRight } from 'lucide-react'

export function FinalCtaSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--background), color-mix(in oklch, var(--primary) 5%, transparent), var(--background))' }} />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, color-mix(in oklch, var(--primary) 50%, transparent))' }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
            <div className="w-16 h-px" style={{ background: 'linear-gradient(to left, transparent, color-mix(in oklch, var(--primary) 50%, transparent))' }} />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
            Ready to grow your{' '}
            <span style={{ color: 'var(--primary)' }}>project</span> or{' '}
            <span style={{ color: 'var(--primary)' }}>invest</span>?
          </h2>

          <p className="mt-6 text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            Whether you&apos;re an entrepreneur looking to scale or an investor seeking high-potential opportunities, Malea Hub is your gateway to innovation in Cameroon.
          </p>

          <div className="mt-10">
            <a
              href="https://wa.me/237678111022?text=Bonjour, je souhaite en savoir plus sur Malea Hub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-lg text-lg font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              Contact us on WhatsApp
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            {['Bonapriso, Douala', 'Open Mon-Sat', 'Premium workspace'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
