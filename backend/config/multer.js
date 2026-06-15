

// import multer from 'multer';
// import { config } from './config.js';
// import { AppError } from '../utils/Apperror.js';

// // Utiliser la mémoire (pas de stockage disque)
// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   if (config.upload.allowed.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Type de fichier non autorisé', 400), false);
//   }
// };

// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: config.upload.maxSize },
// });


import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import { AppError } from '../utils/Apperror.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin correct : backend/uploads (pas backend/config/uploads)
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  console.log(`✅ Dossier uploads créé: ${UPLOADS_DIR}`);
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (config.upload.allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Type de fichier non autorisé', 400), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: config.upload.maxSize },
});
