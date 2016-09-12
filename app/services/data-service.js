'use strict';

module.exports = exports = (app) => {
  app.service('dataService', ['$log', dataService]);
};

// the purpose of this service is to have the frontend data reflect the backend's data
// while event-service handles changing things on the backend, it will call this service's methods
// to change the front end data to be the same.
function dataService($log) {
  const service = {};
  service.events = [];
  service.users = [];
  $log.log('Info from factory :: ', service.events);

  // data handling operation goes here, to be called in event service or controllers
  service.createEvent = function(ev) {
    this.events.push(ev);
  };


  service.updateEvent = function(ev) {

  };

  service.deleteEvent = function(ev) {

  };

  return service;
}
