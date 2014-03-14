angular.module( 'ngBoilerplate', [
  'listen2EdmServices',
  'audioPlayer',
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ui.router'
])

.value('$anchorScroll', angular.noop)

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {
  $urlRouterProvider.otherwise( '/' );

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
})

.run( function run () { })

.controller('AppCtrl', ['$scope', '$location', 'trackData', 'edmTags', 'edmTracks', 'edmGetTrack', 'playlistFactory', function AppCtrl ( $scope, $location, trackData, edmTags, edmTracks, edmGetTrack, playlistFactory) {
  $scope.playlist = [];
  $scope.currentTrack = {};

  //$scope.edmTags = edmTags.query();
  $scope.edmTracks = edmTracks.query({}, function(data) {
    $scope.playlist = playlistFactory.createAudioPlaylist(data);
    playlistFactory.updatePlaylistArtwork(data);

    edmGetTrack.get({url: data[0].soundcloud.uri}, function(data) {
      $scope.setCurrentTrack($scope.edmTracks[0].soundcloud);
      $scope.currentTrack = $scope.edmTracks[0].soundcloud;
    });
  });

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' ' ;
    }
  });

  $scope.$on('audioplayer:play', function (scope, index) {
    $scope.setCurrentTrack($scope.edmTracks[index].soundcloud);
  });

  $scope.$on('audioplayer:pause', function () {

  });

  $scope.$on('audioplayer:load', function (autoplayNext, test) {

  });

  $scope.setCurrentTrack = function(newValue) {
    $scope.currentTrack = newValue;
    trackData.setCurrentTrack(newValue);
  };

  $scope.prevTrack = function(index) {
    if(index > 1) {
      $scope.setCurrentTrack($scope.edmTracks[index - 2].soundcloud);
      $scope.audioPlayer.prev();
    }
  };

  $scope.nextTrack = function(index) {
    if(index < $scope.playlist.length) {
      $scope.setCurrentTrack($scope.edmTracks[index].soundcloud);
      $scope.audioPlayer.next();
    }
  };
}]);
