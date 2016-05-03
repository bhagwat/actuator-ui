(function () {
    'use strict';

    angular.module('app')
        .service('navService', [
            '$q', function ($q) {
                var menuItems = [
                    {
                        name: 'Dashboard',
                        icon: 'dashboard',
                        sref: '.dashboard'
                    },
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
                        name: 'Thread Dump',
                        icon: 'dashboard',
                        sref: '.threadDump'
                    }
                ];

                return {
                    loadAllItems: function () {
                        return $q.when(menuItems);
                    }
                };
            }
        ]);

})();
