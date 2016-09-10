'use strict';

module.exports = exports = (app) => {
  app.controller('DisplayController', ['data', 'eventRequest', DisplayController]);
};

function DisplayController(data, eventRequest) {
  console.log('display controller');
}
