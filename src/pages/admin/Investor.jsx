import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Send, Phone, Mail, Users } from 'lucide-react';
import { adminInvestorsAPI } from '../../services/admin';

const statutOptions = [
  { value: 'actif', label: 'Actif', color: 'text-green-700 bg-green-100' },
  { value: 'inactif', label: 'Inactif', color: 'text-gray-700 bg-gray-100' },
];

export default function Investors() {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingInvestor, setEditingInvestor] = useState(null);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [interactionText, setInteractionText] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    tel: '',
    secteurs: '',
    statut: 'actif',
  });

  useEffect(() => {
    fetchInvestors();
  }, []);

  const fetchInvestors = async () => {
    try {
      const response = await adminInvestorsAPI.getAll();
      setInvestors(response.data.data || []);
    } catch (error) {
      console.error('Error fetching investors:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInteractions = async (investorId) => {
    try {
      const response = await adminInvestorsAPI.getInteractions(investorId);
      setInteractions(response.data.data || []);
    } catch (error) {
      console.error('Error fetching interactions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingInvestor) {
        await adminInvestorsAPI.update(editingInvestor.id, formData);
      } else {
        await adminInvestorsAPI.create(formData);
      }
      fetchInvestors();
      closeModal();
    } catch (error) {
      console.error('Error saving investor:', error);
      alert(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet investisseur ?')) {
      try {
        await adminInvestorsAPI.delete(id);
        fetchInvestors();
      } catch (error) {
        console.error('Error deleting investor:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleAddInteraction = async () => {
    if (!interactionText.trim()) return;
    try {
      await adminInvestorsAPI.addInteraction(selectedInvestor.id, { note: interactionText });
      setInteractionText('');
      fetchInteractions(selectedInvestor.id);
    } catch (error) {
      console.error('Error adding interaction:', error);
      alert('Erreur lors de l\'ajout');
    }
  };

  const openModal = (investor = null) => {
    if (investor) {
      setEditingInvestor(investor);
      setFormData({
        nom: investor.nom,
        email: investor.email,
        tel: investor.tel || '',
        secteurs: investor.secteurs || '',
        statut: investor.statut,
      });
    } else {
      setEditingInvestor(null);
      setFormData({
        nom: '',
        email: '',
        tel: '',
        secteurs: '',
        statut: 'actif',
      });
    }
    setShowModal(true);
  };

  const openInteractions = async (investor) => {
    setSelectedInvestor(investor);
    await fetchInteractions(investor.id);
    setShowInteractionModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingInvestor(null);
  };

  const handleWhatsApp = (investor) => {
    const message = `Bonjour ${investor.nom},

Nous avons une opportunité d'investissement qui pourrait vous intéresser chez Malea Hub.

Souhaitez-vous en savoir plus ?

Cordialement,
L'équipe Malea Hub - Invest Club`;
    
    const url = `https://wa.me/${investor.tel.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Investisseurs</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Gérer le Malea Invest Club et les relations investisseurs
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="https://chat.whatsapp.com/your-group-link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: '#25D366', color: 'white' }}
          >
            <Users className="h-4 w-4" />
            Groupe WhatsApp
          </a>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            <Plus className="h-4 w-4" />
            Ajouter un investisseur
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Nom</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Email</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Téléphone</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Secteurs</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Statut</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                  </td>
                </tr>
              ) : investors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8" style={{ color: 'var(--muted-foreground)' }}>
                    Aucun investisseur trouvé
                  </td>
                </tr>
              ) : (
                investors.map((investor) => (
                  <tr key={investor.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="p-4">
                      <p className="font-medium" style={{ color: 'var(--foreground)' }}>{investor.nom}</p>
                    </td>
                    <td className="p-4" style={{ color: 'var(--foreground)' }}>{investor.email}</td>
                    <td className="p-4" style={{ color: 'var(--foreground)' }}>{investor.tel || '-'}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {investor.secteurs?.split(',').map((s, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        investor.statut === 'actif' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {investor.statut === 'actif' ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openInteractions(investor)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-purple-100"
                          title="Historique des interactions"
                        >
                          <Mail className="h-4 w-4 text-purple-600" />
                        </button>
                        <button
                          onClick={() => handleWhatsApp(investor)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-green-100"
                          title="Contacter sur WhatsApp"
                        >
                          <Send className="h-4 w-4 text-green-600" />
                        </button>
                        <button
                          onClick={() => openModal(investor)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-blue-100"
                        >
                          <Edit2 className="h-4 w-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(investor.id)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="rounded-xl w-full max-w-md" style={{ backgroundColor: 'var(--card)' }}>
            <div className="flex justify-between items-center p-5 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                {editingInvestor ? 'Modifier l\'investisseur' : 'Ajouter un investisseur'}
              </h2>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-gray-100/10">
                <X className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Nom complet
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
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={formData.tel}
                  onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Secteurs d'intérêt (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={formData.secteurs}
                  onChange={(e) => setFormData({ ...formData, secteurs: e.target.value })}
                  placeholder="FinTech, AgriTech, EdTech, ..."
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
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
                  {editingInvestor ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactions Modal */}
      {showInteractionModal && selectedInvestor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="rounded-xl w-full max-w-lg" style={{ backgroundColor: 'var(--card)' }}>
            <div className="flex justify-between items-center p-5 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                  Interactions avec {selectedInvestor.nom}
                </h2>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {selectedInvestor.email} | {selectedInvestor.tel}
                </p>
              </div>
              <button onClick={() => setShowInteractionModal(false)} className="p-1 rounded-lg hover:bg-gray-100/10">
                <X className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
              </button>
            </div>
            <div className="p-5">
              <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
                {interactions.length === 0 ? (
                  <p className="text-center py-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Aucune interaction enregistrée
                  </p>
                ) : (
                  interactions.map((interaction, idx) => (
                    <div key={idx} className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(139, 92, 246, 0.05)' }}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-medium" style={{ color: 'var(--primary)' }}>
                          {new Date(interaction.created_at).toLocaleString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--foreground)' }}>{interaction.note}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <textarea
                  value={interactionText}
                  onChange={(e) => setInteractionText(e.target.value)}
                  placeholder="Nouvelle interaction (email, appel, meeting...)"
                  rows={2}
                  className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                />
                <button
                  onClick={handleAddInteraction}
                  className="px-4 py-2 rounded-lg font-medium transition-colors"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}