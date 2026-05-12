import { Coffee, Users, Wifi, Music, ArrowRight } from 'lucide-react'

const features = [
  { icon: Coffee, title: 'Relaxation', description: 'Comfortable seating and calm atmosphere' },
  { icon: Users, title: 'Networking', description: 'Perfect for meeting new connections' },
  { icon: Wifi, title: 'Connectivity', description: 'Stay connected with high-speed WiFi' },
  { icon: Music, title: 'Ambiance', description: 'Curated music and premium decor' },
]

const loungeImages = [
  { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&q=80', alt: 'Lounge seating area' },
  { src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80', alt: 'Coffee corner' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', alt: 'Networking space' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', alt: 'Comfortable seating' },
]

export default function LoungePage() {
  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
              style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
              Espace Détente
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              The <span style={{ color: 'var(--primary)' }}>Lounge</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              A premium space designed for relaxation, networking, and informal meetings. Where connections happen naturally.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] md:row-span-2 rounded-2xl overflow-hidden group" style={{ aspectRatio: undefined }}>
              <img src={loungeImages[0].src} alt={loungeImages[0].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ minHeight: '300px' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, color-mix(in oklch, var(--background) 60%, transparent), transparent)' }} />
              <div className="absolute bottom-6 left-6">
                <span className="font-medium" style={{ color: 'var(--foreground)' }}>{loungeImages[0].alt}</span>
              </div>
            </div>
            {loungeImages.slice(1).map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(to top, color-mix(in oklch, var(--background) 60%, transparent), transparent)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ color: 'var(--foreground)' }}>Perfect for</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-6 rounded-2xl border" style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                  <feature.icon className="h-7 w-7" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{feature.title}</h3>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ color: 'var(--foreground)' }}>How to use the Lounge</h2>
            <div className="space-y-6">
              {[
                { icon: Users, title: 'Networking Events', desc: 'Meet fellow entrepreneurs, professionals, and potential partners in a relaxed setting.' },
                { icon: Coffee, title: 'Relaxation', desc: 'Take a break from work with comfortable seating and a calm atmosphere.' },
                { icon: Users, title: 'Informal Meetings', desc: 'Perfect for casual client meetings or team discussions outside the office environment.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-6 rounded-2xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                    <item.icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
                    <p className="mt-1" style={{ color: 'var(--muted-foreground)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <a href="https://wa.me/237600000000?text=Bonjour, je souhaite visiter le Lounge"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                Visit the Lounge <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
