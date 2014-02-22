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
        series: [{ name:'trend',
            data: [0, 1]
        }],
        title: {
            text: 'All'
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
        headers: {'Content-Type': 'application/json', 'X-M2X-KEY': $rootScope.m2xapi}
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
        headers: {'Content-Type': 'application/json', 'X-M2X-KEY': $rootScope.m2xapi}
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
        headers: {'Content-Type': 'application/json', 'X-M2X-KEY': $rootScope.m2xapi}
    }).success(function (data) {
        var temp = 0;
        var series = [];
        data.values = data.values.reverse();
        data.values.forEach(function (d) {
          temp = temp + parseFloat(d.value);
          d.value = temp;
        });
        $scope.deliver = data;
        // series.push({name:'paid',data:$scope.pay});
        // series.push({name:'delivered',data:$scope.deliver});
        // series.push({name:'sunshine',data:$scope.sunshine});
        // $scope.all.series = series;
        //console.log(series);
      }).error(function (response, status) {

      });
    $scope.allconfig.series[0] = $scope.sunshineconfig.series[0];
    $scope.allconfig.series[1] = $scope.payconfig.series[0];
    $scope.allconfig.series[2] = $scope.deliverconfig.series[0];

  $http({
        url: "http://ec2-50-17-139-19.compute-1.amazonaws.com:3000/rest/v1/pay",
        method: "GET",
        timeout: 10000,
        headers: {'Content-Type': 'application/json'}
    }).success(function (data) {
        $scope.payments = data;
      }).error(function (response, status) {

      });

  $http({
        url: "http://ec2-50-17-139-19.compute-1.amazonaws.com:3000/rest/v1/deliver",
        method: "GET",
        timeout: 10000,
        headers: {'Content-Type': 'application/json'}
    }).success(function (data) {
        $scope.deliveries = data;
      }).error(function (response, status) {

      });

  });

