


// import React, { useState, useEffect, useCallback } from 'react';
// import { Save, Upload, X, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
// import { contentAPI, settingsAPI } from '../../services/admin';

// // ── Configuration ──
// // Pages gérées par le CMS
// const PAGES = [
//   { slug: 'home',      name: 'Accueil' },
//   { slug: 'coworking', name: 'Coworking' },
//   { slug: 'incubator', name: 'Incubateur' },
//   { slug: 'training',  name: 'Formations' },
//   { slug: 'lounge',    name: 'Lounge' },
//   { slug: 'contact',   name: 'Contact' },
// ];

// // Blocs disponibles par page — définit quels blocs sont éditables
// // Si un bloc n'existe pas encore en BD, il sera créé via upsert à la sauvegarde
// const PAGE_BLOCKS = {
//   home: [
//     { key: 'hero_title',    label: 'Titre Hero',           type: 'text' },
//     { key: 'hero_subtitle', label: 'Sous-titre Hero',      type: 'textarea' },
//     { key: 'about_text',    label: 'Texte "À propos"',     type: 'textarea' },
//     { key: 'cta_incubator', label: 'CTA Incubateur',       type: 'text' },
//     { key: 'stats_json',    label: 'Statistiques (JSON)',  type: 'json' },
//     { key: 'hero_image',    label: 'Image Hero',           type: 'image' },
//   ],
//   coworking: [
//     { key: 'hero_title',    label: 'Titre',                type: 'text' },
//     { key: 'description',   label: 'Description',          type: 'textarea' },
//     { key: 'rental_hours',  label: 'Horaires de location', type: 'text' },
//     { key: 'hero_image',    label: 'Image principale',     type: 'image' },
//   ],
//   incubator: [
//     { key: 'hero_title',    label: 'Titre',                type: 'text' },
//     { key: 'description',   label: 'Description',          type: 'textarea' },
//     { key: 'invest_club',   label: 'Texte Invest Club',    type: 'textarea' },
//   ],
//   training: [
//     { key: 'hero_title',    label: 'Titre',                type: 'text' },
//     { key: 'description',   label: 'Description',          type: 'textarea' },
//     { key: 'jobs_week_desc',label: 'Description Jobs Week', type: 'textarea' },
//   ],
//   lounge: [
//     { key: 'hero_title',    label: 'Titre',                type: 'text' },
//     { key: 'description',   label: 'Description',          type: 'textarea' },
//     { key: 'hero_image',    label: 'Image principale',     type: 'image' },
//   ],
//   contact: [
//     { key: 'hero_title',    label: 'Titre',                type: 'text' },
//     { key: 'address',       label: 'Adresse',              type: 'text' },
//     { key: 'map_embed',     label: 'Lien carte (URL)',     type: 'text' },
//   ],
// };

// // Settings attendus — nom de la clé en BD
// const SETTINGS_CONFIG = {
//   whatsapp_general:      { label: 'WhatsApp général',      type: 'tel' },
//   whatsapp_reservations: { label: 'WhatsApp Réservations', type: 'tel' },
//   whatsapp_investors:    { label: 'WhatsApp Investisseurs',type: 'tel' },
//   address:               { label: 'Adresse',               type: 'text' },
//   email:                 { label: 'Email de contact',      type: 'email' },
//   instagram:             { label: 'Instagram (@handle)',   type: 'text' },
//   jobs_week_open:        { label: 'Jobs Week ouvert',      type: 'checkbox' },
//   jobs_week_price:       { label: 'Prix Jobs Week (FCFA)', type: 'number' },
//   jobs_week_quota:       { label: 'Quota places',          type: 'number' },
//   maintenance_mode:      { label: 'Mode maintenance',      type: 'checkbox' },
// };

// // ── Toast component ───────────────────────────────────────────────────────────
// function Toast({ message, type, onClose }) {
//   useEffect(() => {
//     const t = setTimeout(onClose, 4000);
//     return () => clearTimeout(t);
//   }, [onClose]);

//   return (
//     <div
//       className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-sm font-medium"
//       style={{
//         backgroundColor: type === 'success' ? '#16a34a' : '#dc2626',
//         color: '#fff',
//       }}
//     >
//       {type === 'success'
//         ? <CheckCircle className="h-5 w-5" />
//         : <AlertCircle className="h-5 w-5" />}
//       {message}
//       <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
//         <X className="h-4 w-4" />
//       </button>
//     </div>
//   );
// }

// // ── Field components 
// const inputCls =
//   'w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors';
// const inputStyle = {
//   backgroundColor: 'var(--background)',
//   borderColor: 'var(--border)',
//   color: 'var(--foreground)',
// };

// function TextField({ value, onChange }) {
//   return (
//     <input
//       type="text"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className={inputCls}
//       style={inputStyle}
//     />
//   );
// }

// function TextareaField({ value, onChange }) {
//   return (
//     <textarea
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       rows={4}
//       className={inputCls}
//       style={inputStyle}
//     />
//   );
// }

// function JsonField({ value, onChange }) {
//   const [raw, setRaw] = useState(value);
//   const [jsonError, setJsonError] = useState('');

//   const handleChange = (v) => {
//     setRaw(v);
//     try {
//       JSON.parse(v);
//       setJsonError('');
//       onChange(v);
//     } catch {
//       setJsonError('JSON invalide');
//     }
//   };

//   return (
//     <>
//       <textarea
//         value={raw}
//         onChange={(e) => handleChange(e.target.value)}
//         rows={5}
//         className={`${inputCls} font-mono text-xs`}
//         style={{ ...inputStyle, borderColor: jsonError ? '#dc2626' : 'var(--border)' }}
//       />
//       {jsonError && <p className="text-xs text-red-500 mt-1">{jsonError}</p>}
//     </>
//   );
// }

// function ImageField({ value, onChange, onUpload }) {
//   const [uploading, setUploading] = useState(false);

