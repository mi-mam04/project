/**
 * Database schema for posts
 */


var PostSchema = new mongoose.Schema({
	author: String,
	title: String,
	body: String,
	rating: Number,
	category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
});

mongoose.model('Post', PostSchema);