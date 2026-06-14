// pages/BookDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Bookmark, Download, Eye, ExternalLink } from 'lucide-react';
import { useContent, useSettings } from '../hooks/usecontet';
import { libraryAPI } from '../services/client';

export default function BookDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getTheme } = useContent('library');
  const { setting } = useSettings();
  const theme = getTheme();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  const waGeneral = setting('whatsapp_general', '237678111022');
  
  // Helper pour l'URL des images
  const getFullImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const baseUrl = import.meta.env.VITE_API_URL || 'https://maleahub.vercel.app';
    return `${baseUrl}${url}`;
  };
  
  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      try {
        const res = await libraryAPI.getBySlug(slug);
        const data = res.data?.data;
        if (data) {
          setBook(data);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Erreur chargement livre:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      loadBook();
    }
  }, [slug]);
  
  const styles = {
    backgroundColor: theme?.backgroundColor || 'var(--background)',
    color: theme?.foregroundColor || 'var(--foreground)',
    fontFamily: theme?.fontBody || 'Inter',
  };
  
  if (loading) {
    return (
      <div className="pt-16 lg:pt-20 flex justify-center py-20" style={styles}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: theme?.primaryColor || 'var(--primary)' }}></div>
      </div>
    );
  }
  
  if (notFound || !book) {
    return (
      <div className="pt-16 lg:pt-20 py-20 text-center" style={styles}>
        <h1 className="text-2xl font-bold mb-4" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>
          Livre non trouvé
        </h1>
        <p style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
          Le livre que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <button
          onClick={() => navigate('/library')}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
        >
          <ArrowLeft className="h-4 w-4" /> Retour à la bibliothèque
        </button>
      </div>
    );
  }
  
  return (
    <div className="pt-16 lg:pt-20" style={styles}>
      {/* Hero */}
      <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 5%, transparent), transparent)` }} />
        
        {book.cover_image && (
          <div className="absolute inset-0 opacity-10 z-0">
            <img
              src={getFullImageUrl(book.cover_image)}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <button
            onClick={() => navigate('/library')}
            className="inline-flex items-center gap-2 text-sm mb-6 hover:gap-3 transition-all"
            style={{ color: theme?.primaryColor || 'var(--primary)' }}
          >
            <ArrowLeft className="h-4 w-4" /> Retour à la bibliothèque
          </button>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Couverture */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
              {book.cover_image ? (
                <img
                  src={getFullImageUrl(book.cover_image)}
                  alt={book.title}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/book-placeholder.jpg';
                  }}
                />
              ) : (
                <div className="aspect-[3/4] flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
                  <BookOpen className="h-16 w-16" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                </div>
              )}
            </div>
            
            {/* Informations */}
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
                {book.title}
              </h1>
              
              {book.author && (
                <p className="text-lg mb-4" style={{ color: theme?.primaryColor || 'var(--primary)' }}>
                  Par {book.author}
                </p>
              )}
              
              <div className="flex flex-wrap gap-4 mb-6">
                {book.category && (
                  <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`, color: theme?.primaryColor || 'var(--primary)' }}>
                    {book.category}
                  </span>
                )}
                {book.published_year && (
                  <span className="flex items-center gap-1 text-sm" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                    <Calendar className="h-4 w-4" /> {book.published_year}
                  </span>
                )}
                {book.pages && (
                  <span className="flex items-center gap-1 text-sm" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                    <BookOpen className="h-4 w-4" /> {book.pages} pages
                  </span>
                )}
                {book.isbn && (
                  <span className="flex items-center gap-1 text-sm" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                    <Bookmark className="h-4 w-4" /> ISBN: {book.isbn}
                  </span>
                )}
              </div>
              
              {book.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>
                    Description
                  </h2>
                  <p className="leading-relaxed whitespace-pre-wrap" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                    {book.description}
                  </p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4">
                {book.preview_url && (
                  <a
                    href={book.preview_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:gap-3"
                    style={{ backgroundColor: theme?.cardColor || 'var(--card)', border: `1px solid ${theme?.primaryColor || 'var(--primary)'}`, color: theme?.primaryColor || 'var(--primary)' }}
                  >
                    <Eye className="h-5 w-5" /> Aperçu
                  </a>
                )}
                {book.download_url && (
                  <a
                    href={book.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:gap-3"
                    style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
                  >
                    <Download className="h-5 w-5" /> Télécharger
                  </a>
                )}
                <a
                  href={`https://wa.me/${waGeneral}?text=${encodeURIComponent(`Bonjour, je souhaite plus d'informations sur le livre "${book.title}"`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:gap-3"
                  style={{ backgroundColor: '#25D366', color: '#FFFFFF' }}
                >
                  <ExternalLink className="h-5 w-5" /> Demander sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}