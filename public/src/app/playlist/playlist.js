angular.module( 'ngBoilerplate.playlist', [
  'ui.router',
  'listen2EdmServices',  
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'playlist', {
    url: '/playlist',
    views: {
      'main': {
        controller: 'PlaylistCtrl',
        templateUrl: 'playlist/playlist.tpl.html'
      }
    },
    data:{ pageTitle: 'Playlist' }
  });
})

.controller( 'PlaylistCtrl', ['$scope', 'trackData', 'playlistData', function ( $scope, trackData, playlistData ) {
  $scope.trackData = trackData;
  $scope.playlistData = playlistData;
  $scope.currentTrack = trackData.getCurrentTrack();
  $scope.playlist = [];

  $scope.$watch('playlistData.getPlaylist()', function(newValue) {
    $scope.playlist = newValue;
  });  

  $scope.$watch('trackData.getCurrentTrack()', function(newValue) {
    $scope.currentTrack = newValue;
  });
}]);