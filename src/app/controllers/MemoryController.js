(function () {
    angular
        .module('app')
        .controller('MemoryController',
            ['$scope', function ($scope) {
                var vm = this;

                vm.chartOptions = {
                    chart: {
                        type: 'pieChart',
                        height: 300,
                        donut: true,
                        pie: {
                            startAngle: function (d) {
                                return d.startAngle / 2 - Math.PI / 2
                            },
                            endAngle: function (d) {
                                return d.endAngle / 2 - Math.PI / 2
                            }
                        },
                        x: function (d) {
                            return d.key;
                        },
                        y: function (d) {
                            return d.y;
                        },
                        valueFormat: (d3.format(".0f")),
                        color: ['#E75753', 'rgb(0, 150, 136)'],
                        showLabels: true,
                        showLegend: true,
                        tooltips: false,
                        labelType: "percent",
                        titleOffset: -10,
                        margin: {bottom: -80, left: -20, right: -20}
                    }
                };

                $scope.$on('MetricsUpdateReceived', function (event, args) {
                    refreshChart(args.metrics);
                });

                function refreshChart(metrics) {
                    vm.chartOptions.chart.title = metrics["mem"] + " KB";
                    vm.memoryChartData = [
                        {key: "Used", y: metrics["mem"] - metrics["mem.free"]},
                        {key: "Free", y: metrics["mem.free"]}
                    ];
                }
            }
            ]);
})();
