angular.module('ngBoilerplate.home', [
  'ui.router',
  'listen2EdmServices'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      views: {
        'main': {
          controller: 'HomeCtrl',
          templateUrl: 'home/home.tpl.html'
        }
      },
      data: { pageTitle: 'Home' }
    });
  }
]).controller('HomeCtrl', [
  '$scope',
  'trackData',
  function ($scope, trackData) {
    $scope.currentTrack = trackData.getCurrentTrack();
    $scope.trackData = trackData;
    $scope.$watch('trackData.getCurrentTrack()', function (newValue) {
      $scope.currentTrack = newValue;
      console.log(newValue);
    });
  }
]);