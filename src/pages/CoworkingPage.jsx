import { Wifi, Users, Monitor, Coffee, Clock, Shield, ArrowRight, Calendar } from 'lucide-react'

const features = [
  { icon: Wifi, title: 'High-Speed WiFi', description: 'Unlimited fiber optic connection for seamless productivity' },
  { icon: Users, title: 'Meeting Rooms', description: 'Private spaces for team meetings and client calls' },
  { icon: Monitor, title: 'Modern Setup', description: 'Ergonomic furniture and professional equipment' },
  { icon: Coffee, title: 'Lounge Area', description: 'Relaxation space for breaks and informal meetings' },
  { icon: Clock, title: 'Flexible Hours', description: 'Access during business hours with extended options' },
  { icon: Shield, title: 'Secure Access', description: 'Controlled entry and secure storage options' },
]

const workspaceImages = [
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', alt: 'Open workspace area' },
  { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80', alt: 'Meeting room' },
  { src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80', alt: 'Private office' },
  { src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80', alt: 'Lounge area' },
]

export default function CoworkingPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
              style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
              Espace de Travail
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              Your premium <span style={{ color: 'var(--primary)' }}>coworking</span> space
            </h1>
            <p className="mt-6 text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              A modern, professional workspace in the heart of Bonapriso. Everything you need to work productively and grow your business.
            </p>
            <div className="mt-8">
              <a href="https://wa.me/237678111022?text=Bonjour, je souhaite réserver un espace coworking"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                Book a space <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ color: 'var(--foreground)' }}>Our Workspace</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {workspaceImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, color-mix(in oklch, var(--background) 80%, transparent), transparent)' }}>
                  <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{image.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Everything you need</h2>
            <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>Premium amenities for a productive work experience</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                  <feature.icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{feature.title}</h3>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
            <Calendar className="h-12 w-12 mx-auto mb-6" style={{ color: 'var(--primary)' }} />
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Rent our space for your events</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>Want to rent the space for your events or training sessions?</p>
            <p className="mt-2 font-medium" style={{ color: 'var(--primary)' }}>Available 6:30pm - 10:30pm</p>
            <a href="https://wa.me/237678111022?text=Bonjour, je souhaite louer l'espace pour un événement"
              target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              Contact us on WhatsApp <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
