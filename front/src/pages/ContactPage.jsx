


// // import { useState } from 'react'
// // import { useTranslation } from 'react-i18next'
// // import { MapPin, Mail, Phone, Send, ArrowRight } from 'lucide-react'
// // import { SiInstagram } from 'react-icons/si'

// // const icons = {
// //   MapPin: MapPin,
// //   Mail: Mail,
// //   SiInstagram: SiInstagram,
// //   Phone: Phone,
// // }

// // export default function ContactPage() {
// //   const { t } = useTranslation()
// //   const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
// //   const [submitting, setSubmitting] = useState(false)

// //   const contactInfo = t('contact.info_items', { returnObjects: true });
// //   const contactHrefs = [
// //     'https://maps.google.com/?q=Malea+Hub+Bonapriso',
// //     'mailto:info@maleahub.com',
// //     'https://instagram.com/maleahub',
// //     'https://wa.me/237678111022',
// //   ]
// //   const contactIcons = [MapPin, Mail, SiInstagram, Phone]

// //   // Vérification que contactInfo est un tableau
// //   const contactInfoArray = Array.isArray(contactInfo) ? contactInfo : [];

// //   const inputStyle = {
// //     width: '100%',
// //     padding: '0.75rem 1rem',
// //     borderRadius: '0.5rem',
// //     border: '1px solid color-mix(in oklch, var(--border) 50%, transparent)',
// //     backgroundColor: 'var(--background)',
// //     color: 'var(--foreground)',
// //     outline: 'none',
// //   }

// //   const handleSubmit = (e) => {
// //     e.preventDefault()
// //     setSubmitting(true)

// //     const phoneNumber = "237678111022"
// //     const text = `*Nouveau message Malea Hub*%0A%0A` +
// //                  `*Nom:* ${formData.name}%0A` +
// //                  `*Email:* ${formData.email}%0A` +
// //                  `*Objet:* ${formData.subject}%0A` +
// //                  `*Message:* ${formData.message}`

// //     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`
// //     window.open(whatsappUrl, '_blank')
    
// //     setSubmitting(false)
// //   }

// //   return (
// //     <div className="pt-16 lg:pt-20">
// //       {/* Hero Section */}
// //       <section className="relative py-12 lg:py-16 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
// //         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
// //         <div className="container mx-auto px-4 lg:px-8 relative z-10">
// //           <div className="max-w-3xl">
// //             <div
// //               className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-4"
// //               style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
// //             >
// //               {t('contact.hero.badge')}
// //             </div>
// //             <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
// //               {t('contact.hero.title_prefix')}{' '}
// //               <span style={{ color: 'var(--primary)' }}>{t('contact.hero.title_highlight')}</span>
// //             </h1>
// //           </div>
// //         </div>
// //       </section>

// //       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
// //         <div className="container mx-auto px-4 lg:px-8">
// //           <div className="grid lg:grid-cols-5 gap-12">
            
// //             {/* Colonne Info */}
// //             <div className="lg:col-span-2 space-y-6">
// //               <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{t('contact.info_section.title')}</h2>
// //               <div className="grid gap-4">
// //                 {contactInfoArray.map((info, index) => {
// //                   const Icon = contactIcons[index % contactIcons.length]
// //                   return (
// //                     <a
// //                       key={info.title || index}
// //                       href={contactHrefs[index]}
// //                       target="_blank"
// //                       rel="noopener noreferrer"
// //                       className="flex items-center gap-4 p-4 rounded-xl border transition-all hover:border-[var(--primary)] group"
// //                       style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}
// //                     >
// //                       <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
// //                         <Icon className="h-5 w-5" style={{ color: 'var(--primary)' }} />
// //                       </div>
// //                       <div>
// //                         <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{info.title}</h3>
// //                         <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{info.value}</p>
// //                       </div>
// //                     </a>
// //                   )
// //                 })}
// //               </div>
// //             </div>

