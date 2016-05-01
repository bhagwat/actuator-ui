(function () {
    angular
        .module('app')
        .controller('TracesController', [
            'ActuatorService',
            function TracesController(ActuatorService) {
                var vm = this;

                vm.init = function () {
                    ActuatorService.query({endpoint: 'trace'}, function (response) {
                        vm.traces = response;
                    });
                };
            }
        ]);
})();
