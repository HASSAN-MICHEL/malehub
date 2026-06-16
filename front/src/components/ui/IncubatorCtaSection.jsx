
// // import { ArrowRight, Rocket, Users, TrendingUp, Lightbulb } from 'lucide-react'

// // const benefits = [
// //   { 
// //     icon: Lightbulb, 
// //     title: 'Structurez votre projet', 
// //     description: 'Définissez votre modèle d’affaires et votre stratégie de croissance.' 
// //   },
// //   { 
// //     icon: Users, 
// //     title: 'Accès au mentorat', 
// //     description: 'Apprenez aux côtés d’entrepreneurs expérimentés.' 
// //   },
// //   { 
// //     icon: TrendingUp, 
// //     title: 'Connexion investisseurs', 
// //     description: 'Présentez votre projet à notre réseau d’investisseurs.' 
// //   },
// // ]

// // export function IncubatorCtaSection() {
// //   return (
// //     <section className="py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
// //       <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(to right, transparent, color-mix(in oklch, var(--primary) 30%, transparent), transparent)' }} />
// //       <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(to right, transparent, color-mix(in oklch, var(--primary) 30%, transparent), transparent)' }} />
// //       <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 5%, transparent)' }} />

// //       <div className="container mx-auto px-4 lg:px-8 relative z-10">
// //         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
// //           <div>
// //             <div
// //               className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
// //               style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
// //             >
// //               Programme Phare
// //             </div>
// //             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
// //               Rejoignez un <span style={{ color: 'var(--primary)' }}>programme d'accompagnement</span>
// //             </h2>
// //             <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
// //               Dédié aux porteurs de projets innovants.
// //             </p>
// //             <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
// //               Malea Hub vous accompagne dans la structuration, le développement et le lancement de votre projet.
// //             </p>

// //             <div className="mt-10 grid gap-6">
// //               {benefits.map((benefit) => (
// //                 <div key={benefit.title} className="flex items-start gap-4">
// //                   <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
// //                     <benefit.icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
// //                   </div>
// //                   <div>
// //                     <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{benefit.title}</h3>
// //                     <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>{benefit.description}</p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //             <div className="mt-10">
// //               <a
// //                 href="https://wa.me/237678111022?text=Bonjour, je souhaite postuler à l'incubateur Malea Hub"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold transition-all hover:opacity-90 hover:translate-x-1"
// //                 style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
// //               >
// //                 Rejoindre l'incubateur <ArrowRight className="h-5 w-5" />
// //               </a>
// //             </div>
// //           </div>

// //           <div className="relative">
// //             <div className="rounded-2xl p-8 lg:p-10 relative overflow-hidden border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }}>
// //               <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-2xl" style={{ borderColor: 'color-mix(in oklch, var(--primary) 40%, transparent)' }} />
// //               <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 rounded-br-2xl" style={{ borderColor: 'color-mix(in oklch, var(--primary) 40%, transparent)' }} />
// //               <div className="text-center">
// //                 <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
// //                   <Rocket className="h-10 w-10" style={{ color: 'var(--primary)' }} />
// //                 </div>
// //                 <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Incubateur Malea Hub</h3>
// //                 <p className="leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
// //                   Pour tout accompagnement sur vos projets innovants.
// //                 </p>
// //                 <div className="grid grid-cols-2 gap-4 text-left">
// //                   {[
// //                     { value: '3', label: 'mois de programme' },
// //                     { value: '10+', label: 'mentors experts' },
// //                     { value: '5', label: 'startups / cohorte' },
// //                     { value: 'Demo', label: 'Day investisseurs' },
// //                   ].map((item) => (
// //                     <div key={item.label} className="rounded-lg p-4 border" style={{ backgroundColor: 'color-mix(in oklch, var(--background) 50%, transparent)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
// //                       <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{item.value}</div>
// //                       <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{item.label}</div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="absolute -bottom-4 -right-4 w-24 h-24 border rounded-2xl -z-10" style={{ borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }} />
// //             <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl -z-10" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }} />
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }



