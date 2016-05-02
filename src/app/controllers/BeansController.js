(function () {
    angular
        .module('app')
        .controller('BeansController', [
            'ActuatorService', '$scope', '$filter',
            function BeansController(ActuatorService, $scope, $filter) {
                var vm = this;

                function formatResult(result) {
                    $scope.result = result[0].beans;
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
                    $scope.promise = ActuatorService.query({endpoint: endpoint}, formatResult).$promise;
                };
            }
        ]);
})();
