


// import { useTranslation } from 'react-i18next';
// import { MapPin, Wifi, Zap, Shield, Users, Building } from 'lucide-react'

// const iconMap = {
//   'Cadre professionnel moderne': Building,
//   'Modern professional environment': Building,
//   'Emplacement stratégique': MapPin,
//   'Strategic location': MapPin,
//   'Réseau solide': Users,
//   'Strong network': Users,
//   'WiFi haut débit illimité': Wifi,
//   'Unlimited high-speed WiFi': Wifi,
//   'Groupe électrogène': Zap,
//   'Power generator': Zap,
//   'Espace sécurisé': Shield,
//   'Secure space': Shield,
// }

// export function WhyChooseSection() {
//   const { t } = useTranslation();

//   const features = t('whyChoose.features', { returnObjects: true });

//   // Vérification que features est un tableau
//   const featuresArray = Array.isArray(features) ? features : [];

//   return (
//     <section className="py-20 lg:py-32" style={{ backgroundColor: 'var(--background)' }}>
//       <div className="container mx-auto px-4 lg:px-8">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <div
//             className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//             style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
//           >
//             {t('whyChoose.badge')}
//           </div>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//             {t('whyChoose.title_prefix')}{' '}
//             <span style={{ color: 'var(--primary)' }}>{t('whyChoose.title_highlight')}</span> ?
//           </h2>
//           <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//             {t('whyChoose.subtitle')}
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//           {featuresArray.map((feature, index) => {
//             const Icon = iconMap[feature.title] || Building;
//             return (
//               <div
//                 key={feature.title || index}
//                 className="group p-6 lg:p-8 rounded-2xl border transition-all duration-300"
//                 style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}
//                 onMouseEnter={e => (e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--primary) 30%, transparent)')}
//                 onMouseLeave={e => (e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--border) 50%, transparent)')}
//               >
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                   <Icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
//                 </div>
//                 <h3 className="text-lg font-semibold mb-2 gap-2  text-base" style={{ color: 'var(--foreground)' }}>{feature.title}</h3>
//                 <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{feature.description}</p>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </section>
//   )
// }
import { useTranslation } from 'react-i18next';
import { MapPin, Wifi, Zap, Shield, Users, Building } from 'lucide-react'

const iconMap = {
  'Cadre professionnel moderne': Building,
  'Modern professional environment': Building,
  'Emplacement stratégique': MapPin,
  'Strategic location': MapPin,
  'Réseau solide': Users,
  'Strong network': Users,
  'WiFi haut débit illimité': Wifi,
  'Unlimited high-speed WiFi': Wifi,
  'Groupe électrogène': Zap,
  'Power generator': Zap,
  'Espace sécurisé': Shield,
  'Secure space': Shield,
}

export function WhyChooseSection() {
  const { t } = useTranslation();

  const features = t('whyChoose.features', { returnObjects: true });

  // Vérification que features est un tableau
  const featuresArray = Array.isArray(features) ? features : [];

  return (
    <section className="py-20 lg:py-32" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
            style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
          >
            {t('whyChoose.badge')}
          </div>
          {/* Titre avec la même taille que "Rejoindre l'incubateur" - text-4xl md:text-5xl */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
            {t('whyChoose.title_prefix')}{' '}
            <span style={{ color: 'var(--primary)' }}>{t('whyChoose.title_highlight')}</span> ?
          </h2>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            {t('whyChoose.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuresArray.map((feature, index) => {
            const Icon = iconMap[feature.title] || Building;
            return (
              <div
                key={feature.title || index}
                className="group p-6 lg:p-8 rounded-2xl border transition-all duration-300"
                style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--primary) 30%, transparent)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--border) 50%, transparent)')}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                  <Icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{feature.title}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}