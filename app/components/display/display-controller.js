'use strict';

module.exports = exports = (app) => {
  app.controller('DisplayController', ['dataService', 'eventService', DisplayController]);
};

function DisplayController(dataService, eventService) {
  console.log('display controller');
}
