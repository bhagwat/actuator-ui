(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController',
            ['$scope', '$interval', 'ActuatorService', function ($scope, $interval, ActuatorService) {
                var vm = this;

                var tasks = {
                    metrics: function (callback) {
                        ActuatorService.get({'endpoint': 'metrics'}, function (metrics) {
                            vm.metrics = metrics;
                            $scope.$broadcast('MetricsUpdateReceived', {metrics: metrics});
                            callback(null, metrics)
                        }, function () {
                            callback(null, {})
                        });
                    },
                    health: function (callback) {
                        ActuatorService.get({'endpoint': 'health'}, function (health) {
                            vm.health = health;
                            $scope.$broadcast('HealthUpdateReceived', {health: health});
                            callback(null, health)
                        }, function () {
                            callback(null, {})
                        });
                    }
                };

                vm.init = function () {
                    async.parallel(tasks, function (err, result) {
                        vm.lastUpdated = new Date();
                        vm.loading = false;
                    });
                };

                var refreshInterval = $interval(vm.init, 5 * 1000); //update every 5 seconds
                $scope.$on('$destroy', function () {
                    $interval.cancel(refreshInterval);
                });
            }
            ]);
})();
