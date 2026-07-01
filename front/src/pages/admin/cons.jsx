// front/src/pages/admin/contentManager.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Save, Upload, X, CheckCircle, Mail, AlertCircle, RefreshCw,
  Plus, Trash2, Edit3, Eye, EyeOff,
  Megaphone, Users, Settings, Globe, Palette,
  ChevronDown, ChevronRight, RotateCcw, Languages
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

// ── Configuration du thème GLOBAL avec catégories
const THEME_CONFIG = [
  // Couleurs
  { key: 'primaryColor', label: 'Couleur principale', type: 'color', default: '#3B82F6', hint: 'Boutons, liens, accents', category: 'colors' },
  { key: 'backgroundColor', label: 'Couleur de fond', type: 'color', default: '#FFFFFF', hint: 'Fond principal de la page', category: 'colors' },
  { key: 'foregroundColor', label: 'Couleur du texte principal', type: 'color', default: '#1F2937', hint: 'Texte principal', category: 'colors' },
  { key: 'secondaryColor', label: 'Couleur secondaire', type: 'color', default: '#6B7280', hint: 'Texte secondaire, sous-titres', category: 'colors' },
  { key: 'cardColor', label: 'Couleur des cartes', type: 'color', default: '#F9FAFB', hint: 'Fond des cartes / sections', category: 'colors' },
  { key: 'borderColor', label: 'Couleur des bordures', type: 'color', default: '#E5E7EB', hint: 'Bordures, séparateurs', category: 'colors' },

  // Polices
  { key: 'fontHeading', label: 'Police des titres', type: 'font', default: 'Inter', hint: 'Google Font ou système', category: 'fonts' },
  { key: 'fontBody', label: 'Police du texte', type: 'font', default: 'Inter', hint: 'Google Font ou système', category: 'fonts' },

  // Typographie
  { key: 'fontSizeBase', label: 'Taille de texte de base', type: 'textSize', default: '16px', hint: 'Taille du texte normal', category: 'typography' },
  { key: 'fontSizeH1', label: 'Taille H1', type: 'textSize', default: '48px', hint: 'Titre principal', category: 'typography' },
  { key: 'fontSizeH2', label: 'Taille H2', type: 'textSize', default: '36px', hint: 'Sous-titre', category: 'typography' },
  { key: 'fontSizeH3', label: 'Taille H3', type: 'textSize', default: '28px', hint: 'Titre de section', category: 'typography' },

  // Espacements
  { key: 'spacingSection', label: 'Espacement des sections', type: 'spacing', default: '80px', hint: 'Espace vertical entre les sections', category: 'spacing' },
  { key: 'spacingElement', label: 'Espacement des éléments', type: 'spacing', default: '24px', hint: 'Espace entre les éléments', category: 'spacing' },

  // Arrondis
  { key: 'borderRadius', label: 'Arrondi des bordures', type: 'spacing', default: '8px', hint: 'Arrondi des cartes et boutons', category: 'shapes' },
];

