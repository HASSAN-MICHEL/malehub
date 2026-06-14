



// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import {
//   Save, Upload, X, CheckCircle, Mail ,  AlertCircle, RefreshCw,
//   Plus, Trash2, Edit3, Eye, EyeOff, GripVertical,
//   Megaphone, Users, Settings, FileImage, Globe,
// } from 'lucide-react';
// import { contentAPI, settingsAPI, adminAnnouncementsAPI, adminTeamAPI , adminApi } from '../../services/admin';

// // ── Constantes

// const PAGES = [
//   { slug: 'home',      name: 'Accueil' },
//   { slug: 'coworking', name: 'Coworking' },
//   { slug: 'incubator', name: 'Incubateur' },
//   { slug: 'training',  name: 'Formations' },
//   { slug: 'lounge',    name: 'Lounge' },
//   { slug: 'events',    name: 'Événements' }, 
//   { slug: 'contact',   name: 'Contact' },
// ];

// // Blocs calés exactement sur la structure des composants React clients
// // type: 'text' | 'textarea' | 'image' | 'json'
// // field: 'text' (→ valeur_texte) | 'media' (→ media_url)
// const PAGE_BLOCKS = {
//  home: [
//   { key: 'hero_title',    label: 'Titre Hero (H1)',        type: 'text',     hint: 'Ex: Work, Connect, Grow' },
//   { key: 'hero_subtitle', label: 'Sous-titre Hero',        type: 'textarea', hint: "Espace coworking, programme d'accompagnement..." },
//   { key: 'hero_image',    label: 'Image de fond Hero',     type: 'image',    hint: 'Image plein écran en arrière-plan' },
//   { key: 'cta_incubator', label: 'Texte bouton incubateur',type: 'text',     hint: "Rejoindre l'incubateur" },
//   { key: 'about_text',    label: 'Texte section À propos', type: 'textarea', hint: 'Description du fondateur / historique' },
//   { key: 'about_image',   label: 'Photo fondateur (À propos)', type: 'image',hint: 'Portrait du fondateur' },
//   { key: 'why_choose_badge',          label: 'Badge Pourquoi Choisir',       type: 'text',     hint: 'Ex: Nos Avantages' },
//   { key: 'why_choose_title_prefix',   label: 'Début titre Pourquoi Choisir', type: 'text',     hint: 'Ex: Pourquoi choisir' },
//   { key: 'why_choose_title_highlight',label: 'Mot mis en avant',             type: 'text',     hint: 'Ex: Malea Hub' },
//   { key: 'why_choose_subtitle',       label: 'Sous-titre Pourquoi Choisir',  type: 'textarea', hint: 'Ex: Tout ce dont vous avez besoin...' },
  
//   { key: 'jobs_week_price', label:'Prix Jobs Week (FCFA)',  type: 'text',     hint: '30000' },
//   { key: 'jobs_week_quota', label:'Places Jobs Week',       type: 'text',     hint: '10' },
// ],
//   coworking: [
//     { key: 'hero_title',    label: 'Titre de la page',       type: 'text',     hint: 'Votre espace de coworking premium' },
//     { key: 'description',   label: 'Description principale', type: 'textarea', hint: 'Un espace de travail moderne...' },
//     { key: 'hero_image',    label: 'Image principale',       type: 'image',    hint: 'Photo de l\'espace de coworking' },
//     { key: 'gallery_1',     label: 'Photo galerie 1',        type: 'image',    hint: 'Salle de réunion' },
//     { key: 'gallery_2',     label: 'Photo galerie 2',        type: 'image',    hint: 'Bureau privé' },
//     { key: 'gallery_3',     label: 'Photo galerie 3',        type: 'image',    hint: 'Zone lounge' },
//     { key: 'rental_hours',  label: 'Horaires location soir', type: 'text',     hint: '18h30 – 22h30' },
//   ],
//   incubator: [
//     { key: 'hero_title',    label: 'Titre de la page',       type: 'text',     hint: "Rejoignez l'incubateur" },
//     { key: 'description',   label: 'Description programme',  type: 'textarea', hint: "Rejoignez un programme d'accompagnement..." },
//     { key: 'hero_image',    label: 'Image hero',             type: 'image',    hint: 'Photo équipe / startup' },
//     { key: 'invest_club',   label: 'Texte Malea Invest Club',type: 'textarea', hint: 'Description du club investisseurs' },
//   ],
//   training: [
//     { key: 'hero_title',    label: 'Titre de la page',       type: 'text',     hint: 'Devenez prêt pour l\'emploi en 5 jours' },
//     { key: 'description',   label: 'Description générale',   type: 'textarea', hint: 'Des programmes de formation...' },
//     { key: 'jobs_week_desc',label: 'Description Jobs Week',  type: 'textarea', hint: 'Un programme intensif de 5 jours...' },
//     { key: 'hero_image',    label: 'Image hero formation',   type: 'image',    hint: 'Photo formation' },
//   ],
//   lounge: [
//     { key: 'hero_title',    label: 'Titre de la page',       type: 'text',     hint: 'Le Lounge' },
//     { key: 'description',   label: 'Description',            type: 'textarea', hint: 'Un espace premium conçu pour...' },
//     { key: 'hero_image',    label: 'Photo principale salon', type: 'image',    hint: 'Photo du salon' },
//     { key: 'gallery_1',     label: 'Photo galerie 1',        type: 'image',    hint: 'Coin café' },
//     { key: 'gallery_2',     label: 'Photo galerie 2',        type: 'image',    hint: 'Assises confortables' },
//   ],
//   contact: [
//     { key: 'hero_title',    label: 'Titre de la page',       type: 'text',     hint: "Let's connect" },
//     { key: 'address',       label: 'Adresse complète',       type: 'text',     hint: 'Bonapriso, Rue Koloko - Douala' },
//     { key: 'map_embed',     label: 'Lien Google Maps (URL)', type: 'text',     hint: 'https://maps.google.com/...' },
//   ],
//   events: [
//   { key: 'hero_title',    label: 'Titre Hero (H1)',        type: 'text',     hint: 'Ex: Annonces & Événements' },
//   { key: 'hero_badge',    label: 'Badge Hero',             type: 'text',     hint: 'Annonces & Événements' },
//   { key: 'description',   label: 'Description Hero',       type: 'textarea', hint: 'Découvrez nos annonces...' },
//   { key: 'hero_image',    label: 'Image de fond Hero',     type: 'image',    hint: 'Image en arrière-plan' },
//   { key: 'announcements_title',    label: 'Titre section Annonces', type: 'text', hint: 'Nos prochains événements' },
//   { key: 'announcements_subtitle', label: 'Sous-titre Annonces',    type: 'text', hint: 'Ne manquez aucune opportunité' },
//   { key: 'announcements_cta',      label: 'Texte bouton Annonces',  type: 'text', hint: 'En savoir plus' },
//   { key: 'team_title',        label: 'Titre section Équipe',   type: 'text', hint: 'Notre Équipe' },
//   { key: 'team_subtitle',     label: 'Sous-titre Équipe',      type: 'text', hint: 'Des professionnels passionnés...' },
// ],
// };

// const SETTINGS_CONFIG = {
//   whatsapp_general:      { label: 'WhatsApp général',       type: 'tel',      hint: 'Ex: 237678111022' },
//   whatsapp_reservations: { label: 'WhatsApp Réservations',  type: 'tel',      hint: 'Numéro pour les réservations' },
//   whatsapp_investors:    { label: 'WhatsApp Investisseurs', type: 'tel',      hint: 'Numéro pour les investisseurs' },
//   address:               { label: 'Adresse du hub',         type: 'text',     hint: 'Bonapriso, Rue Koloko - Douala' },
//   email:                 { label: 'Email de contact',       type: 'email',    hint: 'info@maleahub.com' },
//   instagram:             { label: 'Instagram (@handle)',    type: 'text',     hint: '@maleahub' },
//   jobs_week_open:        { label: 'Jobs Week ouvert',       type: 'checkbox', hint: 'Activer les inscriptions' },
//   jobs_week_price:       { label: 'Prix Jobs Week (FCFA)',  type: 'number',   hint: '30000' },
//   jobs_week_quota:       { label: 'Quota de places',        type: 'number',   hint: '10' },
//   maintenance_mode:      { label: 'Mode maintenance',       type: 'checkbox', hint: 'Désactive le site public' },
// };

// const TABS = [
//   { id: 'content',       label: 'Pages',       icon: Globe },
//   { id: 'announcements', label: 'Annonces',    icon: Megaphone },
//   { id: 'team',          label: 'Équipe',      icon: Users },
//   { id: 'newsletter',    label: 'Newsletter',  icon: Mail },
//   { id: 'settings',      label: 'Paramètres',  icon: Settings },
// ];

// // ── Toast ─────────────────────────────────────────────────────────────────────
// function Toast({ message, type, onClose }) {
//   useEffect(() => {
//     const t = setTimeout(onClose, 4500);
//     return () => clearTimeout(t);
//   }, [onClose]);
//   return (
//     <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in"
//       style={{ backgroundColor: type === 'success' ? '#16a34a' : '#dc2626', color: '#fff' }}>
//       {type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
//       {message}
//       <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X className="h-4 w-4" /></button>
//     </div>
//   );
// }

// // ── Champs génériques ─────────────────────────────────────────────────────────
// const iStyle = { backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' };
// const iCls   = 'w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors';

// function TextField({ value, onChange, placeholder }) {
//   return <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={iCls} style={iStyle} />;
// }
// function TextareaField({ value, onChange, placeholder }) {
//   return <textarea value={value} onChange={e => onChange(e.target.value)} rows={4} placeholder={placeholder} className={iCls} style={iStyle} />;
// }
// function NumberField({ value, onChange, placeholder }) {
//   return <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={iCls} style={iStyle} />;
// }
// function EmailField({ value, onChange, placeholder }) {
//   return <input type="email" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={iCls} style={iStyle} />;
// }
// function TelField({ value, onChange, placeholder }) {
//   return <input type="tel" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={iCls} style={iStyle} />;
// }
// function CheckboxField({ value, onChange, label }) {
//   return (
//     <div className="flex items-center gap-3">
//       <input type="checkbox" checked={value === 'true' || value === true}
//         onChange={e => onChange(String(e.target.checked))}
//         className="w-5 h-5 rounded cursor-pointer" />
//       <span className="text-sm" style={{ color: 'var(--foreground)' }}>{label}</span>
//     </div>
//   );
// }

// // ── Image Field (upload + prévisualisation) ───────────────────────────────────
// function ImageField({ value, onTextChange, onUpload, placeholder }) {
//   const [uploading, setUploading] = useState(false);

//   const handleFile = async (file) => {
//     setUploading(true);
//     try {
//       // Upload → response.data.data.url
//       const res = await contentAPI.uploadMedia(file);
//       const url  = res.data?.data?.url ?? res.data?.url ?? '';
//       if (!url) throw new Error('URL manquante');
//       // Met à jour le champ image avec l'URL du fichier uploadé
//       onUpload(url);   // → stocké dans media_url via upsertBlock
//     } catch (err) {
//       console.error('Upload error:', err);
//       alert("Erreur d'upload : " + err.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // L'image prévisualisée peut être une URL relative (/uploads/...) ou absolue
//   const previewSrc = value
//     ? (value.startsWith('http') ? value : `${import.meta.env.VITE_API_URL || 'https://maleahub.vercel.app'}${value}`)
//     : null;

