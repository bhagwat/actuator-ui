(function () {
    angular
        .module('app')
        .controller('MappingsController', [
            'ActuatorService', '$scope', '$filter', 'lodash',
            function MappingsController(ActuatorService, $scope, $filter, lodash) {
                var vm = this;

                function formatResult(result) {
                    delete result.$promise;
                    delete result.$resolved;
                    result = lodash.map(result, function (value, key) {
                        value.uri = key;
                        return value;
                    });
                    $scope.result = result;
                    $scope.total = $scope.result.length;
                    $scope.sortAndPaginateResult();
                }

                $scope.selected = [];

                $scope.query = {
                    order: '-uri',
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
