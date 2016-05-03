'use strict';

angular.module('angularMaterialAdmin', [
        'ngAnimate', 'ngCookies', 'ngTouch',
        'ngSanitize', 'ui.router', 'ngMaterial',
        'md.data.table', 'nvd3', 'app', "ngResource",
        "ngLodash", "googlechart"])
    .config(['$resourceProvider', function ($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }])
    .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                      $mdIconProvider) {
        $stateProvider
            .state('home', {
                url: '',
                templateUrl: 'app/views/main.html',
                controller: 'MainController',
                controllerAs: 'vm',
                abstract: true
            })
            .state('home.dashboard', {
                url: '/dashboard',
                controller: 'DashboardController',
                controllerAs: 'dashboardVm',
                templateUrl: 'app/views/dashboard.html',
                data: {
                    title: 'Dashboard'
                }
            })
            .state('home.beans', {
                url: '/beans',
                controller: 'BeansController',
                controllerAs: 'vm',
                templateUrl: 'app/views/beans.html',
                data: {
                    title: 'Beans'
                }
            })
            .state('home.mappings', {
                url: '/mappings',
                controller: 'MappingsController',
                controllerAs: 'vm',
                templateUrl: 'app/views/mappings.html',
                data: {
                    title: 'Mappings'
                }
            })
            .state('home.traces', {
                url: '/traces',
                controller: 'TracesController',
                controllerAs: 'vm',
                templateUrl: 'app/views/traces.html',
                data: {
                    title: 'HTTP Traces'
                }
            })
            .state('home.httpStats', {
                url: '/httpStats',
                controller: 'HttpStatsController',
                controllerAs: 'vm',
                templateUrl: 'app/views/httpStats.html',
                data: {
                    title: 'HTTP Stats'
                }
            })
            .state('home.threadDump', {
                url: '/threadDump',
                controller: 'ThreadDumpController',
                controllerAs: 'vm',
                templateUrl: 'app/views/threadDump.html',
                data: {
                    title: 'Thread Dump'
                }
            });

        $urlRouterProvider.otherwise('/dashboard');

        $mdThemingProvider
            .theme('default')
            .primaryPalette('grey', {
                'default': '600'
            })
            .accentPalette('teal', {
                'default': '500'
            })
            .warnPalette('defaultPrimary');

        $mdThemingProvider.theme('dark', 'default')
            .primaryPalette('defaultPrimary')
            .dark();

        $mdThemingProvider.theme('grey', 'default')
            .primaryPalette('grey');

        $mdThemingProvider.theme('custom', 'default')
            .primaryPalette('defaultPrimary', {
                'hue-1': '50'
            });

        $mdThemingProvider.definePalette('defaultPrimary', {
            '50': '#FFFFFF',
            '100': 'rgb(255, 198, 197)',
            '200': '#E75753',
            '300': '#E75753',
            '400': '#E75753',
            '500': '#E75753',
            '600': '#E75753',
            '700': '#E75753',
            '800': '#E75753',
            '900': '#E75753',
            'A100': '#E75753',
            'A200': '#E75753',
            'A400': '#E75753',
            'A700': '#E75753'
        });

        $mdIconProvider.icon('user', 'assets/images/user.svg', 64);
    });
