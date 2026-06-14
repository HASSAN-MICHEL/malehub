

// import { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { GraduationCap, Check, Users, Clock, Award, FileText, Briefcase, ArrowRight, Mic, X, Calendar, DollarSign } from 'lucide-react';
// import { formationsAPI } from '../services/client';
// import { useContent, useSettings } from '../hooks/usecontet';

// // Modules par défaut (seront remplacés par ceux du ContentManager si disponibles)
// const defaultJobsWeekModules = [
//   { day: 'Jour 1', title: 'CV & Lettre de motivation', description: 'Créez un CV et une lettre de motivation qui se démarquent' },
//   { day: 'Jour 2', title: 'Personal Branding', description: 'Construisez votre image professionnelle et votre présence en ligne' },
//   { day: 'Jour 3', title: 'Techniques d\'entretien', description: 'Maîtrisez les questions courantes et le langage corporel' },
//   { day: 'Jour 4', title: 'Entretiens simulés', description: 'Pratiquez avec des scénarios réels et des retours d\'experts' },
//   { day: 'Jour 5', title: 'Job Matching', description: 'Connectez-vous avec des opportunités et des employeurs' },
// ];

// const defaultBenefits = [
//   { title: 'Optimisation de CV', description: 'CV professionnel qui attire les recruteurs' },
//   { title: 'Entretiens simulés', description: 'Pratiquez avec des retours d\'experts' },
//   { title: 'Certificat', description: 'Preuve de complétion pour votre portfolio' },
//   { title: 'Accès à l\'emploi', description: 'Connexions directes avec les opportunités' },
// ];

// const defaultIncludedItems = [
//   'Optimisation CV',
//   'Entretiens blancs',
//   'Profil LinkedIn',
//   'Matching emploi',
//   'Certificat'
// ];

// export default function TrainingPage() {
//   const { t } = useTranslation();
//   const { get, getText, getMedia } = useContent('training');
//   const { setting } = useSettings();
  
//   const [formations, setFormations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedFormation, setSelectedFormation] = useState(null);
//   const [formData, setFormData] = useState({
//     nom: '',
//     email: '',
//     tel: '',
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   // Récupération des valeurs dynamiques depuis le ContentManager
//   const heroImageUrl = getMedia('hero_image');
//   const jobsWeekDescription = getText('jobs_week_desc', t('training.jobsWeek.description', 'Un programme intensif conçu pour vous transformer en candidat compétitif.'));
//   const jobsWeekPrice = setting('jobs_week_price', '30000');
//   const jobsWeekQuota = setting('jobs_week_quota', '10');
//   const jobsWeekOpen = setting('jobs_week_open', 'true') === 'true';
  
//   // WhatsApp numbers
//   const waGeneral = setting('whatsapp_general', '237678111022');
//   const waReservations = setting('whatsapp_reservations', waGeneral);
  
//   // Récupération des modules et bénéfices depuis le ContentManager (stockés en JSON)
//   const jobsWeekModules = (() => {
//     try {
//       const modulesJson = getText('jobs_week_modules', '');
//       if (modulesJson && modulesJson.trim()) return JSON.parse(modulesJson);
//     } catch (e) { console.warn('Invalid modules JSON'); }
//     return defaultJobsWeekModules;
//   })();
  
//   const benefits = (() => {
//     try {
//       const benefitsJson = getText('jobs_week_benefits', '');
//       if (benefitsJson && benefitsJson.trim()) return JSON.parse(benefitsJson);
//     } catch (e) { console.warn('Invalid benefits JSON'); }
//     return defaultBenefits;
//   })();

//   // Récupération sécurisée des éléments inclus
//   const getIncludedItems = () => {
//     const items = t('training.jobsWeek.included_list', { returnObjects: true });
//     if (Array.isArray(items) && items.length > 0) {
//       return items;
//     }
//     return defaultIncludedItems;
//   };

//   useEffect(() => {
//     fetchFormations();
//   }, []);

//   const fetchFormations = async () => {
//     try {
//       const response = await formationsAPI.getAll();
//       setFormations(response.data.data || []);
//     } catch (error) {
//       console.error('Error fetching formations:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openInscriptionModal = (formation) => {
//     setSelectedFormation(formation);
//     setFormData({ nom: '', email: '', tel: '' });
//     setSuccessMessage('');
//     setShowModal(true);
//   };

