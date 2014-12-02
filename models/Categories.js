/**
 * Database schema for posts
 */

var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	title: String
});


mongoose.model('Category', CategorySchema);