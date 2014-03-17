/*

 http://listen2edm.com/api/tags?key=2e423223ad6c15256d910c38218d8351
  # returns json of tags categorized

http://listen2edm.com/api/tags?id=15key=2e423223ad6c15256d910c38218d8351
  # returns tag 15

http://listen2edm.com/api/tags?slug=remix&key=2e423223ad6c15256d910c38218d8351
  # returns slug remix

http://listen2edm.com/api/tracks?slug=remix&key=2e423223ad6c15256d910c38218d8351
  # returns first 25 results of tracks where they have a tag of remix

http://listen2edm.com/api/tracks?slug=remix&offset=25&key=2e423223ad6c15256d910c38218d8351
  # returns next 25 results of tracks where they have a tag of remix

http://listen2edm.com/api/tracks?id=6050&key=2e423223ad6c15256d910c38218d8351
  # returns track 6050

//http://api.soundcloud.com/tracks?tags=jazz,techno&consumer_key=1234

[
  { src: 'http://some.where.com', type: 'audio/ogg' },

*/

var listen2EdmServices = angular.module('listen2EdmServices', ['ngResource']);

listen2EdmServices.service('trackData', function () {
  var currentTrack;

  return {
    getCurrentTrack: function () {
        return currentTrack;
    },
    setCurrentTrack: function(value) {
        currentTrack = value;
    }
  };
});

listen2EdmServices.service('categoryData', function () {
  var categories;

  return {
    getCurrentTrack: function () {
        return categories;
    },
    setCurrentTrack: function(value) {
        categories = value;
    }
  };
});

listen2EdmServices.service('playlistData', function () {
  var currentPlaylist;

  return {
    getPlaylist: function () {
      return currentPlaylist;
    },
    setPlaylist: function(value) {
      currentPlaylist = value;
    }
  };
});

listen2EdmServices.factory('API', ['$resource', 'appConfig',
  function($resource, appConfig) {
    return {
      Explore_Category: $resource( appConfig.soundcloud.explore_categories_url, { consumer_key: appConfig.soundcloud.consumer_key }, {
        get: { method: 'GET', params: { } }
      }),
      Explore_Tracks: $resource( appConfig.soundcloud.explore_tracks_url + '/:category', { limit: '10', category: '@category', consumer_key: appConfig.soundcloud.consumer_key }, {
        get: { method: 'GET', params: { } }
      }),

      Tag: $resource('//api.soundcloud.com/tracks', { consumer_key: appConfig.soundcloud.consumer_key }, {
        get: { method: 'GET', params: { consumer_key: appConfig.soundcloud.consumer_key }, isArray: true }
      }),

      TrackStream: $resource('//api.soundcloud.com/resolve.json', { client_id: appConfig.soundcloud.consumer_key }, {
        get: { method: 'GET', params: { client_id: appConfig.soundcloud.consumer_key } }
      }),

      Tracks: $resource('assets/testTracks.json', {}, {
        get: { method: 'GET', params: { key: appConfig.soundcloud.consumer_key } }
      })         
    };
  }
]);

listen2EdmServices.factory('playlistFactory', ['appConfig', function(appConfig) {
  return {
    updatePlaylistArtwork: function(data, isSoundCloud) {
      _.each(data, function(value, key) {
        if(value.artwork_url !== null && isSoundCloud && value.streamable) {
          value.artwork_url_large = value.artwork_url.split('-').slice(0 , -1).join('-') + 
          value.artwork_url.split('-').slice(-1)[0].replace('large', '-t500x500');
        } else if(typeof value.soundcloud !== 'undefined' && value.soundcloud.streamable) {
          //Pull the largest available image
          value.soundcloud.artwork_url_large = value.soundcloud.artwork_url.split('-').slice(0 , -1).join('-') + 
          value.soundcloud.artwork_url.split('-').slice(-1)[0].replace('large', '-t500x500');
        }
      });
    },
    createAudioPlaylist: function(playlist, data, isSoundCloud) {
      _.each(data, function(value, key) {
        playlist[key] = {};

        if(isSoundCloud && value.streamable) {
          playlist[key].src = value.stream_url + '?client_id=' + appConfig.soundcloud.consumer_key;
          playlist[key].type = 'audio/mp3';
          playlist[key].data = value;
        } else if(typeof value.soundcloud !== 'undefined' && value.soundcloud.streamable) {
          playlist[key].src = value.soundcloud.stream_url + '?client_id=' + appConfig.soundcloud.consumer_key;
          playlist[key].type = 'audio/mp3';
          playlist[key].data = value.soundcloud;
        }
      });
      return playlist;
    }
  };
}]);