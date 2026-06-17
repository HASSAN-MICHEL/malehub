

// // import { useTranslation } from 'react-i18next';
// // import { useContent } from '../../hooks/usecontet';

// // export function AboutSection() {
// //   const { t } = useTranslation();
// //   const { get, getMedia, getText } = useContent('home');

// //   const aboutText = getText('about_text', t('about.paragraph_1'));
// //   const aboutImage = getMedia('about_image');

// //   // Extraire les différentes parties du texte (vous pouvez ajuster selon votre structure)
// //   const paragraphs = aboutText.split('\n\n');

// //   return (
// //     <section id="about" className="py-20 lg:py-32" style={{ backgroundColor: 'var(--card)' }}>
// //       <div className="container mx-auto px-4 lg:px-8">
// //         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
// //           <div className="relative order-2 lg:order-1">
// //             <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
// //               <img
// //                 src={aboutImage || 'malesalon.jpeg'}
// //                 alt="Erdman Doumbè, Fondateur de Malea Hub"
// //                 className="w-full h-full object-cover"
// //                 onError={(e) => { e.currentTarget.src = '/malesalon.jpeg'; }}
// //               />
// //               <div className="absolute inset-0 rounded-2xl border-2" style={{ borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }} />
// //             </div>
// //             <div className="absolute -bottom-6 -right-6 w-32 h-32 border rounded-2xl -z-10" style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }} />
// //             <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl -z-10" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }} />
// //           </div>

// //           <div className="order-1 lg:order-2">
// //             <div
// //             className="inline-flex items-center gap-3 px-6 py-3 rounded-full border text-lg md:text-xl font-medium mb-4"
// //             style={{ 
// //               backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' 
// //             }}
// //           >
// //               {t('about.badge')}
// //             </div>

// //             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
// //               {t('about.title_prefix')}{' '}
// //               <span style={{ color: 'var(--primary)' }}>{t('about.title_suffix')}</span>
// //             </h2>

// //             <div className="mt-8 space-y-6">
// //               <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
// //                 {aboutText || `${t('about.paragraph_1')} ${t('about.paragraph_1_name')} ${t('about.paragraph_1_suffix')}`}
// //               </p>
// //               <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
// //                 {t('about.paragraph_2')}
// //               </p>
// //               <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
// //                 {t('about.paragraph_3_prefix')}{' '}
// //                 <span style={{ color: 'var(--primary)' }}>{t('about.title_suffix')}</span>:{' '}
// //                 <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{t('about.paragraph_3_suffix')}</span>
// //               </p>
// //             </div>

// //             <blockquote className="mt-8 pl-6 border-l-2" style={{ borderColor: 'var(--primary)' }}>
// //               <p className="text-xl italic font-light" style={{ color: 'var(--foreground)' }}>
// //                 &quot;{t('about.quote')}&quot;
// //               </p>
// //               <footer className="mt-3 text-sm font-medium" style={{ color: 'var(--primary)' }}>
// //                 {t('about.quote_author')}
// //               </footer>
// //             </blockquote>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }






// import { useTranslation } from 'react-i18next';
// import { ArrowRight } from 'lucide-react';
// import { useContent } from '../../hooks/usecontet';

// export function AboutSection() {
//   const { t } = useTranslation();
//   const { get, getMedia, getText } = useContent('home');

//   // Valeurs du CMS avec fallback vers i18n
//   const badge = get('about_badge', t('about.badge'));
//   const titlePrefix = get('about_title_prefix', t('about.title_prefix'));
//   const titleHighlight = get('about_title_highlight', t('about.title_suffix'));
//   const founderName = get('about_founder_name', t('about.founder_name'));
//   const founderTitle = get('about_founder_title', t('about.founder_title'));
//   const description = get('about_description', t('about.description'));
//   const ctaText = get('about_cta_text', t('about.cta_text'));
//   const ctaLink = get('about_cta_link', '/about');
//   const aboutImage = getMedia('about_image') || '/malesalon.jpeg';

//   return (
//     <section id="about" className="py-20 lg:py-32" style={{ backgroundColor: 'var(--card)' }}>
//       <div className="container mx-auto px-4 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           <div className="relative order-2 lg:order-1">
//             <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
//               <img
//                 src={aboutImage}
//                 alt={founderName}
//                 className="w-full h-full object-cover"
//                 onError={(e) => { e.currentTarget.src = '/malesalon.jpeg'; }}
//               />
//               <div className="absolute inset-0 rounded-2xl border-2" style={{ borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }} />
//             </div>
//             <div className="absolute -bottom-6 -right-6 w-32 h-32 border rounded-2xl -z-10" style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }} />
//             <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl -z-10" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }} />
//           </div>

