const endPointError = async (req, res) => {
  const error = { error: { message: 'Endpoint not found', code: 'Not_found' } };
  res.status(404).json(error);
};

module.exports = endPointError;
