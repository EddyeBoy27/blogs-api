const rescue = require('express-rescue');
const validateJoi = require('../middlewares/validateJoi');
// const JwT = require('../middlewares/JwT');
const PostService = require('../services/PostService');
const { schemaNewPost } = require('../middlewares/schemasJoi');

const newPost = rescue(async (req, res) => {
  await validateJoi(schemaNewPost, req.body);
  const { id: userId } = req.user;
  const { title, content } = req.body;
  const serviceAnswer = await PostService.newPost(userId, title, content);
  res.status(201).json(serviceAnswer);
});

const getAllPosts = rescue(async (req, res) => {
  const serviceAnswer = await PostService.getAllPosts();
  res.status(200).json(serviceAnswer);
});

const updateById = rescue(async (req, res) => {
  await validateJoi(schemaNewPost, req.body);
  const { user: { id: userId }, params: { id: postId }, body: { title, content } } = req;
  const serviceAnswer = await PostService.updateById(userId, postId, title, content);
  res.status(200).json(serviceAnswer);
});

const getPostById = rescue(async (req, res) => {
  const { id } = req.params;
  const serviceAnswer = await PostService.getPostById(id);
  res.status(200).json(serviceAnswer);
});

const searchPost = rescue(async (req, res) => {
  const { q: searchTerm } = req.query;
  const serviceAnswer = await PostService.searchPost(searchTerm);
  res.status(200).json(serviceAnswer);
});

const deleteById = rescue(async (req, res) => {
  const { params: { id: postId }, user: { id: userId } } = req;
  await PostService.deleteById(postId, userId);
  res.status(204).end();
});

module.exports = {
  newPost,
  getAllPosts,
  updateById,
  getPostById,
  searchPost,
  deleteById,
};
