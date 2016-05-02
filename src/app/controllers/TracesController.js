(function () {
    angular
        .module('app')
        .controller('TracesController', [
            '$scope', '$filter', 'ActuatorService', 'lodash',
            function TracesController($scope, $filter, ActuatorService, lodash) {
                function formatResult(result) {
                    $scope.result = lodash.map(result, function (item) {
                        return {
                            timestamp: new Date(item.timestamp),
                            method: item.info.method,
                            path: item.info.path,
                            host: item.info.headers.request.host,
                            status: parseInt(item.info.headers.response.status, 10),
                            request: item.info.headers.request,
                            response: item.info.headers.response
                        }
                    });
                    $scope.total = result.length;
                    $scope.sortAndPaginateResult()
                }

                $scope.selected = [];

                $scope.query = {
                    order: '-timestamp',
                    limit: 10,
                    page: 1
                };

                $scope.sortAndPaginateResult = function () {
                    var orderedRecords = $filter('orderBy')($scope.result, $scope.query.order);
                    $scope.paginatedResult = $filter('offset')(orderedRecords, $scope.query.page, $scope.query.limit);
                };

                $scope.init = function (endpoint) {
                    $scope.promise = ActuatorService.query({endpoint: endpoint}, formatResult).$promise;
                };
            }
        ]);
})();