//   return (
//     <div className="space-y-3">
//       {previewSrc && (
//         <div className="relative inline-block">
//           <img src={previewSrc} alt="Prévisualisation"
//             className="rounded-xl max-h-52 object-cover border"
//             style={{ borderColor: 'var(--border)' }}
//             onError={e => { e.currentTarget.style.display = 'none'; }}
//           />
//           <button onClick={() => { onTextChange(''); onUpload(''); }}
//             className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600">
//             <X className="h-3.5 w-3.5" />
//           </button>
//         </div>
//       )}
//       <div className="flex items-center gap-3 flex-wrap">
//         <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium hover:opacity-80 transition-opacity"
//           style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
//           <Upload className="h-4 w-4" />
//           {uploading ? 'Upload en cours...' : 'Choisir une image'}
//           <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
//             disabled={uploading}
//             onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
//         </label>
//         <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>ou</span>
//         <input type="text" value={value} onChange={e => onTextChange(e.target.value)}
//           placeholder={placeholder || 'https://... (URL externe)'}
//           className="flex-1 min-w-48 px-3 py-2 rounded-lg border text-xs focus:outline-none"
//           style={iStyle} />
//       </div>
//     </div>
//   );
// }

// // ── SECTION : Gestion contenu des pages
// function ContentTab({ selectedPage, onPageChange }) {
//   const [contentBlocks, setContentBlocks] = useState({});
//   const [loading, setLoading]             = useState(true);
//   const [saving, setSaving]               = useState(false);
//   const [toast, setToast]                 = useState(null);

//   const showToast = (msg, type = 'success') => setToast({ message: msg, type });

//   const fetchBlocks = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await contentAPI.getBlocks(selectedPage);
//       // Backend: { status, data: { blocks: [{id, page_slug, bloc_key, valeur_texte, media_url, actif}] } }
//       const arr = res.data?.data?.blocks ?? res.data?.blocks ?? [];
//       const map = {};
//       arr.forEach(b => {
//         map[b.bloc_key] = { ...b, dirty: false };
//       });
//       setContentBlocks(map);
//     } catch (err) {
//       showToast('Erreur de chargement', 'error');
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedPage]);

//   useEffect(() => { fetchBlocks(); }, [fetchBlocks]);

//   const handleTextChange = (key, value) => {
//     setContentBlocks(prev => ({
//       ...prev,
//       [key]: {
//         page_slug: selectedPage, bloc_key: key, actif: true,
//         ...prev[key],
//         valeur_texte: value,
//         dirty: true,
//       },
//     }));
//   };

//   // Pour les images uploadées → stocke dans media_url
//   const handleMediaChange = (key, url) => {
//     setContentBlocks(prev => ({
//       ...prev,
//       [key]: {
//         page_slug: selectedPage, bloc_key: key, actif: true,
//         ...prev[key],
//         media_url: url,   // ← CORRECTION : stocke dans media_url, pas valeur_texte
//         dirty: true,
//       },
//     }));
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     let errors = 0;
//     const dirty = Object.entries(contentBlocks).filter(([, b]) => b.dirty);

//     await Promise.all(dirty.map(async ([key, block]) => {
//       try {
//         const payload = {
//           page_slug:    selectedPage,
//           bloc_key:     key,
//           valeur_texte: block.valeur_texte ?? null,
//           media_url:    block.media_url    ?? null,
//           actif:        block.actif        ?? true,
//         };
//         if (block.id) {
//           // Bloc existant → PUT /system/content/:id
//           await contentAPI.updateBlock(block.id, payload);
//         } else {
//           // Nouveau bloc → PUT /system/content (upsert)
//           await contentAPI.upsertBlock(payload);
//         }
//       } catch (err) {
//         console.error(`Bloc ${key}:`, err);
//         errors++;
//       }
//     }));

//     setSaving(false);
//     if (errors === 0) {
//       showToast('Contenu sauvegardé ✓');
//       fetchBlocks(); // Recharge pour avoir les vrais ids
//     } else {
//       showToast(`${errors} erreur(s) lors de la sauvegarde`, 'error');
//     }
//   };

//   const hasDirty = Object.values(contentBlocks).some(b => b.dirty);
//   const currentBlocks = PAGE_BLOCKS[selectedPage] ?? [];

//   const renderBlock = (blockDef) => {
//     const { key, label, type, hint } = blockDef;
//     const block = contentBlocks[key];
//     // Pour un bloc image : la valeur visible est media_url (upload) ou valeur_texte (URL manuelle)
//     const textVal  = block?.valeur_texte ?? '';
//     const mediaVal = block?.media_url    ?? '';
//     const dispVal  = type === 'image' ? (mediaVal || textVal) : textVal;

//     return (
//       <div key={key} className="rounded-xl p-5 border space-y-3 transition-all"
//         style={{ backgroundColor: 'var(--card)', borderColor: block?.dirty ? 'color-mix(in oklch, var(--primary) 60%, transparent)' : 'var(--border)' }}>
//         <div className="flex items-start justify-between gap-2">
//           <div>
//             <label className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
//               {label}
//               {block?.dirty && (
//                 <span className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded"
//                   style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)', color: 'var(--primary)' }}>
//                   modifié
//                 </span>
//               )}
//             </label>
//             {hint && <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{hint}</p>}
//           </div>
//           <code className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}>{key}</code>
//         </div>

//         {type === 'text' && <TextField value={textVal} onChange={v => handleTextChange(key, v)} placeholder={hint} />}
//         {type === 'textarea' && <TextareaField value={textVal} onChange={v => handleTextChange(key, v)} placeholder={hint} />}
//         {type === 'image' && (
//           <ImageField
//             value={dispVal}
//             onTextChange={v => handleTextChange(key, v)}
//             onUpload={url => handleMediaChange(key, url)}
//             placeholder={hint}
//           />
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-5">
//       {/* Sélecteur de page */}
//       <div className="flex gap-2 overflow-x-auto pb-1">
//         {PAGES.map(p => (
//           <button key={p.slug} onClick={() => onPageChange(p.slug)}
//             className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap border transition-colors"
//             style={{
//               backgroundColor: selectedPage === p.slug ? 'var(--primary)' : 'transparent',
//               color:           selectedPage === p.slug ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
//               borderColor:     selectedPage === p.slug ? 'var(--primary)' : 'var(--border)',
//             }}>
//             {p.name}
//           </button>
//         ))}
//       </div>

//       {/* Header + bouton save */}
//       <div className="flex items-center justify-between">
//         <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
//           {currentBlocks.length} bloc(s) pour cette page
//         </p>
//         <div className="flex items-center gap-2">
//           <button onClick={fetchBlocks} disabled={loading}
//             className="p-2 rounded-lg border hover:opacity-80"
//             style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
//             <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
//           </button>
//           <button onClick={handleSave} disabled={saving || !hasDirty}
//             className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 transition-opacity hover:opacity-90"
//             style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//             <Save className="h-4 w-4" />
//             {saving ? 'Sauvegarde...' : 'Sauvegarder'}
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
//       ) : (
//         <div className="space-y-4">{currentBlocks.map(renderBlock)}</div>
//       )}

//       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
//     </div>
//   );
// }

// // Annonces
// function AnnouncementsTab() {
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [editing, setEditing]   = useState(null); 
//   const [toast, setToast]       = useState(null);
//   const [saving, setSaving]     = useState(false);

//   const showToast = (msg, type = 'success') => setToast({ message: msg, type });

//   const fresh = { titre: '', description: '', image_url: '', date_event: '', lien_wa: '', actif: true, ordre: 0 };

//   const fetchAll = async () => {
//     setLoading(true);
//     try {
//       const res = await adminAnnouncementsAPI.getAll();
//       setAnnouncements(res.data?.data?.announcements ?? res.data?.announcements ?? []);
//     } catch { showToast('Erreur chargement', 'error'); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchAll(); }, []);

//   const handleSave = async () => {
//     if (!editing || !editing.titre || !editing.description) {
//       showToast('Titre et description requis', 'error'); return;
//     }
//     setSaving(true);
//     try {
//       const payload = {
//         titre:       editing.titre,
//         description: editing.description,
//         image_url:   editing.image_url || null,
//         date_event:  editing.date_event || null,
//         lien_wa:     editing.lien_wa || null,
//         actif:       editing.actif !== false,
//         ordre:       Number(editing.ordre) || 0,
//       };
//       if (editing.id) {
//         await adminAnnouncementsAPI.update(editing.id, payload);
//         showToast('Annonce mise à jour ✓');
//       } else {
//         await adminAnnouncementsAPI.create(payload);
//         showToast('Annonce créée ✓');
//       }
//       setEditing(null);
//       fetchAll();
//     } catch (err) {
//       showToast(err.response?.data?.message || 'Erreur', 'error');
//     } finally { setSaving(false); }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Supprimer cette annonce ?')) return;
//     try {
//       await adminAnnouncementsAPI.delete(id);
//       showToast('Annonce supprimée');
//       fetchAll();
//     } catch { showToast('Erreur suppression', 'error'); }
//   };

//   const handleToggle = async (ann) => {
//     try {
//       await adminAnnouncementsAPI.update(ann.id, { actif: !ann.actif });
//       fetchAll();
//     } catch { showToast('Erreur', 'error'); }
//   };

//   const handleUploadImage = async (file) => {
//     try {
//       const res = await contentAPI.uploadMedia(file);
//       const url = res.data?.data?.url ?? res.data?.url ?? '';
//       if (!url) throw new Error('URL manquante');
//       setEditing(prev => ({ ...prev, image_url: url }));
//     } catch (err) { showToast("Erreur upload : " + err.message, 'error'); }
//   };

//   const previewUrl = (url) => url
//     ? (url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'https://maleahub.vercel.app'}${url}`)
//     : null;

//   return (
//     <div className="space-y-5">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
//             Annonces & Événements
//           </h2>
//           <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
//             Apparaissent sur la page Annonces du site public
//           </p>
//         </div>
//         <button onClick={() => setEditing({ ...fresh })}
//           className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
//           style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//           <Plus className="h-4 w-4" /> Nouvelle annonce
//         </button>
//       </div>

