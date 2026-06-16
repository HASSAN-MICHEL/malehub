

// import { useTranslation } from 'react-i18next';
// import { Check, Clock, Users, ArrowRight } from 'lucide-react';
// import { useContent, useSettings } from '../../hooks/usecontet';

// export function JobsWeekSection() {
//   const { t } = useTranslation();
//   const { setting } = useSettings();
//   const { get, getJSON } = useContent('home');

//   const jobsWeekPrice    = setting('jobs_week_price', '30000');
//   const jobsWeekQuota    = setting('jobs_week_quota', '10');
//   const jobsWeekOpen     = setting('jobs_week_open', 'true') === 'true';
//   const waGeneral        = setting('whatsapp_general', '237678111022');

//   const badge          = get('jobsweek_badge', t('jobsWeek.badge'));
//   const title          = get('jobsweek_title', t('jobsWeek.title'));
//   const subtitle       = get('jobsweek_subtitle', t('jobsWeek.subtitle'));
//   const description    = get('jobsweek_description', t('jobsWeek.description'));
//   const cardBadge      = get('jobsweek_card_badge', t('jobsWeek.card_badge'));
//   const priceLabel     = get('jobsweek_price_label', t('jobsWeek.price_label'));
//   const priceCurrency  = get('jobsweek_price_currency', t('jobsWeek.price_currency'));
//   const spotsLabel     = get('jobsweek_spots_label', t('jobsWeek.spots_label'));
//   const durationLabel  = get('jobsweek_duration_label', t('jobsWeek.duration_label'));
//   const includedTitle  = get('jobsweek_included_title', t('jobsWeek.included_title'));
//   const ctaButton      = get('jobsweek_cta_button', t('jobsWeek.cta_button'));
//   const reserveButton  = get('jobsweek_reserve_button', t('jobsWeek.reserve_button'));

//   const benefitsArray = getJSON('jobsweek_benefits', Array.isArray(t('jobsWeek.benefits', { returnObjects: true })) ? t('jobsWeek.benefits', { returnObjects: true }) : []);
//   const includedItemsArray = getJSON('jobsweek_included_items', Array.isArray(t('jobsWeek.included_items', { returnObjects: true })) ? t('jobsWeek.included_items', { returnObjects: true }) : []);

//   if (!jobsWeekOpen) return null;

//   return (
//     <section id="jobs-week" className="py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//       <div className="container mx-auto px-4 lg:px-8 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           <div>
//             <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border text-lg md:text-xl font-medium mb-6" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//               {badge}
//             </div>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>{title}</h2>
//             <p className="mt-2 text-xl font-medium" style={{ color: 'var(--primary)' }}>{subtitle}</p>
//             <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{description}</p>
//             <ul className="mt-8 space-y-4">
//               {benefitsArray.map((benefit, index) => (
//                 <li key={benefit || index} className="flex items-center gap-3">
//                   <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }}>
//                     <Check className="h-4 w-4" style={{ color: 'var(--primary)' }} />
//                   </div>
//                   <span style={{ color: 'var(--foreground)' }}>{benefit}</span>
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-10">
//               <a
//                 href={`https://wa.me/${waGeneral}?text=${encodeURIComponent("Bonjour, je souhaite m'inscrire à Jobs Week")}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold transition-opacity hover:opacity-90"
//                 style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//               >
//                 {ctaButton} <ArrowRight className="h-5 w-5" />
//               </a>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="rounded-2xl p-8 lg:p-10 relative overflow-hidden border" style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
//               <div className="absolute top-0 right-0">
//                 <div className="text-xs font-bold px-4 py-2 rounded-bl-xl" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//                   {cardBadge}
//                 </div>
//               </div>
//               <div className="mb-8">
//                 <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{priceLabel}</span>
//                 <div className="mt-2 flex items-baseline gap-2">
//                   <span className="text-5xl font-bold" style={{ color: 'var(--foreground)' }}>{parseInt(jobsWeekPrice).toLocaleString()}</span>
//                   <span className="text-xl" style={{ color: 'var(--muted-foreground)' }}>{priceCurrency}</span>
//                 </div>
//               </div>
//               <div className="space-y-4 mb-8">
//                 <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                   <Users className="h-5 w-5" style={{ color: 'var(--primary)' }} />
//                   <span className="font-medium" style={{ color: 'var(--foreground)' }}>{jobsWeekQuota} {spotsLabel}</span>
//                 </div>
//                 <div className="flex items-center gap-3 p-3 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                   <Clock className="h-5 w-5" style={{ color: 'var(--primary)' }} />
//                   <span style={{ color: 'var(--muted-foreground)' }}>{durationLabel}</span>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{includedTitle}</span>
//                 <ul className="space-y-2">
//                   {includedItemsArray.map((item, index) => (
//                     <li key={item || index} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
//                       <Check className="h-4 w-4" style={{ color: 'var(--primary)' }} />
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <a
//                 href={`https://wa.me/${waGeneral}?text=${encodeURIComponent(`Bonjour, je souhaite m'inscrire à Jobs Week (${jobsWeekPrice} FCFA)`)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-full mt-8 flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-opacity hover:opacity-90"
//                 style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//               >
//                 {reserveButton}
//               </a>
//             </div>
//             <div className="absolute -bottom-4 -right-4 w-24 h-24 border rounded-2xl -z-10" style={{ borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useTranslation } from 'react-i18next';
import { Check, Clock, Users, ArrowRight } from 'lucide-react';
import { useContent, useSettings } from '../../hooks/usecontet';

