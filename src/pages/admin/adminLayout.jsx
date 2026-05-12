import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  GraduationCap, 
  Rocket, 
  DollarSign, 
  Mail, 
  Settings,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminContext';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'Réservations', icon: Calendar, path: '/admin/reservations' },
  { name: 'Salles', icon: Calendar, path: '/admin/salles' },
  { name: 'Utilisateurs', icon: Users, path: '/admin/users', roles: ['SUPER_ADMIN', 'ADMIN'] },
  { name: 'Formations', icon: GraduationCap, path: '/admin/formations' },
  { name: 'Incubateur', icon: Rocket, path: '/admin/candidatures' },
  { name: 'Investisseurs', icon: DollarSign, path: '/admin/investors' },
  { name: 'Contacts', icon: Mail, path: '/admin/contacts' },
  { name: 'Contenu', icon: Settings, path: '/admin/content' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, hasPermission } = useAdminAuth();
  const location = useLocation();

  const filteredMenu = menuItems.filter(item => {
    if (!item.roles) return true;
    return hasPermission(item.roles);
  });

  return (
    <div className="min-h-screen bg-gray-50" style={{ backgroundColor: 'var(--background)' }}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `} style={{ backgroundColor: 'var(--card)', borderRight: '1px solid var(--border)' }}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <Link to="/admin" className="flex items-center gap-2">
              <span className="text-xl font-bold">
                <span style={{ color: 'var(--primary)' }}>Malea</span>
                <span style={{ color: 'var(--foreground)' }}> Admin</span>
              </span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {filteredMenu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-gray-100/10'
                    }
                  `}
                  style={{ color: isActive ? 'var(--primary)' : 'var(--muted-foreground)' }}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="border-t p-4" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  {user?.nom}
                </p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {user?.role}
                </p>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg transition-colors hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 border-b" style={{ 
          backgroundColor: 'var(--background)', 
          borderColor: 'var(--border)' 
        }}>
          <div className="flex h-full items-center justify-between px-4 lg:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100/10"
            >
              <Menu className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                {new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}