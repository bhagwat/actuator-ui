(function () {
    angular
        .module('app')
        .controller('DiskSpaceController',
            ['$scope', '$filter', function ($scope, $filter) {
                var vm = this;

                vm.chartOptions = {
                    chart: {
                        type: 'pieChart',
                        height: 300,
                        donut: true,
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
                        title: 'Storage',
                        margin: {top: -10}
                    }
                };

                $scope.$on('HealthUpdateReceived', function (event, args) {
                    refreshChart(args.health);
                });

                function refreshChart(health) {
                    var freeSpaceTitle = "Free " + ($filter('bytes')(health.diskSpace.free, 2));
                    var usedSpaceTitle = "Used " + ($filter('bytes')(health.diskSpace.total - health.diskSpace.free, 2));
                    vm.visitorsChartData = [
                        {key: freeSpaceTitle, y: health.diskSpace.free},
                        {key: usedSpaceTitle, y: health.diskSpace.total - health.diskSpace.free}
                    ];
                }
            }
            ]);
})();
