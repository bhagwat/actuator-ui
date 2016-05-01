(function () {
    angular.module('app')
        .filter('offset', [function () {
            return function (input, pageNumber, pageSize) {
                pageNumber = parseInt(pageNumber, 10);
                pageSize = parseInt(pageSize, 10);
                var offset = (pageNumber - 1) * pageSize;
                return input.slice(offset, offset + pageSize);
            };
        }]);
})();