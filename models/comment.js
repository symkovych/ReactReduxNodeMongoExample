var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var CommentsSchema = new Schema({
    name: String,
    text: String,
    postId: {type: ObjectId, ref: 'Post', default: null},
    userId: {type: ObjectId, ref: 'User', default: null},
}, { collection: 'comments' });

var CommentModel = mongoose.model('Comment', CommentsSchema);

module.exports = CommentModel;