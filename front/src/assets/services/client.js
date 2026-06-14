

import axios from 'axios';

const API_BASE_URL = '/api';

export const clientApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

//  Formations 
export const formationsAPI = {
  getAll:      ()                  => clientApi.get('/formations'),
  getById:     (id)                => clientApi.get(`/formations/${id}`),
  inscription: (formationId, data) => clientApi.post(`/formations/${formationId}/inscriptions`, data),
};

// Candidatures
export const candidaturesAPI = {
  submit: (data) => clientApi.post('/candidatures', data),
};

// Contact
export const contactAPI = {
  submit: (data) => clientApi.post('/system/contacts', data),
};

//CMS public — contenu, settings, annonces, équipe 
export const cmsAPI = {
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