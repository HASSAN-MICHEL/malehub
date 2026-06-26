// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { contentAPI } from '../services/admin';

// const VisualThemeContext = createContext();

// export const useVisualTheme = () => {
//   const context = useContext(VisualThemeContext);
//   if (!context) {
//     throw new Error('useVisualTheme must be used within a VisualThemeProvider');
//   }
//   return context;
// };

// // Thèmes par défaut
// const DEFAULT_THEME = {
//   primaryColor: '#3B82F6',
//   backgroundColor: '#FFFFFF',
//   foregroundColor: '#1F2937',
//   secondaryColor: '#6B7280',
//   cardColor: '#F9FAFB',
//   borderColor: '#E5E7EB',
//   fontHeading: 'Inter',
//   fontBody: 'Inter',
//   fontSizeBase: '16px',
//   fontSizeH1: '48px',
//   fontSizeH2: '36px',
//   fontSizeH3: '28px',
//   spacingSection: '80px',
//   spacingElement: '24px',
//   borderRadius: '8px',
// };

// export const VisualThemeProvider = ({ children }) => {
//   const [visualTheme, setVisualTheme] = useState(DEFAULT_THEME);
//   const [loading, setLoading] = useState(true);

//   // Récupérer le thème pour une page
//   const loadThemeForPage = async (pageSlug) => {
//     setLoading(true);
//     try {
//       console.log(`📦 Chargement du thème pour: ${pageSlug}`);

//       // 1. Récupérer le thème global
//       let globalTheme = {};
//       try {
//         const globalRes = await contentAPI.getBlocks('__global__');
//         const globalBlocks = globalRes.data?.data?.blocks || globalRes.data?.blocks || [];
//         const globalThemeBlock = globalBlocks.find(b => b.bloc_key === '_global_theme');
//         if (globalThemeBlock?.valeur_texte) {
//           globalTheme = JSON.parse(globalThemeBlock.valeur_texte);
//           console.log('🌍 Thème global chargé:', globalTheme);
//         }
//       } catch (e) {
//         console.warn('Erreur chargement thème global:', e);
//       }

//       // 2. Récupérer le thème de la page
//       let pageTheme = {};
//       try {
//         const pageRes = await contentAPI.getBlocks(pageSlug);
//         const pageBlocks = pageRes.data?.data?.blocks || pageRes.data?.blocks || [];
//         const pageThemeBlock = pageBlocks.find(b => b.bloc_key === '_theme');
//         if (pageThemeBlock?.valeur_texte) {
//           pageTheme = JSON.parse(pageThemeBlock.valeur_texte);
//           console.log(`📄 Thème de la page ${pageSlug} chargé:`, pageTheme);
//         }
//       } catch (e) {
//         console.warn('Erreur chargement thème page:', e);
//       }

//       // 3. Fusionner : le thème de la page écrase le thème global
//       const mergedTheme = { ...DEFAULT_THEME, ...globalTheme, ...pageTheme };
//       console.log('✅ Thème fusionné:', mergedTheme);
      
//       setVisualTheme(mergedTheme);
      
//       // 4. Appliquer le thème au DOM
//       applyThemeToDOM(mergedTheme);

//       return mergedTheme;
//     } catch (error) {
//       console.error('❌ Erreur chargement thème:', error);
//       setVisualTheme(DEFAULT_THEME);
//       applyThemeToDOM(DEFAULT_THEME);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Appliquer le thème au DOM via les variables CSS
//   const applyThemeToDOM = (theme) => {
//     const root = document.documentElement;
    
//     // Appliquer chaque propriété comme variable CSS
//     Object.entries(theme).forEach(([key, value]) => {
//       // Convertir camelCase en kebab-case
//       const cssVar = `--theme-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
//       root.style.setProperty(cssVar, value);
//     });

//     // Appliquer les polices
//     if (theme.fontBody) {
//       root.style.setProperty('--theme-font-body', theme.fontBody);
//       document.body.style.fontFamily = theme.fontBody;
//     }
//     if (theme.fontHeading) {
//       root.style.setProperty('--theme-font-heading', theme.fontHeading);
//     }

//     // Appliquer la couleur de fond
//     if (theme.backgroundColor) {
//       document.body.style.backgroundColor = theme.backgroundColor;
//     }

//     console.log('🎨 Thème appliqué au DOM');
//   };

//   // Charger le thème initial basé sur l'URL
//   useEffect(() => {
//     const path = window.location.pathname;
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
    
//     loadThemeForPage(pageSlug);
//   }, []);

//   return (
//     <VisualThemeContext.Provider value={{ 
//       visualTheme, 
//       loading, 
//       loadThemeForPage,
//       applyThemeToDOM
//     }}>
//       {children}
//     </VisualThemeContext.Provider>
//   );
// };





