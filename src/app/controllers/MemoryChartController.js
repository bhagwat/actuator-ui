(function () {
    angular
        .module('app')
        .controller('MemoryChartController', ['$scope', function ($scope) {
            var vm = this;
            vm.memoryChartData = [
                {
                    values: [],      //values - represents the array of {x,y} data points
                    key: 'Total Memory'
                },
                {
                    values: [],      //values - represents the array of {x,y} data points
                    key: 'Free Memory'
                },
                {
                    values: [],
                    key: 'Heap Used'
                },
                {
                    values: [],
                    key: 'Non-heap used'
                }
            ];
            vm.chartOptions = {
                chart: {
                    type: 'lineChart',
                    height: 300,
                    width: 500,
                    useInteractiveGuideline: true,
                    showXAxis: true,
                    xAxis: {
                        axisLabel: 'Time (seconds)'
                    },
                    showYAxis: true,
                    yAxis: {
                        axisLabel: 'Used memory (MB)'
                    },
                    showLegend: true
                }
            };

            var startTimeInMillis = new Date().getTime();
            var timeAxis = 0;
            var margin = {top: 20, right: 80, bottom: 30, left: 50},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            var parseDate = d3.time.format("%Y%m%d").parse;
            $scope.$on('MetricsUpdateReceived', function (event, args) {
                var currentTimeInMillis = new Date().getTime();
                // var timeAxis = (currentTimeInMillis - startTimeInMillis);
                timeAxis += 2;
                var metrics = args.metrics;
                vm.memoryChartData[0].values.push({
                    x: timeAxis,
                    y: formatBytes(metrics, "mem")
                });
                vm.memoryChartData[1].values.push({
                    x: timeAxis,
                    y: formatBytes(metrics, "mem.free")
                });
                vm.memoryChartData[2].values.push({
                    x: timeAxis,
                    y: formatBytes(metrics, "heap.used")
                });
                vm.memoryChartData[3].values.push({
                    x: timeAxis,
                    y: formatBytes(metrics, "nonheap.used")
                });
            });

            function formatBytes(metrics, key) {
                return (metrics[key] / 1024).toFixed(1);
            }
        }
        ]);
})();