// import { useTranslation } from 'react-i18next';
// import { ArrowRight, Rocket, Users, TrendingUp, Lightbulb } from 'lucide-react'

// export function IncubatorCtaSection() {
//   const { t } = useTranslation();

//   const benefits = t('incubatorCta.benefits', { returnObjects: true });
//   const stats = t('incubatorCta.stats', { returnObjects: true });

//   const benefitIcons = [Lightbulb, Users, TrendingUp];

//   // Vérification que benefits et stats sont des tableaux
//   const benefitsArray = Array.isArray(benefits) ? benefits : [];
//   const statsArray = Array.isArray(stats) ? stats : [];

//   return (
//     <section className="py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
//       <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(to right, transparent, color-mix(in oklch, var(--primary) 30%, transparent), transparent)' }} />
//       <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(to right, transparent, color-mix(in oklch, var(--primary) 30%, transparent), transparent)' }} />
//       <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 5%, transparent)' }} />

//       <div className="container mx-auto px-4 lg:px-8 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           <div>
//             {/* Badge "MALEA LAB" - fond var(--primary), texte noir, plus grand */}
//             <div
//               className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg md:text-xl font-medium mb-6"
//               style={{ 
//                 backgroundColor: 'var(--primary)',
//                 color: '#000000'
//               }}
//             >
//               {t('incubatorCta.badge')}
//             </div>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//               {t('incubatorCta.title_prefix')}{' '}
//               <span style={{ color: 'var(--primary)' }}>{t('incubatorCta.title_highlight')}</span>
//             </h2>
//             <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//               {t('incubatorCta.subtitle')}
//             </p>
//             <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//               {t('incubatorCta.description')}
//             </p>

//             <div className="mt-10 grid gap-6">
//               {benefitsArray.map((benefit, index) => {
//                 const Icon = benefitIcons[index % benefitIcons.length];
//                 return (
//                   <div key={benefit.title || index} className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                       <Icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{benefit.title}</h3>
//                       <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>{benefit.description}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="mt-10">
//               <a
//                 href="https://wa.me/237678111022?text=Bonjour, je souhaite postuler à l'incubateur Malea Hub"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold transition-all hover:opacity-90 hover:translate-x-1"
//                 style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//               >
//                 {t('incubatorCta.cta_button')} <ArrowRight className="h-5 w-5" />
//               </a>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="rounded-2xl p-8 lg:p-10 relative overflow-hidden border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }}>
//               <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-2xl" style={{ borderColor: 'color-mix(in oklch, var(--primary) 40%, transparent)' }} />
//               <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 rounded-br-2xl" style={{ borderColor: 'color-mix(in oklch, var(--primary) 40%, transparent)' }} />
//               <div className="text-center">
//                 <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                   <Rocket className="h-10 w-10" style={{ color: 'var(--primary)' }} />
//                 </div>
//                 <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>{t('incubatorCta.card_title')}</h3>
//                 <p className="leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
//                   {t('incubatorCta.card_description')}
//                 </p>
//                 <div className="grid grid-cols-2 gap-4 text-left">
//                   {statsArray.map((stat, index) => (
//                     <div key={stat.label || index} className="rounded-lg p-4 border" style={{ backgroundColor: 'color-mix(in oklch, var(--background) 50%, transparent)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                       <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{stat.value}</div>
//                       <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="absolute -bottom-4 -right-4 w-24 h-24 border rounded-2xl -z-10" style={{ borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }} />
//             <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl -z-10" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }} />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }




import { useTranslation } from 'react-i18next';
import { ArrowRight, Rocket, Users, TrendingUp, Lightbulb } from 'lucide-react';
import { useContent } from '../../hooks/usecontet';