//   const handleFile = async (file) => {
//     setUploading(true);
//     try {
//       await onUpload(file, onChange);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="space-y-3">
//       {value && (
//         <div className="relative inline-block">
//           <img
//             src={value}
//             alt="Preview"
//             className="rounded-lg max-h-48 object-cover border"
//             style={{ borderColor: 'var(--border)' }}
//           />
//           <button
//             onClick={() => onChange('')}
//             className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>
//       )}
//       <div className="flex items-center gap-3">
//         <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:opacity-80"
//           style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
//           <Upload className="h-4 w-4" />
//           {uploading ? 'Upload...' : 'Choisir une image'}
//           <input
//             type="file"
//             accept="image/jpeg,image/png,image/webp"
//             className="hidden"
//             disabled={uploading}
//             onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
//           />
//         </label>
//         {value && (
//           <input
//             type="text"
//             value={value}
//             onChange={(e) => onChange(e.target.value)}
//             placeholder="URL manuelle"
//             className={`flex-1 px-3 py-2 rounded-lg border text-xs focus:outline-none`}
//             style={inputStyle}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// // ── Main component ────────────────────────────────────────────────────────────
// export default function ContentManager() {
//   const [selectedPage, setSelectedPage] = useState('home');
//   const [activeTab, setActiveTab]       = useState('content');

//   // contentBlocks[bloc_key] = { id?, page_slug, bloc_key, valeur_texte, dirty }
//   const [contentBlocks, setContentBlocks] = useState({});
//   // settings[cle] = { id?, cle, valeur, dirty }
//   const [settings, setSettings] = useState({});

//   const [loading, setLoading]   = useState(true);
//   const [saving, setSaving]     = useState(false);
//   const [toast, setToast]       = useState(null); // { message, type }

//   const showToast = (message, type = 'success') => setToast({ message, type });
//   const hideToast = () => setToast(null);

//   // ── Fetch ─────────────────────────────────────────────────────────────────
//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [blocksRes, settingsRes] = await Promise.all([
//         contentAPI.getBlocks(selectedPage),
//         settingsAPI.getAll(),
//       ]);

//       // Index blocks by bloc_key
//       // Response: { data: { blocks: [...] } }
//       const blocksArr = blocksRes.data?.data?.blocks ?? blocksRes.data?.blocks ?? [];
//       const blocksMap = {};
//       blocksArr.forEach((b) => {
//         blocksMap[b.bloc_key] = { ...b, dirty: false };
//       });
//       setContentBlocks(blocksMap);

//       // Index settings by cle
//       // Response: { data: { settings: [...] } }
//       const settingsArr = settingsRes.data?.data?.settings ?? settingsRes.data?.settings ?? [];
//       const settingsMap = {};
//       settingsArr.forEach((s) => {
//         settingsMap[s.cle] = { ...s, dirty: false };
//       });
//       setSettings(settingsMap);
//     } catch (err) {
//       console.error('Fetch error:', err);
//       showToast('Erreur de chargement du contenu', 'error');
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedPage]);

//   useEffect(() => { fetchData(); }, [fetchData]);

//   // ── Change handlers ───────────────────────────────────────────────────────
//   const handleBlockChange = (key, value) => {
//     setContentBlocks((prev) => ({
//       ...prev,
//       [key]: {
//         // Initialise with page context if block doesn't exist in DB yet
//         page_slug: selectedPage,
//         bloc_key:  key,
//         actif:     true,
//         ...prev[key],
//         valeur_texte: value,
//         dirty: true,
//       },
//     }));
//   };

//   const handleSettingChange = (cle, valeur) => {
//     setSettings((prev) => ({
//       ...prev,
//       [cle]: {
//         cle,
//         ...prev[cle],
//         valeur,
//         dirty: true,
//       },
//     }));
//   };

//   // ── Image upload ──────────────────────────────────────────────────────────
//   const handleImageUpload = async (file, onSuccess) => {
//     try {
//       // Response: { data: { url: '/uploads/media/...' } }
//       const res = await contentAPI.uploadMedia(file);
//       const url = res.data?.data?.url ?? res.data?.url;
//       if (!url) throw new Error('URL manquante dans la réponse upload');
//       onSuccess(url);
//       showToast('Image uploadée avec succès');
//     } catch (err) {
//       console.error('Upload error:', err);
//       showToast("Erreur lors de l'upload de l'image", 'error');
//     }
//   };

//   // ── Save ──────────────────────────────────────────────────────────────────
//   const handleSave = async () => {
//     setSaving(true);
//     let errors = 0;

//     try {
//       // Save dirty content blocks
//       // For blocks WITH an id → PUT /content/:id
//       // For blocks WITHOUT id (new) → PUT /content (upsert by page_slug + bloc_key)
//       const blockPromises = Object.entries(contentBlocks)
//         .filter(([, block]) => block.dirty)
//         .map(async ([key, block]) => {
//           try {
//             if (block.id) {
//               await contentAPI.updateBlock(block.id, {
//                 valeur_texte: block.valeur_texte,
//                 media_url:    block.media_url ?? null,
//                 actif:        block.actif ?? true,
//               });
//             } else {
//               // New block — upsert by (page_slug, bloc_key)
//               await contentAPI.upsertBlock({
//                 page_slug:    selectedPage,
//                 bloc_key:     key,
//                 valeur_texte: block.valeur_texte,
//                 media_url:    block.media_url ?? null,
//                 actif:        true,
//               });
//             }
//           } catch (err) {
//             console.error(`Error saving block ${key}:`, err);
//             errors++;
//           }
//         });

//       // Save dirty settings (upsert regardless of having an id)
//       const settingPromises = Object.entries(settings)
//         .filter(([, s]) => s.dirty)
//         .map(async ([cle, s]) => {
//           try {
//             await settingsAPI.update(cle, s.valeur);
//           } catch (err) {
//             console.error(`Error saving setting ${cle}:`, err);
//             errors++;
//           }
//         });

//       await Promise.all([...blockPromises, ...settingPromises]);

//       if (errors === 0) {
//         showToast('Contenu sauvegardé avec succès ✓');
//         // Refetch to get fresh ids for newly created blocks
//         await fetchData();
//       } else {
//         showToast(`Sauvegarde partielle — ${errors} erreur(s)`, 'error');
//       }
//     } catch (err) {
//       console.error('Save error:', err);
//       showToast('Erreur lors de la sauvegarde', 'error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ── Dirty state ───────────────────────────────────────────────────────────
//   const hasDirtyContent  = Object.values(contentBlocks).some((b) => b.dirty);
//   const hasDirtySettings = Object.values(settings).some((s) => s.dirty);
//   const hasDirty         = hasDirtyContent || hasDirtySettings;

