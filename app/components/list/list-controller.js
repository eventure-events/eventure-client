'use strict';

module.exports = exports = (app) => {
  app.controller('ListController', ['$log', '$window', 'dataService', 'eventService', 'userService', ListController]);
};

function ListController($log, $window, dataService, eventService, userService) {
  eventService.allEvents()
  .then(() => {
    this.events = dataService.events;
    this.listEvents = function() {
      console.log('this.events: ', this.events);
    };

    let limitStep = 4;
    this.limit = limitStep;

    this.incrementLimit = function() {
      this.limit += limitStep;
    };

    this.decrementLimit = function() {
      this.limit -= limitStep;
    };

  });
}
