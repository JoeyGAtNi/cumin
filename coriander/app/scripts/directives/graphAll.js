'use strict';

angular.module('corianderApp')
  .directive('graphAll', function () {
    return {
      template: '<highchart id="graphall" config="dataconfig"></highchart>',
      restrict: 'E',
      scope: {
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
            text: 'Graph'
        },
        loading: false
      };

      scope.$watch('dataconfig', function(newValue, oldValue) {        
        if (newValue !== oldValue) {     
          update(scope.dataConfig);
        }
      },true);
		function update (data) {
		    scope.chartConfig = scope.dataConfig;
		      console.log(data);
		      var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%SZ").parse;
		      console.log(data);
		     
		}
      }
    };
});
