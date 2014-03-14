describe( 'AppCtrl', function() {
  describe( 'Initial Controller Run', function() {
    var AppCtrl, $location, $scope;

    beforeEach(function() {
      module('trackFeed', 'ngBoilerplate');
    });

    beforeEach( inject( function(_$httpBackend_, $controller, $rootScope, defaultJSON) {
      $httpBackend = _$httpBackend_;

      $httpBackend.expectGET('assets/testTracks.json?key=2e423223ad6c15256d910c38218d8351').respond(defaultJSON);
      $httpBackend.expectGET('//api.soundcloud.com/resolve.json?client_id=127b2e9be345501602ef7a47901e8142&url=http:%2F%2Fapi.soundcloud.com%2Ftracks%2F104309627').respond(defaultJSON);

      $scope = $rootScope.$new();
      AppCtrl = $controller('AppCtrl', { $scope: $scope });
    }));

    it('should load the tracks and set the current track to the first element', inject( function() {
      expect($scope.playlist).toEqual([]);
      $httpBackend.flush();
      //Make sure that currentTrack is equal to edmTracks[0]
      expect($scope.currentTrack).toEqual($scope.edmTracks[0].soundcloud);
    }));
  });



  describe( 'Controller Functions', function() {
    var AppCtrl, $location, $scope;

    beforeEach(function() {
      module('ngBoilerplate', 'listen2EdmServices', 'trackFeed');
    });

    beforeEach( inject( function($controller, $rootScope) {
      $scope = $rootScope.$new();
      AppCtrl = $controller('AppCtrl', { $scope: $scope });
    }));

    it('should set the current track', inject(function() {
      expect($scope.currentTrack).toEqual({});
      $scope.setCurrentTrack({"testValue": "newTrack" });
      expect($scope.currentTrack).toEqual({"testValue": "newTrack" });
    }));

    it('should go to the next track', inject(function() {

    }));

    it('should go to the prev track', inject(function() {

    }));
  });
});