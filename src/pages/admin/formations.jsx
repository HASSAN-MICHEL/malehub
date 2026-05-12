import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Users, Eye } from 'lucide-react';
import { adminFormationsAPI, adminUsersAPI } from '../../services/admin';
import { useNavigate } from 'react-router-dom';

export default function Formations() {
  const [formations, setFormations] = useState([]);
  const [formateurs, setFormateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFormation, setEditingFormation] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: '',
    programme: '',
    benefices: '',
    prix: '',
    date_debut: '',
    nb_places: '',
    statut_ouvert: true,
    formateur_id: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [formationsRes, formateursRes] = await Promise.all([
        adminFormationsAPI.getAll(),
        adminUsersAPI.getAll({ role: 'FORMATEUR' }),
      ]);
      setFormations(formationsRes.data.data || []);
      setFormateurs(formateursRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFormation) {
        await adminFormationsAPI.update(editingFormation.id, formData);
      } else {
        await adminFormationsAPI.create(formData);
      }
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error saving formation:', error);
      alert(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      try {
        await adminFormationsAPI.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting formation:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const openModal = (formation = null) => {
    if (formation) {
      setEditingFormation(formation);
      setFormData({
        titre: formation.titre,
        programme: formation.programme,
        benefices: formation.benefices || '',
        prix: formation.prix,
        date_debut: formation.date_debut?.slice(0, 16),
        nb_places: formation.nb_places,
        statut_ouvert: formation.statut_ouvert,
        formateur_id: formation.formateur_id || '',
      });
    } else {
      setEditingFormation(null);
      setFormData({
        titre: '',
        programme: '',
        benefices: '',
        prix: '',
        date_debut: '',
        nb_places: '',
        statut_ouvert: true,
        formateur_id: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingFormation(null);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Formations</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Gérer les formations, programmes et Jobs Week
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          <Plus className="h-4 w-4" />
          Ajouter une formation
        </button>
      </div>

      {/* Liste des formations */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {formations.map((formation) => (
            <div
              key={formation.id}
              className="rounded-xl border p-5 transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--foreground)' }}>
                      {formation.titre}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      formation.statut_ouvert ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {formation.statut_ouvert ? 'Ouvert' : 'Fermé'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm mb-3" style={{ color: 'var(--muted-foreground)' }}>
                    <span>📅 {formatDate(formation.date_debut)}</span>
                    <span>👥 {formation.nb_places} places</span>
                    <span>💰 {formation.prix?.toLocaleString()} FCFA</span>
                    {formation.formateur_id && (
                      <span>👨‍🏫 Formateur: {formateurs.find(f => f.id === formation.formateur_id)?.nom || 'N/A'}</span>
                    )}
                  </div>
                  <p className="text-sm line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>
                    {formation.programme?.slice(0, 150)}...
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/admin/inscriptions?formation=${formation.id}`)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors"
                    style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}
                  >
                    <Users className="h-4 w-4" />
                    Inscriptions
                  </button>
                  <button
                    onClick={() => openModal(formation)}
                    className="p-2 rounded-lg transition-colors hover:bg-blue-100"
                  >
                    <Edit2 className="h-4 w-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(formation.id)}
                    className="p-2 rounded-lg transition-colors hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--card)' }}>
            <div className="sticky top-0 flex justify-between items-center p-5 border-b" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                {editingFormation ? 'Modifier la formation' : 'Ajouter une formation'}
              </h2>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-gray-100/10">
                <X className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Titre
                </label>
                <input
                  type="text"
                  value={formData.titre}
                  onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Programme
                </label>
                <textarea
                  value={formData.programme}
                  onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                  rows={5}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Bénéfices
                </label>
                <textarea
                  value={formData.benefices}
                  onChange={(e) => setFormData({ ...formData, benefices: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Prix (FCFA)
                  </label>
                  <input
                    type="number"
                    value={formData.prix}
                    onChange={(e) => setFormData({ ...formData, prix: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Nombre de places
                  </label>
                  <input
                    type="number"
                    value={formData.nb_places}
                    onChange={(e) => setFormData({ ...formData, nb_places: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Date de début
                </label>
                <input
                  type="datetime-local"
                  value={formData.date_debut}
                  onChange={(e) => setFormData({ ...formData, date_debut: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Formateur
                </label>
                <select
                  value={formData.formateur_id}
                  onChange={(e) => setFormData({ ...formData, formateur_id: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  <option value="">Sélectionner un formateur</option>
                  {formateurs.map(f => (
                    <option key={f.id} value={f.id}>{f.nom}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.statut_ouvert}
                    onChange={(e) => setFormData({ ...formData, statut_ouvert: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm" style={{ color: 'var(--foreground)' }}>Formation ouverte aux inscriptions</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 rounded-lg border transition-colors"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  {editingFormation ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}