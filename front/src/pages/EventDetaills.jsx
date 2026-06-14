import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowLeft, Share2, Users, Briefcase, CheckCircle, ArrowRight } from 'lucide-react';
import { useContent, useSettings, useAnnouncements } from '../hooks/usecontet';

export default function EventDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { get, getTheme } = useContent('events');
  const { setting } = useSettings();
  const { announcements, loading } = useAnnouncements();
  const theme = getTheme();
  
  const [event, setEvent] = useState(null);
  const [notFound, setNotFound] = useState(false);
  
  const waGeneral = setting('whatsapp_general', '237678111022');
  
  useEffect(() => {
    // Récupérer l'ID depuis l'URL ou trouver par slug
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('id');
    
    if (eventId) {
      const found = announcements.find(a => a.id === parseInt(eventId));
      if (found) {
        setEvent(found);
      } else {
        setNotFound(true);
      }
    } else if (slug && announcements.length > 0) {
      // Chercher par slug généré à partir du titre
      const generateSlug = (title) => {
        return title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      };
      const found = announcements.find(a => generateSlug(a.titre) === slug);
      if (found) {
        setEvent(found);
      } else {
        setNotFound(true);
      }
    }
  }, [slug, announcements]);
  
  const formatDate = (dateStr) => {
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
  
  const getFullImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const API_BASE_URL = '/api';
    return `${API_BASE_URL}${url}`;
  };
  
  const styles = {
    backgroundColor: theme?.backgroundColor || 'var(--background)',
    color: theme?.foregroundColor || 'var(--foreground)',
    fontFamily: theme?.fontBody || 'Inter',
  };
  
  if (loading) {
    return (
      <div className="pt-16 lg:pt-20 flex justify-center py-20" style={styles}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (notFound || !event) {
    return (
      <div className="pt-16 lg:pt-20 py-20 text-center" style={styles}>
        <h1 className="text-2xl font-bold mb-4" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>
          Événement non trouvé
        </h1>
        <p style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
          L'événement que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <button
          onClick={() => navigate('/events')}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold"
          style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
        >
          <ArrowLeft className="h-4 w-4" /> Retour aux événements
        </button>
      </div>
    );
  }
  
  const eventDate = formatDate(event.date_event);
  const isUpcoming = !event.date_event || new Date(event.date_event) >= new Date();
  
  return (
    <div className="pt-16 lg:pt-20" style={styles}>
      {/* Hero avec image de l'événement */}
      <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        {event.image_url && (
          <div className="absolute inset-0 z-0">
            <img 
              src={getFullImageUrl(event.image_url)} 
              alt={event.titre}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${theme?.cardColor || 'var(--card)'} 0%, transparent 100%)` }} />
          </div>
        )}
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <button
            onClick={() => navigate('/events')}
            className="inline-flex items-center gap-2 text-sm mb-6 hover:gap-3 transition-all"
            style={{ color: theme?.primaryColor || 'var(--primary)' }}
          >
            <ArrowLeft className="h-4 w-4" /> Retour aux événements
          </button>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {eventDate && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`, color: theme?.primaryColor || 'var(--primary)' }}>
                  <Calendar className="h-4 w-4" />
                  {eventDate}
                </span>
              )}
              {isUpcoming ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#10B98120', color: '#10B981' }}>
                  À venir
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#9CA3AF20', color: '#9CA3AF' }}>
                  Passé
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {event.titre}
            </h1>
            
            <p className="mt-6 text-lg leading-relaxed" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {event.description}
            </p>
            
            {isUpcoming && (
              <div className="mt-8">
                <a
                  href={event.lien_wa || `https://wa.me/${waGeneral}?text=${encodeURIComponent(`Bonjour, je souhaite participer à ${event.titre}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-transform hover:scale-105"
                  style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
                >
                  Je participe <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Détails supplémentaires */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {event.programme && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
                  Programme
                </h2>
                <div className="prose max-w-none" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                  {event.programme.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
                </div>
              </div>
            )}
            
            {event.benefices && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
                  Ce que vous allez gagner
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {event.benefices.split('\n').map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 5%, transparent)` }}>
                      <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                      <span style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* CTA d'inscription */}
            {isUpcoming && (
              <div className="text-center mt-12 p-8 rounded-2xl border"
                style={{ 
                  backgroundColor: theme?.cardColor || 'var(--card)', 
                  borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`
                }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>
                  Ne manquez pas cette opportunité !
                </h3>
                <p className="mb-6" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                  Inscrivez-vous dès maintenant pour réserver votre place.
                </p>
                <a
                  href={event.lien_wa || `https://wa.me/${waGeneral}?text=${encodeURIComponent(`Bonjour, je souhaite participer à ${event.titre}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-transform hover:scale-105"
                  style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
                >
                  S'inscrire maintenant <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}