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


listen2EdmServices.factory('API', ['$resource',
  function($resource) {
    return {
      Tag: $resource('http://listen2edm.com/api/tags/', {}, {
        get: { method: 'GET', params: { key: '2e423223ad6c15256d910c38218d8351' }, isArray: true }
      }),
      Track: $resource('assets/testTracks.json', {}, {
        get: { method: 'GET', params: { key: '2e423223ad6c15256d910c38218d8351' } }
      })         
    };
  }
]);

 
listen2EdmServices.factory('edmTags', ['$resource',
  function($resource) {
    return $resource('http://listen2edm.com/api/tags', {}, {
      query: { method: 'GET', params: { key: '2e423223ad6c15256d910c38218d8351' }, isArray: true }
    });
  }
]);

listen2EdmServices.factory('edmTracks', ['$resource',
  function($resource) {
    return $resource('assets/testTracks.json', {}, {
      query: { method: 'GET', params: { key: '2e423223ad6c15256d910c38218d8351' } }
    });
  }
]);

listen2EdmServices.factory('edmGetTrack', ['$resource',
  function($resource) {
    return $resource('//api.soundcloud.com/resolve.json', { client_id: "127b2e9be345501602ef7a47901e8142" }, {
      query: { method: 'GET', params: { client_id: "127b2e9be345501602ef7a47901e8142" } }
    });
  }
]);