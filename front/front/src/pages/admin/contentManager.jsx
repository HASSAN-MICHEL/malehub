// import React, { useState, useEffect } from 'react';
// import { Save, Upload, X, Eye, EyeOff } from 'lucide-react';
// import { contentAPI, settingsAPI } from '../../services/admin';

// const pages = [
//   { slug: 'home', name: 'Accueil' },
//   { slug: 'coworking', name: 'Coworking' },
//   { slug: 'incubator', name: 'Incubateur' },
//   { slug: 'training', name: 'Formations' },
//   { slug: 'lounge', name: 'Lounge' },
//   { slug: 'contact', name: 'Contact' },
// ];

// const blockTypes = {
//   hero_title: { label: 'Titre Hero', type: 'text' },
//   hero_subtitle: { label: 'Sous-titre Hero', type: 'textarea' },
//   description: { label: 'Description', type: 'textarea' },
//   cta_text: { label: 'Texte CTA', type: 'text' },
//   image_url: { label: 'Image', type: 'image' },
//   stats: { label: 'Statistiques', type: 'json' },
// };

// export default function ContentManager() {
//   const [selectedPage, setSelectedPage] = useState('home');
//   const [contentBlocks, setContentBlocks] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [settings, setSettings] = useState({});
//   const [activeTab, setActiveTab] = useState('content');

//   useEffect(() => {
//     fetchData();
//   }, [selectedPage]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [blocksRes, settingsRes] = await Promise.all([
//         contentAPI.getBlocks(selectedPage),
//         settingsAPI.getAll(),
//       ]);
      
//       const blocks = {};
//       (blocksRes.data.data || []).forEach(block => {
//         blocks[block.bloc_key] = block;
//       });
//       setContentBlocks(blocks);
      
//       const settingsObj = {};
//       (settingsRes.data.data || []).forEach(setting => {
//         settingsObj[setting.cle] = setting;
//       });
//       setSettings(settingsObj);
//     } catch (error) {
//       console.error('Error fetching content:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleContentChange = (key, value) => {
//     setContentBlocks(prev => ({
//       ...prev,
//       [key]: { ...prev[key], valeur_texte: value }
//     }));
//   };

//   const handleSettingChange = (key, value) => {
//     setSettings(prev => ({
//       ...prev,
//       [key]: { ...prev[key], valeur: value }
//     }));
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       // Save content blocks
//       for (const [key, block] of Object.entries(contentBlocks)) {
//         if (block.id) {
//           await contentAPI.updateBlock(block.id, { valeur_texte: block.valeur_texte });
//         }
//       }
      
//       // Save settings
//       for (const [key, setting] of Object.entries(settings)) {
//         if (setting.id) {
//           await settingsAPI.update(key, setting.valeur);
//         }
//       }
      
//       alert('Contenu sauvegardé avec succès');
//     } catch (error) {
//       console.error('Error saving content:', error);
//       alert('Erreur lors de la sauvegarde');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleImageUpload = async (key, file) => {
//     try {
//       const response = await contentAPI.uploadMedia(file);
//       handleContentChange(key, response.data.data.url);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       alert('Erreur lors de l\'upload');
//     }
//   };

//   const renderContentEditor = () => (
//     <div className="space-y-6">
//       {Object.entries(blockTypes).map(([key, config]) => {
//         const block = contentBlocks[key];
//         const value = block?.valeur_texte || '';
        
//         if (config.type === 'image') {
//           return (
//             <div key={key} className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
//               <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
//                 {config.label}
//               </label>
//               {value && (
//                 <div className="relative mb-3">
//                   <img src={value} alt={config.label} className="rounded-lg max-h-48 object-cover" />
//                   <button
//                     onClick={() => handleContentChange(key, '')}
//                     className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   if (e.target.files?.[0]) {
//                     handleImageUpload(key, e.target.files[0]);
//                   }
//                 }}
//                 className="w-full"
//               />
//             </div>
//           );
//         }
        
//         if (config.type === 'textarea') {
//           return (
//             <div key={key} className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
//               <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
//                 {config.label}
//               </label>
//               <textarea
//                 value={value}
//                 onChange={(e) => handleContentChange(key, e.target.value)}
//                 rows={4}
//                 className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
//                 style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//               />
//             </div>
//           );
//         }
        
