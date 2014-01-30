'use strict';

var helloWorldApp = angular.module('helloWorldApp', [
    'ngRoute',
    'ngResource'
]);

helloWorldApp.config(['$locationProvider', '$httpProvider', '$routeProvider', function($locationProvider, $httpProvider, $routeProvider){

    // set pretty urls (/{routname} vs /#{routename})
    $locationProvider.html5Mode(true);
    // if you don't do the line above, this line will change the '#' to whatever you set here
    // changing this can be helpful if you want to use anchors (/#{elementId}) on your pages to jump to different sections
    $locationProvider.hashPrefix('!');

    // we set this so that any http call from Angular (via $http, $resource) looks like your usual jQuery ajax call
    // AngularJS no longer does this by default
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    $routeProvider.
        when('/', {
            templateUrl: 'partials/index.html',
            controller: 'IndexCtrl'
        }).
        when('/users', {
            templateUrl: 'partials/users.html',
            controller: 'UserCtrl'
        }).
        when('/404', {
            template: "<p><strong>404: This is not the page you are looking for</strong></p>"
        }).
        otherwise({
            redirectTo: '/404'
        });

}]); 

helloWorldApp.controller('IndexCtrl', ['$scope', function($scope) {
    $scope.welcome = "Welcome to helloWorldApp";
}]);

helloWorldApp.controller('UserCtrl', ['$scope', 'UserService', function($scope, UserService) {
    $scope.users = UserService.query();

    $scope.user = { department: 'Accounting' };

    $scope.add = function(user) {

        $scope.users.push(UserService.save({user: user})); // save user, and push returned user to array
        $scope.user = { department: 'Accounting' }; // reset user        

    };

}]);

helloWorldApp.factory('UserService', ['$resource', function($resource) {

    // for more info on what is happening here, look at angular docs for $resource
    // essentially $resource returns an object with several RESTful functions mapped
    // against the route sent in. We use .query() and .save() in UserCtrl
    return $resource('/users/:id', {id: '@id'});

}]);
