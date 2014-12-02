var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Category = mongoose.model('Category');
var Rating = mongoose.model('Rating');

/* 
 * Database test: obsolete
 * var testAuthor = new Author({name: 'Jaap'});
 * testAuthor.save(function (err, testAuthor) {
 * 	  if (err) return console.error(err);
 * 	  console.log("Creating " + testAuthor.name + "...");
 * 	});
 * 
 * var query = Author.findOne({ 'name': 'Jaap' });
 * query.select('name');
 * query.exec(function (err, author) {
 * 	  if (err) return handleError(err);
 * 	  console.log('We found %s!', author.name);
 * 	});
 */


// Getting posts
router.get('/posts', function(req, res, next) { 
	Post.find(function(err, posts){
		if(err){ 
			return next(err); 
		}
		res.json(posts);
   });
});

// Submitting posts
router.post('/posts', function(req, res, next) { 
	var post = new Post(req.body);
	post.save(function(err, post){ 
		if(err){ 
			return next(err); 
			}
		res.json(post);
   });
});

// Pre-loading a single post
router.param('post', function(req, res, next, id) {
	var query = Post.findById(id);
	query.exec(function (err, post){
	if (err) { return next(err); }
	if (!post) { return next(new Error("Cannot find post")); }
	     req.post = post;
	     return next();
	   });
});

// Getting a single post
router.get('/posts/:post', function(req, res) { 
	res.json(req.post);
});


module.exports = router;
