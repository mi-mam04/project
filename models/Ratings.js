/**
 * Database schema for Ratings
 */

var mongoose = require('mongoose');

var RatingSchema = new mongoose.Schema({
	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
	rating: Number
});

mongoose.model('Rating', RatingSchema);