//       {/* Formulaire d'édition */}
//       {editing && (
//         <div className="rounded-xl border p-6 space-y-4"
//           style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 40%, transparent)' }}>
//           <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
//             {editing.id ? 'Modifier l\'annonce' : 'Nouvelle annonce'}
//           </h3>
//           <div className="grid sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Titre *</label>
//               <TextField value={editing.titre} onChange={v => setEditing(p => ({ ...p, titre: v }))} />
//             </div>
//             <div>
//               <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Date / Période</label>
//               <TextField value={editing.date_event || ''} placeholder="Ex: 15-19 Juillet 2024"
//                 onChange={v => setEditing(p => ({ ...p, date_event: v }))} />
//             </div>
//           </div>
//           <div>
//             <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Description *</label>
//             <TextareaField value={editing.description} onChange={v => setEditing(p => ({ ...p, description: v }))} />
//           </div>
//           <div>
//             <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Image</label>
//             <ImageField
//               value={editing.image_url || ''}
//               onTextChange={v => setEditing(p => ({ ...p, image_url: v }))}
//               onUpload={url => setEditing(p => ({ ...p, image_url: url }))}
//               placeholder="URL ou upload"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Lien WhatsApp (optionnel)</label>
//             <TelField value={editing.lien_wa || ''} placeholder="https://wa.me/237..."
//               onChange={v => setEditing(p => ({ ...p, lien_wa: v }))} />
//           </div>
//           <div className="grid sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Ordre d'affichage</label>
//               <NumberField value={editing.ordre || 0} onChange={v => setEditing(p => ({ ...p, ordre: v }))} />
//             </div>
//             <div className="flex items-end pb-1">
//               <CheckboxField value={String(editing.actif !== false)} label="Visible sur le site"
//                 onChange={v => setEditing(p => ({ ...p, actif: v === 'true' }))} />
//             </div>
//           </div>
//           <div className="flex gap-3 pt-2">
//             <button onClick={handleSave} disabled={saving}
//               className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
//               style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//               <Save className="h-4 w-4" /> {saving ? 'Sauvegarde...' : 'Sauvegarder'}
//             </button>
//             <button onClick={() => setEditing(null)}
//               className="px-5 py-2 rounded-lg text-sm border"
//               style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
//               Annuler
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Liste des annonces */}
//       {loading ? (
//         <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-7 w-7 border-b-2 border-primary" /></div>
//       ) : announcements.length === 0 ? (
//         <div className="text-center py-12 rounded-xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//           <Megaphone className="h-10 w-10 mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
//           <p style={{ color: 'var(--muted-foreground)' }}>Aucune annonce. Créez-en une !</p>
//         </div>
//       ) : (
//         <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
//           {announcements.map(ann => (
//             <div key={ann.id} className="rounded-xl border overflow-hidden"
//               style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', opacity: ann.actif ? 1 : 0.6 }}>
//               {ann.image_url && (
//                 <div className="aspect-[16/9] overflow-hidden">
//                   <img src={previewUrl(ann.image_url)} alt={ann.titre}
//                     className="w-full h-full object-cover"
//                     onError={e => { e.currentTarget.parentElement.style.display = 'none'; }} />
//                 </div>
//               )}
//               <div className="p-4">
//                 <div className="flex items-start justify-between gap-2 mb-2">
//                   <h3 className="font-semibold text-sm leading-tight" style={{ color: 'var(--foreground)' }}>{ann.titre}</h3>
//                   <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full"
//                     style={{ backgroundColor: ann.actif ? 'color-mix(in oklch, var(--primary) 15%, transparent)' : 'var(--muted)', color: ann.actif ? 'var(--primary)' : 'var(--muted-foreground)' }}>
//                     {ann.actif ? 'Visible' : 'Masqué'}
//                   </span>
//                 </div>
//                 {ann.date_event && (
//                   <p className="text-xs mb-2" style={{ color: 'var(--primary)' }}>{ann.date_event}</p>
//                 )}
//                 <p className="text-xs line-clamp-2 mb-4" style={{ color: 'var(--muted-foreground)' }}>{ann.description}</p>
//                 <div className="flex items-center gap-2">
//                   <button onClick={() => setEditing({ ...ann })}
//                     className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border text-xs"
//                     style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
//                     <Edit3 className="h-3.5 w-3.5" /> Modifier
//                   </button>
//                   <button onClick={() => handleToggle(ann)}
//                     className="p-1.5 rounded-lg border" title={ann.actif ? 'Masquer' : 'Afficher'}
//                     style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
//                     {ann.actif ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
//                   </button>
//                   <button onClick={() => handleDelete(ann.id)}
//                     className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">
//                     <Trash2 className="h-3.5 w-3.5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
//     </div>
//   );
// }

// // Équipe 
// function TeamTab() {
//   const [members, setMembers]   = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [editing, setEditing]   = useState(null);
//   const [saving, setSaving]     = useState(false);
//   const [toast, setToast]       = useState(null);

//   const showToast = (msg, type = 'success') => setToast({ message: msg, type });
//   const freshMember = { nom: '', role: '', image_url: '', bio: '', actif: true, ordre: 0 };

//   const fetchAll = async () => {
//     setLoading(true);
//     try {
//       const res = await adminTeamAPI.getAll();
//       setMembers(res.data?.data?.members ?? res.data?.members ?? []);
//     } catch { showToast('Erreur chargement', 'error'); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchAll(); }, []);

//   const handleSave = async () => {
//     if (!editing?.nom || !editing?.role) { showToast('Nom et rôle requis', 'error'); return; }
//     setSaving(true);
//     try {
//       const payload = {
//         nom:       editing.nom,
//         role:      editing.role,
//         image_url: editing.image_url || null,
//         bio:       editing.bio || null,
//         actif:     editing.actif !== false,
//         ordre:     Number(editing.ordre) || 0,
//       };
//       if (editing.id) {
//         await adminTeamAPI.update(editing.id, payload);
//         showToast('Membre mis à jour ✓');
//       } else {
//         await adminTeamAPI.create(payload);
//         showToast('Membre créé ✓');
//       }
//       setEditing(null);
//       fetchAll();
//     } catch (err) {
//       showToast(err.response?.data?.message || 'Erreur', 'error');
//     } finally { setSaving(false); }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Supprimer ce membre ?')) return;
//     try {
//       await adminTeamAPI.delete(id);
//       showToast('Membre supprimé');
//       fetchAll();
//     } catch { showToast('Erreur', 'error'); }
//   };

//   const handleToggle = async (m) => {
//     try {
//       await adminTeamAPI.update(m.id, { actif: !m.actif });
//       fetchAll();
//     } catch { showToast('Erreur', 'error'); }
//   };

//   const previewUrl = (url) => url
//     ? (url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'https://maleahub.vercel.app'}${url}`)
//     : null;

//   return (
//     <div className="space-y-5">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Notre Équipe</h2>
//           <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
//             Membres affichés sur la page Annonces & Équipe
//           </p>
//         </div>
//         <button onClick={() => setEditing({ ...freshMember })}
//           className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
//           style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//           <Plus className="h-4 w-4" /> Ajouter un membre
//         </button>
//       </div>

//       {/* Formulaire */}
//       {editing && (
//         <div className="rounded-xl border p-6 space-y-4"
//           style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 40%, transparent)' }}>
//           <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
//             {editing.id ? 'Modifier le membre' : 'Nouveau membre'}
//           </h3>
//           <div className="grid sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Nom *</label>
//               <TextField value={editing.nom} onChange={v => setEditing(p => ({ ...p, nom: v }))} />
//             </div>
//             <div>
//               <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Rôle / Poste *</label>
//               <TextField value={editing.role} placeholder="Ex: Fondateur & CEO"
//                 onChange={v => setEditing(p => ({ ...p, role: v }))} />
//             </div>
//           </div>
//           <div>
//             <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Photo</label>
//             <ImageField
//               value={editing.image_url || ''}
//               onTextChange={v => setEditing(p => ({ ...p, image_url: v }))}
//               onUpload={url => setEditing(p => ({ ...p, image_url: url }))}
//               placeholder="URL ou upload d'une photo"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Bio (optionnel)</label>
//             <TextareaField value={editing.bio || ''} placeholder="Courte biographie..."
//               onChange={v => setEditing(p => ({ ...p, bio: v }))} />
//           </div>
//           <div className="grid sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>Ordre d'affichage</label>
//               <NumberField value={editing.ordre || 0} onChange={v => setEditing(p => ({ ...p, ordre: v }))} />
//             </div>
//             <div className="flex items-end pb-1">
//               <CheckboxField value={String(editing.actif !== false)} label="Visible sur le site"
//                 onChange={v => setEditing(p => ({ ...p, actif: v === 'true' }))} />
//             </div>
//           </div>
//           <div className="flex gap-3 pt-2">
//             <button onClick={handleSave} disabled={saving}
//               className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
//               style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//               <Save className="h-4 w-4" /> {saving ? 'Sauvegarde...' : 'Sauvegarder'}
//             </button>
//             <button onClick={() => setEditing(null)}
//               className="px-5 py-2 rounded-lg text-sm border"
//               style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
//               Annuler
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Grid membres */}
//       {loading ? (
//         <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-7 w-7 border-b-2 border-primary" /></div>
//       ) : members.length === 0 ? (
//         <div className="text-center py-12 rounded-xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//           <Users className="h-10 w-10 mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
//           <p style={{ color: 'var(--muted-foreground)' }}>Aucun membre. Ajoutez votre équipe !</p>
//         </div>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           {members.map(m => (
//             <div key={m.id} className="rounded-xl border overflow-hidden text-center p-4"
//               style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', opacity: m.actif ? 1 : 0.6 }}>
//               <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2"
//                 style={{ borderColor: 'color-mix(in oklch, var(--primary) 40%, transparent)' }}>
//                 {m.image_url ? (
//                   <img src={previewUrl(m.image_url)} alt={m.nom} className="w-full h-full object-cover"
//                     onError={e => { e.currentTarget.src = 'https://via.placeholder.com/80?text=👤'; }} />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-2xl"
//                     style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>👤</div>
//                 )}
//               </div>
//               <h3 className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{m.nom}</h3>
//               <p className="text-xs mt-0.5 mb-3" style={{ color: 'var(--primary)' }}>{m.role}</p>
//               <div className="flex items-center gap-1.5 justify-center">
//                 <button onClick={() => setEditing({ ...m })}
//                   className="flex-1 py-1.5 rounded-lg border text-xs"
//                   style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
//                   Modifier
//                 </button>
//                 <button onClick={() => handleToggle(m)} className="p-1.5 rounded-lg border"
//                   style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
//                   {m.actif ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
//                 </button>
//                 <button onClick={() => handleDelete(m.id)}
//                   className="p-1.5 rounded-lg border border-red-200 text-red-500">
//                   <Trash2 className="h-3.5 w-3.5" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
//     </div>
//   );
// }

// //Settings
// function SettingsTab() {
//   const [settings, setSettings] = useState({});
//   const [loading, setLoading]   = useState(true);
//   const [saving, setSaving]     = useState(false);
//   const [toast, setToast]       = useState(null);

//   const showToast = (msg, type = 'success') => setToast({ message: msg, type });

//   const fetchSettings = async () => {
//     setLoading(true);
//     try {
//       const res = await settingsAPI.getAll();
//       const arr = res.data?.data?.settings ?? res.data?.settings ?? [];
//       const map = {};
//       arr.forEach(s => { map[s.cle] = { ...s, dirty: false }; });
//       setSettings(map);
//     } catch { showToast('Erreur chargement', 'error'); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchSettings(); }, []);

//   const handleChange = (cle, valeur) => {
//     setSettings(prev => ({ ...prev, [cle]: { cle, ...prev[cle], valeur, dirty: true } }));
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     let errors = 0;
//     const dirty = Object.entries(settings).filter(([, s]) => s.dirty);
//     await Promise.all(dirty.map(async ([cle, s]) => {
//       try { await settingsAPI.update(cle, s.valeur); }
//       catch { errors++; }
//     }));
//     setSaving(false);
//     if (errors === 0) { showToast('Paramètres sauvegardés ✓'); fetchSettings(); }
//     else showToast(`${errors} erreur(s)`, 'error');
//   };

//   const hasDirty = Object.values(settings).some(s => s.dirty);

//   const renderSetting = (cle, config) => {
//     const s = settings[cle];
//     const val = s?.valeur ?? '';
//     return (
//       <div key={cle}>
//         {config.type !== 'checkbox' && (
//           <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//             {config.label}
//             {config.hint && <span className="ml-2 text-xs font-normal" style={{ color: 'var(--muted-foreground)' }}>{config.hint}</span>}
//             {s?.dirty && <span className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)', color: 'var(--primary)' }}>modifié</span>}
//           </label>
//         )}
//         {config.type === 'text'     && <TextField     value={val} onChange={v => handleChange(cle, v)} placeholder={config.hint} />}
//         {config.type === 'email'    && <EmailField    value={val} onChange={v => handleChange(cle, v)} placeholder={config.hint} />}
//         {config.type === 'tel'      && <TelField      value={val} onChange={v => handleChange(cle, v)} placeholder={config.hint} />}
//         {config.type === 'number'   && <NumberField   value={val} onChange={v => handleChange(cle, v)} placeholder={config.hint} />}
//         {config.type === 'checkbox' && (
//           <div className="flex items-center justify-between">
//             <CheckboxField value={val} label={config.label} onChange={v => handleChange(cle, v)} />
//             {s?.dirty && <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)', color: 'var(--primary)' }}>modifié</span>}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const groups = [
//     { title: 'Contact & WhatsApp', keys: ['whatsapp_general','whatsapp_reservations','whatsapp_investors','address','email','instagram'] },
//     { title: 'Jobs Week',          keys: ['jobs_week_open','jobs_week_price','jobs_week_quota'] },
//     { title: 'Système',            keys: ['maintenance_mode'] },
//   ];

