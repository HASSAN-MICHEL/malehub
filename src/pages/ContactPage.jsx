

// import { useState } from 'react'
// import { MapPin, Mail, Phone, Send, ArrowRight } from 'lucide-react';
// import { SiInstagram } from 'react-icons/si';
// import { contactAPI } from '../services/client.js';

// const contactInfo = [
//   { icon: MapPin, title: 'Location', value: 'Bonapriso, Douala', href: 'https://maps.google.com/?q=2PH2+X7X,rue koloko bonapriso,immeubesciDouala,Cameroon' },
//   { icon: Mail, title: 'Email', value: 'info@maleahub.com', href: 'mailto:info@maleahub.com' },
//   { icon: SiInstagram, title: 'Instagram', value: '@maleahub', href: 'https://instagram.com/maleahub' },
//   { icon: Phone, title: 'WhatsApp', value: '+237 678 11 10 22', href: 'https://wa.me/237678111022' },
// ];

// const inputStyle = {
//   width: '100%',
//   padding: '0.75rem 1rem',
//   borderRadius: '0.5rem',
//   border: '1px solid color-mix(in oklch, var(--border) 50%, transparent)',
//   backgroundColor: 'var(--background)',
//   color: 'var(--foreground)',
//   outline: 'none',
// }

// export default function ContactPage() {
//   const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
//   const [submitting, setSubmitting] = useState(false)
//   const [submitSuccess, setSubmitSuccess] = useState('')
//   const [submitError, setSubmitError] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setSubmitError('');
//     setSubmitSuccess('');

//     try {
//       await contactAPI.submit({
//         nom: formData.name,
//         email: formData.email,
//         objet: formData.subject,
//         message: formData.message,
//         source: 'site_web',
//       });
      
//       setSubmitSuccess('Message envoyé avec succès !');
//       setFormData({ name: '', email: '', subject: '', message: '' });
//       setTimeout(() => setSubmitSuccess(''), 5000);
//     } catch (error) {
//       setSubmitError('Erreur lors de l\'envoi. Essayez via WhatsApp.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="pt-16 lg:pt-20">
//       {/* Hero Section - Espacement réduit */}
//       <section className="relative py-12 lg:py-16 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-4"
//               style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//               Contactez-nous
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//               Restons en <span style={{ color: 'var(--primary)' }}>contact</span>
//             </h1>
//             <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>
//               Une question ? Envie de visiter Malea Hub ? Nous sommes à votre écoute.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="grid lg:grid-cols-5 gap-12">
            
//             {/* Colonne Info - 2/5 de la largeur */}
//             <div className="lg:col-span-2 space-y-6">
//               <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Nos Coordonnées</h2>
//               <div className="grid gap-4">
//                 {contactInfo.map((info) => (
//                   <a key={info.title} href={info.href} target="_blank" rel="noopener noreferrer"
//                     className="flex items-center gap-4 p-4 rounded-xl border transition-all hover:border-[var(--primary)] group"
//                     style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                     <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                       <info.icon className="h-5 w-5" style={{ color: 'var(--primary)' }} />
//                     </div>
//                     <div>
//                       <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{info.title}</h3>
//                       <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{info.value}</p>
//                     </div>
//                   </a>
//                 ))}
//               </div>
              
//               <div className="rounded-2xl p-6 border text-center" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 5%, transparent)', borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }}>
//                 <p className="text-sm font-medium mb-4">Besoin d'une réponse rapide ?</p>
//                 <a href="https://wa.me/237678111022" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-transform hover:scale-105" style={{ backgroundColor: '#25D366' }}>
//                   Chatter sur WhatsApp <ArrowRight className="h-5 w-5" />
//                 </a>
//               </div>
//             </div>

