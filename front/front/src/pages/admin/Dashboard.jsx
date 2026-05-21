// import React, { useState, useEffect } from 'react';
// import { Calendar, Users, GraduationCap, DollarSign, TrendingUp, Clock } from 'lucide-react';
// import { adminReservationsAPI, adminIncubatorAPI, adminFormationsAPI, adminInvestorsAPI } from '../../services/admin';

// function StatsCard({ title, value, icon: Icon, color, trend }) {
//   return (
//     <div className="rounded-xl p-6 border transition-all hover:shadow-lg" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>{title}</p>
//           <p className="text-2xl font-bold mt-1" style={{ color: 'var(--foreground)' }}>{value}</p>
//           {trend && (
//             <p className="text-xs mt-2 flex items-center gap-1 text-green-600">
//               <TrendingUp className="h-3 w-3" />
//               +{trend}%
//             </p>
//           )}
//         </div>
//         <div className="p-3 rounded-full" style={{ backgroundColor: `${color}10` }}>
//           <Icon className="h-6 w-6" style={{ color }} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     reservations: 0,
//     candidatures: 0,
//     inscriptions: 0,
//     investors: 0,
//     pendingReservations: 0,
//     occupancyRate: 0,
//     chartData: { months: [], reservations: [], inscriptions: [] }
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const [reservations, incubator, formations, investors] = await Promise.all([
//         adminReservationsAPI.getAll({ limit: 1 }),
//         adminIncubatorAPI.getStats(),
//         adminFormationsAPI.getAll(),
//         adminInvestorsAPI.getAll(),
//       ]);

//       const pendingRes = await adminReservationsAPI.getAll({ statut: 'en_attente', limit: 1 });
      
//       setStats({
//         reservations: reservations.data.data.length || 0,
//         candidatures: incubator.data.data?.total || 0,
//         inscriptions: formations.data.data?.inscriptions || 0,
//         investors: investors.data.data?.length || 0,
//         pendingReservations: pendingRes.data.data?.length || 0,
//         occupancyRate: reservations.data.data?.occupancyRate || 0,
//       });
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Dashboard</h1>
//         <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
//           Bienvenue dans l'interface d'administration de Malea Hub
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//         <StatsCard 
//           title="Réservations du mois" 
//           value={stats.reservations} 
//           icon={Calendar} 
//           color="#3B82F6"
//           trend={12}
//         />
//         <StatsCard 
//           title="Candidatures Incubateur" 
//           value={stats.candidatures} 
//           icon={Users} 
//           color="#10B981"
//           trend={8}
//         />
//         <StatsCard 
//           title="Inscrits Formations" 
//           value={stats.inscriptions} 
//           icon={GraduationCap} 
//           color="#8B5CF6"
//           trend={5}
//         />
//         <StatsCard 
//           title="Investisseurs Actifs" 
//           value={stats.investors} 
//           icon={DollarSign} 
//           color="#F59E0B"
//         />
//       </div>

//       {/* Alert Cards */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
//         {stats.pendingReservations > 0 && (
//           <div className="rounded-xl p-5 border-l-4" style={{ 
//             backgroundColor: 'var(--card)', 
//             borderColor: 'var(--warning)',
//             borderLeftColor: '#F59E0B'
//           }}>
//             <div className="flex items-center gap-3">
//               <Clock className="h-5 w-5 text-amber-500" />
//               <div>
//                 <p className="font-medium" style={{ color: 'var(--foreground)' }}>
//                   {stats.pendingReservations} réservation(s) en attente
//                 </p>
//                 <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
//                   Veuillez les traiter rapidement
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>Taux d'occupation</p>
//               <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{stats.occupancyRate}%</p>
//             </div>
//             <div className="relative w-24 h-24">
//               <svg className="w-full h-full" viewBox="0 0 36 36">
//                 <path
//                   d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                   fill="none"
//                   stroke="#E5E7EB"
//                   strokeWidth="3"
//                 />
//                 <path
//                   d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                   fill="none"
//                   stroke="var(--primary)"
//                   strokeWidth="3"
//                   strokeDasharray={`${stats.occupancyRate}, 100`}
//                 />
//                 <text x="18" y="20.5" textAnchor="middle" fontSize="6" fill="var(--foreground)">{stats.occupancyRate}%</text>
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent activity could be added here */}
//       <div className="rounded-xl" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
//         <div className="p-5 border-b" style={{ borderColor: 'var(--border)' }}>
//           <h2 className="font-semibold" style={{ color: 'var(--foreground)' }}>Activité récente</h2>
//         </div>
//         <div className="p-5 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
//           Chargement des activités...
//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, Users, GraduationCap, DollarSign,
  TrendingUp, Clock, Mail, ArrowRight,
} from 'lucide-react';
import {
  adminDashboardAPI,
  adminReservationsAPI,
  adminIncubatorAPI,
  adminFormationsAPI,
  adminInvestorsAPI,
  adminContactsAPI,
} from '../../services/admin';

