




// import React from 'react';
// import { ArrowRight, Rocket, Users, TrendingUp, Lightbulb, Target, Award, Zap, Calendar, CheckCircle } from 'lucide-react';
// import { useContent, useSettings } from '../hooks/usecontet';

// const iconMap = {
//   'Accompagnement': Users,
//   'Mentorat': Lightbulb,
//   'Financement': TrendingUp,
//   'Réseau': Users,
//   'Formation': Award,
//   'Visibilité': Target,
//   'Accélération': Zap,
// };

// export default function IncubatorPage() {
//   // Récupère les blocs dynamiques pour la page 'incubator'
//   const { get, getMedia, getText, getJSON, getTheme } = useContent('incubator');
//   const { setting } = useSettings();
//   const theme = getTheme();

//   // -- Valeurs provenant du ContentManager / Settings --
//   const waLocation = setting('whatsapp_investors', setting('whatsapp_general', '237678111022'));

//   // Hero section
//   const heroBadge = get('hero_badge', 'Programme d\'accompagnement');
//   const heroTitlePrefix = get('hero_title_prefix', 'Rejoignez');
//   const heroTitleHighlight = get('hero_title_highlight', 'l\'incubateur');
//   const heroTitleSuffix = get('hero_title_suffix', 'de Malea Hub');
//   const heroDescription = get('hero_description', 'Un programme d\'accompagnement intensif pour transformer votre idée en startup à succès');
//   const ctaButton = get('cta_button', 'Postuler maintenant');
//   const ctaMessage = get('cta_message', 'Bonjour, je souhaite postuler à l\'incubateur');

//   // Program section
//   const programTitle = get('program_title', 'Notre programme d\'accompagnement');
//   const programSubtitle = get('program_subtitle', 'Un parcours sur mesure pour les startups innovantes');
//   const programFeatures = getJSON('program_features', [
//     { title: 'Accompagnement personnalisé', description: 'Mentorat par des experts du secteur' },
//     { title: 'Financement', description: 'Accès à notre réseau d\'investisseurs' },
//     { title: 'Formation continue', description: 'Ateliers et masterclasses mensuels' },
//     { title: 'Visibilité', description: 'Mise en relation avec les médias' },
//   ]);

//   // Benefits section
//   const benefitsTitle = get('benefits_title', 'Pourquoi rejoindre notre incubateur ?');
//   const benefitsSubtitle = get('benefits_subtitle', 'Les clés de votre réussite');
//   const benefits = getJSON('benefits_items', [
//     { title: 'Accès exclusif', description: 'Bénéficiez d\'un accompagnement privilégié' },
//     { title: 'Réseau d\'influence', description: 'Rencontrez des experts et investisseurs' },
//     { title: 'Espaces dédiés', description: 'Coworking et laboratoires à disposition' },
//   ]);

//   // Stats section
//   const statsTitle = get('stats_title', 'Ils nous font confiance');
//   const stats = getJSON('stats_items', [
//     { value: '50+', label: 'Startups accompagnées' },
//     { value: '10M FCFA', label: 'Levés de fonds' },
//     { value: '95%', label: 'Taux de satisfaction' },
//     { value: '30+', label: 'Mentors experts' },
//   ]);

//   // Invest Club section
//   const investClubBadge = get('invest_club_badge', 'Malea Invest Club');
//   const investClubTitlePrefix = get('invest_club_title_prefix', 'Rejoignez le');
//   const investClubTitleHighlight = get('invest_club_title_highlight', 'Malea Invest Club');
//   const investClubDescription = get('invest_club_description', getText('invest_club', 'Devenez investisseur et participez à l\'aventure des startups de demain'));
//   const investClubCta = get('invest_club_cta', 'Devenir investisseur');
//   const investClubMessage = get('invest_club_message', 'Bonjour, je souhaite rejoindre le Malea Invest Club');
//   const investClubImage = getMedia('invest_club_image');

