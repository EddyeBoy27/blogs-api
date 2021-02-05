const { Op } = require('sequelize');
const { User, BlogPosts } = require('../models');

const newPost = async (id, title, content) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) {
    const error = { error: { message: 'Usuário não existe', code: 'Invalid_data' } };
    throw error;
  }
  const modelAnswer = await user.createPost({
    title,
    content,
  });
  return modelAnswer;
};

const getAllPosts = async () => {
  const posts = await BlogPosts.findAll({
    // linhas 21 e 22 com ajuda do John
    // no meu UserModel eu referencio uma foreignKey, com isso o include abaixo
    // sabe como referenciar cada usuário quando busco no BlogPosts
    attributes: { exclude: ['userId'] },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });
  if (!posts) {
    const error = { error: { message: 'Dados não encontrados', code: 'Not_found' } };
    throw error;
  }
  return posts;
};

const updateById = async (userId, postId, title, content) => {
  const post = await BlogPosts.findByPk(postId);
  if (!post) {
    const error = { error: { message: 'Post não encontrado', code: 'Not_found' } };
    throw error;
  }
  const user = await User.findByPk(userId);
  if (!user) {
    const error = { error: { message: 'Usuário não encontrado', code: 'Not_found' } };
    throw error;
  }
  if (post.dataValues.userId !== user.dataValues.id) {
    const error = { error: { message: 'Acesso negado', code: 'Forbidden' } };
    throw error;
  }
  await BlogPosts.update({ title, content }, { where: { id: postId } });
  const modelAnswer = await BlogPosts.findByPk(postId);
  return modelAnswer;
};

const getPostById = async (id) => {
  const post = BlogPosts.findByPk(id, {
    attributes: { exclude: ['userId'] },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });
  if (!post) {
    const error = { error: { message: 'Post não encontrado', code: 'Not_found' } };
    throw error;
  }
  return post;
};

const searchPost = async (searchTerm) => {
  const modelAnswer = await BlogPosts.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { content: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
    attributes: { exclude: ['userId'] },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });
  if (!modelAnswer) {
    return [];
  }
  return modelAnswer;
};

const deleteById = async (postId, userId) => {
  const post = await BlogPosts.findByPk(postId);
  if (!post) {
    const error = { error: { message: 'Post não encontrado', code: 'Not_found' } };
    throw error;
  }

  if (post.dataValues.userId !== userId) {
    const error = { error: { message: 'Acesso negado', code: 'Forbidden' } };
    throw error;
  }
  await BlogPosts.destroy({ where: { id: postId } });
};

module.exports = {
  newPost,
  getAllPosts,
  updateById,
  getPostById,
  searchPost,
  deleteById,
};
