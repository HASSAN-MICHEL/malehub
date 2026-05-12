// import { useState } from 'react'
// import { MapPin, Mail, Phone, Send, ArrowRight  } from 'lucide-react';
// import { SiInstagram } from 'react-icons/si';
// import {contactAPI} from '../services/client.js';

// const contactInfo = [
//   { icon: MapPin, title: 'Location', value: 'Bonapriso, Douala', href: 'https://maps.google.com/?q=2PH2+X7X,rue koloko bonapriso,immeubesciDouala,Cameroon' },
//   { icon: Mail, title: 'Email', value: ' info@maleahub.com', href: 'mailto: info@maleahub.com' },
//   { icon: SiInstagram, title: 'Instagram', value: '@maleahub', href: 'https://instagram.com/maleahub' },
 
//   { icon: Phone, title: 'WhatsApp', value: '+237 678111022', href: 'https://wa.me/237678111022' },
// ]

// export default function ContactPage() {
//   const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })


// // Dans le composant, remplacer handleSubmit par :
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setSubmitting(true);
//   setSubmitError('');
//   setSubmitSuccess('');

//   try {
//     await contactAPI.submit({
//       nom: formData.name,
//       email: formData.email,
//       objet: formData.subject,
//       message: formData.message,
//       source: 'site_web',
//     });
    
//     setSubmitSuccess('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
//     setFormData({ name: '', email: '', subject: '', message: '' });
    
//     setTimeout(() => setSubmitSuccess(''), 5000);
//   } catch (error) {
//     console.error('Error submitting contact:', error);
//     setSubmitError('Une erreur est survenue. Veuillez réessayer via WhatsApp.');
//   } finally {
//     setSubmitting(false);
//   }
// };

//   return (
//     <div className="pt-16 lg:pt-20">
//       <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//               style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//               Contactez-nous
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//               Let&apos;s <span style={{ color: 'var(--primary)' }}>connect</span>
//             </h1>
//             <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//               Have questions? Want to visit our space? We&apos;d love to hear from you.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12">
//             <div>
//               <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>Info</h2>
//               <div className="grid sm:grid-cols-2 gap-4 mb-8">
//                 {contactInfo.map((info) => (
//                   <a key={info.title} href={info.href} target="_blank" rel="noopener noreferrer"
//                     className="flex items-start gap-4 p-6 rounded-xl border transition-colors group"
//                     style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                     <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                       <info.icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
//                     </div>
//                     <div>
//                       <h3 className="font-medium" style={{ color: 'var(--foreground)' }}>{info.title}</h3>
//                       <p className="text-sm mt-1 transition-colors" style={{ color: 'var(--muted-foreground)' }}>{info.value}</p>
//                     </div>
//                   </a>
//                 ))}
//               </div>
//               <div className="rounded-2xl p-6 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
//                 <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Prefer WhatsApp?</h3>
//                 <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>Get instant replies on WhatsApp</p>
//                 <a href="https://wa.me/237678111022?text=Bonjour, je souhaite en savoir plus sur Malea Hub"
//                   target="_blank" rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
//                   style={{ backgroundColor: '#25D366', color: 'white' }}>
//                   Chat on WhatsApp <ArrowRight className="h-5 w-5" />
//                 </a>
//               </div>
//             </div>

//             <div>
//               <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>Send us a message</h2>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Your Name</label>
//                     <input type="text" placeholder="John Doe" required style={inputStyle}
//                       value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Email Address</label>
//                     <input type="email" placeholder="john@example.com" required style={inputStyle}
//                       value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Subject</label>
//                   <input type="text" placeholder="How can we help?" required style={inputStyle}
//                     value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Message</label>
//                   <textarea placeholder="Tell us more about your inquiry..." required rows={5}
//                     style={{ ...inputStyle, resize: 'none' }}
//                     value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
//                 </div>
//                 <button type="submit"
//                   className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-opacity hover:opacity-90"
//                   style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//                   Send via WhatsApp <Send className="h-5 w-5" />
//                 </button>
//                 <p className="text-xs text-center" style={{ color: 'var(--muted-foreground)' }}>
//                   Your message will be sent directly to our WhatsApp for fastest response.
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Find us</h2>
//             <p className="mt-2" style={{ color: 'var(--muted-foreground)' }}>Bonapriso, Douala, Cameroon</p>
//           </div>
//           <div className="rounded-2xl overflow-hidden border flex items-center justify-center" style={{ aspectRatio: '16/7', backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//             <div className="text-center p-8">
//               <MapPin className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
//               <p className="font-medium" style={{ color: 'var(--foreground)' }}>Malea Hub</p>
//               <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Bonapriso, Douala, Cameroon</p>
//               <a href="https://maps.google.com/?q=Bonapriso,Douala,Cameroon" target="_blank" rel="noopener noreferrer"
//                 className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors"
//                 style={{ borderColor: 'color-mix(in oklch, var(--primary) 50%, transparent)', color: 'var(--foreground)' }}>
//                 Open in Google Maps
//               </a>
//             </div>
//           </div>
         

