'use strict';

module.exports = exports = (app) => {
  app.controller('EventController', ['$http', '$q', '$log', 'data', 'eventRequest', EventController]);
};

function EventController($http, $q, $log, data, eventRequest) {
  console.log('eventcontroller');
  this.events = data.events;

  this.createEvent = function(ev) {
    eventRequest.createEvent(ev)
      .then((data) => {
        this.events.push(data);
      });
  };

  this.allEvents = function() {
    eventRequest.allEvents()
      .then((all) => {
        this.events = all;
      });
  };

  this.searchEvent = function(ev) {
    eventRequest.searchEvent(ev);
  };

  this.updateEvent = function(ev) {
    eventRequest.updateEvent(ev);
  };

  this.deleteEvent = function(ev) {
    eventRequest.deleteEvent(ev)
      .then((data) => {
        this.events.splice(this.events.indexOf(data, 1));
      });
  };
}
