/**
 * Database schema for posts
 */

var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
	title: String,
	author: String,
	body: String,
	category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
	avgRating: Number,
	ratings: [Number]
});

mongoose.model('Post', PostSchema);