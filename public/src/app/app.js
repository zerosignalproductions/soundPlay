angular.module('ngBoilerplate', [
  'listen2EdmServices',
  'audioPlayer',
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ngBoilerplate.playlist',
  'ui.router',
  'ui.offcanvas'
]).constant('appConfig', {
  soundcloud: {
    consumer_key: '127b2e9be345501602ef7a47901e8142',
    tag_search_url: '//api.sandbox-soundcloud.com/tracks?tags=',
    track_get_url: '//api.soundcloud.com/resolve.json',
    explore_categories_url: '//api.soundcloud.com/explore/v2',
    explore_tracks_url: '//api.soundcloud.com/explore/v2'
  }
}).value('$anchorScroll', angular.noop).value('ui.config', { uiRoute: { scope: true } }).config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function myAppConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }
]).run(function run() {
}).controller('AppCtrl', [
  '$scope',
  '$location',
  'trackData',
  'playlistData',
  'API',
  'playlistFactory',
  function AppCtrl($scope, $location, trackData, playlistData, API, playlistFactory) {
    $scope.playlist = [];
    $scope.currentTrack = {};
    $scope.currentCategory = '';
    console.log($scope.uiRoute);
    $scope.musicCategories = API.Explore_Category.get({}, function (data) {
      $scope.categories = data.categories.music;
    });
    $scope.selectCategory = function (categoryName) {
      $scope.loadingNewCategory = true;
      $scope.currentCategory = categoryName;
      $scope.edmTracks = API.Explore_Tracks.get({
        category: categoryName,
        limit: 50,
        tag: 'uniform-time-decay-experiement:1:' + Date.now()
      }, function (data) {
        var songIDs = '';
        _.each(data.docs, function (value, key) {
          songIDs += value.urn.split(':').slice(-1)[0] + ',';
        });
        API.Tag.get({ ids: songIDs }, function (data) {
          data = shuffle(data);
          $scope.playlist = playlistFactory.createAudioPlaylist($scope.playlist, data, true);
          $scope.setPlaylist($scope.playlist);
          playlistFactory.updatePlaylistArtwork(data, true);
          $scope.setCurrentTrack(data[0]);
          $scope.currentTrack = data[0];
          $scope.loadingNewCategory = false;
        });
      });
    };
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = toState.data.pageTitle + ' ';
      }
    });
    $scope.$on('audioplayer:play', function (scope, index) {
      $scope.setCurrentTrack($scope.playlist[index].data);
    });
    $scope.$on('audioplayer:pause', function () {
    });
    $scope.$on('audioplayer:load', function (autoplayNext, test) {
    });
    $scope.setCurrentTrack = function (newValue) {
      $scope.currentTrack = newValue;
      trackData.setCurrentTrack(newValue);
    };
    $scope.setPlaylist = function (newValue) {
      $scope.playlist = newValue;
      playlistData.setPlaylist(newValue);
    };
    $scope.prevTrack = function (index) {
      if (index > 1) {
        $scope.setCurrentTrack($scope.playlist[index - 2].data);
        $scope.audioPlayer.prev();
      }
    };
    $scope.nextTrack = function (index) {
      if (index < $scope.playlist.length) {
        $scope.setCurrentTrack($scope.playlist[index].data);
        $scope.audioPlayer.next();
      }
    };
    $scope.jumpToTime = function (event) {
      console.log(event.offsetX);
    };
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  }
]);