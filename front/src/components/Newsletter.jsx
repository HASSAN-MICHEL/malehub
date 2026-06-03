

// import { useState } from 'react';
// import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
// import { clientApi } from '../services/client';

// export default function Newsletter() {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!email || !email.includes('@')) {
//       setMessage({ type: 'error', text: 'Veuillez entrer un email valide' });
//       setTimeout(() => setMessage({ type: '', text: '' }), 3000);
//       return;
//     }

//     setLoading(true);
//     setMessage({ type: '', text: '' });

//     try {
//       await clientApi.post('/system/newsletter/subscribe', { email });
//       setMessage({ type: 'success', text: 'Merci pour votre inscription !' });
//       setEmail('');
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || 'Erreur lors de l\'inscription';
//       setMessage({ type: 'error', text: errorMsg });
//     } finally {
//       setLoading(false);
//       setTimeout(() => setMessage({ type: '', text: '' }), 4000);
//     }
//   };

//   return (
//     <div>
//       <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--foreground)' }}>
//         Newsletter
//       </h3>
//       <p className="text-sm mb-3" style={{ color: 'var(--muted-foreground)' }}>
//         Recevez nos actualités et événements
//       </p>
      
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <div className="flex flex-col sm:flex-row gap-2">
//           <div className="flex-1 relative">
//             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--muted-foreground)' }} />
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Votre email"
//               className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 transition-colors"
//               style={{
//                 backgroundColor: 'var(--background)',
//                 borderColor: 'var(--border)',
//                 color: 'var(--foreground)'
//               }}
//               disabled={loading}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50"
//             style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
//           >
//             {loading ? (
//               <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
//             ) : (
//               <Send className="h-4 w-4" />
//             )}
//             S'abonner
//           </button>
//         </div>
        
//         {message.text && (
//           <div
//             className={`flex items-center gap-2 text-xs p-2 rounded-lg ${
//               message.type === 'success' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
//             }`}
//           >
//             {message.type === 'success' ? (
//               <CheckCircle className="h-3 w-3" />
//             ) : (
//               <AlertCircle className="h-3 w-3" />
//             )}
//             {message.text}
//           </div>
//         )}
//       </form>
      
//       <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
//         En vous abonnant, vous acceptez de recevoir nos emails.
//       </p>
//     </div>
//   );
// }



import { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { clientApi } from '../services/client';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: 'Veuillez entrer un email valide' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }

    // Correction ici : Utilisation du setter d'état
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await clientApi.post('/system/newsletter/subscribe', { email });
      setMessage({ type: 'success', text: 'Merci pour votre inscription !' });
      setEmail('');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Erreur lors de l\'inscription';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 4000);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--foreground)' }}>
        Newsletter
      </h3>
      <p className="text-sm mb-3" style={{ color: 'var(--muted-foreground)' }}>
        Recevez nos actualités et événements
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-2 w-full items-stretch">
          {/* Container de l'input avec position relative stricte */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4" style={{ color: 'var(--muted-foreground)' }} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 transition-colors block"
              style={{
                backgroundColor: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)'
              }}
              disabled={loading}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50 whitespace-nowrap"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            S'abonner
          </button>
        </div>
        
        {message.text && (
          <div
            className={`flex items-center gap-2 text-xs p-2 rounded-lg ${
              message.type === 'success' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="h-3 w-3 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-3 w-3 flex-shrink-0" />
            )}
            {message.text}
          </div>
        )}
      </form>
      
      <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
        En vous abonnant, vous acceptez de recevoir nos emails.
      </p>
    </div>
  );
}