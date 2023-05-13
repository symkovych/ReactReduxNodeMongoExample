var CommentsHandler = require('../handlers/comments');
var express = require('express');
var router = express.Router();
var CommentsHandler = new CommentsHandler();

router.patch('/update', CommentsHandler.updateComment);
router.post('/create', CommentsHandler.createComment);
router.delete('/delete', CommentsHandler.deleteComment);

module.exports = router;