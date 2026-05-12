// import { GraduationCap, Check, Users, Clock, Award, FileText, Briefcase, ArrowRight, Mic } from 'lucide-react'

// const jobsWeekModules = [
//   { day: 'Day 1', title: 'CV & Cover Letter', description: 'Craft a compelling CV and cover letter that stand out' },
//   { day: 'Day 2', title: 'Personal Branding', description: 'Build your professional image and online presence' },
//   { day: 'Day 3', title: 'Interview Skills', description: 'Master common questions and body language' },
//   { day: 'Day 4', title: 'Mock Interviews', description: 'Practice with real scenarios and feedback' },
//   { day: 'Day 5', title: 'Job Matching', description: 'Connect with opportunities and employers' },
// ]

// const benefits = [
//   { icon: FileText, title: 'CV Optimization', description: 'Professional CV that gets noticed by recruiters' },
//   { icon: Users, title: 'Mock Interviews', description: 'Practice with expert feedback' },
//   { icon: Award, title: 'Certificate', description: 'Proof of completion for your portfolio' },
//   { icon: Briefcase, title: 'Job Access', description: 'Direct connections to employment opportunities' },
// ]

// export default function TrainingPage() {
//   return (
//     <div className="pt-16 lg:pt-20">
//       <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//               style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//               Formations Professionnelles
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//               Become <span style={{ color: 'var(--primary)' }}>job-ready</span> in 5 days
//             </h1>
//             <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//               Professional training programs designed to accelerate your career.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section id="jobs-week" className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-start">
//             <div>
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//                 style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//                 Programme Phare
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--foreground)' }}>Jobs Week</h2>
//               <p className="mt-2 text-xl font-medium" style={{ color: 'var(--primary)' }}>5-Day Intensive Program</p>
//               <p className="mt-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//                 An intensive program designed to transform you into a competitive job candidate. Learn from industry experts, practice real scenarios, and connect directly with employers.
//               </p>
//               <div className="mt-8 grid grid-cols-2 gap-4">
//                 {benefits.map((benefit) => (
//                   <div key={benefit.title} className="flex items-start gap-3">
//                     <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                       <benefit.icon className="h-5 w-5" style={{ color: 'var(--primary)' }} />
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>{benefit.title}</h4>
//                       <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>{benefit.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="rounded-2xl p-8 relative overflow-hidden border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
//               <div className="absolute top-0 right-0 text-xs font-bold px-4 py-2 rounded-bl-xl" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//                 10 SPOTS ONLY
//               </div>
//               <GraduationCap className="h-10 w-10 mb-6" style={{ color: 'var(--primary)' }} />
//               <div className="mb-6">
//                 <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Programme complet</span>
//                 <div className="mt-2 flex items-baseline gap-2">
//                   <span className="text-5xl font-bold" style={{ color: 'var(--foreground)' }}>30,000</span>
//                   <span className="text-xl" style={{ color: 'var(--muted-foreground)' }}>FCFA</span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-3 rounded-lg mb-6" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                 <Clock className="h-5 w-5" style={{ color: 'var(--primary)' }} />
//                 <span className="font-medium" style={{ color: 'var(--foreground)' }}>5 days intensive</span>
//               </div>
//               <ul className="space-y-3 mb-8">
//                 {['CV & personal branding', 'Interview preparation', 'Access to opportunities', 'Expert coaching', 'Certificate'].map((item) => (
//                   <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
//                     <Check className="h-4 w-4" style={{ color: 'var(--primary)' }} /> {item}
//                   </li>
//                 ))}
//               </ul>
//               <a href="https://wa.me/237600000000?text=Bonjour, je souhaite m'inscrire à Jobs Week (30,000 FCFA)"
//                 target="_blank" rel="noopener noreferrer"
//                 className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-opacity hover:opacity-90"
//                 style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//                 Register via WhatsApp <ArrowRight className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Program Overview</h2>
//             <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>A comprehensive 5-day journey to employment readiness</p>
//           </div>
//           <div className="max-w-3xl mx-auto space-y-4">
//             {jobsWeekModules.map((module, index) => (
//               <div key={module.day} className="flex items-center gap-6 p-6 rounded-xl border" style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                 <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
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

//       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
//             <Mic className="h-12 w-12 mx-auto mb-6" style={{ color: 'var(--primary)' }} />
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Are you a trainer or organization?</h2>
//             <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>Host your training programs at Malea Hub. Premium facilities, professional environment, and a motivated audience.</p>
//             <a href="https://wa.me/237600000000?text=Bonjour, je suis formateur et souhaite organiser une formation à Malea Hub"
//               target="_blank" rel="noopener noreferrer"
//               className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
//               style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//               Host your training at Malea Hub <ArrowRight className="h-5 w-5" />
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }



import { useState, useEffect } from 'react';
import { GraduationCap, Check, Users, Clock, Award, FileText, Briefcase, ArrowRight, Mic, X, Calendar, DollarSign } from 'lucide-react';
import { formationsAPI } from '../services/client';

