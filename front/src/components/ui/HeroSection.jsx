


// import { Link } from 'react-router-dom';
// import { ArrowRight, ChevronDown } from 'lucide-react';
// import { useContent, useSettings } from '../../hooks/usecontet';
// import { useTranslation } from 'react-i18next';

// export function HeroSection() {
//   const { get } = useContent('home');
//   const { setting } = useSettings();
//   const { t } = useTranslation();

//   const waNumber = setting('whatsapp_general', '237678111022');

//   const heroImage = get(
//     'hero_image',
//     'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80'
//   );

//   return (
//     <section className="relative py-16 md:py-20 lg:py-32 flex items-center justify-center overflow-hidden">
//       <div className="absolute inset-0 z-0">
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: `url('${heroImage}')` }}
//         />

//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               'linear-gradient(to bottom, color-mix(in oklch, var(--background) 95%, transparent), color-mix(in oklch, var(--background) 80%, transparent), var(--background))',
//           }}
//         />
//       </div>

//       <div
//         className="absolute top-1/4 left-0 w-32 h-px opacity-50 hidden md:block"
//         style={{
//           background:
//             'linear-gradient(to right, transparent, var(--primary), transparent)',
//         }}
//       />

//       <div
//         className="absolute bottom-1/4 right-0 w-32 h-px opacity-50 hidden md:block"
//         style={{
//           background:
//             'linear-gradient(to right, transparent, var(--primary), transparent)',
//         }}
//       />

//       <div
//         className="absolute top-1/3 right-10 lg:right-20 w-48 h-48 rounded-full border opacity-30 hidden lg:block"
//         style={{
//           borderColor:
//             'color-mix(in oklch, var(--primary) 20%, transparent)',
//         }}
//       />

//       <div className="container mx-auto px-4 lg:px-8 relative z-10">
//         <div className="max-w-4xl mx-auto text-center">
//           {/* Badge */}
//           <div
//             className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border text-xs md:text-sm font-medium mb-6 md:mb-8"
//             style={{
//               borderColor:
//                 'color-mix(in oklch, var(--primary) 30%, transparent)',
//               backgroundColor:
//                 'color-mix(in oklch, var(--primary) 10%, transparent)',
//               color: 'var(--primary)',
//             }}
//           >
//             <span
//               className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse"
//               style={{ backgroundColor: 'var(--primary)' }}
//             />

//             {t('home.home_badge')}
//           </div>

//           {/* Title - Work, Connect, Grow */}
//           <h1
//             className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
//             style={{ color: 'var(--foreground)' }}
//           >
//             {t('hero.title')}
//           </h1>

//           {/* Description */}
//           <p
//             className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2"
//             style={{ color: 'var(--muted-foreground)' }}
//           >
//             {t('hero.description')}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }







import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useContent, useSettings } from '../../hooks/usecontet';
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { get, getMedia } = useContent('home');
  const { setting } = useSettings();
  const { t } = useTranslation();

  const waNumber = setting('whatsapp_general', '237678111022');
  const heroTitle = get('hero_title', t('hero.title'));
  const heroSubtitle = get('hero_subtitle', t('hero.description'));
  const heroImage = getMedia('hero_image') || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80';
  const ctaIncubator = get('cta_incubator', t('hero.join_incubator'));

  return (
    <section className="relative py-16 md:py-20 lg:py-32 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, color-mix(in oklch, var(--background) 95%, transparent), color-mix(in oklch, var(--background) 80%, transparent), var(--background))',
          }}
        />
      </div>

      <div
        className="absolute top-1/4 left-0 w-32 h-px opacity-50 hidden md:block"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--primary), transparent)',
        }}
      />

      <div
        className="absolute bottom-1/4 right-0 w-32 h-px opacity-50 hidden md:block"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--primary), transparent)',
        }}
      />

      <div
        className="absolute top-1/3 right-10 lg:right-20 w-48 h-48 rounded-full border opacity-30 hidden lg:block"
        style={{
          borderColor:
            'color-mix(in oklch, var(--primary) 20%, transparent)',
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border text-xs md:text-sm font-medium mb-6 md:mb-8"
            style={{
              borderColor:
                'color-mix(in oklch, var(--primary) 30%, transparent)',
              backgroundColor:
                'color-mix(in oklch, var(--primary) 10%, transparent)',
              color: 'var(--primary)',
            }}
          >
            <span
              className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--primary)' }}
            />
            {t('home.home_badge')}
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            style={{ color: 'var(--foreground)' }}
          >
            {heroTitle}
          </h1>

          <p
            className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {heroSubtitle}
          </p>

          

          <div className="mt-12 flex justify-center">
            <a
              href="#about"
              className="flex flex-col items-center gap-2 text-sm transition-colors hover:text-primary"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <span>{t('hero.scroll')}</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}