//   // Application section
//   const applicationTitle = get('application_title', 'Prêt à rejoindre l\'aventure ?');
//   const applicationDescription = get('application_description', 'Postulez dès maintenant et faites décoller votre projet');
//   const applicationButton = get('application_button', 'Postuler');
//   const applicationMessage = get('application_message', 'Bonjour, je souhaite postuler à l\'incubateur');

//   // Hero image
//   const heroImageUrl = getMedia('hero_image') || '/maleblan.jpeg';

//   // Helper pour générer une URL complète
//   const getFullImageUrl = (url) => {
//     if (!url) return null;
//     if (url.startsWith('http')) return url;
//     const baseUrl ='/api';
//     return `${baseUrl}${url}`;
//   };

//   // Styles avec le thème personnalisé
//   const styles = {
//     backgroundColor: theme?.backgroundColor || 'var(--background)',
//     color: theme?.foregroundColor || 'var(--foreground)',
//     fontFamily: theme?.fontBody || 'Inter',
//   };

//   return (
//     <div className="pt-16 lg:pt-20" style={styles}>
//       {/* Hero section */}
//       <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 5%, transparent), transparent)` }} />
        
//         {heroImageUrl && (
//           <div className="absolute inset-0 opacity-20 z-0">
//             <img src={getFullImageUrl(heroImageUrl)} alt="" className="w-full h-full object-cover" />
//           </div>
//         )}

//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <div
//                 className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg md:text-xl font-medium mb-6"
//                 style={{
//                   borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`,
//                   backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`,
//                   color: theme?.primaryColor || 'var(--primary)',
//                 }}
//               >
//                 {heroBadge}
//               </div>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
//                 {heroTitlePrefix}{' '}
//                 <span style={{ color: theme?.primaryColor || 'var(--primary)' }}>{heroTitleHighlight}</span>{' '}
//                 {heroTitleSuffix}
//               </h1>
//               <p className="mt-6 text-lg leading-relaxed" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
//                 {heroDescription}
//               </p>
//               <div className="mt-8">
//                 <a
//                   href={`https://wa.me/${waLocation}?text=${encodeURIComponent(ctaMessage)}`}
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
//                   style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
//                 >
//                   {ctaButton} <ArrowRight className="h-5 w-5" />
//                 </a>
//               </div>
//             </div>

