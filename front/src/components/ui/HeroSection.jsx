import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')` }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--background) 95%, transparent), color-mix(in oklch, var(--background) 80%, transparent), var(--background))' }} />
      </div>

      <div className="absolute top-1/4 left-0 w-32 h-px opacity-50" style={{ background: 'linear-gradient(to right, transparent, var(--primary), transparent)' }} />
      <div className="absolute bottom-1/4 right-0 w-32 h-px opacity-50" style={{ background: 'linear-gradient(to right, transparent, var(--primary), transparent)' }} />
      <div className="absolute top-1/3 right-10 lg:right-20 w-48 h-48 rounded-full border opacity-30 hidden lg:block" style={{ borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }} />
      <div className="absolute bottom-1/3 left-10 lg:left-20 w-32 h-32 border rotate-45 opacity-20 hidden lg:block" style={{ borderColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8"
            style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary)' }} />
            Innovation Hub - Bonapriso, Douala
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <span style={{ color: 'var(--primary)' }}>Connect</span>
            <span style={{ color: 'var(--foreground)' }}>, </span>
            <span style={{ color: 'var(--primary)' }}>support</span>
            <span style={{ color: 'var(--foreground)' }}> and </span>
            <span style={{ color: 'var(--primary)' }}>grow</span>
            <br className="hidden sm:block" />
           
          </h1>

          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            Espace coworking, programme d'accompagnement , acces à un réseau d'investisseurs. 
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-base font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              Rejoindre l'incubateur
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              to="#about"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-base font-semibold border transition-colors"
              style={{ borderColor: 'color-mix(in oklch, var(--primary) 50%, transparent)', color: 'var(--foreground)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--primary) 10%, transparent)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Découvrir Malea Hub
              <ChevronDown className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '50+', label: 'Startups' },
              { value: '200+', label: 'Entrepreneurs' },
              { value: '15+', label: 'Investisseurs' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--primary)' }}>{stat.value}</div>
                <div className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'var(--muted-foreground)' }}>
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--primary), transparent)' }} />
      </div>
    </section>
  )
}
