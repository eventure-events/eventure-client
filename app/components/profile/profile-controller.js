'use strict';

module.exports = exports = (app) => {
  app.controller('ProfileController', ['$log', 'dataService', ProfileController]);
};

function ProfileController($log, dataService) {
  this.userInfo = dataService.userInfo;
  this.yourEvents = dataService.yourEvents;
}
