(function () {
    'use strict';
    angular.module('app').filter('bytes', [function () {
        return function (bytes, precision) {
            if(bytes==0)return bytes;
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return 'NA';
            if (typeof precision === 'undefined') precision = 1;
            var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
                number = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
        }
    }])
})();
