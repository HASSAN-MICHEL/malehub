import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { adminUsersAPI } from '../../services/admin';
import { useAdminAuth } from '../../contexts/adminContext';

const roleOptions = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'ADMIN', label: 'Admin' },
  { value: 'STAFF', label: 'Staff' },
  { value: 'MENTOR', label: 'Mentor' },
  { value: 'FORMATEUR', label: 'Formateur' },
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { user: currentUser } = useAdminAuth();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    role: 'STAFF',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminUsersAPI.getAll();
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        const updateData = {
          nom: formData.nom,
          role: formData.role,
        };
        if (formData.password) updateData.password = formData.password;
        await adminUsersAPI.update(editingUser.id, updateData);
      } else {
        await adminUsersAPI.create(formData);
      }
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error saving user:', error);
      alert(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (id === currentUser?.id) {
      alert('Vous ne pouvez pas supprimer votre propre compte');
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await adminUsersAPI.delete(id);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        nom: user.nom,
        email: user.email,
        password: '',
        role: user.role,
      });
    } else {
      setEditingUser(null);
      setFormData({
        nom: '',
        email: '',
        password: '',
        role: 'STAFF',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ nom: '', email: '', password: '', role: 'STAFF' });
  };

  const getRoleColor = (role) => {
    const colors = {
      SUPER_ADMIN: 'bg-purple-100 text-purple-700',
      ADMIN: 'bg-blue-100 text-blue-700',
      STAFF: 'bg-gray-100 text-gray-700',
      MENTOR: 'bg-green-100 text-green-700',
      FORMATEUR: 'bg-orange-100 text-orange-700',
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  const getRoleLabel = (role) => {
    return roleOptions.find(r => r.value === role)?.label || role;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Utilisateurs</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Gérer les comptes administrateurs, formateurs et mentors
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          <Plus className="h-4 w-4" />
          Ajouter un utilisateur
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Nom</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Email</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Rôle</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Statut</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Dernière connexion</th>
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
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8" style={{ color: 'var(--muted-foreground)' }}>
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="p-4">
                      <p className="font-medium" style={{ color: 'var(--foreground)' }}>{user.nom}</p>
                    </td>
                    <td className="p-4" style={{ color: 'var(--foreground)' }}>{user.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.actif ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.actif ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="p-4" style={{ color: 'var(--muted-foreground)' }}>
                      {user.last_login ? new Date(user.last_login).toLocaleDateString('fr-FR') : 'Jamais'}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal(user)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-blue-100"
                        >
                          <Edit2 className="h-4 w-4 text-blue-600" />
                        </button>
                        {user.id !== currentUser?.id && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-1.5 rounded-lg transition-colors hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="rounded-xl w-full max-w-md" style={{ backgroundColor: 'var(--card)' }}>
            <div className="flex justify-between items-center p-5 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                {editingUser ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}
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
                  disabled={!!editingUser}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  {editingUser ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe'}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  required={!editingUser}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Rôle
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  {roleOptions.map(opt => (
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
                  {editingUser ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}