// import React, { useState, useEffect } from 'react';
// import { Search, Filter, Eye, CheckCircle, XCircle, Download, ChevronLeft, ChevronRight } from 'lucide-react';
// import { adminReservationsAPI } from '../../services/admin';

// const statusColors = {
//   en_attente: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'En attente' },
//   confirmee: { bg: 'bg-green-100', text: 'text-green-700', label: 'Confirmée' },   // ← sans accent
//   annulee: { bg: 'bg-red-100', text: 'text-red-700', label: 'Annulée' },            // ← sans accent
//   terminee: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Terminée' },        // ← sans accent
// };


// function StatusBadge({ status }) {
//   const style = statusColors[status] || statusColors.en_attente;
//   return (
//     <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
//       {style.label}
//     </span>
//   );
// }

// function formatDate(date) {
//   return new Date(date).toLocaleDateString('fr-FR', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// }

// export default function Reservations() {
//   const [reservations, setReservations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [filters, setFilters] = useState({ statut: '', search: '' });
//   const limit = 10;

//   useEffect(() => {
//     fetchReservations();
//   }, [page, filters.statut]);

//   const fetchReservations = async () => {
//     setLoading(true);
//     try {
//       const response = await adminReservationsAPI.getAll({
//         page,
//         limit,
//         statut: filters.statut || undefined,
//       });
//       setReservations(response.data.data || []);
//       setTotal(response.data.pagination?.total || 0);
//     } catch (error) {
//       console.error('Error fetching reservations:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await adminReservationsAPI.update(id, { statut: newStatus });
//       fetchReservations();
//     } catch (error) {
//       console.error('Error updating reservation:', error);
//     }
//   };

//   const handleExport = async () => {
//     try {
//       const response = await adminReservationsAPI.exportCSV(filters);
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `reservations-${Date.now()}.csv`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error('Error exporting:', error);
//     }
//   };

//   const totalPages = Math.ceil(total / limit);

