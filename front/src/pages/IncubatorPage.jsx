

// // // import { useState } from 'react';
// // // import { Lightbulb, Users, TrendingUp, Target, Rocket, Network, ArrowRight, Calendar, X, Check } from 'lucide-react';
// // // import { candidaturesAPI } from '../services/client';

// // // const benefits = [
// // //   { icon: Users, title: 'Expert Mentorship', description: 'Access to experienced entrepreneurs and industry experts who guide your journey' },
// // //   { icon: Network, title: 'Strong Network', description: 'Connect with investors, partners, and fellow entrepreneurs' },
// // //   { icon: TrendingUp, title: 'Growth Resources', description: 'Tools, workshops, and resources to accelerate your business' },
// // //   { icon: Target, title: 'Market Access', description: 'Connections to local and international markets' },
// // //   { icon: Rocket, title: 'Funding Opportunities', description: 'Access to our investor network and pitch events' },
// // //   { icon: Lightbulb, title: 'Innovation Support', description: 'Technical and strategic support for product development' },
// // // ];

// // // const programPhases = [
// // //   { phase: '01', title: 'Ideation', description: 'Validate your idea and develop your business model' },
// // //   { phase: '02', title: 'Development', description: 'Build your MVP and test with real customers' },
// // //   { phase: '03', title: 'Growth', description: 'Scale your business and secure funding' },
// // // ];

// // // export default function IncubatorPage() {
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [successMessage, setSuccessMessage] = useState('');
// // //   const [formData, setFormData] = useState({
// // //     nom: '',
// // //     email: '',
// // //     tel: '',
// // //     nom_projet: '',
// // //     description: '',
// // //   });

// // //   // const handleSubmit = async (e) => {
// // //   //   e.preventDefault();
// // //   //   setSubmitting(true);
// // //   //   setSuccessMessage('');

// // //   //   try {
// // //   //     await candidaturesAPI.submit(formData);
// // //   //     setSuccessMessage('Candidature soumise avec succès ! Nous vous contacterons sous 48h.');
// // //   //     setFormData({ nom: '', email: '', tel: '', nom_projet: '', description: '' });
// // //   //     setTimeout(() => {
// // //   //       setShowModal(false);
// // //   //       setSuccessMessage('');
// // //   //     }, 3000);
// // //   //   } catch (error) {
// // //   //     const message = error.response?.data?.message || 'Erreur lors de la soumission';
// // //   //     alert(message);
// // //   //   } finally {
// // //   //     setSubmitting(false);
// // //   //   }
// // //   // };

// // //   const handleSubmit = async (e) => {
// // //   e.preventDefault();
// // //   setSubmitting(true);
// // //   setSuccessMessage('');

// // //   // Afficher les données envoyées
// // //   console.log('Données envoyées:', formData);

// // //   try {
// // //     const response = await candidaturesAPI.submit(formData);
// // //     console.log('Réponse du serveur:', response.data);
// // //     setSuccessMessage('Candidature soumise avec succès ! Nous vous contacterons sous 48h.');
// // //     setFormData({ nom: '', email: '', tel: '', nom_projet: '', description: '' });
// // //     setTimeout(() => {
// // //       setShowModal(false);
// // //       setSuccessMessage('');
// // //     }, 3000);
// // //   } catch (error) {
// // //     console.error('Erreur complète:', error);
// // //     console.error('Response data:', error.response?.data);
// // //     console.error('Status:', error.response?.status);
    
// // //     // Afficher le message d'erreur détaillé
// // //     const message = error.response?.data?.message || error.message || 'Erreur lors de la soumission';
// // //     alert(`Erreur: ${message}`);
// // //   } finally {
// // //     setSubmitting(false);
// // //   }
// // // };

