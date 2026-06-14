
// import { useTranslation } from 'react-i18next'
// import { Wifi, Users, Monitor, Coffee, Clock, Shield, ArrowRight, Calendar } from 'lucide-react'
// import { useContent, useSettings } from '../hooks/usecontet' 

// const iconMap = {
//   'WiFi Haut Débit': Wifi,
//   'High Speed WiFi': Wifi,
//   'Salles de Réunion': Users,
//   'Meeting Rooms': Users,
//   'Équipements Modernes': Monitor,
//   'Modern Equipment': Monitor,
//   'Espace Détente': Coffee,
//   'Break Area': Coffee,
//   'Horaires Flexibles': Clock,
//   'Flexible Hours': Clock,
//   'Espace Sécurisé': Shield,
//   'Secure Space': Shield,
// }

// export default function CoworkingPage() {
//   const { t } = useTranslation()
//   // Récupère les blocs dynamiques pour la page 'coworking'
//   const { get, getMedia, getText } = useContent('coworking')
//   const { setting } = useSettings()

//   // -- Valeurs provenant du ContentManager / Settings --
//   const waLocation = setting('whatsapp_reservations', setting('whatsapp_general', '237678111022'))
//   const rentalHours = getText('rental_hours', '18h30 – 22h30') // getText pour le texte simple

//   // Récupération des URLs des images depuis le backend
//   const heroImageUrl = getMedia('hero_image', '/malesalon.jpeg')
//   const galleryImage1 = getMedia('gallery_1', '/maletravail.jpeg')
//   const galleryImage2 = getMedia('gallery_2', '/malesalon.jpeg')
//   const galleryImage3 = getMedia('gallery_3', '/maleSalonthe.jpeg')
  
//   // Construction du tableau d'images pour la galerie avec les URLs dynamiques
//   const workspaceImages = [
//     { src: galleryImage1, alt: t('coworking.gallery.image1_alt', 'Espace de travail ouvert') },
//     { src: galleryImage2, alt: t('coworking.gallery.image2_alt', 'Salle de réunion') },
//     { src: galleryImage3, alt: t('coworking.gallery.image3_alt', 'Bureau privé') },
    
//   ].filter(img => img.src); // Filtre les images qui n'ont pas d'URL (optionnel)

//   // Fallback pour les images de traduction (si les clés n'existent pas)
//   const features = t('coworking.features.items', { returnObjects: true })

//   // Helper pour générer une URL complète si nécessaire (si votre backend retourne des chemins relatifs)
//   const getFullImageUrl = (url) => {
//     if (!url) return null;
//     if (url.startsWith('http')) return url;
    
//     return url; // Suppose que l'URL est déjà complète ou relative et gérée par le dev server
//   };

//   return (
//     <div className="pt-16 lg:pt-20">
//       {/* Hero avec image dynamique */}
//       <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        
//         {/* Affichage de l'image de fond Hero si elle existe */}
//         {heroImageUrl && (
//           <div className="absolute inset-0 opacity-20 z-0">
//             <img src={getFullImageUrl(heroImageUrl)} alt="" className="w-full h-full object-cover" />
//           </div>
//         )}

//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Colonne gauche - Texte (inchangé) */}
//             <div>
//               <div
//                 className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg md:text-xl font-medium mb-6"
//                 style={{
//                   borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)',
//                   backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)',
//                   color: 'var(--primary)',
//                 }}
//               >
//                 {t('coworking.hero.badge')}
//               </div>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//                 {get('hero_title', (
//                   <>
//                     {t('coworking.hero.title_prefix')}{' '}
//                     <span style={{ color: 'var(--primary)' }}>{t('coworking.hero.title_highlight')}</span>{' '}
//                     {t('coworking.hero.title_suffix')}
//                   </>
//                 ))}
//               </h1>
//               <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//                 {get('description', t('coworking.hero.description'))}
//               </p>
//               <div className="mt-8">
//                 <a
//                   href={`https://wa.me/${waLocation}?text=${encodeURIComponent(t('coworking.cta_message', 'Bonjour, je souhaite réserver un espace coworking'))}`}
//                   target="_blank" rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
//                   style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//                 >
//                   {t('coworking.cta_button')} <ArrowRight className="h-5 w-5" />
//                 </a>
//               </div>
//             </div>

