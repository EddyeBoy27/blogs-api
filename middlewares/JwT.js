const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Roz seu lindo atenção no comment abaixo porfavorzinho *_*
// Eu sei que o secret NÃO fica exposto, só deixei aqui pra facilitar vc não ter que criar o .env

const jwtConfig = {
  expiresIn: '1D',
  algorithm: 'HS256',
};

const secret = process.env.SECRET || 'lipexzx';

const generateToken = (userInfo) => {
  const token = jwt.sign({ data: userInfo }, secret, jwtConfig);
  return token;
};

const loginJwt = async (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    const err = { error: { message: 'Token não encontrado', code: 'Unauthorized' } };
    next(err);
  }
  try {
    const validToken = jwt.verify(token, secret);
    const { data: { id: idUser } } = validToken;
    const userExist = await User.findOne({ where: { id: idUser } });
    if (!userExist || userExist.dataValues.id !== idUser) {
      const err = { error: { message: 'Usuário não existe', code: 'Unauthorized' } };
      return next(err);
    }
    const { password: _, ...noPass } = userExist.dataValues;
    req.user = noPass;
    return next();
  } catch (err) {
    const error = { error: { message: err.message, code: 'Unauthorized' } };
    next(error);
  }
};

module.exports = {
  loginJwt,
  generateToken,
};