export function IncubatorCtaSection() {
  const { t } = useTranslation();
  const { get, getJSON, getTheme } = useContent('home');
  const theme = getTheme();

  // Valeurs du CMS avec fallback vers i18n
  const badge = get('incubator_badge', t('incubatorCta.badge'));
  const titlePrefix = get('incubator_title_prefix', t('incubatorCta.title_prefix'));
  const titleHighlight = get('incubator_title_highlight', t('incubatorCta.title_highlight'));
  const subtitle = get('incubator_subtitle', t('incubatorCta.subtitle'));
  const description = get('incubator_description', t('incubatorCta.description'));
  const ctaButton = get('incubator_cta_button', t('incubatorCta.cta_button'));
  const whatsappLink = get('incubator_whatsapp_link', 'https://wa.me/237678111022?text=Bonjour, je souhaite postuler à l\'incubateur Malea Hub');
  const cardTitle = get('incubator_card_title', t('incubatorCta.card_title'));
  const cardDescription = get('incubator_card_description', t('incubatorCta.card_description'));

  // Récupération des tableaux JSON depuis le CMS avec fallback i18n
  const benefitsFromCMS = getJSON('incubator_benefits', null);
  const statsFromCMS = getJSON('incubator_stats', null);

  // Fallback i18n si CMS est vide
  const i18nBenefits = t('incubatorCta.benefits', { returnObjects: true });
  const i18nStats = t('incubatorCta.stats', { returnObjects: true });

  const benefitsArray = benefitsFromCMS && benefitsFromCMS.length > 0 
    ? benefitsFromCMS 
    : (Array.isArray(i18nBenefits) ? i18nBenefits : []);

  const statsArray = statsFromCMS && statsFromCMS.length > 0 
    ? statsFromCMS 
    : (Array.isArray(i18nStats) ? i18nStats : []);

  const benefitIcons = [Lightbulb, Users, TrendingUp];

  // Styles avec le thème personnalisé
  const styles = {
    backgroundColor: theme?.backgroundColor || 'var(--background)',
    color: theme?.foregroundColor || 'var(--foreground)',
    fontFamily: theme?.fontBody || 'Inter',
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden" style={styles}>
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: `linear-gradient(to right, transparent, color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent), transparent)` }} />
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: `linear-gradient(to right, transparent, color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent), transparent)` }} />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 5%, transparent)` }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg md:text-xl font-medium mb-6"
              style={{ 
                backgroundColor: theme?.primaryColor || 'var(--primary)',
                color: '#000000'
              }}
            >
              {badge}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {titlePrefix}{' '}
              <span style={{ color: theme?.primaryColor || 'var(--primary)' }}>{titleHighlight}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {subtitle}
            </p>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {description}
            </p>

            <div className="mt-10 grid gap-6">
              {benefitsArray.map((benefit, index) => {
                const Icon = benefitIcons[index % benefitIcons.length];
                return (
                  <div key={benefit.title || index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
                      <Icon className="h-6 w-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{benefit.title}</h3>
                      <p className="text-sm mt-1" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold transition-all hover:opacity-90 hover:translate-x-1"
                style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
              >
                {ctaButton} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl p-8 lg:p-10 relative overflow-hidden border" style={{ backgroundColor: theme?.cardColor || 'var(--card)', borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 20%, transparent)` }}>
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-2xl" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 40%, transparent)` }} />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 rounded-br-2xl" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 40%, transparent)` }} />
              <div className="text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
                  <Rocket className="h-10 w-10" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
                  {cardTitle}
                </h3>
                <p className="leading-relaxed mb-8" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                  {cardDescription}
                </p>
                <div className="grid grid-cols-2 gap-4 text-left">
                  {statsArray.map((stat, index) => (
                    <div key={stat.label || index} className="rounded-lg p-4 border" style={{ backgroundColor: `color-mix(in oklch, ${theme?.backgroundColor || 'var(--background)'} 50%, transparent)`, borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)` }}>
                      <div className="text-2xl font-bold" style={{ color: theme?.primaryColor || 'var(--primary)' }}>{stat.value}</div>
                      <div className="text-sm" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border rounded-2xl -z-10" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 20%, transparent)` }} />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl -z-10" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }} />
          </div>
        </div>
      </div>
    </section>
  );
}