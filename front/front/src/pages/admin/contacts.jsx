// import React, { useState, useEffect } from 'react';
// import { Eye, CheckCircle, Archive, Trash2, Download, Send, XCircle } from 'lucide-react';
// import { adminContactsAPI } from '../../services/admin';

// const statusColors = {
//   nouveau: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Nouveau' },
//   traité: { bg: 'bg-green-100', text: 'text-green-700', label: 'Traité' },
//   archivé: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Archivé' },
// };

// function StatusBadge({ status }) {
//   const style = statusColors[status] || statusColors.nouveau;
//   return (
//     <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
//       {style.label}
//     </span>
//   );
// }

// export default function Contacts() {
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const response = await adminContactsAPI.getAll();
//       setContacts(response.data.data || []);
//     } catch (error) {
//       console.error('Error fetching contacts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await adminContactsAPI.update(id, { statut: newStatus });
//       fetchContacts();
//     } catch (error) {
//       console.error('Error updating contact:', error);
//       alert('Erreur lors de la mise à jour');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
//       try {
//         await adminContactsAPI.delete(id);
//         fetchContacts();
//       } catch (error) {
//         console.error('Error deleting contact:', error);
//         alert('Erreur lors de la suppression');
//       }
//     }
//   };

//   const handleExport = async () => {
//     try {
//       const response = await adminContactsAPI.export();
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `contacts-${Date.now()}.csv`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error('Error exporting:', error);
//       alert('Erreur lors de l\'export');
//     }
//   };

//   const handleReply = (contact) => {
//     const message = `Bonjour ${contact.nom},

// Nous accusons réception de votre message concernant "${contact.objet}".

// Nous vous répondrons dans les plus brefs délais.

// Cordialement,
// L'équipe Malea Hub`;
    
//     const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=Re: ${contact.objet}&body=${encodeURIComponent(message)}`;
//     window.open(url, '_blank');
//   };

//   const filteredContacts = contacts.filter(contact => {
//     if (!filter) return true;
//     return contact.statut === filter;
//   });

//   const stats = {
//     total: contacts.length,
//     nouveau: contacts.filter(c => c.statut === 'nouveau').length,
//     traité: contacts.filter(c => c.statut === 'traité').length,
//     archivé: contacts.filter(c => c.statut === 'archivé').length,
//   };

//   return (
//     <div>
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Messages de contact</h1>
//           <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
//             Centralisation des messages du formulaire de contact
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

//       {/* Stats */}
//       <div className="grid grid-cols-4 gap-4 mb-6">
//         <div 
//           className="rounded-xl p-4 text-center border cursor-pointer transition-all hover:shadow-lg"
//           style={{ backgroundColor: filter === '' ? 'var(--primary)' : 'var(--card)', borderColor: 'var(--border)', color: filter === '' ? 'white' : 'inherit' }}
//           onClick={() => setFilter('')}
//         >
//           <p className="text-2xl font-bold">{stats.total}</p>
//           <p className="text-xs">Total</p>
//         </div>
//         <div 
//           className="rounded-xl p-4 text-center border cursor-pointer transition-all hover:shadow-lg"
//           style={{ backgroundColor: filter === 'nouveau' ? '#3B82F6' : 'var(--card)', borderColor: 'var(--border)', color: filter === 'nouveau' ? 'white' : 'inherit' }}
//           onClick={() => setFilter('nouveau')}
//         >
//           <p className="text-2xl font-bold">{stats.nouveau}</p>
//           <p className="text-xs">Nouveaux</p>
//         </div>
//         <div 
//           className="rounded-xl p-4 text-center border cursor-pointer transition-all hover:shadow-lg"
//           style={{ backgroundColor: filter === 'traité' ? '#10B981' : 'var(--card)', borderColor: 'var(--border)', color: filter === 'traité' ? 'white' : 'inherit' }}
//           onClick={() => setFilter('traité')}
//         >
//           <p className="text-2xl font-bold">{stats.traité}</p>
//           <p className="text-xs">Traités</p>
//         </div>
//         <div 
//           className="rounded-xl p-4 text-center border cursor-pointer transition-all hover:shadow-lg"
//           style={{ backgroundColor: filter === 'archivé' ? '#6B7280' : 'var(--card)', borderColor: 'var(--border)', color: filter === 'archivé' ? 'white' : 'inherit' }}
//           onClick={() => setFilter('archivé')}
//         >
//           <p className="text-2xl font-bold">{stats.archivé}</p>
//           <p className="text-xs">Archivés</p>
//         </div>
//       </div>