// ── Configuration des blocs de contenu
const PAGE_BLOCKS = {
  home: [
    // Hero section
    { key: 'hero_title', label: 'Titre Hero (H1)', type: 'text', hint: 'Ex: Work, Connect, Grow', translatable: true },
    { key: 'hero_subtitle', label: 'Sous-titre Hero', type: 'textarea', hint: "Espace coworking, programme d'accompagnement...", translatable: true },
    { key: 'hero_image', label: 'Image de fond Hero', type: 'image', hint: 'Image plein écran en arrière-plan', translatable: false },
    // About section
    { key: 'about_badge', label: 'Badge À propos', type: 'text', hint: 'À propos', translatable: true },
    { key: 'about_title_prefix', label: 'Préfixe titre À propos', type: 'text', hint: 'Découvrir', translatable: true },
    { key: 'about_title_highlight', label: 'Mot mis en avant', type: 'text', hint: 'Malea Hub', translatable: true },
    { key: 'about_founder_name', label: 'Nom du fondateur', type: 'text', hint: 'Erdman Doumbè', translatable: false },
    { key: 'about_founder_title', label: 'Titre du fondateur', type: 'text', hint: 'Fondateur de Malea Hub', translatable: true },
    { key: 'about_description', label: 'Description complète', type: 'textarea', hint: "À l'origine de Malea Hub...", translatable: true },
    { key: 'about_cta_text', label: 'Texte bouton', type: 'text', hint: 'En savoir plus', translatable: true },
    { key: 'about_cta_link', label: 'Lien du bouton', type: 'text', hint: '/about', translatable: false },
    { key: 'about_image', label: 'Photo du fondateur', type: 'image', hint: 'Portrait du fondateur', translatable: false },
    // Services section
    { key: 'services_badge', label: 'Badge Services', type: 'text', hint: 'Nos services', translatable: true },
    { key: 'services_title_prefix', label: 'Préfixe titre Services', type: 'text', hint: 'Découvrez nos', translatable: true },
    { key: 'services_title_highlight', label: 'Mot mis en avant', type: 'text', hint: 'services', translatable: true },
    { key: 'services_mission_description', label: 'Description mission', type: 'textarea', hint: 'Notre mission...', translatable: true },
    { key: 'services_items', label: 'Services (3 cartes)', type: 'json', schema: 'services', hint: 'Titre, description, features, href pour chaque service', translatable: true },
    { key: 'services_featured_tag', label: 'Tag "Recommandé"', type: 'text', hint: 'Recommandé', translatable: true },
    { key: 'services_cta', label: 'Texte bouton CTA', type: 'text', hint: 'En savoir plus', translatable: true },
    // Why choose section
    { key: 'why_choose_badge', label: 'Badge Pourquoi Choisir', type: 'text', hint: 'Ex: Nos Avantages', translatable: true },
    { key: 'why_choose_title_prefix', label: 'Début titre Pourquoi Choisir', type: 'text', hint: 'Ex: Pourquoi choisir', translatable: true },
    { key: 'why_choose_title_highlight', label: 'Mot mis en avant', type: 'text', hint: 'Ex: Malea Hub', translatable: true },
    { key: 'why_choose_subtitle', label: 'Sous-titre Pourquoi Choisir', type: 'textarea', hint: 'Ex: Tout ce dont vous avez besoin...', translatable: true },
    { key: 'why_choose_reasons', label: 'Raisons (cartes)', type: 'json', schema: 'benefits', hint: 'Titre, description, icône pour chaque raison', translatable: true },
    // Team section
    { key: 'team_badge', label: 'Badge Équipe', type: 'text', hint: 'Notre équipe', translatable: true },
    { key: 'team_title_prefix', label: 'Préfixe titre Équipe', type: 'text', hint: 'Rencontrez', translatable: true },
    { key: 'team_title_highlight', label: 'Mot mis en avant', type: 'text', hint: "l'équipe", translatable: true },
    { key: 'team_subtitle', label: 'Sous-titre Équipe', type: 'textarea', hint: 'Des professionnels passionnés...', translatable: true },
    // Incubator CTA Section
    { key: 'incubator_badge', label: 'Badge Incubateur', type: 'text', hint: 'MALEA LAB', translatable: true },
    { key: 'incubator_title_prefix', label: 'Préfixe titre Incubateur', type: 'text', hint: 'Rejoignez', translatable: true },
    { key: 'incubator_title_highlight', label: 'Mot mis en avant', type: 'text', hint: "l'Incubateur", translatable: true },
    { key: 'incubator_subtitle', label: 'Sous-titre Incubateur', type: 'textarea', hint: 'Transformez votre idée en startup', translatable: true },
    { key: 'incubator_description', label: 'Description Incubateur', type: 'textarea', hint: 'Un programme d\'accompagnement intensif...', translatable: true },
    { key: 'incubator_cta_button', label: 'Texte bouton', type: 'text', hint: 'Postuler maintenant', translatable: true },
    { key: 'incubator_whatsapp_link', label: 'Lien WhatsApp', type: 'text', hint: 'https://wa.me/237678111022?text=...', translatable: false },
    { key: 'incubator_benefits', label: 'Avantages (3 cartes)', type: 'json', schema: 'benefits', hint: 'Titre + description pour chaque carte', translatable: true },
    { key: 'incubator_stats', label: 'Statistiques (chiffres clés)', type: 'json', schema: 'stats', hint: 'Valeur + label', translatable: true },
    { key: 'incubator_card_title', label: 'Titre de la carte', type: 'text', hint: 'Prêt à relever le défi ?', translatable: true },
    { key: 'incubator_card_description', label: 'Description de la carte', type: 'textarea', hint: 'Rejoignez une communauté de startups innovantes', translatable: true },
    // Investor CTA section
    { key: 'investor_badge', label: 'Badge Investisseurs', type: 'text', hint: 'Investissez', translatable: true },
    { key: 'investor_title_prefix', label: 'Préfixe titre Investisseurs', type: 'text', hint: 'Rejoignez le', translatable: true },
    { key: 'investor_title_highlight', label: 'Mot mis en avant', type: 'text', hint: 'Malea Invest Club', translatable: true },
    { key: 'investor_subtitle', label: 'Sous-titre Investisseurs', type: 'text', hint: 'Investissez dans les startups de demain', translatable: true },
    { key: 'investor_description', label: 'Description Investisseurs', type: 'textarea', hint: 'Texte de présentation du club...', translatable: true },
    { key: 'investor_cta_text', label: 'Texte du bouton', type: 'text', hint: 'Rejoindre le Malea Invest Club', translatable: true },
    { key: 'investor_benefits', label: 'Avantages (3 cartes)', type: 'json', schema: 'benefits', hint: 'Titre + description pour chaque carte', translatable: true },
    { key: 'investor_stats', label: 'Statistiques (chiffres clés)', type: 'json', schema: 'stats', hint: 'Valeur + label', translatable: true },
    // Jobs Week section
    { key: 'jobsweek_badge', label: 'Badge Jobs Week', type: 'text', hint: 'Jobs Week', translatable: true },
    { key: 'jobsweek_title', label: 'Titre Jobs Week', type: 'text', hint: 'Devenez prêt pour l\'emploi', translatable: true },
    { key: 'jobsweek_subtitle', label: 'Sous-titre Jobs Week', type: 'text', hint: 'En 5 jours intensifs', translatable: true },
    { key: 'jobsweek_description', label: 'Description Jobs Week', type: 'textarea', hint: 'Un programme intensif...', translatable: true },
    { key: 'jobsweek_benefits', label: 'Liste des points forts', type: 'json', schema: 'list', hint: 'Ex: ["CV professionnel", "Simulation entretien"]', translatable: true },
    { key: 'jobsweek_card_badge', label: 'Badge sur la carte', type: 'text', hint: 'Places limitées', translatable: true },
    { key: 'jobsweek_price_label', label: 'Label prix', type: 'text', hint: 'Tarif unique', translatable: true },
    { key: 'jobsweek_price_currency', label: 'Devise', type: 'text', hint: 'FCFA', translatable: false },
    { key: 'jobsweek_spots_label', label: 'Label places', type: 'text', hint: 'places disponibles', translatable: true },
    { key: 'jobsweek_duration_label', label: 'Label durée', type: 'text', hint: '5 jours intensifs', translatable: true },
    { key: 'jobsweek_included_title', label: 'Titre "Ce qui est inclus"', type: 'text', hint: 'Inclus dans le programme', translatable: true },
    { key: 'jobsweek_included_items', label: 'Liste éléments inclus', type: 'json', schema: 'list', hint: 'Ex: ["Certificat", "Coaching individuel"]', translatable: true },
    { key: 'jobsweek_cta_button', label: 'Texte bouton principal', type: 'text', hint: 'Je m\'inscris', translatable: true },
    { key: 'jobsweek_reserve_button', label: 'Texte bouton réservation', type: 'text', hint: 'Réserver ma place', translatable: true },
    // Legacy
    { key: 'cta_incubator', label: 'Texte bouton incubateur (legacy)', type: 'text', hint: "Rejoindre l'incubateur", translatable: true },
    { key: 'jobs_week_price', label: 'Prix Jobs Week (FCFA legacy)', type: 'text', hint: '30000', translatable: false },
    { key: 'jobs_week_quota', label: 'Places Jobs Week (legacy)', type: 'text', hint: '10', translatable: false },
  ],
  coworking: [
    { key: 'hero_badge', label: 'Badge Hero', type: 'text', hint: 'Ex: Espace de travail', translatable: true },
    { key: 'hero_title_prefix', label: 'Préfixe titre Hero', type: 'text', hint: 'Votre', translatable: true },
    { key: 'hero_title_highlight', label: 'Mot mis en avant', type: 'text', hint: 'espace de coworking', translatable: true },
    { key: 'hero_title_suffix', label: 'Suffixe titre Hero', type: 'text', hint: 'premium', translatable: true },
    { key: 'hero_description', label: 'Description Hero', type: 'textarea', hint: 'Un espace de travail moderne et flexible...', translatable: true },
    { key: 'hero_image', label: 'Image Hero', type: 'image', hint: "Photo principale de l'espace de coworking", translatable: false },
    { key: 'cta_button', label: 'Texte bouton CTA', type: 'text', hint: 'Réserver un espace', translatable: true },
    { key: 'cta_message', label: 'Message WhatsApp', type: 'textarea', hint: 'Bonjour, je souhaite réserver un espace coworking', translatable: true },
    { key: 'gallery_title', label: 'Titre de la galerie', type: 'text', hint: 'Notre espace de travail', translatable: true },
    { key: 'gallery_1', label: 'Photo galerie 1', type: 'image', hint: 'Espace de travail ouvert', translatable: false },
    { key: 'gallery_1_alt', label: 'Alt galerie 1', type: 'text', hint: 'Espace de travail ouvert', translatable: true },
    { key: 'gallery_2', label: 'Photo galerie 2', type: 'image', hint: 'Salle de réunion', translatable: false },
    { key: 'gallery_2_alt', label: 'Alt galerie 2', type: 'text', hint: 'Salle de réunion', translatable: true },
    { key: 'gallery_3', label: 'Photo galerie 3', type: 'image', hint: 'Bureau privé', translatable: false },
    { key: 'gallery_3_alt', label: 'Alt galerie 3', type: 'text', hint: 'Bureau privé', translatable: true },
    { key: 'features_title', label: 'Titre équipements', type: 'text', hint: 'Équipements & Services', translatable: true },
    { key: 'features_subtitle', label: 'Sous-titre équipements', type: 'textarea', hint: 'Tout ce dont vous avez besoin pour travailler', translatable: true },
    { key: 'features_items', label: 'Liste équipements', type: 'json', schema: 'features', hint: 'Titre + description pour chaque équipement', translatable: true },
    { key: 'rental_title', label: 'Titre location soir', type: 'text', hint: 'Location soir & événements', translatable: true },
    { key: 'rental_description', label: 'Description location', type: 'textarea', hint: 'Vous souhaitez organiser une formation...', translatable: true },
    { key: 'rental_availability_label', label: 'Label disponibilité', type: 'text', hint: 'Disponible de', translatable: true },
    { key: 'rental_hours', label: 'Horaires location soir', type: 'text', hint: '18h30 – 22h30', translatable: false },
    { key: 'rental_button', label: 'Texte bouton location', type: 'text', hint: 'Louer l\'espace', translatable: true },
    { key: 'rental_message', label: 'Message WhatsApp location', type: 'textarea', hint: 'Bonjour, je souhaite louer l\'espace pour organiser une formation/événement', translatable: true },
  ],
  // ... (les autres pages avec translatable: true/false)
};

