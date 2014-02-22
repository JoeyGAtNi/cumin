'use strict';

angular.module('corianderApp')
  .controller('MainCtrl', function ($scope, Websocket) {

  	Websocket.connectPay();
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
