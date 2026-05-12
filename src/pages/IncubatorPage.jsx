// import { Lightbulb, Users, TrendingUp, Target, Rocket, Network, ArrowRight, Calendar } from 'lucide-react'

// const benefits = [
//   { icon: Users, title: 'Expert Mentorship', description: 'Access to experienced entrepreneurs and industry experts who guide your journey' },
//   { icon: Network, title: 'Strong Network', description: 'Connect with investors, partners, and fellow entrepreneurs' },
//   { icon: TrendingUp, title: 'Growth Resources', description: 'Tools, workshops, and resources to accelerate your business' },
//   { icon: Target, title: 'Market Access', description: 'Connections to local and international markets' },
//   { icon: Rocket, title: 'Funding Opportunities', description: 'Access to our investor network and pitch events' },
//   { icon: Lightbulb, title: 'Innovation Support', description: 'Technical and strategic support for product development' },
// ]

// const programPhases = [
//   { phase: '01', title: 'Ideation', description: 'Validate your idea and develop your business model' },
//   { phase: '02', title: 'Development', description: 'Build your MVP and test with real customers' },
//   { phase: '03', title: 'Growth', description: 'Scale your business and secure funding' },
// ]

// export default function IncubatorPage() {
//   return (
//     <div className="pt-16 lg:pt-20">
//       <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//                 style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//                 Programme d&apos;Incubation
//               </div>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//                 Join the <span style={{ color: 'var(--primary)' }}>incubator</span>
//               </h1>
//               <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//                 Structure, develop and launch your project with the support of experienced mentors and access to a powerful network of investors.
//               </p>
//               <div className="mt-8">
//                 <a href="https://wa.me/237600000000?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
//                   target="_blank" rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
//                   style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//                   Join the incubator <ArrowRight className="h-5 w-5" />
//                 </a>
//               </div>
//             </div>
//             <div className="relative">
//               <div className="aspect-[4/3] rounded-2xl overflow-hidden">
//                 <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="Startup team working" className="w-full h-full object-cover" />
//               </div>
//               <div className="absolute -bottom-4 -left-4 w-24 h-24 border rounded-2xl -z-10" style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }} />
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Our Incubation Journey</h2>
//             <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>A structured program to take you from idea to successful business</p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             {programPhases.map((phase, index) => (
//               <div key={phase.phase} className="relative">
//                 {index < programPhases.length - 1 && (
//                   <div className="hidden md:block absolute top-8 left-full w-full h-px -translate-x-1/2" style={{ background: 'linear-gradient(to right, color-mix(in oklch, var(--primary) 50%, transparent), transparent)' }} />
//                 )}
//                 <div className="rounded-2xl p-8 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                   <div className="text-4xl font-bold mb-4" style={{ color: 'var(--primary)' }}>{phase.phase}</div>
//                   <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{phase.title}</h3>
//                   <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{phase.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Why join our incubator?</h2>
//             <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>Everything you need to build and scale your startup</p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {benefits.map((benefit) => (
//               <div key={benefit.title} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                   <benefit.icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
//                 </div>
//                 <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{benefit.title}</h3>
//                 <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{benefit.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section id="investors" className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 relative overflow-hidden border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
//             <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 rounded-tl-2xl" style={{ borderColor: 'color-mix(in oklch, var(--primary) 50%, transparent)' }} />
//             <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 rounded-br-2xl" style={{ borderColor: 'color-mix(in oklch, var(--primary) 50%, transparent)' }} />
//             <TrendingUp className="h-12 w-12 mx-auto mb-6" style={{ color: 'var(--primary)' }} />
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Join the Malea Invest Club</h2>
//             <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>Are you an investor looking for promising startups in Cameroon?</p>
//             <a href="https://wa.me/237600000000?text=Bonjour, je souhaite rejoindre le Malea Invest Club"
//               target="_blank" rel="noopener noreferrer"
//               className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
//               style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//               Contact via WhatsApp <ArrowRight className="h-5 w-5" />
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


import { useState } from 'react';
import { Lightbulb, Users, TrendingUp, Target, Rocket, Network, ArrowRight, Calendar, X, Check } from 'lucide-react';
import { candidaturesAPI } from '../services/client';

