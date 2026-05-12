// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { CheckCircle, XCircle, Eye, Download, ArrowLeft, Send } from 'lucide-react';
// import { adminFormationsAPI } from '../../services/admin';

// const statusColors = {
//   en_attente: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'En attente' },
//   confirmee: { bg: 'bg-green-100', text: 'text-green-700', label: 'Confirmée' },   // ← sans accent
//   annulee: { bg: 'bg-red-100', text: 'text-red-700', label: 'Annulée' },            // ← sans accent
// };

// function StatusBadge({ status }) {
//   const style = statusColors[status] || statusColors.en_attente;
//   return (
//     <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
//       {style.label}
//     </span>
//   );
// }

// export default function Inscriptions() {
//   const [searchParams] = useSearchParams();
//   const formationId = searchParams.get('formation');
//   const [formation, setFormation] = useState(null);
//   const [inscriptions, setInscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedInscription, setSelectedInscription] = useState(null);

//   useEffect(() => {
//     if (formationId) {
//       fetchInscriptions();
//     }
//   }, [formationId]);

//   const fetchInscriptions = async () => {
//     setLoading(true);
//     try {
//       const [formationRes, inscriptionsRes] = await Promise.all([
//         adminFormationsAPI.getAll().then(res => 
//           res.data.data.find(f => f.id === formationId)
//         ),
//         adminFormationsAPI.getInscriptions(formationId),
//       ]);
//       setFormation(formationRes);
//       setInscriptions(inscriptionsRes.data.data || []);
//     } catch (error) {
//       console.error('Error fetching inscriptions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await adminFormationsAPI.updateInscription(id, { statut: newStatus });
//       fetchInscriptions();
//     } catch (error) {
//       console.error('Error updating inscription:', error);
//       alert('Erreur lors de la mise à jour');
//     }
//   };

//   const handleWhatsApp = (inscription) => {
//     const message = `Bonjour ${inscription.nom}, 
    
// Votre inscription à la formation "${formation?.titre}" a été ${inscription.statut === 'confirmée' ? 'confirmée' : 'mise à jour'}.

// Merci de votre confiance !
// Malea Hub`;
    
//     const url = `https://wa.me/${inscription.tel.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
//     window.open(url, '_blank');
//   };

//   const handleExport = async () => {
//     try {
//       const response = await adminFormationsAPI.exportInscriptions(formationId);
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `inscriptions-${formation?.titre}-${Date.now()}.csv`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error('Error exporting:', error);
//       alert('Erreur lors de l\'export');
//     }
//   };

