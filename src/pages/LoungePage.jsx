// import { Coffee, Users, Wifi, Music, ArrowRight } from 'lucide-react'

// const features = [
//   { icon: Coffee, title: 'Relaxation', description: 'Comfortable seating and calm atmosphere' },
//   { icon: Users, title: 'Networking', description: 'Perfect for meeting new connections' },
//   { icon: Wifi, title: 'Connectivity', description: 'Stay connected with high-speed WiFi' },
//   { icon: Music, title: 'Ambiance', description: 'Curated music and premium decor' },
// ]

// const loungeImages = [
//   { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&q=80', alt: 'Lounge seating area' },
//   { src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80', alt: 'Coffee corner' },
//   { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', alt: 'Networking space' },
//   { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', alt: 'Comfortable seating' },
// ]

// export default function LoungePage() {
//   return (
//     <div className="pt-16 lg:pt-20">
//       <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
//               style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
//               Espace Détente
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
//               The <span style={{ color: 'var(--primary)' }}>Lounge</span>
//             </h1>
//             <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
//               A premium space designed for relaxation, networking, and informal meetings. Where connections happen naturally.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="grid md:grid-cols-2 gap-4">
//             <div className="relative aspect-[4/3] md:row-span-2 rounded-2xl overflow-hidden group" style={{ aspectRatio: undefined }}>
//               <img src={loungeImages[0].src} alt={loungeImages[0].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ minHeight: '300px' }} />
//               <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, color-mix(in oklch, var(--background) 60%, transparent), transparent)' }} />
//               <div className="absolute bottom-6 left-6">
//                 <span className="font-medium" style={{ color: 'var(--foreground)' }}>{loungeImages[0].alt}</span>
//               </div>
//             </div>
//             {loungeImages.slice(1).map((image, index) => (
//               <div key={index} className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
//                 <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(to top, color-mix(in oklch, var(--background) 60%, transparent), transparent)' }} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--card)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ color: 'var(--foreground)' }}>Perfect for</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
//             {features.map((feature) => (
//               <div key={feature.title} className="text-center p-6 rounded-2xl border" style={{ backgroundColor: 'var(--background)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                 <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                   <feature.icon className="h-7 w-7" style={{ color: 'var(--primary)' }} />
//                 </div>
//                 <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{feature.title}</h3>
//                 <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--background)' }}>
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="max-w-3xl mx-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ color: 'var(--foreground)' }}>How to use the Lounge</h2>
//             <div className="space-y-6">
//               {[
//                 { icon: Users, title: 'Networking Events', desc: 'Meet fellow entrepreneurs, professionals, and potential partners in a relaxed setting.' },
//                 { icon: Coffee, title: 'Relaxation', desc: 'Take a break from work with comfortable seating and a calm atmosphere.' },
//                 { icon: Users, title: 'Informal Meetings', desc: 'Perfect for casual client meetings or team discussions outside the office environment.' },
//               ].map((item) => (
//                 <div key={item.title} className="flex gap-4 p-6 rounded-2xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
//                   <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
//                     <item.icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
//                     <p className="mt-1" style={{ color: 'var(--muted-foreground)' }}>{item.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="text-center mt-12">
//               <a href="https://wa.me/237600000000?text=Bonjour, je souhaite visiter le Lounge"
//                 target="_blank" rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
//                 style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
//                 Visit the Lounge <ArrowRight className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


import { Coffee, Users, Wifi, Music, ArrowRight, Utensils } from 'lucide-react'

const features = [
  { icon: Coffee, title: 'Relaxation', description: 'Sièges confortables et atmosphère apaisante.' },
  { icon: Users, title: 'Networking', description: 'Lieu idéal pour de nouvelles rencontres professionnelles.' },
  { icon: Wifi, title: 'Connectivité', description: 'Restez connecté avec un WiFi ultra-rapide.' },
  { icon: Music, title: 'Ambiance', description: 'Sélection musicale douce et décor premium.' },
]

const loungeImages = [
  { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&q=80', alt: 'Espace salon' },
  { src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80', alt: 'Coin café' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', alt: 'Espace networking' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', alt: 'Assises confortables' },
]

export default function LoungePage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section - Espacement réduit */}
      <section className="relative py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, color-mix(in oklch, var(--primary) 5%, transparent), transparent)' }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
              style={{ borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
              Espace Détente & Networking
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
              Le <span style={{ color: 'var(--primary)' }}>Lounge</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Un espace premium conçu pour la relaxation, le réseautage et les réunions informelles. Un cadre où les connexions se créent naturellement.
            </p>
          </div>
        </div>
      </section>

      {/* Galerie Photos Organisée */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative aspect-[4/3] lg:col-span-2 rounded-2xl overflow-hidden group">
              <img src={loungeImages[0].src} alt={loungeImages[0].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-end p-6" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                <span className="text-white font-medium">Espace principal chaleureux</span>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-4">
              {loungeImages.slice(1, 3).map((image, index) => (
                <div key={index} className="relative rounded-2xl overflow-hidden group">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Menu / Cafétéria (Répond au point "Menu" de l'image) */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--card)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <Utensils className="h-10 w-10 mb-6" style={{ color: 'var(--primary)' }} />
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Pause Gourmande</h2>
              <p className="text-lg mb-6" style={{ color: 'var(--muted-foreground)' }}>
                Accédez à notre sélection de rafraîchissements, cafés premium et encas pour dynamiser vos journées de travail.
              </p>
              <ul className="space-y-3 mb-8">
                {['Cafés & Thés d’exception', 'Boissons fraîches', 'Viennoiseries & Encas sains'].map((item) => (
                  <li key={item} className="flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="px-6 py-3 rounded-lg font-semibold border transition-all hover:bg-primary hover:text-white"
                style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                Consulter le menu
              </button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
               <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80" className="rounded-xl shadow-lg" alt="Café" />
               <img src="https://images.unsplash.com/photo-1559925393-8be0ec418dc9?w=400&q=80" className="rounded-xl shadow-lg mt-8" alt="Lounge food" />
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnement & Usage */}
      <section className="py-12 lg:py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: 'var(--foreground)' }}>Pourquoi profiter du Lounge ?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Users, title: 'Événements Networking', desc: 'Rencontrez des partenaires potentiels dans un cadre décontracté.' },
              { icon: Coffee, title: 'Break Productif', desc: 'Prenez une pause bien méritée pour revenir plus efficace à votre bureau.' },
              { icon: Users, title: 'Réunions Informelles', desc: 'Lieu parfait pour des discussions d’équipe ou des rendez-vous clients relax.' },
            ].map((item) => (
              <div key={item.title} className="p-8 rounded-2xl border text-center transition-all hover:shadow-md" style={{ backgroundColor: 'var(--card)', borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}>
                  <item.icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="https://wa.me/237678111022?text=Bonjour, je souhaite visiter l'espace Lounge"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              Découvrir le Lounge <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}