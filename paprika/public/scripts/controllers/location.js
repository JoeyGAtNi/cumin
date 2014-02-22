'use strict';

angular.module('corianderApp')
  .controller('LocationCtrl', function ($rootScope, $scope, $http) {

  $scope.location = {};
  $scope.map = {
      center: {
          latitude: 45,
          longitude: -75
      },
      zoom: 8
  };

	var feedId = '3acdd8e136793317418556256294b42d';
  var urlFeed = $rootScope.urlM2X + '/feeds/' + feedId + '/location';

	$http({
        url: urlFeed,
        method: "GET",
        timeout: 10000,
        headers: {'Content-Type': 'application/json', 'X-M2X-KEY': $rootScope.m2xapi}
    }).success(function (data) {
    	$scope.location = data;
    	
      $scope.map = {
          center: {
              latitude: $scope.location.latitude,
              longitude: $scope.location.longitude
          },
          zoom: 8
      };
      console.log($scope.map);
	    }).error(function (response, status) {

	    });

  });
