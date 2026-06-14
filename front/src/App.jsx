

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { AdminAuthProvider } from './contexts/adminContext';
import HomePage from './pages/HomePage';
import CoworkingPage from './pages/CoworkingPage';
import IncubatorPage from './pages/IncubatorPage';
import TrainingPage from './pages/TrainingPage';
import LoungePage from './pages/LoungePage';
import LibraryPage from './pages/LibraryPage';
import BookDetailPage from './pages/BookDetails';
import ContactPage from './pages/ContactPage';
import  EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetaills';

// coté admin
import AdminLayout from './pages/admin/adminLayout';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Reservations from './pages/admin/reservationne';
import Salles from './pages/admin/salles';
import Users from './pages/admin/user';
import Formations from './pages/admin/formations';
import Inscriptions from './pages/admin/Inscription';
import Candidatures from './pages/admin/candidatures';
import LibraryManager from './pages/admin/Library';
import Investors from './pages/admin/Investor';
import Contacts from './pages/admin/contacts';
import ContentManager from './pages/admin/contentManager';
import ProtectedRoute from './components/ProtectedRout';

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          {/* Routes admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="salles" element={<Salles />} />
            <Route path="users" element={<Users />} />
            <Route path="formations" element={<Formations />} />
            <Route path="inscriptions" element={<Inscriptions />} />
            <Route path="candidatures" element={<Candidatures />} />
            <Route path="investors" element={<Investors />} />   
            <Route path="library" element={<LibraryManager />} />    
            <Route path="contacts" element={<Contacts />} />
            <Route path="content" element={<ContentManager />} />
          </Route>

          {/* Routes client */}
          <Route path="/*" element={
            <>
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/coworking" element={<CoworkingPage />} />
                  <Route path="/incubator" element={<IncubatorPage />} />
                  <Route path="/training" element={<TrainingPage />} />
                  <Route path="/lounge" element={<LoungePage />} />
                  <Route path="/library" element={<LibraryPage />} />
                  <Route path="/library/:slug" element={<BookDetailPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/events" element={< EventsPage />} />
                  <Route path="/events/:slug" element={<EventDetailPage />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppButton />
            </>
          } />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
