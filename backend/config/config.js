import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },

  cors: {
    origins: [
      process.env.CLIENT_URL || 'http://localhost:5173',
      process.env.ADMIN_URL  || 'http://localhost:3000',
    ],
  },

  upload: {
    dir: process.env.UPLOAD_DIR || 'uploads',
    maxSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024,
    allowed: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  },

  whatsapp: {
    general:   process.env.WA_GENERAL   || '237600000000',
    investors: process.env.WA_INVESTORS || '237600000001',
    location:  process.env.WA_LOCATION  || '237600000002',
  },
  turnstile: {
  secretKey: process.env.TURNSTILE_SECRET_KEY,
},

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM,
    batchSize: parseInt(process.env.EMAIL_BATCH_SIZE) || 30,
  },
};

// Validate required env vars at startup
const required = [
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'DATABASE_URL',
];
required.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️  Missing env variable: ${key}`);
  }
});

export default config;
