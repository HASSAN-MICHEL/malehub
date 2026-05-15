export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32" style={{ backgroundColor: 'var(--card)' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=640&q=80"
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
              Notre Histoire
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              À l&apos;origine de{' '}
              <span style={{ color: 'var(--primary)' }}>Malea Hub</span>
            </h2>

            <div className="mt-8 space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
               Entrepreneur actif dans les industries créatives ,  <span className="font-semibold" style={{ color: 'var(--foreground)' }}>Erdman Doumbè</span> a plus de 5 ans d'expérience dans l'accompagnement de projet.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Acteur de référence dans le secteur culturel en belgique , il met l'humain au coeur de tout projet , d'où sa passion pour la mise en relation .
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
               C'est là que réside l'essence du projet <span style={{ color: 'var(--primary)' }}>Malea Hub</span>: <span className="font-semibold" style={{ color: 'var(--foreground)' }}>Connecter des talents et faciliter la création d'opportunités</span> 
              </p>
            </div>

            <blockquote className="mt-8 pl-6 border-l-2" style={{ borderColor: 'var(--primary)' }}>
              <p className="text-xl italic font-light" style={{ color: 'var(--foreground)' }}>
                &quot;Le succès n&apos;est pas une destination, c&apos;est un voyage que l&apos;on fait ensemble.&quot;
              </p>
              <footer className="mt-3 text-sm font-medium" style={{ color: 'var(--primary)' }}>
                Erdman Doumbè, Fondateur
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