//   return (
//     <div className="space-y-5">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Paramètres du site</h2>
//           <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>WhatsApp, tarifs, mode maintenance…</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <button onClick={fetchSettings} disabled={loading}
//             className="p-2 rounded-lg border hover:opacity-80"
//             style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
//             <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
//           </button>
//           <button onClick={handleSave} disabled={saving || !hasDirty}
//             className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
//             style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//             <Save className="h-4 w-4" /> {saving ? 'Sauvegarde...' : 'Sauvegarder'}
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-7 w-7 border-b-2 border-primary" /></div>
//       ) : (
//         <div className="space-y-5">
//           {groups.map(g => (
//             <div key={g.title} className="rounded-xl p-5 border space-y-4"
//               style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//               <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{g.title}</h3>
//               {g.keys.map(cle => SETTINGS_CONFIG[cle] ? renderSetting(cle, SETTINGS_CONFIG[cle]) : null)}
//             </div>
//           ))}
//         </div>
//       )}

//       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
//     </div>
//   );
// }

// // ── SECTION : Newsletter (version simplifiée, sans HTML)
// function NewsletterTab() {
//   const [subscribers, setSubscribers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState(null);
//   const [total, setTotal] = useState(0);
//   const [sending, setSending] = useState(false);
//   const [emailForm, setEmailForm] = useState({
//     subject: '',
//     content: '',
//   });

//   const showToast = (msg, type = 'success') => setToast({ message: msg, type });

//   const fetchSubscribers = async () => {
//     setLoading(true);
//     try {
//       const res = await adminApi.get('/system/newsletter/subscribers');
//       setSubscribers(res.data?.data?.subscribers || []);
//       const countRes = await adminApi.get('/system/newsletter/count');
//       setTotal(countRes.data?.data?.total || 0);
//     } catch {
//       showToast('Erreur chargement', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchSubscribers(); }, []);