export function JobsWeekSection() {
  const { t } = useTranslation();
  const { setting } = useSettings();
  const { get, getJSON } = useContent('home');

  const waGeneral = setting('whatsapp_general', '237678111022');

  // PRIORITÉ AU CMS (get) AVEC FALLBACK SUR SETTINGS
  const cmsPrice = get('jobsweek_price', null);
  const cmsQuota = get('jobsweek_quota', null);
  const cmsOpen = get('jobsweek_open', null);

  const jobsWeekPrice = cmsPrice !== null && cmsPrice !== '' ? cmsPrice : setting('jobs_week_price', '30000');
  const jobsWeekQuota = cmsQuota !== null && cmsQuota !== '' ? cmsQuota : setting('jobs_week_quota', '10');
  const jobsWeekOpen = cmsOpen !== null ? cmsOpen === 'true' || cmsOpen === true : setting('jobs_week_open', 'true') === 'true';

  const badge          = get('jobsweek_badge', t('jobsWeek.badge'));
  const title          = get('jobsweek_title', t('jobsWeek.title'));
  const subtitle       = get('jobsweek_subtitle', t('jobsWeek.subtitle'));
  const description    = get('jobsweek_description', t('jobsWeek.description'));
  const cardBadge      = get('jobsweek_card_badge', t('jobsWeek.card_badge'));
  const priceLabel     = get('jobsweek_price_label', t('jobsWeek.price_label'));
  const priceCurrency  = get('jobsweek_price_currency', t('jobsWeek.price_currency'));
  const spotsLabel     = get('jobsweek_spots_label', t('jobsWeek.spots_label'));
  const durationLabel  = get('jobsweek_duration_label', t('jobsWeek.duration_label'));
  const includedTitle  = get('jobsweek_included_title', t('jobsWeek.included_title'));
  const ctaButton      = get('jobsweek_cta_button', t('jobsWeek.cta_button'));
  const reserveButton  = get('jobsweek_reserve_button', t('jobsWeek.reserve_button'));

  const benefitsArray = getJSON('jobsweek_benefits', Array.isArray(t('jobsWeek.benefits', { returnObjects: true })) ? t('jobsWeek.benefits', { returnObjects: true }) : []);
  const includedItemsArray = getJSON('jobsweek_included_items', Array.isArray(t('jobsWeek.included_items', { returnObjects: true })) ? t('jobsWeek.included_items', { returnObjects: true }) : []);

  if (!jobsWeekOpen) return null;

  // Nettoyer le prix pour l'affichage
  const cleanPrice = String(jobsWeekPrice).replace(/\s/g, '');
  const displayPrice = parseInt(cleanPrice) || 0;

  return (
    <section id="jobs-week" className="py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border text-lg md:text-xl font-medium mb-6" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              {badge}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>{title}</h2>
            <p className="mt-2 text-xl font-medium" style={{ color: 'var(--primary)' }}>{subtitle}</p>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{description}</p>
            <ul className="mt-8 space-y-4">
              {benefitsArray.map((benefit, index) => (
                <li key={benefit || index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }}>
                    <Check className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                  </div>
                  <span style={{ color: 'var(--foreground)' }}>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <a
                href={`https://wa.me/${waGeneral}?text=${encodeURIComponent("Bonjour, je souhaite m'inscrire à Jobs Week")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                {ctaButton} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl p-8 lg:p-10 relative overflow-hidden border" style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
              <div className="absolute top-0 right-0">
                <div className="text-xs font-bold px-4 py-2 rounded-bl-xl" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                  {cardBadge}
                </div>
              </div>
              <div className="mb-8">
                <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{priceLabel}</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-5xl font-bold" style={{ color: 'var(--foreground)' }}>{displayPrice.toLocaleString()}</span>
                  <span className="text-xl" style={{ color: 'var(--muted-foreground)' }}>{priceCurrency}</span>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                  <Users className="h-5 w-5" style={{ color: 'var(--primary)' }} />
                  <span className="font-medium" style={{ color: 'var(--foreground)' }}>{jobsWeekQuota} {spotsLabel}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                  <Clock className="h-5 w-5" style={{ color: 'var(--primary)' }} />
                  <span style={{ color: 'var(--muted-foreground)' }}>{durationLabel}</span>
                </div>
              </div>
              <div className="space-y-3">
                <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{includedTitle}</span>
                <ul className="space-y-2">
                  {includedItemsArray.map((item, index) => (
                    <li key={item || index} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      <Check className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={`https://wa.me/${waGeneral}?text=${encodeURIComponent(`Bonjour, je souhaite m'inscrire à Jobs Week (${displayPrice} FCFA)`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-8 flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                {reserveButton}
              </a>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border rounded-2xl -z-10" style={{ borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}