// // //   return (
// // //     <div className="pt-16 lg:pt-20">
// // //       {/* Hero Section */}
// // //       <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
// // //         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
// // //         <div className="container mx-auto px-4 lg:px-8 relative z-10">
// // //           <div className="grid lg:grid-cols-2 gap-12 items-center">
// // //             <div>
// // //               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
// // //                 style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
// // //                 Programme d'Incubation
// // //               </div>
// // //               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
// // //                 Join the <span style={{ color: 'var(--primary)' }}>incubator</span>
// // //               </h1>
// // //               <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
// // //                 Structure, develop and launch your project with the support of experienced mentors and access to a powerful network of investors.
// // //               </p>
// // //               <div className="mt-8">
// // //                 <button
// // //                   onClick={() => setShowModal(true)}
// // //                   className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
// // //                   style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
// // //                 >
// // //                   Join the incubator <ArrowRight className="h-5 w-5" />
// // //                 </button>
// // //               </div>
// // //             </div>
// // //             <div className="relative">
// // //               <div className="aspect-[4/3] rounded-2xl overflow-hidden">
// // //                 <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="Startup team working" className="w-full h-full object-cover" />
// // //               </div>
// // //               <div className="absolute -bottom-4 -left-4 w-24 h-24 border rounded-2xl -z-10" style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }} />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Program Phases */}
// // //       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
// // //         <div className="container mx-auto px-4 lg:px-8">
// // //           <div className="text-center max-w-2xl mx-auto mb-12">
// // //             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Our Incubation Journey</h2>
// // //             <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>A structured program to take you from idea to successful business</p>
// // //           </div>
// // //           <div className="grid md:grid-cols-3 gap-8">
// // //             {programPhases.map((phase, index) => (
// // //               <div key={phase.phase} className="relative">
// // //                 {index < programPhases.length - 1 && (
// // //                   <div className="hidden md:block absolute top-8 left-full w-full h-px -translate-x-1/2" style={{ background: 'linear-gradient(to right, color-mix(in oklch, var(--primary) 50%, transparent), transparent)' }} />
// // //                 )}
// // //                 <div className="rounded-2xl p-8 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
// // //                   <div className="text-4xl font-bold mb-4" style={{ color: 'var(--primary)' }}>{phase.phase}</div>
// // //                   <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{phase.title}</h3>
// // //                   <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{phase.description}</p>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Benefits */}
// // //       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
// // //         <div className="container mx-auto px-4 lg:px-8">
// // //           <div className="text-center max-w-2xl mx-auto mb-12">
// // //             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Why join our incubator?</h2>
// // //             <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>Everything you need to build and scale your startup</p>
// // //           </div>
// // //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //             {benefits.map((benefit) => (
// // //               <div key={benefit.title} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
// // //                 <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
// // //                   <benefit.icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
// // //                 </div>
// // //                 <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{benefit.title}</h3>
// // //                 <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{benefit.description}</p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Invest Club */}
// // //       <section id="investors" className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
// // //         <div className="container mx-auto px-4 lg:px-8">
// // //           <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 relative overflow-hidden border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
// // //             <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 rounded-tl-2xl" style={{ borderColor: 'color-mix(in oklch, var(--primary) 50%, transparent)' }} />
// // //             <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 rounded-br-2xl" style={{ borderColor: 'color-mix(in oklch, var(--primary) 50%, transparent)' }} />
// // //             <TrendingUp className="h-12 w-12 mx-auto mb-6" style={{ color: 'var(--primary)' }} />
// // //             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Join the Malea Invest Club</h2>
// // //             <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>Are you an investor looking for promising startups in Cameroon?</p>
// // //             <a href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre le Malea Invest Club"
// // //               target="_blank" rel="noopener noreferrer"
// // //               className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
// // //               style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
// // //               Contact via WhatsApp <ArrowRight className="h-5 w-5" />
// // //             </a>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Modal de candidature */}
// // //       {showModal && (
// // //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
// // //           <div className="rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--card)' }}>
// // //             <div className="sticky top-0 flex justify-between items-center p-5 border-b" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
// // //               <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
// // //                 Candidature à l'incubateur
// // //               </h2>
// // //               <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100/10">
// // //                 <X className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
// // //               </button>
// // //             </div>

// // //             {successMessage ? (
// // //               <div className="p-6 text-center">
// // //                 <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-100">
// // //                   <Check className="h-8 w-8 text-green-600" />
// // //                 </div>
// // //                 <p className="text-green-600">{successMessage}</p>
// // //               </div>
// // //             ) : (
// // //               <form onSubmit={handleSubmit} className="p-5 space-y-4">
// // //                 <div>
// // //                   <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
// // //                     Nom complet *
// // //                   </label>
// // //                   <input
// // //                     type="text"
// // //                     value={formData.nom}
// // //                     onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
// // //                     className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
// // //                     style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
// // //                     Email *
// // //                   </label>
// // //                   <input
// // //                     type="email"
// // //                     value={formData.email}
// // //                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// // //                     className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
// // //                     style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
// // //                     Téléphone (WhatsApp) *
// // //                   </label>
// // //                   <input
// // //                     type="tel"
// // //                     value={formData.tel}
// // //                     onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
// // //                     placeholder="+237 6XX XXX XXX"
// // //                     className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
// // //                     style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
// // //                     Nom du projet *
// // //                   </label>
// // //                   <input
// // //                     type="text"
// // //                     value={formData.nom_projet}
// // //                     onChange={(e) => setFormData({ ...formData, nom_projet: e.target.value })}
// // //                     className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
// // //                     style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
// // //                     Description du projet *
// // //                   </label>
// // //                   <textarea
// // //                     value={formData.description}
// // //                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // //                     rows={4}
// // //                     placeholder="Décrivez votre projet, votre équipe, et ce que vous recherchez..."
// // //                     className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
// // //                     style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <div className="flex gap-3 pt-4">
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setShowModal(false)}
// // //                     className="flex-1 px-4 py-2 rounded-lg border transition-colors"
// // //                     style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
// // //                   >
// // //                     Annuler
// // //                   </button>
// // //                   <button
// // //                     type="submit"
// // //                     disabled={submitting}
// // //                     className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
// // //                     style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
// // //                   >
// // //                     {submitting ? 'Envoi...' : 'Soumettre ma candidature'}
// // //                   </button>
// // //                 </div>
// // //               </form>
// // //             )}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }


// import { useTranslation } from 'react-i18next'
// import { Lightbulb, Users, TrendingUp, Target, Rocket, Network, ArrowRight } from 'lucide-react'
// import { useContent, useSettings } from '../hooks/usecontet'

// const iconMap = {
//   'Mentorat d\'Expert': Users,
//   'Expert Mentorship': Users,
//   'Réseau Puissant': Network,
//   'Powerful Network': Network,
//   'Ressources de Croissance': TrendingUp,
//   'Growth Resources': TrendingUp,
//   'Accès au Marché': Target,
//   'Market Access': Target,
//   'Opportunités de Financement': Rocket,
//   'Funding Opportunities': Rocket,
//   'Support à l\'Innovation': Lightbulb,
//   'Innovation Support': Lightbulb,
// }

// export default function IncubatorPage() {
//   const { t } = useTranslation()
//   const { get } = useContent('incubator')
//   const { setting } = useSettings()

//   const waIncubator = setting('whatsapp_general', '237678111022')
//   const waInvestors = setting('whatsapp_investors', waIncubator)

//   const benefits = t('incubator.benefits.items', { returnObjects: true })
//   const programPhases = t('incubator.program.phases', { returnObjects: true })

//   return (
//     <div className="pt-16 lg:pt-20">
//       {/* Hero */}
//       <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//                 style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//                 {t('incubator.hero.badge')}
//               </div>
//               <h1 className="text-3xl md:text-5xl lg:text-4xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//                 {get('hero_title', (
//                   <>
//                     {t('incubator.hero.title_prefix')}{' '}
                    
//                   </>
//                 ))}
//               </h1>
//               <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//                 {get('description', t('incubator.hero.description'))}
//               </p>
//               <div className="mt-8">
//                 <a href={`https://wa.me/${waIncubator}?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub`}
//                   target="_blank" rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105"
//                   style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//                   {t('incubator.hero.cta_button')} <ArrowRight className="h-5 w-5" />
//                 </a>
//               </div>
//             </div>
//             <div className="relative">
//               <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
//                 <img src="maletravail.jpeg"
//                   alt="Équipe startup" className="w-full h-full object-cover" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Programme */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
//               {t('incubator.program.title')}
//             </h2>
//             <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>
//               {t('incubator.program.subtitle')}
//             </p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//             {programPhases.map((phase) => (
//               <div key={phase.phase} className="rounded-2xl p-8 text-center border"
//                 style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                 <div className="text-4xl font-bold mb-4" style={{ color: 'var(--primary)' }}>{phase.phase}</div>
//                 <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{phase.title}</h3>
//                 <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{phase.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Bénéfices */}
//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
//               {t('incubator.benefits.title')}
//             </h2>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {benefits.map((b) => {
//               const Icon = iconMap[b.title] || Lightbulb
//               return (
//                 <div key={b.title} className="p-6 rounded-xl border"
//                   style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                   <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
//                     style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                     <Icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
//                   </div>
//                   <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{b.title}</h3>
//                   <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{b.description}</p>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Malea Invest Club */}
//       <section id="investors" className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 relative overflow-hidden border"
//             style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
//             <TrendingUp className="h-12 w-12 mx-auto mb-6" style={{ color: 'var(--primary)' }} />
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
//               {t('incubator.invest_club.title')}
//             </h2>
//             <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>
//               {get('invest_club', t('incubator.invest_club.description'))}
//             </p>
//             <a href={`https://wa.me/${waInvestors}?text=Bonjour, je souhaite rejoindre le Malea Invest Club`}
//               target="_blank" rel="noopener noreferrer"
//               className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
//               style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//               {t('incubator.invest_club.button')} <ArrowRight className="h-5 w-5" />
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }




