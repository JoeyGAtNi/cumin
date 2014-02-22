'use strict';

angular.module('corianderApp')
  .directive('graph', function () {
    return {
      template: '<div id="graph"></div>',
      restrict: 'E',
      scope: {
      	data: '='
      },
      link: function postLink(scope, element, attrs) {
      scope.$watch('data', function(newValue, oldValue) {        
        if (newValue !== oldValue) {
          console.log("List updated");
          update(scope.data.values);
        }
      });
function update (data) {
  console.log(data);



}
      }
    };
  });