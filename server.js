var express = require('express'),
    app     = express(),
    path    = require('path'),
    port    = parseInt(process.env.PORT, 10) || 4567;

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());

  app.use(express.static(path.join(__dirname, '/public')));
  app.use(function(req, res) {
    return res.redirect(req.protocol + '://' + req.get('Host') + '/#' + req.url);
  });

  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));

  app.use(app.router);
});

app.listen(port);