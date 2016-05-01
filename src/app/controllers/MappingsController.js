(function () {
    angular
        .module('app')
        .controller('MappingsController', [
            'ActuatorService', 'lodash',
            function MappingsController(ActuatorService, lodash) {
                var vm = this;

                vm.init = function () {
                    ActuatorService.get({endpoint: 'mappings'}, function (response) {
                        vm.mappings = response;
                        vm.totalMappings = lodash.keys(response).length - 2; //exclude "$promise", "$resolved"
                    });
                };
            }
        ]);
})();
