export const sendSuccess = (res, data = {}, message = 'Succès', statusCode = 200) => {
  return res.status(statusCode).json({ status: 'success', message, data });
};

export const sendCreated = (res, data = {}, message = 'Créé avec succès') =>
  sendSuccess(res, data, message, 201);

export const sendPaginated = (res, rows, total, page, limit, message = 'Succès') => {
  return res.status(200).json({
    status: 'success',
    message,
    data: rows,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    },
  });
};

export const buildPagination = (query) => {
  const page  = Math.max(1, parseInt(query.page)  || 1);
  const limit = Math.min(100, parseInt(query.limit) || 20);
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};