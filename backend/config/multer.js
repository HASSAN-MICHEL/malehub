// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import { config } from './config.js';
// import { AppError } from '../utils/Apperror.js';

// const uploadDir = '/tmp/uploads';

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const subDir = path.join(uploadDir, req.uploadSubDir || 'misc');
//     if (!fs.existsSync(subDir)) fs.mkdirSync(subDir, { recursive: true });
//     cb(null, subDir);
//   },
//   filename: (req, file, cb) => {
//     const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, `${unique}${path.extname(file.originalname)}`);
//   },
// });

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
import { config } from './config.js';
import { AppError } from '../utils/Apperror.js';

// Utiliser la mémoire (pas de stockage disque)
const storage = multer.memoryStorage();

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