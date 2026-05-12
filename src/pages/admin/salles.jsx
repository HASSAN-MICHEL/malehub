import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { adminReservationsAPI } from '../../services/admin';

const typeOptions = [
  { value: 'coworking', label: 'Coworking' },
  { value: 'salle_reunion', label: 'Salle de réunion' },
  { value: 'salle_formation', label: 'Salle de formation' },
  { value: 'lounge', label: 'Lounge' },
];

const statutOptions = [
  { value: 'disponible', label: 'Disponible' },
  { value: 'hors_service', label: 'Hors service' },
];

export default function Salles() {
  const [salles, setSalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSalle, setEditingSalle] = useState(null);
  const [formData, setFormData] = useState({
    numero: '',
    nom: '',
    type: 'salle_formation',
    capacite: '',
    statut: 'disponible',
  });

  useEffect(() => {
    fetchSalles();
  }, []);

  const fetchSalles = async () => {
    try {
      const response = await adminReservationsAPI.getSalles();
      setSalles(response.data.data?.salles || []);
    } catch (error) {
      console.error('Error fetching salles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSalle) {
        await adminReservationsAPI.updateSalle(editingSalle.id, formData);
      } else {
        await adminReservationsAPI.createSalle(formData);
      }
      fetchSalles();
      closeModal();
    } catch (error) {
      console.error('Error saving salle:', error);
      alert(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette salle ?')) {
      try {
        await adminReservationsAPI.deleteSalle(id);
        fetchSalles();
      } catch (error) {
        console.error('Error deleting salle:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const openModal = (salle = null) => {
    if (salle) {
      setEditingSalle(salle);
      setFormData({
        numero: salle.numero,
        nom: salle.nom,
        type: salle.type,
        capacite: salle.capacite,
        statut: salle.statut,
      });
    } else {
      setEditingSalle(null);
      setFormData({
        numero: '',
        nom: '',
        type: 'salle_formation',
        capacite: '',
        statut: 'disponible',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSalle(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Salles & Espaces</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Gérer les salles, espaces de coworking et lounges
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          <Plus className="h-4 w-4" />
          Ajouter une salle
        </button>
      </div>

      {/* Grid des salles */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {salles.map((salle) => (
            <div
              key={salle.id}
              className="rounded-xl border p-5 transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: 'var(--foreground)' }}>
                    {salle.nom}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    {salle.numero}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(salle)}
                    className="p-1.5 rounded-lg transition-colors hover:bg-blue-100"
                  >
                    <Edit2 className="h-4 w-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(salle.id)}
                    className="p-1.5 rounded-lg transition-colors hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Type</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                    {typeOptions.find(t => t.value === salle.type)?.label || salle.type}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Capacité</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                    {salle.capacite} personnes
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Statut</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    salle.statut === 'disponible' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {salle.statut === 'disponible' ? 'Disponible' : 'Hors service'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="rounded-xl w-full max-w-md" style={{ backgroundColor: 'var(--card)' }}>
            <div className="flex justify-between items-center p-5 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                {editingSalle ? 'Modifier la salle' : 'Ajouter une salle'}
              </h2>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-gray-100/10">
                <X className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Numéro
                </label>
                <input
                  type="text"
                  value={formData.numero}
                  onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Nom
                </label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  {typeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Capacité
                </label>
                <input
                  type="number"
                  value={formData.capacite}
                  onChange={(e) => setFormData({ ...formData, capacite: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Statut
                </label>
                <select
                  value={formData.statut}
                  onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  {statutOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
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
                  {editingSalle ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}