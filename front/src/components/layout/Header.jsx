

// // import { Link, useLocation } from 'react-router-dom';
// // import { useState } from 'react';
// // import { Menu, X } from 'lucide-react';
// // import { useTranslation } from 'react-i18next';
// // import LanguageSwitcher from '../ui/LanguageSwitcher';
// // import { ThemeToggle } from '../ui/ThemeToggle';

// // export function Header() {
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const location = useLocation();
// //   const { t } = useTranslation();

// //   const navigation = [
// //     { name: t('nav.home'), href: '/' },
// //     { name: t('nav.coworking'), href: '/coworking' },
// //     { name: t('nav.incubator'), href: '/incubator' },
// //     { name: t('nav.trainings'), href: '/training' },
// //     { name: t('nav.even'), href: '/lounge' },
// //     { name: t('nav.contact'), href: '/contact' },
// //   ];

// //   return (
// //     <header className="fixed top-0 left-0 right-0 z-50 border-b glass-header">
// //       <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center justify-between h-16 lg:h-20">
// //           {/* Logo */}
// //           <Link to="/" className="flex items-center gap-2 flex-shrink-0">
// //             <span className="text-xl lg:text-2xl font-bold tracking-tight">
// //               <span className="text-primary">Malea</span>
// //               <span className="text-foreground"> Hub</span>
// //             </span>
// //           </Link>

// //           {/* Desktop Navigation */}
// //           <div className="hidden lg:flex items-center gap-8">
// //             {navigation.map((item) => (
// //               <Link
// //                 key={item.href}
// //                 to={item.href}
// //                 className={`text-sm font-medium transition-colors hover:text-primary ${
// //                   location.pathname === item.href ? 'text-primary' : 'text-muted-foreground'
// //                 }`}
// //               >
// //                 {item.name}
// //               </Link>
// //             ))}
// //           </div>

// //           {/* Desktop Actions */}
// //           <div className="hidden lg:flex items-center gap-3">
// //             <ThemeToggle />
// //             <LanguageSwitcher />
// //             <a
// //               href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25"
// //             >
// //               {t('footer.join_incubator')}
// //             </a>
// //           </div>

// //           {/* Mobile Menu Button */}
// //           <button
// //             type="button"
// //             className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors text-foreground"
// //             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //             aria-label="Menu"
// //           >
// //             {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
// //           </button>
// //         </div>

// //         {/* Mobile Menu */}
// //         {mobileMenuOpen && (
// //           <div className="lg:hidden py-6 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
// //             {/* Navigation Links */}
// //             <div className="flex flex-col gap-2 mb-6">
// //               {navigation.map((item) => (
// //                 <Link
// //                   key={item.href}
// //                   to={item.href}
// //                   className={`text-base font-medium px-3 py-3 rounded-lg transition-all ${
// //                     location.pathname === item.href 
// //                       ? 'text-primary bg-primary/10' 
// //                       : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
// //                   }`}
// //                   onClick={() => setMobileMenuOpen(false)}
// //                 >
// //                   {item.name}
// //                 </Link>
// //               ))}
// //             </div>
            
// //             {/* Actions Section */}
// //             <div className="pt-4 border-t border-border/50">
// //               <div className="flex flex-col gap-4">
// //                 {/* Theme and Language Row */}
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-sm text-muted-foreground">Apparence</span>
// //                   <div className="flex items-center gap-3">
// //                     <ThemeToggle />
// //                     <LanguageSwitcher />
// //                   </div>
// //                 </div>
                
// //                 {/* Join Button */}
// //                 <a
// //                   href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="w-full py-3 rounded-lg text-center text-sm font-semibold transition-all bg-primary text-primary-foreground hover:scale-[1.02] shadow-md"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                 >
// //                   {t('footer.join_incubator')}
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </nav>
// //     </header>
// //   );
// // }



// import { Link, useLocation } from 'react-router-dom';
// import { useState } from 'react';
// import { Menu, X } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from '../ui/LanguageSwitcher';
// import { ThemeToggle } from '../ui/ThemeToggle';

// const LOGO_URL = "https://drive.google.com/drive/u/1/folders/1J38u-lcZzIW7fH6GolRoTKsXEWh1gNJw";

// export function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const { t } = useTranslation();

