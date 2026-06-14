// services/whatsapp.js
import axios from 'axios';

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v17.0';
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

export const sendWhatsAppMessage = async (to, message) => {
  try {
    // Format du numéro (supprimer les espaces et le + si présent)
    let formattedNumber = to.replace(/\s/g, '');
    if (formattedNumber.startsWith('+')) {
      formattedNumber = formattedNumber.substring(1);
    }
    
    // Si vous utilisez une API WhatsApp Business
    if (WHATSAPP_TOKEN && WHATSAPP_PHONE_NUMBER_ID) {
      const response = await axios.post(
        `${WHATSAPP_API_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: 'whatsapp',
          to: formattedNumber,
          type: 'text',
          text: { body: message }
        },
        {
          headers: {
            'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } 
    // Alternative: Utiliser une API tierce ou WhatsApp API personnalisée
    else {
      console.log(`[WhatsApp] Message to ${to}: ${message}`);
      // Ici vous pouvez intégrer d'autres services comme Twilio, MessageBird, etc.
      return { success: true, mock: true };
    }
  } catch (error) {
    console.error('WhatsApp send error:', error);
    throw error;
  }
};

// Template de message de confirmation d'inscription
export const getInscriptionConfirmationMessage = (formationTitre, nom) => {
  return `🎓 *Confirmation d'inscription - Malea Hub*

Bonjour ${nom},

Votre inscription à la formation *${formationTitre}* a été confirmée avec succès ! ✅

Nous vous enverrons prochainement tous les détails pratiques (date, lieu, programme détaillé).

À très bientôt !
📞 Contact: +237 678111022`;
};