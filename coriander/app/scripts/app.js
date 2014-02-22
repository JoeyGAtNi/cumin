'use strict';

angular.module('corianderApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/sunshine', {
        templateUrl: 'views/sunshine.html',
        controller: 'SunshineCtrl'
      })
      .when('/location', {
        templateUrl: 'views/location.html',
        controller: 'LocationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['$rootScope', '$http', function ($rootScope, $http) {
    
      $rootScope.m2xapi = 'd44448581dfdfad75c8cfb9df87a0d2e';
      $rootScope.urlM2X = 'http://api-m2x.att.com/v1';
      $rootScope.urlSocket = 'http://ec2-50-17-139-19.compute-1.amazonaws.com';
      $http.defaults.headers.common['X-M2X-KEY'] = $rootScope.m2xapi;

  }]);