//   // ── Render helpers ────────────────────────────────────────────────────────
//   const renderField = (blockDef) => {
//     const { key, label, type } = blockDef;
//     const block = contentBlocks[key];
//     const value = block?.valeur_texte ?? '';

//     return (
//       <div
//         key={key}
//         className="rounded-xl p-5 border space-y-2 transition-colors"
//         style={{
//           backgroundColor: 'var(--card)',
//           borderColor: block?.dirty ? 'color-mix(in oklch, var(--primary) 60%, transparent)' : 'var(--border)',
//         }}
//       >
//         <div className="flex items-center justify-between">
//           <label className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
//             {label}
//             {block?.dirty && (
//               <span className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded"
//                 style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)', color: 'var(--primary)' }}>
//                 modifié
//               </span>
//             )}
//           </label>
//           <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{key}</span>
//         </div>

//         {type === 'text'     && <TextField     value={value} onChange={(v) => handleBlockChange(key, v)} />}
//         {type === 'textarea' && <TextareaField value={value} onChange={(v) => handleBlockChange(key, v)} />}
//         {type === 'json'     && <JsonField     value={value} onChange={(v) => handleBlockChange(key, v)} />}
//         {type === 'image'    && (
//           <ImageField
//             value={value}
//             onChange={(v) => handleBlockChange(key, v)}
//             onUpload={handleImageUpload}
//           />
//         )}
//       </div>
//     );
//   };

//   const renderSettingField = (cle, config) => {
//     const setting = settings[cle];
//     const value   = setting?.valeur ?? '';
//     const { label, type } = config;

//     const fieldStyle = {
//       backgroundColor: 'var(--background)',
//       borderColor: setting?.dirty ? 'color-mix(in oklch, var(--primary) 60%, transparent)' : 'var(--border)',
//       color: 'var(--foreground)',
//     };

//     if (type === 'checkbox') {
//       return (
//         <div key={cle} className="flex items-center justify-between py-2">
//           <label className="text-sm" style={{ color: 'var(--foreground)' }}>{label}</label>
//           <input
//             type="checkbox"
//             checked={value === 'true'}
//             onChange={(e) => handleSettingChange(cle, String(e.target.checked))}
//             className="w-5 h-5 rounded cursor-pointer accent-primary"
//           />
//         </div>
//       );
//     }

//     return (
//       <div key={cle}>
//         <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//           {label}
//           {setting?.dirty && (
//             <span className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded"
//               style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)', color: 'var(--primary)' }}>
//               modifié
//             </span>
//           )}
//         </label>
//         <input
//           type={type}
//           value={value}
//           onChange={(e) => handleSettingChange(cle, e.target.value)}
//           className={`${inputCls}`}
//           style={fieldStyle}
//         />
//       </div>
//     );
//   };

//   // ── Render ────────────────────────────────────────────────────────────────
//   const currentBlocks = PAGE_BLOCKS[selectedPage] ?? [];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
//             Gestion du contenu
//           </h1>
//           <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
//             Modifier les textes, images et paramètres du site
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={fetchData}
//             disabled={loading}
//             className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors hover:opacity-80"
//             style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
//             title="Recharger"
//           >
//             <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={saving || !hasDirty}
//             className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-50"
//             style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//           >
//             <Save className="h-4 w-4" />
//             {saving ? 'Sauvegarde...' : hasDirty ? `Sauvegarder` : 'Sauvegarder'}
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-1 border-b" style={{ borderColor: 'var(--border)' }}>
//         {[
//           { id: 'content',  label: 'Contenu des pages' },
//           { id: 'settings', label: 'Paramètres' },
//         ].map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className="px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px"
//             style={{
//               borderColor:  activeTab === tab.id ? 'var(--primary)' : 'transparent',
//               color: activeTab === tab.id ? 'var(--primary)' : 'var(--muted-foreground)',
//             }}
//           >
//             {tab.label}
//             {tab.id === 'content'  && hasDirtyContent  && <span className="ml-2 w-2 h-2 rounded-full bg-amber-400 inline-block" />}
//             {tab.id === 'settings' && hasDirtySettings && <span className="ml-2 w-2 h-2 rounded-full bg-amber-400 inline-block" />}
//           </button>
//         ))}
//       </div>

//       {/* ── Content tab ── */}
//       {activeTab === 'content' && (
//         <div className="space-y-5">
//           {/* Page selector */}
//           <div className="flex gap-2 overflow-x-auto pb-1">
//             {PAGES.map((page) => (
//               <button
//                 key={page.slug}
//                 onClick={() => setSelectedPage(page.slug)}
//                 className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border"
//                 style={{
//                   backgroundColor: selectedPage === page.slug ? 'var(--primary)' : 'transparent',
//                   color:           selectedPage === page.slug ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
//                   borderColor:     selectedPage === page.slug ? 'var(--primary)' : 'var(--border)',
//                 }}
//               >
//                 {page.name}
//               </button>
//             ))}
//           </div>

//           {loading ? (
//             <div className="flex justify-center py-16">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {currentBlocks.length === 0 ? (
//                 <p className="text-center py-8 text-sm" style={{ color: 'var(--muted-foreground)' }}>
//                   Aucun bloc configuré pour cette page.
//                 </p>
//               ) : (
//                 currentBlocks.map(renderField)
//               )}
//             </div>
//           )}
//         </div>
//       )}

//       {/* ── Settings tab ── */}
//       {activeTab === 'settings' && (
//         loading ? (
//           <div className="flex justify-center py-16">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {/* Contact info */}
//             <div className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//               <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
//                 Informations de contact
//               </h3>
//               <div className="space-y-4">
//                 {['whatsapp_general', 'whatsapp_reservations', 'whatsapp_investors', 'address', 'email', 'instagram']
//                   .map((cle) => renderSettingField(cle, SETTINGS_CONFIG[cle]))}
//               </div>
//             </div>

//             {/* Jobs Week */}
//             <div className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//               <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Jobs Week</h3>
//               <div className="space-y-4">
//                 {['jobs_week_open', 'jobs_week_price', 'jobs_week_quota']
//                   .map((cle) => renderSettingField(cle, SETTINGS_CONFIG[cle]))}
//               </div>
//             </div>

