

// import { useTranslation } from 'react-i18next';
// import { ArrowRight, Megaphone, Eye, Calendar, Users } from 'lucide-react';
// import { useContent, useSettings, useAnnouncements, useTeam } from '../hooks/usecontet';

// export default function EventsPage() {
//   const { t } = useTranslation();
//   const { get, getMedia } = useContent('events');
//   const { setting } = useSettings();
  
//   // Récupération des annonces depuis l'API
//   const { announcements: apiAnnouncements, loading: announcementsLoading } = useAnnouncements();
  
//   // Récupération des membres de l'équipe depuis l'API
//   const { members: teamMembers, loading: teamLoading } = useTeam();
  
//   // Récupération de l'image hero depuis le ContentManager
//   const heroImageUrl = getMedia('hero_image');
  
//   // WhatsApp number depuis les settings
//   const waGeneral = setting('whatsapp_general', '237678111022');
  
//   // URL de base de l'API - utilisée de la même manière que dans Coworking
//   const API_BASE_URL = '/api';
  
//   // Fonction pour obtenir l'URL complète d'une image (identique à celle de Coworking)
//   const getFullImageUrl = (url) => {
//     if (!url) return null;
//     // Si c'est déjà une URL complète
//     if (url.startsWith('http://') || url.startsWith('https://')) {
//       return url;
//     }
//     // Si l'URL commence par /, on ajoute le domaine
//     if (url.startsWith('/')) {
//       return `${API_BASE_URL}${url}`;
//     }
//     // Sinon, retourne l'URL telle quelle (pour les images dans public/)
//     return url;
//   };

//   // Dupliquer les membres pour un effet de boucle infinie
//   const duplicatedStaff = teamMembers && teamMembers.length > 0 
//     ? [...teamMembers, ...teamMembers, ...teamMembers]
//     : [];

//   return (
//     <div className="pt-16 lg:pt-20">
//       {/* Hero Section */}
//       <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        
//         {/* Image de fond hero (optionnelle) */}
//         {heroImageUrl && (
//           <div className="absolute inset-0 opacity-20 z-0">
//             <img src={getFullImageUrl(heroImageUrl)} alt="" className="w-full h-full object-cover" />
//           </div>
//         )}
        
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="max-w-3xl">
//             <div
//               className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg md:text-xl font-medium mb-6"
//               style={{
//                 borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)',
//                 backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)',
//                 color: 'var(--primary)',
//               }}
//             >
//               {get('hero_badge', 'Annonces & Événements')}
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//               {get('hero_title', (
//                 <>
//                   Annonces & <span style={{ color: 'var(--primary)' }}>Événements</span>
//                 </>
//               ))}
//             </h1>
//             <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//               {get('description', 'Découvrez nos annonces, événements à venir et opportunités au cœur de Malea Hub.')}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Section Annonces & Événements */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-12">
//             <Megaphone className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
//             <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
//               {get('announcements_title', 'Nos prochains événements')}
//             </h2>
//             <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
//               {get('announcements_subtitle', 'Ne manquez aucune opportunité')}
//             </p>
//           </div>

//           {announcementsLoading ? (
//             <div className="flex justify-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//             </div>
//           ) : apiAnnouncements.length === 0 ? (
//             <div className="text-center py-12">
//               <p style={{ color: 'var(--muted-foreground)' }}>Aucune annonce pour le moment.</p>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//               {apiAnnouncements.map((announcement) => {
//                 // Déterminer l'URL de l'image de l'annonce
//                 let imageUrl = announcement.image_url;
                
//                 // Si image_url est vide, essayer de récupérer depuis le ContentManager (si configuré)
//                 if (!imageUrl) {
//                   imageUrl = getMedia(`announcement_${announcement.id}_image`);
//                 }
                
