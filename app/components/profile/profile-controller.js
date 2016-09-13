'use strict';

module.exports = exports = (app) => {
  app.controller('ProfileController', ['$log', ProfileController]);
};

function ProfileController($log) {
  $log.log('Entering profile controller');

}
