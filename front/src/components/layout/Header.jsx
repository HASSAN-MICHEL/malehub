

// import { Link, useLocation } from 'react-router-dom';
// import { useState } from 'react';
// import { Menu, X, Shield } from 'lucide-react';
// import { useAdminAuth } from '../../contexts/adminContext';
// import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from '../ui/LanguageSwitcher'; // Ajustez le chemin selon votre structure

// export function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const { user } = useAdminAuth();
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
            
//             {/* Bouton Admin - visible seulement si connecté */}
//             {user && (
//               <Link
//                 to="/admin"
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//                 style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6' }}
//               >
//                 <Shield className="h-4 w-4" />
//                 {t('buttons.admin')}
//               </Link>
//             )}
            
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
              
//               {/* Language Switcher for mobile */}
//               <div className="py-2">
//                 <LanguageSwitcher />
//               </div>
              
//               {/* Admin link in mobile menu */}
//               {user && (
//                 <Link
//                   to="/admin"
//                   className="flex items-center gap-2 text-base font-medium py-2"
//                   style={{ color: '#8B5CF6' }}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   <Shield className="h-4 w-4" />
//                   {t('buttons.administration')}
//                 </Link>
//               )}
              
//               <a
//                 href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-2 w-full py-3 rounded-lg text-center text-sm font-semibold bg-primary text-primary-foreground"
//               >
//                 {t('footer.join_incubator')}
//               </a>
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
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl lg:text-2xl font-bold tracking-tight">
              <span className="text-primary">Malea</span>
              <span className="text-foreground"> Hub</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium transition-colors"
                style={{ 
                  color: location.pathname === item.href 
                    ? 'var(--primary)' 
                    : 'var(--muted-foreground)' 
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = location.pathname === item.href 
                  ? 'var(--primary)' 
                  : 'var(--muted-foreground)'
                }
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            <a
              href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 bg-primary text-primary-foreground"
            >
              {t('footer.join_incubator')}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-base font-medium py-2 text-muted-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* 2 colonnes pour Language Switcher et Join Incubator sur mobile */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex justify-start">
                  <LanguageSwitcher />
                </div>
                
                <a
                  href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg text-center text-sm font-semibold bg-primary text-primary-foreground"
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