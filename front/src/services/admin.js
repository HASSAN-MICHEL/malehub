

// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// // Création de l'instance axios
// export const adminApi = axios.create({
//   baseURL: API_BASE_URL,
//   headers: { 'Content-Type': 'application/json' },
// });

// // Interceptor pour le token
// adminApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem('admin_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Interceptor pour refresh token
// adminApi.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = localStorage.getItem('admin_refreshToken');
//         const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
//         const { token, refreshToken: newRT } = response.data.data;
//         localStorage.setItem('admin_token', token);
//         localStorage.setItem('admin_refreshToken', newRT);
//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return adminApi(originalRequest);
//       } catch {
//         localStorage.removeItem('admin_token');
//         localStorage.removeItem('admin_refreshToken');
//         localStorage.removeItem('admin_user');
//         window.location.href = '/admin/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );


// // 1. AUTHENTIFICATION - EXPORTS DIRECTS

// export const adminAuthAPI = {
//   login: (credentials) => adminApi.post('/auth/login', credentials),
//   getMe: () => adminApi.get('/auth/me'),
//   changePassword: (data) => adminApi.patch('/auth/change-password', data),
// };

// // Vérification que l'export fonctionne
// console.log('[admin.js] adminAuthAPI exporté:', adminAuthAPI);


// // 2. UTILISATEURS

// export const adminUsersAPI = {
//   getAll: (params) => adminApi.get('/auth/users', { params }),
//   create: (data) => adminApi.post('/auth/users', data),
//   update: (id, data) => adminApi.patch(`/auth/users/${id}`, data),
//   delete: (id) => adminApi.delete(`/auth/users/${id}`),
// };


// // 3. RÉSERVATIONS & SALLES

// export const adminReservationsAPI = {
//   getAll: (params) => adminApi.get('/reservations', { params }),
//   getById: (id) => adminApi.get(`/reservations/${id}`),
//   getStats: () => adminApi.get('/reservations/stats'),
//   update: (id, data) => adminApi.patch(`/reservations/${id}`, data),
//   exportCSV: (params) => adminApi.get('/reservations/export/csv', { params, responseType: 'blob' }),
  
//   getSalles: () => adminApi.get('/reservations/salles'),
//   getSalleById: (id) => adminApi.get(`/reservations/salles/${id}`),
//   createSalle: (data) => adminApi.post('/reservations/salles', data),
//   updateSalle: (id, data) => adminApi.patch(`/reservations/salles/${id}`, data),
//   deleteSalle: (id) => adminApi.delete(`/reservations/salles/${id}`),
// };


// // 4. FORMATIONS & INSCRIPTIONS

// export const adminFormationsAPI = {
//   getAll: () => adminApi.get('/formations'),
//   getById: (id) => adminApi.get(`/formations/${id}`),
//   create: (data) => adminApi.post('/formations', data),
//   update: (id, data) => adminApi.patch(`/formations/${id}`, data),
//   delete: (id) => adminApi.delete(`/formations/${id}`),
  
//   getInscriptions: (formationId) => adminApi.get(`/formations/${formationId}/inscriptions`),
//   updateInscription: (id, data) => adminApi.patch(`/formations/inscriptions/${id}`, data),
//   exportInscriptions: (formationId) => adminApi.get(`/formations/${formationId}/inscriptions/export`, { responseType: 'blob' }),
// };


// // 5. INCUBATEUR

// export const adminIncubatorAPI = {
//   getCandidatures: () => adminApi.get('/candidatures'),
//   getCandidatureById: (id) => adminApi.get(`/candidatures/${id}`),
//   updateCandidature: (id, data) => adminApi.patch(`/candidatures/${id}`, data),
//   getStats: () => adminApi.get('/candidatures/stats'),
  
//   getProjetsIncubes: () => adminApi.get('/candidatures/projets'),
//   getProjetIncubeById: (id) => adminApi.get(`/candidatures/projets/${id}`),
//   createProjetIncube: (data) => adminApi.post('/candidatures/projets', data),
//   updateProjetIncube: (id, data) => adminApi.patch(`/candidatures/projets/${id}`, data),
// };


// // 6. INVESTISSEURS

// export const adminInvestorsAPI = {
//   getAll: () => adminApi.get('/system/investors'),
//   getById: (id) => adminApi.get(`/system/investors/${id}`),
//   create: (data) => adminApi.post('/system/investors', data),
//   update: (id, data) => adminApi.patch(`/system/investors/${id}`, data),
//   delete: (id) => adminApi.delete(`/system/investors/${id}`),
// };