// //             {/* Formulaire */}
// //             <div className="lg:col-span-3">
// //               <div className="p-8 rounded-2xl border shadow-sm" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
// //                 <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>{t('contact.form.title')}</h2>
// //                 <form onSubmit={handleSubmit} className="space-y-4">
// //                   <div className="grid sm:grid-cols-2 gap-4">
// //                     <div>
// //                       <label className="block text-sm font-medium mb-1.5">{t('contact.form.name_label')}</label>
// //                       <input
// //                         type="text"
// //                         placeholder={t('contact.form.name_placeholder')}
// //                         required
// //                         style={inputStyle}
// //                         value={formData.name}
// //                         onChange={e => setFormData({ ...formData, name: e.target.value })}
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium mb-1.5">{t('contact.form.email_label')}</label>
// //                       <input
// //                         type="email"
// //                         placeholder={t('contact.form.email_placeholder')}
// //                         required
// //                         style={inputStyle}
// //                         value={formData.email}
// //                         onChange={e => setFormData({ ...formData, email: e.target.value })}
// //                       />
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium mb-1.5">{t('contact.form.subject_label')}</label>
// //                     <input
// //                       type="text"
// //                       placeholder={t('contact.form.subject_placeholder')}
// //                       required
// //                       style={inputStyle}
// //                       value={formData.subject}
// //                       onChange={e => setFormData({ ...formData, subject: e.target.value })}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium mb-1.5">{t('contact.form.message_label')}</label>
// //                     <textarea
// //                       placeholder={t('contact.form.message_placeholder')}
// //                       required
// //                       rows={4}
// //                       style={{ ...inputStyle, resize: 'none' }}
// //                       value={formData.message}
// //                       onChange={e => setFormData({ ...formData, message: e.target.value })}
// //                     />
// //                   </div>
// //                   <button
// //                     type="submit"
// //                     disabled={submitting}
// //                     className="w-full flex items-center justify-center gap-3 py-4 rounded-lg font-bold transition-all hover:opacity-90 disabled:opacity-50"
// //                     style={{ backgroundColor: '#25D366', color: 'white' }}
// //                   >
// //                     <Phone className="h-5 w-5" />
// //                     {submitting ? t('contact.form.submitting_button') : t('contact.form.submit_button')}
// //                   </button>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Section Localisation */}
// //       <section className="py-12 lg:py-16">
// //         <div className="container mx-auto px-4 lg:px-8">
// //           <div className="relative h-[400px] rounded-3xl overflow-hidden border shadow-2xl group" style={{ borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
// //             <img 
// //               src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&q=80" 
// //               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
// //               alt="Plan de Douala"
// //             />
// //             <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
// //             <div className="relative h-full flex flex-col items-center justify-center text-center p-6 text-white">
// //               <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 shadow-xl animate-bounce">
// //                 <MapPin className="h-8 w-8 text-white" />
// //               </div>
// //               <h2 className="text-3xl font-bold mb-2">{t('contact.map.title')}</h2>
// //               <p className="text-lg opacity-90 mb-6">{t('contact.map.address')}</p>
// //               <a
// //                 href="https://maps.google.com/?q=Malea+Hub+Bonapriso"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="bg-white text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition-all shadow-lg"
// //               >
// //                 {t('contact.map.button')} <ArrowRight className="h-5 w-5" />
// //               </a>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   )
// // }





// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { MapPin, Mail, Phone, Send, ArrowRight } from 'lucide-react'
// import { SiInstagram } from 'react-icons/si'
// import { contactAPI } from '../services/client.js'

// const contactIcons = [MapPin, Mail, SiInstagram, Phone]

// const contactHrefs = [
//   'https://maps.google.com/?q=2PH2+X7X,rue koloko bonapriso,immeubesciDouala,Cameroon',
//   'mailto:info@maleahub.com',
//   'https://instagram.com/maleahub',
//   'https://wa.me/237678111022',
// ]

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
//   const { t } = useTranslation()
//   const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
//   const [submitting, setSubmitting] = useState(false)
//   const [submitSuccess, setSubmitSuccess] = useState('')
//   const [submitError, setSubmitError] = useState('')

