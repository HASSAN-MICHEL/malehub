
// import { useState, useEffect, useCallback } from 'react';
// import { cmsAPI } from '../services/client';


// export function useContent(pageSlug) {
//   const [blocks, setBlocks]   = useState({});   // { bloc_key: { text, media } }
//   const [loading, setLoading] = useState(true);

//   const fetchBlocks = useCallback(async () => {
//     if (!pageSlug) { setLoading(false); return; }
//     try {
//       const res = await cmsAPI.getPageContent(pageSlug);
//       // Backend: { status:'success', data:{ blocks:[...] } }
//       const arr = res.data?.data?.blocks ?? res.data?.blocks ?? [];
//       const map = {};
//       arr.forEach((b) => {
//         if (b.actif === false) return;
//         map[b.bloc_key] = {
//           text:  b.valeur_texte ?? '',
//           media: b.media_url    ?? '',   // ← CORRECTION : on stocke aussi media_url
//         };
//       });
//       setBlocks(map);
//     } catch (err) {
//       console.warn(`[useContent] "${pageSlug}":`, err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [pageSlug]);

//   useEffect(() => { fetchBlocks(); }, [fetchBlocks]);

  
//   const get = useCallback(
//     (key, fallback = '') => {
//       const b = blocks[key];
//       if (!b) return fallback;
//       // Si media_url est renseigné, c'est une image uploadée → priorité absolue
//       if (b.media && b.media.trim() !== '') return b.media;
//       // Sinon retourne le texte (qui peut être une URL externe saisie manuellement)
//       if (b.text && b.text.trim() !== '') return b.text;
//       return fallback;
//     },
//     [blocks]
//   );

//   /** getText(key, fallback) — force lecture valeur_texte uniquement */
//   const getText = useCallback(
//     (key, fallback = '') => blocks[key]?.text || fallback,
//     [blocks]
//   );

//   /** getMedia(key, fallback) — force lecture media_url uniquement */
//   const getMedia = useCallback(
//     (key, fallback = '') => blocks[key]?.media || fallback,
//     [blocks]
//   );

//   return { get, getText, getMedia, blocks, loading, refetch: fetchBlocks };
// }

// /**
//  * useSettings()
//  * Lit les settings globaux (WhatsApp, adresse, Jobs Week…)
//  */
// export function useSettings() {
//   const [settings, setSettings] = useState({});
//   const [loading, setLoading]   = useState(true);

//   useEffect(() => {
//     cmsAPI.getSettings()
//       .then((res) => {
//         const arr = res.data?.data?.settings ?? res.data?.settings ?? [];
//         const map = {};
//         arr.forEach((s) => { map[s.cle] = s.valeur ?? ''; });
//         setSettings(map);
//       })
//       .catch((err) => console.warn('[useSettings]', err.message))
//       .finally(() => setLoading(false));
//   }, []);

//   const setting = useCallback(
//     (key, fallback = '') => (settings[key] != null && settings[key] !== '' ? settings[key] : fallback),
//     [settings]
//   );

//   return { setting, settings, loading };
// }

// /**
//  * useAnnouncements()
//  * Lit les annonces actives depuis le backend
//  */
// export function useAnnouncements() {
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     cmsAPI.getAnnouncements()
//       .then((res) => {
//         const arr = res.data?.data?.announcements ?? res.data?.announcements ?? [];
//         setAnnouncements(arr);
//       })
//       .catch((err) => console.warn('[useAnnouncements]', err.message))
//       .finally(() => setLoading(false));
//   }, []);

//   return { announcements, loading };
// }

// /**
//  * useTeam()
//  * Lit les membres de l'équipe actifs depuis le backend
//  */
// export function useTeam() {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     cmsAPI.getTeam()
//       .then((res) => {
//         const arr = res.data?.data?.members ?? res.data?.members ?? [];
//         setMembers(arr);
//       })
//       .catch((err) => console.warn('[useTeam]', err.message))
//       .finally(() => setLoading(false));
//   }, []);

//   return { members, loading };
// }


import { useState, useEffect, useCallback } from 'react';
import { cmsAPI } from '../services/client';

/**
 * useContent(pageSlug)
 * Lit les blocs de contenu d'une page (textes, images, listes JSON, thème)
 */
