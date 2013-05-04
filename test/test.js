var resolve = require('../'),
    deepEqual = require('deeper'),
    t = require('tap');

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

var results = {
  jquery: [ 'http://some.url.com/jquery.js' ],
  'underscore.js': [ 'http://some.url.com/underscore.js' ],
  underscore: [ 'http://some.url.com/underscore.js' ],
  angular: [ 'http://angular' ],
  backbone: [ 'http://some.url.com/backbone.js',
    'http://some.url.com/underscore.js',
    'http://some.url.com/jquery.js' ],
  app: [ 'http://some.url.com/backbone.js',
    'http://some.url.com/underscore.js',
    'http://some.url.com/jquery.js',
    'http://some.thing.com/app.js' ],
  duped: [ 'http://some.url.com/backbone.js',
    'http://some.url.com/underscore.js',
    'http://some.url.com/jquery.js' ],
  async: [ 'http://angular',
    'http://some.url.com/backbone.js',
    'http://some.url.com/underscore.js',
    'http://some.url.com/jquery.js',
    'http://some.thing.com/app.js' ]
};

var opts = {
  registry: registry,
  helper: function (identifier, cb) {
    return cb(null, ['http://angular']);
  }
};

Object.keys(registry).forEach(function (key) {
  t.test(key, function (t) {
    resolve(key, opts, function (err, set) {
      t.ok(deepEqual(results[key], set));
      t.end();
    });
  });
});