'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./style/scss/main.scss');

const angular = require('angular');

let eventureApp = angular.module('eventureApp', [require('angular-route')]);

require('./services')(eventureApp);
require('./components')(eventureApp);

eventureApp.config(['$logProvider', function($logProvider){
  $logProvider.debugEnabled(__DEBUG__);
}]);

eventureApp.config(['$routeProvider', function($route) {
  $route
    .when('/', {
      template: require('./html/home.html'),
    })
    .when('/profile', {
      template: require('./html/profile.html'),
    })
    .when('/profile/:username', {
      template: require('./html/profile.html'),
    })
    .when('/event', {
      template: require('./html/event.html'),
    })
    .when('/event/:id', {
      template: require('./html/event-profile.html'),
    })
    .when('/map', {
      template: require('./html/map.html'),
    })
    .when('/list', {
      template: require('./html/list.html'),
    })
    .when('/signup', {
      template: require('./html/signup.html'),
    })
    .otherwise({
      redirectTo: '/',
    });
}]);
