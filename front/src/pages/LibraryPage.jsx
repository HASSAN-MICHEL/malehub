


// import { useTranslation } from 'react-i18next';
// import { BookOpen, ArrowRight, Coffee, Users, Briefcase, Image } from 'lucide-react';

// export default function LibraryPage() {
//   const { t } = useTranslation();

//   const galleryImages = [
//     { src: '/malesalon.jpeg', alt: 'Espace salon', icon: Coffee, label: 'Espace Salon' },
//     { src: '/maleSalonthe.jpeg', alt: 'Coin café', icon: Coffee, label: 'Coin Café' },
//     { src: '/maletravail.jpeg', alt: 'Espace travail', icon: Briefcase, label: 'Espace Travail' },
    
    
//   ];

//   return (
//     <div className="pt-16 lg:pt-20">
//       {/* Hero Section */}
//       <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="max-w-3xl mx-auto text-center">
//             <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//               <BookOpen className="h-10 w-10" style={{ color: 'var(--primary)' }} />
//             </div>
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//               style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//               {t('library.badge')}
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//               {t('library.title_prefix')}{' '}
//               <span style={{ color: 'var(--primary)' }}>{t('library.title_highlight')}</span>
//             </h1>
//             <p className="mt-6 text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
//               {t('library.description')}
//             </p>
//             <div className="mt-8 p-8 rounded-2xl border" style={{ backgroundColor: 'color-mix(in oklch, var(--background) 50%, transparent)', borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }}>
//               <p className="font-medium mb-4" style={{ color: 'var(--foreground)' }}>{t('library.coming_soon')}</p>
//               <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>{t('library.notify_text')}</p>
//               <a href="https://wa.me/237678111022?text=Bonjour, je souhaite être informé du lancement de la bibliothèque sociale"
//                 target="_blank" rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
//                 style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//                 {t('library.notify_button')} <ArrowRight className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Galerie des espaces Malea Hub */}
//       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-12">
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
//               {t('library.gallery_title')}
//             </h2>
//             <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
//               {t('library.gallery_subtitle')}
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {galleryImages.map((image, index) => {
//               const Icon = image.icon;
//               return (
//                 <div
//                   key={index}
//                   className="group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl"
//                   style={{
//                     backgroundColor: 'var(--card)',
//                     borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)'
//                   }}
//                   onMouseEnter={e => e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--primary) 40%, transparent)'}
//                   onMouseLeave={e => e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--border) 50%, transparent)'}
//                 >
//                   <div className="aspect-square overflow-hidden">
//                     <img
//                       src={image.src}
//                       alt={image.alt}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                   </div>
//                   <div className="absolute inset-0 flex items-end p-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
//                     <div className="flex items-center gap-2">
//                       <div className="p-1.5 rounded-full" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 80%, transparent)' }}>
//                         <Icon className="h-3 w-3 text-white" />
//                       </div>
//                       <span className="text-white font-medium text-sm">{image.label}</span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Section ressources à venir */}
//       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="max-w-4xl mx-auto text-center">
//             <div className="grid md:grid-cols-3 gap-8">
//               <div className="p-6 rounded-xl border transition-all hover:shadow-md" style={{ borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                 <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                   <BookOpen className="h-6 w-6" style={{ color: 'var(--primary)' }} />
//                 </div>
//                 <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{t('library.resources.books')}</h3>
//                 <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t('library.resources.books_desc')}</p>
//               </div>
//               <div className="p-6 rounded-xl border transition-all hover:shadow-md" style={{ borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                 <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                   <Users className="h-6 w-6" style={{ color: 'var(--primary)' }} />
//                 </div>
//                 <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{t('library.resources.community')}</h3>
//                 <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t('library.resources.community_desc')}</p>
//               </div>
//               <div className="p-6 rounded-xl border transition-all hover:shadow-md" style={{ borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                 <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                   <Briefcase className="h-6 w-6" style={{ color: 'var(--primary)' }} />
//                 </div>
//                 <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{t('library.resources.tools')}</h3>
//                 <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t('library.resources.tools_desc')}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }






// pages/LibraryPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Coffee, Users, Briefcase, Image } from 'lucide-react';
import { useContent, useSettings } from '../hooks/usecontet';
import { libraryAPI } from '../services/client';

export default function LibraryPage() {
  const { get, getJSON, getTheme } = useContent('library');
  const { setting } = useSettings();
  const theme = getTheme();
  
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Valeurs depuis le CMS
  const heroBadge = get('hero_badge', 'Bibliothèque Sociale');
  const heroTitlePrefix = get('hero_title_prefix', 'Notre');
  const heroTitleHighlight = get('hero_title_highlight', 'Bibliothèque');
  const heroTitleSuffix = get('hero_title_suffix', 'Sociale');
  const heroDescription = get('hero_description', 'Une collection de ressources pour vous aider à grandir');
  
  const comingSoonTitle = get('coming_soon_title', 'Bientôt disponible');
  const comingSoonText = get('coming_soon_text', 'Notre bibliothèque sociale ouvrira bientôt ses portes avec une collection unique de ressources.');
  const comingSoonButton = get('coming_soon_button', 'Être informé');
  const comingSoonMessage = get('coming_soon_message', 'Bonjour, je souhaite être informé du lancement de la bibliothèque sociale');
  
  const galleryTitle = get('gallery_title', 'Nos espaces');
  const gallerySubtitle = get('gallery_subtitle', 'Découvrez les espaces Malea Hub');
  const galleryImages = getJSON('gallery_images', [
    { src: '/malesalon.jpeg', alt: 'Espace salon', icon: 'Coffee', label: 'Espace Salon' },
    { src: '/maleSalonthe.jpeg', alt: 'Coin café', icon: 'Coffee', label: 'Coin Café' },
    { src: '/maletravail.jpeg', alt: 'Espace travail', icon: 'Briefcase', label: 'Espace Travail' },
  ]);
  
  const resourcesTitle = get('resources_title', 'Ressources à venir');
  const resourcesItems = getJSON('resources_items', [
    { title: 'Livres & E-books', description: 'Accédez à notre bibliothèque numérique', icon: 'BookOpen' },
    { title: 'Communauté', description: 'Échangez avec d\'autres passionnés', icon: 'Users' },
    { title: 'Outils & Templates', description: 'Des ressources pratiques pour vos projets', icon: 'Briefcase' },
  ]);
  
  const booksTitle = get('books_title', 'Nos livres disponibles');
  const booksSubtitle = get('books_subtitle', 'Une sélection de livres pour vous inspirer');
  const booksCta = get('books_cta', 'En savoir plus');
  
  const waGeneral = setting('whatsapp_general', '237678111022');
  
  // Helper pour l'URL des images
  const getFullImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const baseUrl = import.meta.env.VITE_API_URL || '/api';
    return `${baseUrl}${url}`;
  };
  
  // Chargement des livres
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [booksRes, categoriesRes] = await Promise.all([
          libraryAPI.getAll(),
          libraryAPI.getCategories()
        ]);
        setBooks(booksRes.data?.data || []);
        setCategories(categoriesRes.data?.data || []);
      } catch (error) {
        console.error('Erreur chargement bibliothèque:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  // Map des icônes
  const iconMap = {
    Coffee: Coffee,
    Briefcase: Briefcase,
    Users: Users,
    BookOpen: BookOpen,
    Image: Image,
  };
  
  // Filtrer les livres par catégorie
  const filteredBooks = selectedCategory === 'all' 
    ? books 
    : books.filter(book => book.category === selectedCategory);
  
  // Styles avec le thème personnalisé
  const styles = {
    backgroundColor: theme?.backgroundColor || 'var(--background)',
    color: theme?.foregroundColor || 'var(--foreground)',
    fontFamily: theme?.fontBody || 'Inter',
  };
  
  return (
    <div className="pt-16 lg:pt-20" style={styles}>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 5%, transparent), transparent)` }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
              <BookOpen className="h-10 w-10" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
              style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`, backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`, color: theme?.primaryColor || 'var(--primary)' }}>
              {heroBadge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {heroTitlePrefix}{' '}
              <span style={{ color: theme?.primaryColor || 'var(--primary)' }}>{heroTitleHighlight}</span>{' '}
              {heroTitleSuffix}
            </h1>
            <p className="mt-6 text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {heroDescription}
            </p>
            <div className="mt-8 p-8 rounded-2xl border" style={{ backgroundColor: `color-mix(in oklch, ${theme?.backgroundColor || 'var(--background)'} 50%, transparent)`, borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 20%, transparent)` }}>
              <p className="font-medium mb-4" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{comingSoonTitle}</p>
              <p className="text-sm mb-6" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{comingSoonText}</p>
              <a href={`https://wa.me/${waGeneral}?text=${encodeURIComponent(comingSoonMessage)}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}>
                {comingSoonButton} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section Livres disponibles */}
      {books.length > 0 && (
        <section className="py-16 lg:py-24" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
                {booksTitle}
              </h2>
              <p className="text-lg" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                {booksSubtitle}
              </p>
            </div>
            
            {/* Filtres par catégorie */}
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === 'all' ? 'text-white' : ''
                  }`}
                  style={{
                    backgroundColor: selectedCategory === 'all' ? theme?.primaryColor || 'var(--primary)' : `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`,
                    color: selectedCategory === 'all' ? '#FFFFFF' : theme?.primaryColor || 'var(--primary)'
                  }}
                >
                  Tous
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat ? 'text-white' : ''
                    }`}
                    style={{
                      backgroundColor: selectedCategory === cat ? theme?.primaryColor || 'var(--primary)' : `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`,
                      color: selectedCategory === cat ? '#FFFFFF' : theme?.primaryColor || 'var(--primary)'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: theme?.primaryColor || 'var(--primary)' }}></div>
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="text-center py-12">
                <p style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                  Aucun livre disponible dans cette catégorie.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                  <Link
                    key={book.id}
                    to={`/library/${book.slug}`}
                    className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{
                      backgroundColor: theme?.cardColor || 'var(--card)',
                      borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)`
                    }}
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      {book.cover_image ? (
                        <img
                          src={getFullImageUrl(book.cover_image)}
                          alt={book.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = '/book-placeholder.jpg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 5%, transparent)` }}>
                          <BookOpen className="h-12 w-12" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-1 line-clamp-2" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>
                        {book.title}
                      </h3>
                      {book.author && (
                        <p className="text-sm mb-2" style={{ color: theme?.primaryColor || 'var(--primary)' }}>
                          {book.author}
                        </p>
                      )}
                      <p className="text-sm line-clamp-2 mb-3" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                        {book.description}
                      </p>
                      <div className="flex items-center justify-between">
                        {book.category && (
                          <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`, color: theme?.primaryColor || 'var(--primary)' }}>
                            {book.category}
                          </span>
                        )}
                        <span className="text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: theme?.primaryColor || 'var(--primary)' }}>
                          {booksCta} <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Galerie des espaces */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {galleryTitle}
            </h2>
            <p className="text-lg" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {gallerySubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => {
              const Icon = iconMap[image.icon] || Image;
              return (
                <div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl"
                  style={{
                    backgroundColor: theme?.backgroundColor || 'var(--background)',
                    borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)`
                  }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={getFullImageUrl(image.src) || image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-end p-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 80%, transparent)` }}>
                        <Icon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-white font-medium text-sm">{image.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section ressources à venir */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {resourcesTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {resourcesItems.map((item, index) => {
                const Icon = iconMap[item.icon] || BookOpen;
                return (
                  <div key={index} className="p-6 rounded-xl border transition-all hover:shadow-md" style={{ borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)` }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
                      <Icon className="h-6 w-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                    </div>
                    <h3 className="font-semibold mb-2" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}