var resolve = require('../');

var registry = {
  // Canonical
  'jquery': 'http://some.url.com/jquery.js',
  'underscore.js': 'http://some.url.com/underscore.js',
  // Alias
  'underscore': 'underscore.js',
  'angular': 'angular.js',
  // Set
  'backbone': ['http://some.url.com/backbone.js', 'underscore', 'jquery'],
  // Depend on a set
  'app': ['backbone', 'http://some.thing.com/app.js'],
  // Duplication
  'duped': ['backbone', 'underscore'],
  // Async
  'async': ['angular', 'app']
};

var opts = {
  registry: registry,
  helper: function (identifier, cb) {
    return cb(null, ['http://angular']);
  }
};

Object.keys(registry).forEach(function (key) {
  resolve(key, opts, function (err, set) {
    console.log(key + ':', set);
  });
});