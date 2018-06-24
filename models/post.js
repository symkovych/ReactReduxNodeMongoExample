var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var PostsSchema = new Schema({
  title: String,
  description: String,
  userId: { type: ObjectId, ref: 'User', default: null },
  userName: String,
  date: Date
}, { collection: 'posts' });

var PostModel = mongoose.model('Post', PostsSchema);

module.exports = PostModel;