(function () {
    'use strict';

    angular.module('app')
        .service('navService', [
            '$q',
            navService
        ]);

    function navService($q) {
        var menuItems = [
            {
                name: 'Beans',
                icon: 'dashboard',
                sref: '.beans'
            },
            {
                name: 'Mappings',
                icon: 'dashboard',
                sref: '.mappings'
            },
            {
                name: 'HTTP Trace',
                icon: 'dashboard',
                sref: '.traces'
            },
            {
                name: 'HTTP Stats',
                icon: 'dashboard',
                sref: '.httpStats'
            },
            {
                name: 'Dashboard',
                icon: 'dashboard',
                sref: '.dashboard'
            }
        ];

        return {
            loadAllItems: function () {
                return $q.when(menuItems);
            }
        };
    }

})();
