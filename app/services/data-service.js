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
  service.yourEvents = [];
  service.userInfo = {};
  service.userInfo.user = {};
  service.userInfo.isLoggedIn = false;
  $log.debug('Info from factory :: ', service.events);

  return service;
}
