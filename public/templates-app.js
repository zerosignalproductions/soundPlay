angular.module('templates-app', ['about/about.tpl.html', 'home/home.tpl.html', 'playlist/playlist.tpl.html']);

angular.module("about/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/about.tpl.html",
    "<div class=\"row-fluid\">\n" +
    "  <h1 class=\"page-header\">About</h1>\n" +
    "  \n" +
    "  <p>soundPlay is a simple app to pull random playlists from SoundCloud. The idea for this app came from Josh over at <a href=\"http://listen2edm.com\">Listen2EDM</a></p>\n" +
    "\n" +
    "  <p>If you're into electronic music, go give his site a look.</p>\n" +
    "\n" +
    "  <h3>What's behind it?</h3>\n" +
    "  <p>I'm using AngularJS, Bootstrap, and NodeJS to power the website. All of the data is pulled from the SoundCloud API.</p>\n" +
    "\n" +
    "  <h3>What about new features?</h3>\n" +
    "  <p>Send me an email or hit me up on Github if you'd like to see any new features or come across any bugs.</p>\n" +
    "\n" +
    "  <h3>Why are there bugs?</h3>\n" +
    "  <p>This is just a side project for fun, so there will definitely be bugs. Send me an email if you find anything.</p>\n" +
    "\n" +
    "\n" +
    "  <ul>\n" +
    "    <li><a href=\"http://github.com/zerosignalproductions\">Github</a></li>\n" +
    "    <li><a href=\"http://linkedin.com/in/justindmyers\">LinkedIn</a></li>\n" +
    "    <li><a href=\"mailto:justin@justindmyers.com\">Email: justin@justindmyers.com</a></li>\n" +
    "  </ul></p>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<h1 class=\"page-header\">Now Playing</h1>\n" +
    "\n" +
    "<div class=\"alert alert-info\" ng-show=\"!currentTrack\">\n" +
    "  Select a category from the category list!\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"jumbotron\" ng-show=\"currentTrack\">\n" +
    "  <img class=\"track-author-artwork\" ng-src=\"{{currentTrack.artwork_url_large}}\">\n" +
    "  <h2 class=\"track-title\">{{currentTrack.title}}</h2>\n" +
    "  <p class=\"track-description\">{{currentTrack.description}}</p>\n" +
    "  <p class=\"track-genre\">{{currentTrack.genre}}</p>\n" +
    "  <p class=\"track-permalink\">{{currentTrack.permalink_url}}</p>\n" +
    "  <p class=\"track-tags\">{{currentTrack.tag_list}}</p>\n" +
    "\n" +
    "  <img class=\"track-author-image\" ng-src=\"{{currentTrack.user.avatar_url}}\">\n" +
    "  <p class=\"track-author-uri\">{{user.uri}}</p>\n" +
    "  <p class=\"track-author-user\">{{user.username}}</p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("playlist/playlist.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("playlist/playlist.tpl.html",
    "<div class=\"row-fluid\">\n" +
    "  <h1 class=\"page-header\">Playlist</h1>\n" +
    "\n" +
    "  <div class=\"alert alert-info\" ng-show=\"!currentTrack\">\n" +
    "    Select a category from the category list!\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"table-responsive\" ng-show=\"currentTrack\">\n" +
    "    <table class=\"playlist-table table table-striped table-hover\">\n" +
    "      <thead>\n" +
    "        <tr>\n" +
    "          <td></td>\n" +
    "          <td><span class=\"visually-hidden\">Track</span> #</td>\n" +
    "          <td>Art</td>\n" +
    "          <td>Time</td>\n" +
    "          <td>Username</td>\n" +
    "          <td>Track Title</td>\n" +
    "        </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "        <tr ng-repeat=\"track in playlist\">\n" +
    "          <td></td>\n" +
    "          <td>{{$index + 1}}</td>\n" +
    "          <td><img src=\"{{track.data.artwork_url}}\"></td>\n" +
    "          <td>{{track.data.duration | date:'mm:ss'}}</td>\n" +
    "          <td>{{track.data.user.username}}</td>\n" +
    "          <td>{{track.data.title}}</td>\n" +
    "        </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
