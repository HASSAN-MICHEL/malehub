import { Check, Clock, Users, ArrowRight } from 'lucide-react'

const benefits = [
  'CV & personal branding',
  'Interview preparation',
  'Access to opportunities',
  'Network building',
  'Expert coaching',
]

export function JobsWeekSection() {
  return (
    <section id="jobs-week" className="py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
      <div className="absolute top-0 right-0 w-1/2 h-full" style={{ background: 'linear-gradient(to left, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 5%, transparent)' }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
              style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
            >
              Featured Program
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>Jobs Week</h2>
            <p className="mt-2 text-xl font-medium" style={{ color: 'var(--primary)' }}>Become a job-ready candidate in 5 days</p>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              An intensive 5-day program designed to transform your professional profile and open doors to new opportunities.
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }}>
                    <Check className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                  </div>
                  <span style={{ color: 'var(--foreground)' }}>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <a
                href="https://wa.me/237600000000?text=Bonjour, je souhaite m'inscrire à Jobs Week"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                Reserve via WhatsApp <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl p-8 lg:p-10 relative overflow-hidden border" style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
              <div className="absolute top-0 right-0">
                <div className="text-xs font-bold px-4 py-2 rounded-bl-xl" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                  LIMITED
                </div>
              </div>
              <div className="mb-8">
                <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Programme complet</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-5xl font-bold" style={{ color: 'var(--foreground)' }}>30,000</span>
                  <span className="text-xl" style={{ color: 'var(--muted-foreground)' }}>FCFA</span>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                  <Users className="h-5 w-5" style={{ color: 'var(--primary)' }} />
                  <span className="font-medium" style={{ color: 'var(--foreground)' }}>10 spots only</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                  <Clock className="h-5 w-5" style={{ color: 'var(--primary)' }} />
                  <span style={{ color: 'var(--muted-foreground)' }}>5 days intensive program</span>
                </div>
              </div>
              <div className="space-y-3">
                <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Included:</span>
                <ul className="space-y-2">
                  {['CV optimization', 'Mock interviews', 'LinkedIn profile', 'Job matching', 'Certificate'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      <Check className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="https://wa.me/237600000000?text=Bonjour, je souhaite m'inscrire à Jobs Week (30,000 FCFA)"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-8 flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                Réserver ma place
              </a>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border rounded-2xl -z-10" style={{ borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
