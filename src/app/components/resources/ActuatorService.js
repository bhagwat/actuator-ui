(function () {
    'use strict';
    angular.module('app')
        .factory('ActuatorService', ["$resource", function ($resource) {
            return $resource("http://localhost:8090" + "/:endpoint");
        }
        ]);
})();