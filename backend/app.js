import dotenv from 'dotenv';
dotenv.config();

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

/* ───────────────────────────────
   LOGS
─────────────────────────────── */
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

/* ───────────────────────────────
   FRONTEND (React build)
─────────────────────────────── */
const frontendPath = path.join(__dirname, '..', 'front', 'dist');

app.use(express.static(frontendPath));

app.get('/', (req, res) => {
  if (req.originalUrl.startsWith('/api')) return;

  res.sendFile(path.join(frontendPath, 'index.html'));
});

/* ───────────────────────────────
   ERROR HANDLER
─────────────────────────────── */
app.use(errorHandler);

/* ───────────────────────────────
   START SERVER (IMPORTANT)
─────────────────────────────── */
const PORT = process.env.PORT || config.port || 5000;

app.listen(PORT, () => {
  console.log('──────────────────────────────');
  console.log('🚀 SERVER STARTED');
  console.log(`👉 Port: ${PORT}`);
  console.log(`👉 Health: http://localhost:${PORT}/health`);
  console.log('──────────────────────────────');
});