// // CONTACTS

// export const adminContactsAPI = {
//   getAll: () => adminApi.get('/system/contacts'),
//   getById: (id) => adminApi.get(`/system/contacts/${id}`),
//   update: (id, data) => adminApi.patch(`/system/contacts/${id}`, data),
//   delete: (id) => adminApi.delete(`/system/contacts/${id}`),
//   export: () => adminApi.get('/system/contacts/export', { responseType: 'blob' }),
// };

// // dashboard
// export const adminDashboardAPI = {
//   getKPIs: () => adminApi.get('/system/dashboard'),
// };




// export const contentAPI = {
//   // Get all blocks for a specific page
//   getBlocks: (pageSlug) =>
//     adminApi.get('/system/content', { params: { page_slug: pageSlug } }),

//   // Get all blocks across all pages
//   getAllBlocks: () => adminApi.get('/system/content'),

//   // Upsert a block by (page_slug + bloc_key) — use when no id yet
//   upsertBlock: (data) => adminApi.put('/system/content', data),

//   // Update an existing block by its id
//   updateBlock: (id, data) => adminApi.put(`/system/content/${id}`, data),

//   // Delete a block
//   deleteBlock: (id) => adminApi.delete(`/system/content/${id}`),

//   // Upload an image — response.data.data.url contains the path  hassan@gmail.com Hassan123
//   uploadMedia: (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     return adminApi.post('/system/upload', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//   },
// };

// // ── 10. SETTINGS
// export const settingsAPI = {
//   getAll:  ()              => adminApi.get('/system/settings'),
//   get:     (cle)           => adminApi.get(`/system/settings/${cle}`),
//   update:  (cle, valeur)   => adminApi.put('/system/settings', { cle, valeur }),
//   upsert:  (cle, valeur, description) =>
//     adminApi.put('/settings', { cle, valeur, ...(description ? { description } : {}) }),
//   delete:  (cle)           => adminApi.delete(`/system/settings/${cle}`),
// };


// // Export par défaut
// export default {
//   adminApi,
//   adminAuthAPI,
//   adminUsersAPI,
//   adminReservationsAPI,
//   adminFormationsAPI,
//   adminIncubatorAPI,
//   adminInvestorsAPI,
//   adminContactsAPI,
//   adminDashboardAPI,
//   contentAPI,
//   settingsAPI,
// };

import axios from 'axios';

const API_BASE_URL ='https://maleahub.vercel.app/api';

