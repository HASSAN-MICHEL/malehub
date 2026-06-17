

// import React, { useState, useEffect } from 'react';
// import { Coffee, Users, ArrowRight, Wifi, Zap, Shield, Music, Wind, Tv, Smile, Plus, X } from 'lucide-react';
// import { useContent, useSettings } from '../hooks/usecontet';

// const iconMap = {
//   'Événements Networking': Users,
//   'Networking Events': Users,
//   'Break Productif': Coffee,
//   'Productive Break': Coffee,
//   'Réunions Informelles': Users,
//   'Informal Meetings': Users,
//   'Détente': Smile,
//   'Relaxation': Smile,
//   'Café': Coffee,
//   'Coffee': Coffee,
//   'WiFi': Wifi,
//   'Climatisation': Wind,
//   'Air Conditioning': Wind,
//   'Musique': Music,
//   'Music': Music,
//   'TV': Tv,
//   'Sécurité': Shield,
//   'Security': Shield,
// };

// export default function LoungePage() {
//   // Récupération des blocs dynamiques pour la page 'lounge'
//   const { get, getMedia, getText, getJSON, getTheme } = useContent('lounge');
//   const { setting } = useSettings();
//   const theme = getTheme();

//   // Hero section
//   const heroBadge = get('hero_badge', 'Espace Premium');
//   const heroTitlePrefix = get('hero_title_prefix', "L'espace");
//   const heroTitleHighlight = get('hero_title_highlight', 'Lounge');
//   const heroTitleSuffix = get('hero_title_suffix', 'de Malea Hub');
//   const heroDescription = get('hero_description', getText('description', 'Un espace premium conçu pour la détente et les échanges professionnels'));
//   const heroImageUrl = getMedia('hero_image');

//   // Gallery section - Support d'images illimitées via JSON
//   const galleryTitle = get('gallery_title', 'Notre espace Lounge');
//   const galleryImages = getJSON('gallery_images', [
//     { src: '/malesalon.jpeg', alt: 'Espace salon' },
//     { src: '/maleSalonthe.jpeg', alt: 'Coin café' },
//     { src: '/maleblan.jpeg', alt: 'Espace détente' },
//     { src: '/malenoir.jpeg', alt: 'Coin lecture' },
//   ]);

//   // Usage section
//   const usageTitle = get('usage_title', 'Utilisations du Lounge');
//   const usageItems = getJSON('usage_items', [
//     { title: 'Événements Networking', description: 'Organisez des rencontres professionnelles dans un cadre convivial' },
//     { title: 'Break Productif', description: 'Faites une pause et revenez plus productif' },
//     { title: 'Réunions Informelles', description: 'Des espaces adaptés pour des échanges décontractés' },
//   ]);
//   const usageCtaButton = get('usage_cta_button', 'Visiter le Lounge');
//   const usageCtaMessage = get('usage_cta_message', 'Bonjour, je souhaite visiter l\'espace Lounge');

//   // Features section (optionnelle)
//   const featuresTitle = get('features_title', '');
//   const featuresItems = getJSON('features_items', []);

//   // WhatsApp number
//   const waGeneral = setting('whatsapp_general', '237678111022');

//   // Helper pour générer une URL complète
//   const getFullImageUrl = (url) => {
//     if (!url) return null;
//     if (url.startsWith('http')) return url;
//     const baseUrl = import.meta.env.VITE_API_URL || 'https://maleahub.vercel.app';
//     return `${baseUrl}${url}`;
//   };

//   // Helper pour l'image hero
//   const heroImage = getFullImageUrl(heroImageUrl) || '/malesalon.jpeg';

//   // Styles avec le thème personnalisé
//   const styles = {
//     backgroundColor: theme?.backgroundColor || 'var(--background)',
//     color: theme?.foregroundColor || 'var(--foreground)',
//     fontFamily: theme?.fontBody || 'Inter',
//   };

//   return (
//     <div className="pt-16 lg:pt-20" style={styles}>
//       {/* Hero Section */}
//       <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 5%, transparent), transparent)` }} />
        
//         {heroImageUrl && (
//           <div className="absolute inset-0 opacity-20 z-0">
//             <img src={heroImage} alt="" className="w-full h-full object-cover" />
//           </div>
//         )}
        
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="max-w-3xl">
//             <div
//               className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg md:text-xl font-medium mb-6"
//               style={{
//                 borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`,
//                 backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`,
//                 color: theme?.primaryColor || 'var(--primary)',
//               }}
//             >
//               {heroBadge}
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
//               {heroTitlePrefix}{' '}
//               <span style={{ color: theme?.primaryColor || 'var(--primary)' }}>{heroTitleHighlight}</span>{' '}
//               {heroTitleSuffix}
//             </h1>
//             <p className="mt-6 text-lg leading-relaxed" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
//               {heroDescription}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Galerie Photos - Support d'images illimitées */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
//             {galleryTitle}
//           </h2>
          