//         return (
//           <div key={key} className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
//             <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
//               {config.label}
//             </label>
//             <input
//               type="text"
//               value={value}
//               onChange={(e) => handleContentChange(key, e.target.value)}
//               className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
//               style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );

//   const renderSettingsEditor = () => (
//     <div className="space-y-6">
//       <div className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
//         <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Informations de contact</h3>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//               WhatsApp général
//             </label>
//             <input
//               type="text"
//               value={settings.whatsapp_general?.valeur || ''}
//               onChange={(e) => handleSettingChange('whatsapp_general', e.target.value)}
//               className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
//               style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//               WhatsApp Réservations
//             </label>
//             <input
//               type="text"
//               value={settings.whatsapp_reservations?.valeur || ''}
//               onChange={(e) => handleSettingChange('whatsapp_reservations', e.target.value)}
//               className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
//               style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//               WhatsApp Investisseurs
//             </label>
//             <input
//               type="text"
//               value={settings.whatsapp_investors?.valeur || ''}
//               onChange={(e) => handleSettingChange('whatsapp_investors', e.target.value)}
//               className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
//               style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//               Adresse
//             </label>
//             <input
//               type="text"
//               value={settings.address?.valeur || ''}
//               onChange={(e) => handleSettingChange('address', e.target.value)}
//               className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
//               style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//               Email
//             </label>
//             <input
//               type="email"
//               value={settings.email?.valeur || ''}
//               onChange={(e) => handleSettingChange('email', e.target.value)}
//               className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
//               style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
//         <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Jobs Week</h3>
//         <div className="space-y-4">
//           <div>
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={settings.jobs_week_open?.valeur === 'true'}
//                 onChange={(e) => handleSettingChange('jobs_week_open', String(e.target.checked))}
//                 className="rounded"
//               />
//               <span className="text-sm" style={{ color: 'var(--foreground)' }}>Jobs Week ouvert</span>
//             </label>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//               Prix (FCFA)
//             </label>
//             <input
//               type="number"
//               value={settings.jobs_week_price?.valeur || '30000'}
//               onChange={(e) => handleSettingChange('jobs_week_price', e.target.value)}
//               className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
//               style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//               Quota places
//             </label>
//             <input
//               type="number"
//               value={settings.jobs_week_quota?.valeur || '10'}
//               onChange={(e) => handleSettingChange('jobs_week_quota', e.target.value)}
//               className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
//               style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="border rounded-lg p-4" style={{ borderColor: 'var(--border)' }}>
//         <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Mode maintenance</h3>
//         <div>
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={settings.maintenance_mode?.valeur === 'true'}
//               onChange={(e) => handleSettingChange('maintenance_mode', String(e.target.checked))}
//               className="rounded"
//             />
//             <span className="text-sm" style={{ color: 'var(--foreground)' }}>Activer le mode maintenance</span>
//           </label>
//           <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
//             En mode maintenance, seuls les administrateurs peuvent accéder au site public
//           </p>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Gestion du contenu</h1>
//           <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
//             Modifier les textes, images et paramètres du site
//           </p>
//         </div>
//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//           style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//         >
//           <Save className="h-4 w-4" />
//           {saving ? 'Sauvegarde...' : 'Sauvegarder'}
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 border-b mb-6" style={{ borderColor: 'var(--border)' }}>
//         <button
//           onClick={() => setActiveTab('content')}
//           className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
//             activeTab === 'content' 
//               ? 'border-primary text-primary' 
//               : 'border-transparent text-muted-foreground'
//           }`}
//         >
//           Contenu des pages
//         </button>
//         <button
//           onClick={() => setActiveTab('settings')}
//           className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
//             activeTab === 'settings' 
//               ? 'border-primary text-primary' 
//               : 'border-transparent text-muted-foreground'
//           }`}
//         >
//           Paramètres
//         </button>
//       </div>