// axios
export const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh on 401
adminApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const orig = error.config;
    if (error.response?.status === 401 && !orig._retry) {
      orig._retry = true;
      try {
        const rt = localStorage.getItem('admin_refreshToken');
        if (!rt) throw new Error('no refresh token');
        const res = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken: rt });
        const { token, refreshToken: newRT } = res.data.data;
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_refreshToken', newRT);
        orig.headers.Authorization = `Bearer ${token}`;
        return adminApi(orig);
      } catch {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_refreshToken');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

//AUTHentification
export const adminAuthAPI = {
  login:          (creds) => adminApi.post('/auth/login', creds),
  getMe:          ()      => adminApi.get('/auth/me'),
  changePassword: (data)  => adminApi.patch('/auth/change-password', data),
};

//  UTILISATEURS 
export const adminUsersAPI = {
  getAll:  (params)    => adminApi.get('/auth/users', { params }),
  create:  (data)      => adminApi.post('/auth/users', data),
  update:  (id, data)  => adminApi.patch(`/auth/users/${id}`, data),
  delete:  (id)        => adminApi.delete(`/auth/users/${id}`),
};


export const adminReservationsAPI = {
  getAll:    (params)    => adminApi.get('/reservations', { params }),
  getById:   (id)        => adminApi.get(`/reservations/${id}`),
  getStats:  ()          => adminApi.get('/reservations/stats'),
  update:    (id, data)  => adminApi.patch(`/reservations/${id}`, data),
  exportCSV: (params)    => adminApi.get('/reservations/export/csv', { params, responseType: 'blob' }),

  getSalles:    ()         => adminApi.get('/reservations/salles'),
  getSalleById: (id)       => adminApi.get(`/reservations/salles/${id}`),
  createSalle:  (data)     => adminApi.post('/reservations/salles', data),
  updateSalle:  (id, data) => adminApi.patch(`/reservations/salles/${id}`, data),
  deleteSalle:  (id)       => adminApi.delete(`/reservations/salles/${id}`),
};


export const adminFormationsAPI = {
  getAll:   (params)       => adminApi.get('/formations', { params }),
  getById:  (id)           => adminApi.get(`/formations/${id}`),
  create:   (data)         => adminApi.post('/formations', data),
  update:   (id, data)     => adminApi.patch(`/formations/${id}`, data),
  delete:   (id)           => adminApi.delete(`/formations/${id}`),

  getInscriptions:   (fid)       => adminApi.get(`/formations/${fid}/inscriptions`),
  updateInscription: (id, data)  => adminApi.patch(`/formations/inscriptions/${id}`, data),
  exportInscriptions:(fid)       => adminApi.get(`/formations/${fid}/inscriptions/export`, { responseType: 'blob' }),
};


export const adminIncubatorAPI = {
  getCandidatures:    (params)    => adminApi.get('/candidatures', { params }),
  getCandidatureById: (id)        => adminApi.get(`/candidatures/${id}`),
  updateCandidature:  (id, data)  => adminApi.patch(`/candidatures/${id}`, data),
  getStats:           ()          => adminApi.get('/candidatures/stats'),

  getProjetsIncubes:   (params)   => adminApi.get('/candidatures/projets', { params }),
  getProjetIncubeById: (id)       => adminApi.get(`/candidatures/projets/${id}`),
  createProjetIncube:  (data)     => adminApi.post('/candidatures/projets', data),
  updateProjetIncube:  (id, data) => adminApi.patch(`/candidatures/projets/${id}`, data),
};

// INVESTISSEURS 
export const adminInvestorsAPI = {
  getAll:  (params)    => adminApi.get('/system/investors', { params }),
  getById: (id)        => adminApi.get(`/system/investors/${id}`),
  create:  (data)      => adminApi.post('/system/investors', data),
  update:  (id, data)  => adminApi.patch(`/system/investors/${id}`, data),
  delete:  (id)        => adminApi.delete(`/system/investors/${id}`),
  getInteractions: (id) => adminApi.get(`/system/investors/${id}/interactions`).catch(() => ({ data: { data: [] } })),
  addInteraction:  (id, data) => adminApi.post(`/system/investors/${id}/interactions`, data).catch(() => ({})),
};

// /system/contacts 
export const adminContactsAPI = {
  getAll:  (params)   => adminApi.get('/system/contacts', { params }),
  getById: (id)       => adminApi.get(`/system/contacts/${id}`),
  update:  (id, data) => adminApi.patch(`/system/contacts/${id}`, data),
  delete:  (id)       => adminApi.delete(`/system/contacts/${id}`),
  export:  ()         => adminApi.get('/system/contacts/export', { responseType: 'blob' }),
};

//  DASHBOARD 
export const adminDashboardAPI = {
  getKPIs: () => adminApi.get('/system/dashboard'),
};

// CONTENUE DES PAGES
export const contentAPI = {
  getBlocks:    (pageSlug) => adminApi.get('/system/content', { params: { page_slug: pageSlug } }),
  getAllBlocks:  ()         => adminApi.get('/system/content'),
  upsertBlock:  (data)     => adminApi.put('/system/content', data),
  updateBlock:  (id, data) => adminApi.put(`/system/content/${id}`, data),
  deleteBlock:  (id)       => adminApi.delete(`/system/content/${id}`),
  uploadMedia:  (file)     => {
    const fd = new FormData();
    fd.append('file', file);
    return adminApi.post('/system/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
};


export const settingsAPI = {
  getAll:  ()             => adminApi.get('/system/settings'),
  get:     (cle)          => adminApi.get(`/system/settings/${cle}`),
  update:  (cle, valeur)  => adminApi.put('/system/settings', { cle, valeur }),
  delete:  (cle)          => adminApi.delete(`/system/settings/${cle}`),
};

// ── Export par défaut ─────────────────────────────────────────────────────────
export default {
  adminApi,
  adminAuthAPI,
  adminUsersAPI,
  adminReservationsAPI,
  adminFormationsAPI,
  adminIncubatorAPI,
  adminInvestorsAPI,
  adminContactsAPI,
  adminDashboardAPI,
  contentAPI,
  settingsAPI,
};