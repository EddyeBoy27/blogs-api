const validateJoi = async (schema, obj) => {
  const val = await schema.validateAsync(obj).catch((_err) => {
    const error = { error: { message: 'Campos inválidos', code: 'Invalid_fields' } };
    throw error;
  });
  return val;
};

module.exports = validateJoi;
