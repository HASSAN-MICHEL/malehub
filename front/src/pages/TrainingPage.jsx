import { useTranslation } from 'react-i18next'
import { GraduationCap, Check, Users, Clock, Award, FileText, Briefcase, ArrowRight, Mic } from 'lucide-react'

export default function TrainingPage() {
  const { t } = useTranslation()

  const jobsWeekModules = t('training.jobsWeekModules', { returnObjects: true })
  const benefits = t('training.benefits', { returnObjects: true })

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
              style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
              {t('training.hero.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              {t('training.hero.title_prefix')}{' '}
              <span style={{ color: 'var(--primary)' }}>{t('training.hero.title_highlight')}</span>{' '}
              {t('training.hero.title_suffix')}
            </h1>
          </div>
        </div>
      </section>

      {/* Jobs Week Section */}
      <section id="jobs-week" className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>{t('training.jobsWeek.title')}</h2>
              <p className="leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
                {t('training.jobsWeek.description')}
              </p>
              <div className="grid grid-cols-2 gap-6">
                {benefits.map((benefit) => {
                  const IconMap = {
                    'Optimisation de CV': FileText,
                    'CV Optimization': FileText,
                    'Simulations d’Entretiens': Users,
                    'Mock Interviews': Users,
                    'Certificat': Award,
                    'Certificate': Award,
                    'Accès à l’Emploi': Briefcase,
                    'Job Access': Briefcase,
                  }
                  const Icon = IconMap[benefit.title] || FileText
                  return (
                    <div key={benefit.title} className="flex flex-col gap-2">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                        <Icon className="h-5 w-5" style={{ color: 'var(--primary)' }} />
                      </div>
                      <h4 className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>{benefit.title}</h4>
                      <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{benefit.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl p-8 relative border shadow-xl" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
              <div className="mb-6">
                <span className="text-sm uppercase font-bold tracking-wider" style={{ color: 'var(--primary)' }}>{t('training.jobsWeek.price_label')}</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-5xl font-bold" style={{ color: 'var(--foreground)' }}>{t('training.jobsWeek.price_value')}</span>
                  <span className="text-xl" style={{ color: 'var(--muted-foreground)' }}>{t('training.jobsWeek.price_currency')}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {t('training.jobsWeek.included_items', { returnObjects: true }).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                    <Check className="h-4 w-4" style={{ color: 'var(--primary)' }} /> {item}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/237678111022" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all hover:scale-[1.02]"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                {t('training.jobsWeek.cta_button')} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details - DISPOSITION HORIZONTALE */}
      <section className="py-12 lg:py-20" style={{ backgroundColor: 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>{t('training.program.title')}</h2>
            <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>{t('training.program.subtitle')}</p>
          </div>
          
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-border" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {jobsWeekModules.map((module, index) => (
                <div key={module.day} className="relative flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-2xl mb-6 relative z-10 transition-transform group-hover:scale-110 border-4 border-[var(--card)]" 
                    style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                    {index + 1}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--primary)' }}>{module.day}</div>
                    <h3 className="font-bold text-lg" style={{ color: 'var(--foreground)' }}>{module.title}</h3>
                    <p className="text-sm px-4 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{module.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trainers/Organizations Block */}
      <section className="py-12 lg:py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center rounded-3xl p-8 lg:p-14 border relative overflow-hidden" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
            <Mic className="h-12 w-12 mx-auto mb-6" style={{ color: 'var(--primary)' }} />
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>{t('training.trainer.title')}</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>
              {t('training.trainer.description')}
            </p>
            <div className="mt-10">
              <a href="https://wa.me/237678111022" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                {t('training.trainer.button')} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ICI Tous les messages envoyé sont aussi traité coté admin:


// // import { useState, useEffect } from 'react';
// // import { GraduationCap, Check, Users, Clock, Award, FileText, Briefcase, ArrowRight, Mic, X, Calendar, DollarSign } from 'lucide-react';
// // import { formationsAPI } from '../services/client';

// // const jobsWeekModules = [
// //   { day: 'Day 1', title: 'CV & Cover Letter', description: 'Craft a compelling CV and cover letter that stand out' },
// //   { day: 'Day 2', title: 'Personal Branding', description: 'Build your professional image and online presence' },
// //   { day: 'Day 3', title: 'Interview Skills', description: 'Master common questions and body language' },
// //   { day: 'Day 4', title: 'Mock Interviews', description: 'Practice with real scenarios and feedback' },
// //   { day: 'Day 5', title: 'Job Matching', description: 'Connect with opportunities and employers' },
// // ];

// // const benefits = [
// //   { icon: FileText, title: 'CV Optimization', description: 'Professional CV that gets noticed by recruiters' },
// //   { icon: Users, title: 'Mock Interviews', description: 'Practice with expert feedback' },
// //   { icon: Award, title: 'Certificate', description: 'Proof of completion for your portfolio' },
// //   { icon: Briefcase, title: 'Job Access', description: 'Direct connections to employment opportunities' },
// // ];

// // export default function TrainingPage() {
// //   const [formations, setFormations] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [showModal, setShowModal] = useState(false);
// //   const [selectedFormation, setSelectedFormation] = useState(null);
// //   const [formData, setFormData] = useState({
// //     nom: '',
// //     email: '',
// //     tel: '',
// //   });
// //   const [submitting, setSubmitting] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState('');

// //   useEffect(() => {
// //     fetchFormations();
// //   }, []);

// //   const fetchFormations = async () => {
// //     try {
// //       const response = await formationsAPI.getAll();
// //       setFormations(response.data.data || []);
// //     } catch (error) {
// //       console.error('Error fetching formations:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const openInscriptionModal = (formation) => {
// //     setSelectedFormation(formation);
// //     setFormData({ nom: '', email: '', tel: '' });
// //     setSuccessMessage('');
// //     setShowModal(true);
// //   };

// //   const handleInscription = async (e) => {
// //     e.preventDefault();
// //     setSubmitting(true);
// //     setSuccessMessage('');

// //     try {
// //       await formationsAPI.inscription(selectedFormation.id, {
// //         formation_id: selectedFormation.id,
// //         ...formData,
// //       });
// //       setSuccessMessage('Inscription enregistrée avec succès ! Vous recevrez une confirmation par WhatsApp.');
// //       setTimeout(() => {
// //         setShowModal(false);
// //         setSuccessMessage('');
// //       }, 3000);
// //     } catch (error) {
// //       const message = error.response?.data?.message || 'Erreur lors de l\'inscription';
// //       alert(message);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const formatDate = (date) => {
// //     return new Date(date).toLocaleDateString('fr-FR', {
// //       day: '2-digit',
// //       month: '2-digit',
// //       year: 'numeric',
// //     });
// //   };

// //   return (
// //     <div className="pt-16 lg:pt-20">
// //       {/* Hero Section */}
// //       <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
// //         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
// //         <div className="container mx-auto px-4 lg:px-8 relative z-10">
// //           <div className="max-w-3xl">
// //             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
// //               style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
// //               Formations Professionnelles
// //             </div>
// //             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
// //               Devenez <span style={{ color: 'var(--primary)' }}>opérationnel</span>
// //             </h1>
// //             <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
// //               Des programmes de formation conçus pour accélérer votre carrière et développer vos compétences.
// //             </p>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Jobs Week Section */}
// //       <section id="jobs-week" className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
// //         <div className="container mx-auto px-4 lg:px-8">
// //           <div className="grid lg:grid-cols-2 gap-12 items-start">
// //             <div>
// //               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
// //                 style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
// //                 Programme Phare
// //               </div>
// //               <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--foreground)' }}>Jobs Week</h2>
// //               <p className="mt-2 text-xl font-medium" style={{ color: 'var(--primary)' }}>Programme Intensif de 5 Jours</p>
// //               <p className="mt-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
// //                 Un programme intensif conçu pour vous transformer en candidat compétitif. Apprenez auprès d'experts, pratiquez des scénarios réels et connectez-vous directement avec les employeurs.
// //               </p>
// //               <div className="mt-8 grid grid-cols-2 gap-4">
// //                 {benefits.map((benefit) => (
// //                   <div key={benefit.title} className="flex items-start gap-3">
// //                     <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
// //                       <benefit.icon className="h-5 w-5" style={{ color: 'var(--primary)' }} />
// //                     </div>
// //                     <div>
// //                       <h4 className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>{benefit.title}</h4>
// //                       <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>{benefit.description}</p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="rounded-2xl p-8 relative overflow-hidden border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
// //               <div className="absolute top-0 right-0 text-xs font-bold px-4 py-2 rounded-bl-xl" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
// //                 10 PLACES SEULEMENT
// //               </div>
// //               <GraduationCap className="h-10 w-10 mb-6" style={{ color: 'var(--primary)' }} />
// //               <div className="mb-6">
// //                 <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Programme complet</span>
// //                 <div className="mt-2 flex items-baseline gap-2">
// //                   <span className="text-5xl font-bold" style={{ color: 'var(--foreground)' }}>30,000</span>
// //                   <span className="text-xl" style={{ color: 'var(--muted-foreground)' }}>FCFA</span>
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-3 p-3 rounded-lg mb-6" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
// //                 <Clock className="h-5 w-5" style={{ color: 'var(--primary)' }} />
// //                 <span className="font-medium" style={{ color: 'var(--foreground)' }}>5 jours intensifs</span>
// //               </div>
// //               <ul className="space-y-3 mb-8">
// //                 {['CV & personal branding', 'Préparation entretiens', 'Accès aux opportunités', 'Coaching expert', 'Certificat'].map((item) => (
// //                   <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
// //                     <Check className="h-4 w-4" style={{ color: 'var(--primary)' }} /> {item}
// //                   </li>
// //                 ))}
// //               </ul>
// //               <a href="https://wa.me/237600000000?text=Bonjour, je souhaite m'inscrire à Jobs Week (30,000 FCFA)"
// //                 target="_blank" rel="noopener noreferrer"
// //                 className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-opacity hover:opacity-90"
// //                 style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
// //                 S'inscrire via WhatsApp <ArrowRight className="h-5 w-5" />
// //               </a>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Nos Formations Section */}
// //       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
// //         <div className="container mx-auto px-4 lg:px-8">
// //           <div className="text-center max-w-2xl mx-auto mb-12">
// //             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Nos Formations</h2>
// //             <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>
// //               Des programmes conçus par des experts pour vous aider à atteindre vos objectifs
// //             </p>
// //           </div>

// //           {loading ? (
// //             <div className="flex justify-center py-12">
// //               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
// //             </div>
// //           ) : formations.length === 0 ? (
// //             <div className="text-center py-12">
// //               <p style={{ color: 'var(--muted-foreground)' }}>Aucune formation disponible pour le moment</p>
// //             </div>
// //           ) : (
// //             <div className="grid md:grid-cols-2 gap-8">
// //               {formations.filter(f => f.statut_ouvert).map((formation) => (
// //                 <div key={formation.id} className="rounded-2xl overflow-hidden border transition-all hover:shadow-lg" 
// //                   style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
// //                   <div className="p-6">
// //                     <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{formation.titre}</h3>
// //                     <div className="flex flex-wrap gap-4 mb-4 text-sm">
// //                       <div className="flex items-center gap-1">
// //                         <Calendar className="h-4 w-4" style={{ color: 'var(--primary)' }} />
// //                         <span style={{ color: 'var(--muted-foreground)' }}>{formatDate(formation.date_debut)}</span>
// //                       </div>
// //                       <div className="flex items-center gap-1">
// //                         <Users className="h-4 w-4" style={{ color: 'var(--primary)' }} />
// //                         <span style={{ color: 'var(--muted-foreground)' }}>{formation.nb_places} places</span>
// //                       </div>
// //                       <div className="flex items-center gap-1">
// //                         <DollarSign className="h-4 w-4" style={{ color: 'var(--primary)' }} />
// //                         <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{formation.prix?.toLocaleString()} FCFA</span>
// //                       </div>
// //                     </div>
                    
// //                     <div className="mb-4">
// //                       <h4 className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>Programme :</h4>
// //                       <p className="text-sm line-clamp-3" style={{ color: 'var(--muted-foreground)' }}>{formation.programme}</p>
// //                     </div>
                    
// //                     {formation.benefices && (
// //                       <div className="mb-6">
// //                         <h4 className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>Bénéfices :</h4>
// //                         <p className="text-sm line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>{formation.benefices}</p>
// //                       </div>
// //                     )}

// //                     <button
// //                       onClick={() => openInscriptionModal(formation)}
// //                       className="w-full py-3 rounded-lg font-semibold transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
// //                       style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
// //                     >
// //                       S'inscrire <ArrowRight className="h-4 w-4" />
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </section>

// //       {/* Program Overview Section */}
// //       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
// //         <div className="container mx-auto px-4 lg:px-8">
// //           <div className="text-center max-w-2xl mx-auto mb-12">
// //             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Aperçu du Programme</h2>
// //             <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>Un parcours complet de 5 jours vers l'employabilité</p>
// //           </div>
// //           <div className="max-w-3xl mx-auto space-y-4">
// //             {jobsWeekModules.map((module, index) => (
// //               <div key={module.day} className="flex items-center gap-6 p-6 rounded-xl border" 
// //                 style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
// //                 <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" 
// //                   style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
// //                   <span className="text-xl font-bold" style={{ color: 'var(--primary)' }}>{index + 1}</span>
// //                 </div>
// //                 <div>
// //                   <div className="text-sm font-medium" style={{ color: 'var(--primary)' }}>{module.day}</div>
// //                   <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>{module.title}</h3>
// //                   <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>{module.description}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Call to Action Section */}
// //       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
// //         <div className="container mx-auto px-4 lg:px-8">
// //           <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border" 
// //             style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
// //             <Mic className="h-12 w-12 mx-auto mb-6" style={{ color: 'var(--primary)' }} />
// //             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Vous êtes formateur ou organisation ?</h2>
// //             <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>Organisez vos formations à Malea Hub. Des installations premium, un environnement professionnel et un public motivé.</p>
// //             <a href="https://wa.me/237600000000?text=Bonjour, je suis formateur et souhaite organiser une formation à Malea Hub"
// //               target="_blank" rel="noopener noreferrer"
// //               className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
// //               style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
// //               Organisez votre formation <ArrowRight className="h-5 w-5" />
// //             </a>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Modal d'inscription */}
// //       {showModal && selectedFormation && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
// //           <div className="rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--card)' }}>
// //             <div className="sticky top-0 flex justify-between items-center p-5 border-b" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
// //               <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
// //                 Inscription à : {selectedFormation.titre}
// //               </h2>
// //               <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100/10">
// //                 <X className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
// //               </button>
// //             </div>

// //             {successMessage ? (
// //               <div className="p-6 text-center">
// //                 <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-100">
// //                   <Check className="h-8 w-8 text-green-600" />
// //                 </div>
// //                 <p className="text-green-600">{successMessage}</p>
// //               </div>
// //             ) : (
// //               <form onSubmit={handleInscription} className="p-5 space-y-4">
// //                 <div>
// //                   <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
// //                     Nom complet *
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={formData.nom}
// //                     onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
// //                     className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
// //                     style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
// //                     Email *
// //                   </label>
// //                   <input
// //                     type="email"
// //                     value={formData.email}
// //                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                     className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
// //                     style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
// //                     Téléphone (WhatsApp) *
// //                   </label>
// //                   <input
// //                     type="tel"
// //                     value={formData.tel}
// //                     onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
// //                     placeholder="+237 6XX XXX XXX"
// //                     className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
// //                     style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
// //                     required
// //                   />
// //                 </div>
// //                 <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
// //                   <p>💡 Une confirmation vous sera envoyée par WhatsApp après validation de votre inscription.</p>
// //                 </div>
// //                 <div className="flex gap-3 pt-4">
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowModal(false)}
// //                     className="flex-1 px-4 py-2 rounded-lg border transition-colors"
// //                     style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
// //                   >
// //                     Annuler
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     disabled={submitting}
// //                     className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
// //                     style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
// //                   >
// //                     {submitting ? 'Envoi...' : "S'inscrire"}
// //                   </button>
// //                 </div>
// //               </form>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// import { GraduationCap, Check, Users, Clock, Award, FileText, Briefcase, ArrowRight, Mic } from 'lucide-react';
// import { useContent, useSettings } from '../hooks/useContet';

// const jobsWeekModules = [
//   { day: 'Jour 1', title: 'CV & Lettre de motivation', description: 'Rédigez un CV convaincant qui sort du lot' },
//   { day: 'Jour 2', title: 'Personal Branding',         description: 'Construisez votre image professionnelle en ligne' },
//   { day: 'Jour 3', title: 'Techniques d\'entretien',   description: 'Maîtrisez les questions et le langage corporel' },
//   { day: 'Jour 4', title: 'Entretiens simulés',        description: 'Pratiquez avec des scénarios réels et des retours' },
//   { day: 'Jour 5', title: 'Mise en relation emploi',   description: 'Connectez-vous aux opportunités et aux employeurs' },
// ];

// const benefits = [
//   { icon: FileText,  title: 'CV Optimisé',       description: 'Un CV professionnel remarqué par les recruteurs' },
//   { icon: Users,     title: 'Entretiens simulés', description: 'Pratique avec retours d\'experts' },
//   { icon: Award,     title: 'Certificat',         description: 'Preuve de complétion pour votre portfolio' },
//   { icon: Briefcase, title: 'Accès Emploi',       description: 'Connexions directes aux opportunités' },
// ];

// export default function TrainingPage() {
//   const { get } = useContent('training');
//   const { setting } = useSettings();

//   const waGeneral = setting('whatsapp_general', '237678111022');
//   const jobsPrice = setting('jobs_week_price', '30000');
//   const jobsQuota = setting('jobs_week_quota', '10');
//   const jobsOpen  = setting('jobs_week_open', 'true') === 'true';

//   return (
//     <div className="pt-16 lg:pt-20">
//       {/* Hero */}
//       <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//               style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//               Formations Professionnelles
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//               {get('hero_title', <>Devenez <span style={{ color: 'var(--primary)' }}>prêt pour l'emploi</span> en 5 jours</>)}
//             </h1>
//             <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//               {get('description', "Des programmes de formation professionnelle conçus pour accélérer votre carrière.")}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Jobs Week */}
//       <section id="jobs-week" className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-start">
//             <div>
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//                 style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//                 Programme Phare
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--foreground)' }}>Jobs Week</h2>
//               <p className="mt-2 text-xl font-medium" style={{ color: 'var(--primary)' }}>Programme Intensif 5 Jours</p>
//               <p className="mt-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//                 {get('jobs_week_desc', "Un programme intensif conçu pour transformer votre profil en candidat compétitif. Apprenez des experts, pratiquez sur des cas réels et connectez-vous directement aux employeurs.")}
//               </p>
//               <div className="mt-8 grid grid-cols-2 gap-4">
//                 {benefits.map((b) => (
//                   <div key={b.title} className="flex items-start gap-3">
//                     <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
//                       style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                       <b.icon className="h-5 w-5" style={{ color: 'var(--primary)' }} />
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>{b.title}</h4>
//                       <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>{b.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Pricing card */}
//             <div className="rounded-2xl p-8 relative overflow-hidden border"
//               style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
//               {jobsOpen ? (
//                 <div className="absolute top-0 right-0 text-xs font-bold px-4 py-2 rounded-bl-xl"
//                   style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//                   {jobsQuota} PLACES SEULEMENT
//                 </div>
//               ) : (
//                 <div className="absolute top-0 right-0 text-xs font-bold px-4 py-2 rounded-bl-xl bg-gray-500 text-white">
//                   INSCRIPTIONS FERMÉES
//                 </div>
//               )}
//               <GraduationCap className="h-10 w-10 mb-6" style={{ color: 'var(--primary)' }} />
//               <div className="mb-6">
//                 <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Programme complet</span>
//                 <div className="mt-2 flex items-baseline gap-2">
//                   <span className="text-5xl font-bold" style={{ color: 'var(--foreground)' }}>
//                     {Number(jobsPrice).toLocaleString('fr-FR')}
//                   </span>
//                   <span className="text-xl" style={{ color: 'var(--muted-foreground)' }}>FCFA</span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-3 rounded-lg mb-6"
//                 style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                 <Clock className="h-5 w-5" style={{ color: 'var(--primary)' }} />
//                 <span className="font-medium" style={{ color: 'var(--foreground)' }}>5 jours intensifs</span>
//               </div>
//               <ul className="space-y-3 mb-8">
//                 {['CV & personal branding', 'Préparation entretiens', 'Accès aux opportunités', 'Coaching expert', 'Certificat'].map((item) => (
//                   <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
//                     <Check className="h-4 w-4" style={{ color: 'var(--primary)' }} /> {item}
//                   </li>
//                 ))}
//               </ul>
//               {jobsOpen ? (
//                 <a href={`https://wa.me/${waGeneral}?text=Bonjour, je souhaite m'inscrire à Jobs Week (${Number(jobsPrice).toLocaleString('fr-FR')} FCFA)`}
//                   target="_blank" rel="noopener noreferrer"
//                   className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-opacity hover:opacity-90"
//                   style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//                   Réserver ma place <ArrowRight className="h-5 w-5" />
//                 </a>
//               ) : (
//                 <button disabled className="w-full py-4 rounded-lg font-semibold opacity-50 cursor-not-allowed"
//                   style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}>
//                   Inscriptions fermées
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Programme détaillé */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Programme détaillé</h2>
//           </div>
//           <div className="max-w-3xl mx-auto space-y-4">
//             {jobsWeekModules.map((module, i) => (
//               <div key={module.day} className="flex items-center gap-6 p-6 rounded-xl border"
//                 style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                 <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
//                   style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                   <span className="text-xl font-bold" style={{ color: 'var(--primary)' }}>{i + 1}</span>
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

//       {/* Formateurs */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border"
//             style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
//             <Mic className="h-12 w-12 mx-auto mb-6" style={{ color: 'var(--primary)' }} />
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
//               Vous êtes formateur ou organisation ?
//             </h2>
//             <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>
//               Organisez vos formations chez Malea Hub. Équipements premium, environnement professionnel.
//             </p>
//             <a href={`https://wa.me/${waGeneral}?text=Bonjour, je suis formateur et souhaite organiser une formation à Malea Hub`}
//               target="_blank" rel="noopener noreferrer"
//               className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
//               style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//               Organiser une formation <ArrowRight className="h-5 w-5" />
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }