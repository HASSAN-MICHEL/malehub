import { useState, useEffect, useCallback } from 'react';
import { cmsAPI } from '../services/client';
import { useTranslation } from 'react-i18next';

/**
 * useContent(pageSlug)
 * Lit les blocs de contenu d'une page (textes, images, listes JSON, thème)
 * Supporte le multilingue : si la valeur est un objet {fr, en}, retourne la bonne langue
 */
export function useContent(pageSlug) {
  const { i18n } = useTranslation();
  const [blocks, setBlocks] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchBlocks = useCallback(async () => {
    if (!pageSlug) { setLoading(false); return; }
    try {
      const res = await cmsAPI.getPageContent(pageSlug);
      const arr = res.data?.data?.blocks ?? res.data?.blocks ?? [];
      const map = {};
      arr.forEach((b) => {
        if (b.actif === false) return;
        
        let textValue = b.valeur_texte ?? '';
        
        // 🔥 SI LA VALEUR EST UN JSON STRINGIFIÉ, LA PARSER
        if (typeof textValue === 'string') {
          try {
            const parsed = JSON.parse(textValue);
            // Si c'est un objet avec fr/en, on le garde comme objet
            if (parsed && typeof parsed === 'object' && (parsed.fr !== undefined || parsed.en !== undefined)) {
              textValue = parsed;
            } else {
              textValue = parsed;
            }
          } catch (e) {
            // Ce n'est pas du JSON, garder comme chaîne
          }
        }
        
        map[b.bloc_key] = {
          text:  textValue,
          media: b.media_url ?? '',
          raw: b, // Garder les données brutes
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
   * 🔥 get(key, fallback) - Retourne la valeur dans la bonne langue
   * Si la valeur est un objet {fr, en}, retourne la langue actuelle
   * Sinon retourne la valeur telle quelle
   */
  const get = useCallback(
    (key, fallback = '') => {
      const b = blocks[key];
      if (!b) return fallback;
      
      let value = b.text;
      
      // 🔥 Si la valeur est un objet multilingue
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const currentLang = i18n.language || 'fr';
        return value[currentLang] || value['fr'] || fallback;
      }
      
      // Si c'est une chaîne simple
      if (typeof value === 'string') {
        // Si c'est un JSON stringifié, essayer de le parser
        try {
          const parsed = JSON.parse(value);
          if (parsed && typeof parsed === 'object' && (parsed.fr !== undefined || parsed.en !== undefined)) {
            const currentLang = i18n.language || 'fr';
            return parsed[currentLang] || parsed['fr'] || fallback;
          }
          return value || fallback;
        } catch (e) {
          return value || fallback;
        }
      }
      
      return fallback;
    },
    [blocks, i18n.language]
  );

  /**
   * getText(key, fallback) - Retourne le texte brut sans parsing multilingue
   */
  const getText = useCallback(
    (key, fallback = '') => {
      const b = blocks[key];
      if (!b) return fallback;
      const value = b.text;
      if (typeof value === 'string') return value || fallback;
      if (typeof value === 'object' && value !== null) {
        // Retourner l'objet en JSON pour debug
        return JSON.stringify(value);
      }
      return fallback;
    },
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
   * Si le tableau contient des objets avec fr/en, retourne la bonne langue
   */
  const getJSON = useCallback(
    (key, fallback = []) => {
      const raw = blocks[key]?.text;
      if (!raw) return fallback;
      
      let data = raw;
      
      // Si c'est une chaîne, essayer de la parser
      if (typeof raw === 'string') {
        try {
          data = JSON.parse(raw);
        } catch (err) {
          console.warn(`[useContent] JSON invalide pour "${key}":`, err.message);
          return fallback;
        }
      }
      
      // Si ce n'est pas un tableau
      if (!Array.isArray(data)) return fallback;
      if (data.length === 0) return fallback;
      
      const currentLang = i18n.language || 'fr';
      
      // 🔥 Traduire chaque élément du tableau si nécessaire
      return data.map(item => {
        if (item && typeof item === 'object') {
          const translated = {};
          for (const [k, v] of Object.entries(item)) {
            if (v && typeof v === 'object' && (v.fr !== undefined || v.en !== undefined)) {
              translated[k] = v[currentLang] || v['fr'] || '';
            } else {
              translated[k] = v;
            }
          }
          return translated;
        }
        return item;
      });
    },
    [blocks, i18n.language]
  );

  /**
   * getTheme()
   * Lit le bloc spécial "_theme" (couleurs / polices propres à cette page)
   */
  const getTheme = useCallback(() => {
    const raw = blocks['_theme']?.text;
    if (!raw) return null;
    
    let theme = raw;
    if (typeof raw === 'string') {
      try {
        theme = JSON.parse(raw);
      } catch (err) {
        console.warn('[useContent] Thème invalide:', err.message);
        return null;
      }
    }
    
    return (theme && typeof theme === 'object' && !Array.isArray(theme)) ? theme : null;
  }, [blocks]);

  return { get, getText, getMedia, getJSON, getTheme, blocks, loading, refetch: fetchBlocks };
}

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