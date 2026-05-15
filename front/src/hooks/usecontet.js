import { useState, useEffect, useCallback } from 'react';
import { cmsAPI } from '../services/client';

export function useContent(pageSlug) {
  const [blocks, setBlocks] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchBlocks = useCallback(async () => {
    if (!pageSlug) { setLoading(false); return; }
    try {
      const res = await cmsAPI.getPageContent(pageSlug);
      // Backend: { status, data: { blocks: [...] } }
      const arr = res.data?.data?.blocks ?? res.data?.blocks ?? [];
      const map = {};
      arr.forEach((b) => {
        if (b.actif !== false) map[b.bloc_key] = b.valeur_texte ?? '';
      });
      setBlocks(map);
    } catch (err) {
      // Silently fail — pages fall back to hardcoded defaults
      console.warn(`[useContent] Could not load content for "${pageSlug}":`, err.message);
    } finally {
      setLoading(false);
    }
  }, [pageSlug]);

  useEffect(() => { fetchBlocks(); }, [fetchBlocks]);

  // get(key, fallback) — returns CMS value or fallback if not set
  const get = useCallback(
    (key, fallback = '') => (blocks[key] !== undefined && blocks[key] !== '' ? blocks[key] : fallback),
    [blocks]
  );

  return { get, blocks, loading };
}

/**
 * useSettings()
 *
 * Fetches global settings (WhatsApp numbers, address, Jobs Week config…).
 *
 * Usage:
 *   const { setting } = useSettings();
 *   <a href={`https://wa.me/${setting('whatsapp_general', '237600000000')}`}>
 */
export function useSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

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
    (key, fallback = '') => (settings[key] !== undefined && settings[key] !== '' ? settings[key] : fallback),
    [settings]
  );

  return { setting, settings, loading };
}