//   const handleInscription = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setSuccessMessage('');

//     try {
//       await formationsAPI.inscription(selectedFormation.id, {
//         formation_id: selectedFormation.id,
//         ...formData,
//       });
//       setSuccessMessage('Inscription enregistrée avec succès ! Vous recevrez une confirmation par WhatsApp.');
//       setTimeout(() => {
//         setShowModal(false);
//         setSuccessMessage('');
//       }, 3000);
//     } catch (error) {
//       const message = error.response?.data?.message || 'Erreur lors de l\'inscription';
//       alert(message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const formatDate = (date) => {
//     if (!date) return '';
//     return new Date(date).toLocaleDateString('fr-FR', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//     });
//   };

//   const getFullImageUrl = (url) => {
//     if (!url) return null;
//     if (url.startsWith('http')) return url;
//     return url;
//   };

//   return (
//     <div className="pt-16 lg:pt-20">
//       {/* Hero Section avec image dynamique */}
//       <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        
//         {heroImageUrl && (
//           <div className="absolute inset-0 opacity-20 z-0">
//             <img src={getFullImageUrl(heroImageUrl)} alt="" className="w-full h-full object-cover" />
//           </div>
//         )}
        
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="max-w-3xl">
//             <div
//               className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//               style={{
//                 borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)',
//                 backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)',
//                 color: 'var(--primary)'
//               }}
//             >
//               {get('hero_badge', t('training.hero.badge', 'Formations Professionnelles'))}
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//               {get('hero_title', (
//                 <>
//                   Devenez <span style={{ color: 'var(--primary)' }}>opérationnel</span>
//                 </>
//               ))}
//             </h1>
//             <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//               {get('description', t('training.hero.description', 'Des programmes de formation conçus pour accélérer votre carrière et développer vos compétences.'))}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Jobs Week Section */}
//       {jobsWeekOpen && (
//         <section id="jobs-week" className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
//           <div className="container mx-auto px-4 lg:px-8">
//             <div className="grid lg:grid-cols-2 gap-12 items-start">
//               <div>
//                 <div
//                   className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//                   style={{
//                     borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)',
//                     backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)',
//                     color: 'var(--primary)'
//                   }}
//                 >
//                   {t('training.jobsWeek.badge', 'Programme Phare')}
//                 </div>
//                 <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
//                   {get('jobs_week_title', t('training.jobsWeek.title', 'Jobs Week'))}
//                 </h2>
//                 <p className="mt-2 text-xl font-medium" style={{ color: 'var(--primary)' }}>
//                   {t('training.jobsWeek.subtitle', 'Programme Intensif de 5 Jours')}
//                 </p>
//                 <p className="mt-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//                   {jobsWeekDescription}
//                 </p>
//                 <div className="mt-8 grid grid-cols-2 gap-4">
//                   {Array.isArray(benefits) && benefits.map((benefit) => {
//                     const IconMap = {
//                       'Optimisation de CV': FileText,
//                       'CV Optimization': FileText,
//                       'Entretiens simulés': Users,
//                       'Mock Interviews': Users,
//                       'Certificat': Award,
//                       'Certificate': Award,
//                       'Accès à l\'emploi': Briefcase,
//                       'Job Access': Briefcase,
//                     };
//                     const Icon = IconMap[benefit.title] || FileText;
//                     return (
//                       <div key={benefit.title} className="flex items-start gap-3">
//                         <div
//                           className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
//                           style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}
//                         >
//                           <Icon className="h-5 w-5" style={{ color: 'var(--primary)' }} />
//                         </div>
//                         <div>
//                           <h4 className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>{benefit.title}</h4>
//                           <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>{benefit.description}</p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div
//                 className="rounded-2xl p-8 relative overflow-hidden border"
//                 style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}
//               >
//                 <div
//                   className="absolute top-0 right-0 text-xs font-bold px-4 py-2 rounded-bl-xl"
//                   style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//                 >
//                   {jobsWeekQuota} {t('training.jobsWeek.places_only', 'PLACES SEULEMENT')}
//                 </div>
//                 <GraduationCap className="h-10 w-10 mb-6" style={{ color: 'var(--primary)' }} />
//                 <div className="mb-6">
//                   <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t('training.jobsWeek.program_complete', 'Programme complet')}</span>
//                   <div className="mt-2 flex items-baseline gap-2">
//                     <span className="text-5xl font-bold" style={{ color: 'var(--foreground)' }}>{parseInt(jobsWeekPrice).toLocaleString()}</span>
//                     <span className="text-xl" style={{ color: 'var(--muted-foreground)' }}>FCFA</span>
//                   </div>
//                 </div>
//                 <div
//                   className="flex items-center gap-3 p-3 rounded-lg mb-6"
//                   style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}
//                 >
//                   <Clock className="h-5 w-5" style={{ color: 'var(--primary)' }} />
//                   <span className="font-medium" style={{ color: 'var(--foreground)' }}>{t('training.jobsWeek.duration', '5 jours intensifs')}</span>
//                 </div>
//                 <ul className="space-y-3 mb-8">
//                   {getIncludedItems().map((item) => (
//                     <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
//                       <Check className="h-4 w-4" style={{ color: 'var(--primary)' }} /> {item}
//                     </li>
//                   ))}
//                 </ul>
//                 <a
//                   href={`https://wa.me/${waGeneral}?text=${encodeURIComponent(`Bonjour, je souhaite m'inscrire à Jobs Week (${jobsWeekPrice} FCFA)`)}`}
//                   target="_blank" rel="noopener noreferrer"
//                   className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-opacity hover:opacity-90"
//                   style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//                 >
//                   {t('training.jobsWeek.cta_button', "S'inscrire via WhatsApp")} <ArrowRight className="h-5 w-5" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Nos Formations Section */}
//       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
//               {t('training.formations.title', 'Nos Formations')}
//             </h2>
//             <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>
//               {t('training.formations.subtitle', 'Des programmes conçus par des experts pour vous aider à atteindre vos objectifs')}
//             </p>
//           </div>