const jobsWeekModules = [
  { day: 'Day 1', title: 'CV & Cover Letter', description: 'Craft a compelling CV and cover letter that stand out' },
  { day: 'Day 2', title: 'Personal Branding', description: 'Build your professional image and online presence' },
  { day: 'Day 3', title: 'Interview Skills', description: 'Master common questions and body language' },
  { day: 'Day 4', title: 'Mock Interviews', description: 'Practice with real scenarios and feedback' },
  { day: 'Day 5', title: 'Job Matching', description: 'Connect with opportunities and employers' },
];

const benefits = [
  { icon: FileText, title: 'CV Optimization', description: 'Professional CV that gets noticed by recruiters' },
  { icon: Users, title: 'Mock Interviews', description: 'Practice with expert feedback' },
  { icon: Award, title: 'Certificate', description: 'Proof of completion for your portfolio' },
  { icon: Briefcase, title: 'Job Access', description: 'Direct connections to employment opportunities' },
];

export default function TrainingPage() {
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
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
              style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
              Formations Professionnelles
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              Devenez <span style={{ color: 'var(--primary)' }}>opérationnel</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Des programmes de formation conçus pour accélérer votre carrière et développer vos compétences.
            </p>
          </div>
        </div>
      </section>

      {/* Jobs Week Section */}
      <section id="jobs-week" className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
                style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
                Programme Phare
              </div>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--foreground)' }}>Jobs Week</h2>
              <p className="mt-2 text-xl font-medium" style={{ color: 'var(--primary)' }}>Programme Intensif de 5 Jours</p>
              <p className="mt-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Un programme intensif conçu pour vous transformer en candidat compétitif. Apprenez auprès d'experts, pratiquez des scénarios réels et connectez-vous directement avec les employeurs.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                      <benefit.icon className="h-5 w-5" style={{ color: 'var(--primary)' }} />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>{benefit.title}</h4>
                      <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-8 relative overflow-hidden border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
              <div className="absolute top-0 right-0 text-xs font-bold px-4 py-2 rounded-bl-xl" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                10 PLACES SEULEMENT
              </div>
              <GraduationCap className="h-10 w-10 mb-6" style={{ color: 'var(--primary)' }} />
              <div className="mb-6">
                <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Programme complet</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-5xl font-bold" style={{ color: 'var(--foreground)' }}>30,000</span>
                  <span className="text-xl" style={{ color: 'var(--muted-foreground)' }}>FCFA</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg mb-6" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                <Clock className="h-5 w-5" style={{ color: 'var(--primary)' }} />
                <span className="font-medium" style={{ color: 'var(--foreground)' }}>5 jours intensifs</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['CV & personal branding', 'Préparation entretiens', 'Accès aux opportunités', 'Coaching expert', 'Certificat'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    <Check className="h-4 w-4" style={{ color: 'var(--primary)' }} /> {item}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/237600000000?text=Bonjour, je souhaite m'inscrire à Jobs Week (30,000 FCFA)"
                target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                S'inscrire via WhatsApp <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Formations Section */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Nos Formations</h2>
            <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>
              Des programmes conçus par des experts pour vous aider à atteindre vos objectifs
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : formations.length === 0 ? (
            <div className="text-center py-12">
              <p style={{ color: 'var(--muted-foreground)' }}>Aucune formation disponible pour le moment</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {formations.filter(f => f.statut_ouvert).map((formation) => (
                <div key={formation.id} className="rounded-2xl overflow-hidden border transition-all hover:shadow-lg" 
                  style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{formation.titre}</h3>
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                        <span style={{ color: 'var(--muted-foreground)' }}>{formatDate(formation.date_debut)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                        <span style={{ color: 'var(--muted-foreground)' }}>{formation.nb_places} places</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                        <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{formation.prix?.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>Programme :</h4>
                      <p className="text-sm line-clamp-3" style={{ color: 'var(--muted-foreground)' }}>{formation.programme}</p>
                    </div>
                    
                    {formation.benefices && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>Bénéfices :</h4>
                        <p className="text-sm line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>{formation.benefices}</p>
                      </div>
                    )}

                    <button
                      onClick={() => openInscriptionModal(formation)}
                      className="w-full py-3 rounded-lg font-semibold transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
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
      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Aperçu du Programme</h2>
            <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>Un parcours complet de 5 jours vers l'employabilité</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {jobsWeekModules.map((module, index) => (
              <div key={module.day} className="flex items-center gap-6 p-6 rounded-xl border" 
                style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" 
                  style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                  <span className="text-xl font-bold" style={{ color: 'var(--primary)' }}>{index + 1}</span>
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--primary)' }}>{module.day}</div>
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>{module.title}</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>{module.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 border" 
            style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
            <Mic className="h-12 w-12 mx-auto mb-6" style={{ color: 'var(--primary)' }} />
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Vous êtes formateur ou organisation ?</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>Organisez vos formations à Malea Hub. Des installations premium, un environnement professionnel et un public motivé.</p>
            <a href="https://wa.me/237600000000?text=Bonjour, je suis formateur et souhaite organiser une formation à Malea Hub"
              target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              Organisez votre formation <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Modal d'inscription */}
      {showModal && selectedFormation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--card)' }}>
            <div className="sticky top-0 flex justify-between items-center p-5 border-b" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                Inscription à : {selectedFormation.titre}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100/10">
                <X className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
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
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Téléphone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    value={formData.tel}
                    onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                    placeholder="+237 6XX XXX XXX"
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
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
                    style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                    style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
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