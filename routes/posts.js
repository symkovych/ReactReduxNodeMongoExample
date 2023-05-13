var PostsHandler = require('../handlers/posts');
var express = require('express');
var router = express.Router();
var postsHandler = new PostsHandler();

router.get('/', postsHandler.getAllPosts);
router.patch('/:id', postsHandler.updatePost);
router.post('/', postsHandler.createPost);
router.delete('/:id', postsHandler.deletePost);

module.exports = router;