//         </div>
//       </section>
//     </div>
//   )
// }


import { useState } from 'react';
import { MapPin, Mail, Phone, Send, ArrowRight } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';
import { contactAPI } from '../services/client';

const contactInfo = [
  { icon: MapPin, title: 'Location', value: 'Bonapriso, Douala', href: 'https://maps.google.com/?q=2PH2+X7X,rue koloko bonapriso,immeubesciDouala,Cameroon' },
  { icon: Mail, title: 'Email', value: 'info@maleahub.com', href: 'mailto:info@maleahub.com' },
  { icon: SiInstagram, title: 'Instagram', value: '@maleahub', href: 'https://instagram.com/maleahub' },
  { icon: Phone, title: 'WhatsApp', value: '+237 678111022', href: 'https://wa.me/237678111022' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitSuccess('');
    setSubmitError('');

    try {
      // Envoyer les données à l'API backend
      const response = await contactAPI.submit({
        nom: formData.name,
        email: formData.email,
        objet: formData.subject,
        message: formData.message,
        source: 'site_web',
      });
      
      console.log('Message envoyé avec succès:', response.data);
      setSubmitSuccess('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Effacer le message de succès après 5 secondes
      setTimeout(() => setSubmitSuccess(''), 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      console.error('Détails:', error.response?.data);
      setSubmitError(error.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)',
    backgroundColor: 'var(--card)',
    color: 'var(--foreground)',
    fontSize: '14px',
    outline: 'none',
  };

  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
              style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
              Contactez-nous
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              Let's <span style={{ color: 'var(--primary)' }}>connect</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Have questions? Want to visit our space? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>Info</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {contactInfo.map((info) => (
                  <a key={info.title} href={info.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-4 p-6 rounded-xl border transition-colors group"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                      <info.icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: 'var(--foreground)' }}>{info.title}</h3>
                      <p className="text-sm mt-1 transition-colors" style={{ color: 'var(--muted-foreground)' }}>{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="rounded-2xl p-6 text-center border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)' }}>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Prefer WhatsApp?</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>Get instant replies on WhatsApp</p>
                <a href="https://wa.me/237678111022?text=Bonjour, je souhaite en savoir plus sur Malea Hub"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#25D366', color: 'white' }}>
                  Chat on WhatsApp <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>Send us a message</h2>
              
              {submitSuccess && (
                <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 text-sm">
                  {submitSuccess}
                </div>
              )}
              
              {submitError && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm">
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                      Your Name *
                    </label>
                    <input 
                      type="text" 
                      placeholder="VOTRE NOM" 
                      required 
                      style={inputStyle}
                      value={formData.name} 
                      onChange={e => setFormData({ ...formData, name: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      placeholder="mon.email@.com" 
                      required 
                      style={inputStyle}
                      value={formData.email} 
                      onChange={e => setFormData({ ...formData, email: e.target.value })} 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                    Subject *
                  </label>
                  <input 
                    type="text" 
                    placeholder="Votre raison?" 
                    required 
                    style={inputStyle}
                    value={formData.subject} 
                    onChange={e => setFormData({ ...formData, subject: e.target.value })} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                    Message *
                  </label>
                  <textarea 
                    placeholder="Tell us more about your inquiry..." 
                    required 
                    rows={5}
                    style={{ ...inputStyle, resize: 'none' }}
                    value={formData.message} 
                    onChange={e => setFormData({ ...formData, message: e.target.value })} 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  {submitting ? 'Envoi en cours...' : 'Send message'} <Send className="h-5 w-5" />
                </button>
                <p className="text-xs text-center" style={{ color: 'var(--muted-foreground)' }}>
                  Your message will be sent to our team. We'll respond as soon as possible.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="rounded-2xl overflow-hidden border flex items-center justify-center" style={{ aspectRatio: '16/7', backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
            <div className="text-center p-8">
              <MapPin className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
              <p className="font-medium" style={{ color: 'var(--foreground)' }}>Malea Hub</p>
              <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Bonapriso, Douala, Cameroon</p>
              <a href="https://maps.google.com/?q=2PH2+X7X,rue koloko bonapriso,immeubesciDouala,Cameroon" target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors"
                style={{ borderColor: 'color-mix(in oklch, var(--primary) 50%, transparent)', color: 'var(--foreground)' }}>
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}