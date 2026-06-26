



// import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
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
//   const [loading, setLoading] = useState(false);
//   const [initialized, setInitialized] = useState(false);
//   const loadingRef = useRef(false);
//   const currentPageRef = useRef(null);

//   const loadThemeForPage = async (pageSlug) => {
//     if (loadingRef.current) {
//       console.log(`⏳ Chargement déjà en cours pour ${pageSlug}, ignoré`);
//       return;
//     }

//     if (currentPageRef.current === pageSlug && initialized) {
//       console.log(`✅ Thème déjà chargé pour ${pageSlug}, ignoré`);
//       return;
//     }

//     loadingRef.current = true;
//     setLoading(true);

//     try {
//       console.log(`📦 Chargement du thème pour: ${pageSlug}`);

//       let globalTheme = {};
//       try {
//         const globalRes = await contentAPI.getBlocks('__global__');
//         const globalBlocks = globalRes.data?.data?.blocks || globalRes.data?.blocks || [];
//         const globalThemeBlock = globalBlocks.find(b => b.bloc_key === '_global_theme');
//         if (globalThemeBlock?.valeur_texte) {
//           globalTheme = JSON.parse(globalThemeBlock.valeur_texte);
//           console.log('🌍 Thème global chargé');
//         }
//       } catch (e) {
//         console.warn('Erreur chargement thème global:', e.message);
//       }

//       let pageTheme = {};
//       try {
//         const pageRes = await contentAPI.getBlocks(pageSlug);
//         const pageBlocks = pageRes.data?.data?.blocks || pageRes.data?.blocks || [];
//         const pageThemeBlock = pageBlocks.find(b => b.bloc_key === '_theme');
//         if (pageThemeBlock?.valeur_texte) {
//           pageTheme = JSON.parse(pageThemeBlock.valeur_texte);
//           console.log(`📄 Thème de la page ${pageSlug} chargé`);
//         }
//       } catch (e) {
//         console.warn('Erreur chargement thème page:', e.message);
//       }

//       const mergedTheme = { ...DEFAULT_THEME, ...globalTheme, ...pageTheme };
//       console.log('✅ Thème fusionné');

//       setVisualTheme(mergedTheme);
//       currentPageRef.current = pageSlug;
//       setInitialized(true);

//       // 🔥 APPLIQUER LE THÈME AUX DEUX SYSTÈMES DE VARIABLES
//       applyThemeToDOM(mergedTheme);

//     } catch (error) {
//       console.error('❌ Erreur chargement thème:', error);
//       setVisualTheme(DEFAULT_THEME);
//       applyThemeToDOM(DEFAULT_THEME);
//     } finally {
//       loadingRef.current = false;
//       setLoading(false);
//     }
//   };

//   // 🔥 NOUVELLE VERSION : Met à jour les variables Tailwind ET les variables du thème
//   const applyThemeToDOM = (theme) => {
//     const root = document.documentElement;
    
//     // 1. Mettre à jour les variables du thème admin (préfixées par --theme-)
//     Object.entries(theme).forEach(([key, value]) => {
//       const cssVar = `--theme-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
//       root.style.setProperty(cssVar, value);
//     });

//     // 🔥 2. METTRE À JOUR LES VARIABLES TAILWIND
//     // Ces variables sont utilisées par les classes Tailwind via @theme inline
//     root.style.setProperty('--primary', theme.primaryColor);
//     root.style.setProperty('--background', theme.backgroundColor);
//     root.style.setProperty('--foreground', theme.foregroundColor);
//     root.style.setProperty('--card', theme.cardColor);
//     root.style.setProperty('--border', theme.borderColor);
//     root.style.setProperty('--secondary', theme.secondaryColor);
    
//     // 3. Appliquer les polices
//     if (theme.fontBody) {
//       document.body.style.fontFamily = theme.fontBody;
//     }

//     // 4. Appliquer la couleur de fond du body
//     if (theme.backgroundColor) {
//       document.body.style.backgroundColor = theme.backgroundColor;
//     }

//     console.log('🎨 Thème appliqué au DOM (Tailwind + Admin)');
//   };