//             {/* Maintenance */}
//             <div className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//               <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Système</h3>
//               <div className="space-y-4">
//                 {renderSettingField('maintenance_mode', SETTINGS_CONFIG.maintenance_mode)}
//                 <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
//                   En mode maintenance, le site public affiche une page de maintenance.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )
//       )}

//       {/* Toast */}
//       {toast && (
//         <Toast message={toast.message} type={toast.type} onClose={hideToast} />
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Save, Upload, X, CheckCircle, AlertCircle, RefreshCw,
  Plus, Trash2, Edit3, Eye, EyeOff, GripVertical,
  Megaphone, Users, Settings, FileImage, Globe,
} from 'lucide-react';
import { contentAPI, settingsAPI, adminAnnouncementsAPI, adminTeamAPI } from '../../services/admin';

// ── Constantes ────────────────────────────────────────────────────────────────

const PAGES = [
  { slug: 'home',      name: 'Accueil' },
  { slug: 'coworking', name: 'Coworking' },
  { slug: 'incubator', name: 'Incubateur' },
  { slug: 'training',  name: 'Formations' },
  { slug: 'lounge',    name: 'Lounge' },
  { slug: 'contact',   name: 'Contact' },
];

// Blocs calés exactement sur la structure des composants React clients
// type: 'text' | 'textarea' | 'image' | 'json'
// field: 'text' (→ valeur_texte) | 'media' (→ media_url)
const PAGE_BLOCKS = {
  home: [
    { key: 'hero_title',    label: 'Titre Hero (H1)',        type: 'text',     hint: 'Ex: Work, Connect, Grow' },
    { key: 'hero_subtitle', label: 'Sous-titre Hero',        type: 'textarea', hint: "Espace coworking, programme d'accompagnement..." },
    { key: 'hero_image',    label: 'Image de fond Hero',     type: 'image',    hint: 'Image plein écran en arrière-plan' },
    { key: 'cta_incubator', label: 'Texte bouton incubateur',type: 'text',     hint: "Rejoindre l'incubateur" },
    { key: 'about_text',    label: 'Texte section À propos', type: 'textarea', hint: 'Description du fondateur / historique' },
    { key: 'about_image',   label: 'Photo fondateur (À propos)', type: 'image',hint: 'Portrait du fondateur' },
    { key: 'jobs_week_price',label:'Prix Jobs Week (FCFA)',  type: 'text',     hint: '30000' },
    { key: 'jobs_week_quota',label:'Places Jobs Week',       type: 'text',     hint: '10' },
  ],
  coworking: [
    { key: 'hero_title',    label: 'Titre de la page',       type: 'text',     hint: 'Votre espace de coworking premium' },
    { key: 'description',   label: 'Description principale', type: 'textarea', hint: 'Un espace de travail moderne...' },
    { key: 'hero_image',    label: 'Image principale',       type: 'image',    hint: 'Photo de l\'espace de coworking' },
    { key: 'gallery_1',     label: 'Photo galerie 1',        type: 'image',    hint: 'Salle de réunion' },
    { key: 'gallery_2',     label: 'Photo galerie 2',        type: 'image',    hint: 'Bureau privé' },
    { key: 'gallery_3',     label: 'Photo galerie 3',        type: 'image',    hint: 'Zone lounge' },
    { key: 'rental_hours',  label: 'Horaires location soir', type: 'text',     hint: '18h30 – 22h30' },
  ],
  incubator: [
    { key: 'hero_title',    label: 'Titre de la page',       type: 'text',     hint: "Rejoignez l'incubateur" },
    { key: 'description',   label: 'Description programme',  type: 'textarea', hint: "Rejoignez un programme d'accompagnement..." },
    { key: 'hero_image',    label: 'Image hero',             type: 'image',    hint: 'Photo équipe / startup' },
    { key: 'invest_club',   label: 'Texte Malea Invest Club',type: 'textarea', hint: 'Description du club investisseurs' },
  ],
  training: [
    { key: 'hero_title',    label: 'Titre de la page',       type: 'text',     hint: 'Devenez prêt pour l\'emploi en 5 jours' },
    { key: 'description',   label: 'Description générale',   type: 'textarea', hint: 'Des programmes de formation...' },
    { key: 'jobs_week_desc',label: 'Description Jobs Week',  type: 'textarea', hint: 'Un programme intensif de 5 jours...' },
    { key: 'hero_image',    label: 'Image hero formation',   type: 'image',    hint: 'Photo formation' },
  ],
  lounge: [
    { key: 'hero_title',    label: 'Titre de la page',       type: 'text',     hint: 'Le Lounge' },
    { key: 'description',   label: 'Description',            type: 'textarea', hint: 'Un espace premium conçu pour...' },
    { key: 'hero_image',    label: 'Photo principale salon', type: 'image',    hint: 'Photo du salon' },
    { key: 'gallery_1',     label: 'Photo galerie 1',        type: 'image',    hint: 'Coin café' },
    { key: 'gallery_2',     label: 'Photo galerie 2',        type: 'image',    hint: 'Assises confortables' },
  ],
  contact: [
    { key: 'hero_title',    label: 'Titre de la page',       type: 'text',     hint: "Let's connect" },
    { key: 'address',       label: 'Adresse complète',       type: 'text',     hint: 'Bonapriso, Rue Koloko - Douala' },
    { key: 'map_embed',     label: 'Lien Google Maps (URL)', type: 'text',     hint: 'https://maps.google.com/...' },
  ],
};

const SETTINGS_CONFIG = {
  whatsapp_general:      { label: 'WhatsApp général',       type: 'tel',      hint: 'Ex: 237678111022' },
  whatsapp_reservations: { label: 'WhatsApp Réservations',  type: 'tel',      hint: 'Numéro pour les réservations' },
  whatsapp_investors:    { label: 'WhatsApp Investisseurs', type: 'tel',      hint: 'Numéro pour les investisseurs' },
  address:               { label: 'Adresse du hub',         type: 'text',     hint: 'Bonapriso, Rue Koloko - Douala' },
  email:                 { label: 'Email de contact',       type: 'email',    hint: 'info@maleahub.com' },
  instagram:             { label: 'Instagram (@handle)',    type: 'text',     hint: '@maleahub' },
  jobs_week_open:        { label: 'Jobs Week ouvert',       type: 'checkbox', hint: 'Activer les inscriptions' },
  jobs_week_price:       { label: 'Prix Jobs Week (FCFA)',  type: 'number',   hint: '30000' },
  jobs_week_quota:       { label: 'Quota de places',        type: 'number',   hint: '10' },
  maintenance_mode:      { label: 'Mode maintenance',       type: 'checkbox', hint: 'Désactive le site public' },
};

