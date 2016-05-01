(function () {
    angular
        .module('app')
        .controller('BeansController', [
            'ActuatorService',
            function BeansController(ActuatorService) {
                var vm = this;

                vm.init = function () {
                    ActuatorService.query({endpoint: 'beans'}, function (response) {
                        vm.contexts = response;
                    });
                };
            }
        ]);
})();
