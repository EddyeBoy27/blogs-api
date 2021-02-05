const statusByCode = {
  Not_found: 404,
  Already_exists: 409,
  Invalid_data: 422,
  Invalid_fields: 400,
  Unauthorized: 401,
  Forbidden: 403,
  'entity.parse.failed': 400,
};

const errorController = async (err, _req, res, _next) => {
  if (err.error) return res.status(statusByCode[err.error.code] || 500).json(err);
  if (err.type && statusByCode[err.type]) {
    return res.status(err.statusCode)
      .json({ error: { message: err.message, code: err.type } });
  }
  const now = Date.now();
  console.error(`ErrorController: Message: ${err.message}, Date: ${now}`);
  return res.status(err.status || 500)
    .json({ error: { message: `Internal error ${now}`, code: err.type || 'Internal_error' } });
};

module.exports = errorController;