//           <div className="order-1 lg:order-2">
//             <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border text-lg md:text-xl font-medium mb-4"
//               style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//               {badge}
//             </div>

//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//               {titlePrefix}{' '}
//               <span style={{ color: 'var(--primary)' }}>{titleHighlight}</span>
//             </h2>

//             <div className="mt-8 space-y-6">
//               <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//                 {description}
//               </p>
//             </div>

//             <blockquote className="mt-8 pl-6 border-l-2" style={{ borderColor: 'var(--primary)' }}>
//               <p className="text-xl italic font-light" style={{ color: 'var(--foreground)' }}>
//                 &quot;{t('about.quote')}&quot;
//               </p>
//               <footer className="mt-3 text-sm font-medium" style={{ color: 'var(--primary)' }}>
//                 {t('about.quote_author')}
//               </footer>
//             </blockquote>

//             <div className="mt-8">
//               <a
//                 href={ctaLink}
//                 className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:gap-3"
//                 style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//               >
//                 {ctaText} <ArrowRight className="h-4 w-4" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../../hooks/usecontet';

export function AboutSection() {
  const { t } = useTranslation();
  const { get, getMedia, getText } = useContent('home');

  const badge = get('about_badge', t('about.badge'));
  const titlePrefix = get('about_title_prefix', t('about.title_prefix'));
  const titleHighlight = get('about_title_highlight', t('about.title_suffix'));
  const founderName = get('about_founder_name', t('about.founder_name'));
  const founderTitle = get('about_founder_title', t('about.founder_title'));
  const description = get('about_description', t('about.description'));
  const ctaText = get('about_cta_text', t('about.cta_text'));
  const ctaLink = get('about_cta_link', '/about');
  const aboutImage = getMedia('about_image') || '/malesalon.jpeg';

  // Fonction pour rendre le texte avec les retours à la ligne
  const renderDescription = (text) => {
    if (!text) return null;
    // Diviser le texte par les retours à la ligne
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    const lines = text.split('\n').filter(line => line.trim());

    if (paragraphs.length > 1) {
      // Si plusieurs paragraphes (séparés par \n\n)
      return paragraphs.map((para, index) => (
        <p key={index} className="text-lg leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
          {para.replace(/\n/g, '<br/>')}
        </p>
      ));
    } else if (lines.length > 1) {
      // Si plusieurs lignes mais pas de double saut
      return lines.map((line, index) => {
        // Détecter si la ligne est un point de liste (-, •, etc.)
        if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
          return (
            <div key={index} className="flex items-start gap-2 mb-2" style={{ color: 'var(--muted-foreground)' }}>
              <span className="text-primary">•</span>
              <span className="text-lg leading-relaxed">{line.replace(/^[-•]\s*/, '')}</span>
            </div>
          );
        }
        return (
          <p key={index} className="text-lg leading-relaxed mb-2" style={{ color: 'var(--muted-foreground)' }}>
            {line}
          </p>
        );
      });
    } else {
      // Texte simple
      return <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{text}</p>;
    }
  };

  return (
    <section id="about" className="py-20 lg:py-32" style={{ backgroundColor: 'var(--card)' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src={aboutImage}
                alt={founderName}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = '/malesalon.jpeg'; }}
              />
              <div className="absolute inset-0 rounded-2xl border-2" style={{ borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }} />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border rounded-2xl -z-10" style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }} />
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl -z-10" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }} />
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border text-lg md:text-xl font-medium mb-4"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              {badge}
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              {titlePrefix}{' '}
              <span style={{ color: 'var(--primary)' }}>{titleHighlight}</span>
            </h2>

            <div className="mt-8 space-y-6">
              {renderDescription(description)}
            </div>

            <blockquote className="mt-8 pl-6 border-l-2" style={{ borderColor: 'var(--primary)' }}>
              <p className="text-xl italic font-light" style={{ color: 'var(--foreground)' }}>
                &quot;{t('about.quote')}&quot;
              </p>
              <footer className="mt-3 text-sm font-medium" style={{ color: 'var(--primary)' }}>
                {t('about.quote_author')}
              </footer>
            </blockquote>

            <div className="mt-8">
              <a
                href={ctaLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:gap-3"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                {ctaText} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}