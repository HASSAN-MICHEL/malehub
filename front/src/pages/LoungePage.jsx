


import { useTranslation } from 'react-i18next'
import { Coffee, Users, ArrowRight } from 'lucide-react'

const loungeImages = [
  { src: '/malesalon.jpeg', alt: 'Espace salon' },
  { src: '/maleSalonthe.jpeg', alt: 'Coin café' },
  { src: '/maleblan.jpeg', alt: 'Espace détente' },
  { src: '/malenoir.jpeg', alt: 'Coin lecture' },
]

export default function LoungePage() {
  const { t } = useTranslation()

  const usageItems = t('lounge.usage.items', { returnObjects: true })

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Badge - fond var(--primary), texte noir */}
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg md:text-xl font-medium mb-6"
              style={{
                borderColor:
                  'color-mix(in oklch, var(--primary) 30%, transparent)',
                backgroundColor:
                  'color-mix(in oklch, var(--primary) 10%, transparent)',
                color: 'var(--primary)',
              }}
            >
              {t('lounge.hero.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              L'espace{' '}
              <span style={{ color: 'var(--primary)' }}>Lounge</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              {t('lounge.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Galerie Photos - Salon & Café */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {loungeImages.map((image, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden group aspect-[4/3]">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end p-6" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}>
                  <span className="text-white font-medium text-lg">{image.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnement & Usage */}
      <section className="py-12 lg:py-20" style={{ backgroundColor: 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: 'var(--foreground)' }}>
            {t('lounge.usage.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {usageItems.map((item) => {
              const IconMap = {
                'Événements Networking': Users,
                'Networking Events': Users,
                'Break Productif': Coffee,
                'Productive Break': Coffee,
                'Réunions Informelles': Users,
                'Informal Meetings': Users,
              }
              const Icon = IconMap[item.title] || Users
              return (
                <div key={item.title} className="p-8 rounded-2xl border text-center transition-all hover:shadow-md" style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                    <Icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{item.description}</p>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-12">
            <a href="https://wa.me/237678111022?text=Bonjour, je souhaite visiter l'espace Lounge"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              {t('lounge.usage.cta_button')} <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}