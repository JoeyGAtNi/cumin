'use strict';

angular.module('corianderApp')
  .controller('LocationCtrl', function ($rootScope, $scope, $http) {

  	$scope.location = {};
	var feedId = '3acdd8e136793317418556256294b42d';
  	var urlFeed = $rootScope.urlM2X + '/feeds/' + feedId + '/location';
	$http({
        url: urlFeed,
        method: "GET",
        timeout: 10000,
        headers: {'Content-Type': 'application/json'}
    }).success(function (data) {
    	$scope.location = data;
    	console.log(data);
	    }).error(function (response, status) {

	    });

  });
