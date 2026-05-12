

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Création de l'instance axios
export const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor pour le token
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor pour refresh token
adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('admin_refreshToken');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
        const { token, refreshToken: newRT } = response.data.data;
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_refreshToken', newRT);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return adminApi(originalRequest);
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


// 1. AUTHENTIFICATION - EXPORTS DIRECTS

export const adminAuthAPI = {
  login: (credentials) => adminApi.post('/auth/login', credentials),
  getMe: () => adminApi.get('/auth/me'),
  changePassword: (data) => adminApi.patch('/auth/change-password', data),
};

// Vérification que l'export fonctionne
console.log('[admin.js] adminAuthAPI exporté:', adminAuthAPI);


// 2. UTILISATEURS

export const adminUsersAPI = {
  getAll: (params) => adminApi.get('/auth/users', { params }),
  create: (data) => adminApi.post('/auth/users', data),
  update: (id, data) => adminApi.patch(`/auth/users/${id}`, data),
  delete: (id) => adminApi.delete(`/auth/users/${id}`),
};


// 3. RÉSERVATIONS & SALLES

export const adminReservationsAPI = {
  getAll: (params) => adminApi.get('/reservations', { params }),
  getById: (id) => adminApi.get(`/reservations/${id}`),
  getStats: () => adminApi.get('/reservations/stats'),
  update: (id, data) => adminApi.patch(`/reservations/${id}`, data),
  exportCSV: (params) => adminApi.get('/reservations/export/csv', { params, responseType: 'blob' }),
  
  getSalles: () => adminApi.get('/reservations/salles'),
  getSalleById: (id) => adminApi.get(`/reservations/salles/${id}`),
  createSalle: (data) => adminApi.post('/reservations/salles', data),
  updateSalle: (id, data) => adminApi.patch(`/reservations/salles/${id}`, data),
  deleteSalle: (id) => adminApi.delete(`/reservations/salles/${id}`),
};


// 4. FORMATIONS & INSCRIPTIONS

export const adminFormationsAPI = {
  getAll: () => adminApi.get('/formations'),
  getById: (id) => adminApi.get(`/formations/${id}`),
  create: (data) => adminApi.post('/formations', data),
  update: (id, data) => adminApi.patch(`/formations/${id}`, data),
  delete: (id) => adminApi.delete(`/formations/${id}`),
  
  getInscriptions: (formationId) => adminApi.get(`/formations/${formationId}/inscriptions`),
  updateInscription: (id, data) => adminApi.patch(`/formations/inscriptions/${id}`, data),
  exportInscriptions: (formationId) => adminApi.get(`/formations/${formationId}/inscriptions/export`, { responseType: 'blob' }),
};


// 5. INCUBATEUR

export const adminIncubatorAPI = {
  getCandidatures: () => adminApi.get('/candidatures'),
  getCandidatureById: (id) => adminApi.get(`/candidatures/${id}`),
  updateCandidature: (id, data) => adminApi.patch(`/candidatures/${id}`, data),
  getStats: () => adminApi.get('/candidatures/stats'),
  
  getProjetsIncubes: () => adminApi.get('/candidatures/projets'),
  getProjetIncubeById: (id) => adminApi.get(`/candidatures/projets/${id}`),
  createProjetIncube: (data) => adminApi.post('/candidatures/projets', data),
  updateProjetIncube: (id, data) => adminApi.patch(`/candidatures/projets/${id}`, data),
};


// 6. INVESTISSEURS

export const adminInvestorsAPI = {
  getAll: () => adminApi.get('/system/investors'),
  getById: (id) => adminApi.get(`/system/investors/${id}`),
  create: (data) => adminApi.post('/system/investors', data),
  update: (id, data) => adminApi.patch(`/system/investors/${id}`, data),
  delete: (id) => adminApi.delete(`/system/investors/${id}`),
};


// CONTACTS

export const adminContactsAPI = {
  getAll: () => adminApi.get('/system/contacts'),
  getById: (id) => adminApi.get(`/system/contacts/${id}`),
  update: (id, data) => adminApi.patch(`/system/contacts/${id}`, data),
  delete: (id) => adminApi.delete(`/system/contacts/${id}`),
  export: () => adminApi.get('/system/contacts/export', { responseType: 'blob' }),
};

// dashboard
export const adminDashboardAPI = {
  getKPIs: () => adminApi.get('/system/dashboard'),
};


// 9. CONTENT BLOCKS (CMS)

export const contentAPI = {
  getAllBlocks: () => adminApi.get('/system/content'),
  getBlocks: (pageSlug) => adminApi.get(`/system/content?page_slug=${pageSlug}`),
  getBlock: (id) => adminApi.get(`/system/content/${id}`),
  updateBlock: (id, data) => adminApi.put(`/system/content/${id}`, data),
  upsertBlock: (data) => adminApi.put('/system/content', data),
  deleteBlock: (id) => adminApi.delete(`/system/content/${id}`),
  uploadMedia: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return adminApi.post('/system/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// 10. SETTINGS

export const settingsAPI = {
  getAll: () => adminApi.get('/system/settings'),
  get: (key) => adminApi.get(`/system/settings/${key}`),
  update: (key, value) => adminApi.put('/system/settings', { cle: key, valeur: value }),
  delete: (key) => adminApi.delete(`/system/settings/${key}`),
};

// Export par défaut
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