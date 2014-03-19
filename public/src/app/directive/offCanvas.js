angular.module('ui.offcanvas', ['ui.bootstrap.transition']).directive('offcanvas', [
  '$transition',
  '$timeout',
  function ($transition, $timeout) {
    return {
      link: function (scope, element, attrs) {
        var initialAnimSkip = true;
        var currentTransition;
        function doTransition(time) {
          return $timeout(angular.noop, time);
        }
        function expand() {
          if (initialAnimSkip) {
            initialAnimSkip = false;
            expandDone();
          } else {
            element.removeClass('offcanvas').addClass('offcanvasing offcanvas in');
            doTransition(500).then(expandDone);
          }
        }
        function expandDone() {
          element.removeClass('offcanvasing');
        }
        function offcanvas() {
          if (initialAnimSkip) {
            initialAnimSkip = false;
            offcanvasDone();
          } else {
            element.removeClass('offcanvas in').addClass('offcanvasing');
            doTransition(500).then(offcanvasDone);
          }
        }
        function offcanvasDone() {
          element.removeClass('offcanvasing');
          element.addClass('offcanvas');
        }
        scope.$watch(attrs.offcanvas, function (shouldoffcanvas) {
          if (shouldoffcanvas) {
            offcanvas();
          } else {
            expand();
          }
        });
      }
    };
  }
]);