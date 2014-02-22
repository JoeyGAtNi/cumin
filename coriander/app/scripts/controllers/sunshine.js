'use strict';

angular.module('corianderApp')
  .controller('SunshineCtrl', function ($rootScope, $scope, $http) {

  $scope.sunshine = {};
  $scope.sunshineconfig = {
        options: {
            chart: {
                type: 'spline'
            },
            xAxis: {
              type: 'datetime'
            }
        },
        series: [{name:'sunshine',
            data: [0, 1]
        }],
        title: {
            text: 'Sunshine'
        },
        loading: false
      };
  $scope.pay = {};
    $scope.payconfig = {
        options: {
            chart: {
                type: 'spline'
            },
            xAxis: {
              type: 'datetime'
            }
        },
        series: [{name:'paid',
            data: [0, 1]
        }],
        title: {
            text: 'Payments'
        },
        loading: false
      };
  $scope.deliver = {};
    $scope.deliverconfig = {
        options: {
            chart: {
                type: 'spline'
            },
            xAxis: {
              type: 'datetime'
            }
        },
        series: [{name:'delivered',
            data: [0, 1]
        }],
        title: {
            text: 'Delivery'
        },
        loading: false
      };
  $scope.all = {};
  $scope.allconfig = {
        options: {
            chart: {
                type: 'spline'
            },
            xAxis: {
              type: 'datetime'
            }
        },
        series: [{name:'all',
            data: [0, 1]
        }],
        title: {
            text: 'Sunshine'
        },
        loading: false
      };

	var feedId = '3acdd8e136793317418556256294b42d';
	var streamId = 'sunshine';
  var urlFeed = $rootScope.urlM2X + '/feeds/' + feedId + '/streams/' + streamId + '/values';
	$http({
        url: urlFeed,
        method: "GET",
        timeout: 10000,
        headers: {'Content-Type': 'application/json'}
    }).success(function (data) {
      data.values = data.values.reverse();
    	$scope.sunshine = data;
	    }).error(function (response, status) {

	    });

  streamId = 'pay';
  urlFeed = $rootScope.urlM2X + '/feeds/' + feedId + '/streams/' + streamId + '/values';
  $http({
        url: urlFeed,
        method: "GET",
        timeout: 10000,
        headers: {'Content-Type': 'application/json'}
    }).success(function (data) {
      var temp = 0;
      data.values = data.values.reverse();
      data.values.forEach(function (d) {
        temp = temp + parseFloat(d.value);
          d.value = temp;
      });
      $scope.pay = data;
      }).error(function (response, status) {

      });

  streamId = 'deliver';
  urlFeed = $rootScope.urlM2X + '/feeds/' + feedId + '/streams/' + streamId + '/values';
  $http({
        url: urlFeed,
        method: "GET",
        timeout: 10000,
        headers: {'Content-Type': 'application/json'}
    }).success(function (data) {
      var temp = 0;
      var series = [];
      data.values = data.values.reverse();
      data.values.forEach(function (d) {
        temp = temp + parseFloat(d.value);
          d.value = temp;
      });
      $scope.deliver = data;
      series.push()
      }).error(function (response, status) {

      });

  });