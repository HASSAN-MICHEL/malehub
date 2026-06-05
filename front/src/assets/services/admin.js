

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://maleahub.vercel.app/api';

export const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

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

// ── Auth 
export const adminAuthAPI = {
  login:          (creds) => adminApi.post('/auth/login', creds),
  getMe:          ()      => adminApi.get('/auth/me'),
  changePassword: (data)  => adminApi.patch('/auth/change-password', data),
};

// ── Users
export const adminUsersAPI = {
  getAll:  (params)   => adminApi.get('/auth/users', { params }),
  create:  (data)     => adminApi.post('/auth/users', data),
  update:  (id, data) => adminApi.patch(`/auth/users/${id}`, data),
  delete:  (id)       => adminApi.delete(`/auth/users/${id}`),
};

// ── Réservations & Salle
export const adminReservationsAPI = {
  getAll:    (params)   => adminApi.get('/reservations', { params }),
  getById:   (id)       => adminApi.get(`/reservations/${id}`),
  getStats:  ()         => adminApi.get('/reservations/stats'),
  update:    (id, data) => adminApi.patch(`/reservations/${id}`, data),
  exportCSV: (params)   => adminApi.get('/reservations/export/csv', { params, responseType: 'blob' }),
  getSalles:    ()         => adminApi.get('/reservations/salles'),
  getSalleById: (id)       => adminApi.get(`/reservations/salles/${id}`),
  createSalle:  (data)     => adminApi.post('/reservations/salles', data),
  updateSalle:  (id, data) => adminApi.patch(`/reservations/salles/${id}`, data),
  deleteSalle:  (id)       => adminApi.delete(`/reservations/salles/${id}`),
};

// ── Formations & Inscriptions
export const adminFormationsAPI = {
  getAll:   (params)    => adminApi.get('/formations', { params }),
  getById:  (id)        => adminApi.get(`/formations/${id}`),
  create:   (data)      => adminApi.post('/formations', data),
  update:   (id, data)  => adminApi.patch(`/formations/${id}`, data),
  delete:   (id)        => adminApi.delete(`/formations/${id}`),
  getInscriptions:    (fid)      => adminApi.get(`/formations/${fid}/inscriptions`),
  updateInscription:  (id, data) => adminApi.patch(`/formations/inscriptions/${id}`, data),
  exportInscriptions: (fid)      => adminApi.get(`/formations/${fid}/inscriptions/export`, { responseType: 'blob' }),
};

// ── Incubateur 
export const adminIncubatorAPI = {
  getCandidatures:     (params)   => adminApi.get('/candidatures', { params }),
  getCandidatureById:  (id)       => adminApi.get(`/candidatures/${id}`),
  updateCandidature:   (id, data) => adminApi.patch(`/candidatures/${id}`, data),
  getStats:            ()         => adminApi.get('/candidatures/stats'),
  getProjetsIncubes:   (params)   => adminApi.get('/candidatures/projets', { params }),
  getProjetIncubeById: (id)       => adminApi.get(`/candidatures/projets/${id}`),
  createProjetIncube:  (data)     => adminApi.post('/candidatures/projets', data),
  updateProjetIncube:  (id, data) => adminApi.patch(`/candidatures/projets/${id}`, data),
};

// ── Investisseurs
export const adminInvestorsAPI = {
  getAll:  (params)   => adminApi.get('/system/investors', { params }),
  getById: (id)       => adminApi.get(`/system/investors/${id}`),
  create:  (data)     => adminApi.post('/system/investors', data),
  update:  (id, data) => adminApi.patch(`/system/investors/${id}`, data),
  delete:  (id)       => adminApi.delete(`/system/investors/${id}`),
  getInteractions: (id) => adminApi.get(`/system/investors/${id}/interactions`).catch(() => ({ data: { data: [] } })),
  addInteraction:  (id, data) => adminApi.post(`/system/investors/${id}/interactions`, data).catch(() => ({})),
};

// ── Contacts
export const adminContactsAPI = {
  getAll:  (params)   => adminApi.get('/system/contacts', { params }),
  getById: (id)       => adminApi.get(`/system/contacts/${id}`),
  update:  (id, data) => adminApi.patch(`/system/contacts/${id}`, data),
  delete:  (id)       => adminApi.delete(`/system/contacts/${id}`),
  export:  ()         => adminApi.get('/system/contacts/export', { responseType: 'blob' }),
};

// ── Dashboard 
export const adminDashboardAPI = {
  getKPIs: () => adminApi.get('/system/dashboard'),
};

// ── Content Blocks 
export const contentAPI = {
  getBlocks:   (pageSlug) => adminApi.get('/system/content', { params: { page_slug: pageSlug } }),
  getAllBlocks: ()         => adminApi.get('/system/content'),
  // Upsert bloc nouveau (sans id) — crée via page_slug + bloc_key
  upsertBlock: (data)     => adminApi.put('/system/content', data),
  // Mise à jour bloc existant (avec id)
  updateBlock: (id, data) => adminApi.put(`/system/content/${id}`, data),
  deleteBlock: (id)       => adminApi.delete(`/system/content/${id}`),
  uploadMedia: (file)     => {
    const fd = new FormData();
    fd.append('file', file);
    return adminApi.post('/system/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
};

// ── Settings 
export const settingsAPI = {
  getAll:  ()            => adminApi.get('/system/settings'),
  get:     (cle)         => adminApi.get(`/system/settings/${cle}`),
  update:  (cle, valeur) => adminApi.put('/system/settings', { cle, valeur }),
  delete:  (cle)         => adminApi.delete(`/system/settings/${cle}`),
};

// ── Annonce
// Réponse: { data: { announcements: [...] } }
export const adminAnnouncementsAPI = {
  getAll:  ()            => adminApi.get('/system/announcements'),
  getById: (id)          => adminApi.get(`/system/announcements/${id}`),
  create:  (data)        => adminApi.post('/system/announcements', data),
  update:  (id, data)    => adminApi.patch(`/system/announcements/${id}`, data),
  delete:  (id)          => adminApi.delete(`/system/announcements/${id}`),
};

// ── Équipe (Team Members) ─────────────────────────────────────────────────────
// Réponse: { data: { members: [...] } }
export const adminTeamAPI = {
  getAll:  ()            => adminApi.get('/system/team'),
  getById: (id)          => adminApi.get(`/system/team/${id}`),
  create:  (data)        => adminApi.post('/system/team', data),
  update:  (id, data)    => adminApi.patch(`/system/team/${id}`, data),
  delete:  (id)          => adminApi.delete(`/system/team/${id}`),
  uploadPhoto: (file)    => {
    const fd = new FormData();
    fd.append('file', file);
    return adminApi.post('/system/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
};

export default {
  adminApi, adminAuthAPI, adminUsersAPI, adminReservationsAPI,
  adminFormationsAPI, adminIncubatorAPI, adminInvestorsAPI,
  adminContactsAPI, adminDashboardAPI, contentAPI, settingsAPI,
  adminAnnouncementsAPI, adminTeamAPI,
};