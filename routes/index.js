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
		author : req.body.author,
		category: req.body.category
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


/* GET posts per category */
router.get('/api/posts/category', function(req, res) {

	var o = {};
	// Map
	o.map = function() {
		// Store data in temp hash table
		emit(this.category, 1);
	};
	// Reduce
	o.reduce = function(k, count) {
		// Sum the counts to retrieve all
		return Array.sum(count);
	};
	// Outfile
	o.out = {
		replace : 'categoryResults'
	};
	// Turn on stats
	o.verbose = true;
	
	// Run MapReduce function
	Post.mapReduce(o, function(err, results, stats) {
		if (err) {
			res.send(err);
		}
		
		// Check runtime
		console.log("Running MapReduce cost %d ms", stats.processtime);		
		results.find(function(err, docs) {
			if (err) {
				console.log(err);
			}
			result = docs;
			res.json(docs);
		});

	});
	
});

/* GET posts per author */
router.get('/api/posts/author', function(req, res) {

	var o = {};
	// Map
	o.map = function() {
		// Store data in temp hash table
		emit(this.author, 1);
	};
	// Reduce
	o.reduce = function(k, count) {
		// Sum the counts to retrieve all
		return Array.sum(count);
	};
	// Outfile
	o.out = {
		replace : 'authorResults'
	};
	// Turn on stats
	o.verbose = true;
	
	// Run MapReduce function
	Post.mapReduce(o, function(err, results, stats) {
		if (err) {
			res.send(err);
		}
		
		// Check runtime
		console.log("Running MapReduce cost %d ms", stats.processtime);		
		results.find(function(err, docs) {
			if (err) {
				console.log(err);
			}
			result = docs;
			res.json(docs);
		});

	});
	
});

module.exports = router;