// ── COMPOSANTS UI ──────────────────────────────────────────────────────────────

const iStyle = { backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' };
const iCls = 'w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors text-sm md:text-base';

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

function TextSizeField({ value, onChange }) {
  const sizes = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '40px', '48px', '56px', '64px', '72px'];
  return (
    <select
      value={value || '16px'}
      onChange={e => onChange(e.target.value)}
      className={iCls}
      style={iStyle}
    >
      {sizes.map(size => (
        <option key={size} value={size}>{size}</option>
      ))}
    </select>
  );
}

function SpacingField({ value, onChange }) {
  const spacings = ['0', '4px', '8px', '12px', '16px', '20px', '24px', '32px', '40px', '48px', '64px', '80px', '100px', '120px'];
  return (
    <select
      value={value || '24px'}
      onChange={e => onChange(e.target.value)}
      className={iCls}
      style={iStyle}
    >
      {spacings.map(size => (
        <option key={size} value={size}>{size}</option>
      ))}
    </select>
  );
}

function JsonField({ value, onChange, schema, placeholder }) {
  const [isValid, setIsValid] = useState(true);
  const [textValue, setTextValue] = useState(() => {
    if (value && typeof value !== 'string') return JSON.stringify(value, null, 2);
    return value || '';
  });

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
            className="ml-2 underline hover:opacity-80"
            style={{ color: 'var(--primary)' }}
          >
            Insérer un exemple
          </button>
        </div>
      )}
    </div>
  );
}

