var blink = angular.module('directive.blink', [])
    .directive('blink', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope, $element) {
                function showElement() {
                    $element.css("display", "inline");
                    $timeout(hideElement, 1000);
                }

                function hideElement() {
                    $element.css("display", "none");
                    $timeout(showElement, 1000);
                }
                showElement();
            },
            template: '<span ng-transclude></span>',
            replace: true
        };
    }]);

