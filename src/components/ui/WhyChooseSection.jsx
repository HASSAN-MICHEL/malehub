import { MapPin, Wifi, Zap, Shield, Users, Building } from 'lucide-react'

const features = [
  { icon: Building, title: 'Modern professional environment', description: 'State-of-the-art workspace designed for productivity and comfort.' },
  { icon: MapPin, title: 'Strategic location', description: 'Located in Bonapriso, the business heart of Douala.' },
  { icon: Users, title: 'Strong network', description: 'Connect with entrepreneurs, investors, and professionals.' },
  { icon: Wifi, title: 'High-speed unlimited WiFi', description: 'Fiber optic connection for seamless work experience.' },
  { icon: Zap, title: 'Generator backup', description: 'Uninterrupted power supply for continuous productivity.' },
  { icon: Shield, title: 'Secure space', description: '24/7 security and controlled access for peace of mind.' },
]

export function WhyChooseSection() {
  return (
    <section className="py-20 lg:py-32" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
            style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
          >
            Nos Avantages
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
            Why choose <span style={{ color: 'var(--primary)' }}>Malea Hub</span>?
          </h2>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            Everything you need for a productive and successful professional experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 lg:p-8 rounded-2xl border transition-all duration-300"
              style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--primary) 30%, transparent)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--border) 50%, transparent)')}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                <feature.icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{feature.title}</h3>
              <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