const benefits = [
  { icon: Users, title: 'Expert Mentorship', description: 'Access to experienced entrepreneurs and industry experts who guide your journey' },
  { icon: Network, title: 'Strong Network', description: 'Connect with investors, partners, and fellow entrepreneurs' },
  { icon: TrendingUp, title: 'Growth Resources', description: 'Tools, workshops, and resources to accelerate your business' },
  { icon: Target, title: 'Market Access', description: 'Connections to local and international markets' },
  { icon: Rocket, title: 'Funding Opportunities', description: 'Access to our investor network and pitch events' },
  { icon: Lightbulb, title: 'Innovation Support', description: 'Technical and strategic support for product development' },
];

const programPhases = [
  { phase: '01', title: 'Ideation', description: 'Validate your idea and develop your business model' },
  { phase: '02', title: 'Development', description: 'Build your MVP and test with real customers' },
  { phase: '03', title: 'Growth', description: 'Scale your business and secure funding' },
];

export default function IncubatorPage() {
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    tel: '',
    nom_projet: '',
    description: '',
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSubmitting(true);
  //   setSuccessMessage('');

  //   try {
  //     await candidaturesAPI.submit(formData);
  //     setSuccessMessage('Candidature soumise avec succès ! Nous vous contacterons sous 48h.');
  //     setFormData({ nom: '', email: '', tel: '', nom_projet: '', description: '' });
  //     setTimeout(() => {
  //       setShowModal(false);
  //       setSuccessMessage('');
  //     }, 3000);
  //   } catch (error) {
  //     const message = error.response?.data?.message || 'Erreur lors de la soumission';
  //     alert(message);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  setSuccessMessage('');

  // Afficher les données envoyées
  console.log('Données envoyées:', formData);

  try {
    const response = await candidaturesAPI.submit(formData);
    console.log('Réponse du serveur:', response.data);
    setSuccessMessage('Candidature soumise avec succès ! Nous vous contacterons sous 48h.');
    setFormData({ nom: '', email: '', tel: '', nom_projet: '', description: '' });
    setTimeout(() => {
      setShowModal(false);
      setSuccessMessage('');
    }, 3000);
  } catch (error) {
    console.error('Erreur complète:', error);
    console.error('Response data:', error.response?.data);
    console.error('Status:', error.response?.status);
    
    // Afficher le message d'erreur détaillé
    const message = error.response?.data?.message || error.message || 'Erreur lors de la soumission';
    alert(`Erreur: ${message}`);
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
                style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
                Programme d'Incubation
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
                Join the <span style={{ color: 'var(--primary)' }}>incubator</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Structure, develop and launch your project with the support of experienced mentors and access to a powerful network of investors.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  Join the incubator <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="Startup team working" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border rounded-2xl -z-10" style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Program Phases */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Our Incubation Journey</h2>
            <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>A structured program to take you from idea to successful business</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {programPhases.map((phase, index) => (
              <div key={phase.phase} className="relative">
                {index < programPhases.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px -translate-x-1/2" style={{ background: 'linear-gradient(to right, color-mix(in oklch, var(--primary) 50%, transparent), transparent)' }} />
                )}
                <div className="rounded-2xl p-8 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                  <div className="text-4xl font-bold mb-4" style={{ color: 'var(--primary)' }}>{phase.phase}</div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{phase.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Why join our incubator?</h2>
            <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>Everything you need to build and scale your startup</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                  <benefit.icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{benefit.title}</h3>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invest Club */}
      <section id="investors" className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl p-8 lg:p-12 relative overflow-hidden border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 rounded-tl-2xl" style={{ borderColor: 'color-mix(in oklch, var(--primary) 50%, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 rounded-br-2xl" style={{ borderColor: 'color-mix(in oklch, var(--primary) 50%, transparent)' }} />
            <TrendingUp className="h-12 w-12 mx-auto mb-6" style={{ color: 'var(--primary)' }} />
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Join the Malea Invest Club</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>Are you an investor looking for promising startups in Cameroon?</p>
            <a href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre le Malea Invest Club"
              target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              Contact via WhatsApp <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Modal de candidature */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--card)' }}>
            <div className="sticky top-0 flex justify-between items-center p-5 border-b" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                Candidature à l'incubateur
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
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
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
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Nom du projet *
                  </label>
                  <input
                    type="text"
                    value={formData.nom_projet}
                    onChange={(e) => setFormData({ ...formData, nom_projet: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Description du projet *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    placeholder="Décrivez votre projet, votre équipe, et ce que vous recherchez..."
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    required
                  />
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
                    {submitting ? 'Envoi...' : 'Soumettre ma candidature'}
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