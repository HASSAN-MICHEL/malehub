import { useTranslation } from 'react-i18next'; // ou votre hook de traduction

export function AboutSection() {
  const { t } = useTranslation(); // adaptez selon votre setup

  return (
    <section id="about" className="py-20 lg:py-32" style={{ backgroundColor: 'var(--card)' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="malesalon.jpeg"
                alt="Erdman Doumbè, Fondateur de Malea Hub"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 rounded-2xl border-2" style={{ borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }} />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border rounded-2xl -z-10" style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }} />
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl -z-10" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }} />
          </div>

          <div className="order-1 lg:order-2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
              style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
            >
              {t('about.badge')}
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              {t('about.title_prefix')}{' '}
              <span style={{ color: 'var(--primary)' }}>{t('about.title_suffix')}</span>
            </h2>

            <div className="mt-8 space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {t('about.paragraph_1')}{' '}
                <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{t('about.paragraph_1_name')}</span>{' '}
                {t('about.paragraph_1_suffix')}
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {t('about.paragraph_2')}
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {t('about.paragraph_3_prefix')}{' '}
                <span style={{ color: 'var(--primary)' }}>{t('about.title_suffix')}</span>:{' '}
                <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{t('about.paragraph_3_suffix')}</span>
              </p>
            </div>

            <blockquote className="mt-8 pl-6 border-l-2" style={{ borderColor: 'var(--primary)' }}>
              <p className="text-xl italic font-light" style={{ color: 'var(--foreground)' }}>
                &quot;{t('about.quote')}&quot;
              </p>
              <footer className="mt-3 text-sm font-medium" style={{ color: 'var(--primary)' }}>
                {t('about.quote_author')}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}