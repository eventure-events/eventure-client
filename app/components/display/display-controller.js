'use strict';

module.exports = exports = (app) => {
  app.controller('DisplayController', ['$log', 'dataService', 'eventService', DisplayController]);
};

function DisplayController($log, dataService, eventService) {
  $log.debug('display controller');
}
