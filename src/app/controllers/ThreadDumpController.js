(function () {
    angular
        .module('app')
        .controller('ThreadDumpController', [
            'ActuatorService',
            function ThreadDumpController(ActuatorService) {
                var vm = this;

                vm.init = function (endpoint) {
                    ActuatorService.query({endpoint: endpoint}, function (threadDump) {
                        vm.threadDump = threadDump;
                    })
                };
            }
        ]);
})();
