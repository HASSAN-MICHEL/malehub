// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useVisualTheme } from '../../contexts/VisualThemeContext';

// export const ThemeAwareLayout = ({ children }) => {
//   const { loadThemeForPage } = useVisualTheme();
//   const location = useLocation();

//   useEffect(() => {
//     const path = location.pathname;
//     let pageSlug = 'home';
    
//     if (path === '/') {
//       pageSlug = 'home';
//     } else if (path.startsWith('/coworking')) {
//       pageSlug = 'coworking';
//     } else if (path.startsWith('/incubator')) {
//       pageSlug = 'incubator';
//     } else if (path.startsWith('/training')) {
//       pageSlug = 'training';
//     } else if (path.startsWith('/lounge')) {
//       pageSlug = 'lounge';
//     } else if (path.startsWith('/events')) {
//       pageSlug = 'events';
//     } else if (path.startsWith('/contact')) {
//       pageSlug = 'contact';
//     } else if (path.startsWith('/library')) {
//       pageSlug = 'library';
//     }
    
//     console.log(`🔄 Changement de page: ${path} -> ${pageSlug}`);
//     loadThemeForPage(pageSlug);
//   }, [location, loadThemeForPage]);

//   return <>{children}</>;
// };


import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useVisualTheme } from '../../contexts/VisualThemeContext';

export const ThemeAwareLayout = ({ children }) => {
  const { loadThemeForPage, visualTheme } = useVisualTheme();
  const location = useLocation();
  const lastLoadedPage = useRef(null);

  useEffect(() => {
    const path = location.pathname;
    let pageSlug = 'home';
    
    if (path === '/') {
      pageSlug = 'home';
    } else if (path.startsWith('/coworking')) {
      pageSlug = 'coworking';
    } else if (path.startsWith('/incubator')) {
      pageSlug = 'incubator';
    } else if (path.startsWith('/training')) {
      pageSlug = 'training';
    } else if (path.startsWith('/lounge')) {
      pageSlug = 'lounge';
    } else if (path.startsWith('/events')) {
      pageSlug = 'events';
    } else if (path.startsWith('/contact')) {
      pageSlug = 'contact';
    } else if (path.startsWith('/library')) {
      pageSlug = 'library';
    } else {
      // Si ce n'est pas une page connue, ne pas charger de thème
      return;
    }

    // 🔥 ÉVITER LES APPELS EN BOUCLE : ne charger que si la page a changé
    if (lastLoadedPage.current !== pageSlug) {
      console.log(`🔄 Chargement du thème pour: ${pageSlug}`);
      lastLoadedPage.current = pageSlug;
      loadThemeForPage(pageSlug);
    }
  }, [location, loadThemeForPage]);

  return <>{children}</>;
};