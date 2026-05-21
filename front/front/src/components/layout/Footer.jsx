

// // import { Link } from 'react-router-dom'
// // import { MapPin, Mail } from 'lucide-react'
// // import { SiInstagram } from 'react-icons/si';
// // import { useTranslation } from 'react-i18next';

// // export function Footer() {
// //   const { t } = useTranslation();

// //   const footerLinks = {
// //     services: [
// //       { name: t('nav.coworking'), href: '/coworking' },
// //       { name: t('nav.incubator'), href: '/incubator' },
// //       { name: t('nav.trainings'), href: '/training' },
// //       { name: t('nav.even'), href: '/lounge' },
// //     ],
// //     company: [
// //       { name: t('footer.about'), href: '/#about' },
// //       { name: t('footer.invest_club'), href: '/incubator#investors' },
// //       { name: t('footer.jobs_week'), href: '/training#jobs-week' },
// //       { name: t('footer.social_library'), href: '/library' },
// //       { name: t('nav.contact'), href: '/contact' },
// //     ],
// //   }

// //   return (
// //     <footer
// //       className="border-t"
// //       style={{
// //         backgroundColor: 'var(--card)',
// //         borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)',
// //       }}
// //     >
// //       <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
// //           {/* Brand */}
// //           <div className="lg:col-span-1">
// //             <Link to="/" className="inline-block">
// //               <span className="text-2xl font-bold tracking-tight">
// //                 <span style={{ color: 'var(--primary)' }}>Malea</span>
// //                 <span style={{ color: 'var(--foreground)' }}> Hub</span>
// //               </span>
// //             </Link>
// //             <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
// //               Innovation hub connecting entrepreneurs, investors and talents in Douala, Cameroon.
// //             </p>
// //             <div className="mt-6 flex flex-col gap-3">
// //               <a
// //                 href="https://maps.google.com/?q=2PH2+X7X,rue koloko bonapriso,immeubesciDouala,Cameroon"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="flex items-center gap-2 text-sm transition-colors"
// //                 style={{ color: 'var(--muted-foreground)' }}
// //                 onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
// //                 onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
// //               >
// //                 <MapPin className="h-4 w-4" style={{ color: 'var(--primary)' }} />
// //                 Bonapriso, Douala Cameroun
// //               </a>
// //               <a
// //                 href="mailto:info@maleahub.com"
// //                 className="flex items-center gap-2 text-sm transition-colors"
// //                 style={{ color: 'var(--muted-foreground)' }}
// //                 onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
// //                 onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
// //               >
// //                 <Mail className="h-4 w-4" style={{ color: 'var(--primary)' }} />
// //                 info@maleahub.com
// //               </a>
// //               <a
// //                 href="https://instagram.com/maleahub"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="flex items-center gap-2 text-sm transition-colors"
// //                 style={{ color: 'var(--muted-foreground)' }}
// //                 onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
// //                 onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
// //               >
// //                 <SiInstagram className="h-4 w-4" style={{ color: 'var(--primary)' }} />
// //                 @maleahub
// //               </a>
// //             </div>
// //           </div>

// //           {/* Services */}
// //           <div>
// //             <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
// //               {t('footer.services')}
// //             </h3>
// //             <ul className="mt-4 flex flex-col gap-3">
// //               {footerLinks.services.map((link) => (
// //                 <li key={link.name}>
// //                   <Link
// //                     to={link.href}
// //                     className="text-sm transition-colors"
// //                     style={{ color: 'var(--muted-foreground)' }}
// //                     onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
// //                     onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
// //                   >
// //                     {link.name}
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>

// //           {/* Company */}
// //           <div>
// //             <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
// //               {t('footer.company')}
// //             </h3>
// //             <ul className="mt-4 flex flex-col gap-3">
// //               {footerLinks.company.map((link) => (
// //                 <li key={link.name}>
// //                   <Link
// //                     to={link.href}
// //                     className="text-sm transition-colors"
// //                     style={{ color: 'var(--muted-foreground)' }}
// //                     onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
// //                     onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
// //                   >
// //                     {link.name}
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>

