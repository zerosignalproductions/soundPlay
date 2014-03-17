angular.module('templates-app', ['about/about.tpl.html', 'home/home.tpl.html', 'playlist/playlist.tpl.html']);

angular.module("about/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/about.tpl.html",
    "<div class=\"row-fluid\">\n" +
    "  <h1 class=\"page-header\">About</h1>\n" +
    "  \n" +
    "  <p>Listen2EDM is a playlist for all the tracks from on the EDM.com network.</p>\n" +
    "\n" +
    "  <h3>Doesn't that defeat the purpose of the EDM.com network of sites?</h3>\n" +
    "  <p>Not if you just want to listen to music.</p>\n" +
    "  <h3>Why can't I x, y, or z? Why is it so ugly?</h3>\n" +
    "  <p>Because I want to see if people like the idea of it first before I invest some time into it.</p>\n" +
    "  <h3>Is this illegal?</h3>\n" +
    "  <p>Nope, just streaming shit from SoundCloud.</p>\n" +
    "  <h3>Again, doesn't that defeat the purpose of EDM.com and their sister sites?</h3>\n" +
    "  <p>Again... Not if you just want to listen to music.</p>\n" +
    "  <h3>I like this. Will it always be free?</h3>\n" +
    "  <p>Yep. I won't even think about putting ads on it.</p>\n" +
    "  <h3>Who are you?</h3>\n" +
    "  <p>Some kid named Josh Brody from Minneapolis. Feel free to creep or network.\n" +
    "  <ul>\n" +
    "    <li><a href=\"http://facebook.com/justadorbs\">Facebook</a></li>\n" +
    "    <li><a href=\"http://linkedin.com/in/joshmn\">LinkedIn</a></li>\n" +
    "    <li><a href=\"http://angel.co/joshmn\">Angel.Co</a></li>\n" +
    "    <li><a href=\"mailto:josh@josh.mn\">Email: josh@josh.mn</a></li>\n" +
    "  </ul></p>\n" +
    "\n" +
    "  <h3>You seem smart. Do you do anything else?</h3>\n" +
    "  <p>Yeah, I do. Lots of things.</p>\n" +
    "\n" +
    "  <h3>Are you available for work?</h3>\n" +
    "  <p>Yep. I'm currently broke as a joke paying out-of-pocket for my mom's chemo. It's depressing. I cleared out $150k+ paying for her <i>\"specialized treatments\"</i> and that only took 5 months to do. I'll take any work I can get right now.</p>\n" +
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