//   const navigation = [
//     { name: t('nav.home'), href: '/' },
//     { name: t('nav.coworking'), href: '/coworking' },
//     { name: t('nav.incubator'), href: '/incubator' },
//     { name: t('nav.trainings'), href: '/training' },
//     { name: t('nav.even'), href: '/lounge' },
//     { name: t('nav.contact'), href: '/contact' },
//   ];

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 border-b glass-header">
//       <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 lg:h-20">
//           {/* Logo officiel */}
//           <Link to="/" className="flex items-center gap-2 flex-shrink-0">
//             {LOGO_URL ? (
//               <img 
//                 src={LOGO_URL} 
//                 alt="Malea Hub" 
//                 className="h-8 lg:h-10 w-auto object-contain"
//                 onError={(e) => {
//                   e.currentTarget.style.display = 'none';
//                   e.currentTarget.nextSibling.style.display = 'flex';
//                 }}
//               />
//             ) : null}
//             <div className="flex items-center" style={{ display: LOGO_URL ? 'none' : 'flex' }}>
//               <span className="text-xl lg:text-2xl font-bold tracking-tight">
//                 <span className="text-primary">Malea</span>
//                 <span className="text-foreground"> Hub</span>
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-8">
//             {navigation.map((item) => (
//               <Link
//                 key={item.href}
//                 to={item.href}
//                 className={`text-sm font-medium transition-colors hover:text-primary ${
//                   location.pathname === item.href ? 'text-primary' : 'text-muted-foreground'
//                 }`}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>

//           {/* Desktop Actions */}
//           <div className="hidden lg:flex items-center gap-3">
//             <ThemeToggle />
//             <LanguageSwitcher />
//             <a
//               href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25"
//             >
//               {t('footer.join_incubator')}
//             </a>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             type="button"
//             className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors text-foreground"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Menu"
//           >
//             {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="lg:hidden py-6 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
//             {/* Navigation Links */}
//             <div className="flex flex-col gap-2 mb-6">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.href}
//                   to={item.href}
//                   className={`text-base font-medium px-3 py-3 rounded-lg transition-all ${
//                     location.pathname === item.href 
//                       ? 'text-primary bg-primary/10' 
//                       : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
//                   }`}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </div>
            
//             {/* Actions Section */}
//             <div className="pt-4 border-t border-border/50">
//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-muted-foreground">Apparence</span>
//                   <div className="flex items-center gap-3">
//                     <ThemeToggle />
//                     <LanguageSwitcher />
//                   </div>
//                 </div>
                
//                 <a
//                   href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-full py-3 rounded-lg text-center text-sm font-semibold transition-all bg-primary text-primary-foreground hover:scale-[1.02] shadow-md"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   {t('footer.join_incubator')}
//                 </a>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }



import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.coworking'), href: '/coworking' },
    { name: t('nav.incubator'), href: '/incubator' },
    { name: t('nav.trainings'), href: '/training' },
    { name: t('nav.even'), href: '/lounge' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  // Sélection du logo en fonction du thème
  const logoSrc = theme === 'dark' ? '/maleblan.jpeg' : '/logowhite.png';    

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b glass-header">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo officiel avec changement selon le thème */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img 
              src={logoSrc} 
              alt="Malea Hub" 
              className="h-8 lg:h-10 w-auto object-contain"
              onError={(e) => {
                // Fallback au texte si l'image ne charge pas
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextSibling) {
                  e.currentTarget.nextSibling.style.display = 'flex';
                }
              }}
            />
            <div className="flex items-center hidden" style={{ display: 'none' }}>
              <span className="text-xl lg:text-2xl font-bold tracking-tight">
                <span className="text-primary">Malea</span>
                <span className="text-foreground"> Hub</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            <a
              href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25"
            >
              {t('footer.join_incubator')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
            {/* Navigation Links */}
            <div className="flex flex-col gap-2 mb-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-base font-medium px-3 py-3 rounded-lg transition-all ${
                    location.pathname === item.href 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Actions Section */}
            <div className="pt-4 border-t border-border/50">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Apparence</span>
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <LanguageSwitcher />
                  </div>
                </div>
                
                <a
                  href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg text-center text-sm font-semibold transition-all bg-primary text-primary-foreground hover:scale-[1.02] shadow-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('footer.join_incubator')}
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
