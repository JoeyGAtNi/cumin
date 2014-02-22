'use strict';

angular.module('corianderApp')
  .controller('MainCtrl', function ($scope, websocket) {

  	websocket.connectPay();
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
