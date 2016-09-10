'use strict';

module.exports = exports = (app) => {
  app.directive('eeEventDirective', function() {
    return {
      restrict: 'EAC',
      template: require('./event-template.html'),
      controller: 'EventController',
      controllerAs: 'eventCtrl',
    };
  });
};
