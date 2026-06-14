// utils/helpers.js
// Slugify une chaîne de caractères
 //* Transforme "Mon Titre" en "mon-titre"
 
export const slugify = (str) => {
  if (!str) return '';
  
  return str
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')           // décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // supprime les diacritiques
    .replace(/[^a-z0-9\s-]/g, '')    // supprime les caractères spéciaux
    .replace(/[\s_-]+/g, '-')        // remplace les espaces et underscores par tirets
    .replace(/^-+|-+$/g, '');        // supprime les tirets en début/fin
};

/**
 * Formate une date pour l'affichage
 */
export const formatDate = (date, locale = 'fr-FR') => {
  if (!date) return null;
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Génère une réponse paginée
 */
export const buildPagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, parseInt(query.limit) || 10);
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

/**
 * Vérifie si une chaîne est un UUID valide
 */
export const isValidUUID = (str) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

/**
 * Nettoie un objet en supprimant les champs undefined/null
 */
export const cleanObject = (obj) => {
  const result = {};
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
      result[key] = obj[key];
    }
  }
  return result;
};

/**
 * Tronque une chaîne à une longueur maximale
 */
export const truncate = (str, length = 100, suffix = '...') => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length - suffix.length) + suffix;
};