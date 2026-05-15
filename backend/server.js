// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import rateLimit from 'express-rate-limit';
// import path from 'path';
// import { fileURLToPath } from 'url';

// import { config } from './config/config.js';
// import { testConnection } from './config/database.js';
// import apiRouter from './routes/index.js';
// import errorHandler from './middlewares/error.js';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const app = express();

// // ── Security ──────────────────────────────────────────────────────────────────
// app.use(helmet());
// app.use(cors({
//   origin: config.cors.origins,
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
// }));

// // ── Rate limiting 
// app.use('/api/', rateLimit({
//   windowMs: config.rateLimit.windowMs,
//   max: config.rateLimit.max,
//   message: { status: 'error', message: 'Trop de requêtes. Réessayez plus tard.' },
//   standardHeaders: true,
//   legacyHeaders: false,
// }));

// // Auth endpoint gets stricter limit
// app.use('/api/auth/login', rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 10,
//   message: { status: 'error', message: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.' },
// }));

// // Body parsing 
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // ── Logging
// if (!config.isProd) {
//   app.use(morgan('dev'));
// } else {
//   app.use(morgan('combined'));
// }

// // ── Static files (uploads) ────────────────────────────────────────────────────
// app.use('/uploads', express.static(path.join(__dirname, '..', config.upload.dir)));

// // API routes 
// app.use('/api', apiRouter);

// // ── Health check 
// app.get('/health', (_req, res) => res.json({
//   status: 'ok',
//   app: 'Malea Hub API',
//   version: '1.0.0',
//   timestamp: new Date().toISOString(),
// }));

// // ── 404 handler 
// app.use((_req, res) => {
//   res.status(404).json({ status: 'fail', message: 'Route introuvable.' });
// });

// // ── Global error handler 
// app.use(errorHandler);

// // ── Start
// const start = async () => {
//   await testConnection();
//   app.listen(config.port, () => {
//     console.log(`Malea Hub API running on port ${config.port} [${config.nodeEnv}]`);
//     console.log(`TESTE:  verification: http://localhost:${config.port}/health`);
//   });
// };

// start().catch((err) => {
//   console.error('Failed to start server:', err);
//   process.exit(1);
// });

// export default app;




// // ?Z_.-nvs8yijeri

// //maleha


import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from './config/config.js';
import { testConnection } from './config/database.js';
import apiRouter from './routes/index.js';
import errorHandler from './middlewares/error.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// ─────────────────────────────────────────────────────────────
// Security
// ─────────────────────────────────────────────────────────────
app.use(helmet());

app.use(cors({
  origin: config.cors.origins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// ─────────────────────────────────────────────────────────────
// Rate limit
// ─────────────────────────────────────────────────────────────
app.use('/api/', rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    status: 'error',
    message: 'Trop de requêtes. Réessayez plus tard.',
  },
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use('/api/auth/login', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    status: 'error',
    message: 'Trop de tentatives de connexion.',
  },
}));

// ─────────────────────────────────────────────────────────────
// Body parser
// ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));

app.use(express.urlencoded({
  extended: true,
  limit: '10mb',
}));

// ─────────────────────────────────────────────────────────────
// Logging
// ─────────────────────────────────────────────────────────────
if (!config.isProd) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ─────────────────────────────────────────────────────────────
// Uploads
// ─────────────────────────────────────────────────────────────
app.use(
  '/uploads',
  express.static(path.join(__dirname, config.upload.dir))
);

// ─────────────────────────────────────────────────────────────
// API
// ─────────────────────────────────────────────────────────────
app.use('/api', apiRouter);

// ─────────────────────────────────────────────────────────────
// Health check
// ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────────────────────
// FRONTEND VITE DIST
// ─────────────────────────────────────────────────────────────

const frontendPath = path.join(__dirname, '../front/dist');

app.use(express.static(frontendPath));

// React Router
app.get('*', (_req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error Handler

app.use(errorHandler);


// Start Server
try {
  await testConnection();
  console.log('✅ Database connected');
} catch (err) {
  console.error('❌ Database connection failed:', err);
}

export default app;
