import { useTranslation } from 'react-i18next';
import { TrendingUp, ArrowRight, Users, Briefcase, LineChart } from 'lucide-react'

export function InvestorCtaSection() {
  const { t } = useTranslation();

  // Récupération des données de traduction pour l'investor
  const benefits = t('investorCta.benefits', { returnObjects: true });
  const stats = t('investorCta.stats', { returnObjects: true });

  const benefitIcons = [Users, Briefcase, LineChart];

  // Vérification que benefits et stats sont des tableaux
  const benefitsArray = Array.isArray(benefits) ? benefits : [];
  const statsArray = Array.isArray(stats) ? stats : [];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
      {/* Pattern de fond */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, var(--primary) 35px, var(--primary) 36px)` }} />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden border" style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
            {/* Coins décoratifs */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 rounded-tl-2xl" style={{ borderColor: 'color-mix(in oklch, var(--primary) 50%, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 rounded-br-2xl" style={{ borderColor: 'color-mix(in oklch, var(--primary) 50%, transparent)' }} />
            
            {/* Icône principale */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
              <TrendingUp className="h-8 w-8" style={{ color: 'var(--primary)' }} />
            </div>
            
            {/* Titre et sous-titre */}
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              {t('investorCta.title')}
            </h2>
            <p className="mt-4 text-xl font-medium" style={{ color: 'var(--primary)' }}>
              {t('investorCta.subtitle')}
            </p>
            
            {/* Description */}
            <p className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              {t('investorCta.description')}
            </p>

            {/* Avantages pour les investisseurs */}
            {benefitsArray.length > 0 && (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {benefitsArray.map((benefit, index) => {
                  const Icon = benefitIcons[index % benefitIcons.length];
                  return (
                    <div key={benefit.title || index} className="flex flex-col items-center text-center p-4 rounded-xl" style={{ backgroundColor: 'color-mix(in oklch, var(--card) 50%, transparent)' }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                        <Icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                      </div>
                      <h3 className="font-semibold mb-1" style={{ color: 'var(--foreground)' }}>{benefit.title}</h3>
                      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Statistiques */}
            {statsArray.length > 0 && (
              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                {statsArray.map((stat, index) => (
                  <div key={stat.label || index} className="rounded-lg p-4 text-center border" style={{ backgroundColor: 'color-mix(in oklch, var(--card) 50%, transparent)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                    <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{stat.value}</div>
                    <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Bouton CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/237600000000?text=Bonjour, je souhaite rejoindre le Malea Invest Club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold transition-all hover:opacity-90 hover:translate-x-1"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                {t('investorCta.cta_button')} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}