//       {activeTab === 'content' && (
//         <>
//           {/* Page selector */}
//           <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
//             {pages.map(page => (
//               <button
//                 key={page.slug}
//                 onClick={() => setSelectedPage(page.slug)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
//                   selectedPage === page.slug
//                     ? 'bg-primary text-primary-foreground'
//                     : 'border hover:bg-gray-100/10'
//                 }`}
//                 style={selectedPage === page.slug ? {} : { borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
//               >
//                 {page.name}
//               </button>
//             ))}
//           </div>

//           {/* Content editor */}
//           {loading ? (
//             <div className="flex justify-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//             </div>
//           ) : (
//             renderContentEditor()
//           )}
//         </>
//       )}

//       {activeTab === 'settings' && (
//         loading ? (
//           <div className="flex justify-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//           </div>
//         ) : (
//           renderSettingsEditor()
//         )
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect, useCallback } from 'react';
import { Save, Upload, X, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { contentAPI, settingsAPI } from '../../services/admin';

// ── Configuration ──
// Pages gérées par le CMS
const PAGES = [
  { slug: 'home',      name: 'Accueil' },
  { slug: 'coworking', name: 'Coworking' },
  { slug: 'incubator', name: 'Incubateur' },
  { slug: 'training',  name: 'Formations' },
  { slug: 'lounge',    name: 'Lounge' },
  { slug: 'contact',   name: 'Contact' },
];

// Blocs disponibles par page — définit quels blocs sont éditables
// Si un bloc n'existe pas encore en BD, il sera créé via upsert à la sauvegarde
const PAGE_BLOCKS = {
  home: [
    { key: 'hero_title',    label: 'Titre Hero',           type: 'text' },
    { key: 'hero_subtitle', label: 'Sous-titre Hero',      type: 'textarea' },
    { key: 'about_text',    label: 'Texte "À propos"',     type: 'textarea' },
    { key: 'cta_incubator', label: 'CTA Incubateur',       type: 'text' },
    { key: 'stats_json',    label: 'Statistiques (JSON)',  type: 'json' },
    { key: 'hero_image',    label: 'Image Hero',           type: 'image' },
  ],
  coworking: [
    { key: 'hero_title',    label: 'Titre',                type: 'text' },
    { key: 'description',   label: 'Description',          type: 'textarea' },
    { key: 'rental_hours',  label: 'Horaires de location', type: 'text' },
    { key: 'hero_image',    label: 'Image principale',     type: 'image' },
  ],
  incubator: [
    { key: 'hero_title',    label: 'Titre',                type: 'text' },
    { key: 'description',   label: 'Description',          type: 'textarea' },
    { key: 'invest_club',   label: 'Texte Invest Club',    type: 'textarea' },
  ],
  training: [
    { key: 'hero_title',    label: 'Titre',                type: 'text' },
    { key: 'description',   label: 'Description',          type: 'textarea' },
    { key: 'jobs_week_desc',label: 'Description Jobs Week', type: 'textarea' },
  ],
  lounge: [
    { key: 'hero_title',    label: 'Titre',                type: 'text' },
    { key: 'description',   label: 'Description',          type: 'textarea' },
    { key: 'hero_image',    label: 'Image principale',     type: 'image' },
  ],
  contact: [
    { key: 'hero_title',    label: 'Titre',                type: 'text' },
    { key: 'address',       label: 'Adresse',              type: 'text' },
    { key: 'map_embed',     label: 'Lien carte (URL)',     type: 'text' },
  ],
};

// Settings attendus — nom de la clé en BD
const SETTINGS_CONFIG = {
  whatsapp_general:      { label: 'WhatsApp général',      type: 'tel' },
  whatsapp_reservations: { label: 'WhatsApp Réservations', type: 'tel' },
  whatsapp_investors:    { label: 'WhatsApp Investisseurs',type: 'tel' },
  address:               { label: 'Adresse',               type: 'text' },
  email:                 { label: 'Email de contact',      type: 'email' },
  instagram:             { label: 'Instagram (@handle)',   type: 'text' },
  jobs_week_open:        { label: 'Jobs Week ouvert',      type: 'checkbox' },
  jobs_week_price:       { label: 'Prix Jobs Week (FCFA)', type: 'number' },
  jobs_week_quota:       { label: 'Quota places',          type: 'number' },
  maintenance_mode:      { label: 'Mode maintenance',      type: 'checkbox' },
};

// ── Toast component ───────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-sm font-medium"
      style={{
        backgroundColor: type === 'success' ? '#16a34a' : '#dc2626',
        color: '#fff',
      }}
    >
      {type === 'success'
        ? <CheckCircle className="h-5 w-5" />
        : <AlertCircle className="h-5 w-5" />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// ── Field components 
const inputCls =
  'w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors';
const inputStyle = {
  backgroundColor: 'var(--background)',
  borderColor: 'var(--border)',
  color: 'var(--foreground)',
};

function TextField({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls}
      style={inputStyle}
    />
  );
}

function TextareaField({ value, onChange }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className={inputCls}
      style={inputStyle}
    />
  );
}

