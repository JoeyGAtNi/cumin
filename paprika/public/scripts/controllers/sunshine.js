'use strict';

angular.module('corianderApp')
  .controller('SunshineCtrl', function ($rootScope, $scope, $http) {

  $scope.feed = {};
	var feedId = '3acdd8e136793317418556256294b42d';
	var streamId = 'sunshine';
  var urlFeed = $rootScope.urlM2X + '/feeds/' + feedId + '/streams/' + streamId + '/values'
	$http({
        url: urlFeed,
        method: "GET",
        timeout: 10000,
        headers: {'Content-Type': 'application/json'}
    }).success(function (data) {
    	$scope.feed = data;
	    }).error(function (response, status) {

	    });

  });
