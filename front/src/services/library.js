// services/admin/libraryAPI.js
import { adminApi } from './admin';

export const adminLibraryAPI = {
  // Récupérer tous les livres
  getAll: () => adminApi.get('/library/books'),
  getById: (id) => adminApi.get(`/library/books/${id}`),
  // Récupérer les catégories
  getCategories: () => adminApi.get('/library/categories'),
  // Créer un livre
  create: (data) => adminApi.post('/library/admin/books', data),
  // Mettre à jour un livre
  update: (id, data) => adminApi.put(`/library/admin/books/${id}`, data),
  // Supprimer un livre
  delete: (id) => adminApi.delete(`/library/admin/books/${id}`),
};