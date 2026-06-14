

// // // ?Z_.-nvs8yijeri

// // //maleha
// //

// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import rateLimit from 'express-rate-limit';
// import path from 'path';
// import { fileURLToPath } from 'url';

// import { config } from './config/config.js';
// // import { testConnection } from './config/database.js';
// import apiRouter from './routes/index.js';
// import errorHandler from './middlewares/error.js';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const app = express();
// app.set('trust proxy', 1);

// app.use('/uploads/media', express.static('/tmp/uploads/media'));

// // Security

// // app.use(helmet());
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],

//         scriptSrc: [
//           "'self'",
//           "'unsafe-inline'",
//           "https://challenges.cloudflare.com",
//         ],

//         scriptSrcElem: [
//           "'self'",
//           "'unsafe-inline'",
//           "https://challenges.cloudflare.com",
//         ],

//         styleSrc: [
//           "'self'",
//           "'unsafe-inline'",
//           "https://fonts.googleapis.com",
//         ],

//         styleSrcElem: [
//           "'self'",
//           "'unsafe-inline'",
//           "https://fonts.googleapis.com",
//         ],

//         fontSrc: [
//           "'self'",
//           "https://fonts.gstatic.com",
//           "data:",
//         ],

//         frameSrc: [
//           "'self'",
//           "https://challenges.cloudflare.com",
//         ],

//         connectSrc: [
//           "'self'",
//           "https://challenges.cloudflare.com",
//         ],

//         imgSrc: [
//           "'self'",
//           "data:",
//           "https:",
//           "blob:",
//         ],
//       },
//     },
//   })
// );

// app.use(cors({
//   origin: config.cors.origins,
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
// }));


// // Rate limit

// app.use('/api/', rateLimit({
//   windowMs: config.rateLimit.windowMs,
//   max: config.rateLimit.max,
//   message: {
//     status: 'error',
//     message: 'Trop de requêtes. Réessayez plus tard.',
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
// }));

// app.use('/api/auth/login', rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 10,
//   message: {
//     status: 'error',
//     message: 'Trop de tentatives de connexion.',
//   },
// }));


// // Body parser

// app.use(express.json({ limit: '10mb' }));

// app.use(express.urlencoded({
//   extended: true,
//   limit: '10mb',
// }));


// if (!config.isProd) {
//   app.use(morgan('dev'));
// } else {
//   app.use(morgan('combined'));
// }

// // // enregistré les fichiers
// // app.use(
// //   '/uploads',
// //   express.static(path.join(__dirname, config.upload.dir))
// // );

// // APPEL API
// app.use('/api', apiRouter);

// // la route de test

// app.get('/health', (_req, res) => {
//   res.json({
//     status: 'ok',
//     timestamp: new Date().toISOString(),
//   });
// });

// const frontendPath = path.join(__dirname, '..', 'front', 'dist');

// // Static frontend files
// app.use(express.static(frontendPath));

// // Static assets
// app.use('/assets', express.static(path.join(frontendPath, 'assets')));

// // React Router SPA
// app.use((req, res, next) => {
//   // API routes
//   if (req.originalUrl.startsWith('/api')) {
//     return next();
//   }

//   // Assets routes
//   if (req.originalUrl.startsWith('/assets')) {
//     return next();
//   }

//   res.sendFile(path.join(frontendPath, 'index.html'));
// });
// ///Error Handler

// app.use(errorHandler);




// export default app;


import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from './config/config.js';
import apiRouter from './routes/index.js';
import errorHandler from './middlewares/error.js';

dotenv.config({
  path: path.join(__dirname, '.env')
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

/* ───────────────────────────────
   TRUST PROXY (VPS / Nginx)
─────────────────────────────── */
app.set('trust proxy', 1);

/* ───────────────────────────────
   UPLOADS
─────────────────────────────── */
const uploadsDir =
  process.env.UPLOAD_DIR ||
  path.join(__dirname, '..', 'uploads');

app.use('/uploads', express.static(uploadsDir));

/* ───────────────────────────────
   SECURITY
─────────────────────────────── */
app.use(
  helmet({
    contentSecurityPolicy: false, // simplifié VPS (tu peux durcir après)
  })
);

/* ───────────────────────────────
   CORS
─────────────────────────────── */
app.use(
  cors({
    origin: config.cors.origins,
    credentials: true,
  })
);

/* ───────────────────────────────
   RATE LIMIT
─────────────────────────────── */
app.use(
  '/api',
  rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: 'Too many requests',
  })
);

/* ───────────────────────────────
   BODY PARSER
─────────────────────────────── */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


app.use(morgan('dev'));

/* ───────────────────────────────
   API ROUTES
─────────────────────────────── */
app.use('/api', apiRouter);

/* ───────────────────────────────
   HEALTH CHECK
─────────────────────────────── */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});


const frontendPath = path.join(__dirname, '..', 'front', 'dist');

app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  if (req.originalUrl.startsWith('/api')) return;

  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Erreur

app.use(errorHandler);

// Lance l'api
const PORT = process.env.PORT || config.port || 5000;

app.listen(PORT, () => {
  console.log('──────────────────────────────');
  console.log('🚀 SERVER STARTED');
  console.log(`👉 Port: ${PORT}`);
  console.log(`👉 Health: http://localhost:${PORT}/health`);
  console.log('──────────────────────────────');
});