const TABS = [
  { id: 'content',       label: 'Pages',       icon: Globe },
  { id: 'announcements', label: 'Annonces',    icon: Megaphone },
  { id: 'team',          label: 'Équipe',      icon: Users },
  { id: 'settings',      label: 'Paramètres',  icon: Settings },
];

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in"
      style={{ backgroundColor: type === 'success' ? '#16a34a' : '#dc2626', color: '#fff' }}>
      {type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X className="h-4 w-4" /></button>
    </div>
  );
}

// ── Champs génériques ─────────────────────────────────────────────────────────
const iStyle = { backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' };
const iCls   = 'w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors';

function TextField({ value, onChange, placeholder }) {
  return <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={iCls} style={iStyle} />;
}
function TextareaField({ value, onChange, placeholder }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} rows={4} placeholder={placeholder} className={iCls} style={iStyle} />;
}
function NumberField({ value, onChange, placeholder }) {
  return <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={iCls} style={iStyle} />;
}
function EmailField({ value, onChange, placeholder }) {
  return <input type="email" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={iCls} style={iStyle} />;
}
function TelField({ value, onChange, placeholder }) {
  return <input type="tel" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={iCls} style={iStyle} />;
}
function CheckboxField({ value, onChange, label }) {
  return (
    <div className="flex items-center gap-3">
      <input type="checkbox" checked={value === 'true' || value === true}
        onChange={e => onChange(String(e.target.checked))}
        className="w-5 h-5 rounded cursor-pointer" />
      <span className="text-sm" style={{ color: 'var(--foreground)' }}>{label}</span>
    </div>
  );
}