//   const contactInfo = t('contact.info_items', { returnObjects: true })
//   const contactInfoArray = Array.isArray(contactInfo) ? contactInfo : []

//   // Fonction pour envoyer via WhatsApp
//   const sendToWhatsApp = () => {
//     const phoneNumber = "237678111022"
//     const text = `*Nouveau message Malea Hub*%0A%0A` +
//                  `*Nom:* ${formData.name}%0A` +
//                  `*Email:* ${formData.email}%0A` +
//                  `*Objet:* ${formData.subject}%0A` +
//                  `*Message:* ${formData.message}`
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`
//     window.open(whatsappUrl, '_blank')
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setSubmitting(true)
//     setSubmitError('')
//     setSubmitSuccess('')

//     try {
//       // 1. Envoi à l'API backend
//       await contactAPI.submit({
//         nom: formData.name,
//         email: formData.email,
//         objet: formData.subject,
//         message: formData.message,
//         source: 'site_web',
//       })
      
//       // 2. Envoi via WhatsApp
//       sendToWhatsApp()
      
//       setSubmitSuccess(t('contact.form.success_message'))
//       setFormData({ name: '', email: '', subject: '', message: '' })
//       setTimeout(() => setSubmitSuccess(''), 5000)
//     } catch (error) {
//       setSubmitError(t('contact.form.error_message'))
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <div className="pt-16 lg:pt-20">
//       {/* Hero Section */}
//       <section className="relative py-12 lg:py-16 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="max-w-3xl">
//             <div
//               className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-4"
//               style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
//             >
//               {t('contact.hero.badge')}
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//               {t('contact.hero.title_prefix')}{' '}
//               <span style={{ color: 'var(--primary)' }}>{t('contact.hero.title_highlight')}</span>
//             </h1>
//             <p className="mt-4 text-lg" style={{ color: 'var(--muted-foreground)' }}>
//               {t('contact.hero.subtitle')}
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="grid lg:grid-cols-5 gap-12">
            
//             {/* Colonne Info */}
//             <div className="lg:col-span-2 space-y-6">
//               <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{t('contact.info_section.title')}</h2>
//               <div className="grid gap-4">
//                 {contactInfoArray.map((info, index) => {
//                   const Icon = contactIcons[index % contactIcons.length]
//                   return (
//                     <a
//                       key={info.title || index}
//                       href={contactHrefs[index]}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-4 p-4 rounded-xl border transition-all hover:border-[var(--primary)] group"
//                       style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}
//                     >
//                       <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                         <Icon className="h-5 w-5" style={{ color: 'var(--primary)' }} />
//                       </div>
//                       <div>
//                         <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{info.title}</h3>
//                         <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{info.value}</p>
//                       </div>
//                     </a>
//                   )
//                 })}
//               </div>
              
//               <div className="rounded-2xl p-6 border text-center" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 5%, transparent)', borderColor: 'color-mix(in oklch, var(--primary) 20%, transparent)' }}>
//                 <p className="text-sm font-medium mb-4">{t('contact.quick_response')}</p>
//                 <a href="https://wa.me/237678111022" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-transform hover:scale-105" style={{ backgroundColor: '#25D366' }}>
//                   {t('contact.whatsapp_chat')} <ArrowRight className="h-5 w-5" />
//                 </a>
//               </div>
//             </div>

//             {/* Formulaire */}
//             <div className="lg:col-span-3">
//               <div className="p-8 rounded-2xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                 <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>{t('contact.form.title')}</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="grid sm:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-1.5">{t('contact.form.name_label')}</label>
//                       <input
//                         type="text"
//                         placeholder={t('contact.form.name_placeholder')}
//                         required
//                         style={inputStyle}
//                         value={formData.name}
//                         onChange={e => setFormData({ ...formData, name: e.target.value })}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1.5">{t('contact.form.email_label')}</label>
//                       <input
//                         type="email"
//                         placeholder={t('contact.form.email_placeholder')}
//                         required
//                         style={inputStyle}
//                         value={formData.email}
//                         onChange={e => setFormData({ ...formData, email: e.target.value })}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1.5">{t('contact.form.subject_label')}</label>
//                     <input
//                       type="text"
//                       placeholder={t('contact.form.subject_placeholder')}
//                       required
//                       style={inputStyle}
//                       value={formData.subject}
//                       onChange={e => setFormData({ ...formData, subject: e.target.value })}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1.5">{t('contact.form.message_label')}</label>
//                     <textarea
//                       placeholder={t('contact.form.message_placeholder')}
//                       required
//                       rows={4}
//                       style={{ ...inputStyle, resize: 'none' }}
//                       value={formData.message}
//                       onChange={e => setFormData({ ...formData, message: e.target.value })}
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-bold transition-all hover:opacity-90 disabled:opacity-50"
//                     style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//                   >
//                     <Send className="h-5 w-5" />
//                     {submitting ? t('contact.form.submitting_button') : t('contact.form.submit_button')}
//                   </button>
//                   {submitSuccess && <p className="text-sm text-green-500 text-center font-medium">{submitSuccess}</p>}
//                   {submitError && <p className="text-sm text-red-500 text-center font-medium">{submitError}</p>}
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section Localisation */}
//       <section className="py-12 lg:py-16">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="relative h-[400px] rounded-3xl overflow-hidden border shadow-2xl group" style={{ borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//             <img 
//               src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&q=80" 
//               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
//               alt="Plan de Douala"
//             />
//             <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
//             <div className="relative h-full flex flex-col items-center justify-center text-center p-6 text-white">
//               <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 shadow-xl animate-bounce">
//                 <MapPin className="h-8 w-8 text-white" />
//               </div>
//               <h2 className="text-3xl font-bold mb-2">{t('contact.map.title')}</h2>
//               <p className="text-lg opacity-90 mb-6">{t('contact.map.address')}</p>
//               <a
//                 href="https://maps.google.com/?q=Malea+Hub+Bonapriso"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-white text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition-all shadow-lg"
//               >
//                 {t('contact.map.button')} <ArrowRight className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }





import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Mail, Phone, Send, ArrowRight } from 'lucide-react'
import { SiInstagram } from 'react-icons/si'
import { Turnstile } from 'react-turnstile'

import { contactAPI } from '../services/client.js'

const contactIcons = [MapPin, Mail, SiInstagram, Phone]

const contactHrefs = [
  'https://maps.google.com/?q=2PH2+X7X,rue koloko bonapriso,immeubesciDouala,Cameroon',
  'mailto:info@maleahub.com',
  'https://instagram.com/maleahub',
  'https://wa.me/237678111022',
]

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
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState('')
  const [submitError, setSubmitError] = useState('')

  // CAPTCHA
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaError, setCaptchaError] = useState('')

  const contactInfo = t('contact.info_items', { returnObjects: true })
  const contactInfoArray = Array.isArray(contactInfo)
    ? contactInfo
    : []

  // WhatsApp
  const sendToWhatsApp = () => {
    const phoneNumber = '237678111022'

    const text =
      `*Nouveau message Malea Hub*%0A%0A` +
      `*Nom:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Objet:* ${formData.subject}%0A` +
      `*Message:* ${formData.message}`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`

    window.open(whatsappUrl, '_blank')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSubmitting(true)
    setSubmitError('')
    setSubmitSuccess('')
    setCaptchaError('')

    // Vérification captcha
    if (!captchaToken) {
      setCaptchaError('Veuillez confirmer le captcha.')
      setSubmitting(false)
      return
    }

    try {
      // Envoi API
      await contactAPI.submit({
        nom: formData.name,
        email: formData.email,
        objet: formData.subject,
        message: formData.message,
        source: 'site_web',
        captchaToken,
      })

      // WhatsApp
      sendToWhatsApp()

      setSubmitSuccess(t('contact.form.success_message'))

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })

      setCaptchaToken('')

      setTimeout(() => {
        setSubmitSuccess('')
      }, 5000)

    } catch (error) {
      console.error(error)

      setSubmitError(
        error?.response?.data?.message ||
        t('contact.form.error_message')
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-16 lg:pt-20">

      {/* Hero */}
      <section
        className="relative py-12 lg:py-16 overflow-hidden"
        style={{ backgroundColor: 'var(--card)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)',
          }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">

            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-4"
              style={{
                borderColor:
                  'color-mix(in oklch, var(--primary) 30%, transparent)',
                backgroundColor:
                  'color-mix(in oklch, var(--primary) 10%, transparent)',
                color: 'var(--primary)',
              }}
            >
              {t('contact.hero.badge')}
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: 'var(--foreground)' }}
            >
              {t('contact.hero.title_prefix')}{' '}
              <span style={{ color: 'var(--primary)' }}>
                {t('contact.hero.title_highlight')}
              </span>
            </h1>

            <p
              className="mt-4 text-lg"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {t('contact.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        className="py-12 lg:py-16"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Infos */}
            <div className="lg:col-span-2 space-y-6">

              <h2
                className="text-2xl font-bold"
                style={{ color: 'var(--foreground)' }}
              >
                {t('contact.info_section.title')}
              </h2>

              <div className="grid gap-4">
                {contactInfoArray.map((info, index) => {
                  const Icon = contactIcons[index % contactIcons.length]

                  return (
                    <a
                      key={info.title || index}
                      href={contactHrefs[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl border transition-all hover:border-[var(--primary)] group"
                      style={{
                        backgroundColor: 'var(--card)',
                        borderColor:
                          'color-mix(in oklch, var(--border) 50%, transparent)',
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor:
                            'color-mix(in oklch, var(--primary) 10%, transparent)',
                        }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: 'var(--primary)' }}
                        />
                      </div>

                      <div>
                        <h3
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          {info.title}
                        </h3>

                        <p
                          className="text-sm font-medium"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {info.value}
                        </p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-3">
              <div
                className="p-8 rounded-2xl border"
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor:
                    'color-mix(in oklch, var(--border) 50%, transparent)',
                }}
              >
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: 'var(--foreground)' }}
                >
                  {t('contact.form.title')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                  <div className="grid sm:grid-cols-2 gap-4">

                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        {t('contact.form.name_label')}
                      </label>

                      <input
                        type="text"
                        required
                        style={inputStyle}
                        placeholder={t('contact.form.name_placeholder')}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        {t('contact.form.email_label')}
                      </label>

                      <input
                        type="email"
                        required
                        style={inputStyle}
                        placeholder={t('contact.form.email_placeholder')}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      {t('contact.form.subject_label')}
                    </label>

                    <input
                      type="text"
                      required
                      style={inputStyle}
                      placeholder={t('contact.form.subject_placeholder')}
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subject: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      {t('contact.form.message_label')}
                    </label>

                    <textarea
                      required
                      rows={4}
                      style={{ ...inputStyle, resize: 'none' }}
                      placeholder={t('contact.form.message_placeholder')}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* CAPTCHA */}
                  <div className="flex justify-center py-2">
                    <Turnstile
                      sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                      onVerify={(token) => {
                        setCaptchaToken(token)
                        setCaptchaError('')
                      }}
                      onExpire={() => {
                        setCaptchaToken('')
                      }}
                    />
                  </div>

                  {captchaError && (
                    <p className="text-sm text-red-500 text-center">
                      {captchaError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-bold transition-all hover:opacity-90 disabled:opacity-50"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                    }}
                  >
                    <Send className="h-5 w-5" />

                    {submitting
                      ? t('contact.form.submitting_button')
                      : t('contact.form.submit_button')}
                  </button>

                  {submitSuccess && (
                    <p className="text-sm text-green-500 text-center font-medium">
                      {submitSuccess}
                    </p>
                  )}

                  {submitError && (
                    <p className="text-sm text-red-500 text-center font-medium">
                      {submitError}
                    </p>
                  )}

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}