'use strict';

module.exports = exports = (app) => {
  app.controller('ListController', ['$log', '$window', 'dataService', 'eventService', 'userService', ListController]);
};

function ListController($log, $window, dataService, eventService, userService) {
  eventService.allEvents()
  .then(() => {
    this.events = dataService.events;

    this.token = userService.getToken();
    this.listEvents = function() {
      console.log('this.events: ', this.events);
    };
  });
}
