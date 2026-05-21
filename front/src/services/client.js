// // import axios from 'axios';

// // const API_BASE_URL = 'http://localhost:5000/api';

// // export const clientApi = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: { 'Content-Type': 'application/json' },
// // });


// // //  FORMATIONS 

// // export const formationsAPI = {
// //   getAll: () => clientApi.get('/formations'),
// //   getById: (id) => clientApi.get(`/formations/${id}`),
// //   inscription: (formationId, data) => clientApi.post(`/formations/${formationId}/inscriptions`, data),
// // };


// // //CANDIDATURES

// // export const candidaturesAPI = {
// //   submit: (data) => clientApi.post('/candidatures', data),
// // };


// // // CONTACT 

// // export const contactAPI = {
// //   submit: (data) => clientApi.post('/system/contacts', data),
// // };

// // export default {
// //   formationsAPI,
// //   candidaturesAPI,
// //   contactAPI,
// // };





// import axios from 'axios';

// const API_BASE_URL = 'https://maleahub.vercel.app/api';

// export const clientApi = axios.create({
//   baseURL: API_BASE_URL,
//   headers: { 'Content-Type': 'application/json' },
// });

// // Formations 
// export const formationsAPI = {
//   getAll:      ()                  => clientApi.get('/formations'),
//   getById:     (id)                => clientApi.get(`/formations/${id}`),
//   inscription: (formationId, data) => clientApi.post(`/formations/${formationId}/inscriptions`, data),
// };

// // Candidatures 
// export const candidaturesAPI = {
//   submit: (data) => clientApi.post('/candidatures', data),
// };

// //Contact (public) 
// export const contactAPI = {
//   submit: (data) => clientApi.post('/system/contacts', data),
// };

// // Contenu CMS (public, lecture seule) 
// export const cmsAPI = {
//   getPageContent: (pageSlug) =>
//     clientApi.get('/system/content', { params: { page_slug: pageSlug } }),
//   getSettings: () =>
//     clientApi.get('/system/settings'),
// };

// export default { formationsAPI, candidaturesAPI, contactAPI, cmsAPI };


import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://maleahub.vercel.app/api';

export const clientApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ── Formations (public) ───────────────────────────────────────────────────────
export const formationsAPI = {
  getAll:      ()                  => clientApi.get('/formations'),
  getById:     (id)                => clientApi.get(`/formations/${id}`),
  inscription: (formationId, data) => clientApi.post(`/formations/${formationId}/inscriptions`, data),
};

// ── Candidatures (public) ─────────────────────────────────────────────────────
export const candidaturesAPI = {
  submit: (data) => clientApi.post('/candidatures', data),
};

// ── Contact (public) ──────────────────────────────────────────────────────────
export const contactAPI = {
  submit: (data) => clientApi.post('/system/contacts', data),
};

// ── CMS public — contenu, settings, annonces, équipe ─────────────────────────
export const cmsAPI = {
  // Content blocks : { data: { blocks: [...] } }
  // Chaque bloc : { id, page_slug, bloc_key, valeur_texte, media_url, actif }
  getPageContent: (pageSlug) =>
    clientApi.get('/system/content', { params: { page_slug: pageSlug } }),

  // Settings globaux : { data: { settings: [...] } }
  getSettings: () =>
    clientApi.get('/system/settings'),

  // Annonces actives : { data: { announcements: [...] } }
  getAnnouncements: () =>
    clientApi.get('/system/announcements/public'),

  // Membres équipe actifs : { data: { members: [...] } }
  getTeam: () =>
    clientApi.get('/system/team/public'),
};

export default { formationsAPI, candidaturesAPI, contactAPI, cmsAPI };