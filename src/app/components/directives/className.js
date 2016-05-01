(function () {
    'use strict';

    angular
        .module('app')
        .directive('className', function messagesSectionDirective() {
            return {
                restrict: 'E',
                scope: {
                    className: '@'
                },
                template: '<span title="{{className}}">{{title}}</span>',
                link: function (scope, element, attrs) {
                    var className = scope.className;
                    var lastDotIndex = className.lastIndexOf(".");
                    if (lastDotIndex > -1) {
                        scope.title = className.substr(lastDotIndex + 1);
                    } else {
                        scope.title = className;
                    }
                    var dollorIndex = scope.title.indexOf("$");
                    if (dollorIndex > -1) {
                        scope.title = scope.title.substr(0, dollorIndex);
                    }
                }
            }
        });
})();