import React, { useState, useEffect } from 'react';
import { Calendar, Users, GraduationCap, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { adminReservationsAPI, adminIncubatorAPI, adminFormationsAPI, adminInvestorsAPI } from '../../services/admin';

function StatsCard({ title, value, icon: Icon, color, trend }) {
  return (
    <div className="rounded-xl p-6 border transition-all hover:shadow-lg" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>{title}</p>
          <p className="text-2xl font-bold mt-1" style={{ color: 'var(--foreground)' }}>{value}</p>
          {trend && (
            <p className="text-xs mt-2 flex items-center gap-1 text-green-600">
              <TrendingUp className="h-3 w-3" />
              +{trend}%
            </p>
          )}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}10` }}>
          <Icon className="h-6 w-6" style={{ color }} />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    reservations: 0,
    candidatures: 0,
    inscriptions: 0,
    investors: 0,
    pendingReservations: 0,
    occupancyRate: 0,
    chartData: { months: [], reservations: [], inscriptions: [] }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [reservations, incubator, formations, investors] = await Promise.all([
        adminReservationsAPI.getAll({ limit: 1 }),
        adminIncubatorAPI.getStats(),
        adminFormationsAPI.getAll(),
        adminInvestorsAPI.getAll(),
      ]);

      const pendingRes = await adminReservationsAPI.getAll({ statut: 'en_attente', limit: 1 });
      
      setStats({
        reservations: reservations.data.data.length || 0,
        candidatures: incubator.data.data?.total || 0,
        inscriptions: formations.data.data?.inscriptions || 0,
        investors: investors.data.data?.length || 0,
        pendingReservations: pendingRes.data.data?.length || 0,
        occupancyRate: reservations.data.data?.occupancyRate || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Bienvenue dans l'interface d'administration de Malea Hub
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatsCard 
          title="Réservations du mois" 
          value={stats.reservations} 
          icon={Calendar} 
          color="#3B82F6"
          trend={12}
        />
        <StatsCard 
          title="Candidatures Incubateur" 
          value={stats.candidatures} 
          icon={Users} 
          color="#10B981"
          trend={8}
        />
        <StatsCard 
          title="Inscrits Formations" 
          value={stats.inscriptions} 
          icon={GraduationCap} 
          color="#8B5CF6"
          trend={5}
        />
        <StatsCard 
          title="Investisseurs Actifs" 
          value={stats.investors} 
          icon={DollarSign} 
          color="#F59E0B"
        />
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {stats.pendingReservations > 0 && (
          <div className="rounded-xl p-5 border-l-4" style={{ 
            backgroundColor: 'var(--card)', 
            borderColor: 'var(--warning)',
            borderLeftColor: '#F59E0B'
          }}>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-amber-500" />
              <div>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>
                  {stats.pendingReservations} réservation(s) en attente
                </p>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Veuillez les traiter rapidement
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>Taux d'occupation</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{stats.occupancyRate}%</p>
            </div>
            <div className="relative w-24 h-24">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3"
                  strokeDasharray={`${stats.occupancyRate}, 100`}
                />
                <text x="18" y="20.5" textAnchor="middle" fontSize="6" fill="var(--foreground)">{stats.occupancyRate}%</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity could be added here */}
      <div className="rounded-xl" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="p-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <h2 className="font-semibold" style={{ color: 'var(--foreground)' }}>Activité récente</h2>
        </div>
        <div className="p-5 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Chargement des activités...
        </div>
      </div>
    </div>
  );
}