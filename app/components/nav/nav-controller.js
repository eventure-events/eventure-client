'use strict';

module.exports = exports = (app) => {
  app.controller('NavController', ['$log', NavController]);
};

function NavController($log) {
  $log.log('Entering display controller');
}
