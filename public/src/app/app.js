angular.module( 'ngBoilerplate', [
  'listen2EdmServices',
  'audioPlayer',
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ngBoilerplate.playlist',
  'ui.router',
  'ui.offcanvas'
])

.constant('appConfig', {
  soundcloud: {
    consumer_key: '127b2e9be345501602ef7a47901e8142',
    tag_search_url: '//api.sandbox-soundcloud.com/tracks?tags=',
    track_get_url: '//api.soundcloud.com/resolve.json',
    explore_categories_url: '//api.soundcloud.com/explore/v2',
    explore_tracks_url: '//api.soundcloud.com/explore/v2'
  }
})

.value('$anchorScroll', angular.noop)
.value('ui.config', { uiRoute: { scope: true } })

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {
  $urlRouterProvider.otherwise( '/' );

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
})

.run( function run () { })

.controller('AppCtrl', ['$scope', '$location', 'trackData', 'playlistData', 'API', 'playlistFactory', function AppCtrl ( $scope, $location, trackData, playlistData, API, playlistFactory) {
  //$scope.playlist is for the <audio> player
  $scope.playlist = [];
  $scope.currentTrack = {};
  $scope.currentCategory = '';

  //Get all of the categories available
  $scope.musicCategories = API.Explore_Category.get({}, function(data) {
    $scope.categories = data.categories.music;
  });

  $scope.selectCategory = function(categoryName) {
    $scope.loadingNewCategory = true;
    $scope.currentCategory = categoryName;

    //First, pause the audio player
    $scope.audioPlayer.pause();

    //Get the list of songs in this category
    $scope.edmTracks = API.Explore_Tracks.get({ category: categoryName, limit: 50, tag: 'uniform-time-decay-experiement:1:' + Date.now()  }, function(data) {
      var songIDs = '';
      
      //Build a comma separated list of the songs
      _.each(data.docs, function(value, key) {
        songIDs += value.urn.split(':').slice(-1)[0] + ',';
      });

      //Get all of the song data from soundcloud
      API.Tag.get({ ids: songIDs }, function(data) {
        //Lets shuffle the array
        data = shuffle(data);

        //We pass in the playlist because we can't change the array reference or the audio
        //library freaks out for some reason
        $scope.playlist = playlistFactory.createAudioPlaylist($scope.playlist, data, true);
        $scope.setPlaylist($scope.playlist);
        playlistFactory.updatePlaylistArtwork(data, true);

        //Set the current track for the view
        $scope.setCurrentTrack(data[0]);
        $scope.currentTrack = data[0];
        $scope.audioPlayer.currentTrack = 0;
        $scope.loadingNewCategory = false;
      });
    });
  };

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (angular.isDefined( toState.data.pageTitle)) {
      $scope.pageTitle = toState.data.pageTitle + ' ' ;
    }
  });

  $scope.$on('audioplayer:play', function (scope, index) {
    $scope.setCurrentTrack($scope.playlist[index].data);
  });

  $scope.$on('audioplayer:pause', function () {

  });

  $scope.$on('audioplayer:load', function (autoplayNext, test) {

  });

  $scope.setCurrentTrack = function(newValue) {
    $scope.currentTrack = newValue;
    trackData.setCurrentTrack(newValue);
  };

  $scope.setPlaylist = function(newValue) {
    $scope.playlist = newValue;
    playlistData.setPlaylist(newValue);
  };

  $scope.prevTrack = function(index) {
    if(index > 1) {
      $scope.setCurrentTrack($scope.playlist[index - 2].data);
      $scope.audioPlayer.prev();
    }
  };

  $scope.nextTrack = function(index) {
    if(index < $scope.playlist.length) {
      $scope.setCurrentTrack($scope.playlist[index].data);
      $scope.audioPlayer.next();
    }
  };

  $scope.jumpToTime = function(event) { };

  function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}]);
