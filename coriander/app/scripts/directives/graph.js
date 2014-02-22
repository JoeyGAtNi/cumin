'use strict';

angular.module('corianderApp')
  .directive('graph', function () {
    return {
      template: '<highchart id="graph1" config="chartConfig"></highchart>',
      restrict: 'E',
      scope: {
      	data: '=',
        dataconfig: '='
      },
      link: function postLink(scope, element, attrs) {
        
      scope.chartConfig = {
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
            text: 'Sunshine'
        },
        loading: false
      };
      scope.$watch('data', function(newValue, oldValue) {        
        if (newValue !== oldValue) {
          
          update(scope.data);
        }
      });
function update (data) {
    scope.chartConfig = scope.dataconfig;
      var temp = [];
      var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%SZ").parse;
      
      data.values.forEach(function (d) {
        temp.push({'x':parseDate(d.at), 'y':parseFloat(d.value)});
      });
      scope.chartConfig.series[0].data = temp;
      
}
      }
    };
  });