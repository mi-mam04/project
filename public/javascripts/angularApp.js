// Create module
angular.module('project', [ 'ui.router' ])

// Configure routes
.config(
		[ '$stateProvider', '$urlRouterProvider',
				function($stateProvider, $urlRouterProvider) {

					// Set home state
					$stateProvider
					.state('home', {
						url : '/home',
						templateUrl : '/home.html',
						controller : 'MainCtrl'
					})
					// If state unspecified, set to home
					

					// Set posts state
					.state('posts', {
						url : '/posts/{id}',
						templateUrl : '/posts.html',
						controller : 'PostsCtrl'
					});
					
					$urlRouterProvider.otherwise('home');
				} ])

// Create service
.factory('posts', [ function() {
	// service body
	var o = {
		posts : [ {
			title: 'post 1',
		    body: 'test',
			author: 'author 1',},
			{	
			title: 'post 2',
			body: 'test',
			author: 'author 2',}
			]
	};
	return o;

} ])

// Create main controller
.controller('MainCtrl', [
// Create var scope and inject posts from factory
'$scope', 'posts', function($scope, posts) {
	$scope.posts = posts.posts;
	$scope.test = 'Hello project!';

	$scope.addPost = function() {
		if ($scope.title === '' || $scope.author === '') {
			return;
		}
		$scope.posts.push({
			title : $scope.title,
			body : $scope.body,
			author : $scope.author
		});
		$scope.title = '';
		$scope.body = '';
		$scope.author = '';
	};

	

} ])

.controller(
		'PostsCtrl',
		[ '$scope', '$stateParams', 'posts',
				function($scope, $stateParams, posts) {
					$scope.post = posts.posts[$stateParams.id];
					
					// Add a rating
					$scope.addRating = function() {
						if ($scope.body === '') {
							return;
						}
						$scope.post.ratings.push({
							rating : $scope.rating,
						});
						$scope.body = '';
						$scope.author = '';
					};
				} ]);