//             <div className="relative order-2 lg:order-2">
//               <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
//                 <img
//                   src={getFullImageUrl(heroImageUrl)}
//                   alt="Incubateur Malea Hub"
//                   className="w-full h-full object-cover"
//                   onError={(e) => { e.currentTarget.src = '/maleblan.jpeg'; }}
//                 />
//                 <div className="absolute inset-0 rounded-2xl border-2" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 20%, transparent)` }} />
//               </div>
//               <div className="absolute -bottom-6 -right-6 w-32 h-32 border rounded-2xl -z-10" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)` }} />
//               <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl -z-10" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }} />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Program section */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
//               {programTitle}
//             </h2>
//             <p className="mt-4" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
//               {programSubtitle}
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {programFeatures.map((feature, index) => {
//               const Icon = iconMap[feature.title] || Rocket;
//               return (
//                 <div key={feature.title || index} className="text-center p-6 rounded-xl border transition-all hover:shadow-lg"
//                   style={{ backgroundColor: theme?.cardColor || 'var(--card)', borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)` }}>
//                   <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
//                     style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
//                     <Icon className="h-8 w-8" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
//                   </div>
//                   <h3 className="font-semibold mb-2" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{feature.title}</h3>
//                   <p className="text-sm" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{feature.description}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Benefits section */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
//               {benefitsTitle}
//             </h2>
//             <p className="mt-4" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
//               {benefitsSubtitle}
//             </p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-6">
//             {benefits.map((benefit, index) => (
//               <div key={benefit.title || index} className="flex items-start gap-4 p-6 rounded-xl border"
//                 style={{ backgroundColor: theme?.backgroundColor || 'var(--background)', borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)` }}>
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
//                   style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
//                   <CheckCircle className="h-6 w-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{benefit.title}</h3>
//                   <p className="text-sm mt-1" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{benefit.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats section */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
//             {statsTitle}
//           </h2>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {stats.map((stat, index) => (
//               <div key={stat.label || index} className="text-center p-6 rounded-xl border"
//                 style={{ backgroundColor: theme?.cardColor || 'var(--card)', borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 20%, transparent)` }}>
//                 <div className="text-3xl lg:text-4xl font-bold" style={{ color: theme?.primaryColor || 'var(--primary)' }}>{stat.value}</div>
//                 <div className="text-sm mt-2" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Invest Club section */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <div
//                 className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg md:text-xl font-medium mb-6"
//                 style={{
//                   borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`,
//                   backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`,
//                   color: theme?.primaryColor || 'var(--primary)',
//                 }}
//               >
//                 {investClubBadge}
//               </div>
//               <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
//                 {investClubTitlePrefix}{' '}
//                 <span style={{ color: theme?.primaryColor || 'var(--primary)' }}>{investClubTitleHighlight}</span>
//               </h2>
//               <p className="mt-6 text-lg leading-relaxed" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
//                 {investClubDescription}
//               </p>
//               <div className="mt-8">
//                 <a
//                   href={`https://wa.me/${waLocation}?text=${encodeURIComponent(investClubMessage)}`}
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
//                   style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
//                 >
//                   {investClubCta} <ArrowRight className="h-5 w-5" />
//                 </a>
//               </div>
//             </div>

//             <div className="relative">
//               <div className="relative rounded-2xl overflow-hidden shadow-xl">
//                 <img
//                   src={getFullImageUrl(investClubImage) || '/maleblan.jpeg'}
//                   alt="Malea Invest Club"
//                   className="w-full h-auto object-cover rounded-2xl"
//                   onError={(e) => { e.currentTarget.src = '/maleblan.jpeg'; }}
//                 />
//                 <div className="absolute inset-0 rounded-2xl border-2" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 20%, transparent)` }} />
//               </div>
//               <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl -z-10" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }} />
//               <div className="absolute -top-6 -right-6 w-32 h-32 border rounded-2xl -z-10" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)` }} />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Application CTA section */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border transition-all hover:shadow-xl"
//             style={{ 
//               backgroundColor: theme?.cardColor || 'var(--card)', 
//               borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`
//             }}>
//             <Rocket className="h-12 w-12 mx-auto mb-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
//               {applicationTitle}
//             </h2>
//             <p className="mt-4 text-lg" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
//               {applicationDescription}
//             </p>
//             <div className="mt-8">
//               <a
//                 href={`https://wa.me/${waLocation}?text=${encodeURIComponent(applicationMessage)}`}
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
//                 style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
//               >
//                 {applicationButton} <ArrowRight className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }







import React, { useState } from 'react';
import { ArrowRight, Rocket, Users, TrendingUp, Lightbulb, Target, Award, Zap, Calendar, CheckCircle, X, Check } from 'lucide-react';
import { useContent, useSettings } from '../hooks/usecontet';
import { candidaturesAPI } from '../services/client';

const iconMap = {
  'Accompagnement': Users,
  'Mentorat': Lightbulb,
  'Financement': TrendingUp,
  'Réseau': Users,
  'Formation': Award,
  'Visibilité': Target,
  'Accélération': Zap,
};

export default function IncubatorPage() {
  // Récupère les blocs dynamiques pour la page 'incubator'
  const { get, getMedia, getText, getJSON, getTheme } = useContent('incubator');
  const { setting } = useSettings();
  const theme = getTheme();

  // -- Valeurs provenant du ContentManager / Settings --
  const waLocation = setting('whatsapp_investors', setting('whatsapp_general', '237678111022'));

  // -- Candidature (modal + soumission à l'API) --
  // C'est CE formulaire qui alimente les statistiques "Candidatures Incubateur"
  // côté admin (adminIncubatorAPI.getStats -> GET /candidatures/stats).
  // Avant ce correctif, les boutons "Postuler" pointaient uniquement vers
  // WhatsApp et n'appelaient jamais candidaturesAPI.submit(), donc aucune
  // candidature n'était jamais enregistrée en base : les stats restaient à 0.
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    tel: '',
    nom_projet: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');

    try {
      await candidaturesAPI.submit(formData);
      setSuccessMessage('Candidature soumise avec succès ! Nous vous contacterons sous 48h.');
      setFormData({ nom: '', email: '', tel: '', nom_projet: '', description: '' });
      setTimeout(() => {
        setShowModal(false);
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Erreur lors de la soumission';
      alert(`Erreur: ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Hero section
  const heroBadge = get('hero_badge', 'Programme d\'accompagnement');
  const heroTitlePrefix = get('hero_title_prefix', 'Rejoignez');
  const heroTitleHighlight = get('hero_title_highlight', 'l\'incubateur');
  const heroTitleSuffix = get('hero_title_suffix', 'de Malea Hub');
  const heroDescription = get('hero_description', 'Un programme d\'accompagnement intensif pour transformer votre idée en startup à succès');
  const ctaButton = get('cta_button', 'Postuler maintenant');

  // Program section
  const programTitle = get('program_title', 'Notre programme d\'accompagnement');
  const programSubtitle = get('program_subtitle', 'Un parcours sur mesure pour les startups innovantes');
  const programFeatures = getJSON('program_features', [
    { title: 'Accompagnement personnalisé', description: 'Mentorat par des experts du secteur' },
    { title: 'Financement', description: 'Accès à notre réseau d\'investisseurs' },
    { title: 'Formation continue', description: 'Ateliers et masterclasses mensuels' },
    { title: 'Visibilité', description: 'Mise en relation avec les médias' },
  ]);

  // Benefits section
  const benefitsTitle = get('benefits_title', 'Pourquoi rejoindre notre incubateur ?');
  const benefitsSubtitle = get('benefits_subtitle', 'Les clés de votre réussite');
  const benefits = getJSON('benefits_items', [
    { title: 'Accès exclusif', description: 'Bénéficiez d\'un accompagnement privilégié' },
    { title: 'Réseau d\'influence', description: 'Rencontrez des experts et investisseurs' },
    { title: 'Espaces dédiés', description: 'Coworking et laboratoires à disposition' },
  ]);

  // Stats section
  const statsTitle = get('stats_title', 'Ils nous font confiance');
  const stats = getJSON('stats_items', [
    { value: '50+', label: 'Startups accompagnées' },
    { value: '10M FCFA', label: 'Levés de fonds' },
    { value: '95%', label: 'Taux de satisfaction' },
    { value: '30+', label: 'Mentors experts' },
  ]);

  // Invest Club section
  const investClubBadge = get('invest_club_badge', 'Malea Invest Club');
  const investClubTitlePrefix = get('invest_club_title_prefix', 'Rejoignez le');
  const investClubTitleHighlight = get('invest_club_title_highlight', 'Malea Invest Club');
  const investClubDescription = get('invest_club_description', getText('invest_club', 'Devenez investisseur et participez à l\'aventure des startups de demain'));
  const investClubCta = get('invest_club_cta', 'Devenir investisseur');
  const investClubMessage = get('invest_club_message', 'Bonjour, je souhaite rejoindre le Malea Invest Club');
  const investClubImage = getMedia('invest_club_image');

  // Application section
  const applicationTitle = get('application_title', 'Prêt à rejoindre l\'aventure ?');
  const applicationDescription = get('application_description', 'Postulez dès maintenant et faites décoller votre projet');
  const applicationButton = get('application_button', 'Postuler');

  // Hero image
  const heroImageUrl = getMedia('hero_image') || '/maleblan.jpeg';

  // Helper pour générer une URL complète
  const getFullImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const baseUrl ='/api';
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
      {/* Hero section */}
      <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 5%, transparent), transparent)` }} />
        
        {heroImageUrl && (
          <div className="absolute inset-0 opacity-20 z-0">
            <img src={getFullImageUrl(heroImageUrl)} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
                >
                  {ctaButton} <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative order-2 lg:order-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={getFullImageUrl(heroImageUrl)}
                  alt="Incubateur Malea Hub"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = '/maleblan.jpeg'; }}
                />
                <div className="absolute inset-0 rounded-2xl border-2" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 20%, transparent)` }} />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border rounded-2xl -z-10" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)` }} />
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl -z-10" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Program section */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {programTitle}
            </h2>
            <p className="mt-4" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {programSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programFeatures.map((feature, index) => {
              const Icon = iconMap[feature.title] || Rocket;
              return (
                <div key={feature.title || index} className="text-center p-6 rounded-xl border transition-all hover:shadow-lg"
                  style={{ backgroundColor: theme?.cardColor || 'var(--card)', borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)` }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
                    <Icon className="h-8 w-8" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{feature.title}</h3>
                  <p className="text-sm" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {benefitsTitle}
            </h2>
            <p className="mt-4" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {benefitsSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={benefit.title || index} className="flex items-start gap-4 p-6 rounded-xl border"
                style={{ backgroundColor: theme?.backgroundColor || 'var(--background)', borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
                  <CheckCircle className="h-6 w-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{benefit.title}</h3>
                  <p className="text-sm mt-1" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
            {statsTitle}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={stat.label || index} className="text-center p-6 rounded-xl border"
                style={{ backgroundColor: theme?.cardColor || 'var(--card)', borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 20%, transparent)` }}>
                <div className="text-3xl lg:text-4xl font-bold" style={{ color: theme?.primaryColor || 'var(--primary)' }}>{stat.value}</div>
                <div className="text-sm mt-2" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invest Club section */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg md:text-xl font-medium mb-6"
                style={{
                  borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`,
                  backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`,
                  color: theme?.primaryColor || 'var(--primary)',
                }}
              >
                {investClubBadge}
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
                {investClubTitlePrefix}{' '}
                <span style={{ color: theme?.primaryColor || 'var(--primary)' }}>{investClubTitleHighlight}</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                {investClubDescription}
              </p>
              <div className="mt-8">
                <a
                  href={`https://wa.me/${waLocation}?text=${encodeURIComponent(investClubMessage)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
                >
                  {investClubCta} <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={getFullImageUrl(investClubImage) || '/maleblan.jpeg'}
                  alt="Malea Invest Club"
                  className="w-full h-auto object-cover rounded-2xl"
                  onError={(e) => { e.currentTarget.src = '/maleblan.jpeg'; }}
                />
                <div className="absolute inset-0 rounded-2xl border-2" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 20%, transparent)` }} />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl -z-10" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }} />
              <div className="absolute -top-6 -right-6 w-32 h-32 border rounded-2xl -z-10" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Application CTA section */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border transition-all hover:shadow-xl"
            style={{ 
              backgroundColor: theme?.cardColor || 'var(--card)', 
              borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`
            }}>
            <Rocket className="h-12 w-12 mx-auto mb-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {applicationTitle}
            </h2>
            <p className="mt-4 text-lg" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {applicationDescription}
            </p>
            <div className="mt-8">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
              >
                {applicationButton} <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de candidature */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
            <div className="sticky top-0 flex justify-between items-center p-5 border-b" style={{ backgroundColor: theme?.cardColor || 'var(--card)', borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-semibold" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>
                Candidature à l'incubateur
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100/10">
                <X className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
              </button>
            </div>

            {successMessage ? (
              <div className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-100">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-green-600">{successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Téléphone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    value={formData.tel}
                    onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                    placeholder="+237 6XX XXX XXX"
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Nom du projet *
                  </label>
                  <input
                    type="text"
                    value={formData.nom_projet}
                    onChange={(e) => setFormData({ ...formData, nom_projet: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Description du projet *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    placeholder="Décrivez votre projet, votre équipe, et ce que vous recherchez..."
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg border transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                    style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
                  >
                    {submitting ? 'Envoi...' : 'Soumettre ma candidature'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}