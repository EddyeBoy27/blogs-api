const rescue = require('express-rescue');
const validateJoi = require('../middlewares/validateJoi');
const JwT = require('../middlewares/JwT');
const UserService = require('../services/UserService');
const { schemaNewUser, schemaLogin } = require('../middlewares/schemasJoi');

const newUser = rescue(async (req, res) => {
  await validateJoi(schemaNewUser, req.body);
  const { displayName, email, password, image = '' } = req.body;
  const serviceAnswer = await UserService.newUser({ displayName, email, password, image });
  res.status(201).json({ token: serviceAnswer });
});

const getAllUsers = rescue(async (_req, res) => {
  const serviceAnswer = await UserService.getAllUsers();
  res.status(200).json(serviceAnswer);
});

const getUserById = rescue(async (req, res) => {
  const { id } = req.params;
  const serviceAnswer = await UserService.getUserById(id);
  res.status(200).json(serviceAnswer);
});

const deleteUserById = rescue(async (req, res) => {
  const { id } = req.user;
  await UserService.deleteById(id);
  res.status(204).end();
});

const loginUser = rescue(async (req, res) => {
  await validateJoi(schemaLogin, req.body);
  const { email, password } = req.body;
  const serviceAnswer = await UserService.getUserLogin(email, password);
  const newToken = JwT.generateToken(serviceAnswer);
  res.status(200).json({ token: newToken });
});

module.exports = {
  newUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  loginUser,
};