//             {/* Formulaire - 3/5 de la largeur */}
//             <div className="lg:col-span-3">
//               <div className="p-8 rounded-2xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                 <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Envoyez un message</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="grid sm:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-1.5">Nom complet</label>
//                       <input type="text" placeholder="John Doe" required style={inputStyle}
//                         value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1.5">Adresse Email</label>
//                       <input type="email" placeholder="john@example.com" required style={inputStyle}
//                         value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1.5">Objet</label>
//                     <input type="text" placeholder="Comment pouvons-nous vous aider ?" required style={inputStyle}
//                       value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1.5">Message</label>
//                     <textarea placeholder="Votre message..." required rows={4}
//                       style={{ ...inputStyle, resize: 'none' }}
//                       value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
//                   </div>
//                   <button type="submit" disabled={submitting}
//                     className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-bold transition-all hover:opacity-90 disabled:opacity-50"
//                     style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//                     {submitting ? 'Envoi en cours...' : 'Envoyer le message'} <Send className="h-5 w-5" />
//                   </button>
//                   {submitSuccess && <p className="text-sm text-green-500 text-center font-medium">{submitSuccess}</p>}
//                   {submitError && <p className="text-sm text-red-500 text-center font-medium">{submitError}</p>}
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section Localisation avec Image de fond */}
//       <section className="py-12 lg:py-16">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="relative h-[400px] rounded-3xl overflow-hidden border shadow-2xl group" style={{ borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//             {/* L'image de fond (Plan de Douala / Map) */}
//             <img 
//               src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&q=80" 
//               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
//               alt="Plan de Douala"
//             />
//             {/* Overlay pour la lisibilité */}
//             <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            
//             {/* Contenu sur l'image */}
//             <div className="relative h-full flex flex-col items-center justify-center text-center p-6 text-white">
//               <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 shadow-xl animate-bounce">
//                 <MapPin className="h-8 w-8 text-white" />
//               </div>
//               <h2 className="text-3xl font-bold mb-2">Nous trouver</h2>
//               <p className="text-lg opacity-90 mb-6">Koloko, Bonapriso, Douala, Cameroun</p>
//               <a 
//                 href="https://maps.google.com/?q=Malea+Hub+Bonapriso" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="bg-white text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition-all shadow-lg"
//               >
//                 Ouvrir dans Google Maps <ArrowRight className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


import { useState } from 'react'
import { MapPin, Mail, Phone, Send, ArrowRight } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';

const contactInfo = [
  { icon: MapPin, title: 'Adresse', value: 'Bonapriso, Douala', href: 'https://maps.google.com/?q=Malea+Hub+Bonapriso' },
  { icon: Mail, title: 'Email', value: 'info@maleahub.com', href: 'mailto:info@maleahub.com' },
  { icon: SiInstagram, title: 'Instagram', value: '@maleahub', href: 'https://instagram.com/maleahub' },
  { icon: Phone, title: 'WhatsApp', value: '+237 678 11 10 22', href: 'https://wa.me/237678111022' },
];

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '0.5rem',
  border: '1px solid color-mix(in oklch, var(--border) 50%, transparent)',
  backgroundColor: 'var(--background)',
  color: 'var(--foreground)',
  outline: 'none',
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Construction du message WhatsApp formaté
    const phoneNumber = "237678111022";
    const text = `*Nouveau message Malea Hub*%0A%0A` +
                 `*Nom:* ${formData.name}%0A` +
                 `*Email:* ${formData.email}%0A` +
                 `*Objet:* ${formData.subject}%0A` +
                 `*Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

    // Ouverture de WhatsApp dans un nouvel onglet
    window.open(whatsappUrl, '_blank');
    
    setSubmitting(false);
    // Optionnel : Réinitialiser le formulaire après l'envoi
    // setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-4"
              style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
              Contactez-nous
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              Restons en <span style={{ color: 'var(--primary)' }}>contact</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Colonne Info */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Nos Coordonnées</h2>
              <div className="grid gap-4">
                {contactInfo.map((info) => (
                  <a key={info.title} href={info.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border transition-all hover:border-[var(--primary)] group"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                      <info.icon className="h-5 w-5" style={{ color: 'var(--primary)' }} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{info.title}</h3>
                      <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-3">
              <div className="p-8 rounded-2xl border shadow-sm" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Envoyer un message WhatsApp</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Nom complet</label>
                      <input type="text" placeholder="John Doe" required style={inputStyle}
                        value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Adresse Email</label>
                      <input type="email" placeholder="john@example.com" required style={inputStyle}
                        value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Objet</label>
                    <input type="text" placeholder="Quel est le sujet ?" required style={inputStyle}
                      value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Message</label>
                    <textarea placeholder="Décrivez votre besoin..." required rows={4}
                      style={{ ...inputStyle, resize: 'none' }}
                      value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-lg font-bold transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: '#25D366', color: 'white' }}>
                    <Phone className="h-5 w-5" /> {submitting ? 'Préparation...' : 'Envoyer via WhatsApp'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Localisation */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative h-[400px] rounded-3xl overflow-hidden border shadow-2xl group" style={{ borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&q=80" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Plan de Douala"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <div className="relative h-full flex flex-col items-center justify-center text-center p-6 text-white">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 shadow-xl animate-bounce">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Nous trouver</h2>
              <p className="text-lg opacity-90 mb-6">Koloko, Bonapriso, Douala, Cameroun</p>
              <a href="https://maps.google.com/?q=Malea+Hub+Bonapriso" target="_blank" rel="noopener noreferrer"
                className="bg-white text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition-all shadow-lg">
                Ouvrir dans Google Maps <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}