//           {loading ? (
//             <div className="flex justify-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//             </div>
//           ) : formations.length === 0 ? (
//             <div className="text-center py-12">
//               <p style={{ color: 'var(--muted-foreground)' }}>{t('training.formations.none', 'Aucune formation disponible pour le moment')}</p>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-2 gap-8">
//               {formations.filter(f => f.statut_ouvert).map((formation) => (
//                 <div
//                   key={formation.id}
//                   className="rounded-2xl overflow-hidden border transition-all hover:shadow-lg"
//                   style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}
//                 >
//                   <div className="p-6">
//                     <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{formation.titre}</h3>
//                     <div className="flex flex-wrap gap-4 mb-4 text-sm">
//                       <div className="flex items-center gap-1">
//                         <Calendar className="h-4 w-4" style={{ color: 'var(--primary)' }} />
//                         <span style={{ color: 'var(--muted-foreground)' }}>{formatDate(formation.date_debut)}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Users className="h-4 w-4" style={{ color: 'var(--primary)' }} />
//                         <span style={{ color: 'var(--muted-foreground)' }}>{formation.nb_places} places</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <DollarSign className="h-4 w-4" style={{ color: 'var(--primary)' }} />
//                         <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{formation.prix?.toLocaleString()} FCFA</span>
//                       </div>
//                     </div>
                    
//                     <div className="mb-4">
//                       <h4 className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>{t('training.formations.program', 'Programme')} :</h4>
//                       <p className="text-sm line-clamp-3" style={{ color: 'var(--muted-foreground)' }}>{formation.programme}</p>
//                     </div>
                    
//                     {formation.benefices && (
//                       <div className="mb-6">
//                         <h4 className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>{t('training.formations.benefits', 'Bénéfices')} :</h4>
//                         <p className="text-sm line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>{formation.benefices}</p>
//                       </div>
//                     )}

