// import { BookOpen, ArrowRight } from 'lucide-react'

// export default function LibraryPage() {
//   return (
//     <div className="pt-16 lg:pt-20">
//       <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="max-w-3xl mx-auto text-center">
//             <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//               <BookOpen className="h-10 w-10" style={{ color: 'var(--primary)' }} />
//             </div>
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//               style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//               Bibliothèque Sociale
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//               Social <span style={{ color: 'var(--primary)' }}>Library</span>
//             </h1>
//             <p className="mt-6 text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
//               A curated collection of books, resources, and materials for your personal and professional development journey.
//             </p>
//             <div className="mt-8 p-8 rounded-2xl border" style={{ backgroundColor: 'color-mix(in oklch, var(--background) 50%, transparent)', borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }}>
//               <p className="font-medium mb-4" style={{ color: 'var(--foreground)' }}>Coming Soon</p>
//               <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>Our social library is being prepared. Get notified when it launches.</p>
//               <a href="https://wa.me/237600000000?text=Bonjour, je souhaite être informé du lancement de la bibliothèque sociale"
//                 target="_blank" rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
//                 style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//                 Get notified <ArrowRight className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


import { useTranslation } from 'react-i18next';
import { BookOpen, ArrowRight, Coffee, Users, Briefcase, Image } from 'lucide-react';

export default function LibraryPage() {
  const { t } = useTranslation();

  const galleryImages = [
    { src: '/malesalon.jpeg', alt: 'Espace salon', icon: Coffee, label: 'Espace Salon' },
    { src: '/maleSalonthe.jpeg', alt: 'Coin café', icon: Coffee, label: 'Coin Café' },
    { src: '/maletravail.jpeg', alt: 'Espace travail', icon: Briefcase, label: 'Espace Travail' },
    
    
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
              <BookOpen className="h-10 w-10" style={{ color: 'var(--primary)' }} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
              style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
              {t('library.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              {t('library.title_prefix')}{' '}
              <span style={{ color: 'var(--primary)' }}>{t('library.title_highlight')}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
              {t('library.description')}
            </p>
            <div className="mt-8 p-8 rounded-2xl border" style={{ backgroundColor: 'color-mix(in oklch, var(--background) 50%, transparent)', borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }}>
              <p className="font-medium mb-4" style={{ color: 'var(--foreground)' }}>{t('library.coming_soon')}</p>
              <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>{t('library.notify_text')}</p>
              <a href="https://wa.me/237678111022?text=Bonjour, je souhaite être informé du lancement de la bibliothèque sociale"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                {t('library.notify_button')} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie des espaces Malea Hub */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
              {t('library.gallery_title')}
            </h2>
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              {t('library.gallery_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => {
              const Icon = image.icon;
              return (
                <div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl"
                  style={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--primary) 40%, transparent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--border) 50%, transparent)'}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-end p-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 80%, transparent)' }}>
                        <Icon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-white font-medium text-sm">{image.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section ressources à venir */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl border transition-all hover:shadow-md" style={{ borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                  <BookOpen className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{t('library.resources.books')}</h3>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t('library.resources.books_desc')}</p>
              </div>
              <div className="p-6 rounded-xl border transition-all hover:shadow-md" style={{ borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                  <Users className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{t('library.resources.community')}</h3>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t('library.resources.community_desc')}</p>
              </div>
              <div className="p-6 rounded-xl border transition-all hover:shadow-md" style={{ borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                  <Briefcase className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{t('library.resources.tools')}</h3>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t('library.resources.tools_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}