function ImageField({ value, onTextChange, onUpload, placeholder }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    setUploading(true);
    try {
      const res = await contentAPI.uploadMedia(file);
      const url = res.data?.data?.url ?? res.data?.url ?? '';
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
    ? (value.startsWith('http') ? value : `${'/api'}${value}`)
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

// ── CHAMP MULTILINGUE ──────────────────────────────────────────────────────────

function MultilingualField({ value, onChange, type, placeholder, label }) {
  const [activeLang, setActiveLang] = useState('fr');

  // Initialiser les valeurs par défaut
  const getValue = (lang) => {
    if (value && typeof value === 'object') {
      return value[lang] || '';
    }
    return value || '';
  };

  const handleChange = (lang, newValue) => {
    const currentValue = typeof value === 'object' && value !== null ? { ...value } : {};
    currentValue[lang] = newValue;
    onChange(currentValue);
  };

  const renderField = (lang) => {
    const val = getValue(lang);
    const commonProps = {
      value: val,
      onChange: (e) => handleChange(lang, e.target.value),
      placeholder: placeholder || `${label} (${lang === 'fr' ? 'Français' : 'English'})`,
      className: iCls,
      style: iStyle,
    };

    if (type === 'textarea') {
      return <textarea {...commonProps} rows={3} />;
    }
    return <input {...commonProps} />;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex gap-1 border rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveLang('fr')}
            className={`px-3 py-1 text-xs font-medium transition-colors ${
              activeLang === 'fr' ? 'bg-primary text-primary-foreground' : 'bg-transparent'
            }`}
            style={activeLang === 'fr' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}
          >
            🇫🇷 FR
          </button>
          <button
            onClick={() => setActiveLang('en')}
            className={`px-3 py-1 text-xs font-medium transition-colors ${
              activeLang === 'en' ? 'bg-primary text-primary-foreground' : 'bg-transparent'
            }`}
            style={activeLang === 'en' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}
          >
            🇬🇧 EN
          </button>
        </div>
        <span className="text-xs text-muted-foreground">
          {activeLang === 'fr' ? 'Français' : 'English'}
        </span>
        {value && typeof value === 'object' && (
          <span className="text-xs text-green-600">
            ✓ {Object.keys(value).filter(k => value[k]).length} langue(s) renseignée(s)
          </span>
        )}
      </div>
      {renderField(activeLang)}
      {activeLang === 'fr' && (
        <div className="text-xs text-muted-foreground">
          💡 Saisissez le contenu en français, puis passez en anglais pour saisir la traduction
        </div>
      )}
    </div>
  );
}

// ── CONTENT TAB ────────────────────────────────────────────────────────────────

function ContentTab({ selectedPage, onPageChange }) {
  const [contentBlocks, setContentBlocks] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const scrollRef = useRef(null);
  const [selectedLang, setSelectedLang] = useState('fr');

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
        
        // Si le champ est multilingue, on parse le JSON
        if (blockDef?.translatable && value && typeof value === 'string') {
          try {
            value = JSON.parse(value);
          } catch (e) {
            // Si ce n'est pas du JSON valide, on le convertit en objet multilingue
            value = { fr: value, en: value };
          }
        } else if (blockDef?.type === 'json' && value && typeof value === 'string') {
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
        page_slug: selectedPage,
        bloc_key: key,
        actif: true,
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
        page_slug: selectedPage,
        bloc_key: key,
        actif: true,
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
        const blockDef = PAGE_BLOCKS[selectedPage]?.find(def => def.key === key);
        
        // Si le champ est multilingue et la valeur est un objet, on le stringifie
        if (blockDef?.translatable && valueToSave && typeof valueToSave === 'object') {
          valueToSave = JSON.stringify(valueToSave);
        } else if (valueToSave && typeof valueToSave === 'object') {
          valueToSave = JSON.stringify(valueToSave);
        }
        
        const payload = {
          page_slug: selectedPage,
          bloc_key: key,
          valeur_texte: valueToSave ?? null,
          media_url: block.media_url ?? null,
          actif: block.actif ?? true,
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
  const { key, label, type, schema, hint, translatable } = blockDef;
  const block = contentBlocks[key];
  const textVal = block?.valeur_texte ?? '';
  const mediaVal = block?.media_url ?? '';
  
  // 🔥 Pour l'affichage, on prend la bonne langue
  let displayValue = textVal;
  if (translatable && typeof textVal === 'object' && textVal !== null) {
    displayValue = textVal[selectedLang] || textVal['fr'] || '';
  }
  
  const dispVal = type === 'image' ? (mediaVal || textVal) :
                 type === 'json' ? (typeof textVal === 'object' ? textVal : null) : displayValue;

  return (
    <div key={key} className="rounded-xl p-5 border space-y-3 transition-all"
      style={{ backgroundColor: 'var(--card)', borderColor: block?.dirty ? 'color-mix(in oklch, var(--primary) 60%, transparent)' : 'var(--border)' }}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              {label}
              {translatable && (
                <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                  🌍 {selectedLang === 'fr' ? 'FR' : 'EN'}
                </span>
              )}
              {block?.dirty && (
                <span className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)', color: 'var(--primary)' }}>
                  modifié
                </span>
              )}
            </label>
          </div>
          {hint && <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{hint}</p>}
        </div>
        <code className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}>{key}</code>
      </div>

      {type === 'text' && (
        translatable ? (
          // 🔥 PASSER LA VALEUR BRUTE (OBJET) À MultilingualField
          <MultilingualField
            value={textVal}  // ← ici on passe l'objet complet, pas dispVal
            onChange={v => handleTextChange(key, v)}
            type="text"
            placeholder={hint}
            label={label}
            activeLang={selectedLang}
            onLangChange={setSelectedLang}
          />
        ) : (
          <TextField value={textVal} onChange={v => handleTextChange(key, v)} placeholder={hint} />
        )
      )}
      
      {type === 'textarea' && (
        translatable ? (
          <MultilingualField
            value={textVal}  // ← ici on passe l'objet complet, pas dispVal
            onChange={v => handleTextChange(key, v)}
            type="textarea"
            placeholder={hint}
            label={label}
            activeLang={selectedLang}
            onLangChange={setSelectedLang}
          />
        ) : (
          <TextareaField value={textVal} onChange={v => handleTextChange(key, v)} placeholder={hint} />
        )
      )}
      
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
          value={textVal}
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
      {/* Sélecteur de page */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-1.5 md:gap-2 overflow-x-auto overflow-y-hidden pb-2 scrollbar-thin"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
            msOverflowStyle: 'none',
            padding: '2px 0 8px 0',
          }}
        >
          {PAGES.map(p => (
            <button
              key={p.slug}
              onClick={() => onPageChange(p.slug)}
              className="flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium border transition-all duration-200 whitespace-nowrap"
              style={{
                backgroundColor: selectedPage === p.slug ? 'var(--primary)' : 'transparent',
                color: selectedPage === p.slug ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                borderColor: selectedPage === p.slug ? 'var(--primary)' : 'var(--border)',
                minWidth: 'fit-content',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
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

// ── THEME TAB ──────────────────────────────────────────────────────────────────

function ThemeTab({ selectedPage, onPageChange }) {
  const [theme, setTheme] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeCategory, setActiveCategory] = useState('colors');
  const [isGlobal, setIsGlobal] = useState(true);
  const scrollRef = useRef(null);

  const showToast = (msg, type = 'success') => setToast({ message: msg, type });

  const defaultTheme = {};
  THEME_CONFIG.forEach(cfg => { defaultTheme[cfg.key] = cfg.default; });

  const GLOBAL_THEME_KEY = '_global_theme';

  const fetchTheme = useCallback(async () => {
    setLoading(true);
    try {
      const defaultValues = {};
      THEME_CONFIG.forEach(cfg => { defaultValues[cfg.key] = cfg.default; });

      const globalRes = await contentAPI.getBlocks('__global__');
      const globalArr = globalRes.data?.data?.blocks ?? globalRes.data?.blocks ?? [];
      const globalThemeBlock = globalArr.find(b => b.bloc_key === GLOBAL_THEME_KEY);

      let globalTheme = {};
      if (globalThemeBlock && globalThemeBlock.valeur_texte) {
        try {
          globalTheme = JSON.parse(globalThemeBlock.valeur_texte);
        } catch (e) { console.warn('Erreur parsing thème global:', e); }
      }

      const pageRes = await contentAPI.getBlocks(selectedPage);
      const pageArr = pageRes.data?.data?.blocks ?? pageRes.data?.blocks ?? [];
      const pageThemeBlock = pageArr.find(b => b.bloc_key === '_theme');

      let pageTheme = {};
      if (pageThemeBlock && pageThemeBlock.valeur_texte) {
        try {
          pageTheme = JSON.parse(pageThemeBlock.valeur_texte);
        } catch (e) { console.warn('Erreur parsing thème page:', e); }
      }

      const hasPageTheme = Object.keys(pageTheme).length > 0;

      if (hasPageTheme) {
        setIsGlobal(false);
        setTheme({ ...defaultValues, ...pageTheme, dirty: false });
      } else if (Object.keys(globalTheme).length > 0) {
        setIsGlobal(true);
        setTheme({ ...defaultValues, ...globalTheme, dirty: false });
      } else {
        setIsGlobal(true);
        setTheme({ ...defaultValues, dirty: false });
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

      let pageSlug = selectedPage;
      let blocKey = '_theme';

      if (isGlobal) {
        pageSlug = '__global__';
        blocKey = GLOBAL_THEME_KEY;
      }

      await contentAPI.upsertBlock({
        page_slug: pageSlug,
        bloc_key: blocKey,
        valeur_texte: JSON.stringify(themeToSave, null, 2),
        actif: true,
      });
      showToast(`Thème ${isGlobal ? 'global' : 'de la page'} sauvegardé ✓`);
      setTheme(prev => ({ ...prev, dirty: false }));
      fetchTheme();
    } catch (err) {
      showToast('Erreur lors de la sauvegarde', 'error');
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = async () => {
    if (!confirm('Réinitialiser le thème aux valeurs par défaut ?')) return;

    setSaving(true);
    try {
      const result = await contentAPI.resetTheme();
      console.log('🗑️ Tous les thèmes supprimés:', result.data);

      const defaultValues = {};
      THEME_CONFIG.forEach(cfg => { defaultValues[cfg.key] = cfg.default; });
      
      setTheme({ ...defaultValues, dirty: false });
      setIsGlobal(true);
      showToast('Thème réinitialisé aux valeurs par défaut ✓');
      await fetchTheme();
    } catch (err) {
      console.error('Reset error:', err);
      showToast('Erreur lors de la réinitialisation: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setSaving(false);
    }
  };

  const switchToGlobal = async () => {
    const hasPageTheme = await checkIfPageHasTheme(selectedPage);
    if (hasPageTheme && !confirm('Passer au thème global ? Les modifications locales seront perdues.')) {
      return;
    }
    setIsGlobal(true);
    fetchTheme();
  };

  const switchToPage = async () => {
    setIsGlobal(false);
    const currentTheme = { ...theme };
    delete currentTheme.dirty;
    setTheme(prev => ({ ...currentTheme, dirty: true }));
  };

  const checkIfPageHasTheme = async (pageSlug) => {
    try {
      const res = await contentAPI.getBlocks(pageSlug);
      const arr = res.data?.data?.blocks ?? res.data?.blocks ?? [];
      return arr.some(b => b.bloc_key === '_theme');
    } catch {
      return false;
    }
  };

  const hasDirty = theme.dirty === true;

  const previewStyles = {
    backgroundColor: theme.backgroundColor || '#FFFFFF',
    color: theme.foregroundColor || '#1F2937',
    fontFamily: theme.fontBody || 'Inter',
    fontSize: theme.fontSizeBase || '16px',
    borderColor: theme.borderColor || '#E5E7EB',
    borderRadius: theme.borderRadius || '8px',
    padding: '20px',
  };

  const renderThemeField = (cfg) => {
    const value = theme[cfg.key] ?? cfg.default;
    return (
      <div key={cfg.key} className="space-y-2 py-2 border-b border-border/50 last:border-0">
        <label className="block text-sm font-medium" style={{ color: 'var(--foreground)' }}>
          {cfg.label}
          <span className="ml-2 text-xs font-normal" style={{ color: 'var(--muted-foreground)' }}>{cfg.hint}</span>
          {hasDirty && (
            <span className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded" 
              style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)', color: 'var(--primary)' }}>
              modifié
            </span>
          )}
        </label>
        {cfg.type === 'color' && <ColorField value={value} onChange={v => handleThemeChange(cfg.key, v)} />}
        {cfg.type === 'font' && <FontField value={value} onChange={v => handleThemeChange(cfg.key, v)} />}
        {cfg.type === 'textSize' && <TextSizeField value={value} onChange={v => handleThemeChange(cfg.key, v)} />}
        {cfg.type === 'spacing' && <SpacingField value={value} onChange={v => handleThemeChange(cfg.key, v)} />}
      </div>
    );
  };

  const categories = {
    colors: { label: '🎨 Couleurs', icon: '🎨' },
    fonts: { label: '🔤 Polices', icon: '🔤' },
    typography: { label: '📝 Typographie', icon: '📝' },
    spacing: { label: '📏 Espacements', icon: '📏' },
    shapes: { label: '🔲 Formes', icon: '🔲' },
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
            Personnalisation visuelle
          </h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            {isGlobal ? '🌍 Thème global (appliqué à toutes les pages)' : `📄 Thème spécifique à ${PAGES.find(p => p.slug === selectedPage)?.name}`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={switchToGlobal}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${isGlobal ? 'bg-primary text-primary-foreground' : ''}`}
            style={{
              backgroundColor: isGlobal ? 'var(--primary)' : 'transparent',
              color: isGlobal ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
              borderColor: isGlobal ? 'var(--primary)' : 'var(--border)',
            }}
          >
            🌍 Global
          </button>
          <button
            onClick={switchToPage}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${!isGlobal ? 'bg-primary text-primary-foreground' : ''}`}
            style={{
              backgroundColor: !isGlobal ? 'var(--primary)' : 'transparent',
              color: !isGlobal ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
              borderColor: !isGlobal ? 'var(--primary)' : 'var(--border)',
            }}
          >
            📄 Cette page
          </button>

          <button onClick={resetToDefault}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border hover:bg-red-50 transition-all"
            style={{ borderColor: '#EF4444', color: '#EF4444' }}>
            <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser
          </button>

          <button onClick={fetchTheme} disabled={loading}
            className="p-2 rounded-lg border hover:opacity-80"
            style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button onClick={handleSave} disabled={saving || !hasDirty}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
            <Save className="h-4 w-4" />
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-1.5 md:gap-2 overflow-x-auto overflow-y-hidden pb-2" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin' }}>
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className="flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium border transition-all whitespace-nowrap"
              style={{
                backgroundColor: activeCategory === key ? 'var(--primary)' : 'transparent',
                color: activeCategory === key ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                borderColor: activeCategory === key ? 'var(--primary)' : 'var(--border)',
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-4 md:p-6 border space-y-4 transition-all" style={previewStyles}>
        <h3 className="text-2xl font-bold" style={{
          fontFamily: theme.fontHeading || 'Inter',
          color: theme.primaryColor || '#3B82F6',
          fontSize: theme.fontSizeH2 || '36px',
        }}>
          Aperçu en direct
        </h3>
        <p style={{
          fontSize: theme.fontSizeBase || '16px',
          color: theme.secondaryColor || '#6B7280',
        }}>
          Voici à quoi ressemblera votre page avec ces réglages.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              backgroundColor: theme.primaryColor || '#3B82F6',
              color: '#FFFFFF',
              borderRadius: theme.borderRadius || '8px',
              fontSize: theme.fontSizeBase || '16px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            }}>
            Bouton principal
          </button>
          <div className="px-4 py-2 rounded-lg border"
            style={{
              borderColor: theme.primaryColor || '#3B82F6',
              color: theme.primaryColor || '#3B82F6',
              borderRadius: theme.borderRadius || '8px',
            }}>
            Bouton secondaire
          </div>
        </div>
        <div className="p-4 rounded-lg" style={{
          backgroundColor: theme.cardColor || '#F9FAFB',
          borderRadius: theme.borderRadius || '8px',
          border: `1px solid ${theme.borderColor || '#E5E7EB'}`,
        }}>
          <h4 className="font-semibold" style={{
            fontSize: theme.fontSizeH4 || '22px',
            color: theme.foregroundColor || '#1F2937',
            fontFamily: theme.fontHeading || 'Inter',
          }}>
            Exemple de carte
          </h4>
          <p className="text-sm" style={{
            color: theme.secondaryColor || '#6B7280',
            fontSize: theme.fontSizeBase || '16px',
          }}>
            Cette carte utilise tous vos paramètres de thème
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-7 w-7 border-b-2 border-primary" /></div>
      ) : (
        <div className="rounded-xl p-4 md:p-5 border space-y-4"
          style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          {THEME_CONFIG.filter(cfg => cfg.category === activeCategory).map(renderThemeField)}
        </div>
      )}

      {hasDirty && (
        <div className="text-xs text-amber-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Des modifications non sauvegardées
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// ── COMPOSANT PRINCIPAL ─────────────────────────────────────────────────────────

export default function ContentManage() {
  const [activeTab, setActiveTab] = useState('content');
  const [selectedPage, setSelectedPage] = useState('home');
  const tabsScrollRef = useRef(null);

  const TABS = [
    { id: 'content', label: 'Contenu', icon: Globe },
    { id: 'theme', label: 'Thème', icon: Palette },
    { id: 'announcements', label: 'Annonces', icon: Megaphone },
    { id: 'team', label: 'Équipe', icon: Users },
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
          Gestion du contenu
        </h1>
        <p className="text-xs md:text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Textes, images, thème, annonces, équipe et paramètres du site
        </p>
      </div>

      <div className="relative">
        <div
          ref={tabsScrollRef}
          className="flex gap-1 border-b overflow-x-auto overflow-y-hidden pb-1 scrollbar-thin"
          style={{
            borderColor: 'var(--border)',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'thin',
          }}
        >
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 text-xs md:text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors flex-shrink-0"
              style={{
                borderColor: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                color: activeTab === tab.id ? 'var(--primary)' : 'var(--muted-foreground)',
              }}
            >
              <tab.icon className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
              <span className="hidden xs:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-hidden">
        {activeTab === 'content' && <ContentTab selectedPage={selectedPage} onPageChange={setSelectedPage} />}
        {activeTab === 'theme' && <ThemeTab selectedPage={selectedPage} onPageChange={setSelectedPage} />}
        {activeTab === 'announcements' && <AnnouncementsTab />}
        {activeTab === 'team' && <TeamTab />}
        {activeTab === 'newsletter' && <NewsletterTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>

      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: color-mix(in oklch, var(--primary) 30%, transparent);
          border-radius: 2px;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        @media (min-width: 480px) {
          .xs\\:inline {
            display: inline !important;
          }
        }
        @media (max-width: 479px) {
          .xs\\:inline {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}