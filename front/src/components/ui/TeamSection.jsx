


import { useTranslation } from 'react-i18next';
import { useTeam } from '../../hooks/usecontet';

export function TeamSection() {
  const { t } = useTranslation();
  const { members, loading } = useTeam();
  
  // Dupliquer les membres pour un effet de boucle infinie
  const duplicatedMembers = members && members.length > 0
    ? [...members, ...members, ...members]
    : [];

  return (
    <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border text-lg md:text-xl font-medium mb-4"
            style={{ 
              backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' 
            }}
          >
            {t('team.badge')}
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
            {t('team.title_prefix')}{' '}
            <span style={{ color: 'var(--primary)' }}>{t('team.title_highlight')}</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            {t('team.subtitle')}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12">
            <p style={{ color: 'var(--muted-foreground)' }}>Aucun membre pour le moment.</p>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div className="animate-marquee flex gap-6 lg:gap-8">
              {duplicatedMembers.map((member, index) => (
                <div
                  key={`${member.nom}-${index}`}
                  className="flex-shrink-0 w-28 lg:w-36"
                >
                  <div className="text-center">
                    <div className="relative mx-auto mb-3">
                      <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-md mx-auto"
                        style={{
                          borderColor: 'color-mix(in oklch, var(--primary) 40%, transparent)',
                          backgroundColor: 'var(--card)'
                        }}
                      >
                        <img
                          src={member.image_url || '/maleblan.jpeg'}
                          alt={member.nom}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/150?text=Photo';
                          }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xs lg:text-sm font-bold mb-0.5" style={{ color: 'var(--foreground)' }}>
                        {member.nom}
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
        )}
      </div>

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
    </section>
  );
}