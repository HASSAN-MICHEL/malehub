import { TrendingUp, ArrowRight } from 'lucide-react'

export function InvestorCtaSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, var(--primary) 35px, var(--primary) 36px)` }} />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden border" style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 rounded-tl-2xl" style={{ borderColor: 'color-mix(in oklch, var(--primary) 50%, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 rounded-br-2xl" style={{ borderColor: 'color-mix(in oklch, var(--primary) 50%, transparent)' }} />
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
              <TrendingUp className="h-8 w-8" style={{ color: 'var(--primary)' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>Malea Invest Club</h2>
            <p className="mt-4 text-xl font-medium" style={{ color: 'var(--primary)' }}>Our private investor community</p>
            <p className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Join our exclusive network of investors and access high-potential projects from the Malea Hub incubator. Be part of Cameroon&apos;s growing entrepreneurial ecosystem.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/237600000000?text=Bonjour, je souhaite rejoindre le Malea Invest Club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                Join the club via WhatsApp <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
