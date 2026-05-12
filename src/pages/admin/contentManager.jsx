import React, { useState, useEffect } from 'react';
import { Save, Upload, X, Eye, EyeOff } from 'lucide-react';
import { contentAPI, settingsAPI } from '../../services/admin';

const pages = [
  { slug: 'home', name: 'Accueil' },
  { slug: 'coworking', name: 'Coworking' },
  { slug: 'incubator', name: 'Incubateur' },
  { slug: 'training', name: 'Formations' },
  { slug: 'lounge', name: 'Lounge' },
  { slug: 'contact', name: 'Contact' },
];

const blockTypes = {
  hero_title: { label: 'Titre Hero', type: 'text' },
  hero_subtitle: { label: 'Sous-titre Hero', type: 'textarea' },
  description: { label: 'Description', type: 'textarea' },
  cta_text: { label: 'Texte CTA', type: 'text' },
  image_url: { label: 'Image', type: 'image' },
  stats: { label: 'Statistiques', type: 'json' },
};

export default function ContentManager() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [contentBlocks, setContentBlocks] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({});
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    fetchData();
  }, [selectedPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [blocksRes, settingsRes] = await Promise.all([
        contentAPI.getBlocks(selectedPage),
        settingsAPI.getAll(),
      ]);
      
      const blocks = {};
      (blocksRes.data.data || []).forEach(block => {
        blocks[block.bloc_key] = block;
      });
      setContentBlocks(blocks);
      
      const settingsObj = {};
      (settingsRes.data.data || []).forEach(setting => {
        settingsObj[setting.cle] = setting;
      });
      setSettings(settingsObj);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (key, value) => {
    setContentBlocks(prev => ({
      ...prev,
      [key]: { ...prev[key], valeur_texte: value }
    }));
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: { ...prev[key], valeur: value }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save content blocks
      for (const [key, block] of Object.entries(contentBlocks)) {
        if (block.id) {
          await contentAPI.updateBlock(block.id, { valeur_texte: block.valeur_texte });
        }
      }
      
      // Save settings
      for (const [key, setting] of Object.entries(settings)) {
        if (setting.id) {
          await settingsAPI.update(key, setting.valeur);
        }
      }
      
      alert('Contenu sauvegardé avec succès');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (key, file) => {
    try {
      const response = await contentAPI.uploadMedia(file);
      handleContentChange(key, response.data.data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erreur lors de l\'upload');
    }
  };

  const renderContentEditor = () => (
    <div className="space-y-6">
      {Object.entries(blockTypes).map(([key, config]) => {
        const block = contentBlocks[key];
        const value = block?.valeur_texte || '';
        
        if (config.type === 'image') {
          return (
            <div key={key} className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                {config.label}
              </label>
              {value && (
                <div className="relative mb-3">
                  <img src={value} alt={config.label} className="rounded-lg max-h-48 object-cover" />
                  <button
                    onClick={() => handleContentChange(key, '')}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleImageUpload(key, e.target.files[0]);
                  }
                }}
                className="w-full"
              />
            </div>
          );
        }
        
        if (config.type === 'textarea') {
          return (
            <div key={key} className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                {config.label}
              </label>
              <textarea
                value={value}
                onChange={(e) => handleContentChange(key, e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              />
            </div>
          );
        }
        
        return (
          <div key={key} className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
              {config.label}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleContentChange(key, e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            />
          </div>
        );
      })}
    </div>
  );

  const renderSettingsEditor = () => (
    <div className="space-y-6">
      <div className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
        <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Informations de contact</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
              WhatsApp général
            </label>
            <input
              type="text"
              value={settings.whatsapp_general?.valeur || ''}
              onChange={(e) => handleSettingChange('whatsapp_general', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
              WhatsApp Réservations
            </label>
            <input
              type="text"
              value={settings.whatsapp_reservations?.valeur || ''}
              onChange={(e) => handleSettingChange('whatsapp_reservations', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
              WhatsApp Investisseurs
            </label>
            <input
              type="text"
              value={settings.whatsapp_investors?.valeur || ''}
              onChange={(e) => handleSettingChange('whatsapp_investors', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
              Adresse
            </label>
            <input
              type="text"
              value={settings.address?.valeur || ''}
              onChange={(e) => handleSettingChange('address', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
              Email
            </label>
            <input
              type="email"
              value={settings.email?.valeur || ''}
              onChange={(e) => handleSettingChange('email', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
        <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Jobs Week</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.jobs_week_open?.valeur === 'true'}
                onChange={(e) => handleSettingChange('jobs_week_open', String(e.target.checked))}
                className="rounded"
              />
              <span className="text-sm" style={{ color: 'var(--foreground)' }}>Jobs Week ouvert</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
              Prix (FCFA)
            </label>
            <input
              type="number"
              value={settings.jobs_week_price?.valeur || '30000'}
              onChange={(e) => handleSettingChange('jobs_week_price', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
              Quota places
            </label>
            <input
              type="number"
              value={settings.jobs_week_quota?.valeur || '10'}
              onChange={(e) => handleSettingChange('jobs_week_quota', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
        <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Mode maintenance</h3>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.maintenance_mode?.valeur === 'true'}
              onChange={(e) => handleSettingChange('maintenance_mode', String(e.target.checked))}
              className="rounded"
            />
            <span className="text-sm" style={{ color: 'var(--foreground)' }}>Activer le mode maintenance</span>
          </label>
          <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
            En mode maintenance, seuls les administrateurs peuvent accéder au site public
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Gestion du contenu</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Modifier les textes, images et paramètres du site
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          <Save className="h-4 w-4" />
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b mb-6" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'content' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted-foreground'
          }`}
        >
          Contenu des pages
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'settings' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted-foreground'
          }`}
        >
          Paramètres
        </button>
      </div>

      {activeTab === 'content' && (
        <>
          {/* Page selector */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {pages.map(page => (
              <button
                key={page.slug}
                onClick={() => setSelectedPage(page.slug)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedPage === page.slug
                    ? 'bg-primary text-primary-foreground'
                    : 'border hover:bg-gray-100/10'
                }`}
                style={selectedPage === page.slug ? {} : { borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
              >
                {page.name}
              </button>
            ))}
          </div>

          {/* Content editor */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            renderContentEditor()
          )}
        </>
      )}

      {activeTab === 'settings' && (
        loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          renderSettingsEditor()
        )
      )}
    </div>
  );
}