'use strict';

angular.module('corianderApp')
  .directive('graph', function () {
    return {
      template: '<highchart id="graph1" config="chartConfig"></highchart>',
      restrict: 'E',
      scope: {
      	data: '='
      },
      link: function postLink(scope, element, attrs) {

      scope.chartConfig = {
        options: {
            chart: {
                type: 'spline'
            }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: 'Sunshine'
        },
        loading: false
      };
      scope.$watch('data', function(newValue, oldValue) {        
        if (newValue !== oldValue) {
          console.log(scope.data);
          update(scope.data);
        }
      });
function update (data) {
  
      var temp = [];
      var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%SZ").parse;

      data.values.forEach(function (d) {
        temp.push({'x':parseDate(d.at), 'y':parseFloat(d.value)});
      });
      scope.chartConfig.series[0].data = temp;
      console.log(scope.chartConfig);
}
      }
    };
  });