(function () {
    angular
        .module('app')
        .controller('HttpStatsController', [
            '$scope', '$filter', 'ActuatorService', 'lodash', '$window',

            function HttpStatsController($scope, $filter, ActuatorService, lodash, $window) {
                function formatResult(result) {
                    var stats = {};
                    lodash.forEach(result, function (value, key) {
                        if (key.indexOf("counter.status.") > -1) {
                            var statusAndUrl = key.split("counter.status.")[1];
                            var dotIndex = statusAndUrl.indexOf(".");
                            var status = statusAndUrl.substr(0, dotIndex);
                            var counterUrl = statusAndUrl.substr(dotIndex + 1);
                            stats[counterUrl] = stats[counterUrl] || {};
                            stats[counterUrl].url = counterUrl;
                            stats[counterUrl].status = parseInt(status, 10);
                            stats[counterUrl].counter = value;
                        } else if (key.indexOf("gauge.response.") > -1) {
                            var gaugeUrl = key.split("gauge.response.")[1];
                            stats[gaugeUrl] = stats[gaugeUrl] || {};
                            stats[gaugeUrl].url = gaugeUrl;
                            stats[gaugeUrl].responseTime = value;
                        }
                    });
                    $scope.result = lodash.values(stats);
                    $scope.total = $scope.result.length;
                    $scope.sortAndPaginateResult();
                }

                $scope.selected = [];

                $scope.query = {
                    order: '-responseTime',
                    limit: 10,
                    page: 1
                };

                $scope.sortAndPaginateResult = function () {
                    var orderedRecords = $filter('orderBy')($scope.result, $scope.query.order);
                    $scope.paginatedResult = $filter('offset')(orderedRecords, $scope.query.page, $scope.query.limit);
                };

                $scope.init = function (endpoint) {
                    $scope.promise = ActuatorService.get({endpoint: endpoint}, formatResult).$promise;
                };
            }
        ]);
})();