//       {/* List */}
//       <div className="space-y-4">
//         {loading ? (
//           <div className="flex justify-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//           </div>
//         ) : filteredContacts.length === 0 ? (
//           <div className="text-center py-12 rounded-xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//             <p style={{ color: 'var(--muted-foreground)' }}>Aucun message trouvé</p>
//           </div>
//         ) : (
//           filteredContacts.map((contact) => (
//             <div
//               key={contact.id}
//               className="rounded-xl border p-5 transition-all hover:shadow-lg"
//               style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
//             >
//               <div className="flex flex-wrap justify-between items-start gap-4">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2 flex-wrap">
//                     <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
//                       {contact.nom}
//                     </h3>
//                     <StatusBadge status={contact.statut} />
//                     {contact.source && (
//                       <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
//                         Source: {contact.source}
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//                     Objet: {contact.objet}
//                   </p>
//                   <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
//                     {contact.message}
//                   </p>
//                   <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
//                     {new Date(contact.created_at).toLocaleString('fr-FR')}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setSelectedContact(contact)}
//                     className="p-2 rounded-lg transition-colors hover:bg-blue-100"
//                     title="Voir détails"
//                   >
//                     <Eye className="h-4 w-4 text-blue-600" />
//                   </button>
//                   <button
//                     onClick={() => handleReply(contact)}
//                     className="p-2 rounded-lg transition-colors hover:bg-green-100"
//                     title="Répondre par email"
//                   >
//                     <Send className="h-4 w-4 text-green-600" />
//                   </button>
//                   {contact.statut === 'nouveau' && (
//                     <button
//                       onClick={() => handleStatusChange(contact.id, 'traité')}
//                       className="p-2 rounded-lg transition-colors hover:bg-green-100"
//                       title="Marquer comme traité"
//                     >
//                       <CheckCircle className="h-4 w-4 text-green-600" />
//                     </button>
//                   )}
//                   {contact.statut !== 'archivé' && (
//                     <button
//                       onClick={() => handleStatusChange(contact.id, 'archivé')}
//                       className="p-2 rounded-lg transition-colors hover:bg-gray-100"
//                       title="Archiver"
//                     >
//                       <Archive className="h-4 w-4 text-gray-600" />
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDelete(contact.id)}
//                     className="p-2 rounded-lg transition-colors hover:bg-red-100"
//                     title="Supprimer"
//                   >
//                     <Trash2 className="h-4 w-4 text-red-600" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Detail Modal */}
//       {selectedContact && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//           <div className="rounded-xl w-full max-w-md" style={{ backgroundColor: 'var(--card)' }}>
//             <div className="flex justify-between items-center p-5 border-b" style={{ borderColor: 'var(--border)' }}>
//               <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
//                 Détails du message
//               </h2>
//               <button onClick={() => setSelectedContact(null)} className="p-1 rounded-lg hover:bg-gray-100/10">
//                 <XCircle className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
//               </button>
//             </div>
//             <div className="p-5 space-y-3">
//               <div>
//                 <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Expéditeur</p>
//                 <p className="font-medium" style={{ color: 'var(--foreground)' }}>{selectedContact.nom}</p>
//               </div>
//               <div>
//                 <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Email</p>
//                 <p style={{ color: 'var(--foreground)' }}>{selectedContact.email}</p>
//               </div>
//               <div>
//                 <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Objet</p>
//                 <p className="font-medium" style={{ color: 'var(--foreground)' }}>{selectedContact.objet}</p>
//               </div>
//               <div>
//                 <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Message</p>
//                 <div className="p-3 rounded-lg mt-1" style={{ backgroundColor: 'rgba(0,0,0,0.05)', color: 'var(--foreground)' }}>
//                   {selectedContact.message}
//                 </div>
//               </div>
//               {selectedContact.source && (
//                 <div>
//                   <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Source</p>
//                   <p style={{ color: 'var(--foreground)' }}>{selectedContact.source}</p>
//                 </div>
//               )}
//               <div>
//                 <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Date</p>
//                 <p style={{ color: 'var(--foreground)' }}>
//                   {new Date(selectedContact.created_at).toLocaleString('fr-FR')}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Statut</p>
//                 <StatusBadge status={selectedContact.statut} />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, Archive, Trash2, Download, Send, XCircle, RefreshCw } from 'lucide-react';
import { adminContactsAPI } from '../../services/admin';

const statusColors = {
  nouveau: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Nouveau' },
  traite: { bg: 'bg-green-100', text: 'text-green-700', label: 'Traité' },
  archive: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Archivé' },
};

