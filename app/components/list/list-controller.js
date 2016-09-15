'use strict';

module.exports = exports = (app) => {
  app.controller('ListController', ['$log', '$window', 'dataService', 'eventService', 'userService', ListController]);
};

function ListController($log, $window, dataService, eventService, userService) {
  this.events = dataService.events;

  this.followUser = function(username) {
    userService.followUser(username)
    .then(followed => dataService.userInfo.user.following.push(followed));
  };
}
