import { AppError } from '../utils/Apperror.js';


export const validate = (schema, target = 'body') =>
  (req, res, next) => {
    const { error, value } = schema.validate(req[target], {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      const messages = error.details.map((d) => d.message.replace(/"/g, ''));
      return next(new AppError('Données invalides', 422, messages));
    }

    req[target] = value; // replace with sanitised values
    next();
  };