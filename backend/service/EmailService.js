



import nodemailer from 'nodemailer';

// Configuration du transporteur SMTP avec les variables d'environnement
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true' || false, // false pour le port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    // Ne pas rejeter les certificats (utile pour certains serveurs)
    rejectUnauthorized: false,
  },
});

// Vérifier la connexion au démarrage
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Erreur SMTP:', error.message);
    console.error('   Vérifiez vos identifiants dans les variables d\'environnement');
  } else {
    console.log('SMTP prêt à envoyer des emails');
    console.log(`   - Hôte: ${process.env.SMTP_HOST}`);
    console.log(`   - Port: ${process.env.SMTP_PORT}`);
    console.log(`   - Utilisateur: ${process.env.SMTP_USER}`);
  }
});

// Envoyer un email à un seul destinataire
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `MALEA HUB <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: text || html?.replace(/<[^>]*>/g, ''),
    });
    console.log('Email envoyé à:', to, '- ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Erreur envoi email à', to, ':', error.message);
    return { success: false, error: error.message };
  }
};

// Envoyer un email à plusieurs destinataires
export const sendMassEmail = async ({ recipients, subject, html, text }) => {
  const results = [];
  const BATCH_SIZE = parseInt(process.env.EMAIL_BATCH_SIZE) || 30; // Gmail limite à 30-50 par lot
  
  console.log(` Début de l'envoi massif à ${recipients.length} destinataires`);
  
  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(recipients.length / BATCH_SIZE);
    
    console.log(` Envoi du lot ${batchNumber}/${totalBatches} (${batch.length} emails)...`);
    
    const batchPromises = batch.map(recipient => 
      sendEmail({ to: recipient, subject, html, text })
    );
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    // Attendre 2 secondes entre les lots pour éviter les limites Gmail
    if (i + BATCH_SIZE < recipients.length) {
      console.log(` Attente de 2 secondes avant le prochain lot...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  const successCount = results.filter(r => r.success).length;
  const errorCount = results.filter(r => !r.success).length;
  
  console.log(` Envoi terminé: ${successCount} succès, ${errorCount} échecs`);
  return { successCount, errorCount, total: recipients.length };
};