export function useContent(pageSlug) {
  const [blocks, setBlocks]   = useState({});   // { bloc_key: { text, media } }
  const [loading, setLoading] = useState(true);

  const fetchBlocks = useCallback(async () => {
    if (!pageSlug) { setLoading(false); return; }
    try {
      const res = await cmsAPI.getPageContent(pageSlug);
      // Backend: { status:'success', data:{ blocks:[...] } }
      const arr = res.data?.data?.blocks ?? res.data?.blocks ?? [];
      const map = {};
      arr.forEach((b) => {
        if (b.actif === false) return;
        map[b.bloc_key] = {
          text:  b.valeur_texte ?? '',
          media: b.media_url    ?? '',   // ← on stocke aussi media_url
        };
      });
      setBlocks(map);
    } catch (err) {
      console.warn(`[useContent] "${pageSlug}":`, err.message);
    } finally {
      setLoading(false);
    }
  }, [pageSlug]);

  useEffect(() => { fetchBlocks(); }, [fetchBlocks]);

  /** get(key, fallback) — lecture "intelligente" (media_url en priorité, sinon valeur_texte) */
  const get = useCallback(
    (key, fallback = '') => {
      const b = blocks[key];
      if (!b) return fallback;
      // Si media_url est renseigné, c'est une image uploadée → priorité absolue
      if (b.media && b.media.trim() !== '') return b.media;
      // Sinon retourne le texte (qui peut être une URL externe saisie manuellement)
      if (b.text && b.text.trim() !== '') return b.text;
      return fallback;
    },
    [blocks]
  );

  /** getText(key, fallback) — force lecture valeur_texte uniquement */
  const getText = useCallback(
    (key, fallback = '') => (blocks[key]?.text && blocks[key].text.trim() !== '' ? blocks[key].text : fallback),
    [blocks]
  );

  /** getMedia(key, fallback) — force lecture media_url uniquement */
  const getMedia = useCallback(
    (key, fallback = '') => (blocks[key]?.media && blocks[key].media.trim() !== '' ? blocks[key].media : fallback),
    [blocks]
  );

  /**
   * getJSON(key, fallback)
   * Lit un bloc dont valeur_texte contient un tableau JSON
   * (ex: investor_benefits, investor_stats, jobsweek_benefits, jobsweek_included_items)
   * Retourne `fallback` si le bloc est vide, absent, invalide ou tableau vide.
   */
  const getJSON = useCallback(
    (key, fallback = []) => {
      const raw = blocks[key]?.text;
      if (!raw || raw.trim() === '') return fallback;
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
      } catch (err) {
        console.warn(`[useContent] JSON invalide pour "${key}":`, err.message);
        return fallback;
      }
    },
    [blocks]
  );

  /**
   * getTheme()
   * Lit le bloc spécial "_theme" (couleurs / polices propres à cette page)
   * Retourne un objet { primaryColor, backgroundColor, foregroundColor,
   * cardColor, mutedForegroundColor, fontHeading, fontBody } ou null si absent.
   */
  const getTheme = useCallback(() => {
    const raw = blocks['_theme']?.text;
    if (!raw || raw.trim() === '') return null;
    try {
      const parsed = JSON.parse(raw);
      return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : null;
    } catch (err) {
      console.warn('[useContent] Thème invalide:', err.message);
      return null;
    }
  }, [blocks]);

  return { get, getText, getMedia, getJSON, getTheme, blocks, loading, refetch: fetchBlocks };
}

/**
 * useSettings()
 * Lit les settings globaux (WhatsApp, adresse, Jobs Week…)
 */
export function useSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    cmsAPI.getSettings()
      .then((res) => {
        const arr = res.data?.data?.settings ?? res.data?.settings ?? [];
        const map = {};
        arr.forEach((s) => { map[s.cle] = s.valeur ?? ''; });
        setSettings(map);
      })
      .catch((err) => console.warn('[useSettings]', err.message))
      .finally(() => setLoading(false));
  }, []);

  const setting = useCallback(
    (key, fallback = '') => (settings[key] != null && settings[key] !== '' ? settings[key] : fallback),
    [settings]
  );

  return { setting, settings, loading };
}

/**
 * useAnnouncements()
 * Lit les annonces actives depuis le backend
 */
export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cmsAPI.getAnnouncements()
      .then((res) => {
        const arr = res.data?.data?.announcements ?? res.data?.announcements ?? [];
        setAnnouncements(arr);
      })
      .catch((err) => console.warn('[useAnnouncements]', err.message))
      .finally(() => setLoading(false));
  }, []);

  return { announcements, loading };
}

/**
 * useTeam()
 * Lit les membres de l'équipe actifs depuis le backend
 */
export function useTeam() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cmsAPI.getTeam()
      .then((res) => {
        const arr = res.data?.data?.members ?? res.data?.members ?? [];
        setMembers(arr);
      })
      .catch((err) => console.warn('[useTeam]', err.message))
      .finally(() => setLoading(false));
  }, []);

  return { members, loading };
}