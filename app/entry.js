'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');

let eventureApp = angular.module('eventureApp', [require('angular-route')]);

require('./services')(eventureApp);
require('./controllers')(eventureApp);
require('./components')(eventureApp);

eventureApp.config(['$routeProvider', function($route) {
  $route
    .when('/', {
      templateUrl: '/app/html/index.html',
    })
    .otherwise({
      redirectTo: '/',
    });
}]);