import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { contentAPI } from '../services/admin';

const VisualThemeContext = createContext();

export const useVisualTheme = () => {
  const context = useContext(VisualThemeContext);
  if (!context) {
    throw new Error('useVisualTheme must be used within a VisualThemeProvider');
  }
  return context;
};

// Thèmes par défaut
const DEFAULT_THEME = {
  primaryColor: '#3B82F6',
  backgroundColor: '#FFFFFF',
  foregroundColor: '#1F2937',
  secondaryColor: '#6B7280',
  cardColor: '#F9FAFB',
  borderColor: '#E5E7EB',
  fontHeading: 'Inter',
  fontBody: 'Inter',
  fontSizeBase: '16px',
  fontSizeH1: '48px',
  fontSizeH2: '36px',
  fontSizeH3: '28px',
  spacingSection: '80px',
  spacingElement: '24px',
  borderRadius: '8px',
};

export const VisualThemeProvider = ({ children }) => {
  const [visualTheme, setVisualTheme] = useState(DEFAULT_THEME);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const loadingRef = useRef(false);
  const currentPageRef = useRef(null);

  // Récupérer le thème pour une page
  const loadThemeForPage = async (pageSlug) => {
    // 🔥 ÉVITER LES APPELS CONCURRENTIELS
    if (loadingRef.current) {
      console.log(`⏳ Chargement déjà en cours pour ${pageSlug}, ignoré`);
      return;
    }

    // 🔥 ÉVITER DE RECHARGER LA MÊME PAGE
    if (currentPageRef.current === pageSlug && initialized) {
      console.log(`✅ Thème déjà chargé pour ${pageSlug}, ignoré`);
      return;
    }

    loadingRef.current = true;
    setLoading(true);

    try {
      console.log(`📦 Chargement du thème pour: ${pageSlug}`);

      // 1. Récupérer le thème global
      let globalTheme = {};
      try {
        const globalRes = await contentAPI.getBlocks('__global__');
        const globalBlocks = globalRes.data?.data?.blocks || globalRes.data?.blocks || [];
        const globalThemeBlock = globalBlocks.find(b => b.bloc_key === '_global_theme');
        if (globalThemeBlock?.valeur_texte) {
          globalTheme = JSON.parse(globalThemeBlock.valeur_texte);
          console.log('🌍 Thème global chargé');
        }
      } catch (e) {
        console.warn('Erreur chargement thème global:', e.message);
        // Ne pas bloquer si le thème global n'existe pas
      }

      // 2. Récupérer le thème de la page
      let pageTheme = {};
      try {
        const pageRes = await contentAPI.getBlocks(pageSlug);
        const pageBlocks = pageRes.data?.data?.blocks || pageRes.data?.blocks || [];
        const pageThemeBlock = pageBlocks.find(b => b.bloc_key === '_theme');
        if (pageThemeBlock?.valeur_texte) {
          pageTheme = JSON.parse(pageThemeBlock.valeur_texte);
          console.log(`📄 Thème de la page ${pageSlug} chargé`);
        }
      } catch (e) {
        console.warn('Erreur chargement thème page:', e.message);
        // Ne pas bloquer si le thème de la page n'existe pas
      }

      // 3. Fusionner
      const mergedTheme = { ...DEFAULT_THEME, ...globalTheme, ...pageTheme };
      console.log('✅ Thème fusionné');
      
      setVisualTheme(mergedTheme);
      currentPageRef.current = pageSlug;
      setInitialized(true);
      
      // 4. Appliquer le thème au DOM
      applyThemeToDOM(mergedTheme);

    } catch (error) {
      console.error('❌ Erreur chargement thème:', error);
      // En cas d'erreur, utiliser le thème par défaut
      setVisualTheme(DEFAULT_THEME);
      applyThemeToDOM(DEFAULT_THEME);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  // Appliquer le thème au DOM via les variables CSS
  const applyThemeToDOM = (theme) => {
    const root = document.documentElement;
    
    Object.entries(theme).forEach(([key, value]) => {
      const cssVar = `--theme-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });

    if (theme.fontBody) {
      document.body.style.fontFamily = theme.fontBody;
    }
    if (theme.backgroundColor) {
      document.body.style.backgroundColor = theme.backgroundColor;
    }

    console.log('🎨 Thème appliqué au DOM');
  };

  // Charger le thème initial UNE SEULE FOIS
  useEffect(() => {
    if (!initialized) {
      const path = window.location.pathname;
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
      }
      
      loadThemeForPage(pageSlug);
    }
  }, [initialized]);

  return (
    <VisualThemeContext.Provider value={{ 
      visualTheme, 
      loading, 
      loadThemeForPage,
      applyThemeToDOM,
      initialized
    }}>
      {children}
    </VisualThemeContext.Provider>
  );
};