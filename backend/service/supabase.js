import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials missing!');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadToSupabase = async (file, folder = 'media') => {
  try {
    // Générer un nom de fichier unique
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Upload vers Supabase Storage
    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET || 'maleahub-media')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '3600',
      });

    if (error) throw error;

    // Obtenir l'URL publique
    const { data: publicUrlData } = supabase.storage
      .from(process.env.SUPABASE_BUCKET || 'maleahub-media')
      .getPublicUrl(filePath);

    return {
      success: true,
      url: publicUrlData.publicUrl,
      path: filePath,
    };
  } catch (error) {
    console.error('Upload to Supabase error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const deleteFromSupabase = async (filePath) => {
  try {
    const { error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET || 'maleahub-media')
      .remove([filePath]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Delete from Supabase error:', error);
    return { success: false, error: error.message };
  }
};