function StatusBadge({ status }) {
  const style = statusColors[status] || statusColors.nouveau;
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await adminContactsAPI.getAll();
      setContacts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await adminContactsAPI.update(id, { statut: newStatus });
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      try {
        await adminContactsAPI.delete(id);
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleExport = async () => {
    try {
      const response = await adminContactsAPI.export();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `contacts-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting:', error);
      alert('Erreur lors de l\'export');
    }
  };

  const handleReply = (contact) => {
    const message = `Bonjour ${contact.nom},

Nous accusons réception de votre message concernant "${contact.objet}".

Nous vous répondrons dans les plus brefs délais.

Cordialement,
L'équipe Malea Hub`;
    
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=Re: ${contact.objet}&body=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const filteredContacts = contacts.filter(contact => {
    if (!filter) return true;
    return contact.statut === filter;
  });

  const stats = {
    total: contacts.length,
    nouveau: contacts.filter(c => c.statut === 'nouveau').length,
    traite: contacts.filter(c => c.statut === 'traite').length,
    archive: contacts.filter(c => c.statut === 'archive').length,
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Messages de contact</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Centralisation des messages du formulaire de contact
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchContacts}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
            style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
          >
            <RefreshCw className="h-4 w-4" />
            Rafraîchir
          </button>
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

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div 
          className="rounded-xl p-4 text-center border cursor-pointer transition-all hover:shadow-lg"
          style={{ backgroundColor: filter === '' ? 'var(--primary)' : 'var(--card)', borderColor: 'var(--border)', color: filter === '' ? 'white' : 'inherit' }}
          onClick={() => setFilter('')}
        >
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-xs">Total</p>
        </div>
        <div 
          className="rounded-xl p-4 text-center border cursor-pointer transition-all hover:shadow-lg"
          style={{ backgroundColor: filter === 'nouveau' ? '#3B82F6' : 'var(--card)', borderColor: 'var(--border)', color: filter === 'nouveau' ? 'white' : 'inherit' }}
          onClick={() => setFilter('nouveau')}
        >
          <p className="text-2xl font-bold">{stats.nouveau}</p>
          <p className="text-xs">Nouveaux</p>
        </div>
        <div 
          className="rounded-xl p-4 text-center border cursor-pointer transition-all hover:shadow-lg"
          style={{ backgroundColor: filter === 'traite' ? '#10B981' : 'var(--card)', borderColor: 'var(--border)', color: filter === 'traite' ? 'white' : 'inherit' }}
          onClick={() => setFilter('traite')}
        >
          <p className="text-2xl font-bold">{stats.traite}</p>
          <p className="text-xs">Traités</p>
        </div>
        <div 
          className="rounded-xl p-4 text-center border cursor-pointer transition-all hover:shadow-lg"
          style={{ backgroundColor: filter === 'archive' ? '#6B7280' : 'var(--card)', borderColor: 'var(--border)', color: filter === 'archive' ? 'white' : 'inherit' }}
          onClick={() => setFilter('archive')}
        >
          <p className="text-2xl font-bold">{stats.archive}</p>
          <p className="text-xs">Archivés</p>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-12 rounded-xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <p style={{ color: 'var(--muted-foreground)' }}>Aucun message trouvé</p>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="rounded-xl border p-5 transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
                      {contact.nom}
                    </h3>
                    <StatusBadge status={contact.statut} />
                    {contact.source && (
                      <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                        Source: {contact.source}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Objet: {contact.objet}
                  </p>
                  <p className="text-sm line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>
                    {contact.message}
                  </p>
                  <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
                    {new Date(contact.created_at).toLocaleString('fr-FR')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedContact(contact)}
                    className="p-2 rounded-lg transition-colors hover:bg-blue-100"
                    title="Voir détails"
                  >
                    <Eye className="h-4 w-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleReply(contact)}
                    className="p-2 rounded-lg transition-colors hover:bg-green-100"
                    title="Répondre par email"
                  >
                    <Send className="h-4 w-4 text-green-600" />
                  </button>
                  {contact.statut === 'nouveau' && (
                    <button
                      onClick={() => handleStatusChange(contact.id, 'traite')}
                      className="p-2 rounded-lg transition-colors hover:bg-green-100"
                      title="Marquer comme traité"
                    >
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </button>
                  )}
                  {contact.statut !== 'archive' && (
                    <button
                      onClick={() => handleStatusChange(contact.id, 'archive')}
                      className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                      title="Archiver"
                    >
                      <Archive className="h-4 w-4 text-gray-600" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="p-2 rounded-lg transition-colors hover:bg-red-100"
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="rounded-xl w-full max-w-md" style={{ backgroundColor: 'var(--card)' }}>
            <div className="flex justify-between items-center p-5 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                Détails du message
              </h2>
              <button onClick={() => setSelectedContact(null)} className="p-1 rounded-lg hover:bg-gray-100/10">
                <XCircle className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Expéditeur</p>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>{selectedContact.nom}</p>
              </div>
              <div>
                <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Email</p>
                <p style={{ color: 'var(--foreground)' }}>{selectedContact.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Objet</p>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>{selectedContact.objet}</p>
              </div>
              <div>
                <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Message</p>
                <div className="p-3 rounded-lg mt-1 whitespace-pre-wrap" style={{ backgroundColor: 'rgba(0,0,0,0.05)', color: 'var(--foreground)' }}>
                  {selectedContact.message}
                </div>
              </div>
              {selectedContact.source && (
                <div>
                  <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Source</p>
                  <p style={{ color: 'var(--foreground)' }}>{selectedContact.source}</p>
                </div>
              )}
              <div>
                <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Date</p>
                <p style={{ color: 'var(--foreground)' }}>
                  {new Date(selectedContact.created_at).toLocaleString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>Statut</p>
                <StatusBadge status={selectedContact.statut} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}