//   return (
//     <div>
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Réservations</h1>
//           <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
//             Gérer les réservations des salles et espaces
//           </p>
//         </div>
//         <button
//           onClick={handleExport}
//           className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//           style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//         >
//           <Download className="h-4 w-4" />
//           Exporter CSV
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="rounded-xl mb-6 p-4 border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//         <div className="flex flex-wrap gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--muted-foreground)' }} />
//               <input
//                 type="text"
//                 placeholder="Rechercher..."
//                 value={filters.search}
//                 onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//                 className="w-full pl-9 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
//                 style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//               />
//             </div>
//           </div>
//           <select
//             value={filters.statut}
//             onChange={(e) => setFilters({ ...filters, statut: e.target.value })}
//             className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
//             style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//           >
//             <option value="">Tous les statuts</option>
//             <option value="en_attente">En attente</option>
//             <option value="confirmée">Confirmée</option>
//             <option value="annulée">Annulée</option>
//             <option value="terminée">Terminée</option>
//           </select>
//           <button
//             onClick={() => setFilters({ statut: '', search: '' })}
//             className="px-4 py-2 rounded-lg border transition-colors hover:bg-gray-100/10"
//             style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
//           >
//             Réinitialiser
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr style={{ borderBottom: '1px solid var(--border)' }}>
//                 <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Client</th>
//                 <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Salle</th>
//                 <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Date début</th>
//                 <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Date fin</th>
//                 <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Montant</th>
//                 <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Statut</th>
//                 <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="7" className="text-center p-8">
//                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
//                   </td>
//                 </tr>
//               ) : reservations.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="text-center p-8" style={{ color: 'var(--muted-foreground)' }}>
//                     Aucune réservation trouvée
//                   </td>
//                 </tr>
//               ) : (
//                 reservations.map((res) => (
//                   <tr key={res.id} style={{ borderBottom: '1px solid var(--border)' }}>
//                     <td className="p-4">
//                       <div>
//                         <p className="font-medium" style={{ color: 'var(--foreground)' }}>{res.client_nom}</p>
//                         <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{res.client_tel}</p>
//                       </div>
//                     </td>
//                     <td className="p-4" style={{ color: 'var(--foreground)' }}>{res.salle_nom}</td>
//                     <td className="p-4" style={{ color: 'var(--foreground)' }}>{formatDate(res.date_debut)}</td>
//                     <td className="p-4" style={{ color: 'var(--foreground)' }}>{formatDate(res.date_fin)}</td>
//                     <td className="p-4 font-medium" style={{ color: 'var(--foreground)' }}>{res.montant?.toLocaleString()} FCFA</td>
//                     <td className="p-4">
//                       <StatusBadge status={res.statut} />
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         {res.statut === 'en_attente' && (
//                           <>
//                             <button
//                               onClick={() => handleStatusChange(res.id, 'confirmée')}
//                               className="p-1.5 rounded-lg transition-colors hover:bg-green-100"
//                               title="Confirmer"
//                             >
//                               <CheckCircle className="h-4 w-4 text-green-600" />
//                             </button>
//                             <button
//                               onClick={() => handleStatusChange(res.id, 'annulée')}
//                               className="p-1.5 rounded-lg transition-colors hover:bg-red-100"
//                               title="Annuler"
//                             >
//                               <XCircle className="h-4 w-4 text-red-600" />
//                             </button>
//                           </>
//                         )}
//                         <button className="p-1.5 rounded-lg transition-colors hover:bg-gray-100/10">
//                           <Eye className="h-4 w-4" style={{ color: 'var(--muted-foreground)' }} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-between p-4 border-t" style={{ borderColor: 'var(--border)' }}>
//             <button
//               onClick={() => setPage(p => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="p-2 rounded-lg transition-colors disabled:opacity-50 hover:bg-gray-100/10"
//             >
//               <ChevronLeft className="h-4 w-4" style={{ color: 'var(--muted-foreground)' }} />
//             </button>
//             <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
//               Page {page} sur {totalPages}
//             </span>
//             <button
//               onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="p-2 rounded-lg transition-colors disabled:opacity-50 hover:bg-gray-100/10"
//             >
//               <ChevronRight className="h-4 w-4" style={{ color: 'var(--muted-foreground)' }} />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Download, ChevronLeft, ChevronRight, Plus, X, Calendar, User, Phone, Home } from 'lucide-react';
import { adminReservationsAPI } from '../../services/admin';

const statusColors = {
  en_attente: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'En attente' },
  confirmee: { bg: 'bg-green-100', text: 'text-green-700', label: 'Confirmée' },
  annulee: { bg: 'bg-red-100', text: 'text-red-700', label: 'Annulée' },
  terminee: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Terminée' },
};

function StatusBadge({ status }) {
  const style = statusColors[status] || statusColors.en_attente;
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [salles, setSalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ statut: '', search: '' });
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const limit = 10;

  const [formData, setFormData] = useState({
    salle_id: '',
    client_nom: '',
    client_tel: '',
    date_debut: '',
    date_fin: '',
    montant: 0
  });

  useEffect(() => {
    fetchReservations();
    fetchSalles();
  }, [page, filters.statut]);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await adminReservationsAPI.getAll({
        page,
        limit,
        statut: filters.statut || undefined,
      });
      setReservations(response.data.data || []);
      setTotal(response.data.pagination?.total || 0);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalles = async () => {
    try {
      const response = await adminReservationsAPI.getSalles();
      setSalles(response.data.data?.salles || []);
    } catch (error) {
      console.error('Error fetching salles:', error);
    }
  };

  const calculatePrice = () => {
    if (!formData.salle_id || !formData.date_debut || !formData.date_fin) return 0;
    
    const salle = salles.find(s => s.id === formData.salle_id);
    if (!salle) return 0;
    
    const debut = new Date(formData.date_debut);
    const fin = new Date(formData.date_fin);
    const hours = Math.ceil((fin - debut) / (1000 * 60 * 60));
    
    const prices = {
      coworking: 3000,
      salle_reunion: 5000,
      salle_formation: 7500,
      lounge: 4000
    };
    const pricePerHour = prices[salle.type] || 5000;
    return hours * pricePerHour;
  };

  const handleCreateReservation = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const montant = calculatePrice();
      await adminReservationsAPI.createReservation({
        ...formData,
        montant
      });
      fetchReservations();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert(error.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      salle_id: '',
      client_nom: '',
      client_tel: '',
      date_debut: '',
      date_fin: '',
      montant: 0
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await adminReservationsAPI.update(id, { statut: newStatus });
      fetchReservations();
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await adminReservationsAPI.exportCSV(filters);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reservations-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting:', error);
    }
  };

  const totalPages = Math.ceil(total / limit);
  const estimatedPrice = calculatePrice();

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Réservations</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Gérer les réservations des salles et espaces
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            <Plus className="h-4 w-4" />
            Nouvelle réservation
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
            style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
          >
            <Download className="h-4 w-4" />
            Exporter CSV
          </button>
        </div>
      </div>

      {/* Filters - identique à votre code existant */}
      <div className="rounded-xl mb-6 p-4 border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--muted-foreground)' }} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-9 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              />
            </div>
          </div>
          <select
            value={filters.statut}
            onChange={(e) => setFilters({ ...filters, statut: e.target.value })}
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
            style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
          >
            <option value="">Tous les statuts</option>
            <option value="en_attente">En attente</option>
            <option value="confirmée">Confirmée</option>
            <option value="annulée">Annulée</option>
            <option value="terminée">Terminée</option>
          </select>
          <button
            onClick={() => setFilters({ statut: '', search: '' })}
            className="px-4 py-2 rounded-lg border transition-colors hover:bg-gray-100/10"
            style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
          >
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Table - votre code existant */}
      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Client</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Salle</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Date début</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Date fin</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Montant</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Statut</th>
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center p-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                  </td>
                </tr>
              ) : reservations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-8" style={{ color: 'var(--muted-foreground)' }}>
                    Aucune réservation trouvée
                  </td>
                </tr>
              ) : (
                reservations.map((res) => (
                  <tr key={res.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="p-4">
                      <div>
                        <p className="font-medium" style={{ color: 'var(--foreground)' }}>{res.client_nom}</p>
                        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{res.client_tel}</p>
                      </div>
                    </td>
                    <td className="p-4" style={{ color: 'var(--foreground)' }}>{res.salle_nom}</td>
                    <td className="p-4" style={{ color: 'var(--foreground)' }}>{formatDate(res.date_debut)}</td>
                    <td className="p-4" style={{ color: 'var(--foreground)' }}>{formatDate(res.date_fin)}</td>
                    <td className="p-4 font-medium" style={{ color: 'var(--foreground)' }}>{res.montant?.toLocaleString()} FCFA</td>
                    <td className="p-4">
                      <StatusBadge status={res.statut} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {res.statut === 'en_attente' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(res.id, 'confirmée')}
                              className="p-1.5 rounded-lg transition-colors hover:bg-green-100"
                              title="Confirmer"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(res.id, 'annulée')}
                              className="p-1.5 rounded-lg transition-colors hover:bg-red-100"
                              title="Annuler"
                            >
                              <XCircle className="h-4 w-4 text-red-600" />
                            </button>
                          </>
                        )}
                        <button className="p-1.5 rounded-lg transition-colors hover:bg-gray-100/10">
                          <Eye className="h-4 w-4" style={{ color: 'var(--muted-foreground)' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg transition-colors disabled:opacity-50 hover:bg-gray-100/10"
            >
              <ChevronLeft className="h-4 w-4" style={{ color: 'var(--muted-foreground)' }} />
            </button>
            <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Page {page} sur {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg transition-colors disabled:opacity-50 hover:bg-gray-100/10"
            >
              <ChevronRight className="h-4 w-4" style={{ color: 'var(--muted-foreground)' }} />
            </button>
          </div>
        )}
      </div>

      {/* Modal Nouvelle Réservation */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--card)' }}>
            <div className="sticky top-0 flex justify-between items-center p-5 border-b" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                Nouvelle réservation
              </h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="p-1 rounded-lg hover:bg-gray-100/10">
                <X className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
              </button>
            </div>
            
            <form onSubmit={handleCreateReservation} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  <Home className="h-4 w-4 inline mr-1" />
                  Salle / Espace *
                </label>
                <select
                  value={formData.salle_id}
                  onChange={(e) => setFormData({ ...formData, salle_id: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  required
                >
                  <option value="">Sélectionner une salle</option>
                  {salles.filter(s => s.statut === 'disponible').map(salle => (
                    <option key={salle.id} value={salle.id}>
                      {salle.nom} - {salle.capacite} places
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    <User className="h-4 w-4 inline mr-1" />
                    Nom du client *
                  </label>
                  <input
                    type="text"
                    value={formData.client_nom}
                    onChange={(e) => setFormData({ ...formData, client_nom: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    <Phone className="h-4 w-4 inline mr-1" />
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.client_tel}
                    onChange={(e) => setFormData({ ...formData, client_tel: e.target.value })}
                    placeholder="+237 6XX XXX XXX"
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Date et heure début *
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
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Date et heure fin *
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.date_fin}
                    onChange={(e) => setFormData({ ...formData, date_fin: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    required
                  />
                </div>
              </div>
              
              {estimatedPrice > 0 && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium" style={{ color: 'var(--foreground)' }}>Montant estimé :</span>
                    <span className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                      {estimatedPrice.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="flex-1 px-4 py-2 rounded-lg border transition-colors"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  {submitting ? 'Création...' : 'Créer la réservation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}