//             {/* Colonne droite - Image Hero dynamique */}
//             <div className="relative order-2 lg:order-2">
//               <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
//                 <img
//                   src={getFullImageUrl(heroImageUrl)}
//                   alt="Espace coworking Malea Hub"
//                   className="w-full h-full object-cover"
//                   onError={(e) => { e.currentTarget.src = '/malesalon.jpeg' }} // Fallback local
//                 />
//                 <div className="absolute inset-0 rounded-2xl border-2" style={{ borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }} />
//               </div>
//               <div className="absolute -bottom-6 -right-6 w-32 h-32 border rounded-2xl -z-10" style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }} />
//               <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl -z-10" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }} />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Galerie d'images dynamique */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: 'var(--foreground)' }}>
//             {t('coworking.gallery.title')}
//           </h2>
//           <div className="grid grid-cols-2 lg:grid-cols-3 gap-4"> {/* Passage à 3 colonnes pour mieux s'adapter */}
//             {workspaceImages.map((img, index) => (
//               <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
//                 <img
//                   src={getFullImageUrl(img.src)}
//                   alt={img.alt}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                   onError={(e) => {
//                     // Fallback local en cas d'erreur de chargement de l'image dynamique
//                     const fallbacks = ['/maletravail.jpeg', '/malesalon.jpeg', '/maleSalonthe.jpeg'];
//                     e.currentTarget.src = fallbacks[index % fallbacks.length];
//                   }}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Section Équipements (inchangée) */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
//               {t('coworking.features.title')}
//             </h2>
//             <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>
//               {t('coworking.features.subtitle')}
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {features.map((feature) => {
//               const Icon = iconMap[feature.title] || Wifi
//               return (
//                 <div
//                   key={feature.title}
//                   className="p-6 rounded-xl border transition-all hover:shadow-lg"
//                   style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}
//                 >
//                   <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
//                     style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                     <Icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
//                   </div>
//                   <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{feature.title}</h3>
//                   <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{feature.description}</p>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Section Location (inchangée) */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border transition-all hover:shadow-xl"
//             style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
//             <Calendar className="h-12 w-12 mx-auto mb-6" style={{ color: 'var(--primary)' }} />
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
//               {t('coworking.rental.title')}
//             </h2>
//             <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>
//               {t('coworking.rental.description')}
//             </p>
//             <div className="mt-4 inline-block px-4 py-2 rounded-full font-semibold"
//               style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//               {t('coworking.rental.availability_label')} : {rentalHours}
//             </div>
//             <div className="mt-8">
//               <a
//                 href={`https://wa.me/${waLocation}?text=${encodeURIComponent(t('coworking.rental.message', 'Bonjour, je souhaite louer l\'espace pour organiser une formation/événement'))}`}
//                 target="_blank" rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
//                 style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//               >
//                 {t('coworking.rental.button')} <ArrowRight className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }





import React from 'react';
import { Wifi, Users, Monitor, Coffee, Clock, Shield, ArrowRight, Calendar } from 'lucide-react';
import { useContent, useSettings } from '../hooks/usecontet';

const iconMap = {
  'WiFi Haut Débit': Wifi,
  'High Speed WiFi': Wifi,
  'WiFi': Wifi,
  'Salles de Réunion': Users,
  'Meeting Rooms': Users,
  'Réunions': Users,
  'Équipements Modernes': Monitor,
  'Modern Equipment': Monitor,
  'Équipements': Monitor,
  'Espace Détente': Coffee,
  'Break Area': Coffee,
  'Détente': Coffee,
  'Horaires Flexibles': Clock,
  'Flexible Hours': Clock,
  'Horaires': Clock,
  'Espace Sécurisé': Shield,
  'Secure Space': Shield,
  'Sécurité': Shield,
};

export default function CoworkingPage() {
  // Récupère les blocs dynamiques pour la page 'coworking'
  const { get, getMedia, getText, getJSON, getTheme } = useContent('coworking');
  const { setting } = useSettings();
  const theme = getTheme();

  // -- Valeurs provenant du ContentManager / Settings --
  const waLocation = setting('whatsapp_reservations', setting('whatsapp_general', '237678111022'));
  
  // Hero section
  const heroBadge = get('hero_badge', 'Espace de travail');
  const heroTitlePrefix = get('hero_title_prefix', 'Votre');
  const heroTitleHighlight = get('hero_title_highlight', 'espace de coworking');
  const heroTitleSuffix = get('hero_title_suffix', 'premium');
  const heroDescription = get('hero_description', 'Un espace de travail moderne et flexible conçu pour les professionnels');
  const ctaButton = get('cta_button', 'Réserver un espace');
  const ctaMessage = get('cta_message', 'Bonjour, je souhaite réserver un espace coworking');
  
  // Gallery section
  const galleryTitle = get('gallery_title', 'Notre espace de travail');
  const galleryImage1 = getMedia('gallery_1');
  const galleryImage1Alt = get('gallery_1_alt', 'Espace de travail ouvert');
  const galleryImage2 = getMedia('gallery_2');
  const galleryImage2Alt = get('gallery_2_alt', 'Salle de réunion');
  const galleryImage3 = getMedia('gallery_3');
  const galleryImage3Alt = get('gallery_3_alt', 'Bureau privé');
  
  // Features section
  const featuresTitle = get('features_title', 'Équipements & Services');
  const featuresSubtitle = get('features_subtitle', 'Tout ce dont vous avez besoin pour travailler dans les meilleures conditions');
  const features = getJSON('features_items', [
    { title: 'WiFi Haut Débit', description: 'Connexion fibre optique ultra-rapide dans tout l\'espace' },
    { title: 'Salles de Réunion', description: 'Salles équipées pour vos réunions et présentations' },
    { title: 'Équipements Modernes', description: 'Imprimantes, scanners et bureaux ergonomiques' },
    { title: 'Espace Détente', description: 'Café, thé et espace lounge pour vos pauses' },
    { title: 'Horaires Flexibles', description: 'Accès 24/7 pour les abonnés premium' },
    { title: 'Espace Sécurisé', description: 'Surveillance et accès sécurisé 24h/24' },
  ]);
  
  // Rental section
  const rentalTitle = get('rental_title', 'Location soir & événements');
  const rentalDescription = get('rental_description', 'Vous souhaitez organiser une formation, un séminaire ou un événement privé ?');
  const rentalAvailabilityLabel = get('rental_availability_label', 'Disponible de');
  const rentalHours = getText('rental_hours', '18h30 – 22h30');
  const rentalButton = get('rental_button', 'Louer l\'espace');
  const rentalMessage = get('rental_message', 'Bonjour, je souhaite louer l\'espace pour organiser une formation/événement');
  
  // Hero image
  const heroImageUrl = getMedia('hero_image') || '/malesalon.jpeg';
  
  // Construction du tableau d'images pour la galerie
  const workspaceImages = [
    { src: galleryImage1, alt: galleryImage1Alt, fallback: '/maletravail.jpeg' },
    { src: galleryImage2, alt: galleryImage2Alt, fallback: '/malesalon.jpeg' },
    { src: galleryImage3, alt: galleryImage3Alt, fallback: '/maleSalonthe.jpeg' },
  ].filter(img => img.src); // Garde seulement les images qui ont une URL

  // Helper pour générer une URL complète
  const getFullImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const baseUrl = import.meta.env.VITE_API_URL || 'https://maleahub.vercel.app';
    return `${baseUrl}${url}`;
  };

  // Styles avec le thème personnalisé
  const styles = {
    backgroundColor: theme?.backgroundColor || 'var(--background)',
    color: theme?.foregroundColor || 'var(--foreground)',
    fontFamily: theme?.fontBody || 'Inter',
  };

  return (
    <div className="pt-16 lg:pt-20" style={styles}>
      {/* Hero avec image dynamique */}
      <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 5%, transparent), transparent)` }} />
        
        {/* Affichage de l'image de fond Hero si elle existe */}
        {heroImageUrl && (
          <div className="absolute inset-0 opacity-20 z-0">
            <img src={getFullImageUrl(heroImageUrl)} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Colonne gauche - Texte */}
            <div>
              <div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg md:text-xl font-medium mb-6"
                style={{
                  borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`,
                  backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`,
                  color: theme?.primaryColor || 'var(--primary)',
                }}
              >
                {heroBadge}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
                {heroTitlePrefix}{' '}
                <span style={{ color: theme?.primaryColor || 'var(--primary)' }}>{heroTitleHighlight}</span>{' '}
                {heroTitleSuffix}
              </h1>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                {heroDescription}
              </p>
              <div className="mt-8">
                <a
                  href={`https://wa.me/${waLocation}?text=${encodeURIComponent(ctaMessage)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
                >
                  {ctaButton} <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Colonne droite - Image Hero dynamique */}
            <div className="relative order-2 lg:order-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={getFullImageUrl(heroImageUrl)}
                  alt="Espace coworking Malea Hub"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = '/malesalon.jpeg'; }}
                />
                <div className="absolute inset-0 rounded-2xl border-2" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 20%, transparent)` }} />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border rounded-2xl -z-10" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)` }} />
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl -z-10" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Galerie d'images dynamique */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
            {galleryTitle}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {workspaceImages.map((img, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                <img
                  src={getFullImageUrl(img.src)}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = img.fallback;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Équipements */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {featuresTitle}
            </h2>
            <p className="mt-4" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {featuresSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.title] || Wifi;
              return (
                <div
                  key={feature.title || index}
                  className="p-6 rounded-xl border transition-all hover:shadow-lg"
                  style={{ 
                    backgroundColor: theme?.backgroundColor || 'var(--background)', 
                    borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)`
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
                    <Icon className="h-6 w-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{feature.title}</h3>
                  <p className="text-sm" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Location */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border transition-all hover:shadow-xl"
            style={{ 
              backgroundColor: theme?.cardColor || 'var(--card)', 
              borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`
            }}>
            <Calendar className="h-12 w-12 mx-auto mb-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {rentalTitle}
            </h2>
            <p className="mt-4 text-lg" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {rentalDescription}
            </p>
            <div className="mt-4 inline-block px-4 py-2 rounded-full font-semibold"
              style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`, color: theme?.primaryColor || 'var(--primary)' }}>
              {rentalAvailabilityLabel} : {rentalHours}
            </div>
            <div className="mt-8">
              <a
                href={`https://wa.me/${waLocation}?text=${encodeURIComponent(rentalMessage)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
              >
                {rentalButton} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}