// //           {/* CTA */}
// //           <div>
// //             <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
// //               {t('footer.get_started')}
// //             </h3>
// //             <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
// //               {t('footer.ready_to_grow')}
// //             </p>
// //             <a
// //               href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-opacity hover:opacity-90"
// //               style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
// //             >
// //               {t('footer.join_incubator')}
// //             </a>
// //           </div>
// //         </div>

// //         <div
// //           className="mt-12 pt-8 border-t"
// //           style={{ borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}
// //         >
// //           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
// //             <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
// //               &copy; {new Date().getFullYear()} Malea Hub. {t('footer.all_rights_reserved')}
// //             </p>
// //             <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
// //               Bonapriso, Douala, Cameroun
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </footer>
// //   )
// // }


// import { Link } from 'react-router-dom'
// import { MapPin, Mail } from 'lucide-react'
// import { SiInstagram } from 'react-icons/si';
// import { useTranslation } from 'react-i18next';

// // Configuration du logo - À remplacer par votre vrai lien
// const LOGO_URL = "https://drive.google.com/drive/u/1/folders/1J38u-lcZzIW7fH6GolRoTKsXEWh1gNJw";

// export function Footer() {
//   const { t } = useTranslation();

//   const footerLinks = {
//     services: [
//       { name: t('nav.coworking'), href: '/coworking' },
//       { name: t('nav.incubator'), href: '/incubator' },
//       { name: t('nav.trainings'), href: '/training' },
//       { name: t('nav.even'), href: '/lounge' },
//     ],
//     company: [
//       { name: t('footer.about'), href: '/#about' },
//       { name: t('footer.invest_club'), href: '/incubator#investors' },
//       { name: t('footer.jobs_week'), href: '/training#jobs-week' },
//       { name: t('footer.social_library'), href: '/library' },
//       { name: t('nav.contact'), href: '/contact' },
//     ],
//   }

//   return (
//     <footer
//       className="border-t"
//       style={{
//         backgroundColor: 'var(--card)',
//         borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)',
//       }}
//     >
//       <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//           {/* Brand avec logo officiel */}
//           <div className="lg:col-span-1">
//             <Link to="/" className="inline-block">
//               {LOGO_URL ? (
//                 <img 
//                   src={LOGO_URL} 
//                   alt="Malea Hub Logo" 
//                   className="h-12 w-auto object-contain"
//                   onError={(e) => {
//                     // Fallback au texte si l'image ne charge pas
//                     e.currentTarget.style.display = 'none';
//                     e.currentTarget.nextSibling.style.display = 'inline-block';
//                   }}
//                 />
//               ) : null}
//               <span 
//                 className="text-2xl font-bold tracking-tight" 
//                 style={{ display: LOGO_URL ? 'none' : 'inline-block' }}
//               >
//                 <span style={{ color: 'var(--primary)' }}>Malea</span>
//                 <span style={{ color: 'var(--foreground)' }}> Hub</span>
//               </span>
//             </Link>
//             <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//               Innovation hub connecting entrepreneurs, investors and talents in Douala, Cameroon.
//             </p>
//             <div className="mt-6 flex flex-col gap-3">
//               <a
//                 href="https://maps.google.com/?q=2PH2+X7X,rue koloko bonapriso,immeubesciDouala,Cameroon"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 text-sm transition-colors"
//                 style={{ color: 'var(--muted-foreground)' }}
//                 onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
//                 onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
//               >
//                 <MapPin className="h-4 w-4" style={{ color: 'var(--primary)' }} />
//                 Bonapriso, Douala Cameroun
//               </a>
//               <a
//                 href="mailto:info@maleahub.com"
//                 className="flex items-center gap-2 text-sm transition-colors"
//                 style={{ color: 'var(--muted-foreground)' }}
//                 onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
//                 onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
//               >
//                 <Mail className="h-4 w-4" style={{ color: 'var(--primary)' }} />
//                 info@maleahub.com
//               </a>
//               <a
//                 href="https://instagram.com/maleahub"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 text-sm transition-colors"
//                 style={{ color: 'var(--muted-foreground)' }}
//                 onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
//                 onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
//               >
//                 <SiInstagram className="h-4 w-4" style={{ color: 'var(--primary)' }} />
//                 @maleahub
//               </a>
//             </div>
//           </div>