//   if (!formationId) {
//     return (
//       <div className="text-center py-12">
//         <p style={{ color: 'var(--muted-foreground)' }}>
//           Sélectionnez une formation depuis la liste des formations
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="mb-6">
//         <button
//           onClick={() => window.history.back()}
//           className="flex items-center gap-2 text-sm mb-4 transition-colors hover:text-primary"
//           style={{ color: 'var(--muted-foreground)' }}
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Retour aux formations
//         </button>
//         <div className="flex flex-wrap justify-between items-start gap-4">
//           <div>
//             <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
//               Inscriptions: {formation?.titre}
//             </h1>
//             <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
//               {inscriptions.length} / {formation?.nb_places} places réservées
//             </p>
//           </div>
//           <button
//             onClick={handleExport}
//             className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//             style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//           >
//             <Download className="h-4 w-4" />
//             Exporter CSV
//           </button>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <div className="rounded-xl p-4 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//           <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
//             {inscriptions.filter(i => i.statut === 'confirmée').length}
//           </p>
//           <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Confirmées</p>
//         </div>
//         <div className="rounded-xl p-4 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//           <p className="text-2xl font-bold text-amber-600">
//             {inscriptions.filter(i => i.statut === 'en_attente').length}
//           </p>
//           <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>En attente</p>
//         </div>
//         <div className="rounded-xl p-4 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//           <p className="text-2xl font-bold text-green-600">
//             {formation?.nb_places - inscriptions.filter(i => i.statut === 'confirmée').length}
//           </p>
//           <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Places restantes</p>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr style={{ borderBottom: '1px solid var(--border)' }}>
//                 <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Nom</th>
//                 <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Email</th>
//                 <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Téléphone</th>
//                 <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Date</th>
//                 <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Statut</th>
//                 <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center p-8">
//                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
//                   </td>
//                 </tr>
//               ) : inscriptions.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center p-8" style={{ color: 'var(--muted-foreground)' }}>
//                     Aucune inscription pour cette formation
//                    </td>
//                 </tr>
//               ) : (
//                 inscriptions.map((insc) => (
//                   <tr key={insc.id} style={{ borderBottom: '1px solid var(--border)' }}>
//                     <td className="p-4">
//                       <p className="font-medium" style={{ color: 'var(--foreground)' }}>{insc.nom}</p>
//                     </td>
//                     <td className="p-4" style={{ color: 'var(--foreground)' }}>{insc.email}</td>
//                     <td className="p-4" style={{ color: 'var(--foreground)' }}>{insc.tel}</td>
//                     <td className="p-4" style={{ color: 'var(--muted-foreground)' }}>
//                       {new Date(insc.created_at).toLocaleDateString('fr-FR')}
//                     </td>
//                     <td className="p-4">
//                       <StatusBadge status={insc.statut} />
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         {insc.statut === 'en_attente' && (
//                           <>
//                             <button
//                               onClick={() => handleStatusChange(insc.id, 'confirmee')}
//                               className="p-1.5 rounded-lg transition-colors hover:bg-green-100"
//                               title="Confirmer"
//                             >
//                               <CheckCircle className="h-4 w-4 text-green-600" />
//                             </button>
//                             <button
//                               onClick={() => handleStatusChange(insc.id, 'annulee')}
//                               className="p-1.5 rounded-lg transition-colors hover:bg-red-100"
//                               title="Annuler"
//                             >
//                               <XCircle className="h-4 w-4 text-red-600" />
//                             </button>
//                           </>
//                         )}
//                         <button
//                           onClick={() => handleWhatsApp(insc)}
//                           className="p-1.5 rounded-lg transition-colors hover:bg-green-100"
//                           title="Contacter sur WhatsApp"
//                         >
//                           <Send className="h-4 w-4 text-green-600" />
//                         </button>
//                         <button
//                           onClick={() => setSelectedInscription(insc)}
//                           className="p-1.5 rounded-lg transition-colors hover:bg-gray-100/10"
//                           title="Voir détails"
//                         >
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
//       </div>

//       {/* Detail Modal */}
//       {selectedInscription && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//           <div className="rounded-xl w-full max-w-md" style={{ backgroundColor: 'var(--card)' }}>
//             <div className="flex justify-between items-center p-5 border-b" style={{ borderColor: 'var(--border)' }}>
//               <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
//                 Détails de l'inscription
//               </h2>
//               <button onClick={() => setSelectedInscription(null)} className="p-1 rounded-lg hover:bg-gray-100/10">
//                 <XCircle className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
//               </button>
//             </div>
//             <div className="p-5 space-y-3">
//               <div>
//                 <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Nom complet</p>
//                 <p className="font-medium" style={{ color: 'var(--foreground)' }}>{selectedInscription.nom}</p>
//               </div>
//               <div>
//                 <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Email</p>
//                 <p style={{ color: 'var(--foreground)' }}>{selectedInscription.email}</p>
//               </div>
//               <div>
//                 <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Téléphone</p>
//                 <p style={{ color: 'var(--foreground)' }}>{selectedInscription.tel}</p>
//               </div>
//               <div>
//                 <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Formation</p>
//                 <p style={{ color: 'var(--foreground)' }}>{formation?.titre}</p>
//               </div>
//               <div>
//                 <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Date d'inscription</p>
//                 <p style={{ color: 'var(--foreground)' }}>
//                   {new Date(selectedInscription.created_at).toLocaleString('fr-FR')}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Statut</p>
//                 <StatusBadge status={selectedInscription.statut} />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Eye, Download, ArrowLeft, Send } from 'lucide-react';
import { adminFormationsAPI } from '../../services/admin';

const statusColors = {
  en_attente: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'En attente' },
  confirmee: { bg: 'bg-green-100', text: 'text-green-700', label: 'Confirmée' },
  annulee: { bg: 'bg-red-100', text: 'text-red-700', label: 'Annulée' },
};

function StatusBadge({ status }) {
  const style = statusColors[status] || statusColors.en_attente;
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}

export default function Inscriptions() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const formationId = searchParams.get('formation');
  const [formation, setFormation] = useState(null);
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (formationId) {
      fetchInscriptions();
    }
  }, [formationId]);

  const fetchInscriptions = async () => {
    setLoading(true);
    try {
      // Récupérer toutes les formations pour trouver celle-ci
      const formationsRes = await adminFormationsAPI.getAll();
      const foundFormation = formationsRes.data.data.find(f => f.id === formationId);
      setFormation(foundFormation);

      // Récupérer les inscriptions pour cette formation
      const inscriptionsRes = await adminFormationsAPI.getInscriptions(formationId);
      setInscriptions(inscriptionsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching inscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await adminFormationsAPI.updateInscription(id, { statut: newStatus });
      fetchInscriptions();
    } catch (error) {
      console.error('Error updating inscription:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleWhatsApp = (inscription) => {
    const message = `Bonjour ${inscription.nom}, 
    
Votre inscription à la formation "${formation?.titre}" a été ${inscription.statut === 'confirmee' ? 'confirmée' : 'mise à jour'}.

Merci de votre confiance !
Malea Hub`;
    
    const url = `https://wa.me/${inscription.tel.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleExport = async () => {
    try {
      const response = await adminFormationsAPI.exportInscriptions(formationId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `inscriptions-${formation?.titre}-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting:', error);
      alert('Erreur lors de l\'export');
    }
  };

  // Calculer les statistiques correctement
  const confirmedCount = inscriptions.filter(i => i.statut === 'confirmee').length;
  const pendingCount = inscriptions.filter(i => i.statut === 'en_attente').length;
  const cancelledCount = inscriptions.filter(i => i.statut === 'annulee').length;
  const totalInscriptions = inscriptions.length;
  const remainingPlaces = (formation?.nb_places || 0) - confirmedCount;

  if (!formationId) {
    return (
      <div className="text-center py-12">
        <p style={{ color: 'var(--muted-foreground)' }}>
          Sélectionnez une formation depuis la liste des formations
        </p>
        <button
          onClick={() => navigate('/admin/formations')}
          className="mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          Retour aux formations
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/formations')}
          className="flex items-center gap-2 text-sm mb-4 transition-colors hover:text-primary"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux formations
        </button>
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
              Inscriptions: {formation?.titre}
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
              {totalInscriptions} / {formation?.nb_places || 0} inscriptions au total
            </p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            <Download className="h-4 w-4" />
            Exporter CSV
          </button>
        </div>
      </div>

      {/* Stats - CORRIGÉES */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <p className="text-2xl font-bold text-green-600">{confirmedCount}</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Confirmées</p>
        </div>
        <div className="rounded-xl p-4 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>En attente</p>
        </div>
        <div className="rounded-xl p-4 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <p className="text-2xl font-bold text-red-600">{cancelledCount}</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Annulées</p>
        </div>
        <div className="rounded-xl p-4 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <p className="text-2xl font-bold text-blue-600">{remainingPlaces}</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Places restantes</p>
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
                <th className="text-left p-4 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Date</th>
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
              ) : inscriptions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8" style={{ color: 'var(--muted-foreground)' }}>
                    Aucune inscription pour cette formation
                  </td>
                </tr>
              ) : (
                inscriptions.map((insc) => (
                  <tr key={insc.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="p-4">
                      <p className="font-medium" style={{ color: 'var(--foreground)' }}>{insc.nom}</p>
                    </td>
                    <td className="p-4" style={{ color: 'var(--foreground)' }}>{insc.email}</td>
                    <td className="p-4" style={{ color: 'var(--foreground)' }}>{insc.tel}</td>
                    <td className="p-4" style={{ color: 'var(--muted-foreground)' }}>
                      {new Date(insc.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={insc.statut} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {insc.statut === 'en_attente' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(insc.id, 'confirmee')}
                              className="p-1.5 rounded-lg transition-colors hover:bg-green-100"
                              title="Confirmer"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(insc.id, 'annulee')}
                              className="p-1.5 rounded-lg transition-colors hover:bg-red-100"
                              title="Annuler"
                            >
                              <XCircle className="h-4 w-4 text-red-600" />
                            </button>
                          </>
                        )}
                        {insc.statut === 'confirmee' && (
                          <button
                            onClick={() => handleStatusChange(insc.id, 'annulee')}
                            className="p-1.5 rounded-lg transition-colors hover:bg-red-100"
                            title="Annuler"
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </button>
                        )}
                        {insc.statut === 'annulee' && (
                          <button
                            onClick={() => handleStatusChange(insc.id, 'confirmee')}
                            className="p-1.5 rounded-lg transition-colors hover:bg-green-100"
                            title="Restaurer"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </button>
                        )}
                        <button
                          onClick={() => handleWhatsApp(insc)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-green-100"
                          title="Contacter sur WhatsApp"
                        >
                          <Send className="h-4 w-4 text-green-600" />
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
    </div>
  );
}