//                 return (
//                   <div
//                     key={announcement.id}
//                     className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//                     style={{
//                       backgroundColor: 'var(--card)',
//                       borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)'
//                     }}
//                     onMouseEnter={e => e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--primary) 40%, transparent)'}
//                     onMouseLeave={e => e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--border) 50%, transparent)'}
//                   >
//                     {imageUrl && (
//                       <div className="aspect-[16/9] overflow-hidden bg-gray-100">
//                         <img
//                           src={getFullImageUrl(imageUrl)}
//                           alt={announcement.titre}
//                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                           onError={(e) => { 
//                             console.error('Image error for announcement:', announcement.titre, imageUrl);
//                             e.currentTarget.style.display = 'none';
//                             // Afficher un fallback
//                             const parent = e.currentTarget.parentElement;
//                             if (parent) {
//                               parent.style.backgroundColor = '#f3f4f6';
//                               parent.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400">📷</div>';
//                             }
//                           }}
//                         />
//                       </div>
//                     )}
//                     <div className="p-6">
//                       <div className="flex items-center justify-between mb-3">
//                         {announcement.date_event && (
//                           <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//                             <Calendar className="h-3 w-3 inline mr-1" />
//                             {announcement.date_event}
//                           </span>
//                         )}
//                         <Eye className="h-4 w-4 opacity-50" style={{ color: 'var(--muted-foreground)' }} />
//                       </div>
//                       <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
//                         {announcement.titre}
//                       </h3>
//                       <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--muted-foreground)' }}>
//                         {announcement.description}
//                       </p>
//                       <a
//                         href={announcement.lien_wa || `https://wa.me/${waGeneral}?text=${encodeURIComponent(`Bonjour, je souhaite participer à ${announcement.titre}`)}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
//                         style={{ color: 'var(--primary)' }}
//                       >
//                         {get('announcements_cta', 'En savoir plus')} <ArrowRight className="h-4 w-4" />
//                       </a>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Section Staff - Notre Équipe avec effet marquee */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-10">
//             <Users className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
//             <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
//               {get('team_title', 'Notre Équipe')}
//             </h2>
//             <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
//               {get('team_subtitle', 'Des professionnels passionnés dédiés à votre réussite')}
//             </p>
//           </div>

//           {teamLoading ? (
//             <div className="flex justify-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//             </div>
//           ) : teamMembers.length === 0 ? (
//             <div className="text-center py-12">
//               <p style={{ color: 'var(--muted-foreground)' }}>Aucun membre pour le moment.</p>
//             </div>
//           ) : (
//             <div className="relative overflow-hidden">
//               <div className="animate-marquee flex gap-6 lg:gap-8">
//                 {duplicatedStaff.map((member, index) => (
//                   <div
//                     key={`${member.nom}-${index}`}
//                     className="flex-shrink-0 w-28 lg:w-36"
//                   >
//                     <div className="text-center">
//                       {/* Photo en cercle */}
//                       <div className="relative mx-auto mb-3">
//                         <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-md mx-auto bg-gray-100"
//                           style={{
//                             borderColor: 'color-mix(in oklch, var(--primary) 40%, transparent)',
//                             backgroundColor: 'var(--card)'
//                           }}
//                         >
//                           {member.image_url ? (
//                             <img
//                               src={getFullImageUrl(member.image_url)}
//                               alt={member.nom}
//                               className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                               onError={(e) => { 
//                                 console.error('Member image error:', member.nom, member.image_url);
//                                 e.currentTarget.style.display = 'none';
//                                 // Afficher un fallback
//                                 const parent = e.currentTarget.parentElement;
//                                 if (parent) {
//                                   parent.style.backgroundColor = '#f3f4f6';
//                                   parent.innerHTML = '<div class="flex items-center justify-center h-full text-2xl text-gray-400">👤</div>';
//                                 }
//                               }}
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400">
//                               👤
//                             </div>
//                           )}
//                         </div>
//                       </div>
                      
//                       {/* Informations du membre */}
//                       <div>
//                         <h3 className="text-xs lg:text-sm font-bold mb-0.5" style={{ color: 'var(--foreground)' }}>
//                           {member.nom}
//                         </h3>
//                         <p className="text-[10px] lg:text-xs font-medium" style={{ color: 'var(--primary)' }}>
//                           {member.role}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Styles CSS pour l'animation marquee */}
//       <style>{`
//         @keyframes marquee {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-33.33%);
//           }
//         }
        
//         .animate-marquee {
//           animation: marquee 25s linear infinite;
//           width: fit-content;
//         }
        
//         .animate-marquee:hover {
//           animation-play-state: paused;
//         }
        
//         .overflow-hidden {
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// }






