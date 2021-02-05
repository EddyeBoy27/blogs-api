const express = require('express');
const PostController = require('./PostController');
const JwT = require('../middlewares/JwT');

const postRoute = express.Router();

postRoute.post('/', JwT.loginJwt, PostController.newPost);
postRoute.get('/', PostController.getAllPosts);
postRoute.get('/search', PostController.searchPost);
postRoute.put('/:id', JwT.loginJwt, PostController.updateById);
postRoute.get('/:id', PostController.getPostById);
postRoute.delete('/:id', JwT.loginJwt, PostController.deleteById);

module.exports = postRoute;
