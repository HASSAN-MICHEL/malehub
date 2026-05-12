import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, Lightbulb, GraduationCap } from 'lucide-react'

const services = [
  {
    icon: Lightbulb,
    title: 'Incubateur',
    description: 'Structurez, développez et lancez votre projet avec un mentorat sur mesure et un accès privilégié à notre réseau d’investisseurs.',
    href: '/incubator',
    features: ["Mentorat expert", "Réseau d'investisseurs", 'Demo Day'],
    primary: true,
  },
  {
    icon: Briefcase,
    title: 'Coworking',
    description: 'Un espace de travail moderne et professionnel avec WiFi haut débit, salles de réunion et tout le confort nécessaire pour booster votre productivité.',
    href: '/coworking',
    features: ['WiFi illimité', 'Salles de réunion', 'Espace sécurisé'],
    primary: false,
  },
  {
    icon: GraduationCap,
    title: 'Formations',
    description: 'Des programmes de formation intensive pour développer vos compétences techniques et devenir opérationnel sur le marché en un temps record.',
    href: '/training',
    features: ['Jobs Week', 'Certifications', 'Workshops'],
    primary: false,
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-32" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
            style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
          >
            Nos Services
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
            Tout ce dont vous avez besoin pour <span style={{ color: 'var(--primary)' }}>réussir</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            Trois piliers conçus pour accompagner votre parcours professionnel, de l'espace de travail à la croissance de votre entreprise.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-xl overflow-hidden border transition-all duration-300"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: service.primary
                  ? 'color-mix(in oklch, var(--primary) 50%, transparent)'
                  : 'color-mix(in oklch, var(--border) 50%, transparent)',
              }}
              onMouseEnter={e => {
                if (!service.primary) e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--primary) 50%, transparent)'
              }}
              onMouseLeave={e => {
                if (!service.primary) e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--border) 50%, transparent)'
              }}
            >
              {service.primary && (
                <div className="absolute top-0 right-0">
                  <div className="text-xs font-bold px-3 py-1 rounded-bl-lg" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                    À LA UNE
                  </div>
                </div>
              )}
              <div className="p-6 lg:p-8">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors"
                  style={{ backgroundColor: service.primary ? 'color-mix(in oklch, var(--primary) 20%, transparent)' : 'color-mix(in oklch, var(--primary) 10%, transparent)' }}
                >
                  <service.icon className="h-7 w-7" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>{service.title}</h3>
                <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={service.href}
                  className="inline-flex items-center gap-2 font-medium transition-all hover:gap-3"
                  style={{ color: 'var(--primary)' }}
                >
                  En savoir plus <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}