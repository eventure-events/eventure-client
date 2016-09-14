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
      templateUrl: '/app/html/home.html',
    })
    .when('/profile', {
      templateUrl: '/app/html/profile.html',
    })
    .when('/profile/:username', {
      templateUrl: '/app/html/profile.html',
    })
    .when('/event', {
      templateUrl: '/app/html/event.html',
    })
    .when('/event/:id', {
      templateUrl: '/app/html/event-profile.html',
    })
    .when('/map', {
      templateUrl: '/app/html/map.html',
    })
    .when('/list', {
      templateUrl: '/app/html/list.html',
    })
    .when('/signup', {
      templateUrl: '/app/html/signup.html',
    })
    .otherwise({
      redirectTo: '/',
    });
}]);