//           {/* Grille responsive qui s'adapte au nombre d'images */}
//           <div className={`grid gap-6 max-w-6xl mx-auto ${
//             galleryImages.length === 1 ? 'grid-cols-1' :
//             galleryImages.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
//             'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
//           }`}>
//             {galleryImages.map((image, index) => (
//               <div key={index} className="relative rounded-2xl overflow-hidden group aspect-[4/3]">
//                 <img 
//                   src={getFullImageUrl(image.src) || image.src} 
//                   alt={image.alt || `Image ${index + 1}`} 
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                   onError={(e) => {
//                     e.currentTarget.src = '/malesalon.jpeg';
//                   }}
//                 />
//                 <div className="absolute inset-0 flex items-end p-6" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}>
//                   <span className="text-white font-medium text-lg">{image.alt || `Espace ${index + 1}`}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {/* Message si aucune image */}
//           {galleryImages.length === 0 && (
//             <div className="text-center py-12">
//               <p style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
//                 Aucune image disponible. Ajoutez des images dans la galerie via le CMS.
//               </p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Équipements & Services (optionnel) */}
//       {featuresItems.length > 0 && featuresTitle && (
//         <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
//           <div className="container mx-auto px-4 lg:px-8">
//             <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
//               {featuresTitle}
//             </h2>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
//               {featuresItems.map((item, index) => {
//                 const Icon = iconMap[item.title] || Coffee;
//                 return (
//                   <div key={item.title || index} className="flex items-start gap-4 p-6 rounded-xl border"
//                     style={{ backgroundColor: theme?.backgroundColor || 'var(--background)', borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)` }}>
//                     <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
//                       style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
//                       <Icon className="h-6 w-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{item.title}</h3>
//                       <p className="text-sm mt-1" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{item.description}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Fonctionnement & Usage */}
//       <section className="py-12 lg:py-20" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
//             {usageTitle}
//           </h2>
//           <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//             {usageItems.map((item, index) => {
//               const Icon = iconMap[item.title] || Users;
//               return (
//                 <div key={item.title || index} className="p-8 rounded-2xl border text-center transition-all hover:shadow-md" 
//                   style={{ backgroundColor: theme?.backgroundColor || 'var(--background)', borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)` }}>
//                   <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" 
//                     style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
//                     <Icon className="h-6 w-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
//                   </div>
//                   <h3 className="font-semibold mb-2" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{item.title}</h3>
//                   <p className="text-sm leading-relaxed" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{item.description}</p>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="text-center mt-12">
//             <a
//               href={`https://wa.me/${waGeneral}?text=${encodeURIComponent(usageCtaMessage)}`}
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-transform hover:scale-105"
//               style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
//             >
//               {usageCtaButton} <ArrowRight className="h-5 w-5" />
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }










import React from 'react';
import { Coffee, Users, ArrowRight, Wifi, Zap, Shield, Music, Wind, Tv, Smile } from 'lucide-react';
import { useContent, useSettings } from '../hooks/usecontet';

const iconMap = {
  'Événements Networking': Users,
  'Networking Events': Users,
  'Break Productif': Coffee,
  'Productive Break': Coffee,
  'Réunions Informelles': Users,
  'Informal Meetings': Users,
  'Détente': Smile,
  'Relaxation': Smile,
  'Café': Coffee,
  'Coffee': Coffee,
  'WiFi': Wifi,
  'Climatisation': Wind,
  'Air Conditioning': Wind,
  'Musique': Music,
  'Music': Music,
  'TV': Tv,
  'Sécurité': Shield,
  'Security': Shield,
};

export default function LoungePage() {
  // Récupération des blocs dynamiques pour la page 'lounge'
  const { get, getMedia, getText, getJSON, getTheme } = useContent('lounge');
  const { setting } = useSettings();
  const theme = getTheme();

  // Hero section
  const heroBadge = get('hero_badge', 'Espace Premium');
  const heroTitlePrefix = get('hero_title_prefix', "L'espace");
  const heroTitleHighlight = get('hero_title_highlight', 'Lounge');
  const heroTitleSuffix = get('hero_title_suffix', 'de Malea Hub');
  const heroDescription = get('hero_description', getText('description', 'Un espace premium conçu pour la détente et les échanges professionnels'));
  const heroImageUrl = getMedia('hero_image');

  // Gallery section
  const galleryTitle = get('gallery_title', 'Notre espace Lounge');
  const galleryImages = getJSON('gallery_images', [
    { src: '/malesalon.jpeg', alt: 'Espace salon' },
    { src: '/maleSalonthe.jpeg', alt: 'Coin café' },
    { src: '/maleblan.jpeg', alt: 'Espace détente' },
    { src: '/malenoir.jpeg', alt: 'Coin lecture' },
  ]);

  // Usage section
  const usageTitle = get('usage_title', 'Utilisations du Lounge');
  const usageItems = getJSON('usage_items', [
    { title: 'Événements Networking', description: 'Organisez des rencontres professionnelles dans un cadre convivial' },
    { title: 'Break Productif', description: 'Faites une pause et revenez plus productif' },
    { title: 'Réunions Informelles', description: 'Des espaces adaptés pour des échanges décontractés' },
  ]);
  const usageCtaButton = get('usage_cta_button', 'Visiter le Lounge');
  const usageCtaMessage = get('usage_cta_message', 'Bonjour, je souhaite visiter l\'espace Lounge');

  // Features section (optionnelle)
  const featuresTitle = get('features_title', 'Équipements & Services');
  const featuresItems = getJSON('features_items', [
    { title: 'WiFi Haut Débit', description: 'Connexion fibre optique ultra-rapide' },
    { title: 'Climatisation', description: 'Espace climatisé pour votre confort' },
    { title: 'Musique d\'ambiance', description: 'Une sélection musicale soignée' },
  ]);

  // WhatsApp number
  const waGeneral = setting('whatsapp_general', '237678111022');

  // Helper pour l'URL complète - CORRIGÉ
  const getFullImageUrl = (url) => {
    if (!url) return null;
    // Si c'est déjà une URL complète, la retourner
    if (url.startsWith('http')) return url;
    // Sinon, retourner l'URL relative telle quelle
    return url;
  };

  // Helper pour l'image hero
  const heroImage = getFullImageUrl(heroImageUrl) || '/malesalon.jpeg';

  // Styles avec le thème personnalisé
  const styles = {
    backgroundColor: theme?.backgroundColor || 'var(--background)',
    color: theme?.foregroundColor || 'var(--foreground)',
    fontFamily: theme?.fontBody || 'Inter',
  };

  return (
    <div className="pt-16 lg:pt-20" style={styles}>
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 5%, transparent), transparent)` }} />
        
        {heroImageUrl && (
          <div className="absolute inset-0 opacity-20 z-0">
            <img src={heroImage} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
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
          </div>
        </div>
      </section>

      {/* Galerie Photos */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
            {galleryTitle}
          </h2>
          
          <div className={`grid gap-6 max-w-6xl mx-auto ${
            galleryImages.length === 1 ? 'grid-cols-1' :
            galleryImages.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
            galleryImages.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
            galleryImages.length >= 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {galleryImages.map((image, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden group aspect-[4/3]">
                <img 
                  src={getFullImageUrl(image.src) || image.src} 
                  alt={image.alt || `Image ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/malesalon.jpeg';
                  }}
                />
                <div className="absolute inset-0 flex items-end p-4 md:p-6" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}>
                  <span className="text-white font-medium text-sm md:text-lg">{image.alt || `Espace ${index + 1}`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipements & Services */}
      {featuresItems.length > 0 && featuresTitle && (
        <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {featuresTitle}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {featuresItems.map((item, index) => {
                const Icon = iconMap[item.title] || Coffee;
                return (
                  <div key={item.title || index} className="flex items-start gap-4 p-6 rounded-xl border"
                    style={{ backgroundColor: theme?.backgroundColor || 'var(--background)', borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)` }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
                      <Icon className="h-6 w-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{item.title}</h3>
                      <p className="text-sm mt-1" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Fonctionnement & Usage */}
      <section className="py-12 lg:py-20" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
            {usageTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {usageItems.map((item, index) => {
              const Icon = iconMap[item.title] || Users;
              return (
                <div key={item.title || index} className="p-8 rounded-2xl border text-center transition-all hover:shadow-md" 
                  style={{ backgroundColor: theme?.backgroundColor || 'var(--background)', borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)` }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" 
                    style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
                    <Icon className="h-6 w-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{item.description}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <a
              href={`https://wa.me/${waGeneral}?text=${encodeURIComponent(usageCtaMessage)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
            >
              {usageCtaButton} <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}