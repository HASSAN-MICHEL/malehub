


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
//           {/* Badge "Nos avantages" - plus grand, texte noir */}
//           <div
//             className="inline-flex items-center gap-3 px-6 py-3 rounded-full border text-lg md:text-xl font-medium mb-6"
//             style={{ 
              
//               color: '#000000' ,  backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' ,
//             }}
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
//                 <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{feature.title}</h3>
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
import { MapPin, Wifi, Zap, Shield, Users, Building } from 'lucide-react';
import { useContent } from '../../hooks/usecontet';

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
  const { get, getText } = useContent('home');

  // Récupération des textes depuis le ContentManager avec fallbacks vers les traductions
  const badgeText = get('why_choose_badge', t('whyChoose.badge'));
  const titlePrefix = get('why_choose_title_prefix', t('whyChoose.title_prefix'));
  const titleHighlight = get('why_choose_title_highlight', t('whyChoose.title_highlight'));
  const subtitle = get('why_choose_subtitle', t('whyChoose.subtitle'));

  // Récupération des features depuis les traductions (inchangé car structure complexe)
  const features = t('whyChoose.features', { returnObjects: true });
  const featuresArray = Array.isArray(features) ? features : [];

  // Features par défaut si aucun dans les traductions
  const defaultFeatures = [
    { title: 'Cadre professionnel moderne', description: 'Un espace de travail à la pointe de la technologie, conçu pour la productivité et le confort.' },
    { title: 'Emplacement stratégique', description: 'Situé à Bonapriso, au cœur battant des affaires à Douala.' },
    { title: 'Réseau solide', description: 'Connectez-vous avec des entrepreneurs, des investisseurs et des experts.' },
    { title: 'WiFi haut débit illimité', description: 'Une connexion par fibre optique pour une expérience de travail sans interruption.' },
    { title: 'Groupe électrogène', description: 'Une alimentation électrique continue pour garantir votre productivité en tout temps.' },
    { title: 'Espace sécurisé', description: 'Sécurité 24h/24 et accès contrôlé pour une totale tranquillité d\'esprit.' },
  ];

  const finalFeatures = featuresArray.length > 0 ? featuresArray : defaultFeatures;

  return (
    <section className="py-20 lg:py-32" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Badge - dynamique depuis CMS */}
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border text-lg md:text-xl font-medium mb-6"
            style={{ 
              backgroundColor: 'var(--primary)', 
              color: 'var(--primary-foreground)',
            }}
          >
            {badgeText}
          </div>
          
          {/* Titre - dynamique depuis CMS */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
            {titlePrefix}{' '}
            <span style={{ color: 'var(--primary)' }}>{titleHighlight}</span> ?
          </h2>
          
          {/* Sous-titre - dynamique depuis CMS */}
          <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            {subtitle}
          </p>
        </div>

        {/* Liste des avantages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {finalFeatures.map((feature, index) => {
            const Icon = iconMap[feature.title] || Building;
            return (
              <div
                key={feature.title || index}
                className="group p-6 lg:p-8 rounded-2xl border transition-all duration-300"
                style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--primary) 30%, transparent)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--border) 50%, transparent)')}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors" 
                  style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}
                >
                  <Icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{feature.title}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}