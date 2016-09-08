'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');

let eventureClient = angular.module('lorApp', [require('angular-route')]);

eventureClient.config(['$routeProvider', function($route) {
  $route
    .when('/', {
      templateUrl: '/app/html/index.html',
    })
    .otherwise({
      redirectTo: '/',
    });
}]);
