import { useTranslation } from 'react-i18next'
import { ArrowRight, Megaphone, Eye, Calendar, Users } from 'lucide-react'

// Annonces à afficher
const announcements = [
  {
    id: 1,
    title: "Jobs Week - Session Juillet 2024",
    description: "Programme intensif de 5 jours pour être prêt pour l'emploi. Optimisation CV, entretiens blancs et matching avec des employeurs.",
    image: "/maleannonce.jpeg",
    date: "15-19 Juillet 2024",
    link: "https://wa.me/237678111022?text=Bonjour, je souhaite participer à Jobs Week"
  },
  {
    id: 2,
    title: "Incubateur Malea Lab",
    description: "Programme d'accompagnement de 3 mois pour les startups innovantes. Mentorat, networking et accès aux investisseurs.",
    image: "/malesalon.jpeg",
    date: "Inscriptions ouvertes",
    link: "https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Lab"
  },
  {
    id: 3,
    title: "Networking Evening",
    description: "Rencontrez des entrepreneurs, investisseurs et professionnels lors de notre soirée networking mensuelle.",
    image: "/maleSalonthe.jpeg",
    date: "Chaque dernier vendredi du mois",
    link: "https://wa.me/237678111022?text=Bonjour, je souhaite participer au Networking Evening"
  },
  {
    id: 4,
    title: "Formation Certification",
    description: "Formation professionnelle avec certification reconnue. Développez vos compétences techniques.",
    image: "/maletravail.jpeg",
    date: "Programme sur mesure",
    link: "https://wa.me/237678111022?text=Bonjour, je souhaite m'inscrire à la formation"
  },
  {
    id: 5,
    title: "Pitch Day - Session Spéciale",
    description: "Présentez votre projet devant un jury d'investisseurs et gagnez des opportunités de financement.",
    image: "/maleblan.jpeg",
    date: "15 Septembre 2024",
    link: "https://wa.me/237678111022?text=Bonjour, je souhaite participer au Pitch Day"
  },
  {
    id: 6,
    title: "Atelier Design Thinking",
    description: "Apprenez les méthodologies d'innovation pour résoudre des problèmes complexes.",
    image: "/malenoir.jpeg",
    date: "5 Octobre 2024",
    link: "https://wa.me/237678111022?text=Bonjour, je souhaite participer à l'atelier Design Thinking"
  }
]

// Membres du staff
const staffMembers = [
  {
    name: "Erdman Doumbè",
    role: "Fondateur & CEO",
    image: "/maleblan.jpeg"
  },
  {
    name: "Sarah Kamga",
    role: "Directrice des Programmes",
    image: "/maleannonce.jpeg"
  },
  {
    name: "Michael Tchouta",
    role: "Lead Mentor",
    image: "/maletravail.jpeg"
  },
  {
    name: "Amira Diallo",
    role: "Community Manager",
    image: "/malenoir.jpeg"
  },
  {
    name: "Jean Njiké",
    role: "Chargé d'Incubation",
    image: "/malesalon.jpeg"
  },
  {
    name: "Clarisse Ngo",
    role: "Formatrice certifiée",
    image: "/maleSalonthe.jpeg"
  }
]

export default function EventsPage() {
  const { t } = useTranslation()

  // Dupliquer les membres pour un effet de boucle infinie
  const duplicatedStaff = [...staffMembers, ...staffMembers, ...staffMembers]

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
              Annonces &{' '}
              <span style={{ color: 'var(--primary)' }}>Événements</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Découvrez nos annonces, événements à venir et opportunités au cœur de Malea Hub.
            </p>
          </div>
        </div>
      </section>

      {/* Section Annonces & Événements */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Megaphone className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Nos prochains événements
            </h2>
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              {t('lounge.announcements.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--primary) 40%, transparent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--border) 50%, transparent)'}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={announcement.image}
                    alt={announcement.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {announcement.date}
                    </span>
                    <Eye className="h-4 w-4 opacity-50" style={{ color: 'var(--muted-foreground)' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                    {announcement.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
                    {announcement.description}
                  </p>
                  <a
                    href={announcement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
                    style={{ color: 'var(--primary)' }}
                  >
                    {t('lounge.announcements.cta')} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Staff - Notre Équipe avec effet marquee */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Users className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Notre Équipe
            </h2>
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              Des professionnels passionnés dédiés à votre réussite
            </p>
          </div>

          {/* Marquee avec CSS pur */}
          <div className="relative overflow-hidden">
            <div className="animate-marquee flex gap-6 lg:gap-8">
              {duplicatedStaff.map((member, index) => (
                <div
                  key={`${member.name}-${index}`}
                  className="flex-shrink-0 w-28 lg:w-36"
                >
                  <div className="text-center">
                    {/* Photo en cercle */}
                    <div className="relative mx-auto mb-3">
                      <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-md mx-auto"
                        style={{
                          borderColor: 'color-mix(in oklch, var(--primary) 40%, transparent)',
                          backgroundColor: 'var(--card)'
                        }}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/150?text=Photo';
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Informations du membre */}
                    <div>
                      <h3 className="text-xs lg:text-sm font-bold mb-0.5" style={{ color: 'var(--foreground)' }}>
                        {member.name}
                      </h3>
                      <p className="text-[10px] lg:text-xs font-medium" style={{ color: 'var(--primary)' }}>
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Styles CSS pour l'animation marquee */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
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
  )
}