//           {/* Le reste du footer reste identique */}
//           <div>
//             <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
//               {t('footer.services')}
//             </h3>
//             <ul className="mt-4 flex flex-col gap-3">
//               {footerLinks.services.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     to={link.href}
//                     className="text-sm transition-colors"
//                     style={{ color: 'var(--muted-foreground)' }}
//                     onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
//                     onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
//               {t('footer.company')}
//             </h3>
//             <ul className="mt-4 flex flex-col gap-3">
//               {footerLinks.company.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     to={link.href}
//                     className="text-sm transition-colors"
//                     style={{ color: 'var(--muted-foreground)' }}
//                     onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
//                     onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
//               {t('footer.get_started')}
//             </h3>
//             <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//               {t('footer.ready_to_grow')}
//             </p>
//             <a
//               href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-opacity hover:opacity-90"
//               style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//             >
//               {t('footer.join_incubator')}
//             </a>
//           </div>
//         </div>

//         <div
//           className="mt-12 pt-8 border-t"
//           style={{ borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}
//         >
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
//               &copy; {new Date().getFullYear()} Malea Hub. {t('footer.all_rights_reserved')}
//             </p>
//             <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
//               Bonapriso, Douala, Cameroun
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }



import { Link } from 'react-router-dom'
import { MapPin, Mail } from 'lucide-react'
import { SiInstagram } from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

export function Footer() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const footerLinks = {
    services: [
      { name: t('nav.coworking'), href: '/coworking' },
      { name: t('nav.incubator'), href: '/incubator' },
      { name: t('nav.trainings'), href: '/training' },
      { name: t('nav.even'), href: '/events' },
    ],
    company: [
      { name: t('footer.about'), href: '/#about' },
      { name: t('footer.invest_club'), href: '/incubator#investors' },
      { name: t('footer.jobs_week'), href: '/training#jobs-week' },
      { name: t('footer.social_library'), href: '/library' },
      { name: "Espace Lounge", href: '/lounge' },
      { name: t('nav.contact'), href: '/contact' },
    ],
  }

  const logoSrc = theme === 'dark' ? '/maleblan.jpeg' : '/logowhite.png';   

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)',
      }}
    >
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand avec logo officiel qui change selon le thème */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <img 
                src={logoSrc} 
                alt="Malea Hub Logo" 
                className="h-12 w-auto object-contain mb-4"
                onError={(e) => {
                  // Fallback au texte si l'image ne charge pas
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextSibling) {
                    e.currentTarget.nextSibling.style.display = 'inline-block';
                  }
                }}
              />
              <span 
                className="text-2xl font-bold tracking-tight hidden" 
                style={{ display: 'none' }}
              >
                <span style={{ color: 'var(--primary)' }}>Malea</span>
                <span style={{ color: 'var(--foreground)' }}> Hub</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Innovation hub connecting entrepreneurs, investors and talents in Douala, Cameroon.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://maps.google.com/?q=2PH2+X7X,rue koloko bonapriso,immeubesciDouala,Cameroon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
              >
                <MapPin className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                Bonapriso, Douala Cameroun
              </a>
              <a
                href="mailto:info@maleahub.com"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
              >
                <Mail className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                info@maleahub.com
              </a>
              <a
                href="https://instagram.com/maleahub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
              >
                <SiInstagram className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                @maleahub
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
              {t('footer.services')}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--muted-foreground)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
              {t('footer.company')}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--muted-foreground)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
              {t('footer.get_started')}
            </h3>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              {t('footer.ready_to_grow')}
            </p>
            <a
              href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              {t('footer.join_incubator')}
            </a>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t"
          style={{ borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              &copy; {new Date().getFullYear()} Malea Hub. {t('footer.all_rights_reserved')}
            </p>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Bonapriso, Douala, Cameroun
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