// ── Image Field (upload + prévisualisation) ───────────────────────────────────
function ImageField({ value, onTextChange, onUpload, placeholder }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    setUploading(true);
    try {
      // Upload → response.data.data.url
      const res = await contentAPI.uploadMedia(file);
      const url  = res.data?.data?.url ?? res.data?.url ?? '';
      if (!url) throw new Error('URL manquante');
      // Met à jour le champ image avec l'URL du fichier uploadé
      onUpload(url);   // → stocké dans media_url via upsertBlock
    } catch (err) {
      console.error('Upload error:', err);
      alert("Erreur d'upload : " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // L'image prévisualisée peut être une URL relative (/uploads/...) ou absolue
  const previewSrc = value
    ? (value.startsWith('http') ? value : `${import.meta.env.VITE_API_URL || 'https://maleahub.vercel.app'}${value}`)
    : null;

  return (
    <div className="space-y-3">
      {previewSrc && (
        <div className="relative inline-block">
          <img src={previewSrc} alt="Prévisualisation"
            className="rounded-xl max-h-52 object-cover border"
            style={{ borderColor: 'var(--border)' }}
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
          <button onClick={() => { onTextChange(''); onUpload(''); }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      <div className="flex items-center gap-3 flex-wrap">
        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium hover:opacity-80 transition-opacity"
          style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
          <Upload className="h-4 w-4" />
          {uploading ? 'Upload en cours...' : 'Choisir une image'}
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
            disabled={uploading}
            onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
        </label>
        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>ou</span>
        <input type="text" value={value} onChange={e => onTextChange(e.target.value)}
          placeholder={placeholder || 'https://... (URL externe)'}
          className="flex-1 min-w-48 px-3 py-2 rounded-lg border text-xs focus:outline-none"
          style={iStyle} />
      </div>
    </div>
  );
}

// ── SECTION : Gestion contenu des pages ──────────────────────────────────────
function ContentTab({ selectedPage, onPageChange }) {
  const [contentBlocks, setContentBlocks] = useState({});
  const [loading, setLoading]             = useState(true);
  const [saving, setSaving]               = useState(false);
  const [toast, setToast]                 = useState(null);

  const showToast = (msg, type = 'success') => setToast({ message: msg, type });

  const fetchBlocks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await contentAPI.getBlocks(selectedPage);
      // Backend: { status, data: { blocks: [{id, page_slug, bloc_key, valeur_texte, media_url, actif}] } }
      const arr = res.data?.data?.blocks ?? res.data?.blocks ?? [];
      const map = {};
      arr.forEach(b => {
        map[b.bloc_key] = { ...b, dirty: false };
      });
      setContentBlocks(map);
    } catch (err) {
      showToast('Erreur de chargement', 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedPage]);

  useEffect(() => { fetchBlocks(); }, [fetchBlocks]);

  const handleTextChange = (key, value) => {
    setContentBlocks(prev => ({
      ...prev,
      [key]: {
        page_slug: selectedPage, bloc_key: key, actif: true,
        ...prev[key],
        valeur_texte: value,
        dirty: true,
      },
    }));
  };

  // Pour les images uploadées → stocke dans media_url
  const handleMediaChange = (key, url) => {
    setContentBlocks(prev => ({
      ...prev,
      [key]: {
        page_slug: selectedPage, bloc_key: key, actif: true,
        ...prev[key],
        media_url: url,   // ← CORRECTION : stocke dans media_url, pas valeur_texte
        dirty: true,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    let errors = 0;
    const dirty = Object.entries(contentBlocks).filter(([, b]) => b.dirty);

    await Promise.all(dirty.map(async ([key, block]) => {
      try {
        const payload = {
          page_slug:    selectedPage,
          bloc_key:     key,
          valeur_texte: block.valeur_texte ?? null,
          media_url:    block.media_url    ?? null,
          actif:        block.actif        ?? true,
        };
        if (block.id) {
          // Bloc existant → PUT /system/content/:id
          await contentAPI.updateBlock(block.id, payload);
        } else {
          // Nouveau bloc → PUT /system/content (upsert)
          await contentAPI.upsertBlock(payload);
        }
      } catch (err) {
        console.error(`Bloc ${key}:`, err);
        errors++;
      }
    }));

    setSaving(false);
    if (errors === 0) {
      showToast('Contenu sauvegardé ✓');
      fetchBlocks(); // Recharge pour avoir les vrais ids
    } else {
      showToast(`${errors} erreur(s) lors de la sauvegarde`, 'error');
    }
  };

  const hasDirty = Object.values(contentBlocks).some(b => b.dirty);
  const currentBlocks = PAGE_BLOCKS[selectedPage] ?? [];

  const renderBlock = (blockDef) => {
    const { key, label, type, hint } = blockDef;
    const block = contentBlocks[key];
    // Pour un bloc image : la valeur visible est media_url (upload) ou valeur_texte (URL manuelle)
    const textVal  = block?.valeur_texte ?? '';
    const mediaVal = block?.media_url    ?? '';
    const dispVal  = type === 'image' ? (mediaVal || textVal) : textVal;

    return (
      <div key={key} className="rounded-xl p-5 border space-y-3 transition-all"
        style={{ backgroundColor: 'var(--card)', borderColor: block?.dirty ? 'color-mix(in oklch, var(--primary) 60%, transparent)' : 'var(--border)' }}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <label className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              {label}
              {block?.dirty && (
                <span className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)', color: 'var(--primary)' }}>
                  modifié
                </span>
              )}
            </label>
            {hint && <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{hint}</p>}
          </div>
          <code className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}>{key}</code>
        </div>

        {type === 'text' && <TextField value={textVal} onChange={v => handleTextChange(key, v)} placeholder={hint} />}
        {type === 'textarea' && <TextareaField value={textVal} onChange={v => handleTextChange(key, v)} placeholder={hint} />}
        {type === 'image' && (
          <ImageField
            value={dispVal}
            onTextChange={v => handleTextChange(key, v)}
            onUpload={url => handleMediaChange(key, url)}
            placeholder={hint}
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Sélecteur de page */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {PAGES.map(p => (
          <button key={p.slug} onClick={() => onPageChange(p.slug)}
            className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap border transition-colors"
            style={{
              backgroundColor: selectedPage === p.slug ? 'var(--primary)' : 'transparent',
              color:           selectedPage === p.slug ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
              borderColor:     selectedPage === p.slug ? 'var(--primary)' : 'var(--border)',
            }}>
            {p.name}
          </button>
        ))}
      </div>

      {/* Header + bouton save */}
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          {currentBlocks.length} bloc(s) pour cette page
        </p>
        <div className="flex items-center gap-2">
          <button onClick={fetchBlocks} disabled={loading}
            className="p-2 rounded-lg border hover:opacity-80"
            style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={handleSave} disabled={saving || !hasDirty}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
            <Save className="h-4 w-4" />
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
      ) : (
        <div className="space-y-4">{currentBlocks.map(renderBlock)}</div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// ── SECTION : Annonces ────────────────────────────────────────────────────────
function AnnouncementsTab() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [editing, setEditing]   = useState(null); // null | 'new' | { ...announcement }
  const [toast, setToast]       = useState(null);
  const [saving, setSaving]     = useState(false);

  const showToast = (msg, type = 'success') => setToast({ message: msg, type });

  const fresh = { titre: '', description: '', image_url: '', date_event: '', lien_wa: '', actif: true, ordre: 0 };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await adminAnnouncementsAPI.getAll();
      setAnnouncements(res.data?.data?.announcements ?? res.data?.announcements ?? []);
    } catch { showToast('Erreur chargement', 'error'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSave = async () => {
    if (!editing || !editing.titre || !editing.description) {
      showToast('Titre et description requis', 'error'); return;
    }
    setSaving(true);
    try {
      const payload = {
        titre:       editing.titre,
        description: editing.description,
        image_url:   editing.image_url || null,
        date_event:  editing.date_event || null,
        lien_wa:     editing.lien_wa || null,
        actif:       editing.actif !== false,
        ordre:       Number(editing.ordre) || 0,
      };
      if (editing.id) {
        await adminAnnouncementsAPI.update(editing.id, payload);
        showToast('Annonce mise à jour ✓');
      } else {
        await adminAnnouncementsAPI.create(payload);
        showToast('Annonce créée ✓');
      }
      setEditing(null);
      fetchAll();
    } catch (err) {
      showToast(err.response?.data?.message || 'Erreur', 'error');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette annonce ?')) return;
    try {
      await adminAnnouncementsAPI.delete(id);
      showToast('Annonce supprimée');
      fetchAll();
    } catch { showToast('Erreur suppression', 'error'); }
  };

  const handleToggle = async (ann) => {
    try {
      await adminAnnouncementsAPI.update(ann.id, { actif: !ann.actif });
      fetchAll();
    } catch { showToast('Erreur', 'error'); }
  };

  const handleUploadImage = async (file) => {
    try {
      const res = await contentAPI.uploadMedia(file);
      const url = res.data?.data?.url ?? res.data?.url ?? '';
      if (!url) throw new Error('URL manquante');
      setEditing(prev => ({ ...prev, image_url: url }));
    } catch (err) { showToast("Erreur upload : " + err.message, 'error'); }
  };

  const previewUrl = (url) => url
    ? (url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'https://maleahub.vercel.app'}${url}`)
    : null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
            Annonces & Événements
          </h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Apparaissent sur la page Annonces du site public
          </p>
        </div>
        <button onClick={() => setEditing({ ...fresh })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          <Plus className="h-4 w-4" /> Nouvelle annonce
        </button>
      </div>

      {/* Formulaire d'édition */}
      {editing && (
        <div className="rounded-xl border p-6 space-y-4"
          style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 40%, transparent)' }}>
          <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
            {editing.id ? 'Modifier l\'annonce' : 'Nouvelle annonce'}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Titre *</label>
              <TextField value={editing.titre} onChange={v => setEditing(p => ({ ...p, titre: v }))} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Date / Période</label>
              <TextField value={editing.date_event || ''} placeholder="Ex: 15-19 Juillet 2024"
                onChange={v => setEditing(p => ({ ...p, date_event: v }))} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Description *</label>
            <TextareaField value={editing.description} onChange={v => setEditing(p => ({ ...p, description: v }))} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Image</label>
            <ImageField
              value={editing.image_url || ''}
              onTextChange={v => setEditing(p => ({ ...p, image_url: v }))}
              onUpload={url => setEditing(p => ({ ...p, image_url: url }))}
              placeholder="URL ou upload"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Lien WhatsApp (optionnel)</label>
            <TelField value={editing.lien_wa || ''} placeholder="https://wa.me/237..."
              onChange={v => setEditing(p => ({ ...p, lien_wa: v }))} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Ordre d'affichage</label>
              <NumberField value={editing.ordre || 0} onChange={v => setEditing(p => ({ ...p, ordre: v }))} />
            </div>
            <div className="flex items-end pb-1">
              <CheckboxField value={String(editing.actif !== false)} label="Visible sur le site"
                onChange={v => setEditing(p => ({ ...p, actif: v === 'true' }))} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              <Save className="h-4 w-4" /> {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
            <button onClick={() => setEditing(null)}
              className="px-5 py-2 rounded-lg text-sm border"
              style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Liste des annonces */}
      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-7 w-7 border-b-2 border-primary" /></div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-12 rounded-xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <Megaphone className="h-10 w-10 mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
          <p style={{ color: 'var(--muted-foreground)' }}>Aucune annonce. Créez-en une !</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {announcements.map(ann => (
            <div key={ann.id} className="rounded-xl border overflow-hidden"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', opacity: ann.actif ? 1 : 0.6 }}>
              {ann.image_url && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={previewUrl(ann.image_url)} alt={ann.titre}
                    className="w-full h-full object-cover"
                    onError={e => { e.currentTarget.parentElement.style.display = 'none'; }} />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-sm leading-tight" style={{ color: 'var(--foreground)' }}>{ann.titre}</h3>
                  <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: ann.actif ? 'color-mix(in oklch, var(--primary) 15%, transparent)' : 'var(--muted)', color: ann.actif ? 'var(--primary)' : 'var(--muted-foreground)' }}>
                    {ann.actif ? 'Visible' : 'Masqué'}
                  </span>
                </div>
                {ann.date_event && (
                  <p className="text-xs mb-2" style={{ color: 'var(--primary)' }}>{ann.date_event}</p>
                )}
                <p className="text-xs line-clamp-2 mb-4" style={{ color: 'var(--muted-foreground)' }}>{ann.description}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditing({ ...ann })}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border text-xs"
                    style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
                    <Edit3 className="h-3.5 w-3.5" /> Modifier
                  </button>
                  <button onClick={() => handleToggle(ann)}
                    className="p-1.5 rounded-lg border" title={ann.actif ? 'Masquer' : 'Afficher'}
                    style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
                    {ann.actif ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                  <button onClick={() => handleDelete(ann.id)}
                    className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// ── SECTION : Équipe ──────────────────────────────────────────────────────────
function TeamTab() {
  const [members, setMembers]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [editing, setEditing]   = useState(null);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState(null);

  const showToast = (msg, type = 'success') => setToast({ message: msg, type });
  const freshMember = { nom: '', role: '', image_url: '', bio: '', actif: true, ordre: 0 };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await adminTeamAPI.getAll();
      setMembers(res.data?.data?.members ?? res.data?.members ?? []);
    } catch { showToast('Erreur chargement', 'error'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSave = async () => {
    if (!editing?.nom || !editing?.role) { showToast('Nom et rôle requis', 'error'); return; }
    setSaving(true);
    try {
      const payload = {
        nom:       editing.nom,
        role:      editing.role,
        image_url: editing.image_url || null,
        bio:       editing.bio || null,
        actif:     editing.actif !== false,
        ordre:     Number(editing.ordre) || 0,
      };
      if (editing.id) {
        await adminTeamAPI.update(editing.id, payload);
        showToast('Membre mis à jour ✓');
      } else {
        await adminTeamAPI.create(payload);
        showToast('Membre créé ✓');
      }
      setEditing(null);
      fetchAll();
    } catch (err) {
      showToast(err.response?.data?.message || 'Erreur', 'error');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce membre ?')) return;
    try {
      await adminTeamAPI.delete(id);
      showToast('Membre supprimé');
      fetchAll();
    } catch { showToast('Erreur', 'error'); }
  };

  const handleToggle = async (m) => {
    try {
      await adminTeamAPI.update(m.id, { actif: !m.actif });
      fetchAll();
    } catch { showToast('Erreur', 'error'); }
  };

  const previewUrl = (url) => url
    ? (url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'https://maleahub.vercel.app'}${url}`)
    : null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Notre Équipe</h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Membres affichés sur la page Annonces & Équipe
          </p>
        </div>
        <button onClick={() => setEditing({ ...freshMember })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          <Plus className="h-4 w-4" /> Ajouter un membre
        </button>
      </div>

      {/* Formulaire */}
      {editing && (
        <div className="rounded-xl border p-6 space-y-4"
          style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 40%, transparent)' }}>
          <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
            {editing.id ? 'Modifier le membre' : 'Nouveau membre'}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Nom *</label>
              <TextField value={editing.nom} onChange={v => setEditing(p => ({ ...p, nom: v }))} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Rôle / Poste *</label>
              <TextField value={editing.role} placeholder="Ex: Fondateur & CEO"
                onChange={v => setEditing(p => ({ ...p, role: v }))} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Photo</label>
            <ImageField
              value={editing.image_url || ''}
              onTextChange={v => setEditing(p => ({ ...p, image_url: v }))}
              onUpload={url => setEditing(p => ({ ...p, image_url: url }))}
              placeholder="URL ou upload d'une photo"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Bio (optionnel)</label>
            <TextareaField value={editing.bio || ''} placeholder="Courte biographie..."
              onChange={v => setEditing(p => ({ ...p, bio: v }))} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Ordre d'affichage</label>
              <NumberField value={editing.ordre || 0} onChange={v => setEditing(p => ({ ...p, ordre: v }))} />
            </div>
            <div className="flex items-end pb-1">
              <CheckboxField value={String(editing.actif !== false)} label="Visible sur le site"
                onChange={v => setEditing(p => ({ ...p, actif: v === 'true' }))} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              <Save className="h-4 w-4" /> {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
            <button onClick={() => setEditing(null)}
              className="px-5 py-2 rounded-lg text-sm border"
              style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Grid membres */}
      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-7 w-7 border-b-2 border-primary" /></div>
      ) : members.length === 0 ? (
        <div className="text-center py-12 rounded-xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <Users className="h-10 w-10 mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
          <p style={{ color: 'var(--muted-foreground)' }}>Aucun membre. Ajoutez votre équipe !</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {members.map(m => (
            <div key={m.id} className="rounded-xl border overflow-hidden text-center p-4"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', opacity: m.actif ? 1 : 0.6 }}>
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2"
                style={{ borderColor: 'color-mix(in oklch, var(--primary) 40%, transparent)' }}>
                {m.image_url ? (
                  <img src={previewUrl(m.image_url)} alt={m.nom} className="w-full h-full object-cover"
                    onError={e => { e.currentTarget.src = 'https://via.placeholder.com/80?text=👤'; }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl"
                    style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>👤</div>
                )}
              </div>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{m.nom}</h3>
              <p className="text-xs mt-0.5 mb-3" style={{ color: 'var(--primary)' }}>{m.role}</p>
              <div className="flex items-center gap-1.5 justify-center">
                <button onClick={() => setEditing({ ...m })}
                  className="flex-1 py-1.5 rounded-lg border text-xs"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
                  Modifier
                </button>
                <button onClick={() => handleToggle(m)} className="p-1.5 rounded-lg border"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
                  {m.actif ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
                <button onClick={() => handleDelete(m.id)}
                  className="p-1.5 rounded-lg border border-red-200 text-red-500">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// ── SECTION : Settings ────────────────────────────────────────────────────────
function SettingsTab() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState(null);

  const showToast = (msg, type = 'success') => setToast({ message: msg, type });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await settingsAPI.getAll();
      const arr = res.data?.data?.settings ?? res.data?.settings ?? [];
      const map = {};
      arr.forEach(s => { map[s.cle] = { ...s, dirty: false }; });
      setSettings(map);
    } catch { showToast('Erreur chargement', 'error'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleChange = (cle, valeur) => {
    setSettings(prev => ({ ...prev, [cle]: { cle, ...prev[cle], valeur, dirty: true } }));
  };

  const handleSave = async () => {
    setSaving(true);
    let errors = 0;
    const dirty = Object.entries(settings).filter(([, s]) => s.dirty);
    await Promise.all(dirty.map(async ([cle, s]) => {
      try { await settingsAPI.update(cle, s.valeur); }
      catch { errors++; }
    }));
    setSaving(false);
    if (errors === 0) { showToast('Paramètres sauvegardés ✓'); fetchSettings(); }
    else showToast(`${errors} erreur(s)`, 'error');
  };

  const hasDirty = Object.values(settings).some(s => s.dirty);

  const renderSetting = (cle, config) => {
    const s = settings[cle];
    const val = s?.valeur ?? '';
    return (
      <div key={cle}>
        {config.type !== 'checkbox' && (
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
            {config.label}
            {config.hint && <span className="ml-2 text-xs font-normal" style={{ color: 'var(--muted-foreground)' }}>{config.hint}</span>}
            {s?.dirty && <span className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)', color: 'var(--primary)' }}>modifié</span>}
          </label>
        )}
        {config.type === 'text'     && <TextField     value={val} onChange={v => handleChange(cle, v)} placeholder={config.hint} />}
        {config.type === 'email'    && <EmailField    value={val} onChange={v => handleChange(cle, v)} placeholder={config.hint} />}
        {config.type === 'tel'      && <TelField      value={val} onChange={v => handleChange(cle, v)} placeholder={config.hint} />}
        {config.type === 'number'   && <NumberField   value={val} onChange={v => handleChange(cle, v)} placeholder={config.hint} />}
        {config.type === 'checkbox' && (
          <div className="flex items-center justify-between">
            <CheckboxField value={val} label={config.label} onChange={v => handleChange(cle, v)} />
            {s?.dirty && <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)', color: 'var(--primary)' }}>modifié</span>}
          </div>
        )}
      </div>
    );
  };

  const groups = [
    { title: 'Contact & WhatsApp', keys: ['whatsapp_general','whatsapp_reservations','whatsapp_investors','address','email','instagram'] },
    { title: 'Jobs Week',          keys: ['jobs_week_open','jobs_week_price','jobs_week_quota'] },
    { title: 'Système',            keys: ['maintenance_mode'] },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Paramètres du site</h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>WhatsApp, tarifs, mode maintenance…</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchSettings} disabled={loading}
            className="p-2 rounded-lg border hover:opacity-80"
            style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={handleSave} disabled={saving || !hasDirty}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
            <Save className="h-4 w-4" /> {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-7 w-7 border-b-2 border-primary" /></div>
      ) : (
        <div className="space-y-5">
          {groups.map(g => (
            <div key={g.title} className="rounded-xl p-5 border space-y-4"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
              <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{g.title}</h3>
              {g.keys.map(cle => SETTINGS_CONFIG[cle] ? renderSetting(cle, SETTINGS_CONFIG[cle]) : null)}
            </div>
          ))}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// ── Composant principal ───────────────────────────────────────────────────────
export default function ContentManager() {
  const [activeTab, setActiveTab]     = useState('content');
  const [selectedPage, setSelectedPage] = useState('home');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Gestion du contenu</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Textes, images, annonces, équipe et paramètres du site
        </p>
      </div>

      {/* Tabs principaux */}
      <div className="flex gap-1 border-b overflow-x-auto" style={{ borderColor: 'var(--border)' }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors"
            style={{
              borderColor: activeTab === tab.id ? 'var(--primary)' : 'transparent',
              color:       activeTab === tab.id ? 'var(--primary)' : 'var(--muted-foreground)',
            }}>
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu des tabs */}
      {activeTab === 'content'       && <ContentTab selectedPage={selectedPage} onPageChange={setSelectedPage} />}
      {activeTab === 'announcements' && <AnnouncementsTab />}
      {activeTab === 'team'          && <TeamTab />}
      {activeTab === 'settings'      && <SettingsTab />}
    </div>
  );
}
