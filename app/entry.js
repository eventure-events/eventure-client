'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./style/scss/main.scss');

const angular = require('angular');

let eventureApp = angular.module('eventureApp', [require('angular-route')]);

require('./services')(eventureApp);
require('./controllers')(eventureApp);
require('./components')(eventureApp);

angular.module('myApplicationModule', ['uiGmapgoogle-maps']).config(
    ['$scope', function($scope) {
      $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    }]
);

eventureApp.config(['$routeProvider', function($route) {
  $route
    .when('/', {
      templateUrl: './app/html/home.html',
    })
    .when('/event', {
      templateUrl: './app/html/event.html',
    })
    .otherwise({
      redirectTo: '/',
    });
}]);
