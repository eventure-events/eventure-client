'use strict';

module.exports = exports = (app) => {
  app.controller('ListController', ['$log', '$window', 'dataService', 'eventService', 'userService', ListController]);
};

function ListController($log, $window, dataService, eventService) {
  this.events = dataService.events;
}
