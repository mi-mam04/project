var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Category = mongoose.model('Category');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title : 'Express'
	});
});

/* GET posts page. */
router.get('/api/posts', function(req, res) {

	// Search for all posts
	Post.find(function(err, posts) {
		if (err)
			res.send(err);

		// Return all posts
		res.json(posts);
	});
});

/* POST Add post */
router.post('/api/posts', function(req, res) {

	// Create post from Angular info
	Post.create({
		title : req.body.title,
		body : req.body.body,
		author : req.body.author
	}, function(err, post) {
		if (err)
			res.send(err);

		// get and return all the posts after creation
		Post.find(function(err, posts) {
			if (err) {
				res.send(err);
			}
			res.json(posts);
		});
	});

});

module.exports = router;