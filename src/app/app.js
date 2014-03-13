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
  $urlRouterProvider.otherwise( '/home' );

  // use the HTML5 History API
  //$locationProvider.html5Mode(true);
})

.run( function run () { })

.controller( 'AppCtrl', ['$scope', '$location', 'trackData', 'edmTags', 'edmTracks', 'edmGetTrack', function AppCtrl ( $scope, $location, trackData, edmTags, edmTracks, edmGetTrack) {
  $scope.playlist = [];
  //$scope.edmTags = edmTags.query();
  $scope.edmTracks = edmTracks.query({}, function(data) {
    _.each(data, function(value, key) {
      $scope.playlist[key] = {};

      if(typeof value.soundcloud !== 'undefined' && value.soundcloud.streamable) {
        //Pull the largest available image
        value.soundcloud.artwork_url = value.soundcloud.artwork_url.split('-').slice(0 , -1).join('-') + 
        value.soundcloud.artwork_url.split('-').slice(-1)[0].replace('large', '-t500x500');
        
         //value.soundcloud.artwork_url.split('-').splice(-1).replace('large', 't500x500');
        $scope.playlist[key].src = value.soundcloud.stream_url + '?client_id=127b2e9be345501602ef7a47901e8142';
        $scope.playlist[key].type = 'audio/mp3';
      }
    });

    $scope.test = edmGetTrack.get({url: data[0].soundcloud.uri}, function(data) {
      $scope.setCurrentTrack($scope.edmTracks[0].soundcloud);
      $scope.currentTrack = $scope.edmTracks[0].soundcloud;
    });
  });

  $scope.setCurrentTrack = function(newValue) {
    $scope.currentTrack = newValue;
    trackData.setCurrentTrack(newValue);
  };  

  $scope.$on('audioplayer:play', function (scope, index) {
    console.log('play' + index);
    $scope.setCurrentTrack($scope.edmTracks[index].soundcloud);
  });

  $scope.$on('audioplayer:pause', function () {
    console.log('paused');
  });

  $scope.$on('audioplayer:load', function (autoplayNext, test) {
    console.log(test);
  });

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

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }
  });
}]);