//                     <button
//                       onClick={() => openInscriptionModal(formation)}
//                       className="w-full py-3 rounded-lg font-semibold transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
//                       style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//                     >
//                       {t('training.formations.cta', "S'inscrire")} <ArrowRight className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Program Overview Section */}
//       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
//               {get('program_title', t('training.program.title', 'Aperçu du Programme'))}
//             </h2>
//             <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>
//               {get('program_subtitle', t('training.program.subtitle', 'Un parcours complet de 5 jours vers l\'employabilité'))}
//             </p>
//           </div>
//           <div className="max-w-3xl mx-auto space-y-4">
//             {Array.isArray(jobsWeekModules) && jobsWeekModules.map((module, index) => (
//               <div
//                 key={module.day || index}
//                 className="flex items-center gap-6 p-6 rounded-xl border"
//                 style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}
//               >
//                 <div
//                   className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
//                   style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}
//                 >
//                   <span className="text-xl font-bold" style={{ color: 'var(--primary)' }}>{index + 1}</span>
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium" style={{ color: 'var(--primary)' }}>{module.day}</div>
//                   <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>{module.title}</h3>
//                   <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>{module.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section - Formateurs */}
//       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div
//             className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border"
//             style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}
//           >
//             <Mic className="h-12 w-12 mx-auto mb-6" style={{ color: 'var(--primary)' }} />
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
//               {get('trainer_title', t('training.trainer.title', 'Vous êtes formateur ou organisation ?'))}
//             </h2>
//             <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>
//               {get('trainer_description', t('training.trainer.description', 'Organisez vos formations à Malea Hub. Des installations premium, un environnement professionnel et un public motivé.'))}
//             </p>
//             <a
//               href={`https://wa.me/${waReservations}?text=${encodeURIComponent("Bonjour, je suis formateur et souhaite organiser une formation à Malea Hub")}`}
//               target="_blank" rel="noopener noreferrer"
//               className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
//               style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//             >
//               {get('trainer_button', t('training.trainer.button', 'Organisez votre formation'))} <ArrowRight className="h-5 w-5" />
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Modal d'inscription */}
//       {showModal && selectedFormation && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//           <div className="rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--card)' }}>
//             <div
//               className="sticky top-0 flex justify-between items-center p-5 border-b"
//               style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
//             >
//               <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
//                 Inscription à : {selectedFormation.titre}
//               </h2>
//               <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100/10">
//                 <X className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
//               </button>
//             </div>

//             {successMessage ? (
//               <div className="p-6 text-center">
//                 <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-100">
//                   <Check className="h-8 w-8 text-green-600" />
//                 </div>
//                 <p className="text-green-600">{successMessage}</p>
//               </div>
//             ) : (
//               <form onSubmit={handleInscription} className="p-5 space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//                     Nom complet *
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.nom}
//                     onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
//                     className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
//                     style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//                     Email *
//                   </label>
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
//                     style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
//                     Téléphone (WhatsApp) *
//                   </label>
//                   <input
//                     type="tel"
//                     value={formData.tel}
//                     onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
//                     placeholder="+237 6XX XXX XXX"
//                     className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
//                     style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
//                     required
//                   />
//                 </div>
//                 <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
//                   <p>💡 Une confirmation vous sera envoyée par WhatsApp après validation de votre inscription.</p>
//                 </div>
//                 <div className="flex gap-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="flex-1 px-4 py-2 rounded-lg border transition-colors"
//                     style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
//                   >
//                     Annuler
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
//                     style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//                   >
//                     {submitting ? 'Envoi...' : "S'inscrire"}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






import { useState, useEffect } from 'react';
import { GraduationCap, Check, Users, Clock, Award, FileText, Briefcase, ArrowRight, Mic, X, Calendar, DollarSign } from 'lucide-react';
import { formationsAPI } from '../services/client';
import { useContent, useSettings } from '../hooks/usecontet';


// Modules par défaut (seront remplacés par ceux du ContentManager si disponibles)
const defaultJobsWeekModules = [
  { day: 'Jour 1', title: 'CV & Lettre de motivation', description: 'Créez un CV et une lettre de motivation qui se démarquent' },
  { day: 'Jour 2', title: 'Personal Branding', description: 'Construisez votre image professionnelle et votre présence en ligne' },
  { day: 'Jour 3', title: 'Techniques d\'entretien', description: 'Maîtrisez les questions courantes et le langage corporel' },
  { day: 'Jour 4', title: 'Entretiens simulés', description: 'Pratiquez avec des scénarios réels et des retours d\'experts' },
  { day: 'Jour 5', title: 'Job Matching', description: 'Connectez-vous avec des opportunités et des employeurs' },
];

