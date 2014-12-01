/**
 * Database schema for posts
 */


var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
	title: String,
	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});
mongoose.model('Category', CategorySchema);