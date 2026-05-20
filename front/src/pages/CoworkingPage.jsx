

// import { Wifi, Users, Monitor, Coffee, Clock, Shield, ArrowRight, Calendar } from 'lucide-react'

// const features = [
//   { icon: Wifi, title: 'WiFi Haut Débit', description: 'Connexion fibre optique illimitée pour une productivité sans faille.' },
//   { icon: Users, title: 'Salles de Réunion', description: 'Espaces privés pour vos réunions d’équipe et appels clients.' },
//   { icon: Monitor, title: 'Équipements Modernes', description: 'Mobilier ergonomique et équipements professionnels à votre disposition.' },
//   { icon: Coffee, title: 'Espace Détente', description: 'Zone de relaxation pour vos pauses et échanges informels.' },
//   { icon: Clock, title: 'Horaires Flexibles', description: 'Accès durant les heures de bureau avec options d’extension.' },
//   { icon: Shield, title: 'Espace Sécurisé', description: 'Accès contrôlé et surveillance pour votre tranquillité d’esprit.' },
// ]

// const workspaceImages = [
//   { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', alt: 'Espace de travail ouvert' },
//   { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80', alt: 'Salle de réunion' },
//   { src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80', alt: 'Bureau privé' },
//   { src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80', alt: 'Zone lounge' },
// ]

// export default function CoworkingPage() {
//   return (
//     <div className="pt-16 lg:pt-20">
//       {/* Hero Section - Espacement réduit sur desktop (py-12 lg:py-20) */}
//       <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//               style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//               Espace Coworking
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//               Votre espace de <span style={{ color: 'var(--primary)' }}>coworking</span> premium
//             </h1>
//             <p className="mt-6 text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
//               Un espace de travail moderne et professionnel au cœur de Bonapriso. Tout ce dont vous avez besoin pour travailler efficacement et faire progresser votre entreprise.
//             </p>
//             <div className="mt-8">
//               <a href="https://wa.me/237678111022?text=Bonjour, je souhaite réserver un espace coworking"
//                 target="_blank" rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
//                 style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//                 Réserver mon espace <ArrowRight className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Photos Section */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: 'var(--foreground)' }}>Notre Espace</h2>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//             {workspaceImages.map((image, index) => (
//               <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
//                 <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
//                   style={{ background: 'linear-gradient(to top, color-mix(in oklch, var(--background) 80%, transparent), transparent)' }}>
//                   <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{image.alt}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Équipements Section */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Tout ce qu'il vous faut</h2>
//             <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>Des équipements premium pour une expérience de travail productive</p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {features.map((feature) => (
//               <div key={feature.title} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                   <feature.icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
//                 </div>
//                 <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{feature.title}</h3>
//                 <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Section Location (Événements/Formations) - Tirée de l'image */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
//             <Calendar className="h-12 w-12 mx-auto mb-6" style={{ color: 'var(--primary)' }} />
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Louez notre espace pour vos événements</h2>
//             <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>Vous souhaitez organiser une formation ou un événement ?</p>
//             <div className="mt-4 inline-block px-4 py-2 rounded-full font-semibold" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//               Disponibilité : 18h30 – 22h30
//             </div>
//             <div className="mt-8">
//               <a href="https://wa.me/237678111022?text=Bonjour, je souhaite louer l'espace pour organiser une formation/événement"
//                 target="_blank" rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
//                 style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//                 Contacter via WhatsApp <ArrowRight className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


import { useTranslation } from 'react-i18next'
import { Wifi, Users, Monitor, Coffee, Clock, Shield, ArrowRight, Calendar } from 'lucide-react'
import { useContent, useSettings } from '../hooks/useContet'

const iconMap = {
  'WiFi Haut Débit': Wifi,
  'High Speed WiFi': Wifi,
  'Salles de Réunion': Users,
  'Meeting Rooms': Users,
  'Équipements Modernes': Monitor,
  'Modern Equipment': Monitor,
  'Espace Détente': Coffee,
  'Break Area': Coffee,
  'Horaires Flexibles': Clock,
  'Flexible Hours': Clock,
  'Espace Sécurisé': Shield,
  'Secure Space': Shield,
}

// Images locales
const workspaceImages = [
  { src: '/maletravail.jpeg', alt: 'Espace de travail ouvert' },
  { src: '/malesalon.jpeg', alt: 'Salle de réunion' },
  { src: '/maleSalonthe.jpeg', alt: 'Bureau privé' },
  { src: '/maleannonce.jpeg', alt: 'Zone lounge' },
]

export default function CoworkingPage() {
  const { t } = useTranslation()
  const { get } = useContent('coworking')
  const { setting } = useSettings()

  const waLocation = setting('whatsapp_reservations', setting('whatsapp_general', '237678111022'))
  const rentalHours = get('rental_hours', '18h30 – 22h30')

  const features = t('coworking.features.items', { returnObjects: true })

  // Chemin de base pour les images
  const basePath = process.env.PUBLIC_URL || ''

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
              style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
            >
              {t('coworking.hero.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              {get('hero_title', (
                <>
                  {t('coworking.hero.title_prefix')}{' '}
                  <span style={{ color: 'var(--primary)' }}>{t('coworking.hero.title_highlight')}</span>{' '}
                  {t('coworking.hero.title_suffix')}
                </>
              ))}
            </h1>
            <p className="mt-6 text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              {get('description', t('coworking.hero.description'))}
            </p>
            <div className="mt-8">
              <a
                href={`https://wa.me/${waLocation}?text=Bonjour, je souhaite réserver un espace coworking`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                {t('coworking.cta_button')} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: 'var(--foreground)' }}>
            {t('coworking.gallery.title')}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {workspaceImages.map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                <img
                  src={`${basePath}${img.src}`}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/600x450?text=Malea+Hub'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipements */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
              {t('coworking.features.title')}
            </h2>
            <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>
              {t('coworking.features.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = iconMap[feature.title] || Wifi
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl border"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                    <Icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{feature.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border"
            style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
            <Calendar className="h-12 w-12 mx-auto mb-6" style={{ color: 'var(--primary)' }} />
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
              {t('coworking.rental.title')}
            </h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>
              {t('coworking.rental.description')}
            </p>
            <div className="mt-4 inline-block px-4 py-2 rounded-full font-semibold"
              style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
              {t('coworking.rental.availability_label')} : {rentalHours}
            </div>
            <div className="mt-8">
              <a
                href={`https://wa.me/${waLocation}?text=Bonjour, je souhaite louer l'espace pour organiser une formation/événement`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                {t('coworking.rental.button')} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}