import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Megaphone, Calendar, Users, MapPin, Clock } from 'lucide-react';
import { useContent, useSettings, useAnnouncements, useTeam } from '../hooks/usecontet';

export default function EventsPage() {
  const { t } = useTranslation();
  const { get, getMedia, getTheme } = useContent('events');
  const { setting } = useSettings();
  const theme = getTheme();
  
  // Récupération des annonces depuis l'API
  const { announcements: apiAnnouncements, loading: announcementsLoading } = useAnnouncements();
  
  // Récupération des membres de l'équipe depuis l'API
  const { members: teamMembers, loading: teamLoading } = useTeam();
  
  // Récupération de l'image hero depuis le ContentManager
  const heroImageUrl = getMedia('hero_image');
  
  // WhatsApp number depuis les settings
  const waGeneral = setting('whatsapp_general', '237678111022');
  
  // URL de base de l'API
  const API_BASE_URL = '/api';
  
  // Valeurs depuis le CMS
  const heroBadge = get('hero_badge', 'Annonces & Événements');
  const heroTitlePrefix = get('hero_title_prefix', 'Annonces &');
  const heroTitleHighlight = get('hero_title_highlight', 'Événements');
  const heroTitleSuffix = get('hero_title_suffix', 'à Malea Hub');
  const heroDescription = get('hero_description', 'Découvrez nos annonces, événements à venir et opportunités au cœur de Malea Hub.');
  
  const announcementsTitle = get('announcements_title', 'Nos prochains événements');
  const announcementsSubtitle = get('announcements_subtitle', 'Ne manquez aucune opportunité');
  const announcementsCta = get('announcements_cta', 'Voir les détails');
  
  const teamTitle = get('team_title', 'Notre Équipe');
  const teamSubtitle = get('team_subtitle', 'Des professionnels passionnés dédiés à votre réussite');
  
  const ctaTitle = get('cta_title', 'Vous souhaitez organiser un événement ?');
  const ctaDescription = get('cta_description', 'Contactez-nous pour organiser votre événement à Malea Hub');
  const ctaButton = get('cta_button', 'Contacter l\'équipe');
  
  // Styles avec le thème personnalisé
  const styles = {
    backgroundColor: theme?.backgroundColor || 'var(--background)',
    color: theme?.foregroundColor || 'var(--foreground)',
    fontFamily: theme?.fontBody || 'Inter',
  };
  
  // Fonction pour obtenir l'URL complète d'une image
  const getFullImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    if (url.startsWith('/')) {
      return `${API_BASE_URL}${url}`;
    }
    return url;
  };
  
  // Fonction pour générer le slug à partir du titre
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };
  
  // Dupliquer les membres pour un effet de boucle infinie
  const duplicatedStaff = teamMembers && teamMembers.length > 0 
    ? [...teamMembers, ...teamMembers, ...teamMembers]
    : [];

  // Séparer les événements passés et à venir
  const now = new Date();
  const upcomingEvents = apiAnnouncements.filter(event => {
    if (!event.date_event) return true;
    const eventDate = new Date(event.date_event);
    return eventDate >= now;
  });
  const pastEvents = apiAnnouncements.filter(event => {
    if (!event.date_event) return false;
    const eventDate = new Date(event.date_event);
    return eventDate < now;
  });

  // Helper pour formater la date
  const formatEventDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="pt-16 lg:pt-20" style={styles}>
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 5%, transparent), transparent)` }} />
        
        {heroImageUrl && (
          <div className="absolute inset-0 opacity-20 z-0">
            <img src={getFullImageUrl(heroImageUrl)} alt="" className="w-full h-full object-cover" />
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

      {/* Section Annonces & Événements à venir */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Megaphone className="h-12 w-12 mx-auto mb-4" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {announcementsTitle}
            </h2>
            <p className="text-lg" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {announcementsSubtitle}
            </p>
          </div>

          {announcementsLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : upcomingEvents.length === 0 ? (
            <div className="text-center py-12">
              <p style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                Aucun événement à venir pour le moment. Revenez bientôt !
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {upcomingEvents.map((announcement) => {
                const eventSlug = generateSlug(announcement.titre);
                const eventDate = formatEventDate(announcement.date_event);
                const imageUrl = announcement.image_url || getMedia(`announcement_${announcement.id}_image`);
                
                return (
                  <Link
                    key={announcement.id}
                    to={`/events/${eventSlug}?id=${announcement.id}`}
                    className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{
                      backgroundColor: theme?.cardColor || 'var(--card)',
                      borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)`
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 40%, transparent)`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)`}
                  >
                    {imageUrl && (
                      <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                        <img
                          src={getFullImageUrl(imageUrl)}
                          alt={announcement.titre}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => { 
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.style.backgroundColor = '#f3f4f6';
                              parent.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400">📷</div>';
                            }
                          }}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {eventDate && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`, color: theme?.primaryColor || 'var(--primary)' }}>
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {eventDate}
                          </span>
                        )}
                        <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'color-mix(in oklch, #10B981 10%, transparent)', color: '#10B981' }}>
                          À venir
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 line-clamp-2" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>
                        {announcement.titre}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                        {announcement.description}
                      </p>
                      <div className="inline-flex items-center gap-2 font-semibold transition-all group-hover:gap-3" style={{ color: theme?.primaryColor || 'var(--primary)' }}>
                        {announcementsCta} <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Événements passés (optionnel) */}
      {pastEvents.length > 0 && (
        <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              Événements passés
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pastEvents.slice(0, 3).map((announcement) => {
                const eventSlug = generateSlug(announcement.titre);
                const eventDate = formatEventDate(announcement.date_event);
                
                return (
                  <Link
                    key={announcement.id}
                    to={`/events/${eventSlug}?id=${announcement.id}`}
                    className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg opacity-75 hover:opacity-100"
                    style={{
                      backgroundColor: theme?.backgroundColor || 'var(--background)',
                      borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)`
                    }}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {eventDate && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: '#9CA3AF20', color: '#9CA3AF' }}>
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {eventDate}
                          </span>
                        )}
                        <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#9CA3AF20', color: '#9CA3AF' }}>
                          Passé
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 line-clamp-2" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                        {announcement.titre}
                      </h3>
                      <div className="inline-flex items-center gap-2 text-sm" style={{ color: theme?.primaryColor || 'var(--primary)' }}>
                        Voir le résumé <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Section Staff - Notre Équipe */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Users className="h-12 w-12 mx-auto mb-4" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {teamTitle}
            </h2>
            <p className="text-lg" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {teamSubtitle}
            </p>
          </div>

          {teamLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <p style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>Aucun membre pour le moment.</p>
            </div>
          ) : (
            <div className="relative overflow-hidden">
              <div className="animate-marquee flex gap-6 lg:gap-8">
                {duplicatedStaff.map((member, index) => (
                  <div key={`${member.nom}-${index}`} className="flex-shrink-0 w-28 lg:w-36">
                    <div className="text-center">
                      <div className="relative mx-auto mb-3">
                        <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-md mx-auto bg-gray-100"
                          style={{
                            borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 40%, transparent)`,
                            backgroundColor: theme?.cardColor || 'var(--card)'
                          }}
                        >
                          {member.image_url ? (
                            <img
                              src={getFullImageUrl(member.image_url)}
                              alt={member.nom}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                              onError={(e) => { 
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  parent.style.backgroundColor = '#f3f4f6';
                                  parent.innerHTML = '<div class="flex items-center justify-center h-full text-2xl text-gray-400">👤</div>';
                                }
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400">👤</div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs lg:text-sm font-bold mb-0.5" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>
                          {member.nom}
                        </h3>
                        <p className="text-[10px] lg:text-xs font-medium" style={{ color: theme?.primaryColor || 'var(--primary)' }}>
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Organisation d'événements */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border transition-all hover:shadow-xl"
            style={{ 
              backgroundColor: theme?.cardColor || 'var(--card)', 
              borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`
            }}>
            <Calendar className="h-12 w-12 mx-auto mb-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {ctaTitle}
            </h2>
            <p className="mt-4 text-lg" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {ctaDescription}
            </p>
            <div className="mt-8">
              <a
                href={`https://wa.me/${waGeneral}?text=${encodeURIComponent("Bonjour, je souhaite organiser un événement à Malea Hub")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
              >
                {ctaButton} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Styles CSS pour l'animation marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          width: fit-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .overflow-hidden {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}