

// import { useTranslation } from 'react-i18next'
// import { Coffee, Users, Wifi, Music, ArrowRight, Utensils } from 'lucide-react'

// const loungeImages = [
//   { src: 'malesalon.jpeg', alt: 'Espace salon' },
//   { src: 'maleSalonthe.jpeg', alt: 'Coin café' },
 
//   { src: 'maletravail.jpeg', alt: 'Assises confortables' },
// ]

// export default function LoungePage() {
//   const { t } = useTranslation()

//   const features = t('lounge.features', { returnObjects: true })
//   const menuItems = t('lounge.menu.items', { returnObjects: true })
//   const usageItems = t('lounge.usage.items', { returnObjects: true })

//   return (
//     <div className="pt-16 lg:pt-20">
//       {/* Hero Section */}
//       <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//               style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//               {t('lounge.hero.badge')}
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//               {t('lounge.hero.title_prefix')}{' '}
//               <span style={{ color: 'var(--primary)' }}>{t('lounge.hero.title_highlight')}</span>
//             </h1>
//             <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//               {t('lounge.hero.description')}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Galerie Photos Organisée */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div className="relative aspect-[4/3] lg:col-span-2 rounded-2xl overflow-hidden group">
//               <img src={loungeImages[0].src} alt={loungeImages[0].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
//               <div className="absolute inset-0 flex items-end p-6" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
//                 <span className="text-white font-medium">{t('lounge.gallery.main_label')}</span>
//               </div>
//             </div>
//             <div className="grid grid-rows-2 gap-4">
//               {loungeImages.slice(1, 3).map((image, index) => (
//                 <div key={index} className="relative rounded-2xl overflow-hidden group">
//                   <img src={image.src}  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section Menu / Cafétéria */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="flex flex-col lg:flex-row gap-12 items-center">
//             <div className="lg:w-1/2">
//               <Utensils className="h-10 w-10 mb-6" style={{ color: 'var(--primary)' }} />
//               <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>{t('lounge.menu.title')}</h2>
//               <p className="text-lg mb-6" style={{ color: 'var(--muted-foreground)' }}>
//                 {t('lounge.menu.description')}
//               </p>
//               <ul className="space-y-3 mb-8">
//                 {menuItems.map((item) => (
//                   <li key={item} className="flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
//                     <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//               <button className="px-6 py-3 rounded-lg font-semibold border transition-all hover:bg-primary hover:text-white"
//                 style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
//                 {t('lounge.menu.button')}
//               </button>
//             </div>
//             <div className="lg:w-1/2 grid grid-cols-2 gap-4">
//               <img src="maleSalonthe.jpeg" className="rounded-xl shadow-lg" alt="Café" />
//               <img src="https://images.unsplash.com/photo-1559925393-8be0ec418dc9?w=400&q=80" className="rounded-xl shadow-lg mt-8" alt="Lounge food" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Fonctionnement & Usage */}
//       <section className="py-12 lg:py-20" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: 'var(--foreground)' }}>
//             {t('lounge.usage.title')}
//           </h2>
//           <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//             {usageItems.map((item) => {
//               const IconMap = {
//                 'Événements Networking': Users,
//                 'Networking Events': Users,
//                 'Break Productif': Coffee,
//                 'Productive Break': Coffee,
//                 'Réunions Informelles': Users,
//                 'Informal Meetings': Users,
//               }
//               const Icon = IconMap[item.title] || Users
//               return (
//                 <div key={item.title} className="p-8 rounded-2xl border text-center transition-all hover:shadow-md" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                   <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                     <Icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
//                   </div>
//                   <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
//                   <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{item.description}</p>
//                 </div>
//               )
//             })}
//           </div>
//           <div className="text-center mt-12">
//             <a href="https://wa.me/237678111022?text=Bonjour, je souhaite visiter l'espace Lounge"
//               target="_blank" rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-transform hover:scale-105"
//               style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//               {t('lounge.usage.cta_button')} <ArrowRight className="h-5 w-5" />
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


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