function JsonField({ value, onChange }) {
  const [raw, setRaw] = useState(value);
  const [jsonError, setJsonError] = useState('');

  const handleChange = (v) => {
    setRaw(v);
    try {
      JSON.parse(v);
      setJsonError('');
      onChange(v);
    } catch {
      setJsonError('JSON invalide');
    }
  };

  return (
    <>
      <textarea
        value={raw}
        onChange={(e) => handleChange(e.target.value)}
        rows={5}
        className={`${inputCls} font-mono text-xs`}
        style={{ ...inputStyle, borderColor: jsonError ? '#dc2626' : 'var(--border)' }}
      />
      {jsonError && <p className="text-xs text-red-500 mt-1">{jsonError}</p>}
    </>
  );
}

function ImageField({ value, onChange, onUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    setUploading(true);
    try {
      await onUpload(file, onChange);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="rounded-lg max-h-48 object-cover border"
            style={{ borderColor: 'var(--border)' }}
          />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <div className="flex items-center gap-3">
        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:opacity-80"
          style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
          <Upload className="h-4 w-4" />
          {uploading ? 'Upload...' : 'Choisir une image'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            disabled={uploading}
            onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
          />
        </label>
        {value && (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL manuelle"
            className={`flex-1 px-3 py-2 rounded-lg border text-xs focus:outline-none`}
            style={inputStyle}
          />
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ContentManager() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [activeTab, setActiveTab]       = useState('content');

  // contentBlocks[bloc_key] = { id?, page_slug, bloc_key, valeur_texte, dirty }
  const [contentBlocks, setContentBlocks] = useState({});
  // settings[cle] = { id?, cle, valeur, dirty }
  const [settings, setSettings] = useState({});

  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState(null); // { message, type }

  const showToast = (message, type = 'success') => setToast({ message, type });
  const hideToast = () => setToast(null);

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [blocksRes, settingsRes] = await Promise.all([
        contentAPI.getBlocks(selectedPage),
        settingsAPI.getAll(),
      ]);

      // Index blocks by bloc_key
      // Response: { data: { blocks: [...] } }
      const blocksArr = blocksRes.data?.data?.blocks ?? blocksRes.data?.blocks ?? [];
      const blocksMap = {};
      blocksArr.forEach((b) => {
        blocksMap[b.bloc_key] = { ...b, dirty: false };
      });
      setContentBlocks(blocksMap);

      // Index settings by cle
      // Response: { data: { settings: [...] } }
      const settingsArr = settingsRes.data?.data?.settings ?? settingsRes.data?.settings ?? [];
      const settingsMap = {};
      settingsArr.forEach((s) => {
        settingsMap[s.cle] = { ...s, dirty: false };
      });
      setSettings(settingsMap);
    } catch (err) {
      console.error('Fetch error:', err);
      showToast('Erreur de chargement du contenu', 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedPage]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Change handlers ───────────────────────────────────────────────────────
  const handleBlockChange = (key, value) => {
    setContentBlocks((prev) => ({
      ...prev,
      [key]: {
        // Initialise with page context if block doesn't exist in DB yet
        page_slug: selectedPage,
        bloc_key:  key,
        actif:     true,
        ...prev[key],
        valeur_texte: value,
        dirty: true,
      },
    }));
  };

  const handleSettingChange = (cle, valeur) => {
    setSettings((prev) => ({
      ...prev,
      [cle]: {
        cle,
        ...prev[cle],
        valeur,
        dirty: true,
      },
    }));
  };

  // ── Image upload ──────────────────────────────────────────────────────────
  const handleImageUpload = async (file, onSuccess) => {
    try {
      // Response: { data: { url: '/uploads/media/...' } }
      const res = await contentAPI.uploadMedia(file);
      const url = res.data?.data?.url ?? res.data?.url;
      if (!url) throw new Error('URL manquante dans la réponse upload');
      onSuccess(url);
      showToast('Image uploadée avec succès');
    } catch (err) {
      console.error('Upload error:', err);
      showToast("Erreur lors de l'upload de l'image", 'error');
    }
  };

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    let errors = 0;

    try {
      // Save dirty content blocks
      // For blocks WITH an id → PUT /content/:id
      // For blocks WITHOUT id (new) → PUT /content (upsert by page_slug + bloc_key)
      const blockPromises = Object.entries(contentBlocks)
        .filter(([, block]) => block.dirty)
        .map(async ([key, block]) => {
          try {
            if (block.id) {
              await contentAPI.updateBlock(block.id, {
                valeur_texte: block.valeur_texte,
                media_url:    block.media_url ?? null,
                actif:        block.actif ?? true,
              });
            } else {
              // New block — upsert by (page_slug, bloc_key)
              await contentAPI.upsertBlock({
                page_slug:    selectedPage,
                bloc_key:     key,
                valeur_texte: block.valeur_texte,
                media_url:    block.media_url ?? null,
                actif:        true,
              });
            }
          } catch (err) {
            console.error(`Error saving block ${key}:`, err);
            errors++;
          }
        });

      // Save dirty settings (upsert regardless of having an id)
      const settingPromises = Object.entries(settings)
        .filter(([, s]) => s.dirty)
        .map(async ([cle, s]) => {
          try {
            await settingsAPI.update(cle, s.valeur);
          } catch (err) {
            console.error(`Error saving setting ${cle}:`, err);
            errors++;
          }
        });

      await Promise.all([...blockPromises, ...settingPromises]);

      if (errors === 0) {
        showToast('Contenu sauvegardé avec succès ✓');
        // Refetch to get fresh ids for newly created blocks
        await fetchData();
      } else {
        showToast(`Sauvegarde partielle — ${errors} erreur(s)`, 'error');
      }
    } catch (err) {
      console.error('Save error:', err);
      showToast('Erreur lors de la sauvegarde', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Dirty state ───────────────────────────────────────────────────────────
  const hasDirtyContent  = Object.values(contentBlocks).some((b) => b.dirty);
  const hasDirtySettings = Object.values(settings).some((s) => s.dirty);
  const hasDirty         = hasDirtyContent || hasDirtySettings;

  // ── Render helpers ────────────────────────────────────────────────────────
  const renderField = (blockDef) => {
    const { key, label, type } = blockDef;
    const block = contentBlocks[key];
    const value = block?.valeur_texte ?? '';

    return (
      <div
        key={key}
        className="rounded-xl p-5 border space-y-2 transition-colors"
        style={{
          backgroundColor: 'var(--card)',
          borderColor: block?.dirty ? 'color-mix(in oklch, var(--primary) 60%, transparent)' : 'var(--border)',
        }}
      >
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            {label}
            {block?.dirty && (
              <span className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded"
                style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)', color: 'var(--primary)' }}>
                modifié
              </span>
            )}
          </label>
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{key}</span>
        </div>

        {type === 'text'     && <TextField     value={value} onChange={(v) => handleBlockChange(key, v)} />}
        {type === 'textarea' && <TextareaField value={value} onChange={(v) => handleBlockChange(key, v)} />}
        {type === 'json'     && <JsonField     value={value} onChange={(v) => handleBlockChange(key, v)} />}
        {type === 'image'    && (
          <ImageField
            value={value}
            onChange={(v) => handleBlockChange(key, v)}
            onUpload={handleImageUpload}
          />
        )}
      </div>
    );
  };

  const renderSettingField = (cle, config) => {
    const setting = settings[cle];
    const value   = setting?.valeur ?? '';
    const { label, type } = config;

    const fieldStyle = {
      backgroundColor: 'var(--background)',
      borderColor: setting?.dirty ? 'color-mix(in oklch, var(--primary) 60%, transparent)' : 'var(--border)',
      color: 'var(--foreground)',
    };

    if (type === 'checkbox') {
      return (
        <div key={cle} className="flex items-center justify-between py-2">
          <label className="text-sm" style={{ color: 'var(--foreground)' }}>{label}</label>
          <input
            type="checkbox"
            checked={value === 'true'}
            onChange={(e) => handleSettingChange(cle, String(e.target.checked))}
            className="w-5 h-5 rounded cursor-pointer accent-primary"
          />
        </div>
      );
    }

    return (
      <div key={cle}>
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
          {label}
          {setting?.dirty && (
            <span className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded"
              style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)', color: 'var(--primary)' }}>
              modifié
            </span>
          )}
        </label>
        <input
          type={type}
          value={value}
          onChange={(e) => handleSettingChange(cle, e.target.value)}
          className={`${inputCls}`}
          style={fieldStyle}
        />
      </div>
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────
  const currentBlocks = PAGE_BLOCKS[selectedPage] ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
            Gestion du contenu
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Modifier les textes, images et paramètres du site
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors hover:opacity-80"
            style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
            title="Recharger"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasDirty}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-50"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            <Save className="h-4 w-4" />
            {saving ? 'Sauvegarde...' : hasDirty ? `Sauvegarder` : 'Sauvegarder'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b" style={{ borderColor: 'var(--border)' }}>
        {[
          { id: 'content',  label: 'Contenu des pages' },
          { id: 'settings', label: 'Paramètres' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px"
            style={{
              borderColor:  activeTab === tab.id ? 'var(--primary)' : 'transparent',
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--muted-foreground)',
            }}
          >
            {tab.label}
            {tab.id === 'content'  && hasDirtyContent  && <span className="ml-2 w-2 h-2 rounded-full bg-amber-400 inline-block" />}
            {tab.id === 'settings' && hasDirtySettings && <span className="ml-2 w-2 h-2 rounded-full bg-amber-400 inline-block" />}
          </button>
        ))}
      </div>

      {/* ── Content tab ── */}
      {activeTab === 'content' && (
        <div className="space-y-5">
          {/* Page selector */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {PAGES.map((page) => (
              <button
                key={page.slug}
                onClick={() => setSelectedPage(page.slug)}
                className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border"
                style={{
                  backgroundColor: selectedPage === page.slug ? 'var(--primary)' : 'transparent',
                  color:           selectedPage === page.slug ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                  borderColor:     selectedPage === page.slug ? 'var(--primary)' : 'var(--border)',
                }}
              >
                {page.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="space-y-4">
              {currentBlocks.length === 0 ? (
                <p className="text-center py-8 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Aucun bloc configuré pour cette page.
                </p>
              ) : (
                currentBlocks.map(renderField)
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Settings tab ── */}
      {activeTab === 'settings' && (
        loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Contact info */}
            <div className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Informations de contact
              </h3>
              <div className="space-y-4">
                {['whatsapp_general', 'whatsapp_reservations', 'whatsapp_investors', 'address', 'email', 'instagram']
                  .map((cle) => renderSettingField(cle, SETTINGS_CONFIG[cle]))}
              </div>
            </div>

            {/* Jobs Week */}
            <div className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Jobs Week</h3>
              <div className="space-y-4">
                {['jobs_week_open', 'jobs_week_price', 'jobs_week_quota']
                  .map((cle) => renderSettingField(cle, SETTINGS_CONFIG[cle]))}
              </div>
            </div>

            {/* Maintenance */}
            <div className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Système</h3>
              <div className="space-y-4">
                {renderSettingField('maintenance_mode', SETTINGS_CONFIG.maintenance_mode)}
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  En mode maintenance, le site public affiche une page de maintenance.
                </p>
              </div>
            </div>
          </div>
        )
      )}

      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