import React from 'react';
import { ArrowRight, Rocket, Users, TrendingUp, Lightbulb, Target, Award, Zap, Calendar, CheckCircle } from 'lucide-react';
import { useContent, useSettings } from '../hooks/usecontet';

const iconMap = {
  'Accompagnement': Users,
  'Mentorat': Lightbulb,
  'Financement': TrendingUp,
  'Réseau': Users,
  'Formation': Award,
  'Visibilité': Target,
  'Accélération': Zap,
};

export default function IncubatorPage() {
  // Récupère les blocs dynamiques pour la page 'incubator'
  const { get, getMedia, getText, getJSON, getTheme } = useContent('incubator');
  const { setting } = useSettings();
  const theme = getTheme();

  // -- Valeurs provenant du ContentManager / Settings --
  const waLocation = setting('whatsapp_investors', setting('whatsapp_general', '237678111022'));

  // Hero section
  const heroBadge = get('hero_badge', 'Programme d\'accompagnement');
  const heroTitlePrefix = get('hero_title_prefix', 'Rejoignez');
  const heroTitleHighlight = get('hero_title_highlight', 'l\'incubateur');
  const heroTitleSuffix = get('hero_title_suffix', 'de Malea Hub');
  const heroDescription = get('hero_description', 'Un programme d\'accompagnement intensif pour transformer votre idée en startup à succès');
  const ctaButton = get('cta_button', 'Postuler maintenant');
  const ctaMessage = get('cta_message', 'Bonjour, je souhaite postuler à l\'incubateur');

  // Program section
  const programTitle = get('program_title', 'Notre programme d\'accompagnement');
  const programSubtitle = get('program_subtitle', 'Un parcours sur mesure pour les startups innovantes');
  const programFeatures = getJSON('program_features', [
    { title: 'Accompagnement personnalisé', description: 'Mentorat par des experts du secteur' },
    { title: 'Financement', description: 'Accès à notre réseau d\'investisseurs' },
    { title: 'Formation continue', description: 'Ateliers et masterclasses mensuels' },
    { title: 'Visibilité', description: 'Mise en relation avec les médias' },
  ]);

  // Benefits section
  const benefitsTitle = get('benefits_title', 'Pourquoi rejoindre notre incubateur ?');
  const benefitsSubtitle = get('benefits_subtitle', 'Les clés de votre réussite');
  const benefits = getJSON('benefits_items', [
    { title: 'Accès exclusif', description: 'Bénéficiez d\'un accompagnement privilégié' },
    { title: 'Réseau d\'influence', description: 'Rencontrez des experts et investisseurs' },
    { title: 'Espaces dédiés', description: 'Coworking et laboratoires à disposition' },
  ]);

  // Stats section
  const statsTitle = get('stats_title', 'Ils nous font confiance');
  const stats = getJSON('stats_items', [
    { value: '50+', label: 'Startups accompagnées' },
    { value: '10M FCFA', label: 'Levés de fonds' },
    { value: '95%', label: 'Taux de satisfaction' },
    { value: '30+', label: 'Mentors experts' },
  ]);

  // Invest Club section
  const investClubBadge = get('invest_club_badge', 'Malea Invest Club');
  const investClubTitlePrefix = get('invest_club_title_prefix', 'Rejoignez le');
  const investClubTitleHighlight = get('invest_club_title_highlight', 'Malea Invest Club');
  const investClubDescription = get('invest_club_description', getText('invest_club', 'Devenez investisseur et participez à l\'aventure des startups de demain'));
  const investClubCta = get('invest_club_cta', 'Devenir investisseur');
  const investClubMessage = get('invest_club_message', 'Bonjour, je souhaite rejoindre le Malea Invest Club');
  const investClubImage = getMedia('invest_club_image');

  // Application section
  const applicationTitle = get('application_title', 'Prêt à rejoindre l\'aventure ?');
  const applicationDescription = get('application_description', 'Postulez dès maintenant et faites décoller votre projet');
  const applicationButton = get('application_button', 'Postuler');
  const applicationMessage = get('application_message', 'Bonjour, je souhaite postuler à l\'incubateur');

  // Hero image
  const heroImageUrl = getMedia('hero_image') || '/maleblan.jpeg';

  // Helper pour générer une URL complète
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
      {/* Hero section */}
      <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 5%, transparent), transparent)` }} />
        
        {heroImageUrl && (
          <div className="absolute inset-0 opacity-20 z-0">
            <img src={getFullImageUrl(heroImageUrl)} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg md:text-xl font-medium mb-6"
                style={{
                  borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`,
                  backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`,
                  color: theme?.primaryColor || 'var(--primary)',
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
              <div className="mt-8">
                <a
                  href={`https://wa.me/${waLocation}?text=${encodeURIComponent(ctaMessage)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
                >
                  {ctaButton} <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="relative order-2 lg:order-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={getFullImageUrl(heroImageUrl)}
                  alt="Incubateur Malea Hub"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = '/maleblan.jpeg'; }}
                />
                <div className="absolute inset-0 rounded-2xl border-2" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 20%, transparent)` }} />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border rounded-2xl -z-10" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)` }} />
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl -z-10" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Program section */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {programTitle}
            </h2>
            <p className="mt-4" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {programSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programFeatures.map((feature, index) => {
              const Icon = iconMap[feature.title] || Rocket;
              return (
                <div key={feature.title || index} className="text-center p-6 rounded-xl border transition-all hover:shadow-lg"
                  style={{ backgroundColor: theme?.cardColor || 'var(--card)', borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)` }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
                    <Icon className="h-8 w-8" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{feature.title}</h3>
                  <p className="text-sm" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {benefitsTitle}
            </h2>
            <p className="mt-4" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {benefitsSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={benefit.title || index} className="flex items-start gap-4 p-6 rounded-xl border"
                style={{ backgroundColor: theme?.backgroundColor || 'var(--background)', borderColor: `color-mix(in oklch, ${theme?.borderColor || 'var(--border)'} 50%, transparent)` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }}>
                  <CheckCircle className="h-6 w-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: theme?.foregroundColor || 'var(--foreground)' }}>{benefit.title}</h3>
                  <p className="text-sm mt-1" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
            {statsTitle}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={stat.label || index} className="text-center p-6 rounded-xl border"
                style={{ backgroundColor: theme?.cardColor || 'var(--card)', borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 20%, transparent)` }}>
                <div className="text-3xl lg:text-4xl font-bold" style={{ color: theme?.primaryColor || 'var(--primary)' }}>{stat.value}</div>
                <div className="text-sm mt-2" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invest Club section */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.cardColor || 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg md:text-xl font-medium mb-6"
                style={{
                  borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`,
                  backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)`,
                  color: theme?.primaryColor || 'var(--primary)',
                }}
              >
                {investClubBadge}
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
                {investClubTitlePrefix}{' '}
                <span style={{ color: theme?.primaryColor || 'var(--primary)' }}>{investClubTitleHighlight}</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
                {investClubDescription}
              </p>
              <div className="mt-8">
                <a
                  href={`https://wa.me/${waLocation}?text=${encodeURIComponent(investClubMessage)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
                >
                  {investClubCta} <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={getFullImageUrl(investClubImage) || '/maleblan.jpeg'}
                  alt="Malea Invest Club"
                  className="w-full h-auto object-cover rounded-2xl"
                  onError={(e) => { e.currentTarget.src = '/maleblan.jpeg'; }}
                />
                <div className="absolute inset-0 rounded-2xl border-2" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 20%, transparent)` }} />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl -z-10" style={{ backgroundColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 10%, transparent)` }} />
              <div className="absolute -top-6 -right-6 w-32 h-32 border rounded-2xl -z-10" style={{ borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Application CTA section */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: theme?.backgroundColor || 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border transition-all hover:shadow-xl"
            style={{ 
              backgroundColor: theme?.cardColor || 'var(--card)', 
              borderColor: `color-mix(in oklch, ${theme?.primaryColor || 'var(--primary)'} 30%, transparent)`
            }}>
            <Rocket className="h-12 w-12 mx-auto mb-6" style={{ color: theme?.primaryColor || 'var(--primary)' }} />
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme?.foregroundColor || 'var(--foreground)', fontFamily: theme?.fontHeading || 'Inter' }}>
              {applicationTitle}
            </h2>
            <p className="mt-4 text-lg" style={{ color: theme?.mutedForegroundColor || 'var(--muted-foreground)' }}>
              {applicationDescription}
            </p>
            <div className="mt-8">
              <a
                href={`https://wa.me/${waLocation}?text=${encodeURIComponent(applicationMessage)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: theme?.primaryColor || 'var(--primary)', color: '#FFFFFF' }}
              >
                {applicationButton} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}