//Stat card 
function StatsCard({ title, value, icon: Icon, color, trend, to }) {
  const card = (
    <div className="rounded-xl p-6 border transition-all hover:shadow-lg"
      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>{title}</p>
          <p className="text-3xl font-bold mt-1" style={{ color: 'var(--foreground)' }}>{value}</p>
          {trend != null && (
            <p className="text-xs mt-2 flex items-center gap-1 text-green-500">
              <TrendingUp className="h-3 w-3" /> +{trend}% ce mois
            </p>
          )}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}18` }}>
          <Icon className="h-6 w-6" style={{ color }} />
        </div>
      </div>
    </div>
  );
  return to ? <Link to={to}>{card}</Link> : card;
}

//Main 
export default function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { loadKpis(); }, []);

  const loadKpis = async () => {
    setLoading(true);
    setError(null);
    try {
      // Strategy 1 — use the dedicated /system/dashboard endpoint 
      const res = await adminDashboardAPI.getKPIs();
      // Response: { data: { reservations:{total,en_attente}, candidatures:{total,nouvelles},
      //             inscriptions:{total}, investors:{total}, contacts:{total} } }
      const d = res.data?.data ?? res.data ?? {};
      setKpis({
        reservations:        Number(d.reservations?.total ?? 0),
        reservations_attente:Number(d.reservations?.en_attente ?? 0),
        candidatures:        Number(d.candidatures?.total ?? 0),
        candidatures_nouvelles:Number(d.candidatures?.nouvelles ?? 0),
        inscriptions:        Number(d.inscriptions?.total ?? 0),
        investors:           Number(d.investors?.total ?? 0),
        contacts_nouveaux:   Number(d.contacts?.total ?? 0),
      });
    } catch (dashErr) {
      // Strategy 2 — fallback: call individual endpoints
      console.warn('Dashboard KPI endpoint failed, falling back:', dashErr.message);
      try {
        const [res, cand, form, inv, contacts] = await Promise.allSettled([
          adminReservationsAPI.getAll({ limit: 1 }),
          adminIncubatorAPI.getStats(),
          adminFormationsAPI.getAll({ limit: 1 }),
          adminInvestorsAPI.getAll({ limit: 1 }),
          adminContactsAPI.getAll({ statut: 'nouveau', limit: 1 }),
        ]);

        // Safe reading
        const safeTotal = (r) => {
          if (r.status !== 'fulfilled') return 0;
          const d = r.value?.data;
          return Number(
            d?.pagination?.total ??
            d?.data?.total ??
            d?.total ??
            (Array.isArray(d?.data) ? d.data.length : 0) ??
            0
          );
        };
        const candTotal = cand.status === 'fulfilled'
          ? Number(cand.value?.data?.data?.total ?? cand.value?.data?.total ?? 0)
          : 0;

        setKpis({
          reservations:        safeTotal(res),
          reservations_attente: 0,
          candidatures:        candTotal,
          candidatures_nouvelles: 0,
          inscriptions:        0,
          investors:           safeTotal(inv),
          contacts_nouveaux:   safeTotal(contacts),
        });
      } catch (fbErr) {
        setError('Impossible de charger les statistiques.');
        console.error(fbErr);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );

  if (error) return (
    <div className="text-center py-12">
      <p className="text-red-500 mb-4">{error}</p>
      <button onClick={loadKpis} className="px-4 py-2 rounded-lg text-sm font-medium"
        style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
        Réessayer
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Bienvenue dans l'interface d'administration de Malea Hub
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Réservations (mois)"
          value={kpis.reservations}
          icon={Calendar} color="#3B82F6"
          to="/admin/reservations"
        />
        <StatsCard
          title="Candidatures Incubateur"
          value={kpis.candidatures}
          icon={Users} color="#10B981"
          to="/admin/candidatures"
        />
        <StatsCard
          title="Inscrits Formations"
          value={kpis.inscriptions}
          icon={GraduationCap} color="#8B5CF6"
          to="/admin/formations"
        />
        <StatsCard
          title="Investisseurs Actifs"
          value={kpis.investors}
          icon={DollarSign} color="#F59E0B"
          to="/admin/investors"
        />
      </div>

      {/* Alerts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Reservations en attente */}
        {kpis.reservations_attente > 0 && (
          <Link to="/admin/reservations?statut=en_attente">
            <div className="rounded-xl p-5 border-l-4 cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--card)', borderLeftColor: '#F59E0B' }}>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold" style={{ color: 'var(--foreground)' }}>
                    {kpis.reservations_attente} réservation(s) en attente
                  </p>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    À confirmer rapidement
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Candidatures nouvelles */}
        {kpis.candidatures_nouvelles > 0 && (
          <Link to="/admin/candidatures?statut=nouvelle">
            <div className="rounded-xl p-5 border-l-4 cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--card)', borderLeftColor: '#10B981' }}>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold" style={{ color: 'var(--foreground)' }}>
                    {kpis.candidatures_nouvelles} nouvelle(s) candidature(s)
                  </p>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    En attente d'évaluation
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Messages non traités */}
        {kpis.contacts_nouveaux > 0 && (
          <Link to="/admin/contacts?statut=nouveau">
            <div className="rounded-xl p-5 border-l-4 cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--card)', borderLeftColor: '#3B82F6' }}>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold" style={{ color: 'var(--foreground)' }}>
                    {kpis.contacts_nouveaux} message(s) non traité(s)
                  </p>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Nouveaux contacts reçus
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Quick actions */}
      <div className="rounded-xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="p-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <h2 className="font-semibold" style={{ color: 'var(--foreground)' }}>Accès rapide</h2>
        </div>
        <div className="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Nouvelle réservation',  to: '/admin/reservations', color: '#3B82F6' },
            { label: 'Candidatures',           to: '/admin/candidatures', color: '#10B981' },
            { label: 'Formations',             to: '/admin/formations',   color: '#8B5CF6' },
            { label: 'Investisseurs',          to: '/admin/investors',    color: '#F59E0B' },
            { label: 'Gérer le contenu',       to: '/admin/content',      color: '#C9A962' },
          ].map((item) => (
            <Link key={item.to} to={item.to}
              className="flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-all hover:opacity-80"
              style={{ borderColor: `${item.color}30`, color: item.color, backgroundColor: `${item.color}08` }}>
              {item.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}