//   const exportSubscribers = () => {
//     const csv = [
//       ['Email', "Date d'inscription"],
//       ...subscribers.map(s => [s.email, new Date(s.subscribed_at).toLocaleDateString('fr-FR')])
//     ].map(row => row.join(',')).join('\n');
    
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `newsletter-subscribers-${Date.now()}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleSendNewsletter = async (e) => {
//     e.preventDefault();
    
//     if (!emailForm.subject || !emailForm.content) {
//       showToast('Veuillez remplir le sujet et le contenu', 'error');
//       return;
//     }

//     if (!confirm(`Envoyer cette newsletter à ${total} abonné(s) ?`)) return;

//     setSending(true);
//     try {
//       const res = await adminApi.post('/system/newsletter/send', {
//         subject: emailForm.subject,
//         content: emailForm.content,
//         isHtml: false, // Toujours en texte simple
//       });
      
//       showToast(res.data?.message || 'Newsletter envoyée avec succès !');
//       setEmailForm({ subject: '', content: '' });
//     } catch (error) {
//       showToast(error.response?.data?.message || 'Erreur lors de l\'envoi', 'error');
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <div className="space-y-5">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
//             Newsletter
//           </h2>
//           <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
//             {total} abonné(s) actif(s)
//           </p>
//         </div>
//         <button
//           onClick={exportSubscribers}
//           disabled={subscribers.length === 0}
//           className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
//           style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//         >
//           Exporter CSV
//         </button>
//       </div>

//       {/* Formulaire d'envoi de newsletter - Version simplifiée */}
//       <div className="rounded-xl border p-6 space-y-4"
//         style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//         <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
//           Envoyer une newsletter
//         </h3>
        
//         <form onSubmit={handleSendNewsletter} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//               Sujet *
//             </label>
//             <input
//               type="text"
//               value={emailForm.subject}
//               onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
//               placeholder="Ex: Nouveaux événements chez Malea Hub"
//               className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
//               style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//               Message *
//             </label>
//             <textarea
//               value={emailForm.content}
//               onChange={(e) => setEmailForm({ ...emailForm, content: e.target.value })}
//               rows={10}
//               placeholder="Bonjour,

// Voici les dernières actualités de Malea Hub...

// Cordialement,
// L'équipe Malea Hub"
//               className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
//               style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//               required
//             />
//           </div>

//           <div className="bg-blue-50 p-3 rounded-lg">
//             <p className="text-sm text-blue-700">
//               💡 Le message sera envoyé en texte simple à tous les abonnés. 
//               Les retours à la ligne seront automatiquement conservés.
//             </p>
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button
//               type="submit"
//               disabled={sending || total === 0}
//               className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
//               style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//             >
//               {sending ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
//                   Envoi en cours...
//                 </>
//               ) : (
//                 <>Envoyer à {total} abonné(s)</>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Liste des abonnés */}
//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
//         </div>
//       ) : subscribers.length === 0 ? (
//         <div className="text-center py-12 rounded-xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//           <Mail className="h-10 w-10 mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
//           <p style={{ color: 'var(--muted-foreground)' }}>Aucun abonné pour le moment.</p>
//         </div>
//       ) : (
//         <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
//           <table className="w-full text-sm">
//             <thead style={{ backgroundColor: 'var(--muted)' }}>
//               <tr>
//                 <th className="text-left p-3" style={{ color: 'var(--foreground)' }}>Email</th>
//                 <th className="text-left p-3" style={{ color: 'var(--foreground)' }}>Date d'inscription</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subscribers.map((sub) => (
//                 <tr key={sub.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
//                   <td className="p-3" style={{ color: 'var(--foreground)' }}>{sub.email}</td>
//                   <td className="p-3" style={{ color: 'var(--muted-foreground)' }}>
//                     {new Date(sub.subscribed_at).toLocaleDateString('fr-FR')}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
//     </div>
//   );
// }


// //Composant principal 
// export default function ContentManager() {
//   const [activeTab, setActiveTab]     = useState('content');
//   const [selectedPage, setSelectedPage] = useState('home');

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Gestion du contenu</h1>
//         <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
//           Textes, images, annonces, équipe et paramètres du site
//         </p>
//       </div>

//       {/* Tabs principaux */}
//       <div className="flex gap-1 border-b overflow-x-auto" style={{ borderColor: 'var(--border)' }}>
//         {TABS.map(tab => (
//           <button key={tab.id} onClick={() => setActiveTab(tab.id)}
//             className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors"
//             style={{
//               borderColor: activeTab === tab.id ? 'var(--primary)' : 'transparent',
//               color:       activeTab === tab.id ? 'var(--primary)' : 'var(--muted-foreground)',
//             }}>
//             <tab.icon className="h-4 w-4" />
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Contenu des tabs */}
//       {activeTab === 'content'       && <ContentTab selectedPage={selectedPage} onPageChange={setSelectedPage} />}
//       {activeTab === 'announcements' && <AnnouncementsTab />}
//       {activeTab === 'team'          && <TeamTab />}
//       {activeTab === 'newsletter'    && <NewsletterTab />} 
//       {activeTab === 'settings'      && <SettingsTab />}
//     </div>
//   );
// }






import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Save, Upload, X, CheckCircle, Mail, AlertCircle, RefreshCw,
  Plus, Trash2, Edit3, Eye, EyeOff, GripVertical,
  Megaphone, Users, Settings, FileImage, Globe, Palette, Type,
} from 'lucide-react';
import { contentAPI, settingsAPI, adminAnnouncementsAPI, adminTeamAPI, adminApi } from '../../services/admin';

// ── Constantes

const PAGES = [
  { slug: 'home',      name: 'Accueil' },
  { slug: 'coworking', name: 'Coworking' },
  { slug: 'incubator', name: 'Incubateur' },
  { slug: 'training',  name: 'Formations' },
  { slug: 'lounge',    name: 'Lounge' },
  { slug: 'events',    name: 'Événements' }, 
  { slug: 'contact',   name: 'Contact' },
];

// Blocs calés exactement sur la structure des composants React clients
const PAGE_BLOCKS = {
  home: [
  // Hero section
  { key: 'hero_title',    label: 'Titre Hero (H1)',        type: 'text',     hint: 'Ex: Work, Connect, Grow' },
  { key: 'hero_subtitle', label: 'Sous-titre Hero',        type: 'textarea', hint: "Espace coworking, programme d'accompagnement..." },
  { key: 'hero_image',    label: 'Image de fond Hero',     type: 'image',    hint: 'Image plein écran en arrière-plan' },
  
  // About section - COMPLET
  { key: 'about_badge',           label: 'Badge À propos',         type: 'text',     hint: 'À propos' },
  { key: 'about_title_prefix',    label: 'Préfixe titre À propos', type: 'text',     hint: 'Découvrir' },
  { key: 'about_title_highlight', label: 'Mot mis en avant',       type: 'text',     hint: 'Malea Hub' },
  { key: 'about_founder_name',    label: 'Nom du fondateur',       type: 'text',     hint: 'Erdman Doumbè' },
  { key: 'about_founder_title',   label: 'Titre du fondateur',     type: 'text',     hint: 'Fondateur de Malea Hub' },
  { key: 'about_description',     label: 'Description complète',   type: 'textarea', hint: "À l'origine de Malea Hub..." },
  { key: 'about_cta_text',        label: 'Texte bouton',           type: 'text',     hint: 'En savoir plus' },
  { key: 'about_cta_link',        label: 'Lien du bouton',         type: 'text',     hint: '/about' },
  { key: 'about_image',           label: 'Photo du fondateur',     type: 'image',    hint: 'Portrait du fondateur' },
  
  // Services section
  { key: 'services_badge',           label: 'Badge Services',          type: 'text',     hint: 'Nos services' },
  { key: 'services_title_prefix',    label: 'Préfixe titre Services',  type: 'text',     hint: 'Découvrez nos' },
  { key: 'services_title_highlight', label: 'Mot mis en avant',        type: 'text',     hint: 'services' },
  { key: 'services_mission_description', label: 'Description mission', type: 'textarea', hint: 'Notre mission...' },
  { key: 'services_items',           label: 'Services (3 cartes)',     type: 'json',     schema: 'services', hint: 'Titre, description, features, href pour chaque service' },
  { key: 'services_featured_tag',    label: 'Tag "Recommandé"',        type: 'text',     hint: 'Recommandé' },
  { key: 'services_cta',             label: 'Texte bouton CTA',        type: 'text',     hint: 'En savoir plus' },
  
  // Why choose section
  { key: 'why_choose_badge',          label: 'Badge Pourquoi Choisir',       type: 'text',     hint: 'Ex: Nos Avantages' },
  { key: 'why_choose_title_prefix',   label: 'Début titre Pourquoi Choisir', type: 'text',     hint: 'Ex: Pourquoi choisir' },
  { key: 'why_choose_title_highlight',label: 'Mot mis en avant',             type: 'text',     hint: 'Ex: Malea Hub' },
  { key: 'why_choose_subtitle',       label: 'Sous-titre Pourquoi Choisir',  type: 'textarea', hint: 'Ex: Tout ce dont vous avez besoin...' },
  { key: 'why_choose_reasons',        label: 'Raisons (cartes)',             type: 'json',     schema: 'benefits', hint: 'Titre, description, icône pour chaque raison' },
  
  // Team section
  { key: 'team_badge',           label: 'Badge Équipe',           type: 'text',     hint: 'Notre équipe' },
  { key: 'team_title_prefix',    label: 'Préfixe titre Équipe',   type: 'text',     hint: 'Rencontrez' },
  { key: 'team_title_highlight', label: 'Mot mis en avant',       type: 'text',     hint: 'l\'équipe' },
  { key: 'team_subtitle',        label: 'Sous-titre Équipe',      type: 'textarea', hint: 'Des professionnels passionnés...' },
  
  // Incubator CTA Section
  { key: 'incubator_badge',              label: 'Badge Incubateur',           type: 'text',     hint: 'MALEA LAB' },
  { key: 'incubator_title_prefix',       label: 'Préfixe titre Incubateur',   type: 'text',     hint: 'Rejoignez' },
  { key: 'incubator_title_highlight',    label: 'Mot mis en avant',           type: 'text',     hint: "l'Incubateur" },
  { key: 'incubator_subtitle',           label: 'Sous-titre Incubateur',      type: 'textarea', hint: 'Transformez votre idée en startup' },
  { key: 'incubator_description',        label: 'Description Incubateur',     type: 'textarea', hint: 'Un programme d\'accompagnement intensif...' },
  { key: 'incubator_cta_button',         label: 'Texte bouton',               type: 'text',     hint: 'Postuler maintenant' },
  { key: 'incubator_whatsapp_link',      label: 'Lien WhatsApp',              type: 'text',     hint: 'https://wa.me/237678111022?text=...' },
  { key: 'incubator_benefits',           label: 'Avantages (3 cartes)',       type: 'json',     schema: 'benefits', hint: 'Titre + description pour chaque carte' },
  { key: 'incubator_stats',              label: 'Statistiques (chiffres clés)', type: 'json',   schema: 'stats', hint: 'Valeur + label' },
  { key: 'incubator_card_title',         label: 'Titre de la carte',          type: 'text',     hint: 'Prêt à relever le défi ?' },
  { key: 'incubator_card_description',   label: 'Description de la carte',    type: 'textarea', hint: 'Rejoignez une communauté de startups innovantes' },
  
  // Investor CTA section
  { key: 'investor_badge',         label: 'Badge Investisseurs',      type: 'text',     hint: 'Investissez' },
  { key: 'investor_title_prefix',  label: 'Préfixe titre Investisseurs', type: 'text',   hint: 'Rejoignez le' },
  { key: 'investor_title_highlight',label: 'Mot mis en avant',         type: 'text',     hint: 'Malea Invest Club' },
  { key: 'investor_subtitle',      label: 'Sous-titre Investisseurs',  type: 'text',     hint: 'Investissez dans les startups de demain' },
  { key: 'investor_description',   label: 'Description Investisseurs', type: 'textarea', hint: 'Texte de présentation du club...' },
  { key: 'investor_cta_text',      label: 'Texte du bouton',           type: 'text',     hint: 'Rejoindre le Malea Invest Club' },
  { key: 'investor_benefits',      label: 'Avantages (3 cartes)',      type: 'json',     schema: 'benefits', hint: 'Titre + description pour chaque carte' },
  { key: 'investor_stats',         label: 'Statistiques (chiffres clés)', type: 'json',  schema: 'stats', hint: 'Valeur + label' },
  
  // Jobs Week section
  { key: 'jobsweek_badge',           label: 'Badge Jobs Week',          type: 'text',     hint: 'Jobs Week' },
  { key: 'jobsweek_title',           label: 'Titre Jobs Week',          type: 'text',     hint: 'Devenez prêt pour l\'emploi' },
  { key: 'jobsweek_subtitle',        label: 'Sous-titre Jobs Week',     type: 'text',     hint: 'En 5 jours intensifs' },
  { key: 'jobsweek_description',     label: 'Description Jobs Week',    type: 'textarea', hint: 'Un programme intensif...' },
  { key: 'jobsweek_benefits',        label: 'Liste des points forts',   type: 'json',     schema: 'list', hint: 'Ex: ["CV professionnel", "Simulation entretien"]' },
  { key: 'jobsweek_card_badge',      label: 'Badge sur la carte',       type: 'text',     hint: 'Places limitées' },
  { key: 'jobsweek_price_label',     label: 'Label prix',               type: 'text',     hint: 'Tarif unique' },
  { key: 'jobsweek_price_currency',  label: 'Devise',                   type: 'text',     hint: 'FCFA' },
  { key: 'jobsweek_spots_label',     label: 'Label places',             type: 'text',     hint: 'places disponibles' },
  { key: 'jobsweek_duration_label',  label: 'Label durée',              type: 'text',     hint: '5 jours intensifs' },
  { key: 'jobsweek_included_title',  label: 'Titre "Ce qui est inclus"',type: 'text',     hint: 'Inclus dans le programme' },
  { key: 'jobsweek_included_items',  label: 'Liste éléments inclus',    type: 'json',     schema: 'list', hint: 'Ex: ["Certificat", "Coaching individuel"]' },
  { key: 'jobsweek_cta_button',      label: 'Texte bouton principal',   type: 'text',     hint: 'Je m\'inscris' },
  { key: 'jobsweek_reserve_button',  label: 'Texte bouton réservation', type: 'text',     hint: 'Réserver ma place' },
  
  // Legacy (pour compatibilité)
  { key: 'cta_incubator', label: 'Texte bouton incubateur (legacy)', type: 'text', hint: "Rejoindre l'incubateur" },
  { key: 'jobs_week_price', label:'Prix Jobs Week (FCFA)',  type: 'text',     hint: '30000' },
  { key: 'jobs_week_quota', label:'Places Jobs Week',       type: 'text',     hint: '10' },
],

 coworking: [
  // Hero section
  { key: 'hero_badge',           label: 'Badge Hero',                 type: 'text',     hint: 'Ex: Espace de travail' },
  { key: 'hero_title_prefix',    label: 'Préfixe titre Hero',         type: 'text',     hint: 'Votre' },
  { key: 'hero_title_highlight', label: 'Mot mis en avant',           type: 'text',     hint: 'espace de coworking' },
  { key: 'hero_title_suffix',    label: 'Suffixe titre Hero',         type: 'text',     hint: 'premium' },
  { key: 'hero_description',     label: 'Description Hero',           type: 'textarea', hint: 'Un espace de travail moderne et flexible...' },
  { key: 'hero_image',           label: 'Image Hero',                 type: 'image',    hint: "Photo principale de l'espace de coworking" },
  { key: 'cta_button',           label: 'Texte bouton CTA',           type: 'text',     hint: 'Réserver un espace' },
  { key: 'cta_message',          label: 'Message WhatsApp',           type: 'textarea', hint: 'Bonjour, je souhaite réserver un espace coworking' },
  
  // Gallery section
  { key: 'gallery_title',        label: 'Titre de la galerie',        type: 'text',     hint: 'Notre espace de travail' },
  { key: 'gallery_1',            label: 'Photo galerie 1',            type: 'image',    hint: 'Espace de travail ouvert' },
  { key: 'gallery_1_alt',        label: 'Alt galerie 1',              type: 'text',     hint: 'Espace de travail ouvert' },
  { key: 'gallery_2',            label: 'Photo galerie 2',            type: 'image',    hint: 'Salle de réunion' },
  { key: 'gallery_2_alt',        label: 'Alt galerie 2',              type: 'text',     hint: 'Salle de réunion' },
  { key: 'gallery_3',            label: 'Photo galerie 3',            type: 'image',    hint: 'Bureau privé' },
  { key: 'gallery_3_alt',        label: 'Alt galerie 3',              type: 'text',     hint: 'Bureau privé' },
  
  // Features section
  { key: 'features_title',       label: 'Titre équipements',          type: 'text',     hint: 'Équipements & Services' },
  { key: 'features_subtitle',    label: 'Sous-titre équipements',     type: 'textarea', hint: 'Tout ce dont vous avez besoin pour travailler' },
  { key: 'features_items',       label: 'Liste équipements',          type: 'json',     schema: 'features', hint: 'Titre + description pour chaque équipement' },
  
  // Rental section
  { key: 'rental_title',         label: 'Titre location soir',        type: 'text',     hint: 'Location soir & événements' },
  { key: 'rental_description',   label: 'Description location',       type: 'textarea', hint: 'Vous souhaitez organiser une formation...' },
  { key: 'rental_availability_label', label: 'Label disponibilité',   type: 'text',     hint: 'Disponible de' },
  { key: 'rental_hours',         label: 'Horaires location soir',     type: 'text',     hint: '18h30 – 22h30' },
  { key: 'rental_button',        label: 'Texte bouton location',      type: 'text',     hint: 'Louer l\'espace' },
  { key: 'rental_message',       label: 'Message WhatsApp location',  type: 'textarea', hint: 'Bonjour, je souhaite louer l\'espace pour organiser une formation/événement' },
],
 incubator: [
  // Hero section
  { key: 'hero_badge',              label: 'Badge Hero',                 type: 'text',     hint: 'Ex: Programme d\'accompagnement' },
  { key: 'hero_title_prefix',       label: 'Préfixe titre Hero',         type: 'text',     hint: 'Rejoignez' },
  { key: 'hero_title_highlight',    label: 'Mot mis en avant',           type: 'text',     hint: 'l\'incubateur' },
  { key: 'hero_title_suffix',       label: 'Suffixe titre Hero',         type: 'text',     hint: 'de Malea Hub' },
  { key: 'hero_description',        label: 'Description Hero',           type: 'textarea', hint: 'Un programme d\'accompagnement intensif...' },
  { key: 'hero_image',              label: 'Image Hero',                 type: 'image',    hint: 'Photo équipe / startup' },
  { key: 'cta_button',              label: 'Texte bouton CTA',           type: 'text',     hint: 'Postuler maintenant' },
  { key: 'cta_message',             label: 'Message WhatsApp',           type: 'textarea', hint: 'Bonjour, je souhaite postuler à l\'incubateur' },
  
  // Program section
  { key: 'program_title',           label: 'Titre du programme',         type: 'text',     hint: 'Notre programme d\'accompagnement' },
  { key: 'program_subtitle',        label: 'Sous-titre programme',       type: 'textarea', hint: 'Un parcours sur mesure pour les startups' },
  { key: 'program_features',        label: 'Caractéristiques programme', type: 'json',     schema: 'features', hint: 'Liste des caractéristiques du programme' },
  
  // Benefits section
  { key: 'benefits_title',          label: 'Titre avantages',            type: 'text',     hint: 'Pourquoi rejoindre notre incubateur ?' },
  { key: 'benefits_subtitle',       label: 'Sous-titre avantages',       type: 'textarea', hint: 'Les clés de votre réussite' },
  { key: 'benefits_items',          label: 'Liste avantages',            type: 'json',     schema: 'benefits', hint: 'Titre + description pour chaque avantage' },
  
  // Stats section
  { key: 'stats_title',             label: 'Titre statistiques',         type: 'text',     hint: 'Ils nous font confiance' },
  { key: 'stats_items',             label: 'Statistiques',               type: 'json',     schema: 'stats', hint: 'Valeur + label pour chaque statistique' },
  
  // Invest Club section
  { key: 'invest_club_badge',       label: 'Badge Invest Club',          type: 'text',     hint: 'Malea Invest Club' },
  { key: 'invest_club_title_prefix',label: 'Préfixe titre Invest Club',  type: 'text',     hint: 'Rejoignez le' },
  { key: 'invest_club_title_highlight', label: 'Mot mis en avant',       type: 'text',     hint: 'Malea Invest Club' },
  { key: 'invest_club_description', label: 'Description Invest Club',    type: 'textarea', hint: 'Description du club investisseurs' },
  { key: 'invest_club_cta',         label: 'Bouton Invest Club',         type: 'text',     hint: 'Devenir investisseur' },
  { key: 'invest_club_message',     label: 'Message WhatsApp Invest Club', type: 'textarea', hint: 'Bonjour, je souhaite rejoindre le Malea Invest Club' },
  { key: 'invest_club_image',       label: 'Image Invest Club',          type: 'image',    hint: 'Photo club investisseurs' },
  
  // Application section
  { key: 'application_title',       label: 'Titre candidature',          type: 'text',     hint: 'Prêt à rejoindre l\'aventure ?' },
  { key: 'application_description', label: 'Description candidature',    type: 'textarea', hint: 'Postulez dès maintenant...' },
  { key: 'application_button',      label: 'Bouton candidature',         type: 'text',     hint: 'Postuler' },
  { key: 'application_message',     label: 'Message candidature',        type: 'textarea', hint: 'Bonjour, je souhaite postuler à l\'incubateur' },
  
  // Legacy
  { key: 'invest_club', label: 'Texte Malea Invest Club (legacy)', type: 'textarea', hint: 'Description du club investisseurs' },
],

training: [
  // Hero section
  { key: 'hero_badge',              label: 'Badge Hero',                 type: 'text',     hint: 'Ex: Formations Professionnelles' },
  { key: 'hero_title_prefix',       label: 'Préfixe titre Hero',         type: 'text',     hint: 'Devenez' },
  { key: 'hero_title_highlight',    label: 'Mot mis en avant',           type: 'text',     hint: 'opérationnel' },
  { key: 'hero_title_suffix',       label: 'Suffixe titre Hero',         type: 'text',     hint: 'avec nos formations' },
  { key: 'hero_description',        label: 'Description Hero',           type: 'textarea', hint: 'Des programmes de formation conçus pour accélérer votre carrière...' },
  { key: 'hero_image',              label: 'Image Hero',                 type: 'image',    hint: 'Photo formation' },
  
  // Jobs Week section
  { key: 'jobs_week_badge',         label: 'Badge Jobs Week',            type: 'text',     hint: 'Programme Phare' },
  { key: 'jobs_week_title',         label: 'Titre Jobs Week',            type: 'text',     hint: 'Jobs Week' },
  { key: 'jobs_week_subtitle',      label: 'Sous-titre Jobs Week',       type: 'text',     hint: 'Programme Intensif de 5 Jours' },
  { key: 'jobs_week_description',   label: 'Description Jobs Week',      type: 'textarea', hint: 'Un programme intensif de 5 jours...' },
  { key: 'jobs_week_benefits',      label: 'Bénéfices Jobs Week',        type: 'json',     schema: 'benefits', hint: 'Titre + description pour chaque bénéfice' },
  { key: 'jobs_week_modules',       label: 'Modules Jobs Week',          type: 'json',     schema: 'modules', hint: 'Jour, titre et description pour chaque module' },
  { key: 'jobs_week_included_items', label: 'Éléments inclus',           type: 'json',     schema: 'list', hint: 'Liste des éléments inclus dans la formation' },
  { key: 'jobs_week_places_label',  label: 'Label places',               type: 'text',     hint: 'PLACES SEULEMENT' },
  { key: 'jobs_week_program_label', label: 'Label programme',            type: 'text',     hint: 'Programme complet' },
  { key: 'jobs_week_duration',      label: 'Durée',                      type: 'text',     hint: '5 jours intensifs' },
  { key: 'jobs_week_cta',           label: 'Texte bouton CTA',           type: 'text',     hint: "S'inscrire via WhatsApp" },
  { key: 'jobs_week_cta_message',   label: 'Message WhatsApp',           type: 'textarea', hint: 'Bonjour, je souhaite m\'inscrire à Jobs Week' },
  
  // Formations section
  { key: 'formations_title',        label: 'Titre formations',           type: 'text',     hint: 'Nos Formations' },
  { key: 'formations_subtitle',     label: 'Sous-titre formations',      type: 'textarea', hint: 'Des programmes conçus par des experts...' },
  
  // Program overview section
  { key: 'program_title',           label: 'Titre aperçu programme',     type: 'text',     hint: 'Aperçu du Programme' },
  { key: 'program_subtitle',        label: 'Sous-titre aperçu programme', type: 'textarea', hint: 'Un parcours complet de 5 jours vers l\'employabilité' },
  
  // Trainer section
  { key: 'trainer_title',           label: 'Titre formateur',            type: 'text',     hint: 'Vous êtes formateur ou organisation ?' },
  { key: 'trainer_description',     label: 'Description formateur',      type: 'textarea', hint: 'Organisez vos formations à Malea Hub...' },
  { key: 'trainer_button',          label: 'Bouton formateur',           type: 'text',     hint: 'Organisez votre formation' },
  { key: 'trainer_message',         label: 'Message WhatsApp formateur', type: 'textarea', hint: 'Bonjour, je suis formateur et souhaite organiser une formation' },
  
  // Legacy
  { key: 'jobs_week_desc', label: 'Description Jobs Week (legacy)', type: 'textarea', hint: 'Un programme intensif de 5 jours...' },
],

 lounge: [
  // Hero section
  { key: 'hero_badge',              label: 'Badge Hero',                 type: 'text',     hint: 'Ex: Espace Premium' },
  { key: 'hero_title_prefix',       label: 'Préfixe titre Hero',         type: 'text',     hint: "L'espace" },
  { key: 'hero_title_highlight',    label: 'Mot mis en avant',           type: 'text',     hint: 'Lounge' },
  { key: 'hero_title_suffix',       label: 'Suffixe titre Hero',         type: 'text',     hint: 'de Malea Hub' },
  { key: 'hero_description',        label: 'Description Hero',           type: 'textarea', hint: 'Un espace premium conçu pour...' },
  { key: 'hero_image',              label: 'Photo principale',           type: 'image',    hint: 'Photo principale du lounge' },
  
  // Gallery section (images illimitées)
  { key: 'gallery_title',           label: 'Titre de la galerie',        type: 'text',     hint: 'Notre espace Lounge' },
  { key: 'gallery_images',          label: 'Images de la galerie',       type: 'json',     schema: 'gallery', hint: 'Liste d\'images avec src et alt' },
  
  // Usage section
  { key: 'usage_title',             label: 'Titre utilisation',          type: 'text',     hint: 'Utilisations du Lounge' },
  { key: 'usage_items',             label: 'Items utilisation',          type: 'json',     schema: 'usage', hint: 'Titre + description pour chaque utilisation' },
  { key: 'usage_cta_button',        label: 'Bouton CTA',                 type: 'text',     hint: 'Visiter le Lounge' },
  { key: 'usage_cta_message',       label: 'Message WhatsApp',           type: 'textarea', hint: 'Bonjour, je souhaite visiter l\'espace Lounge' },
  
  // Features section (optionnelle)
  { key: 'features_title',          label: 'Titre équipements',          type: 'text',     hint: 'Équipements & Services' },
  { key: 'features_items',          label: 'Équipements',                type: 'json',     schema: 'features', hint: 'Liste des équipements du lounge' },
  
  // Legacy
  { key: 'description', label: 'Description (legacy)', type: 'textarea', hint: 'Un espace premium conçu pour...' },
  { key: 'gallery_1',   label: 'Photo galerie 1 (legacy)', type: 'image', hint: 'Coin café' },
  { key: 'gallery_2',   label: 'Photo galerie 2 (legacy)', type: 'image', hint: 'Assises confortables' },
],

  contact: [
    { key: 'hero_title',    label: 'Titre de la page',       type: 'text',     hint: "Let's connect" },
    { key: 'address',       label: 'Adresse complète',       type: 'text',     hint: 'Bonapriso, Rue Koloko - Douala' },
    { key: 'map_embed',     label: 'Lien Google Maps (URL)', type: 'text',     hint: 'https://maps.google.com/...' },
  ],
 events: [
  // Hero section
  { key: 'hero_badge',              label: 'Badge Hero',                 type: 'text',     hint: 'Annonces & Événements' },
  { key: 'hero_title_prefix',       label: 'Préfixe titre Hero',         type: 'text',     hint: 'Annonces &' },
  { key: 'hero_title_highlight',    label: 'Mot mis en avant',           type: 'text',     hint: 'Événements' },
  { key: 'hero_title_suffix',       label: 'Suffixe titre Hero',         type: 'text',     hint: 'à Malea Hub' },
  { key: 'hero_description',        label: 'Description Hero',           type: 'textarea', hint: 'Découvrez nos annonces, événements à venir...' },
  { key: 'hero_image',              label: 'Image de fond Hero',         type: 'image',    hint: 'Image en arrière-plan' },
  
  // Announcements section
  { key: 'announcements_title',     label: 'Titre section Annonces',     type: 'text',     hint: 'Nos prochains événements' },
  { key: 'announcements_subtitle',  label: 'Sous-titre Annonces',        type: 'text',     hint: 'Ne manquez aucune opportunité' },
  { key: 'announcements_cta',       label: 'Texte bouton Annonces',      type: 'text',     hint: 'Voir les détails' },
  
  // Team section
  { key: 'team_title',              label: 'Titre section Équipe',       type: 'text',     hint: 'Notre Équipe' },
  { key: 'team_subtitle',           label: 'Sous-titre Équipe',          type: 'text',     hint: 'Des professionnels passionnés...' },
  
  // CTA section
  { key: 'cta_title',               label: 'Titre CTA',                  type: 'text',     hint: 'Vous souhaitez organiser un événement ?' },
  { key: 'cta_description',         label: 'Description CTA',            type: 'textarea', hint: 'Contactez-nous pour organiser votre événement' },
  { key: 'cta_button',              label: 'Bouton CTA',                 type: 'text',     hint: 'Contacter l\'équipe' },
],
// Dans PAGE_BLOCKS
library: [
  // Hero section
  { key: 'hero_badge',              label: 'Badge Hero',                 type: 'text',     hint: 'Bibliothèque Sociale' },
  { key: 'hero_title_prefix',       label: 'Préfixe titre Hero',         type: 'text',     hint: 'Notre' },
  { key: 'hero_title_highlight',    label: 'Mot mis en avant',           type: 'text',     hint: 'Bibliothèque' },
  { key: 'hero_title_suffix',       label: 'Suffixe titre Hero',         type: 'text',     hint: 'Sociale' },
  { key: 'hero_description',        label: 'Description Hero',           type: 'textarea', hint: 'Une collection de ressources pour vous aider à grandir' },
  
  // Coming soon section
  { key: 'coming_soon_title',       label: 'Titre Coming Soon',          type: 'text',     hint: 'Bientôt disponible' },
  { key: 'coming_soon_text',        label: 'Texte Coming Soon',          type: 'textarea', hint: 'Notre bibliothèque sociale ouvrira bientôt ses portes...' },
  { key: 'coming_soon_button',      label: 'Bouton notification',        type: 'text',     hint: 'Être informé' },
  { key: 'coming_soon_message',     label: 'Message WhatsApp',           type: 'textarea', hint: 'Bonjour, je souhaite être informé du lancement' },
  
  // Gallery section
  { key: 'gallery_title',           label: 'Titre galerie',              type: 'text',     hint: 'Nos espaces' },
  { key: 'gallery_subtitle',        label: 'Sous-titre galerie',         type: 'textarea', hint: 'Découvrez les espaces Malea Hub' },
  { key: 'gallery_images',          label: 'Images galerie',             type: 'json',     schema: 'gallery', hint: 'Liste des images avec src, alt, label, icon' },
  
  // Resources section
  { key: 'resources_title',         label: 'Titre ressources',           type: 'text',     hint: 'Ressources à venir' },
  { key: 'resources_items',         label: 'Items ressources',           type: 'json',     schema: 'resources', hint: 'Titre, description, icône pour chaque ressource' },
  
  // Books section
  { key: 'books_title',             label: 'Titre livres',               type: 'text',     hint: 'Nos livres disponibles' },
  { key: 'books_subtitle',          label: 'Sous-titre livres',          type: 'textarea', hint: 'Une sélection de livres pour vous inspirer' },
  { key: 'books_cta',               label: 'Bouton livre',               type: 'text',     hint: 'En savoir plus' },
],
};

// Configuration du thème
const THEME_CONFIG = [
  { key: 'primaryColor',        label: 'Couleur principale',     type: 'color', default: '#3B82F6', hint: 'Boutons, liens, accents' },
  { key: 'backgroundColor',     label: 'Couleur de fond',        type: 'color', default: '#FFFFFF', hint: 'Fond principal de la page' },
  { key: 'foregroundColor',     label: 'Couleur du texte',       type: 'color', default: '#1F2937', hint: 'Couleur du texte principal' },
  { key: 'cardColor',           label: 'Couleur des cartes',     type: 'color', default: '#F9FAFB', hint: 'Fond des cartes / sections' },
  { key: 'mutedForegroundColor',label: 'Couleur texte secondaire',type: 'color', default: '#6B7280', hint: 'Texte moins important' },
  { key: 'fontHeading',         label: 'Police des titres',      type: 'font',   default: 'Inter', hint: 'Google Font ou système' },
  { key: 'fontBody',            label: 'Police du texte',        type: 'font',   default: 'Inter', hint: 'Google Font ou système' },
];

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
  { id: 'theme',         label: 'Thème',       icon: Palette },
  { id: 'announcements', label: 'Annonces',    icon: Megaphone },
  { id: 'team',          label: 'Équipe',      icon: Users },
  { id: 'newsletter',    label: 'Newsletter',  icon: Mail },
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

// ── Champs génériques
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

function ColorField({ value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <input type="color" value={value || '#000000'} onChange={e => onChange(e.target.value)} className="w-10 h-10 rounded cursor-pointer border" />
      <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} placeholder="#HEX ou nom couleur" className="flex-1 px-3 py-2 rounded-lg border" style={iStyle} />
    </div>
  );
}

function FontField({ value, onChange }) {
  const fonts = [
    'Inter', 'Roboto', 'Open Sans', 'Poppins', 'Montserrat', 
    'Playfair Display', 'Lato', 'Source Sans Pro', 'Raleway'
  ];
  return (
    <select value={value || 'Inter'} onChange={e => onChange(e.target.value)} className={iCls} style={iStyle}>
      {fonts.map(font => <option key={font} value={font}>{font}</option>)}
    </select>
  );
}

// function JsonField({ value, onChange, schema, placeholder }) {
//   const [isValid, setIsValid] = useState(true);
//   const [textValue, setTextValue] = useState(() => {
//     if (value && typeof value !== 'string') return JSON.stringify(value, null, 2);
//     return value || '';
//   });

//   const handleChange = (newValue) => {
//     setTextValue(newValue);
//     try {
//       if (newValue && newValue.trim()) {
//         const parsed = JSON.parse(newValue);
//         onChange(parsed);
//       } else {
//         onChange(null);
//       }
//       setIsValid(true);
//     } catch (err) {
//       setIsValid(false);
//     }
//   };

//   const examples = {
//     benefits: `[
//   {
//     "title": "Accès exclusif",
//     "description": "Investissez dans les meilleures startups"
//   },
//   {
//     "title": "Réseau d'influence",
//     "description": "Rencontrez des experts et investisseurs"
//   }
// ]`,
//     stats: `[
//   {
//     "value": "500+",
//     "label": "Startups accompagnées"
//   },
//   {
//     "value": "50M FCFA",
//     "label": "Levés de fonds"
//   }
// ]`,
//     list: `[
//   "Certificat officiel",
//   "Coaching personnalisé",
//   "Accès à vie aux ressources"
// ]`
//   };

//   return (
//     <div className="space-y-2">
//       <textarea
//         value={textValue}
//         onChange={e => handleChange(e.target.value)}
//         rows={8}
//         placeholder={placeholder || `Exemple: ${examples[schema] || '[]'}`}
//         className={`${iCls} font-mono text-sm`}
//         style={{ ...iStyle, borderColor: isValid ? undefined : '#dc2626' }}
//       />
//       {!isValid && (
//         <p className="text-xs text-red-500">⚠️ JSON invalide. Vérifiez la syntaxe (guillemets, virgules).</p>
//       )}
//       {schema && examples[schema] && (
//         <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
//           📋 Exemple: <button onClick={() => handleChange(examples[schema])} className="underline hover:opacity-80">Insérer un exemple</button>
//         </div>
//       )}
//     </div>
//   );
// }


function JsonField({ value, onChange, schema, placeholder }) {
  const [isValid, setIsValid] = useState(true);
  const [textValue, setTextValue] = useState(() => {
    if (value && typeof value !== 'string') return JSON.stringify(value, null, 2);
    return value || '';
  });

  // Exemples JSON pour différents schemas
  const examples = {
    benefits: `[
  {
    "title": "Accès exclusif",
    "description": "Investissez dans les meilleures startups"
  },
  {
    "title": "Réseau d'influence",
    "description": "Rencontrez des experts et investisseurs"
  }
]`,
    stats: `[
  {
    "value": "500+",
    "label": "Startups accompagnées"
  },
  {
    "value": "50M FCFA",
    "label": "Levés de fonds"
  }
]`,
    list: `[
  "Certificat officiel",
  "Coaching personnalisé",
  "Accès à vie aux ressources"
]`,
    services: `[
  {
    "title": "Incubateur",
    "description": "Transformez votre idée en startup",
    "features": ["Mentorat personnalisé", "Accès au réseau d'investisseurs", "Espaces de travail dédiés"],
    "href": "/incubator"
  },
  {
    "title": "Coworking",
    "description": "Un espace de travail moderne et flexible",
    "features": ["Bureaux privatifs", "Salles de réunion", "Espace lounge"],
    "href": "/coworking"
  },
  {
    "title": "Formations",
    "description": "Devenez prêt pour l'emploi",
    "features": ["Jobs Week intensive", "Certifications", "Coaching individuel"],
    "href": "/training"
  }
]`,

gallery: `[
  {
    "src": "/malesalon.jpeg",
    "alt": "Espace salon",
    "icon": "Coffee",
    "label": "Espace Salon"
  },
  {
    "src": "/maleSalonthe.jpeg",
    "alt": "Coin café",
    "icon": "Coffee",
    "label": "Coin Café"
  }
]`,
  
  resources: `[
  {
    "title": "Livres & E-books",
    "description": "Accédez à notre bibliothèque numérique",
    "icon": "BookOpen"
  },
  {
    "title": "Communauté",
    "description": "Échangez avec d'autres passionnés",
    "icon": "Users"
  }
]`,

gallery: `[
  {
    "src": "/malesalon.jpeg",
    "alt": "Espace salon"
  },
  {
    "src": "/maleSalonthe.jpeg",
    "alt": "Coin café"
  },
  {
    "src": "/maleblan.jpeg",
    "alt": "Espace détente"
  },
  {
    "src": "/malenoir.jpeg",
    "alt": "Coin lecture"
  }
]`,
  
  usage: `[
  {
    "title": "Événements Networking",
    "description": "Organisez des rencontres professionnelles dans un cadre convivial"
  },
  {
    "title": "Break Productif",
    "description": "Faites une pause et revenez plus productif"
  },
  {
    "title": "Réunions Informelles",
    "description": "Des espaces adaptés pour des échanges décontractés"
  }
]`,

 modules: `[
  {
    "day": "Jour 1",
    "title": "CV & Lettre de motivation",
    "description": "Créez un CV et une lettre de motivation qui se démarquent"
  },
  {
    "day": "Jour 2",
    "title": "Personal Branding",
    "description": "Construisez votre image professionnelle et votre présence en ligne"
  },
  {
    "day": "Jour 3",
    "title": "Techniques d'entretien",
    "description": "Maîtrisez les questions courantes et le langage corporel"
  },
  {
    "day": "Jour 4",
    "title": "Entretiens simulés",
    "description": "Pratiquez avec des scénarios réels et des retours d'experts"
  },
  {
    "day": "Jour 5",
    "title": "Job Matching",
    "description": "Connectez-vous avec des opportunités et des employeurs"
  }
]`,
    features: `[
  {
    "title": "WiFi Haut Débit",
    "description": "Connexion fibre optique ultra-rapide dans tout l'espace"
  },
  {
    "title": "Salles de Réunion",
    "description": "Salles équipées pour vos réunions et présentations"
  },
  {
    "title": "Équipements Modernes",
    "description": "Imprimantes, scanners et bureaux ergonomiques"
  },
  {
    "title": "Espace Détente",
    "description": "Café, thé et espace lounge pour vos pauses"
  },
  {
    "title": "Horaires Flexibles",
    "description": "Accès 24/7 pour les abonnés premium"
  },
  {
    "title": "Espace Sécurisé",
    "description": "Surveillance et accès sécurisé 24h/24"
  }
]`,
    program_features: `[
  {
    "title": "Accompagnement personnalisé",
    "description": "Mentorat par des experts du secteur"
  },
  {
    "title": "Financement",
    "description": "Accès à notre réseau d'investisseurs"
  },
  {
    "title": "Formation continue",
    "description": "Ateliers et masterclasses mensuels"
  },
  {
    "title": "Visibilité",
    "description": "Mise en relation avec les médias"
  }
]`,
  };

  const handleChange = (newValue) => {
    setTextValue(newValue);
    try {
      if (newValue && newValue.trim()) {
        const parsed = JSON.parse(newValue);
        onChange(parsed);
      } else {
        onChange(null);
      }
      setIsValid(true);
    } catch (err) {
      setIsValid(false);
    }
  };

  // Détermine l'exemple à afficher en fonction du schema
  const getExampleForSchema = () => {
    if (schema && examples[schema]) {
      return examples[schema];
    }
    return null;
  };

  return (
    <div className="space-y-2">
      <textarea
        value={textValue}
        onChange={e => handleChange(e.target.value)}
        rows={8}
        placeholder={placeholder || `Entrez votre JSON ici...`}
        className={`${iCls} font-mono text-sm`}
        style={{ ...iStyle, borderColor: isValid ? undefined : '#dc2626' }}
      />
      {!isValid && (
        <p className="text-xs text-red-500">⚠️ JSON invalide. Vérifiez la syntaxe (guillemets, virgules).</p>
      )}
      {schema && getExampleForSchema() && (
        <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
          📋 Exemple pour "{schema}": 
          <button 
            onClick={() => handleChange(getExampleForSchema())} 
            className="ml-2 underline hover:opacity-80 text-primary"
            style={{ color: 'var(--primary)' }}
          >
            Insérer un exemple
          </button>
        </div>
      )}
      {!schema && (
        <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
          💡 Format JSON attendu: tableau d'objets ou tableau de chaînes
        </div>
      )}
    </div>
  );
}

// ── Image Field ───────────────────────────────────────────────────
function ImageField({ value, onTextChange, onUpload, placeholder }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    setUploading(true);
    try {
      const res = await contentAPI.uploadMedia(file);
      const url  = res.data?.data?.url ?? res.data?.url ?? '';
      if (!url) throw new Error('URL manquante');
      onUpload(url);
    } catch (err) {
      console.error('Upload error:', err);
      alert("Erreur d'upload : " + err.message);
    } finally {
      setUploading(false);
    }
  };

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

// ── SECTION : Gestion contenu des pages ───────────────────────────────────────
function ContentTab({ selectedPage, onPageChange }) {
  const [contentBlocks, setContentBlocks] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => setToast({ message: msg, type });

  const fetchBlocks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await contentAPI.getBlocks(selectedPage);
      const arr = res.data?.data?.blocks ?? res.data?.blocks ?? [];
      const map = {};
      arr.forEach(b => {
        let value = b.valeur_texte;
        const blockDef = PAGE_BLOCKS[selectedPage]?.find(def => def.key === b.bloc_key);
        if (blockDef?.type === 'json' && value && typeof value === 'string') {
          try {
            value = JSON.parse(value);
          } catch (e) {
            console.warn(`JSON invalide pour ${b.bloc_key}:`, e);
          }
        }
        map[b.bloc_key] = { ...b, valeur_texte: value, dirty: false };
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

  const handleMediaChange = (key, url) => {
    setContentBlocks(prev => ({
      ...prev,
      [key]: {
        page_slug: selectedPage, bloc_key: key, actif: true,
        ...prev[key],
        media_url: url,
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
        let valueToSave = block.valeur_texte;
        if (valueToSave && typeof valueToSave === 'object') {
          valueToSave = JSON.stringify(valueToSave);
        }
        const payload = {
          page_slug:    selectedPage,
          bloc_key:     key,
          valeur_texte: valueToSave ?? null,
          media_url:    block.media_url ?? null,
          actif:        block.actif ?? true,
        };
        if (block.id) {
          await contentAPI.updateBlock(block.id, payload);
        } else {
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
      fetchBlocks();
    } else {
      showToast(`${errors} erreur(s) lors de la sauvegarde`, 'error');
    }
  };

  const hasDirty = Object.values(contentBlocks).some(b => b.dirty);
  const currentBlocks = PAGE_BLOCKS[selectedPage] ?? [];

  const renderBlock = (blockDef) => {
    const { key, label, type, schema, hint } = blockDef;
    const block = contentBlocks[key];
    const textVal = block?.valeur_texte ?? '';
    const mediaVal = block?.media_url ?? '';
    const dispVal = type === 'image' ? (mediaVal || textVal) : 
                   type === 'json' ? (typeof textVal === 'object' ? textVal : null) : textVal;

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
        {type === 'json' && (
          <JsonField
            value={dispVal}
            onChange={v => handleTextChange(key, v)}
            schema={schema}
            placeholder={hint}
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {PAGES.map(p => (
          <button key={p.slug} onClick={() => onPageChange(p.slug)}
            className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap border transition-colors"
            style={{
              backgroundColor: selectedPage === p.slug ? 'var(--primary)' : 'transparent',
              color: selectedPage === p.slug ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
              borderColor: selectedPage === p.slug ? 'var(--primary)' : 'var(--border)',
            }}>
            {p.name}
          </button>
        ))}
      </div>

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

// ── SECTION : Gestion du thème ────────────────────────────────────────────────
function ThemeTab({ selectedPage, onPageChange }) {
  const [theme, setTheme] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => setToast({ message: msg, type });

  const fetchTheme = useCallback(async () => {
    setLoading(true);
    try {
      const res = await contentAPI.getBlocks(selectedPage);
      const arr = res.data?.data?.blocks ?? res.data?.blocks ?? [];
      const themeBlock = arr.find(b => b.bloc_key === '_theme');
      if (themeBlock && themeBlock.valeur_texte) {
        try {
          const parsed = JSON.parse(themeBlock.valeur_texte);
          setTheme(parsed);
        } catch (e) {
          console.warn('Erreur parsing thème:', e);
        }
      } else {
        const defaults = {};
        THEME_CONFIG.forEach(cfg => { defaults[cfg.key] = cfg.default; });
        setTheme(defaults);
      }
    } catch (err) {
      showToast('Erreur de chargement du thème', 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedPage]);

  useEffect(() => { fetchTheme(); }, [fetchTheme]);

  const handleThemeChange = (key, value) => {
    setTheme(prev => ({ ...prev, [key]: value, dirty: true }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const themeToSave = { ...theme };
      delete themeToSave.dirty;
      await contentAPI.upsertBlock({
        page_slug: selectedPage,
        bloc_key: '_theme',
        valeur_texte: JSON.stringify(themeToSave, null, 2),
        actif: true,
      });
      showToast('Thème sauvegardé ✓');
      setTheme(prev => ({ ...prev, dirty: false }));
    } catch (err) {
      showToast('Erreur lors de la sauvegarde', 'error');
    } finally {
      setSaving(false);
    }
  };

  const hasDirty = theme.dirty === true;

  const renderThemeField = (cfg) => {
    const value = theme[cfg.key] || cfg.default;
    return (
      <div key={cfg.key} className="space-y-2">
        <label className="block text-sm font-medium" style={{ color: 'var(--foreground)' }}>
          {cfg.label}
          <span className="ml-2 text-xs font-normal" style={{ color: 'var(--muted-foreground)' }}>{cfg.hint}</span>
        </label>
        {cfg.type === 'color' && <ColorField value={value} onChange={v => handleThemeChange(cfg.key, v)} />}
        {cfg.type === 'font' && <FontField value={value} onChange={v => handleThemeChange(cfg.key, v)} />}
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
            Personnalisation visuelle
          </h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Personnalisez les couleurs et polices de la page {PAGES.find(p => p.slug === selectedPage)?.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchTheme} disabled={loading}
            className="p-2 rounded-lg border hover:opacity-80"
            style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={handleSave} disabled={saving || !hasDirty}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
            <Save className="h-4 w-4" />
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      <div className="rounded-xl p-6 border space-y-4"
        style={{
          backgroundColor: theme.backgroundColor || '#FFFFFF',
          color: theme.foregroundColor || '#1F2937',
          fontFamily: theme.fontBody || 'Inter',
          borderColor: 'var(--border)'
        }}>
        <h3 className="text-xl font-bold" style={{ 
          fontFamily: theme.fontHeading || 'Inter',
          color: theme.primaryColor || '#3B82F6'
        }}>
          Aperçu en direct
        </h3>
        <p style={{ color: theme.mutedForegroundColor || '#6B7280' }}>
          Voici à quoi ressemblera votre page avec ces réglages.
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ backgroundColor: theme.primaryColor || '#3B82F6', color: '#FFFFFF' }}>
            Bouton principal
          </button>
          <div className="px-4 py-2 rounded-lg border"
            style={{ borderColor: theme.primaryColor || '#3B82F6', color: theme.primaryColor || '#3B82F6' }}>
            Bouton secondaire
          </div>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: theme.cardColor || '#F9FAFB' }}>
          <p className="text-sm">Exemple de carte avec fond personnalisé</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-7 w-7 border-b-2 border-primary" /></div>
      ) : (
        <div className="rounded-xl p-5 border space-y-6"
          style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>Couleurs</h3>
          {THEME_CONFIG.filter(cfg => cfg.type === 'color').map(renderThemeField)}
          
          <div className="h-px" style={{ backgroundColor: 'var(--border)' }} />
          
          <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>Polices</h3>
          {THEME_CONFIG.filter(cfg => cfg.type === 'font').map(renderThemeField)}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// ── SECTION : Annonces ────────────────────────────────────────────────────────
function AnnouncementsTab() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);

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
        titre: editing.titre,
        description: editing.description,
        image_url: editing.image_url || null,
        date_event: editing.date_event || null,
        lien_wa: editing.lien_wa || null,
        actif: editing.actif !== false,
        ordre: Number(editing.ordre) || 0,
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

  const previewUrl = (url) => url
    ? (url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'https://maleahub.vercel.app'}${url}`)
    : null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Annonces & Événements</h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Apparaissent sur la page Annonces du site public</p>
        </div>
        <button onClick={() => setEditing({ ...fresh })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          <Plus className="h-4 w-4" /> Nouvelle annonce
        </button>
      </div>

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
                {ann.date_event && <p className="text-xs mb-2" style={{ color: 'var(--primary)' }}>{ann.date_event}</p>}
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
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

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
        nom: editing.nom,
        role: editing.role,
        image_url: editing.image_url || null,
        bio: editing.bio || null,
        actif: editing.actif !== false,
        ordre: Number(editing.ordre) || 0,
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
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Membres affichés sur la page Annonces & Équipe</p>
        </div>
        <button onClick={() => setEditing({ ...freshMember })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          <Plus className="h-4 w-4" /> Ajouter un membre
        </button>
      </div>

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

// ── SECTION : Paramètres ──────────────────────────────────────────────────────
function SettingsTab() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

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
        {config.type === 'text' && <TextField value={val} onChange={v => handleChange(cle, v)} placeholder={config.hint} />}
        {config.type === 'email' && <EmailField value={val} onChange={v => handleChange(cle, v)} placeholder={config.hint} />}
        {config.type === 'tel' && <TelField value={val} onChange={v => handleChange(cle, v)} placeholder={config.hint} />}
        {config.type === 'number' && <NumberField value={val} onChange={v => handleChange(cle, v)} placeholder={config.hint} />}
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
    { title: 'Contact & WhatsApp', keys: ['whatsapp_general', 'whatsapp_reservations', 'whatsapp_investors', 'address', 'email', 'instagram'] },
    { title: 'Jobs Week', keys: ['jobs_week_open', 'jobs_week_price', 'jobs_week_quota'] },
    { title: 'Système', keys: ['maintenance_mode'] },
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

// ── SECTION : Newsletter ───────────────────────────────────────────────────────
function NewsletterTab() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [total, setTotal] = useState(0);
  const [sending, setSending] = useState(false);
  const [emailForm, setEmailForm] = useState({ subject: '', content: '' });

  const showToast = (msg, type = 'success') => setToast({ message: msg, type });

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.get('/system/newsletter/subscribers');
      setSubscribers(res.data?.data?.subscribers || []);
      const countRes = await adminApi.get('/system/newsletter/count');
      setTotal(countRes.data?.data?.total || 0);
    } catch { showToast('Erreur chargement', 'error'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchSubscribers(); }, []);

  const exportSubscribers = () => {
    const csv = [['Email', "Date d'inscription"], ...subscribers.map(s => [s.email, new Date(s.subscribed_at).toLocaleDateString('fr-FR')])].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendNewsletter = async (e) => {
    e.preventDefault();
    if (!emailForm.subject || !emailForm.content) { showToast('Veuillez remplir le sujet et le contenu', 'error'); return; }
    if (!confirm(`Envoyer cette newsletter à ${total} abonné(s) ?`)) return;
    setSending(true);
    try {
      const res = await adminApi.post('/system/newsletter/send', { subject: emailForm.subject, content: emailForm.content, isHtml: false });
      showToast(res.data?.message || 'Newsletter envoyée avec succès !');
      setEmailForm({ subject: '', content: '' });
    } catch (error) { showToast(error.response?.data?.message || 'Erreur lors de l\'envoi', 'error'); }
    finally { setSending(false); }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Newsletter</h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{total} abonné(s) actif(s)</p>
        </div>
        <button onClick={exportSubscribers} disabled={subscribers.length === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          Exporter CSV
        </button>
      </div>

      <div className="rounded-xl border p-6 space-y-4" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>Envoyer une newsletter</h3>
        <form onSubmit={handleSendNewsletter} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>Sujet *</label>
            <input type="text" value={emailForm.subject} onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
              placeholder="Ex: Nouveaux événements chez Malea Hub"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>Message *</label>
            <textarea value={emailForm.content} onChange={(e) => setEmailForm({ ...emailForm, content: e.target.value })}
              rows={10} placeholder="Bonjour,..."
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }} required />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={sending || total === 0}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              {sending ? <>Envoi en cours...</> : <>Envoyer à {total} abonné(s)</>}
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
      ) : subscribers.length === 0 ? (
        <div className="text-center py-12 rounded-xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <Mail className="h-10 w-10 mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
          <p style={{ color: 'var(--muted-foreground)' }}>Aucun abonné pour le moment.</p>
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: 'var(--muted)' }}>
              <tr><th className="text-left p-3" style={{ color: 'var(--foreground)' }}>Email</th><th className="text-left p-3" style={{ color: 'var(--foreground)' }}>Date d'inscription</th></tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="p-3" style={{ color: 'var(--foreground)' }}>{sub.email}</td>
                  <td className="p-3" style={{ color: 'var(--muted-foreground)' }}>{new Date(sub.subscribed_at).toLocaleDateString('fr-FR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// ── Composant principal ────────────────────────────────────────────────────────
export default function ContentManager() {
  const [activeTab, setActiveTab] = useState('content');
  const [selectedPage, setSelectedPage] = useState('home');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Gestion du contenu</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Textes, images, thème, annonces, équipe et paramètres du site
        </p>
      </div>

      <div className="flex gap-1 border-b overflow-x-auto" style={{ borderColor: 'var(--border)' }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors"
            style={{ borderColor: activeTab === tab.id ? 'var(--primary)' : 'transparent', color: activeTab === tab.id ? 'var(--primary)' : 'var(--muted-foreground)' }}>
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'content' && <ContentTab selectedPage={selectedPage} onPageChange={setSelectedPage} />}
      {activeTab === 'theme' && <ThemeTab selectedPage={selectedPage} onPageChange={setSelectedPage} />}
      {activeTab === 'announcements' && <AnnouncementsTab />}
      {activeTab === 'team' && <TeamTab />}
      {activeTab === 'newsletter' && <NewsletterTab />}
      {activeTab === 'settings' && <SettingsTab />}
    </div>
  );
}