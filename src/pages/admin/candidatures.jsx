import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, XCircle, Clock, Send, FileText, Plus } from 'lucide-react';
import { adminIncubatorAPI } from '../../services/admin';

const statusColors = {
  nouvelle: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Nouvelle', icon: Clock },
  evaluation: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'En évaluation', icon: FileText },
  acceptee: { bg: 'bg-green-100', text: 'text-green-700', label: 'Acceptée', icon: CheckCircle },   // ← sans accent
  refusee: { bg: 'bg-red-100', text: 'text-red-700', label: 'Refusée', icon: XCircle },             // ← sans accent
};


function StatusBadge({ status }) {
  const style = statusColors[status] || statusColors.nouvelle;
  const Icon = style.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <Icon className="h-3 w-3" />
      {style.label}
    </span>
  );
}

export default function Candidatures() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, nouvelles: 0, evaluation: 0, acceptees: 0, refuses: 0 });
  const [selectedCandidature, setSelectedCandidature] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [candidaturesRes, statsRes] = await Promise.all([
        adminIncubatorAPI.getCandidatures(),
        adminIncubatorAPI.getStats(),
      ]);
      setCandidatures(candidaturesRes.data.data || []);
      setStats(statsRes.data.data || {});
    } catch (error) {
      console.error('Error fetching candidatures:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await adminIncubatorAPI.updateCandidature(id, { statut: newStatus });
      fetchData();
    } catch (error) {
      console.error('Error updating candidature:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleAddNote = async (id) => {
    if (!noteText.trim()) return;
    try {
      await adminIncubatorAPI.addNote(id, noteText);
      setNoteText('');
      setShowNoteModal(false);
      fetchData();
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Erreur lors de l\'ajout de la note');
    }
  };

  const handleWhatsApp = (candidature) => {
    const message = `Bonjour ${candidature.nom},
    
Nous faisons suite à votre candidature pour l'incubateur Malea Hub.

Statut actuel: ${statusColors[candidature.statut]?.label || candidature.statut}

Pour toute information, n'hésitez pas à nous contacter.

Cordialement,
L'équipe Malea Hub`;
    
    const url = `https://wa.me/${candidature.tel.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Candidatures Incubateur</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Suivre et gérer les candidatures des porteurs de projets
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="rounded-xl p-4 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{stats.total || 0}</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Total</p>
        </div>
        <div className="rounded-xl p-4 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <p className="text-2xl font-bold text-blue-600">{stats.nouvelles || 0}</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Nouvelles</p>
        </div>
        <div className="rounded-xl p-4 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <p className="text-2xl font-bold text-amber-600">{stats.evaluation || 0}</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>En évaluation</p>
        </div>
        <div className="rounded-xl p-4 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <p className="text-2xl font-bold text-green-600">{stats.acceptees || 0}</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Acceptées</p>
        </div>
        <div className="rounded-xl p-4 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <p className="text-2xl font-bold text-red-600">{stats.refuses || 0}</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Refusées</p>
        </div>
      </div>

      {/* Liste */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : candidatures.length === 0 ? (
          <div className="text-center py-12 rounded-xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <p style={{ color: 'var(--muted-foreground)' }}>Aucune candidature reçue</p>
          </div>
        ) : (
          candidatures.map((cand) => (
            <div
              key={cand.id}
              className="rounded-xl border p-5 transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--foreground)' }}>
                      {cand.nom}
                    </h3>
                    <StatusBadge status={cand.statut} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Projet</span>
                      <p className="font-medium" style={{ color: 'var(--foreground)' }}>{cand.nom_projet}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Contact</span>
                      <p style={{ color: 'var(--foreground)' }}>{cand.email} | {cand.tel}</p>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>
                    {cand.description?.slice(0, 150)}...
                  </p>
                  {cand.notes && (
                    <div className="mt-2 p-2 rounded-lg bg-gray-100/10 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      📝 Note: {cand.notes}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCandidature(cand)}
                    className="p-2 rounded-lg transition-colors hover:bg-blue-100"
                    title="Voir détails"
                  >
                    <Eye className="h-4 w-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCandidature(cand);
                      setShowNoteModal(true);
                    }}
                    className="p-2 rounded-lg transition-colors hover:bg-purple-100"
                    title="Ajouter une note"
                  >
                    <Plus className="h-4 w-4 text-purple-600" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp(cand)}
                    className="p-2 rounded-lg transition-colors hover:bg-green-100"
                    title="Contacter sur WhatsApp"
                  >
                    <Send className="h-4 w-4 text-green-600" />
                  </button>
                  {cand.statut === 'nouvelle' && (
                    <button
                      onClick={() => handleStatusChange(cand.id, 'evaluation')}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                    >
                      Démarrer évaluation
                    </button>
                  )}
                  {cand.statut === 'evaluation' && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleStatusChange(cand.id, 'acceptee')}
                        className="px-2 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-700"
                      >
                        Accepter
                      </button>
                      <button
                        onClick={() => handleStatusChange(cand.id, 'refusee')}
                        className="px-2 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-700"
                      >
                        Refuser
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedCandidature && !showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--card)' }}>
            <div className="sticky top-0 flex justify-between items-center p-5 border-b" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                Détails de la candidature
              </h2>
              <button onClick={() => setSelectedCandidature(null)} className="p-1 rounded-lg hover:bg-gray-100/10">
                <XCircle className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Candidat</p>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>{selectedCandidature.nom}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Email</p>
                  <p style={{ color: 'var(--foreground)' }}>{selectedCandidature.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Téléphone</p>
                  <p style={{ color: 'var(--foreground)' }}>{selectedCandidature.tel}</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Nom du projet</p>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>{selectedCandidature.nom_projet}</p>
              </div>
              <div>
                <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Description</p>
                <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--foreground)' }}>
                  {selectedCandidature.description}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Statut</p>
                <StatusBadge status={selectedCandidature.statut} />
              </div>
              {selectedCandidature.notes && (
                <div>
                  <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Notes internes</p>
                  <div className="p-3 rounded-lg mt-1" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: 'var(--foreground)' }}>
                    {selectedCandidature.notes}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Date de candidature</p>
                <p style={{ color: 'var(--foreground)' }}>
                  {new Date(selectedCandidature.created_at).toLocaleString('fr-FR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {showNoteModal && selectedCandidature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="rounded-xl w-full max-w-md" style={{ backgroundColor: 'var(--card)' }}>
            <div className="flex justify-between items-center p-5 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                Ajouter une note
              </h2>
              <button onClick={() => {
                setShowNoteModal(false);
                setNoteText('');
              }} className="p-1 rounded-lg hover:bg-gray-100/10">
                <XCircle className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm mb-3" style={{ color: 'var(--muted-foreground)' }}>
                Candidat: <span className="font-medium" style={{ color: 'var(--foreground)' }}>{selectedCandidature.nom}</span>
              </p>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
                placeholder="Note interne (visible uniquement par les administrateurs)..."
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setShowNoteModal(false);
                    setNoteText('');
                  }}
                  className="flex-1 px-4 py-2 rounded-lg border transition-colors"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleAddNote(selectedCandidature.id)}
                  className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors"
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