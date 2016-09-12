'use strict';

module.exports = exports = (app) => {
  app.controller('EventController', ['$log', '$window', 'dataService', 'eventService', EventController]);
};

function EventController($log, $window, dataService, eventService) {
  this.events = dataService.events;

  this.createEvent = function(eventInfo) {
    eventService.createEvent(eventInfo)
      .then((event) => {
        this.events.push(event);
        $window.location.href = '#/profile';
      });
  };

  // do not do this if we have a data service
  // will most likely remove
  // this.allEvents = function() {
  //   eventService.allEvents()
  //     .then((all) => {
  //       this.events = all;
  //     });
  // };

  // this is not needed, search returns a promise resolving with a result, this does nothing.
  // this.searchEvent = function(ev) {
  //   eventService.searchEvent(ev);
  // };
  //
  // this.updateEvent = function(ev) {
  //   eventService.updateEvent(ev);
  // };

  // handle this on data service side, not here
  // this.deleteEvent = function(ev) {
  //   eventService.deleteEvent(ev)
  //     .then((data) => {
  //       this.events.splice(this.events.indexOf(data, 1));
  //     });
  // };
}
