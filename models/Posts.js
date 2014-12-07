/**
 * Database schema for posts
 */

var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	author: String,
	body: String,
	category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

mongoose.model('Post', PostSchema);