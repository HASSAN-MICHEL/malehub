



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
  const themeVersionRef = useRef(0);

  // 🔥 FORCER L'APPLICATION DU THÈME PAR DÉFAUT IMMÉDIATEMENT
  const applyDefaultTheme = () => {
    console.log('🎨 Application du thème par défaut immédiat');
    setVisualTheme({ ...DEFAULT_THEME });
    applyThemeToDOM(DEFAULT_THEME);
  };

  // 🔥 NETTOYER COMPLÈTEMENT LE CACHE
  const clearAllThemeCache = () => {
    try {
      const keys = Object.keys(localStorage);
      let clearedCount = 0;
      keys.forEach(key => {
        if (key.startsWith('visual_theme_cache_') || 
            key === 'theme_updated' || 
            key === 'theme_reset' ||
            key.includes('theme')) {
          localStorage.removeItem(key);
          clearedCount++;
          console.log(`🗑️ Cache supprimé: ${key}`);
        }
      });
      console.log(`✅ ${clearedCount} caches supprimés`);
      
      // Nettoyer aussi sessionStorage
      try {
        const sessionKeys = Object.keys(sessionStorage);
        sessionKeys.forEach(key => {
          if (key.includes('theme')) {
            sessionStorage.removeItem(key);
          }
        });
      } catch (e) {}
      
      // Incrémenter la version du thème pour forcer un rechargement
      themeVersionRef.current += 1;
      
    } catch (e) {
      console.warn('Erreur nettoyage cache:', e);
    }
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
      console.log(`🔄 Rechargement forcé du thème pour: ${pageSlug} (v${themeVersionRef.current + 1})`);
      // Réinitialiser l'état pour permettre un rechargement
      setInitialized(false);
      currentPageRef.current = null;
      
      // 🔥 NETTOYER LE CACHE AVANT DE CHARGER
      clearAllThemeCache();
      
      // 🔥 APPLIQUER LE THÈME PAR DÉFAUT IMMÉDIATEMENT POUR ÉVITER LE FLASH
      applyDefaultTheme();
      
      // Attendre que le DOM se mette à jour
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    loadingRef.current = true;
    setLoading(true);

    try {
      console.log(`📦 Chargement du thème pour: ${pageSlug}`);

      // 🔥 AJOUTER UN TIMESTAMP POUR ÉVITER LE CACHE HTTP
      const timestamp = Date.now();
      
      let globalTheme = {};
      let hasGlobalTheme = false;
      try {
        const globalRes = await contentAPI.getBlocks('__global__');
        const globalBlocks = globalRes.data?.data?.blocks || globalRes.data?.blocks || [];
        const globalThemeBlock = globalBlocks.find(b => b.bloc_key === '_global_theme');
        if (globalThemeBlock?.valeur_texte) {
          globalTheme = JSON.parse(globalThemeBlock.valeur_texte);
          hasGlobalTheme = true;
          console.log('🌍 Thème global chargé:', globalTheme);
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
          console.log(`📄 Thème de la page ${pageSlug} chargé:`, pageTheme);
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
      setInitialized(true);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  // 🔥 MÉTHODE : Réinitialiser le thème
  const resetTheme = async (pageSlug) => {
    if (isResetInProgress.current) {
      console.log('⏳ Réinitialisation déjà en cours');
      return;
    }

    isResetInProgress.current = true;
    console.log(`🔄 RÉINITIALISATION COMPLÈTE du thème pour: ${pageSlug}`);

    try {
      // 1. 🔥 NETTOYER TOUT LE CACHE
      clearAllThemeCache();
      
      // 2. 🔥 APPLIQUER LE THÈME PAR DÉFAUT IMMÉDIATEMENT
      applyDefaultTheme();
      
      // 3. Réinitialiser les références
      currentPageRef.current = null;
      setInitialized(false);
      
      // 4. Attendre que le DOM se mette à jour
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // 5. Recharger le thème avec forceReload
      await loadThemeForPage(pageSlug, true);

      console.log('✅ Thème réinitialisé avec succès');
      
      // 6. 🔥 FORCER UN DEUXIÈME RAFFRAÎCHISSEMENT APRÈS 500ms
      setTimeout(() => {
        console.log('🔄 Second rafraîchissement du thème');
        applyThemeToDOM(visualTheme);
      }, 500);

    } catch (error) {
      console.error('❌ Erreur lors de la réinitialisation:', error);
      applyDefaultTheme();
    } finally {
      isResetInProgress.current = false;
    }
  };

  // Appliquer le thème au DOM
  const applyThemeToDOM = (theme) => {
    const root = document.documentElement;
    
    console.log('🎨 Application du thème:', theme);

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

    console.log('✅ Thème appliqué au DOM');
  };

  // Charger le thème initial UNE SEULE FOIS
  useEffect(() => {
    if (!initialized && !loadingRef.current) {
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

  // 🔥 ÉCOUTER LES CHANGEMENTS DE STORAGE
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'theme_reset' || event.key === 'theme_updated') {
        console.log('🔄 Détection d\'un changement de thème via localStorage:', event.key);
        
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
        
        // 🔥 FORCER LE REBOOT COMPLET
        setTimeout(() => {
          resetTheme(pageSlug);
        }, 100);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 🔥 ÉCOUTER AUSSI LES MESSAGES POST (pour communication inter-onglets)
    const handleMessage = (event) => {
      if (event.data?.type === 'THEME_RESET') {
        console.log('🔄 Réinitialisation du thème détectée via BroadcastChannel');
        const path = window.location.pathname;
        let pageSlug = 'home';
        // ... même logique que ci-dessus
        setTimeout(() => {
          resetTheme(pageSlug);
        }, 100);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <VisualThemeContext.Provider value={{
      visualTheme,
      loading,
      loadThemeForPage,
      applyThemeToDOM,
      resetTheme,
      applyDefaultTheme,
      clearAllThemeCache,
      initialized
    }}>
      {children}
    </VisualThemeContext.Provider>
  );
};