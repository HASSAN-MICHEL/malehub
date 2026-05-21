// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// export const clientApi = axios.create({
//   baseURL: API_BASE_URL,
//   headers: { 'Content-Type': 'application/json' },
// });


// //  FORMATIONS 

// export const formationsAPI = {
//   getAll: () => clientApi.get('/formations'),
//   getById: (id) => clientApi.get(`/formations/${id}`),
//   inscription: (formationId, data) => clientApi.post(`/formations/${formationId}/inscriptions`, data),
// };


// //CANDIDATURES

// export const candidaturesAPI = {
//   submit: (data) => clientApi.post('/candidatures', data),
// };


// // CONTACT 

// export const contactAPI = {
//   submit: (data) => clientApi.post('/system/contacts', data),
// };

// export default {
//   formationsAPI,
//   candidaturesAPI,
//   contactAPI,
// };



// // Inscriptions: Entrepreneuriat Digital: De l'id‚e au lancement
// // 2 / 20 places réservées

// // Exporter CSV
// // 0

// // Confirmées

// // 0

// // En attente

// // 20

// // Places restantes

// // Nom	Email	Téléphone	Date	Statut	Actions
// // ISSA

// // junif@email.com	+237692958135	08/05/2026	Confirmée	


// // HASSAN

// // hassan@email.com	+237690098754	08/05/2026	Confirmée	


import axios from 'axios';

const API_BASE_URL = 'https://maleahub.vercel.app/api';

export const clientApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Formations 
export const formationsAPI = {
  getAll:      ()                  => clientApi.get('/formations'),
  getById:     (id)                => clientApi.get(`/formations/${id}`),
  inscription: (formationId, data) => clientApi.post(`/formations/${formationId}/inscriptions`, data),
};

// Candidatures 
export const candidaturesAPI = {
  submit: (data) => clientApi.post('/candidatures', data),
};

//Contact (public) 
export const contactAPI = {
  submit: (data) => clientApi.post('/system/contacts', data),
};

// Contenu CMS (public, lecture seule) 
export const cmsAPI = {
  getPageContent: (pageSlug) =>
    clientApi.get('/system/content', { params: { page_slug: pageSlug } }),
  getSettings: () =>
    clientApi.get('/system/settings'),
};

export default { formationsAPI, candidaturesAPI, contactAPI, cmsAPI };