const defaultBenefits = [
  { title: 'Optimisation de CV', description: 'CV professionnel qui attire les recruteurs' },
  { title: 'Entretiens simulés', description: 'Pratiquez avec des retours d\'experts' },
  { title: 'Certificat', description: 'Preuve de complétion pour votre portfolio' },
  { title: 'Accès à l\'emploi', description: 'Connexions directes avec les opportunités' },
];

const defaultIncludedItems = [
  'Optimisation CV',
  'Entretiens blancs',
  'Profil LinkedIn',
  'Matching emploi',
  'Certificat'
];

const iconMap = {
  'Optimisation de CV': FileText,
  'CV Optimization': FileText,
  'Entretiens simulés': Users,
  'Mock Interviews': Users,
  'Certificat': Award,
  'Certificate': Award,
  'Accès à l\'emploi': Briefcase,
  'Job Access': Briefcase,
};

export default function TrainingPage() {
  // Récupération des blocs dynamiques pour la page 'training'
  const { get, getMedia, getText, getJSON, getTheme } = useContent('training');
  const { setting } = useSettings();
  const theme = getTheme();
  
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    tel: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Récupération des valeurs dynamiques depuis le ContentManager
  const heroImageUrl = getMedia('hero_image');
  const heroBadge = get('hero_badge', 'Formations Professionnelles');
  const heroTitlePrefix = get('hero_title_prefix', 'Devenez');
  const heroTitleHighlight = get('hero_title_highlight', 'opérationnel');
  const heroTitleSuffix = get('hero_title_suffix', 'avec nos formations');
  const heroDescription = get('hero_description', 'Des programmes de formation conçus pour accélérer votre carrière et développer vos compétences.');
  
  // Jobs Week section
  const jobsWeekBadge = get('jobs_week_badge', 'Programme Phare');
  const jobsWeekTitle = get('jobs_week_title', 'Jobs Week');
  const jobsWeekSubtitle = get('jobs_week_subtitle', 'Programme Intensif de 5 Jours');
  const jobsWeekDescription = get('jobs_week_description', getText('jobs_week_desc', 'Un programme intensif conçu pour vous transformer en candidat compétitif.'));
  const jobsWeekPlacesLabel = get('jobs_week_places_label', 'PLACES SEULEMENT');
  const jobsWeekProgramLabel = get('jobs_week_program_label', 'Programme complet');
  const jobsWeekDuration = get('jobs_week_duration', '5 jours intensifs');
  const jobsWeekCta = get('jobs_week_cta', "S'inscrire via WhatsApp");
  const jobsWeekCtaMessage = get('jobs_week_cta_message', "Bonjour, je souhaite m'inscrire à Jobs Week");
  
  // Formations section
  const formationsTitle = get('formations_title', 'Nos Formations');
  const formationsSubtitle = get('formations_subtitle', 'Des programmes conçus par des experts pour vous aider à atteindre vos objectifs');
  
  // Program overview section
  const programTitle = get('program_title', 'Aperçu du Programme');
  const programSubtitle = get('program_subtitle', 'Un parcours complet de 5 jours vers l\'employabilité');
  
  // Trainer section
  const trainerTitle = get('trainer_title', 'Vous êtes formateur ou organisation ?');
  const trainerDescription = get('trainer_description', 'Organisez vos formations à Malea Hub. Des installations premium, un environnement professionnel et un public motivé.');
  const trainerButton = get('trainer_button', 'Organisez votre formation');
  const trainerMessage = get('trainer_message', 'Bonjour, je suis formateur et souhaite organiser une formation à Malea Hub');
  
  // Settings
  const jobsWeekPrice = setting('jobs_week_price', '30000');
  const jobsWeekQuota = setting('jobs_week_quota', '10');
  const jobsWeekOpen = setting('jobs_week_open', 'true') === 'true';
  
  // WhatsApp numbers
  const waGeneral = setting('whatsapp_general', '237678111022');
  const waReservations = setting('whatsapp_reservations', waGeneral);
  
  // Récupération des modules et bénéfices depuis le ContentManager (stockés en JSON)
  const jobsWeekModules = getJSON('jobs_week_modules', defaultJobsWeekModules);
  const benefits = getJSON('jobs_week_benefits', defaultBenefits);
  const includedItems = getJSON('jobs_week_included_items', defaultIncludedItems);

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const response = await formationsAPI.getAll();
      setFormations(response.data.data || []);
    } catch (error) {
      console.error('Error fetching formations:', error);
    } finally {
      setLoading(false);
    }
  };

  const openInscriptionModal = (formation) => {
    setSelectedFormation(formation);
    setFormData({ nom: '', email: '', tel: '' });
    setSuccessMessage('');
    setShowModal(true);
  };

  const handleInscription = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');

    try {
      await formationsAPI.inscription(selectedFormation.id, {
        formation_id: selectedFormation.id,
        ...formData,
      });
      setSuccessMessage('Inscription enregistrée avec succès ! Vous recevrez une confirmation par WhatsApp.');
      setTimeout(() => {
        setShowModal(false);
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de l\'inscription';
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getFullImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const baseUrl = import.meta.env.VITE_API_URL || 'https://maleahub.vercel.app';
    return `${baseUrl}${url}`;
  };

  // Styles avec le thème personnalisé
  const styles = {
    backgroundColor: theme?.backgroundColor || 'var(--background)',
    color: theme?.foregroundColor || 'var(--foreground)',
    fontFamily: theme?.fontBody || 'Inter',
  };

  return (
    <div className="pt-16 lg:pt-20" style={styles}>
      {/* Hero Section avec image dynamique */}
      <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 5%, transparent), transparent)` }} />
        
        {heroImageUrl && (
          <div className="absolute inset-0 opacity-20 z-0">
            <img src={getFullImageUrl(heroImageUrl)} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
              style={{
                borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`,
                backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`,
                color: theme?.primaryColor || 'var(--primary)'
              }}
            >
              {heroBadge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {heroTitlePrefix}{' '}
              <span style={{ color: theme?.primaryColor || 'var(--primary)' }}>{heroTitleHighlight}</span>{' '}
              {heroTitleSuffix}
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Jobs Week Section */}
      {jobsWeekOpen && (
        <section id="jobs-week" className="py-16 lg:py-24" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
                  style={{
                    borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`,
                    backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`,
                    color: theme?.primaryColor || 'var(--primary)'
                  }}
                >
                  {jobsWeekBadge}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
                  {jobsWeekTitle}
                </h2>
                <p className="mt-2 text-xl font-medium" style={{ color: theme?.primaryColor || 'var(--primary)' }}>
                  {jobsWeekSubtitle}
                </p>
                <p className="mt-6 leading-relaxed" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                  {jobsWeekDescription}
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {Array.isArray(benefits) && benefits.map((benefit, index) => {
                    const Icon = iconMap[benefit.title] || FileText;
                    return (
                      <div key={benefit.title || index} className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}
                        >
                          <Icon className="h-5 w-5" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{benefit.title}</h4>
                          <p className="text-xs mt-1" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="rounded-2xl p-8 relative overflow-hidden border"
                style={{ backgroundColor: theme?.cardColor || 'var(--card)', borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)` }}
              >
                <div
                  className="absolute top-0 right-0 text-xs font-bold px-4 py-2 rounded-bl-xl"
                  style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
                >
                  {jobsWeekQuota} {jobsWeekPlacesLabel}
                </div>
                <GraduationCap className="h-10 w-10 mb-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                <div className="mb-6">
                  <span className="text-sm" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{jobsWeekProgramLabel}</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-5xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{parseInt(jobsWeekPrice).toLocaleString()}</span>
                    <span className="text-xl" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>FCFA</span>
                  </div>
                </div>
                <div
                  className="flex items-center gap-3 p-3 rounded-lg mb-6"
                  style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}
                >
                  <Clock className="h-5 w-5" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                  <span className="font-medium" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{jobsWeekDuration}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {Array.isArray(includedItems) && includedItems.map((item, index) => (
                    <li key={item || index} className="flex items-center gap-2 text-sm" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                      <Check className="h-4 w-4" style={{ color: theme?.primaryColor || 'var(--primary)' }} /> {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${waGeneral}?text=${encodeURIComponent(`${jobsWeekCtaMessage} (${jobsWeekPrice} FCFA)`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
                >
                  {jobsWeekCta} <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Nos Formations Section */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {formationsTitle}
            </h2>
            <p className="mt-4" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {formationsSubtitle}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : formations.length === 0 ? (
            <div className="text-center py-12">
              <p style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>Aucune formation disponible pour le moment</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {formations.filter(f => f.statut_ouvert).map((formation) => (
                <div
                  key={formation.id}
                  className="rounded-2xl overflow-hidden border transition-all hover:shadow-lg"
                  style={{ backgroundColor: theme?.backgroundColor || 'var(--background)', borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)` }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{formation.titre}</h3>
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                        <span style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{formatDate(formation.date_debut)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                        <span style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{formation.nb_places} places</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                        <span className="font-semibold" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{formation.prix?.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>Programme :</h4>
                      <p className="text-sm line-clamp-3" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{formation.programme}</p>
                    </div>
                    
                    {formation.benefices && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-sm mb-2" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>Bénéfices :</h4>
                        <p className="text-sm line-clamp-2" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{formation.benefices}</p>
                      </div>
                    )}

                    <button
                      onClick={() => openInscriptionModal(formation)}
                      className="w-full py-3 rounded-lg font-semibold transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                      style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
                    >
                      S'inscrire <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Program Overview Section */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {programTitle}
            </h2>
            <p className="mt-4" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {programSubtitle}
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {Array.isArray(jobsWeekModules) && jobsWeekModules.map((module, index) => (
              <div
                key={module.day || index}
                className="flex items-center gap-6 p-6 rounded-xl border"
                style={{ backgroundColor: theme?.cardColor || 'var(--card)', borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)` }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}
                >
                  <span className="text-xl font-bold" style={{ color: theme?.primaryColor || 'var(--primary)' }}>{index + 1}</span>
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: theme?.primaryColor || 'var(--primary)' }}>{module.day}</div>
                  <h3 className="text-lg font-semibold" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{module.title}</h3>
                  <p className="text-sm mt-1" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{module.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section - Formateurs */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div
            className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border"
            style={{ backgroundColor: theme?.backgroundColor || 'var(--background)', borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)` }}
          >
            <Mic className="h-12 w-12 mx-auto mb-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {trainerTitle}
            </h2>
            <p className="mt-4 text-lg" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {trainerDescription}
            </p>
            <a
              href={`https://wa.me/${waReservations}?text=${encodeURIComponent(trainerMessage)}`}
              target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
            >
              {trainerButton} <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Modal d'inscription - inchangé */}
      {showModal && selectedFormation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
            <div
              className="sticky top-0 flex justify-between items-center p-5 border-b"
              style={{ backgroundColor: theme?.cardColor || 'var(--card)', borderColor: theme?.borderColor || 'var(--border)' }}
            >
              <h2 className="text-lg font-semibold" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>
                Inscription à : {selectedFormation.titre}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100/10">
                <X className="h-5 w-5" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }} />
              </button>
            </div>

            {successMessage ? (
              <div className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-100">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-green-600">{successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleInscription} className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: theme?.backgroundColor || 'var(--background)', borderColor: theme?.borderColor || 'var(--border)', color: theme?.foregroundColor || 'var(--foreground)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: theme?.backgroundColor || 'var(--background)', borderColor: theme?.borderColor || 'var(--border)', color: theme?.foregroundColor || 'var(--foreground)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>
                    Téléphone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    value={formData.tel}
                    onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                    placeholder="+237 6XX XXX XXX"
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: theme?.backgroundColor || 'var(--background)', borderColor: theme?.borderColor || 'var(--border)', color: theme?.foregroundColor || 'var(--foreground)' }}
                    required
                  />
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                  <p>💡 Une confirmation vous sera envoyée par WhatsApp après validation de votre inscription.</p>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg border transition-colors"
                    style={{ borderColor: theme?.borderColor || 'var(--border)', color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                    style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
                  >
                    {submitting ? 'Envoi...' : "S'inscrire"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}