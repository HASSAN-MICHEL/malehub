// import { useState, useEffect, useCallback } from 'react';
// import { cmsAPI } from '../services/client';

// export function useContent(pageSlug) {
//   const [blocks, setBlocks] = useState({});
//   const [loading, setLoading] = useState(true);

//   const fetchBlocks = useCallback(async () => {
//     if (!pageSlug) { setLoading(false); return; }
//     try {
//       const res = await cmsAPI.getPageContent(pageSlug);
//       // Backend: { status, data: { blocks: [...] } }
//       const arr = res.data?.data?.blocks ?? res.data?.blocks ?? [];
//       const map = {};
//       arr.forEach((b) => {
//         if (b.actif !== false) map[b.bloc_key] = b.valeur_texte ?? '';
//       });
//       setBlocks(map);
//     } catch (err) {
//       // Silently fail — pages fall back to hardcoded defaults
//       console.warn(`[useContent] Could not load content for "${pageSlug}":`, err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [pageSlug]);

//   useEffect(() => { fetchBlocks(); }, [fetchBlocks]);

//   // get(key, fallback) — returns CMS value or fallback if not set
//   const get = useCallback(
//     (key, fallback = '') => (blocks[key] !== undefined && blocks[key] !== '' ? blocks[key] : fallback),
//     [blocks]
//   );

//   return { get, blocks, loading };
// }

// export function useSettings() {
//   const [settings, setSettings] = useState({});
//   const [loading, setLoading] = useState(true);

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
//     (key, fallback = '') => (settings[key] !== undefined && settings[key] !== '' ? settings[key] : fallback),
//     [settings]
//   );

//   return { setting, settings, loading };
// }




import { useState, useEffect, useCallback } from 'react';
import { cmsAPI } from '../services/client';

/**
 * useContent(pageSlug)
 *
 * Lit les content_blocks pour une page depuis le CMS.
 * Expose get(key, fallback) qui retourne :
 *   - media_url  si le bloc est de type image (media_url non vide)
 *   - valeur_texte  sinon
 *
 * BUG CORRIGÉ : l'ancien hook ignorait media_url, les images uploadées
 * étaient stockées dans media_url côté BD mais le hook ne les lisait pas,
 * d'où un espace vide sur le client.
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
          media: b.media_url    ?? '',   // ← CORRECTION : on stocke aussi media_url
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

  /**
   * get(key, fallback?)
   * Pour un champ texte → retourne valeur_texte ou fallback
   * Pour un champ image → retourne media_url (priorité) ou valeur_texte (URL manuelle) ou fallback
   */
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
    (key, fallback = '') => blocks[key]?.text || fallback,
    [blocks]
  );

  /** getMedia(key, fallback) — force lecture media_url uniquement */
  const getMedia = useCallback(
    (key, fallback = '') => blocks[key]?.media || fallback,
    [blocks]
  );

  return { get, getText, getMedia, blocks, loading, refetch: fetchBlocks };
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