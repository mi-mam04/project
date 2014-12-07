var project = angular.module('project', []);

function MainController($scope, $http) {
    $scope.formData = {};

    // Get all posts
    $http.get('/api/posts')
        .success(function(data) {
            $scope.posts = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('An error has occured: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.addPost = function() {
        $http.post('/api/posts', $scope.formData)
            .success(function(data) {
            	// clear the form
                $scope.formData = {}; 
                $scope.posts = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('An error has occured: : ' + data);
            });
    };
};