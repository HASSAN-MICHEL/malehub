

// import { Link, useLocation } from 'react-router-dom';
// import { useState } from 'react';
// import { Menu, X } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from '../ui/LanguageSwitcher';

// export function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const { t } = useTranslation();

//   const navigation = [
//     { name: t('nav.home'), href: '/' },
//     { name: t('nav.coworking'), href: '/coworking' },
//     { name: t('nav.incubator'), href: '/incubator' },
//     { name: t('nav.trainings'), href: '/training' },
//     { name: t('nav.lounge'), href: '/lounge' },
//     { name: t('nav.contact'), href: '/contact' },
//   ];

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 border-b glass-header">
//       <nav className="container mx-auto px-4 lg:px-8">
//         <div className="flex items-center justify-between h-16 lg:h-20">
//           <Link to="/" className="flex items-center gap-2">
//             <span className="text-xl lg:text-2xl font-bold tracking-tight">
//               <span className="text-primary">Malea</span>
//               <span className="text-foreground"> Hub</span>
//             </span>
//           </Link>

//           <div className="hidden lg:flex items-center gap-8">
//             {navigation.map((item) => (
//               <Link
//                 key={item.href}
//                 to={item.href}
//                 className="text-sm font-medium transition-colors"
//                 style={{ 
//                   color: location.pathname === item.href 
//                     ? 'var(--primary)' 
//                     : 'var(--muted-foreground)' 
//                 }}
//                 onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
//                 onMouseLeave={e => e.currentTarget.style.color = location.pathname === item.href 
//                   ? 'var(--primary)' 
//                   : 'var(--muted-foreground)'
//                 }
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>

//           <div className="hidden lg:flex items-center gap-4">
//             {/* Language Switcher */}
//             <LanguageSwitcher />
            
//             <a
//               href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 bg-primary text-primary-foreground"
//             >
//               {t('footer.join_incubator')}
//             </a>
//           </div>

//           {/* Mobile menu button */}
//           <button
//             type="button"
//             className="lg:hidden p-2 text-foreground"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>

//         {/* Mobile menu */}
//         {mobileMenuOpen && (
//           <div className="lg:hidden py-4 border-t border-border/50">
//             <div className="flex flex-col gap-4">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.href}
//                   to={item.href}
//                   className="text-base font-medium py-2 text-muted-foreground"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
              
//               {/* 2 colonnes pour Language Switcher et Join Incubator sur mobile */}
//               <div className="grid grid-cols-2 gap-3 pt-2">
//                 <div className="flex justify-start">
//                   <LanguageSwitcher />
//                 </div>
                
//                 <a
//                   href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-full py-2.5 rounded-lg text-center text-sm font-semibold bg-primary text-primary-foreground"
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

// // VERSION AVEC Switch sur

import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.coworking'), href: '/coworking' },
    { name: t('nav.incubator'), href: '/incubator' },
    { name: t('nav.trainings'), href: '/training' },
    { name: t('nav.lounge'), href: '/lounge' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b glass-header">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl lg:text-2xl font-bold tracking-tight">
              <span className="text-primary">Malea</span>
              <span className="text-foreground"> Hub</span>
            </span>
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
                {/* Theme and Language Row */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Apparence</span>
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <LanguageSwitcher />
                  </div>
                </div>
                
                {/* Join Button */}
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