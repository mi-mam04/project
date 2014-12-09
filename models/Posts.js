/**
 * Database schema for posts
 */

var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	author: String,
	body: String,
	category: String
});

mongoose.model('Post', PostSchema);