//   // Charger le thème initial UNE SEULE FOIS
//   useEffect(() => {
//     if (!initialized) {
//       const path = window.location.pathname;
//       let pageSlug = 'home';

//       if (path === '/') {
//         pageSlug = 'home';
//       } else if (path.startsWith('/coworking')) {
//         pageSlug = 'coworking';
//       } else if (path.startsWith('/incubator')) {
//         pageSlug = 'incubator';
//       } else if (path.startsWith('/training')) {
//         pageSlug = 'training';
//       } else if (path.startsWith('/lounge')) {
//         pageSlug = 'lounge';
//       } else if (path.startsWith('/events')) {
//         pageSlug = 'events';
//       } else if (path.startsWith('/contact')) {
//         pageSlug = 'contact';
//       } else if (path.startsWith('/library')) {
//         pageSlug = 'library';
//       }

//       loadThemeForPage(pageSlug);
//     }
//   }, [initialized]);

//   return (
//     <VisualThemeContext.Provider value={{
//       visualTheme,
//       loading,
//       loadThemeForPage,
//       applyThemeToDOM,
//       initialized
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
  const isResetInProgress = useRef(false);

  // 🔥 FORCER L'APPLICATION DU THÈME PAR DÉFAUT IMMÉDIATEMENT
  const applyDefaultTheme = () => {
    console.log('🎨 Application du thème par défaut immédiat');
    setVisualTheme(DEFAULT_THEME);
    applyThemeToDOM(DEFAULT_THEME);
  };

  const loadThemeForPage = async (pageSlug, forceReload = false) => {
    // Si forceReload est true, on ignore les vérifications de cache
    if (!forceReload) {
      if (loadingRef.current) {
        console.log(`⏳ Chargement déjà en cours pour ${pageSlug}, ignoré`);
        return;
      }

      if (currentPageRef.current === pageSlug && initialized) {
        console.log(`✅ Thème déjà chargé pour ${pageSlug}, ignoré`);
        return;
      }
    } else {
      console.log(`🔄 Rechargement forcé du thème pour: ${pageSlug}`);
      // Réinitialiser l'état pour permettre un rechargement
      setInitialized(false);
      currentPageRef.current = null;
      
      // 🔥 APPLIQUER LE THÈME PAR DÉFAUT IMMÉDIATEMENT POUR ÉVITER LE FLASH
      applyDefaultTheme();
    }

    loadingRef.current = true;
    setLoading(true);

    try {
      console.log(`📦 Chargement du thème pour: ${pageSlug}`);

      let globalTheme = {};
      let hasGlobalTheme = false;
      try {
        const globalRes = await contentAPI.getBlocks('__global__');
        const globalBlocks = globalRes.data?.data?.blocks || globalRes.data?.blocks || [];
        const globalThemeBlock = globalBlocks.find(b => b.bloc_key === '_global_theme');
        if (globalThemeBlock?.valeur_texte) {
          globalTheme = JSON.parse(globalThemeBlock.valeur_texte);
          hasGlobalTheme = true;
          console.log('🌍 Thème global chargé');
        } else {
          console.log('🌍 Aucun thème global trouvé');
        }
      } catch (e) {
        console.warn('Erreur chargement thème global:', e.message);
      }

      let pageTheme = {};
      let hasPageTheme = false;
      try {
        const pageRes = await contentAPI.getBlocks(pageSlug);
        const pageBlocks = pageRes.data?.data?.blocks || pageRes.data?.blocks || [];
        const pageThemeBlock = pageBlocks.find(b => b.bloc_key === '_theme');
        if (pageThemeBlock?.valeur_texte) {
          pageTheme = JSON.parse(pageThemeBlock.valeur_texte);
          hasPageTheme = true;
          console.log(`📄 Thème de la page ${pageSlug} chargé`);
        } else {
          console.log(`📄 Aucun thème spécifique trouvé pour ${pageSlug}`);
        }
      } catch (e) {
        console.warn('Erreur chargement thème page:', e.message);
      }

      // 🔥 SI AUCUN THÈME N'EST TROUVÉ, UTILISER DEFAULT_THEME
      let mergedTheme;
      if (!hasGlobalTheme && !hasPageTheme) {
        console.log('📌 Aucun thème trouvé, utilisation du thème par défaut');
        mergedTheme = { ...DEFAULT_THEME };
      } else {
        mergedTheme = { ...DEFAULT_THEME, ...globalTheme, ...pageTheme };
      }
      
      console.log('✅ Thème fusionné:', mergedTheme);

      setVisualTheme(mergedTheme);
      currentPageRef.current = pageSlug;
      setInitialized(true);

      // Appliquer le thème aux deux systèmes de variables
      applyThemeToDOM(mergedTheme);

      return mergedTheme;

    } catch (error) {
      console.error('❌ Erreur chargement thème:', error);
      // En cas d'erreur, utiliser le thème par défaut
      applyDefaultTheme();
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  // 🔥 NOUVELLE MÉTHODE : Réinitialiser le thème (forcer le rechargement)
  const resetTheme = async (pageSlug) => {
    if (isResetInProgress.current) {
      console.log('⏳ Réinitialisation déjà en cours');
      return;
    }
    
    isResetInProgress.current = true;
    console.log(`🔄 Réinitialisation du thème pour: ${pageSlug}`);
    
    try {
      // 1. 🔥 APPLIQUER LE THÈME PAR DÉFAUT IMMÉDIATEMENT
      applyDefaultTheme();
      
      // 2. Vider le cache
      currentPageRef.current = null;
      setInitialized(false);
      
      // 3. Supprimer tous les caches localStorage
      try {
        // Supprimer tous les caches de thème
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith('visual_theme_cache_') || key === 'theme_updated') {
            localStorage.removeItem(key);
            console.log(`🗑️ Cache supprimé: ${key}`);
          }
        });
      } catch (e) {
        console.warn('Erreur suppression cache:', e);
      }
      
      // 4. Attendre un court instant pour que le DOM se mette à jour
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 5. Recharger le thème avec forceReload
      await loadThemeForPage(pageSlug, true);
      
      console.log('✅ Thème réinitialisé avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de la réinitialisation:', error);
      // En cas d'erreur, rester sur le thème par défaut
      applyDefaultTheme();
    } finally {
      isResetInProgress.current = false;
    }
  };

  // Appliquer le thème au DOM
  const applyThemeToDOM = (theme) => {
    const root = document.documentElement;
    
    // 1. Mettre à jour les variables du thème admin (préfixées par --theme-)
    Object.entries(theme).forEach(([key, value]) => {
      const cssVar = `--theme-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });

    // 2. METTRE À JOUR LES VARIABLES TAILWIND
    root.style.setProperty('--primary', theme.primaryColor);
    root.style.setProperty('--background', theme.backgroundColor);
    root.style.setProperty('--foreground', theme.foregroundColor);
    root.style.setProperty('--card', theme.cardColor);
    root.style.setProperty('--border', theme.borderColor);
    root.style.setProperty('--secondary', theme.secondaryColor);
    
    // 3. Appliquer les polices
    if (theme.fontBody) {
      document.body.style.fontFamily = theme.fontBody;
    }

    // 4. Appliquer la couleur de fond du body
    if (theme.backgroundColor) {
      document.body.style.backgroundColor = theme.backgroundColor;
    }

    console.log('🎨 Thème appliqué au DOM (Tailwind + Admin)');
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

  // 🔥 ÉCOUTER LES CHANGEMENTS DE STORAGE (pour les mises à jour depuis l'admin)
  useEffect(() => {
    const handleStorageChange = (event) => {
      // Si un changement de thème est détecté dans localStorage
      if (event.key === 'theme_updated' || event.key === 'theme_reset') {
        console.log('🔄 Détection d\'un changement de thème via localStorage');
        
        // Si c'est un reset, appliquer le thème par défaut immédiatement
        if (event.key === 'theme_reset') {
          applyDefaultTheme();
        }
        
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
        
        // Forcer le rechargement
        setTimeout(() => {
          loadThemeForPage(pageSlug, true);
        }, 200);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <VisualThemeContext.Provider value={{
      visualTheme,
      loading,
      loadThemeForPage,
      applyThemeToDOM,
      resetTheme,
      applyDefaultTheme,
      initialized
    }}>
      {children}
    </VisualThemeContext.Provider>
  );
};