import { config } from '../config/config.js';

const handleJWTError = () => ({
  statusCode: 401,
  message: 'Token invalide. Veuillez vous reconnecter.',
});

const handleJWTExpiredError = () => ({
  statusCode: 401,
  message: 'Token expiré. Veuillez vous reconnecter.',
});

const handlePGError = (err) => {
  // Unique constraint
  if (err.code === '23505') {
    const field = err.detail?.match(/\((.+)\)/)?.[1] || 'champ';
    return { statusCode: 409, message: `Un enregistrement avec ce ${field} existe déjà.` };
  }
  // FK violation
  if (err.code === '23503') {
    return { statusCode: 400, message: 'Référence invalide : élément lié introuvable.' };
  }
  // Not null
  if (err.code === '23502') {
    return { statusCode: 400, message: `Champ obligatoire manquant : ${err.column}` };
  }
  return null;
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message, errors } = err;

  // JWT errors
  if (err.name === 'JsonWebTokenError') ({ statusCode, message } = handleJWTError());
  if (err.name === 'TokenExpiredError') ({ statusCode, message } = handleJWTExpiredError());

  // PostgreSQL errors
  const pgErr = handlePGError(err);
  if (pgErr) ({ statusCode, message } = pgErr);

  // Log on server errors
  if (statusCode >= 500) {
    console.error('💥 SERVER ERROR:', err);
  }

  return res.status(statusCode).json({
    status: statusCode < 500 ? 'fail' : 'error',
    message,
    ...(errors && { errors }),
    ...(config.isProd ? {} : { stack: err.stack }),
  });
};

export default errorHandler;